// 客户端代码编写
// 引入相关模块
const net = require('net');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What is your name?', (name)=>{
    name = name.trim();
    // 去掉换行和空格
    if(!name){
        throw new Error('请输入名字');
    }else{
        // 拿到名称之后就创建跟服务端的链接
        var sever = net.connect(
            {port:8080,host:'192.168.3.56'},()=>{
                console.log(`Welcome ${name} to 8080 chatroom!`);
                // 开始监听数据
                server.on('data',(chunk)=>{
                    try{
                        var signal = JSON.parse(chunk.toString().trim());
                        var protocol = signal.protocol;
                        // 分辨一下聊天的类型
                        switch(protocol){
                            case 'broadcast':
                                console.log('\nboardcast');
                                console.log(signal.from + '>');
                                console.log(signal.message);
                                rl.prompt();
                                break;

                            default:
                                server.write('你要做什么？'); 
                                break;
                        }
                    }catch(error){
                        server.write('输入的格式不正确'); 
                    }
                });
                
                rl.setPrompt(name + '> ');

                rl.prompt();
                rl.on('line',(line)=>{
                    var send = {
                        protocol: 'boardcast',
                        from: name,
                        message: line.toString().trim()
                    };
                    server.write(JSON.stringify(send));

                    rl.prompt();
                }).on('close', () => {
                // console.log('Have a great day!');
                // process.exit(0);
                });
            });
    }

});