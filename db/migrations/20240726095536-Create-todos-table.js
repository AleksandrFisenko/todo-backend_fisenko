'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      text: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      isChecked: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.TIME,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.TIME,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Todos');
  },
};
