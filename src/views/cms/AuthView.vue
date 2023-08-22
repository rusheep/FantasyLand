<template>
  <main>
    <!-- <QrStream @decode="handleQrCodeScan" /> -->
    <div v-if="scannedUrl">Scanned URL: {{ scannedUrl }}</div>
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
</script>

<style lang="scss">
//
main {
  margin: 0 auto;
  width: 75%;
}
</style>
