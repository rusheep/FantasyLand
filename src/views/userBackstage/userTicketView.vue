<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userAllTickets = ref([]);
const selectedDate = ref('');

// Fetch tickets on mount
onMounted(async () => {
  const response = await axios.get('/api/v1/userTickets//getTickets');
  userAllTickets.value = response.data;
});
</script>

<template>
  <NavBar />
  <main>
    <div class="title">
      <h2>未使用</h2>
      <h3>{{ selectedDate }}</h3>
    </div>
    <!-- 單個票券 -->
    <div class="ticketBox">
      <Tickets
        v-for="(ticket, index) in userAllTickets"
        :key="ticket._id"
        :ticketData="ticket"
      />
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

    @media screen and (max-width: 730px) {
      flex-direction: column;
    }
  }
}
</style>
