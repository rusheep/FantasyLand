<template>
  <main>
    <QrStream @decode="handleQrCodeScan" />
    <div v-if="scannedUrl">Scanned URL: {{ scannedUrl }}</div>

    <h3>驗票紀錄</h3>
    <ul class="ticket-list">
      <li
        v-for="(ticket, index) in ticketList"
        :key="index"
        class="ticket-item"
      >
        <div class="text">
          <strong>名稱:</strong> {{ ticket.userId.name }}<br />
          <strong>入園時間:</strong> {{ ticket.date }}<br />
          <strong>票型:</strong> {{ ticket.ticketCategoryId }}<br />
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { QrStream } from 'vue3-qr-reader';
import { ref } from 'vue';
import axios from 'axios';
const scannedUrl = ref('');

const handleQrCodeScan = async (result) => {
  scannedUrl.value = result;
  const shouldOpenUrl = confirm(
    `Do you want to open the scanned URL?\n${scannedUrl.value}`
  );

  if (shouldOpenUrl) {
    try {
      await axios
        .get(`/api/v1/authTicket/${scannedUrl.value}`)
        .then((res) => alert(res.data.msg));
    } catch (error) {
      console.log(error.response.data.msg);
      alert(error.response.data.msg);
    }
  }
};

const ticketList = ref([
  // Add more ticket objects as needed
]);

onMounted(() => {
  try {
    const api = axios.get('/api/v1/authTicket').then((res) => {
      ticketList.value = res.data;
    });
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss">
main {
  margin: 0 auto;
  width: 75%;

  .ticket-list {
    list-style: none;
    padding: 0;

    .ticket-item {
      border: 1px solid #ccc;
      padding: 15px;
      margin-bottom: 10px;
      background-color: #f5f5f5;

      strong {
        font-weight: bold;
      }
    }
  }
}
</style>
