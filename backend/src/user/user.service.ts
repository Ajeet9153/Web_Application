import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) { }

  private createToken(
    userId: string,
  ) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET ||
      'food-app-secret',
      {
        expiresIn: '7d',
      },
    );
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const exists =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (exists) {
      throw new BadRequestException(
        'User already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10,
      );

    const user =
      await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password:
            hashedPassword,

          cartData: {},

          role: 'CUSTOMER',
        },
      });

    const token =
      this.createToken(
        user.id,
      );

    return {
      success: true,
      token,
    };
  }

  async login(data: {
    email: string;
    password: string;
  }) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (!user) {
      throw new BadRequestException(
        'User does not exist',
      );
    }

    const isMatch =
      await bcrypt.compare(
        data.password,
        user.password,
      );

    if (!isMatch) {
      throw new BadRequestException(
        'Invalid credentials',
      );
    }

    const token =
      this.createToken(
        user.id,
      );

    return {
      success: true,
      token,
      role: user.role,
      userId: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async getUserByToken(
    token: string,
  ) {
    const decoded: any =
      jwt.verify(
        token,
        process.env.JWT_SECRET ||
        'food-app-secret',
      );

    return this.prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
  }
}