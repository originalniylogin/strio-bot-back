import { Column, Model, Table } from 'sequelize-typescript';

@Table({ underscored: true, modelName: 'admin_user' })
export class AdminUser extends Model {
  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({ allowNull: false })
  encryptedPassword!: string;
}
