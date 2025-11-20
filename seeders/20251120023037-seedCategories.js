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

    let dataCategories = JSON.parse(await fs.readFile('./data/categories.json', 'utf8'))
    dataCategories = dataCategories.map(el => {
      delete el.id
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })

    await queryInterface.bulkInsert('Categories', dataCategories, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Categories', null, {})
  }
};
