import { Controller, Get, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { MasterAdminService } from './master-admin.service';
import { ReviewShopDto } from './dto/create-master-admin.dto';
import { ShopProfile } from '@prisma/client'; // 👈 Import the generated type

@Controller('api/master-admin')
export class MasterAdminController {
  constructor(private readonly masterAdminService: MasterAdminService) {}

  @Get('pending-shops')
  async getPendingShops(): Promise<ShopProfile[]> { // 👈 Explicit Array Type
    return this.masterAdminService.getPendingShops();
  }

  @Patch('shop/:id/review')
  async reviewShop(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() reviewShopDto: ReviewShopDto,
  ): Promise<ShopProfile> { // 👈 Explicit Object Type
    return this.masterAdminService.reviewShop(id, reviewShopDto);
  }
}