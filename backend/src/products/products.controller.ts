import { Controller, Get, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// ==================== 1. AUTHENTICATION ENDPOINTS ====================
@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  @Post('signup')
  async signup(@Body() body: any) {
    const { email, password, name, role } = body;
    const exists = await this.userRepo.findOneBy({ email });
    if (exists) throw new BadRequestException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      email,
      name,
      passwordHash: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user',
    });
    
    const savedUser = await this.userRepo.save(user);
    return { message: 'User created successfully', userId: savedUser.id };
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ id: user.id, name: user.name, role: user.role });
    return { token, name: user.name, role: user.role };
  }
}

// ==================== 2. PRODUCT CATALOG ENDPOINTS ====================
@Controller('products')
export class ProductsController {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {}

  @Get()
  async findAll() {
    return this.productRepo.find();
  }

  @Post()
  async create(@Body() productData: any) {
    const product = this.productRepo.create(productData);
    return this.productRepo.save(product);
  }
}