'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // hash password
    const hashedPassword = bcrypt.hashSync('password', 10);

    await queryInterface.bulkInsert('Users', [
    {
      role_id: 1,
      name: 'Super Admin',
      username: 'superadmin',
      email: 'superadmin@gmail.com',
      phone: '8888888888888',
      password: hashedPassword,
      is_active: true,
      last_login_at: null,
      createdAt: new Date(),
      updatedAt: new Date(), 
    },
    {
      role_id: 2,
      name: 'Super Kasir',
      username: 'superkasir',
      email: 'superkasir@gmail.com',
      phone: '99999999999999',
      password: hashedPassword,
      is_active: true,
      last_login_at: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', { username: 'superadmin' }, {});
  }
};
