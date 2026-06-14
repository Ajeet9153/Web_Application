import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { CouponService } from './coupon.service';

@Controller('api/coupon')
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
  ) {}

  @Post('create')
  create(@Body() body: any) {
    return this.couponService.create(body);
  }

  @Get('list')
  findAll() {
    return this.couponService.findAll();
  }

  @Post('validate')
  validate(@Body() body: any) {
    return this.couponService.validateCoupon(
      body.code,
      body.totalAmount,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }
}