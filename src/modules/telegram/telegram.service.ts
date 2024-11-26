import { Inject, Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import { MessageService } from 'modules/message/message.service';
import { UserService } from 'modules/user/user.service';
import { Hears, InjectBot, On, Start, TELEGRAF_STAGE, Update } from 'nestjs-telegraf';
import { type Context, Scenes, Telegraf } from 'telegraf';

import { KEYBOARD_ACTIONS, MESSAGE_TEXTS } from './telegram.constants';

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

      await ctx.reply(MESSAGE_TEXTS.start((sender.first_name as string | null) ?? sender.username), {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: KEYBOARD_ACTIONS.finish }]],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Hears(KEYBOARD_ACTIONS.finish)
  async stopListening(ctx: Context): Promise<void> {
    try {
      const sender = this.getSenderFromContext(ctx);
      if (isNil(sender)) return;
      await this.userService.stopListening(sender.id.toString());
      await ctx.reply(MESSAGE_TEXTS.finish.text, {
        reply_markup: {
          inline_keyboard: [[{ text: MESSAGE_TEXTS.finish.link.label, url: MESSAGE_TEXTS.finish.link.href }]],
        },
      });
      await ctx.reply(MESSAGE_TEXTS.socials.text, {
        reply_markup: {
          inline_keyboard: [[{ text: MESSAGE_TEXTS.socials.link.label, url: MESSAGE_TEXTS.socials.link.href }]],
        },
      });
      await ctx.reply(MESSAGE_TEXTS.sinature, {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: KEYBOARD_ACTIONS.start }]],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Hears(KEYBOARD_ACTIONS.start)
  async startListening(ctx: Context): Promise<void> {
    try {
      const sender = this.getSenderFromContext(ctx);
      if (isNil(sender)) return;
      await this.userService.startListening(sender.id.toString());
      await ctx.reply(MESSAGE_TEXTS.start((sender.first_name as string | null) ?? sender.username), {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: KEYBOARD_ACTIONS.finish }]],
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

      const voiceId = (ctx.message as Context['message'] & { voice?: { file_id?: string } }).voice?.file_id;
      const { text: textContent } = ctx.message as Context['message'] & { text?: string };

      await this.messageService.saveMessage(ctx.message.message_id.toString(), user.id, voiceId, textContent);
    } catch (error) {
      console.error(error);
    }
  }
}
