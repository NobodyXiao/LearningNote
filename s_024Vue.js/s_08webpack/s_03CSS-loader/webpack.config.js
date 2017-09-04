module.exports = {
    entry:{
        bundle1:"./main.js"
    },
    output:{
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {test:/\.css$/,loader:'style-loader!css-loader'},
        ]
    }
}