import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(data: any) {
    const existingCoupon =
      await this.prisma.coupon.findUnique({
        where: {
          code: data.code.toUpperCase(),
        },
      });

    if (existingCoupon) {
      throw new BadRequestException(
        'Coupon already exists',
      );
    }

    const coupon =
      await this.prisma.coupon.create({
        data: {
          code: data.code.toUpperCase(),
          discount: Number(
            data.discount,
          ),
          minOrder: Number(
            data.minOrder,
          ),
          expiryDate: new Date(
            data.expiryDate,
          ),
        },
      });

    return {
      success: true,
      message:
        'Coupon Created Successfully',
      coupon,
    };
  }

  async findAll() {
    const coupons =
      await this.prisma.coupon.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

    return {
      success: true,
      data: coupons,
    };
  }

  async validateCoupon(
    code: string,
    totalAmount: number,
  ) {
    const coupon =
      await this.prisma.coupon.findUnique({
        where: {
          code: code.toUpperCase(),
        },
      });

    if (!coupon) {
      throw new BadRequestException(
        'Invalid Coupon'
      );
    }

    if (!coupon.active) {
      throw new BadRequestException(
        'Coupon Disabled'
      );
    }

    if (
      new Date() >
      new Date(
        coupon.expiryDate,
      )
    ) {
      throw new BadRequestException(
        'Coupon Expired'
      );
    }

    if (
      totalAmount <
      coupon.minOrder
    ) {
      throw new BadRequestException(
        `Minimum order amount is ₹${coupon.minOrder}`
      );
    }

    const discountAmount =
      (totalAmount *
        coupon.discount) /
      100;

    return {
      success: true,
      couponCode: coupon.code,
      discountPercentage:
        coupon.discount,
      discountAmount,
      finalAmount:
        totalAmount -
        discountAmount,
      message:
        'Coupon Applied Successfully',
    };
  }

  async remove(id: string) {
    const coupon =
      await this.prisma.coupon.findUnique({
        where: { id },
      });

    if (!coupon) {
      throw new BadRequestException(
        'Coupon Not Found'
      );
    }

    await this.prisma.coupon.delete({
      where: { id },
    });

    return {
      success: true,
      message:
        'Coupon Deleted Successfully',
    };
  }
}