<script setup>
import axios from 'axios';

const userData = ref();

onMounted(() => {
  axios.get('/api/v1/users/showMe').then((res) => {
    userData.value = res.data.user;
  });
});
</script>
<template>
  <form>
    <NavBar
      :statusIdx="2"
      class="navbar"
    />
    <main>
      <div
        v-if="userData"
        class="userPassword"
      >
        <div class="input-box">
          <div class="titleBox">
            <p>姓名:</p>
          </div>
          <p class="title">{{ userData.name }}</p>
        </div>
        <div class="input-box">
          <div class="titleBox">
            <p>userId</p>
          </div>
          <p class="title">{{ userData.userId }}</p>
        </div>
      </div>
    </main>
  </form>
</template>

<style lang="scss" scoped>
.title {
  color: $main-color;
  font-weight: bold;
  font-size: 22px;
}

main {
  margin: 0 auto;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 180px;

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
