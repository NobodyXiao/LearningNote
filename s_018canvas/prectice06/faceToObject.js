/*
* @Author: anchen
* @Date:   2016-11-17 07:09:33
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-17 07:36:43
*/

'use strict';
function pieAnimation(option){
    this._init(option);
};
pieAnimation.prototype={
    _init:function(option){
        this.x=option.x||0,
        this.y=option.y||0,
        this.radius=option.radius||0,
        this.data=option.data||[],

        //饼状图所有的 物件的组
        this.group = new Konva.Group({
            x: this.x,
            y: this.y
        });

        //饼状图：所有的 扇形的组
        this.wedgeGroup = new Konva.Group({
            x: 0,
            y: 0
        });

        //饼状图： 所有的文字的组
        this.textGroup = new Konva.Group({
            x: 0,
            y: 0
        });

        this.group.add( this.wedgeGroup );
        this.group.add( this.textGroup );

        var self = this;
        var tempAngel = -90;//从-90开始绘制
        this.data.forEach(function(item,index){
                var angle = 360*item.value;
                // 将每个扇区的角度转换成弧度制
                var wedge = new Konva.Wedge({
                    x:0,
                    y:0,
                    angle: angle,  //扇形的角度
                    radius: self.radius,    //扇形的半径
                    fill: item.color,   //扇形的填充颜色
                    rotation: tempAngel //扇形的旋转角度
                });
                self.wedgeGroup.add( wedge );
                // 绘制每个扇形对应的文字
                var textAngle = tempAngel + 1/2 * angle;
                // 文本对应的角度
                var text = new Konva.Text({
                    x:(self.radius+25)*Math.cos(Math.PI/ 180 * textAngle),
                    y:(self.radius+25)*Math.sin(Math.PI/ 180 * textAngle),
                    fill:item.color,
                    text: item.value*100 +'%',
                    fontStyle:"bold",
                    fontSize:16,
                });

                if(  textAngle > 90 && textAngle < 270 ) {
                //让文本向左边 移动文字宽度的位置。
                text.x( text.x() - text.getWidth() );
            };

            self.textGroup.add( text );

            tempAngel += angle;

    });
                 //绘制圆环的线
        var cir = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this.radius+10,
            stroke: '#ccc',
            strokeWidth: 2
        });

        this.group.add( cir );
        this._animateIndex = 0;

},
    playAnimate:function(){
        var index = 0; //动画的索引
        var self = this;
        //根据索引显示动画
        //把所有扇区 角度设置为0
        if( this._animateIndex == 0 ) {
            //拿到所有的 扇形
            this.wedgeGroup.getChildren().each(function(item, index ){
                item.angle(0);
            });
        }
        var item = this.wedgeGroup.getChildren()[this._animateIndex];
        item.to({
            angle: this.data[this._animateIndex].value * 360,
            duration: 2 * this.data[this._animateIndex].value,
            onFinish: function() {
                self._animateIndex ++;
                if( self._animateIndex >= self.data.length) {

                    self._animateIndex = 0;//让他的索引再回到0

                    //************************重点***********************
                    return;// 会把整个递归执行完成。
                }
                //继续执行当前方法，播放下一个动画
                self.playAnimate();
            }
        });
},
    //把饼状图添加到层里面的方法
    addToGroupOrLayer: function( arg ) {
        arg.add( this.group );
}
};