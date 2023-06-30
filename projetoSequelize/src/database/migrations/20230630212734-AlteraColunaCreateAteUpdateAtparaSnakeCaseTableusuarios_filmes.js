'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('usuarios_filmes', 'createdAt', 'created_at')
    await queryInterface.renameColumn('usuarios_filmes', 'updatedAt', 'updated_at')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('usuarios_filmes', 'created_at', 'createdAt')
    await queryInterface.renameColumn('usuarios_filmes', 'updated_at', 'updatedAt')
  }
}
