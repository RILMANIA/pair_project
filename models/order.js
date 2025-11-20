'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      
      Order.belongsTo(models.User, { foreignKey: 'UserId' });
      
      Order.belongsTo(models.Service, { foreignKey: 'ServiceId' });
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ServiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};