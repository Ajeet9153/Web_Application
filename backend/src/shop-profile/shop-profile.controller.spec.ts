import { Test, TestingModule } from '@nestjs/testing';
import { ShopProfileController } from './shop-profile.controller';
import { ShopProfileService } from './shop-profile.service';

describe('ShopProfileController', () => {
  let controller: ShopProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopProfileController],
      providers: [ShopProfileService],
    }).compile();

    controller = module.get<ShopProfileController>(ShopProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
