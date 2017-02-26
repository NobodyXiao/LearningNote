/*
* @Author: anchen
* @Date:   2016-11-15 21:32:21
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-15 23:02:43
*/

'use strict';
function circleText(option){
    this._init(option);
}
circleText.prototype = {
    _init:function(option){
        this.x=option.x||0;
        this.y=option.y||0;
        this.innerRadius=option.innerRadius||0;
        this.outerRadius = option.outerRadius||0;
        this.text = option.text||"";
        this.innerStyle = option.innerStyle||"red";
        this.outerStyle = option.outerStyle||"blue";
        this.fontSize = option.fontSize||12;

        this.group = new Konva.Group({
        x:this.x,
        y:this.y,
    });
         // 在组上初始化一个内圆
        var innerCircle =new Konva.Circle({
                x:0,
                y:0,
                radius:this.innerRadius,
                fill:this.innerStyle,
            });
        this.group.add(innerCircle);

        // 在组上初始化一个外圆
        var outerRing =new Konva.Ring({
                x:0,
                y:0,
                innerRadius:this.innerRadius,
                outerRadius:this.outerRadius,
                fill:this.outerStyle,
                // opacity:0.9,
            });
        this.group.add(outerRing);

        // 初始化文字

        var text = new Konva.Text({
                x:0-this.outerRadius,
                y:-7,
                width:this.outerRadius*2,
                fill:"#fff",
                fontStyle:"bold",
                fontSize:this.fontSize,
                align:"center",
                text:this.text,
        });
        this.group.add(text);
},
    addToGroupLayer:function(arg){
        arg.add(this.group);
    }
}