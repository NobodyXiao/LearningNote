new Vue({
    el:"#carousel",
    data:{
        slideList:[
            {
                "clickUrl":"#",
                "desc":"nhwc",
                "image":"http://dummyimage.com/1745x492/f1d65b",
                "selfIndex":0
            },
            {
                "clickUrl": "#",
                "desc": "hxrj",
                "image": "http://dummyimage.com/1745x492/40b7ea",
                "selfIndex":1
            },
            {
                "clickUrl": "#",
                "desc": "rsdh",
                "image": "http://dummyimage.com/1745x492/e3c933",
                "selfIndex":2
            }
        ],
        currentIndex: 0,
        timer: ''
    },
    created() {
        //在DOM加载完成后，下个tick中开始轮播
        this.$nextTick(() => {
        this.timer = setInterval(() => {
            this.autoPlay()
        }, 4000)
    })
    },
    methods:{
        go() {
            this.timer = setInterval(() => {
            this.autoPlay()
    }, 4000)
    },
        stop() {
            clearInterval(this.timer)
            this.timer = null
    },
        changeIndex(index) {
            this.currentIndex = index;

    },
        autoPlay() {
            this.currentIndex++
                if (this.currentIndex > this.slideList.length - 1) {
            this.currentIndex = 0
        }
    } ,

    }

})