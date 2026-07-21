'use strict';

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

    // Reset
    await queryInterface.bulkDelete('Membership_tiers', null, {});
    await queryInterface.bulkInsert('Membership_tiers', [
      {
        name: 'Reguler',
        min_spending: 1000000,
        discount_percentage: 5,
        description: "Akumulasi 1 Tahun",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Silver',
        min_spending: 5000000,
        discount_percentage: 10,
        description: "Akumulasi 1 Tahun",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gold',
        min_spending: 7000000,
        discount_percentage: 15,
        description: "Akumulasi 1 Tahun",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Platinum',
        min_spending: 10000000,
        discount_percentage: 25,
        description: "Akumulasi 1 Tahun",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Membership_tiers', null, {});
  }
};
