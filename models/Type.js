const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Type = sequelize.define("type", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Type;
