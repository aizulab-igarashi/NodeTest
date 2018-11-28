'use strict';
var crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

      // 暗号化
      const password = 'aizulab';
      var cipher = crypto.createCipher('aes192', password);
      cipher.update(process.env.SECRET_WORD, 'utf8', 'hex');
      var cipheredText = cipher.final('hex');

      const time = new Date();
      return queryInterface.bulkInsert('Users', [{
          username: 'igarashi',
          password: cipheredText,
          created_at: time,
          updated_at: time
      },{
          username: 'aizulab-igarashi',
          password: cipheredText,
          created_at: time,
          updated_at: time
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
