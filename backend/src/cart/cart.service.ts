import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
  ) {}

  private async getUser(
    token: string,
  ) {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        'food-app-secret',
    );

    const user =
      await this.prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

    if (!user) {
      throw new BadRequestException(
        'User not found',
      );
    }

    return user;
  }

  async addToCart(
    token: string,
    itemId: string,
  ) {
    const user =
      await this.getUser(token);

    const cartData: any =
      user.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        cartData,
      },
    });

    return {
      success: true,
      message: 'Added To Cart',
    };
  }

  async removeFromCart(
    token: string,
    itemId: string,
  ) {
    const user =
      await this.getUser(token);

    const cartData: any =
      user.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        cartData,
      },
    });

    return {
      success: true,
      message:
        'Removed From Cart',
    };
  }

  async getCart(
    token: string,
  ) {
    const user =
      await this.getUser(token);

    return {
      success: true,
      cartData:
        user.cartData || {},
    };
  }
}