<script setup>
import axios from 'axios';
import router from '@/router';

let email = ref('');
let password = ref('');

const emailError = ref(false);
const passwordError = ref(false);

const loading = ref(false); // Add a loading state

async function submit() {
  try {
    // Reset errors
    emailError.value = false;
    passwordError.value = false;

    // Validate inputs
    if (!email.value) {
      emailError.value = true;
    }
    if (!password.value) {
      passwordError.value = true;
    }

    if (email.value && password.value) {
      loading.value = true; // Show loading screen

      await axios.post('api/v1/auth/login', {
        email: email.value,
        password: password.value,
      });

      // Simulate a delay of 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      loading.value = false; // Hide loading screen

      router.push('/user/userTicket');
      alert('登入成功');
    }
  } catch (error) {
    loading.value = false; // Hide loading screen

    if (error.response && error.response.status === 401) {
      password.value = '';
      alert('錯誤帳號/密碼');
      return;
    }
    return;
  }
}
</script>
<template>
  <form>
    <main>
      <h1>歡迎回來～</h1>
      <p class="sub-title">立即登入並預訂並進入冒險者的旅程吧！</p>
      <div class="userPassword">
        <div class="input-box">
          <div class="emailpassword-box">
            <p>電子信箱</p>
            <p
              v-show="emailError"
              style="color: red; font-size: 10px"
              font-size="2px"
            >
              請輸入電子信箱
            </p>
          </div>

          <input
            v-model="email"
            autocomplete="username"
            type="text"
          />
        </div>
        <div class="input-box">
          <div class="emailpassword-box">
            <p>密嗎</p>
            <p
              v-show="passwordError"
              style="color: red; font-size: 10px"
              font-size="2px"
            >
              請輸入密碼
            </p>
          </div>

          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
          />
        </div>
      </div>

      <div class="btn-box">
        <router-link to="/register">
          <Button btnFontSize="10px">註冊</Button>
        </router-link>
        <Button
          @click.prevent="submit"
          btnFontSize="10px"
          >登入</Button
        >
      </div>
      <!-- Loading screen -->
      <div
        v-if="loading"
        class="loading-screen"
      >
        <p>登入中...</p>
      </div>
    </main>
  </form>
</template>
<style lang="scss" scoped>
main {
  margin: 0 auto;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 25px;
    color: $main-color;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .sub-title {
    margin-bottom: 30px;
    color: grey;
  }

  .userPassword {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;

    .input-box {
      p {
        margin-bottom: 5px;
      }

      input {
        width: 300px;
        height: 20px;
        @media screen and (max-width: 730px) {
          width: 200px;
        }
      }
      .emailpassword-box {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
    }
  }
}

.btn-box {
  display: flex;
  gap: 20px;
}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 20px;
}
</style>
