import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ReviewShopDto, ReviewStatus } from './dto/create-master-admin.dto';

@Injectable()
export class MasterAdminService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Pulls all seller profile applications waiting for approval
   * Uses your existing 'approved: false' schema field
   */
  async getPendingShops() {
    return this.prisma.shopProfile.findMany({
      where: { approved: false },
      orderBy: { requestedAt: 'asc' },
    });
  }

  /**
   * Processes a master review action on a requested shop profile atomically
   */
  async reviewShop(shopId: string, dto: ReviewShopDto) {
    // Find the shop and include its user array to extract the owner's ID safely
    const shop = await this.prisma.shopProfile.findUnique({
      where: { id: shopId },
      include: { users: true }
    });

    if (!shop) throw new NotFoundException('The requested shop profile was not found.');
    if (shop.approved === true) throw new BadRequestException('This profile application has already been approved.');

    // Find the user connected to this shop profile
    const targetUser = shop.users[0];
    if (!targetUser) throw new NotFoundException('No user is currently attached to this shop profile.');

    return this.prisma.$transaction(async (tx) => {
      if (dto.status === ReviewStatus.APPROVED) {
        // 1. Upgrade user workspace role to SUB_ADMIN and mark them approved
        await tx.user.update({
          where: { id: targetUser.id },
          data: {
            role: 'SUB_ADMIN',
            approved: true
          },
        });

        // 2. Mark the shop profile as approved
        return tx.shopProfile.update({
          where: { id: shopId },
          data: {
            approved: true,
            approvedAt: new Date(),
          },
        });
      } else {
        // For rejection using your current schema, we keep approved as false 
        // and do not assign the SUB_ADMIN role.
        return tx.shopProfile.update({
          where: { id: shopId },
          data: {
            approved: false
          },
        });
      }
    });
  }
}