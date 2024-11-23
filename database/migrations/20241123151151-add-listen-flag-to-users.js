'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'is_listening', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'is_listening');
  },
};
