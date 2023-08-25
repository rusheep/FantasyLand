<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userTickets = ref([]);
const ticketModal = ref(false);
const currentTicketData = ref(null);

// Fetch tickets on mount
onMounted(async () => {
  const response = await axios.get('/api/v1/userTickets//getTickets');
  userTickets.value = response.data;
});

const openRefundModal = (ticket) => {
  currentTicketData.value = ticket;
  ticketModal.value = true;
};
</script>

<template>
  <NavBar />
  <TicketInfoRefundModal
    :isOpen="ticketModal"
    @close="ticketModal = false"
    :currentTicketData="currentTicketData"
  />

  <main>
    <div class="title">
      <h2>未使用</h2>
      <h3>時間</h3>
    </div>
    <!-- 單個票券 -->
    <div class="ticketBox">
      <Tickets
        v-for="(ticket, index) in userTickets"
        :key="ticket._id"
        :ticketData="ticket"
        @click="openRefundModal(ticket)"
      />
      <div class="noTicketBox">
        <h2>目前沒有訂票</h2>
        <Button>前往訂票頁面</Button>
      </div>
    </div>

    <!-- 票券紀錄 -->
    <TicketHistory />
  </main>
</template>
<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 頁面
main {
  width: 75%;
  margin: 0 auto;

  .title {
    display: flex;
    justify-content: space-between;

    h2 {
      color: #fff;
      width: 10rem;
      border-radius: 10px;
      text-align: center;
      background-color: $main-color;
      padding: 0.5rem 0;
      margin-bottom: 2rem;
    }

    h3 {
      color: $main-color;
      padding: 0.5rem 0;
      font-weight: bold;
      font-size: 24px;
    }
  }

  .ticketBox {
    display: flex;
    gap: 10px;
    margin-bottom: 50px;
    border-radius: 10px;

    @media screen and (max-width: 730px) {
      flex-direction: column;
    }
  }

  .noTicketBox {
    background-color: #ebebeb;
    width: 100%;
    height: 200px;
    text-align: center;
    padding: 100px;
  }
}
</style>
