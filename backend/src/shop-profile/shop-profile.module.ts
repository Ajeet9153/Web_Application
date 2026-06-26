import { Module } from '@nestjs/common';
import { ShopProfileController } from './shop-profile.controller';
import { ShopProfileService } from './shop-profile.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ShopProfileController],
  providers: [
    ShopProfileService,
    PrismaService,
  ],
})
export class ShopProfileModule { }