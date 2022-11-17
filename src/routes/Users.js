const express = require("express");
const Database = require("../configs/Database");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const db = new Database();
  const conn = db.connection;
  await conn.connect(async (err) => {
    if (err) return err;
    await conn.query(
      `SELECT * FROM users where username = ? and password = ?`,
      [username, password],
      (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0)
          return res.json({ success: true, message: "Welcome" });
      }
    );
  });
});

router.post("/register", async (req, res) => {
  const { fullname, username, password } = req.body;
  const db = new Database();
  const conn = db.connection;
  let userId = null;
  await conn.connect(async (err) => {
    if (err) throw err;
    await conn.beginTransaction(async (err) => {
      await conn.query(
        "insert into users (username, password) values (?,?)",
        [username, password],
        (err, result) => {
          if (err) {
            return conn.rollback(() => {
              throw err;
            });
          }
          if (result.affectetedRows > 0) userId = result.insertId;

          conn.query(
            "insert into students (fullname) values (?, ?)",
            [fullname, userId],
            (err, result) => {
              if (err) {
                return conn.rollback(() => {
                  throw err;
                });
              }
            }
          );
        }
      );

      conn.commit((err) => {
        if (err) {
          conn.rollback(() => {
            throw err;
          });
        }
        return res.status(200).send({ message: "Success" });
      });
    });
  });
});

module.exports = router;
