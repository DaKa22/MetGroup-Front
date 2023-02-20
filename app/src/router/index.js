import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        login: true
      }
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('../views/Store.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/Article.vue'),
      meta: {
        auth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to);
  const token = localStorage.getItem('token') || null
  if (to.name != 'login' && token == null) {
    next({
      name: 'login'
    })
  }
  if (to.name == 'login' && token != null) {
    next({
      name:home
    })
  }
  if (to.meta.auth) {
    if (token != null) {
      next()
    }else{
      next({
        name:login
      })
    }
  }
  next()
})


export default router
