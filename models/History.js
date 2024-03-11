const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const History = sequelize.define("histories", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  content: {
    type: DataTypes.STRING,
  },
});

module.exports = History;
