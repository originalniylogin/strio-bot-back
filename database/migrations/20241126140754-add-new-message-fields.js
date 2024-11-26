'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('messages', 'text_content', {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn('messages', 'voice_link', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('messages', 'voice_link');
    await queryInterface.removeColumn('messages', 'text_content');
  },
};
