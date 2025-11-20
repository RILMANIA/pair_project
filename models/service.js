'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    
    get formatRupiah() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(this.price);
    }

    static associate(models) {
      
      Service.belongsTo(models.Category, { foreignKey: 'CategoryId' });
      Service.belongsToMany(models.User, { through: models.Order, foreignKey: 'ServiceId' });
    }
  }
  Service.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { 
          msg: "Nama layanan harus diisi" 
        },
        notNull: {
          msg: "Nama layanan harus diisi"
        }
      }
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Harga tidak boleh kosong"
        },
        min: { 
          args: [1000], 
          msg: "Harga minimal 1000" 
        }
      }
    },
    imgUrl: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};