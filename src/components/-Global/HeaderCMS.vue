<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

// user登入登出
let loginOutvalue = ref(true);

// 定義router
const router = useRouter();
const route = useRoute();

// 現在URL路徑
const currentPath = route.path;
const currentPathFirstSegment = getFirstPathSegment(currentPath);

function getFirstPathSegment(path) {
  const parts = path.split('/');
  return parts[1];
}

// 每次切換頁面 會做判斷並且換 Header
router.beforeEach((to, from, next) => {
  console.log('Navigating from', from.path, 'to', to.path);

  const path = getFirstPathSegment(to.path);
  if (path === 'auth') {
    loginOutvalue.value = false;
  } else {
    loginOutvalue.value = true;
  }

  next();
});

// 進入或刷新頁面，會重新判斷
onMounted(() => {
  if (currentPathFirstSegment === 'auth') {
    loginOutvalue.value = false;
  }
});

async function logout() {
  try {
    await axios.delete('/api/v1/auth/logout');
    router.push('/QRlogin');
  } catch (error) {
    console.log(error);
  }
}

async function homepage() {
  try {
    router.push('/index');
  } catch (error) {
    console.log(error);
  }
}

async function login() {
  try {
    router.push('/QRlogin');
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div class="header-container">
    <img
      src="@/assets/logo.png"
      class="logo"
    />
    <header>
      <a @click.prevent="homepage">回首頁</a>
      <h1>夢幻尼樂園</h1>

      <a
        v-if="loginOutvalue"
        @click.prevent="login"
        >驗證登入</a
      >
      <a
        v-else
        @click.prevent="logout"
      >
        登出
      </a>
    </header>
    <nav></nav>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  position: relative;
  top: -35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 80px;
  }

  .logo {
    position: relative;
    top: 40px;
    z-index: 1;
  }

  header {
    width: 80%;
    height: 70px;
    background-color: #30b0c9;
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;

    h1 {
      margin-top: 30px;
      font-size: 18px;
      font-weight: bold;
      color: white;
    }
    a {
      margin-top: 30px;
      font-size: 10px;
      font-weight: bold;
      color: white;
      padding: 0px 40px;
      cursor: pointer;
    }
  }
}
</style>
