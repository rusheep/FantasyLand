<template>
  <div class="header-container">
    <img src="logo.png" class="logo">
    <header>
      <h1>夢幻尼樂園</h1>
    </header>
    <nav>
    </nav>
  </div>
</template>

<style lang="scss" s>
.header-container {
  position: relative;
  top: -35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 80px;

  }

  .logo {
    position: relative;
    top: 40px;
    z-index: 1;
  }

  header {
    width: 80%;
    height: 70px;
    background-color: #30B0C9;
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    h1 {
      margin-top: 30px;
      font-size: 18px;
      font-weight: bold;
      color: white;

    }
  }
}
</style>
