const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/habits", function (req, res, next) {
  db("habits")
    .select()
    .then(function (habits) {
      res.status(200).json(habits);
    });
});

router.get("/habits/:id", function (req, res, next) {
  db("habits")
    .select()
    .where("habitID", parseInt(req.params.id))
    .first()
    .then(function (habit) {
      res.status(200).json(habit);
    })
    .catch(function (error) {
      next(error);
    });
});

router.get('/habits/users/:id', function(req, res, next) {
    db('habits')
    .select()
    .where('userID', parseInt(req.params.id))
    .then(function (habits) {
        res.status(200).json(habits);
    })
    .catch(function (error) {
        next(error);
    })
})

router.post("/habits", function (req, res, next) {
  console.log(req.body);
  db("habits")
    .insert(req.body)
    .then(function (habitID) {
      return db("habits").select().where("habitID", parseInt(habitID)).first();
    })
    .then(function (show) {
      res.status(200).json(show);
    })
    .catch(function (error) {
      next(error);
    });
});

router.put("/habits/:id", function (req, res, next) {
  req.body = JSON.parse(JSON.stringify(req.body));
  console.log(req.body);
  if (req.body.hasOwnProperty("habitID")) {
    return res.status(422).json({
      error: "You cannot update the id field",
    });
  }
  db("habits")
    .where("habitID", parseInt(req.params.id))
    .update(req.body)
    .then(function () {
      return db("habits")
        .select()
        .where("habitID", parseInt(req.params.id))
        .first();
    })
    .then(function (show) {
      res.status(200).json(show);
    })
    .catch(function (error) {
      next(error);
    });
});

router.delete("/habits/:id", function (req, res, next) {
  db("habits")
    .select()
    .where("habitID", parseInt(req.params.id))
    .first()
    .then(function () {
      db("habits")
        .where("habitID", parseInt(req.params.id))
        .del()
        .then(function () {
          res.status(200).json('row deleted');
        })
        .catch(function (error) {
          next(error);
        });
    })
    .catch(function (error) {
      next(error);
    });
});

module.exports = router;
