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

    <router-link to="/user/userTicket">
      <img
        class="arrow-icon"
        src="@/assets/svg/left_arrow_circle_solid.svg"
    /></router-link>

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

.arrow-icon {
  width: 40px;
  height: 40px;
  margin: 20px 0;
  @media screen and (max-width: 730px) {
    width: 20px;
    height: 20px;
  }
}
</style>
