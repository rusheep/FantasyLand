<script setup>
import axios from 'axios';
import { ref } from 'vue'; // Import ref from Vue

const up = ref({
  username: 'asher@gmail.com',
  password: 'password',
});

const cookie = document.cookie;
console.log(cookie)
async function sendRequest() {
  try {
    console.log(typeof up.value.password);
    console.log('VITE_HI: ', `${import.meta.env.VITE_URL}`);

    const response = await axios.post(`${import.meta.env.VITE_URL}/auth/login`, {
      email: up.value.username,
      password: up.value.password,
    });

    console.log(cookie)


  } catch (error) {
    console.error(error);
  }
}
</script>



<template>
  <main>
    <h1>歡迎回來～</h1>
    <p class="sub-title">立即登入並預訂並進入冒險者的旅程吧！</p>
    <div class="userPassword">
      <div class="input-box">
        <p>電子信箱</p>
        <input v-model="up.username" type="text">
      </div>
      <div class="input-box">
        <p>密嗎</p>
        <input v-model="up.password" type="text">
      </div>
    </div>

    <div class="btn-box">
      <Button btnFontSize="0.5">註冊</Button> <Button @click="sendRequest" btnFontSize="0.5">登入</Button>
    </div>
  </main>
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
    }
  }

}

.btn-box {
  display: flex;
  gap: 20px;
}
</style>
