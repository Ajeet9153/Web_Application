import { PartialType } from '@nestjs/mapped-types';
import { CreateShopProfileDto } from './register-shop.dto';

export class UpdateShopProfileDto extends PartialType(CreateShopProfileDto) {}
