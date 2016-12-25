// 建立一个服务端程序
const net = require('net');
// 引入net模块

var clients = [];
// 用于存储所有的链接
var server = net.createServer((socket)=>{
    clients.push(socket);
    // 将连接的客户端存入数组中
    console.log(`Welcome ${socket.remoteAddress} to 2080 chatroom`);
    // 提示文字，提示某个ID进入聊天室中
    function broadcast(signal){
        console.log(signal);
        // 肯定有用户名和消息
        var username = signal.from;
        var message = signal.message;
        var send = {
             protocol: signal.protocol,
             from: username,
             message: message
    };
    clients.forEach(client=> {
      client.write(JSON.stringify(send));
    });
    }
    // 有任何客户端发消息都会触发
  socket.on('data', (chunk) => {
    // chunk：boardcast|张三|弄啥咧！
    // chunk：{"protocol":"boardcast","from":"张三","message":"弄啥咧！"}
    // chunk：{"protocol":"p2p","from":"张三","to":"李四","message":"弄啥咧！"}
    try {
      var signal = JSON.parse(chunk.toString().trim());
      var protocol = signal.procotol;
      switch (protocol) {
        case 'boardcast':
          boardcast(signal);
          break;
        // case 'p2p':
        //   p2p(signal);
        //   break;
        // case 'shake':
        //   shake(signal);
        //   break;
        default:
          socket.write('弄啥咧！你要干的我干不了');
          break;
      }
    } catch (error) {
      socket.write('弄啥咧！');
    }
  });
});

var port = 8080;
server.listen(port, (err) => {
  if (err) {
    console.log('端口被占用');
    return false;
  }
  console.log(`服务端正常启动监听【${port}】端口`);
})
