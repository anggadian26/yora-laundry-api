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
      // define association here
    }
  }
  User.init({
    role_id: DataTypes.INTEGER,
    name: DataTypes.STRING(100),
    username: DataTypes.STRING(50),
    email: DataTypes.STRING(100),
    phone: DataTypes.STRING(20),
    password: DataTypes.STRING(255),
    is_active: DataTypes.BOOLEAN,
    last_login_at: DataTypes.DATETIME
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};