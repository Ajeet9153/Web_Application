import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ShopProfileService } from './shop-profile.service';
import { RegisterShopDto } from './dto/register-shop.dto';

@Controller('api/shop-profile')
// Add your authentication state token guard here later (e.g., @UseGuards(JwtAuthGuard))
export class ShopProfileController {
  constructor(private readonly shopProfileService: ShopProfileService) {}

  @Post('register')
  async registerNewMerchant(
    @Body() registerShopDto: RegisterShopDto,
    @Req() req: any // Extracts user data from your local security guard session strategies
  ) {
    // Standard mock fallback if security guard isn't active in local watch development mode yet
    const placeholderUserId = req.user?.id || "your-test-user-uuid-here"; 
    
    return this.shopProfileService.createRegisterApplication(placeholderUserId, registerShopDto);
  }
}