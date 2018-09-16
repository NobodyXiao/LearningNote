module.exports = function (app) {
  
  app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
  });
  
  app.get('/', function (req, res) {
    res.send('Welcome');
  })

  app.use('/user', require('./user'));
  app.use('/user/:user_id', require('./user'));
  app.use('/user/query', require('./user'));
  app.use('/edit?:user_id', require('./edit'));
  


  // 在所有请求上定义一个中间件,打印当前的请求方法和url路径
 
}