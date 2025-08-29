const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("notes_app", "root", "your_password", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
