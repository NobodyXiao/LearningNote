const express = require('express')
const router = express.Router()

//show the CRUD interface | GET
router.get('/', function(req,res,next){
  req.getConnection(function(err,conn){
      // 没有连接上数据库
      if (err) return next("Cannot Connect");
      // 数据库被成功连接
      const query = conn.query('SELECT * FROM t_user',function(err,rows){
          // 数据库连接出错
          if(err){
              return next("Mysql error, check your query");
          }
          // 连接成功，渲染页面
          res.render('user',{title:"RESTful Crud Example",data:rows});

       });
  });
});

//post data to DB | POST
router.post('/',function(req,res,next){

  //validation
  req.assert('name','Name is required').notEmpty();
  req.assert('email','A valid email is required').isEmail();
  req.assert('password','Enter a password 6 - 20').len(6,20);

  const errors = req.validationErrors();
  if(errors){
      res.status(422).json(errors);
      return;
  }

  //get data
  const data = {
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
   };

  //inserting into mysql
  req.getConnection(function (err, conn){

      if (err) return next("Cannot Connect");

      const query = conn.query("INSERT INTO t_user set ? ",data, function(err, rows){

         if(err){
              return next("Mysql error, check your query");
         }

        res.sendStatus(200);

      });

   });

});

// 查询用户
router.get('/query', function(req,res,next){
  let name = req.query.name;
  req.getConnection(function(err, conn){

    if (err) {
      return next('Cannot Connect');
    }

    const query = conn.query(`SELECT * FROM t_user  WHERE name LIKE '%${name}%'`, [], function(err, rows){
      if (err) {
        console.log(err);
        return next("Mysql error, check your query");
      } else {
        // res.sendStatus(200);
        // window.location.reload();
        res.send({title:"query user",data:rows});
      }
    });

  });
});


// delete user
router.delete('/:user_id',function(req,res,next){
  const userId = req.params.user_id;
  req.getConnection(function(err, conn){
    if (err) {
      return next('Cannot Connect');
    }
    const query = conn.query('DELETE FROM t_user  WHERE user_id = ? ', [userId], function(err, rows){
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

