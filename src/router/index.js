import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const constantRouter = [
  // {
  //   path: '/',
  //   name: 'HelloWorld',
  //   component: HelloWorld
  // },
  {
    path: '/redirect',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
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
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouter
})
const router = createRouter()
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
