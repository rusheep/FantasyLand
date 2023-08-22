<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import TicketAdult from '../../components/Ticket/TicketAdult.vue';
import TicketKid from '../../components/Ticket/TicketKid.vue';
import TicketPrivileged from '../../components/Ticket/TicketPrivileged.vue';

// 彈窗開關
const infoModal = ref(false);

// 票的日期
const selectedDate = ref('');

// 總價
const totalPrice = ref(0);

//目前有買的票
const userTickets = ref([]); // 將 userTickets 初始值改為一個空陣列

// 取得所有票
onMounted(async () => {
  try {
    // 取得 unuse 票 / 或是今天的 usefd 票
    const userTicketsAPI = await axios.get('/api/v1/userTickets//getTickets');

    const unseOrTodayUsedTicket = userTicketsAPI.data;
    userTickets.value = unseOrTodayUsedTicket;
    console.log (userTickets.value);

  } catch (error) {
    console.error(error);
  }
});






</script>

<template >
  <Header></Header>
  <NavBar />
  <main>
    <div class="title">
      <h2 class="tickstatus">未使用</h2>
      <h2 class="date">2023/05/23</h2>
    </div>
    <section class="top-box"> 
      <div class="card" v-for="ticket in userTickets" :key="ticket._id">
  <!-- 在這裡放置你想顯示的票券資訊 -->
          {{ ticket._id }}
          {{ ticket.purchaseDate }}
          {{ ticket.status }}
          {{ ticket.ticketCategoryId.ticketType }}
          {{ ticket.ticketCategoryId.fastTrack }}
      </div>
    </section>
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
          <tr>
            <td>2023-08-11</td>
            <td>已使用</td>
            <td>成人票（快速通關）</td>
            <td>200元</td>
          </tr>
          <tr>
            <td>2023-08-11</td>
            <td>已使用</td>
            <td>成人票（快速通關）</td>
            <td>200元</td>
          </tr>
          <tr>
            <td>2023-08-11</td>
            <td>已使用</td>
            <td>成人票（快速通關）</td>
            <td>200元</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
<style lang="scss" scoped>
main {
  width: 75%;
  margin: 0 auto;

  .title {
    display: flex;
    justify-content: space-between;;
   
    h2 {
      color:#fff ;
    }
    .tickstatus {
      width: 10rem;
      border-radius: 10px;
      text-align: center;
      background-color:$main-color;
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

  .top-box {
    .card {
      width: 250px;
      border: 1px solid black;
    }
  }

  .btm-box {
    width: 100%;
    background-color:#F1F1F1;
    padding-bottom: 2rem;
    padding-top: 2rem;
    border-radius: 15px;

    .form {
      width: 80%;
      margin: 0 auto;
      color: #00B9D2;
    }

    .form tbody {
      border: 2px solid #00B9D2;
      background-color: #fff;
    }

    .form th,
    .form td {
      padding: 8px;
      text-align: center;
      font-size: 20px;
    }
    .form tr {
      border-bottom: 1px solid #E4D0D0 ;
    }
  }
}


h2 {
  margin-bottom: 10px;
}
</style>