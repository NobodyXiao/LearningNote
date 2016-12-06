const net = require('net');
// 引入net模块

var server  = net.createServer(function socketConnet(socket){

    var client = socket.address();
    // 当有客户端与我连接的时候发出
    console.log(client.address + 'connetion.....');
    // 监听socket是否有数据过来
    socket.on('data',(chunk)=>{
        console.log(chunk.toString());
    });
});

var port = 8080;
server.listen(port,(err)=>{
    if(err){
        console.log('端口被专用');
        return false;
    }
    console.log(`服务器正在监听${port}端口`);
});