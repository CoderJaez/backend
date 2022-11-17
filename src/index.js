const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./configs/Database");
const cors = require("cors");
require("dotenv/config");
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

//routes
const studentsRoute = require("./routes/Students");
const usersRoute = require("./routes/Users");

app.use("/api/students", studentsRoute);
app.use("/api/users", usersRoute);

app.listen(3000, function () {
  const db = new Database();
  db.TestConnection();
  console.log("Server is up and running http://localhost:3000");
});
