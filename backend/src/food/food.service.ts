import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async getFoodList() {
    return this.prisma.food.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async addFood(data: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }) {
    const shop =
      await this.prisma.shopProfile.findFirst();

    if (!shop) {
      throw new Error(
        'Create Shop Profile First'
      );
    }

    return this.prisma.food.create({
      data: {
        ...data,
        shopId: shop.id,
      },
    });
  }

  async removeFood(id: string) {
    return this.prisma.food.delete({
      where: {
        id,
      },
    });
  }
}