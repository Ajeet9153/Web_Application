import { Test, TestingModule } from '@nestjs/testing';
import { ShopProfileService } from './shop-profile.service';

describe('ShopProfileService', () => {
  let service: ShopProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopProfileService],
    }).compile();

    service = module.get<ShopProfileService>(ShopProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
