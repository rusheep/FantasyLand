<template>
  <main>
    <h2>頁面</h2>
    <section>
      <router-link
        class="box"
        to="/login"
      >
        <div>
          <h3>使用者訂票</h3>
        </div></router-link
      >
      <router-link
        class="box"
        to="/Qrlogin"
      >
        <div>
          <h3>驗票(使用手機)</h3>
        </div></router-link
      >
    </section>
    <h2>權限介紹</h2>
    <section class="role-box">
      <div class="box2">
        <div>
          <h3>user（使用者）</h3>
          <h4>須自行創立帳號</h4>
        </div>
      </div>
      <div class="box2">
        <div>
          <h3>admin（全權限）</h3>
          <h4>username: dev@gmail.com | password: password</h4>
        </div>
      </div>
    </section>
  </main>
</template>
<style lang="scss">
a {
  text-decoration: none;
}
main {
  width: 75%;
  margin: 0 auto;

  section {
    display: flex;
    justify-content: space-between;
    gap: 60px;
    margin-bottom: 60px;
    @media screen and (max-width: 730px) {
      gap: 5px;
    }
    .box {
      display: block;
      width: 100%;
      height: 150px;
      border-radius: 10px;
      background-color: $main-color;
      cursor: pointer;

      &:hover {
        background-color: $second-color;
        /* 替换成你想要的背景颜色 */
      }

      h3 {
        color: white;
        text-align: center;
        padding: 60px 0px;
        font-size: 20px;
        font-weight: 500;
      }
    }

    .box2 {
      width: 100%;
      height: 100px;
      border-radius: 10px;
      border: 2px solid $main-color;
      color: $main-color;

      div {
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 15px;

        h3 {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
}

h2 {
  margin-bottom: 10px;
}

.role-box {
  @media screen and (max-width: 730px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
