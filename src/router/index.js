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
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/OrderView.vue'),
          beforeEnter: async (to, from) => {
            // const isLogin = false; // 檢查是否登入的function
            // if (!isLogin) {
            //   alert('請先登入'); // 否則顯示提示訊息
            //   return '/login'; // 如果無法訪問，導向登入頁面
            // } else {
            // }
          },
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
    {
      path: '/cms',
      name: 'cmsLogin',
      component: () => import('../layouts/cms.vue'),
      children: [
        {
          path: '/cms',
          name: 'cms_login',
          component: () => import('../views/cms/LoginView.vue'),
        },
      ],
    },
  ],
});

export default router;
