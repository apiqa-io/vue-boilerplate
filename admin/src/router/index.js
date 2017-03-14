import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Index from 'components/Index'
import Login from 'components/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.userId) {
    Vue.axios.get('/api/admin/account')
    .then(({ data }) => {
      if (!data.user.id) {
        next('/login')
      } else {
        store.setUserId(data.user.id)
        next()
      }
    })
    .catch(() => next('/login'))
  } else {
    next()
  }
})

export default router
