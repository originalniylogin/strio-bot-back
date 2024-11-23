import { Module } from '@nestjs/common';
import { MessageModule } from 'modules/message';
import { AppConfigService } from 'modules/shared/services/app-config.service';
import { UserModule } from 'modules/user';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';

import { TelegramService } from './telegram.service';

@Module({
  imports: [
    UserModule,
    MessageModule,
    TelegrafModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        token: appConfigService.telegramApiKey,
        middlewares: [session()],
      }),
    }),
  ],
  providers: [TelegramService],
})
export class TelegramModule {}
