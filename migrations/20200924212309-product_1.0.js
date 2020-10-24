'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
          return Promise.all([
              queryInterface.createTable('Categories',{
                  id: {
                      type: Sequelize.DataTypes.INTEGER,
                      autoIncrement: true,
                      primaryKey: true
                  },
                  name: {
                      type: Sequelize.DataTypes.STRING(256),
                      allowNull: false
                  },
                  abbreviation: {
                      type: Sequelize.DataTypes.STRING(64),
                      allowNull: false
                  },
                  createdAt: {
                      type: Sequelize.DataTypes.DATE
                  },
                  updatedAt: {
                      type: Sequelize.DataTypes.DATE
                  }
              },{transaction: t}),

              queryInterface.createTable('Ingredients', {
                  id: {
                      type: Sequelize.DataTypes.INTEGER,
                      autoIncrement: true,
                      primaryKey: true
                  },
                  name:{
                      type: Sequelize.DataTypes.STRING(256),
                      allowNull: false
                  },
                  createdAt: {
                      type: Sequelize.DataTypes.DATE
                  },
                  updatedAt: {
                      type: Sequelize.DataTypes.DATE
                  }
              },{transaction: t}),

              queryInterface.createTable('Products',{
                  id: {
                      type: Sequelize.DataTypes.INTEGER,
                      autoIncrement: true,
                      primaryKey: true
                  },
                  code: {
                      type: Sequelize.DataTypes.STRING(256),
                      allowNull: true
                  },
                  reference: {
                      type: Sequelize.DataTypes.STRING(512),
                      allowNull: true
                  },
                  name: {
                      type: Sequelize.DataTypes.STRING(256),
                      allowNull: false
                  },
                  description: {
                      type: Sequelize.DataTypes.STRING(4000),
                      allowNull: true
                  },
                  delete: {
                      type: Sequelize.DataTypes.BOOLEAN,
                      allowNull: true,
                      defaultValue: false
                  },
                  deleteDate: {
                      type: Sequelize.DataTypes.DATE,
                      allowNull: true
                  },
                  createdAt: {
                      type: Sequelize.DataTypes.DATE
                  },
                  updatedAt: {
                      type: Sequelize.DataTypes.DATE
                  }
              },{transaction: t}),

              queryInterface.createTable('Pictures', {
                  id: {
                      type: Sequelize.DataTypes.INTEGER,
                      autoIncrement: true,
                      primaryKey: true
                  },
                  name: {
                      type: Sequelize.DataTypes.STRING(256),
                      allowNull: false
                  },
                  format: {
                      type: Sequelize.DataTypes.STRING(256),
                      allowNull: false
                  },
                  picture: {
                      type: Sequelize.DataTypes.BLOB,
                      allowNull: false
                  },
                  productId:{
                      type: Sequelize.DataTypes.INTEGER,
                      allowNull: false,
                      onDelete: 'cascade',
                      references: {
                          model: {
                              tableName: 'Products',
                              schema: 'public'
                          },
                          key: 'id'
                      }
                  },
                  createdAt: {
                      type: Sequelize.DataTypes.DATE
                  },
                  updatedAt: {
                      type: Sequelize.DataTypes.DATE
                  }
              },{transaction: t}),

              queryInterface.createTable('Prices', {
                  id: {
                      type: Sequelize.DataTypes.INTEGER,
                      autoIncrement: true,
                      primaryKey: true
                  },
                  productId: {
                      type: Sequelize.DataTypes.INTEGER,
                      allowNull: false,
                      onDelete: 'cascade',
                      references: {
                          model: {
                              tableName: 'Products',
                              schema: 'public'
                          },
                          key: 'id',
                      },
                  },
                  categoryId: {
                      type: Sequelize.DataTypes.INTEGER,
                      allowNull: false,
                      references: {
                          model: {
                              tableName: 'Categories',
                              schema: 'public'
                          },
                          key: 'id'
                      }
                  },
                  price: {
                      type: Sequelize.DataTypes.FLOAT,
                      allowNull: false
                  },
                  startDate: {
                      type: Sequelize.DataTypes.DATE,
                      allowNull: false
                  },
                  endDate: {
                      type: Sequelize.DataTypes.DATE,
                      allowNull: true
                  },
                  createdAt: {
                      type: Sequelize.DataTypes.DATE
                  },
                  updatedAt: {
                      type: Sequelize.DataTypes.DATE
                  }
              }, {transaction: t}),

              queryInterface.createTable('ProductIngredients', {
                  id: {
                      type: Sequelize.DataTypes.INTEGER,
                      autoIncrement: true,
                      primaryKey: true
                  },
                  productId:{
                      type: Sequelize.DataTypes.INTEGER,
                      allowNull: false,
                      references: {
                          model: {
                              tableName: 'Products',
                              schema: 'public'
                          },
                          key: 'id'
                      }
                  },
                  ingredientId: {
                      type: Sequelize.DataTypes.INTEGER,
                      allowNull: false,
                      references: {
                          model: {
                              tableName: 'Ingredients',
                              schema: 'public'
                          },
                          key: 'id'
                      }
                  },
                  categoryId: {
                      type: Sequelize.DataTypes.INTEGER,
                      allowNull: false,
                      references: {
                          model: {
                              tableName: 'Categories',
                              schema: 'public'
                          },
                          key: 'id'
                      }
                  },
                  quantity: {
                      type: Sequelize.DataTypes.FLOAT,
                      allowNull: false
                  },
                  startDate: {
                      type: Sequelize.DataTypes.DATE,
                      allowNull: false
                  },
                  endDate: {
                      type: Sequelize.DataTypes.DATE,
                      allowNull: true
                  },
                  createdAt: {
                      type: Sequelize.DataTypes.DATE
                  },
                  updatedAt: {
                      type: Sequelize.DataTypes.DATE
                  }
              }, {transaction: t})
          ])
      })
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
          return Promise.all([
              queryInterface.dropTable('ProductIngredients', {transaction: t}),
              queryInterface.dropTable('Prices', {transaction: t}),
              queryInterface.dropTable('Pictures', {transaction: t}),
              queryInterface.dropTable('Products', {transaction: t}),
              queryInterface.dropTable('Ingredients', {transaction: t}),
              queryInterface.dropTable('Categories', {transaction: t})
          ])
      })
  }
};
