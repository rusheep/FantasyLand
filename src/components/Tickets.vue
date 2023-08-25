<script setup></script>
<template>
  <div class="ticket-card">
    <div class="ticket-box-content">
      <div>
        <p>已使用</p>
      </div>
      <h3>成人票</h3>
      <h4>快速通關</h4>
    </div>

    <img src="../../public/QRcode.png" />
  </div>
</template>

<style lang="scss" scoped>
.ticket-card {
  width: 220px;
  height: 100px;
  background-color: $main-color;
  display: flex;
  padding: 15px 12px;
  border-radius: 10px;
  justify-content: space-between;
  color: white;
  .ticket-box-content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
      p {
        border: 1px solid white;
        display: inline-block;
        padding: 5px;
        border-radius: 5px;
      }
    }
    h3 {
      font-size: 30px;
      font-weight: bold;
    }
  }
}
</style>
