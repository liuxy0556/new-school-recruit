import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/layout/layout'

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/login',
    component: Layout,
    redirect: '/login',
    children: [
      { path: '/login', name: 'Login', media: { title: '登录' }, component: () => import('../pages/login/index') },
      { path: '/register', name: 'Register', media: { title: '注册' }, component: () => import('../pages/login/register') },
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', name: 'Home', media: { title: '首页' }, component: () => import('../pages/home/index') },
      { path: '/home1', name: 'Home1', media: { title: '作业' }, component: (resolve) => { require(['../pages/home/index1'], resolve) } },
    ]
  }
];

export default new Router({
  // mode: 'hash',
  routes: constantRouterMap
})

