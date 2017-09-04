<template>
  <div id="app">
    <img src="./assets/logo.png"><br>
    <button @click='goBack'>后退</button>
    <button @click='goAhead'>前进</button>
    <button @click='goHome'>跳转首页</button><br>
    <router-link to="/">Home</router-link>|
    <router-link to="/params/198/today is very good">Params Page</router-link>|
    <router-link to="/goHome">goHome</router-link>|
    <router-link to="/goParams/122/I like china"> goParams</router-link>|
    <router-link to="/gotoParams/144/ I wanna go homex"> gotoParams</router-link>|
    <router-link to="/*"> 404 page</router-link>|
    <transition name="fade" mode="out-in">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goAhead () {
      this.$router.go(1)
    },
    goHome () {
      this.$router.push('/')
    }
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
  margin-top: 60px;
}
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity 1 .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
