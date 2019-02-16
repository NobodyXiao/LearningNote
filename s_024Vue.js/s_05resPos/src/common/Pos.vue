<template>
  <div id="pos">
    <el-row>
      <el-col :span="8">
        <div class="order-block" id="order-list">
          <el-tabs v-model="activeName">
            <el-tab-pane label="点餐" name="first">
              <el-table :data="tableData" border style="width:100%">
                <el-table-column prop="goodsName" label="商品名称" name="first">
  
                </el-table-column>
                <el-table-column prop="count" label="数量" width="65">
  
                </el-table-column>
                <el-table-column prop="price" label="价格" width="65">>
  
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template scope="scope">
                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                    <el-button type="text" size="small" @click="reduceOrderList(scope.row)">减少</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class='accmulate'>
                <span>数量:
                  <strong>{{totalCount}}</strong>
                </span>
                <span>金额:
                  <strong>{{totalMoney}}</strong>
                </span>
              </div>
              <div class="buttonGroup">
                <el-button type="warning" @click="delayCheckout()">挂单</el-button>
                <el-button type="danger" @click="delAllGoods()">删除</el-button>
                <el-button type="success" @click="checkout()">结算</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单" name="second">
              <el-table :data="tableData2" border style="width:100%">
                <el-table-column prop="goodsName" label="商品名称" name="first">
  
                </el-table-column>
                <el-table-column prop="count" label="数量" width="80">
  
                </el-table-column>
                <el-table-column prop="price" label="价格" width="80">>
  
                </el-table-column>
                </el-table-column>
              </el-table>
              <div style="padding-top:20px">
                <el-button type="success" @click="goOncheckout()">继续结算</el-button>
                <el-button type="danger" @click="delDelayGoods()">删除订单</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="16" id="product">
        <div class="best-sellers">
          <div class="title">常用商品</div>
          <ul>
            <li v-for=" item in oftenGoods " @click='addOrderList(item)'>
              <span class="bestSellerName">{{item.goodsName}}</span>
              <span class="bestSellerPrice">&yen;{{item.price}}</span>
            </li>
          </ul>
        </div>
        <div class="pro-block">
          <el-tabs v-model="defaultName">
            <el-tab-pane label="汉堡" name="first">
              <div class="foodPart">
                <ul>
                  <li v-for=" item in type0Goods" @click='addOrderList(item)'>
                    <div class="leftPart">
                      <span class="food-img">
                        <img :src="item.goodsImg" width="100%" height="100%"></img>
                      </span>
                    </div>
                    <div class="rightPart">
                      <span class="food-name">{{item.goodsName}}</span>
                      <span class="food-price">&yen;{{item.price}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食" name="second">
              <div class="foodPart">
                <ul>
                  <li v-for=" item in type1Goods" @click='addOrderList(item)'>
                    <div class="leftPart">
                      <span class="food-img">
                        <img :src="item.goodsImg" width="100%" height="100%"></img>
                      </span>
                    </div>
                    <div class="rightPart">
                      <span class="food-name">{{item.goodsName}}</span>
                      <span class="food-price">&yen;{{item.price}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料" name="third">
              <div class="foodPart">
                <ul>
                  <li v-for=" item in type2Goods" @click='addOrderList(item)'>
                    <div class="leftPart">
                      <span class="food-img">
                        <img :src="item.goodsImg" width="100%" height="100%"></img>
                      </span>
                    </div>
                    <div class="rightPart">
                      <span class="food-name">{{item.goodsName}}</span>
                      <span class="food-price">&yen;{{item.price}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐" name="fourth">
              <div class="foodPart">
                <ul>
                  <li v-for=" item in type3Goods" @click='addOrderList(item)'>
                    <div class="leftPart">
                      <span class="food-img">
                        <img :src="item.goodsImg" width="100%" height="100%"></img>
                      </span>
                    </div>
                    <div class="rightPart">
                      <span class="food-name">{{item.goodsName}}</span>
                      <span class="food-price">&yen;{{item.price}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pos',
  data () {
    return {
      defaultName: 'first',
      activeName: 'first',
      tableData: [],
      tableData2: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalCount: 0,
      totalMoney: 0
    }
  },
  created () {
    axios.get('http://jspang.com/DemoApi/oftenGoods.php')
      .then(response => {
        this.oftenGoods = response.data
      })
      .catch(error => {
        console.log(error)
      })
    axios.get('http://jspang.com/DemoApi/typeGoods.php')
      .then(response => {
        this.type0Goods = response.data[0]
        this.type1Goods = response.data[1]
        this.type2Goods = response.data[2]
        this.type3Goods = response.data[3]
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted: function () {
    var orderListH = document.body.clientHeight
    document.getElementById('order-list').style.height = orderListH + 'px'
    document.getElementById('product').style.height = orderListH + 'px'
  },
  methods: {
    addOrderList: function (goods) {
      this.totalCount = 0
      this.totalMoney = 0
      let isHave = false
      for (let i = 0; i < this.tableData.length; i++) {
        // con  sole.log(this.tableData)
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true
        }
      }
      if (isHave) {
        let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
        arr[0].count += 1
      } else {
        let newGoods = { goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1 }
        this.tableData.push(newGoods)
      }
      this.getAllMoney()
    },
    reduceOrderList: function (goods) {
      goods.count--
      this.getAllMoney()
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].count < 1) {
          this.tableData.splice(i, 1)
          return this.tableData
        }
      }
    },
    delSingleGoods: function (goods) {
      // 首先获取了被点击行的数据，通过比较id，留下了被点击商品之外的数据
      this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId)
      this.getAllMoney()
    },
    delAllGoods: function () {
      this.totalCount = 0
      this.totalMoney = 0
      this.tableData = []
    },
    checkout: function () {
      if (this.totalCount !== 0) {
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
        this.$message({
          message: '结账成功，又一笔钱收进口袋啦!',
          type: 'success'
        })
      } else {
        this.$message.error('不能空结,您还没有选择商品哦！')
      }
    },
    delayCheckout: function () {
      this.tableData2 = this.tableData
      this.tableData = []
      this.totalMoney = 0
      this.totalCount = 0
    },
    goOncheckout: function () {
      this.tableData = this.tableData2
      this.tableData2 = []
    },
    delDelayGoods: function () {
      this.tableData2 = []
    },
    getAllMoney () {
      this.totalCount = 0
      this.totalMoney = 0
      this.tableData.forEach((element) => {
        this.totalCount += element.count
        this.totalMoney = this.totalMoney + (element.price * element.count)
        console.log(this.tableData)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #pos {
    float: right;
    height: 100%;
    width: 95%;
    background: #e4e4e4;
  }

  el-row {
    height: 100%;
  }

  .order-block {
    background: #eee;
    border-right: #ccc;
  }

  .buttonGroup {
    margin-top: 20px;
  }

  .title {
    text-align: left;
    background: #f0f0f0;
    height: 42px;
    line-height: 42px;
    border-bottom: grey;
    padding: 0 20px
  }

  .best-sellers {
    overflow: hidden;
  }

  .best-sellers ul li {
    list-style: none;
    float: left;
    font-size: 14px;
    border: 1px solid grey;
    padding: 6px;
    margin: 10px 20px;
    background: #fff;
    cursor: pointer
  }

  .pro-block {
    clear: both;
    margin-top: 8px;
  }

  .foodPart {
    padding: 10px;
    width: 100%;
    overflow: hidden;
  }

  .foodPart ul {
    width: 100%;
  }

  .foodPart ul li {
    height: 80px;
    width: 20%;
    float: left;
    list-style: none;
    margin-bottom: 20px;
    margin-right: 50px;
    background: #fff;
    position: relative;
    cursor: pointer
  }

  .foodPart ul li div {
    float: left;
    height: 100%;
    position: absolute;
    top: 0;
  }

  .foodPart ul li .leftPart {
    width: 45%;
    height: 100%;
    left: 0;
  }

  .foodPart ul li .rightPart {
    width: 60%;
    margin-left: 40%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .foodPart ul li .rightPart span {
    display: block;
  }

  .food-price,
  .bestSellerPrice {
    color: #4db3ff;
  }

  .accmulate {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px
  }

  .accmulate span {
    margin: 0 10px;
  }
</style>
