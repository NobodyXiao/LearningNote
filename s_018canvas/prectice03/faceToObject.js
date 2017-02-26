/*
* @Author: anchen
* @Date:   2016-11-14 22:13:24
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-14 22:37:05
*/

'use strict';
function Sprits(opition){
    //构造函数执行的时候，立即调用初始化的函数
    this._init(opition);
}
Sprits.prototype={
    // 初始化
    _init: function( option ) {
        this.x = option.x === 0 ? 0 : (option.x || 10);//0
        this.y = option.y === 0 ? 0 : (option.y || 10);//0

        this.w = option.w || 40; // 绘制到canvas上的宽高
        this.h = option.h || 65;

        this.fps =  option.fps || 10; // frame per second
        this.originW = option.originW || 40;    // 截取的精灵图片中的 精灵的宽高。
        this.originH =  option.originH ||65;

        this._dirIndex = 0;

        this._imgSrc = option.imgSrc || '';
    },
    //渲染当前动画
    render: function( ctx ) {// 把自己画 到画布上去
        //第一步： 把图片加载
        var img = new Image();
        img.src = this._imgSrc;

        var self = this;

        img.onload = function() {
            var frameIndex = 0;
            // this == img
            // 第二步：加载完图片后，　启动一个　时钟，不停的渲染动画
            setInterval(function(){
                ctx.clearRect( 0,0 , ctx.canvas.width , ctx.canvas.height);
                ctx.drawImage(
                    img //绘制的原始图片
                    , frameIndex * self.originW  // 剪切图片的x坐标
                    , self._dirIndex * self.originH
                    , self.originW
                    , self.originH
                    , self.x
                    , self.y
                    , self.w
                    , self.h
                );

                frameIndex ++ ;
                frameIndex %= 4;
            }, 1000 / self.fps)
        }
    },
    //改变方向
    changeDir: function( dir ) {
        if( dir == 'left' ) {
            this._dirIndex = 1;
        }

        if( dir == 'right' ) {
            this._dirIndex = 2;
        }


        if( dir == 'up' ) {
            this._dirIndex = 3;
        }

        if( dir == 'down' ) {
            this._dirIndex = 0;
        }
    }

}

