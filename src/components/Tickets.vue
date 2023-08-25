<script setup>
const props = defineProps(['ticketData']);
import { getColorByTicketStatusAndType } from '@/composable';
</script>

<template>
  <div
    class="ticket-card"
    :style="{
      backgroundColor: getColorByTicketStatusAndType(
        props.ticketData.status,
        props.ticketData.ticketCategoryId.ticketType
      ),
    }"
  >
    <div class="ticket-box-content">
      <div>
        <p>{{ props.ticketData.status === 'used' ? '已使用' : '未使用' }}</p>
      </div>
      <h3>{{ props.ticketData.ticketCategoryId.ticketType }}</h3>
      <h4>
        {{
          props.ticketData.ticketCategoryId.fastTrack ? '快速通關' : '普通票'
        }}
      </h4>
    </div>
    <QRCodeGenerator :id="props.ticketData._id" />
  </div>
</template>

<style lang="scss" scoped>
.ticket-card {
  width: 220px;
  height: 100px;
  background-color: $main-color;
  display: flex;
  padding: 15px 0px;
  border-radius: 10px;
  justify-content: space-evenly;
  color: white;
  font-size: 14px;
  .ticket-box-content {
    display: flex;
    flex-direction: column;
    gap: 7px;

    div {
      p {
        border: 1px solid white;
        display: inline-block;
        padding: 5px;
        border-radius: 5px;
      }
    }
    h3 {
      font-size: 20px;
      font-weight: bold;
    }
    h4 {
      font-size: 14px;
    }
  }
}
</style>
