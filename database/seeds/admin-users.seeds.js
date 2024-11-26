'use strict';
// eslint-disable-next-line @typescript-eslint/no-require-imports -- I donw know why...
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('admin_users', [
      {
        email: 'admin',
        encrypted_password: await bcrypt.hash('admin', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('admin_users', {
      email: 'admin',
    });
  },
};
