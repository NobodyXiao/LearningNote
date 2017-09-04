<template>
  <div id="app">
    <left-Nav></left-Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import leftNav from '@/page/leftNav'
export default {
  name: 'app',
  components: {
    leftNav
  }
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
  overflow:hidden;
}
</style>
