<script setup>
import { getColorByTicketStatusAndType } from '@/composable';
const currentTicketData = ref(props.currentTicketData);

const props = defineProps({
  isOpen: Boolean,
  currentTicketData: Object,
});

const emits = defineEmits();
const closeInfoModal = () => {
  emits('close');
};

watch(
  () => props.currentTicketData,
  (newData) => {
    currentTicketData.value = newData;
  }
);
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

        <div class="btn-wrap">
          <Button
            class="btn"
            btnFontSize="0.5"
            btnColor="rgba(0,0,0,0)"
            @click="closeInfoModal"
            >返回</Button
          >
          <Button
            class="btn"
            btnColor="rgba(0,0,0,0)"
            >退票</Button
          >
        </div>
      </div>
      <QRCodeGenerator :id="currentTicketData._id" />
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
  .btn {
    border: 2px solid #fff;
    margin-right: 1rem;
  }
}

//確認彈窗
</style>
