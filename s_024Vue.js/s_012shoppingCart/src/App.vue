<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <Cart></Cart>
  </div>
</template>

<script>
import Cart from './components/Cart.vue'
import store from './vuex/store'
export default {
  name: 'app',
  store,
  components: {
    Cart
  }
  // data () {
  //   return {

  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  width:100%;
  overflow:hidden
}

</style>
