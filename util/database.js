const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "farah1995", {
  dialect: "mysql",
  host: "localhost",
  port: 3307,
});

module.exports = sequelize;
