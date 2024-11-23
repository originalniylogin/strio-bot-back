import { Column, Model, Table } from 'sequelize-typescript';

@Table({ underscored: true, modelName: 'message', paranoid: true })
export class Message extends Model {
  @Column({ unique: true, allowNull: false })
  telegramId: string;
}
