// backend/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("MyNote_App", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Error: " + err));

module.exports = sequelize;
