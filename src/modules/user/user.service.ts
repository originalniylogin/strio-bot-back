import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isDefined } from 'utilities';

import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async getOrCreateUser(telegramId: string, telegramUsername?: string): Promise<User> {
    const existingUser = await this.userModel.findOne<User>({ where: { telegramId } });

    if (isDefined(existingUser)) {
      return existingUser;
    }

    return await this.userModel.create({ telegramId, telegramUsername });
  }

  async startListening(telegramId: string): Promise<void> {
    const user = await this.userModel.findOne({ where: { telegramId } });

    if (isDefined(user)) {
      await user.update({ isListening: true });
    }
  }

  async stopListening(telegramId: string): Promise<void> {
    const user = await this.userModel.findOne({ where: { telegramId } });

    if (isDefined(user)) {
      await user.update({ isListening: false });
    }
  }
}
