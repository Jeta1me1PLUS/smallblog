var express = require("express");
const { compile } = require("morgan");
var router = express.Router();
var model = require("../model");
router.post("/add", function (req, res, next) {
  var data = {
    title: req.body.title,
    connect: req.body.content,
    id: Date.now(),
    username: req.session.username,
  };
  model.connect(function (db) {
    db.collection("articles").insertOne(data, function (err, ret) {
      if (err) {
        console.log("发布失败", err);
        res.redirect("/write");
      } else {
        res.redirect("/");
      }
    });
  });
});
module.exports = router;
