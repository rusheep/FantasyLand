<script setup>
import axios from 'axios';
const userTickets = ref();
import { getFormatDateToISOString } from '@/composable';

onMounted(() => {
  axios.get('/api/v1/userTickets/getTickets').then((res) => {
    userTickets.value = res.data;
    console.log(userTickets.value);
  });
});
</script>

<template>
  <div class="title">
    <h2>票券紀錄</h2>
  </div>
  <section>
    <table class="responsive-table">
      <thead>
        <tr>
          <th>日期</th>
          <th>狀態</th>
          <th>票型</th>
          <th>價格</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="ticket in userTickets"
          :key="ticket._id"
        >
          <td>
            {{
              ticket.ticketDate && getFormatDateToISOString(ticket.ticketDate)
            }}
          </td>
          <td>{{ ticket.status }}</td>
          <td>
            {{ ticket.ticketCategoryId.ticketType }}
            {{ ticket.ticketCategoryId.fastTrack ? '快速通關' : '一般票' }}
          </td>
          <td>{{ ticket.currentPurchasePrice }}元</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="scss" scoped>
h2 {
  color: #fff;
  width: 10rem;
  border-radius: 10px;
  text-align: center;
  background-color: $main-color;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
}

section {
  width: 100%;
  background-color: #f1f1f1;
  padding: 2rem;
  border-radius: 15px;

  @media screen and (max-width: 730px) {
    padding: 0.5rem;
  }
}

table {
  width: 80%;
  margin: 0 auto;
  color: #00b9d2;
  @media screen and (max-width: 730px) {
    table th:nth-child(2),
    table td:nth-child(2),
    table th:nth-child(4),
    tabletd:nth-child(4) {
      display: none;
    }
  }

  tbody {
    border: 2px solid #00b9d2;
    background-color: #fff;
  }

  th,
  td {
    padding: 8px;
    text-align: center;
    font-size: 20px;

    @media screen and (max-width: 730px) {
      font-size: 13px;
    }
  }

  tr {
    border-bottom: 1px solid #e4d0d0;
  }
}

@media screen and (max-width: 730px) {
  .responsive-table th:nth-child(2), /* 隐藏狀態列 */
  .responsive-table td:nth-child(2),
  .responsive-table th:nth-child(4), /* 隐藏價格列 */
  .responsive-table td:nth-child(4) {
    display: none;
  }
}
</style>
