import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { SubAdminService } from './sub-admin.service';

@Controller('api/sub-admin')
export class SubAdminController {
  constructor(
    private readonly subAdminService: SubAdminService,
  ) {}

  @Post('login')
  async login(
    @Body() body: any,
  ) {
    return this.subAdminService.login(
      body.email,
      body.password,
    );
  }

  @Post('create')
  async createSubAdmin(
    @Body() body: any,
  ) {
    const admin =
      await this.subAdminService.createSubAdmin(
        body,
      );

    return {
      success: true,
      message:
        'Sub Admin Created Successfully',
      data: admin,
    };
  }

  @Get('list')
  async getAllSubAdmins() {
    const admins =
      await this.subAdminService.getAllSubAdmins();

    return {
      success: true,
      data: admins,
    };
  }

  @Patch('assign-shop')
  async assignShop(
    @Body() body: any,
  ) {
    const admin =
      await this.subAdminService.assignShop(
        body.adminId,
        body.shopId,
      );

    return {
      success: true,
      data: admin,
    };
  }

  @Patch('disable/:id')
  async disableAdmin(
    @Param('id') id: string,
  ) {
    const admin =
      await this.subAdminService.disableAdmin(
        id,
      );

    return {
      success: true,
      data: admin,
    };
  }
}