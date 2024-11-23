import { Inject, Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import { MessageService } from 'modules/message/message.service';
import { UserService } from 'modules/user/user.service';
import { Hears, InjectBot, On, Start, TELEGRAF_STAGE, Update } from 'nestjs-telegraf';
import { type Context, Scenes, Telegraf } from 'telegraf';

import type { SceneContext } from 'telegraf/scenes';

@Update()
@Injectable()
export class TelegramService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(MessageService)
    private readonly messageService: MessageService,

    @Inject(TELEGRAF_STAGE) stage: Scenes.Stage<SceneContext>,

    @InjectBot() private readonly bot: Telegraf
  ) {
    stage.register();
    this.bot.catch((error) => {
      console.error(error);
    });
  }

  private getSenderFromContext(ctx: Context): Context['from'] | undefined {
    return ctx.from ?? ctx.message?.from ?? ctx.callbackQuery?.from;
  }

  @Start()
  async startCommand(ctx: Context): Promise<void> {
    try {
      const sender = this.getSenderFromContext(ctx);
      if (isNil(sender)) return;
      const user = await this.userService.getOrCreateUser(sender.id.toString(), sender.username);

      if (isNil(user)) return;

      await ctx.reply(`${user.telegramUsername}${user.telegramId}, вращайте барабан!`, {
        reply_markup: {
          keyboard: [[{ text: 'Я кончил!' }]],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Hears('Я кончил!')
  async stopListening(ctx: Context): Promise<void> {
    try {
      const sender = this.getSenderFromContext(ctx);
      if (isNil(sender)) return;
      await this.userService.stopListening(sender.id.toString());
      await ctx.reply('Сектор приз на баране!', {
        reply_markup: {
          keyboard: [[{ text: 'Но я на этом вовсе не закончил!' }]],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Hears('Но я на этом вовсе не закончил!')
  async startListening(ctx: Context): Promise<void> {
    try {
      const sender = this.getSenderFromContext(ctx);
      if (isNil(sender)) return;
      await this.userService.startListening(sender.id.toString());
      await ctx.reply('Вращайте барабан!', {
        reply_markup: {
          keyboard: [[{ text: 'Я кончил!' }]],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  @On('message')
  async saveMesasge(ctx: Context): Promise<void> {
    try {
      const sender = this.getSenderFromContext(ctx);
      if (isNil(sender)) return;

      const user = await this.userService.getOrCreateUser(sender.id.toString(), sender.username);

      if (isNil(ctx.message?.message_id)) return;
      await this.messageService.saveMessage(ctx.message.message_id.toString(), user.id);
    } catch (error) {
      console.error(error);
    }
  }
}
