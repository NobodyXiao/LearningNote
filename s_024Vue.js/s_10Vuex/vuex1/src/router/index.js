import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Count from '@/components/count'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/count',
      component: Count
    }
  ]
})
