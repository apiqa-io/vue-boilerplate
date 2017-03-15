import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Index from 'components/Index'
// import Login from 'components/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.userId) {
    Vue.axios.get('/api/admin/account')
    .then(({ data }) => {
      store.setUserId(data.user.id)
      next()
    })
    .catch(err => {
      console.error(err.response.data)
      next()
    })
  } else {
    next()
  }
})

export default router
