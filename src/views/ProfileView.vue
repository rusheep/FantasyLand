<script setup>
import axios from 'axios';

const inputStatus = ref(true);

function switchInputState() {
  inputStatus.value = !inputStatus.value;
}

async function getCurrentUser() {
  const api = await axios.get('/api/users/showMe');
  console.log(api);
}

onMounted(async () => {
  const api = await axios.get('/api/users/showMe');
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
      <h1>會員資料</h1>
      <div class="userPassword">
        <div class="input-box">
          <div class="titleBox">
            <p>姓名:</p>
          </div>
          <p
            class="title"
            v-if="inputStatus"
          >
            Asher Lien
          </p>
          <input
            v-else
            type="text"
          />
        </div>
        <div class="input-box">
          <div class="titleBox">
            <p>電子信箱</p>
          </div>
          <p
            class="title"
            v-if="inputStatus"
          >
            asher@gmail.com
          </p>
          <input
            v-else
            autocomplete="username"
            type="text"
          />
        </div>
        <!-- <div class="input-box">
          <div class="titleBox">
            <p>密嗎</p>
            <p
              style="color: red; font-size: 10px"
              font-size="2px"
            >
              請輸入密碼
            </p>
          </div>
          <input type="text" />
        </div> -->
      </div>

      <div class="btn-box">
        <Button
          btnFontSize="10px"
          v-if="inputStatus"
          >修改密碼</Button
        >
        <Button
          v-if="inputStatus"
          btnFontSize="10px"
          @click="switchInputState"
          >修改資料</Button
        >

        <div
          v-else
          class="btn-box"
        >
          <Button
            btnFontSize="10px"
            @click="switchInputState"
            btnColor="grey"
            >取消</Button
          >

          <Button btnFontSize="10px">確認</Button>
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
