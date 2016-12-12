// Histogram：柱状图的意思 英 ['hɪstəgræm]  美 ['hɪstəɡræm]
function HistogramChart( option ) {
    // zzt
    this._init( option );
    // JQJB:警情级别
}

HistogramChart.prototype = {
    _init: function( option ) {
        this.x = option.x || 0;
        this.y = option.y || 0; //柱状图的原点坐标
        this.w = option.w || 0; //柱状图的总宽度
        this.h = option.h || 0; //柱状图高度

        this.data = option.data || [];

        var x0 = 0;
        var y0 = 0;

        // 柱状图中所有的元素的组
        this.group = new Konva.Group({
            x: this.x,
            y: this.y
        });

        //放矩形的组
        this.rectGroup = new Konva.Group({
            x: 0,
            y: 0
        });
        this.group.add( this.rectGroup );

        //添加一个放百分比文字的组
        this.textPercentGroup = new Konva.Group({
            x: 0,
            y: 0
        });
        this.group.add( this.textPercentGroup );

        //初始化底线
        var bsLine = new Konva.Line({
            //x:从 1/8 x,  3/4
            //y: 3/4 高度处
            points: [x0,y0, x0+this.w, y0], //要求 底线按照画布的左上角顶点进行定位。
            strokeWidth: 1,
            stroke: 'lightgreen',
        });

        this.group.add( bsLine );

        var rectWidth = this.w / this.data.length; //每个矩形占用的总宽度
        var height = this.h;


        var self = this;// 当前柱状图的对象
        //初始化 矩形
        //初始化 文字%
        //初始化 底部文字
        this.data.forEach(function(item, index) {// item:数组中元素，index是索引值
            //生成一个矩形
            var rect = new Konva.Rect({
                x: x0 + (1/4 + index ) * rectWidth,//
                y: y0 - item.value * height,
                width: 1/2 * rectWidth,
                height: item.value * height,
                fill: item.color,
                opacity: .8,         //设置透明度
                cornerRadius: 10,    //设置圆角
                shadowBlur: 10,       //设置阴影的模糊级别
                shadowColor: 'black',//设置阴影的颜色
                // shadowOffsetX: 4, //设置阴影的X偏移量
                // shadowOffsetY: 4  //设置应用的Y偏移量
            });
            self.rectGroup.add( rect );

            //把百分比的文字放到 柱状图的顶部
            var text = new Konva.Text({
                x: x0 + (index ) * rectWidth,//
                y: y0 - item.value * height - 14,
                fontSize: 14,
                text: item.value * 100 + '%',
                fill: item.color,
                width: rectWidth,// 配合让文字居中
                align: 'center',  //
                name: 'textPercent'  //设置文字的name后，可以通过类选择器进行选取。
            });
            self.textPercentGroup.add( text );

            //把百分比的文字放到 柱状图的顶部
            var textBottom = new Konva.Text({
                x: x0 + (1/4 + index ) * rectWidth,//
                y: y0,
                fontSize: 14,
                text: item.name,
                fill: item.color,
                // width: rectWidth,// 配合让文字居中
                // align: 'center',  //
                rotation: 30
            });
            self.group.add( textBottom );
        });
    },
    addToGroupOrLayer: function( arg ) {
        arg.add( this.group );
    },
    playAnimate: function() {
        var self = this;
        // 让柱状图 y→ y0  height：0
        this.rectGroup.getChildren().each(function(item, index){
            item.y(0);
            item.height(0);
            //经过一个动画还原
            item.to({
                duration: 1,
                y: - self.data[index].value * self.h,
                height: self.data[index].value * self.h
            });
        });
        //让文字有个动画
        this.textPercentGroup.getChildren().each(function( item, index ){
            item.y(-14);
            item.to({
                duration: 1,
                y: - self.data[index].value * self.h -14
            });
        });
    }
}