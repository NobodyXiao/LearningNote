const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  const userId = req.query.user_id;
  console.log('req', userId);

  req.getConnection(function (err, conn) {
    // 没有连接上数据库
    if (err) return next("Cannot Connect");
    // 数据库被成功连接
    const query = conn.query('SELECT * FROM t_user WHERE user_id = ?', [userId], function (err, rows) {
      // 数据库连接出错
      if (err) {
        return next("Mysql error, check your query");
      }
      // 连接成功，渲染页面
      // res.render('user',{title:"RESTful Crud Example",data:rows});
      console.log('rows', rows);
      // res.send('Welcome edit page');
      res.render('edit',{data:rows[0]});
    });
  });
});

router.put('/update/:user_id', function(req, res, next){
  const userId = req.params.user_id;
  //validation
  req.assert('name','Name is required').notEmpty();
  req.assert('email','A valid email is required').isEmail();
  req.assert('password','Enter a password 6 - 20').len(6,20);

  var errors = req.validationErrors();
  if(errors){
      res.status(422).json(errors);
      return;
  }

  //get data
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  req.getConnection(function(err, conn){
    if (err) return next("Cannot Connect");

    const query = conn.query('UPDATE t_user set ? WHERE user_id = ? ', [data,userId], function(err, rows){
      if (err) {
        console.log(err);
        return next("Mysql error, check your query");
      } else {
        res.sendStatus(200);
      }
    });
  });
  
});

module.exports = router;