import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AdminUser } from './admin-user.model';

@Module({
  imports: [SequelizeModule.forFeature([AdminUser])],
})
export class AdminUserAdminModule {}
