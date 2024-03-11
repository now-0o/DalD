const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Item = sequelize.define("items", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  content: {
    type: DataTypes.STRING,
  },
});

module.exports = Item;
