import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterShopDto } from './dto/register-shop.dto';

@Injectable()
export class ShopProfileService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Provisions a brand new application log queue ticket for review
   */
  async createRegisterApplication(userId: string, dto: RegisterShopDto) {
    // 1. Structural Check: Verify if this user profile already owns or applied for a store
    const existingUserShop = await this.prisma.shopProfile.findFirst({
      where: {
        users: {
          some: { id: userId }
        }
      }
    });

    if (existingUserShop) {
      throw new ConflictException('Your account is already associated with an existing merchant shop platform.');
    }

    // 2. Structural Check: Ensure business uniqueness markers do not collide
    const duplicateGst = await this.prisma.shopProfile.findFirst({
      where: { gstNumber: dto.gstNumber }
    });
    if (duplicateGst) {
      throw new BadRequestException('A shop profile with this GSTIN number is already registered.');
    }

    // 3. Database Write Execution
    return this.prisma.shopProfile.create({
      data: {
        shopName: dto.shopName,
        ownerName: dto.ownerName,
        gstNumber: dto.gstNumber,
        mobileNumber: dto.mobileNumber,
        email: dto.email,
        address: dto.address,
        bankName: dto.bankName,
        accountNumber: dto.accountNumber,
        ifscCode: dto.ifscCode,
        upiId: dto.upiId,
        qrCode: `upi://pay?pa=${dto.upiId}&pn=${encodeURIComponent(dto.shopName)}`, // Automated fallback generation
        approved: false, // Default structural state matching your local schema field
        users: {
          connect: { id: userId } // Relate it directly back to the logging applicant user account
        }
      }
    });
  }
}