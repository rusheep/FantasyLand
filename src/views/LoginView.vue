<script setup>
import axios from 'axios';
import router from '../router';

let email = ref('');
let password = ref('');

const emailError = ref(false);
const passwordError = ref(false);

async function submit() {
  try {
    // email 和 password 一定要填寫：
    emailError.value = !email.value;
    passwordError.value = !password.value;

    if (email.value && password.value) {
      await axios.post('api/v1/auth/login', {
        email: email.value,
        password: password.value,
      });
      alert('登入成功');

      router.push('/home');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      password.value = '';
      alert(`錯誤帳號/密碼`);
    }
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
          @click="submit"
          btnFontSize="10px"
          >登入</Button
        >
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
</style>
