<script setup>
import { getColorByTicketStatusAndType } from '@/composable';
import axios from 'axios';
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
  emits('refresh-tickets');
};

const currentTicketData = ref(props.currentTicketData);
watch(
  () => props.currentTicketData,
  (newData) => {
    currentTicketData.value = newData;
  }
);

function refundClick() {
  refundToggle.value = false;
  btnToggle.value = false;
}

const sendRefundRequest = async () => {
  axios
    .get(`/api/v1/userTickets/refund/${currentTicketData.value._id}`)
    .then((res) => {
      refundToggle.value = true;
      btnToggle.value = true;
      emits('close');
      emits('refresh-tickets');
    })
    .catch((err) => {
      console.log(err);
    });
};
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
        <QRCodeGenerator
          v-if="refundToggle"
          :id="currentTicketData._id"
          class="qrcode-rwd"
        />
        <div
          class="refundPrice-rwd"
          v-else
        >
          {{ props.currentTicketData.currentPurchasePrice }}元
        </div>
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
            @click="sendRefundRequest"
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
        {{ props.currentTicketData.currentPurchasePrice }}元
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

    @media screen and (max-width: 730px) {
      display: block;
      padding: 20px 10px;
      padding-bottom: 100px;
      width: 80%;
    }
    .box-content {
      justify-content: center;
      @media screen and (max-width: 730px) {
        display: flex;
        align-items: center;
      }
      .status {
        @media screen and (max-width: 730px) {
          display: none;
        }
      }
    }
  }
}

.ticketitle {
  font-size: 48px;
  @media screen and (max-width: 730px) {
    font-size: 30px;
  }
}
h3 {
  font-size: 30px;
  color: #ffff;
  font-weight: bold;
  margin-bottom: 3rem;
  @media screen and (max-width: 730px) {
    font-size: 20px;
    margin-bottom: 0rem;
  }
}
.btn-wrap {
  width: 100%;
  display: flex;
  gap: 20px;

  @media screen and (max-width: 730px) {
    justify-content: center;
  }
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
  @media screen and (max-width: 730px) {
    display: none;
  }
}

.refundPrice-rwd {
  display: none;
  font-size: 60px;
  font-weight: bold;
  color: white;
  margin-bottom: 70px;
  @media screen and (max-width: 730px) {
    display: block;
    margin-top: 50px;
  }
}

.qrcode {
  width: 200px;
  height: 200px;

  @media screen and (max-width: 730px) {
    display: none;
  }
}

.qrcode-rwd {
  width: 200px;
  height: 200px;
  display: none;

  @media screen and (max-width: 730px) {
    width: 80%;
    height: 80%;
    display: block;
    margin: 10px 10px;
  }
}
</style>
