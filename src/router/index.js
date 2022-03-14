import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/UniqueArray'
import Layout from '@/layout'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/redirect',
    //   component: Layout,
    //   hidden: true,
    //   children: [
    //     {
    //       path: '/redirect/:path',
    //       component: () => import('@/views/redirect/index')
    //     }
    //   ]
    // },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/404',
      component: () => import('@/views/errorPage/404err'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('@/views/errorPage/401err'),
      hidden: true
    },
   
    
  ]
})
