import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import axios from 'axios';

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
      path: '/QRlogin',
      name: 'QRlogin',
      component: () => import('../layouts/cms.vue'),
      children: [
        {
          path: '/QRlogin',
          name: 'QRlogin',
          component: () => import('../views/cms/LoginBSView.vue'),
        },
        {
          path: '/auth',
          name: 'auth',
          component: () => import('../views/cms/AuthView.vue'),
        },
        {
          path: '/auth/qr',
          name: 'qr',
          component: () => import('../views/cms/qrcodetest.vue'),
        },
      ],
    },
  ],
});

// 在路由配置中设置 beforeEnter 守卫
const qrcodeGuard = async (to, from, next) => {
  try {
    const response = await axios.get('/api/v1/auth').then((res) => res);
    if (response.statusText === 'OK') {
      next(); // 允许导航
    }
  } catch (error) {
    console.error('Authentication error:', error);
    next('/QRlogin');
  }
};

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/auth')) {
    qrcodeGuard(to, from, next);
  } else {
    next();
  }
});

export default router;
