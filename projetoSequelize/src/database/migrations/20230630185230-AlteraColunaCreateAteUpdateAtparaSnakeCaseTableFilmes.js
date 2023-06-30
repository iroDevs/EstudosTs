'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('filmes', 'createdAt', 'created_at')
    await queryInterface.renameColumn('filmes', 'updatedAt', 'updated_at')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('filmes', 'created_at', 'createdAt')
    await queryInterface.renameColumn('filmes', 'updated_at', 'updatedAt')
  }
}
