import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Param,
} from '@nestjs/common';

import { OrderService } from './order.service';

@Controller('api/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post('place')
  async placeOrder(
    @Headers('token') token: string,
    @Body() body: any,
  ) {
    return this.orderService.placeOrder(
      token,
      body.amount,
      body.address,
      body.couponCode,
    );
  }
  

  @Get('list')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
}

