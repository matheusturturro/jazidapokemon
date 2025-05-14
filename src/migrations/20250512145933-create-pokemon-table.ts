import { QueryInterface, DataTypes } from "sequelize" 
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('Pokemons', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      treinador: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nivel: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    } );
  },

  down (queryInterface: QueryInterface) {
    return queryInterface.dropTable('Pokemons');
  }
};
