import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import Login from '@/components/view/login'


Vue.use(Router)

const routes= [
 
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path:'*',
    component:() => import('@/components/view/404') 
  },
  {
    path: '/home',
    name: 'Home',
    component: Main,
   
  },
  {
    path: '/first',
    name: 'First',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '一级菜单'
    },
    children:[
      /*{
        path:'/first/fitst_1',
        meta: {
         icon: 'md-trending-up',
         title: '一级菜单-1'
       },
        component:() => import('@/components/view/first/first_3/index')
      },*/
      {
        path:'/first/first_1',
        meta: {
         icon: 'md-trending-up',
         title: '一级菜单-2'
       },
        component:() => import('@/components/view/first/first_1/index')
      }
    ]
  },
  {
    path: '/second',
    name: 'Second',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '二级菜单'
    },
    children:[
      {
        path:'/second/second_1',
        meta: {
         icon: 'md-trending-up',
         title: '二级菜单-01'
       },
        component:() => import('@/components/view/second/second_1/index')
      },
      {
        path:'/second/second_2',
        meta: {
         icon: 'md-trending-up',
         title: '二级菜单-02'
       },
        component:() => import('@/components/view/second/second_2/index')
      }
    ]
  },
  {
    path: '/third',
    name: 'Third',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '三级菜单'
    },
    children:[
      {
        path:'/third/third_1',
        meta: {
         icon: 'md-trending-up',
         title: '三级菜单-01'
       },
        component:() => import('@/components/view/third/third_1/index')
      },
      {
        path:'/third/third_2',
        meta: {
         icon: 'md-trending-up',
         title: '三级菜单-02'
       },
        component:() => import('@/components/view/third/third_2/index')
      },
      {
        path:'/third/third_3',
        meta: {
         icon: 'md-trending-up',
         title: '三级菜单-03'
       },
        component:() => import('@/components/view/third/third_3/index')
      }
    ]
  }
  
 
]

const router = new Router({
  mode:"hash",
  routes: routes
})
export default router