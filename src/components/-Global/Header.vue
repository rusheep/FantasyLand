<template>
  <div class="header-container">
    <img src="@/../public/logo.png" class="logo">
    <header>
      <h1>夢幻尼樂園</h1>
    </header>
    <nav>
    </nav>
  </div>
</template>

<style lang="scss">
.header-container {
  position: relative;
  top: -40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 100px;

  }

  .logo {
    position: relative;
    top: 50px;
    z-index: 1;
  }

  header {
    width: 80%;
    height: 80px;
    background-color: #30B0C9;
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;

    h1 {
      margin-top: 40px;
      font-size: 20px;
      font-weight: bold;
      color: white;
    }
  }
}
</style>
