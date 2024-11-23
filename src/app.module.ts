import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfigService, SharedModule } from 'modules/shared';
import { TelegramModule } from 'modules/telegram';
import { UserModule } from 'modules/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    SequelizeModule.forRootAsync({
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => configService.sequilizePostgresConfig,
    }),
    UserModule,
    TelegramModule,
  ],
})
export class AppModule {}
