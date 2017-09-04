var webpack = require('webpack');
module.exports = {
    entry: './main.js',
    output:{
        filename:'bundle.js'
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        })
    ],
    devServer: {
        contentBase: './', //本地服务器所加载的页面所在的目录
        host: '127.0.0.1', //本地IP地址
        // colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        port: '8080' //端口号
 
    }
}