<template>
  <div class="card">
    <div class="box-content">
      <div class="ticketitle">成人票</div>
      <h3>快速通關</h3>
    </div>
    <img src="@/../public/QRcode.png" class="QRcode">
  </div>
</template>

<style lang="scss" scoped>
  .card {
    .box-content {
      font-size: 25px;
      font-weight: bold;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: end;
      padding-bottom: 1rem;

      .ticketitle {
        padding-bottom: 1rem;
      }
    }
    display: flex;
    justify-content: space-around;
    width: 26%;
    background-color: #30B0C9;;
    border-radius: 10px;
    padding:1rem;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2),
              0px 8px 20px rgba(0, 0, 0, 0.1);
  }
</style>
