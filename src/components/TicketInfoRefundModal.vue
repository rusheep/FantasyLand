<script setup>
import { getColorByTicketStatusAndType } from '@/composable';
const currentTicketData = ref(props.currentTicketData);
const refundToggle = ref(true);
const btnToggle = ref(true);

const props = defineProps({
  isOpen: Boolean,
  currentTicketData: Object,
});

const emits = defineEmits();
const closeInfoModal = () => {
  refundToggle.value = true;
  btnToggle.value = true;
  emits('close');
};

watch(
  () => props.currentTicketData,
  (newData) => {
    currentTicketData.value = newData;
  }
);

function refundClick() {
  console.log('test');

  refundToggle.value = false;
  btnToggle.value = false;
}
</script>
<template>
  <div
    v-if="props.isOpen"
    class="modal-overlay"
  >
    <div
      class="card"
      :style="{
        backgroundColor: getColorByTicketStatusAndType(
          currentTicketData.status,
          currentTicketData.ticketCategoryId.ticketType
        ),
      }"
    >
      <div class="box-content">
        <div class="status">
          <p>
            {{ currentTicketData.status === 'used' ? '已使用' : '未使用' }}
          </p>
        </div>
        <div class="ticketitle">
          {{ currentTicketData.ticketCategoryId.ticketType }}
        </div>
        <h3>
          {{
            currentTicketData.ticketCategoryId.fastTrack ? '快速通關' : '一般票'
          }}
        </h3>

        <div
          class="btn-wrap"
          v-if="btnToggle"
        >
          <Button
            btnFontSize="0.5"
            @click="closeInfoModal"
            >返回</Button
          >
          <Button
            class="btn"
            btnColor="rgba(0,0,0,0)"
            btnHoverColor="none"
            @click="refundClick"
            >退票</Button
          >
        </div>
        <div
          class="btn-wrap"
          v-else
        >
          <Button
            btnFontSize="0.5"
            @click="closeInfoModal"
            >不想退票</Button
          >
          <Button
            class="btn"
            btnColor="rgba(0,0,0,0)"
            btnHoverColor="none"
            @click="refundClick"
            >我想退票</Button
          >
        </div>
      </div>

      <QRCodeGenerator
        v-if="refundToggle"
        :id="currentTicketData._id"
        class="qrcode"
      />
      <div
        class="refundPrice"
        v-else
      >
        2000元
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .card {
    display: flex;
    align-items: center;
    padding: 40px 30px;
    width: 40vw;
    height: 40vh;
    .box-content {
      justify-content: center;
    }
  }
}

.ticketitle {
  font-size: 48px;
}
h3 {
  font-size: 30px;
  color: #ffff;
  font-weight: bold;
  margin-bottom: 3rem;
}
.btn-wrap {
  width: 100%;
  display: flex;
  gap: 20px;
  .btn {
    border: 2px solid #fff;
    margin-right: 1rem;
  }
}

.refundPrice {
  font-size: 60px;
  font-weight: bold;
  color: white;

  margin-bottom: 70px;
}

.qrcode {
  width: 200px;
  height: 200px;
}
</style>
