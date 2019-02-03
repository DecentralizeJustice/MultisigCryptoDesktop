import Vue from 'vue'
import Router from 'vue-router'
import Setup from './views/Setup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'setup',
      component: Setup
    }
  ]
})
