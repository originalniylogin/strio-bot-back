'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      telegram_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('messages', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'messages_user_id_fkey',
      references: { table: 'users', field: 'id' },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('messages', 'messages_user_id_fkey');
    await queryInterface.dropTable('messages');
  },
};
