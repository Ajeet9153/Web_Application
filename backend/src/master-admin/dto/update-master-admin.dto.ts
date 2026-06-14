import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterAdminDto } from './create-master-admin.dto';

export class UpdateMasterAdminDto extends PartialType(CreateMasterAdminDto) {}
