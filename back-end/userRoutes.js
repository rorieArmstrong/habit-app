const express = require("express");
const router = express.Router();
const db = require("./db");
const sqlite3 = require("sqlite3").verbose();

router.get("/all", function (req, res, next) {
  db("users")
    .select()
    .then(function (users) {
      res.status(200).json(users);
    });
});

router.get("/:id", function (req, res, next) {
  db("users")
    .select()
    .where("userID", parseInt(req.params.id))
    .first()
    .then(function (user) {
      res.status(200).json(user.userID);
    })
    .catch(function (error) {
      next(error);
    });
});

router.post("/register", function (req, res, next) {
  console.log(req.body);
  db("users")
    .insert(req.body)
    .then(function (userID) {
      return db("users").select().where("userID", parseInt(userID)).first();
    })
    .then(function (show) {
      res.status(200).json(show);
    })
    .catch(function (error) {
      next(error);
    });
});

module.exports = router;