var express = require('express');
var router = express.Router();
var model = require('../model');
/* GET home page. */
router.get('/', function(req, res, next) {
  model.connect(function(db){
    db.collection('users').find().toArray(function(err,docs){
      console.log('users',docs)
      res.render('index',{title:'Express'});
    })
  })
  //res.render('index', { title: 'Express' });
});

router.get('/regist',function(req,res,next){
  res.render('regist',{})
})

//登录页
router.get('/login',function(req,res,next){
  res.render('login',{})
})
module.exports = router;