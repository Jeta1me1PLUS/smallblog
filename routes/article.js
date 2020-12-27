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
//删除文章
router.get("/delete", function (req, res, next) {
  var id = parseInt(req.query.id);
  var page = req.query.page;
  // console.log(id, page);
  model.connect(function (db) {
    db.collection("articles").deleteOne({ id: id }, function (err, ret) {
      if (err) {
        console.log("shibai");
      } else {
        console.log("ok");
      }
      res.redirect("/?page=" + page);
    });
  });
});
module.exports = router;
