import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
  ) { }

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

  async placeOrder(
    token: string,
    amount: number,
    address: any,
    couponCode?: string,
  ) {
    const user =
      await this.getUser(token);

    const cartData =
      user.cartData || {};

    const order =
      await this.prisma.order.create({
        data: {
          userId: user.id,
          items: cartData,
          amount,
          address,
        },
      });

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        cartData: {},
      },
    });

    return {
      success: true,
      message:
        'Order Placed Successfully',
      orderId: order.id,
    };
  }

  async getAllOrders() {
    const orders =
      await this.prisma.order.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

    const formattedOrders =
      await Promise.all(
        orders.map(async (order) => {
          const user =
            await this.prisma.user.findUnique({
              where: {
                id: order.userId,
              },
            });

          const items: any =
            order.items || {};

          const productDetails =
            await Promise.all(
              Object.entries(items).map(
                async ([productId, qty]) => {
                  const product =
                    await this.prisma.food.findUnique({
                      where: {
                        id: productId,
                      },
                    });

                  return {
                    productId,
                    productName:
                      product?.name ||
                      'Deleted Product',
                    quantity: qty,
                    price:
                      product?.price || 0,
                    category:
                      product?.category ||
                      '',
                  };
                },
              ),
            );

          return {
            ...order,
            customerName:
              user?.name ||
              'Unknown User',
            customerEmail:
              user?.email || 'N/A',
            products:
              productDetails,
          };
        }),
      );

    return {
      success: true,
      data: formattedOrders,
    };
  }
}