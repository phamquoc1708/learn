import { Routes } from '@nestjs/core';
import { AccountModule } from './account/account.module';

export const routes: Routes = [
  {
    path: 'account',
    module: AccountModule,
  },
];
