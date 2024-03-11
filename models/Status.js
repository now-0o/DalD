const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Status = sequelize.define("status", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Status;
