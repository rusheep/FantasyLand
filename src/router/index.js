import { createRouter, createWebHashHistory } from 'vue-router';
import axios from 'axios';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 訂票頁面組：
    {
      path: '/',
      name: 'default',
      component: () => import('../layouts/default.vue'),
      children: [
        // 最一開始的頁面
        {
          path: '/index',
          name: 'index',
          component: () => import('../views/index.vue'),
        },
        {
          path: '/login',
          name: 'LoginView',
          component: () => import('../views/userBackstage/LoginView.vue'),
          meta: { requiresAuth: true, skipAuthCheck: true },
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

const checkAuthentication = async () => {
  try {
    const response = await axios.get('/api/v1/auth');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const checkCookies = () => {
  const cookies = document.cookie;
  const cookieArray = cookies
    .split('; ')
    .filter((cookie) => cookie.includes('='));

  const tokenCookies = {
    refreshToken: null,
    accessToken: null,
  };

  cookieArray.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    if (name === 'refreshToken') {
      tokenCookies.refreshToken = value;
    } else if (name === 'accessToken') {
      tokenCookies.accessToken = value;
    }
  });

  return tokenCookies;
};

router.beforeEach(async (to, from, next) => {
  const { refreshToken, accessToken } = checkCookies();

  if (to.path.startsWith('/auth')) {
    if (await checkAuthentication()) {
      next();
    } else {
      next('/QRlogin');
    }
  } else if (to.path.startsWith('/user')) {
    if (await checkAuthentication()) {
      next();
    } else {
      next('/login');
    }
  } else if (to.path.startsWith('/login')) {
    if (to.meta.skipAuthCheck) {
      // 检查 skipAuthCheck 标志
      next();
    } else if (refreshToken && accessToken) {
      if (await checkAuthentication()) {
        next('/user/userTicket');
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
