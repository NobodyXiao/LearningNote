import Vue from 'vue'
import store from './vuex/store'
import App from './App.vue'

new Vue({
  store, // inject store to all children
  el: 'app',
  components: { App }
})
