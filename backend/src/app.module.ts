import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { PrismaModule } from '../prisma/prisma.module';

import { FoodModule } from './food/food.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { ShopProfileModule } from './shop-profile/shop-profile.module';

import { SubAdminModule } from './sub-admin/sub-admin.module';
import { MasterAdminModule } from './master-admin/master-admin.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(
        process.cwd(),
        'uploads',
      ),
      serveRoot: '/images',
    }),

    PrismaModule,

    FoodModule,
    UserModule,
    CartModule,
    OrderModule,
    CouponModule,

    ShopProfileModule,

    SubAdminModule,

    MasterAdminModule,
  ],
})
export class AppModule { }