var express = require("express");
var router = express.Router();
var model = require("../model");
/* GET home page. */
router.get("/", function (req, res, next) {
  var username = req.session.username;
  model.connect(function (db) {
    db.collection("users")
      .find()
      .toArray(function (err, docs) {
        // console.log('users',docs)
        res.render("index", { username: username });
      });
  });
  //res.render('index', { title: 'Express' });
});

router.get("/regist", function (req, res, next) {
  res.render("regist", {});
});

//登录页
router.get("/login", function (req, res, next) {
  res.render("login", {});
});
//写文章
router.get("/write", function (req, res, next) {
  var username = req.session.username;
  res.render("write", { username: username });
});
module.exports = router;
