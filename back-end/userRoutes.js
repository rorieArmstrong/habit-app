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

router.get("/:id", function (req, res, next) { // get single user
  db("users")
    .select()
    .where('userID', req.params.id)
    .then(function (user) {
      res.status(200).json(user);
    });
});

router.get("/:username/:password", function (req, res, next) {
  db("users")
    .select()
    .where("user_name", req.params.username)
    .where("password", req.params.password)
    .first()
    .then(function (user) {
      res.status(200).json(user.userID);
    })
    .catch(function (error) {
      res.status(403).send('access denied')
      console.log('wrong password or username');
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