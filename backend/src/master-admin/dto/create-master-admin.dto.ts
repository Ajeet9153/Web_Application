export class CreateMasterAdminDto {}
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export enum ReviewStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class ReviewShopDto {
  @IsEnum(ReviewStatus, { message: 'Status must be APPROVED or REJECTED' })
  status: ReviewStatus | undefined;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Rejection reason must be at least 5 characters long.' })
  rejectionReason?: string;
}