var express = require("express");
var router = express.Router();
var model = require("../model");
var moment = require("moment");
/* GET home page. */
router.get("/", function (req, res, next) {
  var username = req.session.username;
  var page = req.query.page || 1;
  var data = {
    total: 0, //总共多少
    curPage: page,
    list: [], //当前页文章列表
  };
  var pageSize = 5;
  model.connect(function (db) {
    //1.查询所有文章
    db.collection("articles")
      .find()
      .toArray(function (err, docs) {
        console.log("文章", docs);
        // var list = docs;

        console.log("🚀 ~ file: index.js ~ line 22 ~ data", data);

        data.total = Math.ceil(docs.length / pageSize);
        //2.查询当前也的文章列表
        model.connect(function (db) {
          db.collection("articles")
            .find()
            .sort({ _id: -1 })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .toArray(function (err, docs2) {
              docs2.map(function (ele, index) {
                ele["time"] = moment(ele.id).format("YYYY-MM-DD HH:mm:ss");
              });
              data.list = docs2;
              res.render("index", { username: username, data: data });
            });
        });
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
