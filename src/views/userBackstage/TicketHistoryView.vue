<script setup>
import axios from 'axios';
const userTickets = ref([]);

onMounted(() => {
  axios.get('/api/v1/userTickets/ticketHistory').then((res) => {
    userTickets.value = res.data;
  });
});
</script>

<template>
  <main>
    <NavBar
      :statusIdx="0"
      class="navbar"
    />

    <router-link to="/user/userTicket">回上一頁</router-link>
    <TicketHistory
      :ticketsHistory="userTickets"
      :status="1"
    />
  </main>
</template>

<style lang="scss" scoped>
main {
  margin: 0 auto;
  width: 75%;
}
</style>
