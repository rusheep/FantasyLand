import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import layout from '../layouts/default.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'deafult',
      component: () => import('../layouts/default.vue'),
      children:[
        {
          path:'home',
          name:'HomeView',
          component: () => import('../views/HomeView.vue')
        },
        {
          path:'information',
          name:'InformationView',
          component: () => import('../views/informationView.vue')
        },
        {
          path:'facility',
          name:'FacilityView',
          component: () => import('../views/FacilityView.vue')
        },
        {
          path:'news',
          name:'NewsView',
          component: () => import('../views/NewsView.vue')
        },
        {
          path:'login',
          name:'LoginView',
          component: () => import('../views/LoginView.vue')
        },
        {
          path:'register',
          name:'RegisterView',
          component: () => import('../views/RegisterView.vue')
        },
      ]
    },
  ]
})

export default router
