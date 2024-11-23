'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin_users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      encrypted_password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('admin_users');
  },
};
