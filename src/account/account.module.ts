import { Module } from '@nestjs/common';
import { ShopController } from './controllers/shop/shop.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  controllers: [ShopController, AuthController],
  providers: [AuthService],
})
export class AccountModule {}
