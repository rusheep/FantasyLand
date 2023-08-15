<script setup>

</script>

<template>
  <main>
    <h1>註冊帳號</h1>
    <div class="userPassword">
      <div class="input-box">
        <p>姓名</p>
        <input type="text">
      </div>
      <div class="input-box">
        <p>電子信箱</p>
        <input type="text">
      </div>
      <div class="input-box">
        <p>密嗎</p>
        <input type="text">
      </div>
    </div>

    <div class="btn-box">
      <Button btnFontSize="0.5">註冊</Button>
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
