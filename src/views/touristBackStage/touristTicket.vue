<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { getFormatDateToISOString } from '../../composable';

// 彈窗開關
const infoModal = ref(false);

// 票的日期
const selectedDate = ref('');

// 總價
const totalPrice = ref(0);

//狀態
const status = ref('');

//快速通關
const fastTrack = ref('');

//票種
const ticketType = ref('');

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
    // 換算票的時間
    const ticketDate = unseOrTodayUsedTicket[0]?.ticketDate;
    const formattedDate = getFormatDateToISOString(ticketDate);
    unseOrTodayUsedTicket.forEach(ticket => {
      // 將元素的值設定到相應的響應式變數中
      selectedDate.value = formattedDate;
      status.value = ticket.status;
      fastTrack.value = ticket.ticketCategoryId.fastTrack;
      ticketType.value = ticket.ticketCategoryId.ticketType;
    });
  } catch (error) {
    console.error(error);
  }
});

//判斷票券顏色

const getColorByTicketType = (ticketType) => {
  if (ticketType === '成人票') {
    return '#00B9D2';
  } else if (ticketType === '兒童票') {
    return '#4786D0';
  } else if (ticketType === '優待票') {
    return '#04D200';
  }
  return '#B3C3C5'; // 默認顏色
};






</script>

<template >
  <Header></Header>
  <NavBar />
  <main>
    <div class="title">
      <h2 class="tickstatus">未使用</h2>
      <h2 class="date">{{ selectedDate }}</h2>
    </div>
    <section class="top-box"> 
      <div class="card" 
        v-for="ticket in userTickets" :key="ticket._id" 
        :style="{ 'backgroundColor': status === 'unuse' ? getColorByTicketType(ticket.ticketCategoryId.ticketType) : '#B3C3C5' }">
  <!-- 在這裡放置你想顯示的票券資訊 -->
        <div class="box-content">
          <div class="status" 
            :style="{ 'display': status === 'unuse' ? 'none' : 'block' }">
            <p>{{ status === 'used' ? '已使用' : ''  }}</p>
          </div>
          <div class="ticketitle">{{ ticket.ticketCategoryId.ticketType }}</div>
          <h3>{{ ticket.ticketCategoryId.fastTrack ? '快速通關' : '普通票' }}</h3>
        </div>
        <img src="@/../public/QRcode.png" class="QRcode">
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
          <tr v-for="ticket in userTickets" :key="ticket._id">
            <td>{{ selectedDate }}</td>
            <td>{{ ticket.status === 'used' ? '已使用' : '未使用' }}</td>
            <td>{{ ticket.ticketCategoryId.ticketType }}</td>
            <td>{{ ticket.currentPurchasePrice }}元</td>
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
    display: flex;
    justify-content: space-around;
    width: 26%;
    background-color: #30B0C9;;
    border-radius: 10px;
    padding:1rem;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2),
              0px 8px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    .box-content {
      font-size: 25px;
      font-weight: bold;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: end;
      padding-bottom: 1rem;

      .status {
        p {
          font-size: 12px;
        }
        padding: 5px;
        width: 3rem;
        text-align: center;
        border: 1px solid #fff;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        /* display: none; */
      }

      .ticketitle {
        padding-bottom: 1rem;
      }
    }
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