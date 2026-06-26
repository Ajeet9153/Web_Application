import { BadRequestException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export class AuthService {
    constructor(
        private prisma: PrismaService,
    ) { }


    async login(
        data: {
            email: string;
            password: string;
        },
    ) {

        const existingEmail = await this.prisma.user.findUnique({ where: { email: data.email } })
        if (existingEmail) {
            throw new BadRequestException("Email already exists")
        }
        const salt = await bcrypt.genSalt(10)

        return {
            message: "success",
            data: "hello"
        }



    }







    private createToken(
        userId: string,
        role: string,
    ) {
        const secret = process.env.JWT_SECRET || 'food-app-secret';

        const token = jwt.sign(
            { id: userId, role },
            secret,
            { expiresIn: '7d' },
        );

        return token;
    }

    async register(
        data: {
            name: string;
            email: string;
            password: string;
            role?: 'CUSTOMER' | 'MASTER_ADMIN' | 'SUB_ADMIN';
        },
    ) {
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existing) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role || 'CUSTOMER',
                cartData: {},
            },
        });

        const token = this.createToken(user.id, user.role);

        return { success: true, token };
    }

    async getUserByToken(token: string) {
        try {
            const decoded: any = jwt.verify(
                token,
                process.env.JWT_SECRET || 'food-app-secret',
            );

            const user = await this.prisma.user.findUnique({
                where: { id: decoded.id },
            });

            return user;
        } catch (err) {
            throw new BadRequestException('Invalid token');
        }
    }
}