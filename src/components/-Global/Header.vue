<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const currentPath = route.path;
function getFirstPathSegment(path) {
  const parts = path.split('/');
  return parts[1];
}

const currentPathFirstSegment = getFirstPathSegment(currentPath);

let loginOutvalue = ref(true);

router.beforeEach((to, from, next) => {
  console.log('Navigating from', from.path, 'to', to.path);

  const path = getFirstPathSegment(to.path);
  if (path === 'user') {
    loginOutvalue.value = false;
  } else {
    loginOutvalue.value = true;
  }

  next();
});

onMounted(() => {
  if (currentPathFirstSegment === 'user') {
    loginOutvalue.value = false;
  }
});

async function logout() {
  console.log('tset');
}
</script>
<template>
  <div class="header-container">
    <img
      src="@/assets/logo.png"
      class="logo"
    />
    <header>
      <p>回首頁</p>
      <h1>夢幻尼樂園</h1>

      <p v-if="loginOutvalue">登入</p>
      <p
        v-else
        @click.prevent="logout"
      >
        登出
      </p>
    </header>
    <nav></nav>
  </div>
</template>

<style lang="scss" s>
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
    p {
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
