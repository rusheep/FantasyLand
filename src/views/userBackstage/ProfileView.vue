<script setup>
import axios from 'axios';

onMounted(async () => {
  const api = await axios.get('/api/v1/users/showMe');
  console.log(api);
});
</script>
<template>
  <form>
    <NavBar
      :statusIdx="2"
      class="navbar"
    />
    <main>
      <!-- <h1>會員資料</h1> -->
      <div class="userPassword">
        <div class="input-box">
          <div class="titleBox">
            <p>姓名:</p>
          </div>
          <p class="title">Asher Lien</p>
        </div>
        <div class="input-box">
          <div class="titleBox">
            <p>電子信箱</p>
          </div>
          <p class="title">asher@gmail.com</p>
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
