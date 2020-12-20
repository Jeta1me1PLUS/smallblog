var express = require('express');
var router = express.Router();
var model =require('../model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//注册
router.post('/regist',function(req,res,next){
  var data={
    username:req.body.username,
    password:req.body.password,
    password2:req.body.password2,

  }
  //数据校验。。。
  model.connect(function(db){
    db.collection('users').insertOne(data,function(err,ret){
      if (err){
        console.log('shibai')
        res.redirect('/regist')
      }else{
        res.redirect('/login')
      }
    })
  })
  // res.send(data)
})
//登录
router.post('/login',function(req,res,next){
  var data={
    username:req.body.username,
    password:req.body.password
  }
  //用户校验
  model.connect(function(db){
    db.collection('users').find(data).toArray(function(err,docs){
      if (err){
        res.redirect('/login')
      }else{
        if (docs.length > 0){
          //登录成功，进行session存储
          req.session.username =data.username
          res.redirect('/')
        }else{
          res.redirect('/login')
        }
      }
    })
  })
  console.log(data)
  
})

//退出登录
router.get('/logout',function(req,res,next){
  req.session.username=null
  res.redirect('/login')
})
module.exports = router;
