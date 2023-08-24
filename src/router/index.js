import { createRouter, createWebHashHistory } from 'vue-router';
import axios from 'axios';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 最一開始的頁面
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index.vue'),
    },
    // 訂票頁面組：
    {
      path: '/',
      name: 'default',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'login',
          name: 'LoginView',
          component: () => import('../views/userBackstage/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'RegisterView',
          component: () => import('../views/userBackstage/RegisterView.vue'),
        },
        {
          path: '/user/userTicket',
          name: 'userTicketView',
          component: () => import('../views/userBackstage/UserTicketView.vue'),
        },

        {
          path: '/user/cart',
          name: 'cart',
          component: () => import('../views/userBackstage/CartView.vue'),
        },
        {
          path: '/user/profile',
          name: 'profile',
          component: () => import('../views/userBackstage/ProfileView.vue'),
        },
        {
          path: '/user/order',
          name: 'order',
          component: () => import('../views/userBackstage/OrderView.vue'),
        },
      ],
    },

    // 驗票頁面組
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
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue'),
    },

    {
      path: '/:pathMatch(.*)',
      redirect: '/404',
    },
  ],
});

const authGuard = async (to, from, next) => {
  try {
    const response = await axios.get('/api/v1/auth').then((res) => res);
    if (response.status === 200) {
      next();
    }
  } catch (error) {
    next('/QRlogin');
  }
};

const userGuard = async (to, from, next) => {
  try {
    const response = await axios.get('/api/v1/auth').then((res) => res);
    if (response.status === 200) {
      next();
    }
  } catch (error) {
    next('/login');
  }
};

router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/auth')) {
    await authGuard(to, from, next);
  } else if (to.path.startsWith('/user')) {
    await userGuard(to, from, next);
  } else {
    next();
  }
});

export default router;
