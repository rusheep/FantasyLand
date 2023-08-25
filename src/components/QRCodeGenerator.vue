<template>
  <img
    v-if="qrCodeImageUrl"
    :src="qrCodeImageUrl"
    alt="QR Code"
  />
</template>

<script setup>
import qrcode from 'qrcode';
import { ref, onMounted } from 'vue';

const props = defineProps({
  id: String, // 接收传入的 ID
});

const qrCodeImageUrl = ref('');

const generateQRCode = async () => {
  if (props.id.trim() === '') {
    return;
  }

  const options = {
    width: 100, // 设置 QR Code 宽度
    height: 100, // 设置 QR Code 高度
  };

  const qrCodeDataUrl = await qrcode.toDataURL(props.id, options);
  qrCodeImageUrl.value = qrCodeDataUrl;
};

onMounted(() => {
  generateQRCode(); // 初始化时生成 QR Code
});
</script>

<style scoped lang="scss">
img {
  max-width: 100%; // 图片最大宽度为容器宽度
  max-height: 100%; // 图片最大高度为容器高度
}
</style>
