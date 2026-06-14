import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Role } from '@prisma/client';

@Injectable()
export class SubAdminService {
  constructor(
    private prisma: PrismaService,
  ) {}

  private createToken(
    userId: string,
    role: string,
  ) {
    return jwt.sign(
      {
        id: userId,
        role,
      },
      process.env.JWT_SECRET ||
        'food-app-secret',
      {
        expiresIn: '7d',
      },
    );
  }

  async createSubAdmin(
    data: any,
  ) {
    const exists =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (exists) {
      throw new BadRequestException(
        'Admin already exists',
      );
    }

    const password =
      await bcrypt.hash(
        data.password,
        10,
      );

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password,

        role: Role.SUB_ADMIN,

        approved: true,

        shopId: data.shopId,
      },
    });
  }

  async login(
    email: string,
    password: string,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      throw new BadRequestException(
        'Admin not found',
      );
    }

    if (!user.approved) {
      throw new BadRequestException(
        'Your shop approval is pending. Please wait for Master Admin approval.',
      );
    }

    if (
      user.role !==
        Role.SUB_ADMIN &&
      user.role !==
        Role.MASTER_ADMIN
    ) {
      throw new BadRequestException(
        'Not an admin account',
      );
    }

    const match =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!match) {
      throw new BadRequestException(
        'Invalid Password',
      );
    }

    const token =
      this.createToken(
        user.id,
        user.role,
      );

    return {
      success: true,
      token,
      role: user.role,
      user,
    };
  }

  async getAllSubAdmins() {
    return this.prisma.user.findMany({
      where: {
        role:
          Role.SUB_ADMIN,
      },

      include: {
        shop: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async assignShop(
    adminId: string,
    shopId: string,
  ) {
    return this.prisma.user.update({
      where: {
        id: adminId,
      },

      data: {
        shopId,
      },
    });
  }

  async disableAdmin(
    id: string,
  ) {
    return this.prisma.user.update({
      where: {
        id,
      },

      data: {
        approved: false,
      },
    });
  }
}