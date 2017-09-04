<template>
  <div id="cart">
      <div class="nav"><span>Shopping Cart</span></div>
      <div id="content">
        <template>
          <el-tabs v-model="activeName" id="tab-page">
            <el-tab-pane label="商品页面" name="first" id="tabChild1" style='height:100%'>
              <div class="pro-picture" id="picDiv">
                <img v-bind:src="imgUrl"/></img>
              </div>
              <div class="pro-infor" id="infor-Div">
                <div class="pro-title">Apple/苹果 iPhone 6S</div>
                <div class="pro-des">
                  <span>描述：</span>
                  <span>3D Touch、1200万像素照片、4k视频，强大功能于一身。</span>
                </div>
                <div class="pro-price">
                  <span>价格：</span>
                  <span class='chosedPrice'>{{price}}</span>
                </div>
                <div class="pro-shape" >
                  <span>外观：</span>
                  <button v-for='(item,index) in mobileColor' @click = 'changePic($event,index)' class='colorBtn'>{{item.color}}</button>
                </div>
                <div class="pro-capacity">
                  <span>容量：</span>
                  <button v-for='(item,index) in mobileCapacity' @click='changePrice($event,index)' class='priceBtn'>{{item.cap}}</button>
                </div>
                <div class='buyButton'  @click='addGoods'>
                  <button>加入购物车({{this.goods.length}})</button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label='购物车页面' name="second" id="tabChild2">
              <div v-bind:class="{ have: isHave }">购物车空空如也</div>
              <div v-bind:class="{ have: !isHave }">
                <div class='cart-header'>
                  <span>购物车</span>
                  <span>总计：{{sumMoney}}</span>
                </div>
                <div class='cart-content'>
                  <ul>
                    <li v-for="(item,index) in goods">
                      <img src='../img/timg.png' @click= 'deleteGoods($event)' v-bind:count='index'></img>
                      <span>Apple/苹果 iPhone6s </span>
                      <span>{{item.color}}，{{item.cap}}</span>
                      <span>1</span>
                      <span>{{item.money}}</span>
                    </li>
                  </ul>
                </div>
                <div class='acumulate'>
                  <span>结算</span>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Cart',
  data () {
    return {
      activeName: 'first',
      isHave: false,
      imgUrl: 'http://o8yu724qs.bkt.clouddn.com/iphone6s-silver-select-2015.png',
      price: '5288 - 6888',
      sumMoney: 0,
      mobileColor: [
        {color: '银色', url: 'http://o8yu724qs.bkt.clouddn.com/iphone6s-silver-select-2015.png'},
        {color: '深空灰色', url: 'http://o8yu724qs.bkt.clouddn.com/iphone6s-gray-select-2015.png'},
        {color: '金色', url: 'http://o8yu724qs.bkt.clouddn.com/iphone6s-gold-select-2015.png'},
        {color: '玫瑰金', url: 'http://o8yu724qs.bkt.clouddn.com/iphone6s-rosegold-select-2015.png'}
      ],
      mobileCapacity: [
        {cap: '16GB', money: 5288},
        {cap: '64GB', money: 6088},
        {cap: '128GB', money: 6888}
      ],
      goods: []
    }
  },
  methods: {
    changePic: function ($event, index) {
      this.imgUrl = this.mobileColor[index].url
      var colorButtons = document.getElementsByClassName('colorBtn')
      // 设置所有内存按钮的样式
      for (var i = 0; i < colorButtons.length; i++) {
        colorButtons[i].style.borderColor = 'gray'
        colorButtons[i].classList.remove('chosedColor')
      }
      var dom = event.target
      dom.style.borderColor = 'red'
      dom.classList.add('chosedColor')
    },
    changePrice: function ($event, index) {
      this.price = this.mobileCapacity[index].money
      var buttons = document.getElementsByClassName('priceBtn')
      // 设置所有内存按钮的样式
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.borderColor = 'gray'
        buttons[i].classList.remove('chosedCap')
      }
      var dom = event.target
      dom.style.borderColor = 'red'
      dom.classList.add('chosedCap')
    },
    addGoods: function () {
      this.sumMoney = 0
      var buyColor = document.getElementsByClassName('chosedColor')[0].innerHTML
      var buyCap = document.getElementsByClassName('chosedCap')[0].innerHTML
      var costMoney = document.getElementsByClassName('chosedPrice')[0].innerHTML
      this.goods.push({color: buyColor, cap: buyCap, money: costMoney})
      for (var i = 0; i < this.goods.length; i++) {
        this.sumMoney += parseInt(this.goods[i].money)
      }
      if (this.goods.length === 0) {
        this.isHave = false
      } else {
        this.isHave = true
      }
    },
    deleteGoods: function ($event) {
      this.sumMoney = 0
      var deleteNum = $event.target.getAttribute('count')
      this.goods.splice(deleteNum, 1)
      for (var i = 0; i < this.goods.length; i++) {
        this.sumMoney += parseInt(this.goods[i].money)
      }
      if (this.goods.length === 0) {
        this.isHave = false
      } else {
        this.isHave = true
      }
    }
  }
}
</script>
<style scoped>
  #app>#cart{
    height:100%;
    width:100;
    overflow: hidden;
    font-family: '微软雅黑'
  } 
  #app>#cart>.nav{
    height:8%;
    width:100%;
    background:#eee;
    font-size: 22px;
    font-weight: bold;
  }
  #app>#cart>.nav>span{
    display:block;
    width:100%;
    position:relative;
    top:50%;
    transform:translateY(-50%);
  }
  #app>#cart>#content{
    height:100%;
    width:100%;
    font-size: 18px;
  }
  #app>#cart>#content #tab-page{
    height:100%;
    width:100%;
    position:relative;
    overflow:hidden
  }
  #app>#cart>#content #tab-page #tabChild1{
    height:100%;
    width:100%;
    overflow: hidden
  }
  #tabChild1>div{
    float:left;
    width:35%;
    height:80%;
  }
  #tabChild1>#picDiv{
    padding-left:10%
  }
  #tabChild1>#infor-Div{
    margin-top:5%;
    padding-right:10%
  }
  #tabChild1>#picDiv>img{
    width:100%;
    height:100%
  }
  #tabChild1>.pro-infor>div{
    padding:20px 0;
    text-align:left;
    font-size:16px
  }
  #tabChild1>.pro-infor>.pro-title{
    font-size:28px;
    font-weight:bold;
    border-bottom:1px solid gray;
  }
  #tabChild1>.pro-infor>div>span:nth-child(1){
    font-size:16px;
    font-weight:bold;
    color:gray
  }
  #tabChild1>.pro-infor>div>button{
    margin-right:20px;
    border:2px solid gray;
    background:#eee;
  }
  #tabChild1>.pro-infor>.pro-price>span:nth-child(2){
    color:red;
    font-weight:bold;
  }
  #tabChild1>.pro-infor>.buyButton {
    height:40px;
    width:100%;
    padding:0;
    margin-top:20px;
    overflow:hidden
  }
  #tabChild1>.pro-infor>.buyButton>button{
    height:100%;
    width:100%;
    background:red;
    color:#fff;
    border:none;
    font-size:18px;
    font-weight:bold;
  }
  .have{
    display:none
  }
  #tabChild2>div:nth-child(1){
    height:200px;
    width:800px;
    margin:0 auto;
    border: 2px dashed gray;
    color: red;
    font-weight: bold;
    line-height: 200px
  }
  #tabChild2>div:nth-child(2){
    height:auto;
    width:800px;
    margin:10px auto;
    border: 1px solid pink;
    overflow: scroll
  }
  #tabChild2>div .cart-header{
    height:40px;
    line-height:40px;
    width:100%;
    background:#ebc4c4;
    font-size:15px;
    color:#a30d0d;
    font-weight:bold;
    position: relative;
    margin-bottom:20px
  }
  #tabChild2>div .cart-header>span:nth-child(1){
   position:absolute;
   left:15px
  }
  #tabChild2>div .cart-header>span:nth-child(2){
   position:absolute;
   right:30px
  }
  #tabChild2>div .cart-content{
    height:auto;
    width:100%;
    background:#eee
  }
  #tabChild2>div .cart-content>ul{
    width:100%;
    margin:0;
    padding:0;
  }
  #tabChild2>div .cart-content>ul>li{
    height:26px;
    list-style:none;
    font-size:13px;
    margin:6px 0;
    position:relative;
    line-height:26px;
    text-align: left
  }
  #tabChild2>div .cart-content>ul>li>img{
    display: inline-block;
    height:18px;
    width:18px;
    position:relative;
    top:4px;
    margin:0 5px 0 20px
  }
  
  #tabChild2>div .cart-content>ul>li>span:nth-child(3){
    background: green;
    color:#FFF;
    font-weight:bold;
    padding:0 5px;
    border-radius:5px;
    margin:0 10px 0 5px
  }
  #tabChild2>div .cart-content>ul>li>span:nth-child(4){
   display: inline-block;
   height:16px;
   width:16px;
   border-radius:18px;
   background:#a30d0d;
   line-height: 16px;
   text-align: center;
   color:#fff;
   font-weight:bold
  }
  #tabChild2>div .cart-content>ul>li>span:nth-child(5){
    color:#a30d0d;
    font-weight:bold;
    position: absolute;
    right:30px
  }
  #tabChild2>div .acumulate{
    width:100%;
    height:50px;
    background:#e0e0e0;
    color:#fff;
    border-top:1px solid #ccc;
    line-height: 50px;
    margin-top:20px
  }
  #tabChild2>div .acumulate>span{
    display:inline-block;
    width:96%;
    background:#d93c3c;
    height:35px;
    line-height: 35px;
    border-radius:10px;
    font-weight:bold;
    font-size:16px
  }
</style>

