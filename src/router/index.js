import Vue from 'vue'
import VueRouter from 'vue-router'

const _import = file => () => import(`@/views/${file}.vue`)

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Index',
    redirect: {
      name: "Blogs"
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: _import('Blogs')
  },
  {
    path: '/login',
    name: 'Login',
    component: _import('Login')
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: _import('BlogEdit'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: _import('BlogDetail')
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: _import('BlogEdit'),
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 定义全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    const token = localStorage.getItem('token')
    if (token) {
      if (to.path === '/login') {} else {
        next()
      }
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router