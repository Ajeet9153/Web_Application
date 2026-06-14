import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController, AuthController } from './products.controller'; // Imported both controllers here
import { Product } from './entities/product.entity' ;
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User]),
    JwtModule.register({ 
      secret: 'SUPER_SECRET_KEY', 
      signOptions: { expiresIn: '1d' } 
    })
  ],
  controllers: [ProductsController, AuthController], // Mounted both controllers here
  providers: [ProductsService],
})
export class ProductsModule {}