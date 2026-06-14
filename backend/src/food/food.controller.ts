import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodService } from './food.service';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('api/food')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
  ) {}

  @Get('list')
  async getFoodList() {
    const foods =
      await this.foodService.getFoodList();

    return {
      success: true,
      data: foods,
    };
  }

  @Post('add')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (
          req,
          file,
          cb,
        ) => {
          const uploadPath = './uploads';

          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {
              recursive: true,
            });
          }

          cb(null, uploadPath);
        },

        filename: (
          req,
          file,
          cb,
        ) => {
          const uniqueName =
            Date.now() +
            '-' +
            file.originalname.replace(
              /\s+/g,
              '-',
            );

          cb(null, uniqueName);
        },
      }),
    }),
  )
  async addFood(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    await this.foodService.addFood({
      name: body.name,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      image: file?.filename || '',
    });

    return {
      success: true,
      message: 'Food Added Successfully',
    };
  }

  @Post('remove')
  async removeFood(
    @Body('id') id: string,
  ) {
    await this.foodService.removeFood(id);

    return {
      success: true,
      message: 'Food Removed Successfully',
    };
  }
}