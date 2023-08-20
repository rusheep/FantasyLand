<script setup>
// import axios from 'axios';
import { reactive } from 'vue';
import TicketAdult from '../../components/Ticket/TicketAdult.vue';
import TicketKid from '../../components/Ticket/TicketKid.vue';
import TicketPrivileged from '../../components/Ticket/TicketPrivileged.vue';

const ticketBooking = reactive({
  username: 3,
  ticketBooking: [
    {
      ticketNum:1,
      ticketType: 1,
      ticketDate: '2023-05-28',
      status: 'unused',
      fastpass: 'true',
    },
    {
      ticketNum:2,
      ticketType: 2,
      ticketDate: '2023-05-28',
      status: 'unused',
      fastpass: 'true',
    },
    {
      ticketNum:3,
      ticketType: 3,
      ticketDate: '2023-05-28',
      status: 'unused',
      fastpass: 'true',
    },
    {
      ticketNum:4,
      ticketType: 1,
      ticketDate: '2023-05-28',
      status: 'used',
      fastpass: 'true',
    },
    {
      ticketNum:5,
      ticketType: 3,
      ticketDate: '2023-05-28',
      status: 'used',
      fastpass: 'false',
    },
  ],
});


const getComponentName = (ticketType) => {
  if (ticketType === 1) {
    return 'TicketAdult';
  } else if (ticketType === 2) {
    return 'ticket-kid';
  } else if (ticketType === 3) {
    return 'ticket-privileged'; // 根据需要添加其他条件
  }
};

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
      <template v-for="ticket in ticketBooking.ticketBooking" :key="ticket.ticketNum">
        <component :is="getComponentName(ticket.ticketType)" />
      </template>
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