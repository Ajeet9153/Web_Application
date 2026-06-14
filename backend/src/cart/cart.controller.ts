import {
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('api/cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @Post('add')
  async addToCart(
    @Headers('token')
    token: string,
    @Body('itemId')
    itemId: string,
  ) {
    return this.cartService.addToCart(
      token,
      itemId,
    );
  }

  @Post('remove')
  async removeFromCart(
    @Headers('token')
    token: string,
    @Body('itemId')
    itemId: string,
  ) {
    return this.cartService.removeFromCart(
      token,
      itemId,
    );
  }

  @Post('get')
  async getCart(
    @Headers('token')
    token: string,
  ) {
    return this.cartService.getCart(
      token,
    );
  }
}