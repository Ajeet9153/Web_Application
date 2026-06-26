// backend/src/master-admin/master-admin.module.ts
import { Module } from '@nestjs/common';
import { MasterAdminService } from './master-admin.service';
import { MasterAdminController } from './master-admin.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Adjust path if needed

@Module({
  imports: [PrismaModule], // 👈 Enforces database context loading locally
  controllers: [MasterAdminController],
  providers: [MasterAdminService],
})
export class MasterAdminModule { }