const mysql = require("mysql");
const { DB_HOST,DB_USER, DB_PASSWORD, DATABASE } = process.dotenv;
class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "cs139_db",
    });
  }

  TestConnection() {
    this.connection.connect((err) => {
      if (err) return err;
      console.log("Database connected");
    });
  }
}

module.exports = Database;
