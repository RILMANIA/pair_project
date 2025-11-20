'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      
      User.hasOne(models.Profile) // 1:1
      User.belongsToMany(models.Service, { through: models.Order, foreignKey: 'UserId' }); // M:M
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Format email tidak valid"
        },
        notEmpty: {
          msg: "Email tidak boleh kosong"
        },
        notNull: {
          msg: "Email tidak boleh kosong"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "Password minimal 8 karakter"
        },
        notEmpty: {
          msg: "Password tidak boleh kosong"
        },
        notNull: {
          msg: "Password tidak boleh kosong"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role harus dipilih"
        },
        notEmpty: {
          msg: "Role harus dipilih"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  })

  return User;
};