<template>
  <main>
    <input
      v-model="qrCodeText"
      placeholder="Enter QR Code Text"
    />
    <button @click="generateQRCode">Generate QR Code</button>
    <img
      v-if="qrCodeImageUrl"
      :src="qrCodeImageUrl"
      alt="QR Code"
    />
  </main>
</template>

<script setup>
import qrcode from 'qrcode';
import { ref } from 'vue';

const qrCodeText = ref('');
const qrCodeImageUrl = ref('');

const generateQRCode = async () => {
  if (qrCodeText.value.trim() === '') {
    return; // Do not generate QR code for empty input
  }

  const qrCodeDataUrl = await qrcode.toDataURL(qrCodeText.value);
  qrCodeImageUrl.value = qrCodeDataUrl;
};
</script>

<style lang="scss">
//
main {
  margin: 0 auto;
  width: 75%;
}
</style>
