import Vue from 'vue'
import Router from 'vue-router'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cart',
      component: Cart
    },
    {
      path: '*',
      component: Cart
    }
  ]
})
