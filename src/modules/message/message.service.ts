import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { isDefined } from 'utilities';

import { Message } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message,

    @InjectBot()
    private readonly bot: Telegraf
  ) {}

  async saveMessage(telegramId: string, userId: number, voiceId?: string, textContent?: string): Promise<Message> {
    const voiceLink = isDefined(voiceId) ? (await this.bot.telegram.getFileLink(voiceId)).href : null;
    console.log(voiceLink, textContent);
    return await this.messageModel.create({ telegramId, userId, voiceLink, textContent });
  }
}
