import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 重定向路由的地址
    { path: '/', component: Login },
    { path: '/login', component: Login },
    {
      path: '/home', component: Home, redirect: '/welcome', children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users }
      ]
    }
  ]
})
// 挂载路由 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
