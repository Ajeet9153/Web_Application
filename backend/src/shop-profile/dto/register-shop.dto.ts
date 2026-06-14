export class CreateShopProfileDto {}
import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, Length } from 'class-validator';

export class RegisterShopDto {
  @IsString()
  @IsNotEmpty()
  shopName: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  @Length(15, 15, { message: 'GSTIN must be exactly 15 characters long.' })
  gstNumber: string;

  @IsPhoneNumber(null, { message: 'Provide a valid contact mobile phone number.' })
  mobileNumber: string;

  @IsEmail({}, { message: 'Provide a valid business communication email address.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  ifscCode: string;

  @IsString()
  @IsNotEmpty()
  upiId: string;
}