'use strict';
const fs = require('fs').promises

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

    let dataServices = JSON.parse(await fs.readFile('./data/services.json', 'utf8'))
    dataServices = dataServices.map(el => {
      delete el.id
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })

    await queryInterface.bulkInsert('Services', dataServices, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Services', dataServices, {})
  }
};
