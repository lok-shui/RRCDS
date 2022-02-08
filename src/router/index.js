import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HelloWorld from '@/components/HelloWorld'
import Layout from '@/layout'
import baseRouter from './modules/base'
import businessSubmitRouter from './modules/businessSubmit'
import singleRouter from './modules/single'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path',
        component: () => import('@/views/redirect/index')
      }
    ]
  }
]


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
