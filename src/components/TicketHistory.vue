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
  <div class="ticket-records">
    <div class="title">
      <h2 class="tickstatus">票券紀錄</h2>
    </div>
    <section class="btm-box">
      <table class="form">
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
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;

  h2 {
    color: #fff;
  }

  .tickstatus {
    width: 10rem;
    border-radius: 10px;
    text-align: center;
    background-color: $main-color;
    padding: 0.5rem 0;
    margin-bottom: 2rem;
  }

  .date {
    color: $main-color;
    padding: 0.5rem 0;
    font-weight: bold;
    font-size: 24px;
  }
}

section {
  display: flex;
  justify-content: start;
  gap: 60px;
  margin-bottom: 10rem;
  flex-wrap: wrap;
}

.btm-box {
  width: 100%;
  background-color: #f1f1f1;
  padding: 2rem;
  border-radius: 15px;

  .form {
    width: 80%;
    margin: 0 auto;
    color: #00b9d2;

    tbody {
      border: 2px solid #00b9d2;
      background-color: #fff;
    }

    th,
    td {
      padding: 8px;
      text-align: center;
      font-size: 20px;
    }

    tr {
      border-bottom: 1px solid #e4d0d0;
    }
  }
}
</style>
