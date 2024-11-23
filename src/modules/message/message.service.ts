import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Message } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message
  ) {}

  async saveMessage(telegramId: string, userId: number): Promise<Message> {
    return await this.messageModel.create({ telegramId, userId });
  }
}
