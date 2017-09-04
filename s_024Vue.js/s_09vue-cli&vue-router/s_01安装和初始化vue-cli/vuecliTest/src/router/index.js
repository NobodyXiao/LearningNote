import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Params from '@/components/params'
import Error from '@/components/Error'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      name: 'params',
      path: '/params/:newsId/:newsTitle',
      component: Params,
      alias: '/gotoParams/:newsId/:newsTitle'
    },
    {
      path: '/goHome',
      redirect: '/'
    },
    {
      path: '/goParams/:newsId/:newsTitle',
      redirect: '/params/:newsId/:newsTitle'
    },
    {
      path: '*',
      component: Error
    }
  ]
})
