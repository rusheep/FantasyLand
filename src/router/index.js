import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import layout from '../layouts/default.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'deafult',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'home',
          name: 'HomeView',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'information',
          name: 'InformationView',
          component: () => import('../views/informationView.vue'),
        },
        {
          path: 'facility',
          name: 'FacilityView',
          component: () => import('../views/FacilityView.vue'),
        },
        {
          path: 'news',
          name: 'NewsView',
          component: () => import('../views/NewsView.vue'),
        },
        {
          path: 'login',
          name: 'LoginView',
          component: () => import('../views/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'RegisterView',
          component: () => import('../views/RegisterView.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/OrderView.vue'),
        },
      ],
    },
    // 最一開始的頁面
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index.vue'),
    },
    //遊客後台票夾
    {
      path: '/touristicket',
      name: 'touristicket',
      component: () => import('../views/touristBackStage/touristTicket.vue'),
    },
  ],
});

export default router;
