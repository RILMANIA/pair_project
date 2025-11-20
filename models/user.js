'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
<<<<<<< HEAD
      
      User.hasOne(models.Profile) // 1:1
      User.belongsToMany(models.Service, { through: models.Order, foreignKey: 'UserId' }); // M:M
=======
      // define association here
>>>>>>> 7af2749d903f9cc362f861a64de0bb329c1fb044
    }
  }
  User.init({
    username: DataTypes.STRING,
<<<<<<< HEAD
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
=======
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
>>>>>>> 7af2749d903f9cc362f861a64de0bb329c1fb044
  }, {
    sequelize,
    modelName: 'User',
  });
<<<<<<< HEAD

  User.beforeCreate(user => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  })

=======
>>>>>>> 7af2749d903f9cc362f861a64de0bb329c1fb044
  return User;
};