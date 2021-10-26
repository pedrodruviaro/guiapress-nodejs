const Sequelize = require("sequelize");
require("dotenv").config();

// connecting to mysql
const connection = new Sequelize(
    "guiapress",
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
    }
);

module.exports = connection;
