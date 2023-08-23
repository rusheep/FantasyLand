<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { getFormatDateToISOString } from '../../composable';

// 彈窗開關
const infoModal = ref(false);

//確認彈窗
const confirmModal = ref(false)

// 票的日期
const selectedDate = ref('');

// 票價
const price = ref(0);

//狀態
const status = ref('');

//快速通關
const fastTrack = ref('');

//票種
const ticketType = ref('');

//票券ID
const ticketId = ref('');

//目前有買的票
const userTickets = ref([]); // 將 userTickets 初始值改為一個空陣列

// 取得所有票函式
async function fetchAndProcessTickets() {
  try {
    // 取得 unuse 票 / 或是今天的 used 票
    const userTicketsAPI = await axios.get('/api/v1/userTickets//getTickets');

    const unseOrTodayUsedTicket = userTicketsAPI.data;
    userTickets.value = unseOrTodayUsedTicket;
    console.log(userTickets.value);

    // 換算票的時間
    const ticketDate = unseOrTodayUsedTicket[0]?.ticketDate;
    const formattedDate = getFormatDateToISOString(ticketDate);
    unseOrTodayUsedTicket.forEach(ticket => {
      selectedDate.value = formattedDate;
      status.value = ticket.status;
      fastTrack.value = ticket.ticketCategoryId.fastTrack;
      ticketType.value = ticket.ticketCategoryId.ticketType;
    });
  } catch (error) {
    console.error(error);
  }
}

// 退票函式
const sendRefundRequest = async (ticketId) => {
  const refundUrl = `/api/v1/userTickets/refund/${ticketId}`;
  console.log(ticketId);
  try {
    const response = await axios.get(refundUrl);
    // 处理退票成功的逻辑
    console.log('退票成功');
    infoModal.value = false;
    confirmModal.value = false;
    await fetchAndProcessTickets(); // 保证退票成功后重新获取和处理票务信息
  } catch (error) {
    // 处理退票失败的逻辑
    console.error(error);
  }
};

// 調用函式
onMounted(async () => {
  fetchAndProcessTickets();
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

// 彈窗開關
const switchStatus = (ticket) => {
  selectedDate.value = getFormatDateToISOString(ticket.ticketDate);
  status.value = ticket.status;
  fastTrack.value = ticket.ticketCategoryId.fastTrack;
  ticketType.value = ticket.ticketCategoryId.ticketType;
  infoModal.value = !infoModal.value;
  ticketId.value = ticket._id;
  price.value = ticket.ticketCategoryId.price;
  // console.log(ticket);
  console.log(price);

};

//確認彈窗開關
const switchConfirm = ()=>{
  confirmModal.value = !confirmModal.value;
  console.log('出來了');
}






</script>

<template >
  <Header></Header>
  <NavBar />
  <!-- 彈窗 -->
  <div v-if="infoModal" class="modal-overlay">
    <div class="modal">
      <div class="m-wrapper">
        <div class="card" :style="{ 'backgroundColor': getColorByTicketType(ticketType) }">
          <div class="box-content">
            <div class="status" :style="{ 'display': status === 'unuse' ? 'none' : 'block' }">
              <p>{{ status === 'used' ? '已使用' : '' }}</p>
            </div>
            <div class="ticketitle">{{ ticketType }}</div>
            <h3>{{ fastTrack ? '快速通關' : '普通票' }}</h3>
            <!-- 其他详细信息的显示 -->
            <div class="btn-wrap">
              <Button class="btn" btnFontSize="0.5" btnColor="rgba(0,0,0,0)" @click="infoModal = false">返回</Button>
              <Button class="btn" btnColor="rgba(0,0,0,0)" @click="switchConfirm">退票</Button>
            </div>
          </div>
          <img src="@/../public/QRcode.png" class="QRcode">
        </div>
      </div>
    </div>
  </div>

  <!-- 確認彈窗 -->
<div v-if="confirmModal" class="confirm-modal-overlay">
    <div class="modal">
      <div class="m-wrapper">
        <div class="card" :style="{ 'backgroundColor': getColorByTicketType(ticketType) }">
          <div class="box-content">
              <div class="ticketitle">{{ ticketType }}</div>
              <h3>{{ fastTrack ? '快速通關' : '普通票' }}</h3>  
              <h3>確定退票？</h3>
          </div>
          <div class="right-side">
            <h3 class="price">{{ price }}</h3>
            <div class="btn-wrap">
              <Button class="btn" btnColor="rgba(0,0,0,0)" @click="sendRefundRequest(ticketId) ">是</Button>
              <Button class="btn" btnFontSize="0.5" btnColor="rgba(0,0,0,0)" @click="confirmModal = false">否！我不想退票</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 


  <main>
    <div class="title">
      <h2 class="tickstatus">未使用</h2>
      <h2 class="date">{{ selectedDate }}</h2>
    </div>
    <section class="top-box"> 
      <div class="card" 
        @click="switchStatus(ticket)"
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

/* 彈窗 */


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.m-wrapper {
  padding: 10px 30px;

  h3 {
    font-size: 30px;
    color: #ffff  ;
    font-weight: bold;
    margin-bottom: 3rem;
  }

  .card {
    width: 40vw;;
    height: 40vh;
    
    img {
      
    }
    .box-content {
      justify-content: center;
    }
    .ticketitle {
      font-size: 48px;
    }

  }

  .m-userTickets {
    display: flex;
    justify-content: space-between;

    div {
      p {
        color: $main-color;
        font-weight: bold;
        margin-bottom: 5px;
      }

      h4 {
        font-size: 25px;
        margin-bottom: 10px;
      }
    }
  }

  .m-title {
    color: $main-color;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .m-ticketInfo {
    display: flex;
    justify-content: space-between;

    div {
      p {
        margin-bottom: 3px;
      }
    }
  }
}

.btn-wrap {
  /* text-align: end; */
  /* margin-top: 20px; */
  width: 100%;
  .btn {
    border: 2px solid #fff;
    margin-right: 1rem;
  }
}

//確認彈窗
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .right-side {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 48px;
    }
  }
}
</style>