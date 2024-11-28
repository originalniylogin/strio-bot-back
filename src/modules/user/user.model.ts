import { Message } from 'modules/message';
import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ underscored: true, modelName: 'user', paranoid: true })
export class User extends Model {
  @PrimaryKey
  @Column({ unique: true, autoIncrement: true })
  id: number;

  @Column({ unique: true, allowNull: false })
  telegramId: string;

  @Column({ unique: true, allowNull: true })
  telegramUsername?: string;

  @Column({ allowNull: false, defaultValue: true })
  isListening: boolean;

  @HasMany(() => Message, { onDelete: 'CASCADE', foreignKey: 'userId' })
  messages: Message[];
}
