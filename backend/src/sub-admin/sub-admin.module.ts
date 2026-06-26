import { Module } from '@nestjs/common';

import { SubAdminController } from './sub-admin.controller';
import { SubAdminService } from './sub-admin.service';

import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    SubAdminController,
  ],

  providers: [
    SubAdminService,
  ],

  exports: [
    SubAdminService,
  ],
})
export class SubAdminModule { }