<template>
  <div id="leftNav">
    <ul>
      <li>
        <i class="icon iconfont icon-goumai"></i>
        <span>收银</span>
      </li>
      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <span>店铺</span>
      </li>
      <li>
        <i class="icon iconfont icon-hanbao"></i>
        <span>商品</span>
      </li>
      <li>
        <i class="icon iconfont icon-huiyuanqia"></i>
        <span>会员</span>
      </li>
      <li>
        <i class="icon iconfont icon-shezhi"></i>
        <span>设置</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'leftNav'
}
</script>

<style scoped>
  #leftNav {
    margin:0px;
    padding: 0px;
    height:100%;
    width:5%;
    background:#20a0ff;
    font-size:14px;
    float:left;
  }
  #leftNav>ul {
    height:100%;
    width:100%;
    margin:0px;
    padding: 0px;
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: center;
  }
  #leftNav li {
    width:60%;
    font-size:14px;
    list-style:none;
    float:left;
    border-bottom:1px solid #ccc;
    margin-top:2em;
  }
  #leftNav span {
    display:block;
  }
  .iconfont{
    font-size:18px;
  }
</style>
