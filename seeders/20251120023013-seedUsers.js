'use strict';
const fs = require('fs').promises
const bcrypt = require('bcryptjs')

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

    let dataUsers = JSON.parse(await fs.readFile('./data/users.json', 'utf8'))
    dataUsers = dataUsers.map(el => {
      delete el.id

      const salt = bcrypt.genSaltSync(10);
      el.password = bcrypt.hashSync(el.password, salt);

      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })

    await queryInterface.bulkInsert('Users', dataUsers, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {})
  }
};
