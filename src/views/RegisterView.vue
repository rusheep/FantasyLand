<script setup>
import axios from 'axios';
import router from '../router';

const name = ref('');
const email = ref('');
const password = ref('');

const nameError = ref(false);
const emailError = ref(false);
const passwordError = ref(false);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function submit() {
  try {
    // email 和 password 一定要填寫：
    nameError.value = !name.value;
    emailError.value = !email.value;
    passwordError.value = !password.value;

    if (!emailPattern.test(email.value)) {
      alert('請輸入正確的電子郵件格式');
      emailError.value = true;
      return;
    }

    if (name.value && email.value && password.value) {
      await axios.post('api/auth/register', {
        name: name.value,
        email: email.value,
        password: password.value,
      });
      alert('註冊成功');
      router.push('/login');
    }
  } catch (error) {
    alert(error.response?.data.msg);
  }
}
</script>

<template>
  <form>
    <main>
      <h1>註冊帳號</h1>
      <div class="userPassword">
        <div class="input-box">
          <div class="titleBox">
            <p>姓名</p>
            <p
              v-show="nameError"
              style="color: red; font-size: 10px"
              font-size="2px"
            >
              請輸入姓名
            </p>
          </div>

          <input
            v-model="name"
            type="text"
          />
        </div>
        <div class="input-box">
          <div class="titleBox">
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
          <div class="titleBox">
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
        <Button
          @click="submit"
          btnFontSize="10px"
          >註冊</Button
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
      .titleBox {
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
