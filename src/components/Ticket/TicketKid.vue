<template>
  <div class="card">
    <div class="box-content">
      <div class="status">
        <p>已使用</p>
      </div>
      <div class="ticketitle">兒童票</div>
      <h3>快速通關</h3>
    </div>
    <img src="@/../public/QRcode.png" class="QRcode">
  </div>
</template>

<style lang="scss" scoped>
  .card {
    display: flex;
    justify-content: space-around;
    width: 26%;
    background-color: #4786D0;
    border-radius: 10px;
    padding:1rem;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2),
              0px 8px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    .box-content {
      font-size: 25px;
      font-weight: bold;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: end;
      padding-bottom: 1rem;

      .status {
        p {
          font-size: 12px;
        }
        padding: 5px;
        width: 3rem;
        text-align: center;
        border: 1px solid #fff;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        display: none;
      }

      .ticketitle {
        padding-bottom: 1rem;
      }
    }
  }
</style>
