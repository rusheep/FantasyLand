<script setup>
import axios from 'axios';
import { getFormatDateToISOString } from '@/composable';
import router from '@/router';
// 彈窗開關
const infoModal = ref(false);

// 票的日期
const selectedDate = ref('');

// 總價
const totalPrice = ref(0);

// 目前票種
const ticketInfo = ref({
  allTicketsInfo: [],
  count: 0,
});

//目前有買的票
const userTickets = ref({
  count: 0,
  findTodayUnuseTicket: [],
});

// 轉時間字串
const formattedDate = ref();

// 取得所有票種
onMounted(async () => {
  try {
    // 取得票種：
    const ticketCategoryAPI = await axios.get('/api/v1/ticketCategory');
    ticketInfo.value.allTicketsInfo = ticketCategoryAPI.data.allTicketsInfo;
    ticketInfo.value.allTicketsInfo.forEach((ticket) => {
      ticket.amount = 0;
    });
    ticketInfo.value.count = ticketCategoryAPI.data.count;

    // 取得 unuse 票 / 或是今天的 usefd 票
    const userTicketsAPI = await axios.get('/api/v1/userTickets/getTickets');

    const unseOrTodayUsedTicket = userTicketsAPI.data;

    if (unseOrTodayUsedTicket.length > 0) {
      // 換算票的時間
      const ticketDate = unseOrTodayUsedTicket[0]?.ticketDate;
      const formattedDate = getFormatDateToISOString(ticketDate);
      // userTickets 的票 為票數
      userTickets.value.count = unseOrTodayUsedTicket.length;
      // API的票 放進userTickets.findTodayUnuseTicket
      userTickets.value.findTodayUnuseTicket = unseOrTodayUsedTicket;
      // API票的時間變為現在的時間
      selectedDate.value = formattedDate;
    }
  } catch (error) {
    console.error(error);
    return;
  }
});

// 彈窗開關
const switchStatus = function () {
  infoModal.value = !infoModal.value;
};

// 票數加減
const adjustamount = (ticket, increment) => {
  const totalTicketCountForAccount =
    totalTicketCount.value + (increment ? 1 : -1);

  if (totalTicketCountForAccount <= 5) {
    if (increment) {
      const remainingTickets =
        5 - userTickets.value.count - totalTicketCount.value;

      if (remainingTickets > 0) {
        ticket.amount = (ticket.amount || 0) + 1;
        updateTotalPrice();
      } else {
        alert('一組帳號只能在同日期買五張票');
      }
    } else {
      if (ticket.amount > 0) {
        ticket.amount--;
        updateTotalPrice();
      }
    }
  } else {
    alert('一組帳號只能買五張票');
  }
};

// 限制今天以前都不能購買
const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 計算總價
function updateTotalPrice() {
  totalPrice.value = ticketInfo.value.allTicketsInfo.reduce((total, ticket) => {
    return total + (ticket.amount || 0) * ticket.price;
  }, 0);
}

// 計算總票數
const totalTicketCount = computed(() => {
  return ticketInfo.value.allTicketsInfo.reduce((total, ticket) => {
    return total + (ticket.amount || 0);
  }, 0);
});


//防抖
let debounceTimeout; // 用於儲存防抖計時器的變數

async function submit() {
  if (!selectedDate.value) {
    return alert('請輸入日期'); // 如果沒有選擇日期，彈出警告提示
  }

  if (totalTicketCount.value === 0) {
    return alert('請加購票券'); // 如果票券數量為零，彈出警告提示
  }

  // 清除之前可能存在的防抖計時器
  clearTimeout(debounceTimeout);

  // 設置一個新的防抖計時器，在一定時間（這裡是500毫秒）後執行內部的程式碼
  debounceTimeout = setTimeout(async () => {
    // 在防抖函式內部的現有程式碼

    // 格式化資料，過濾掉數量為零的票券
    const formattedData = ticketInfo.value.allTicketsInfo
      .filter((item) => item.amount !== 0)
      .map((item) => ({
        ticketDate: selectedDate.value,
        ticketId: item._id,
        amount: item.amount,
      }));

    if (selectedDate.value && totalTicketCount.value > 0) {
      try {
        // 使用axios送出POST請求到API端點
        const response = await axios.post('/api/v1/order', formattedData);
        // 將訂單資料儲存到本地儲存中
        localStorage.setItem('order', JSON.stringify(response.data));
        // 導向使用者訂單頁面
        router.push('/user/order');
      } catch (error) {
        // 如果送出失敗，彈出錯誤訊息
        alert(error.response.data.msg);
      }
    }
  }, 500); // 根據需要調整防抖時間
}



</script>
<template>
  <div>
    <!-- 彈窗 -->
    <div v-if="infoModal" class="modal-overlay">
      <div class="modal">
        <div class="m-wrapper">
          <h3>一組帳號只能在同日期買五張票</h3>
          <div class="m-userTickets">
            <div>
              <p>目前</p>
              <h4>
                {{ selectedDate ? selectedDate : '無購買票' }}
                {{
                  userTickets.count !== 0
                  ? `有${userTickets.findTodayUnuseTicket.length}張`
                  : ''
                }}
              </h4>
            </div>
            <div>
              <p>可再購買</p>
              <h4>
                {{
                  5 -
                  (userTickets.findTodayUnuseTicket
                    ? userTickets.findTodayUnuseTicket.length
                    : 0)
                }}張票
              </h4>
            </div>
          </div>
          <p class="m-title">購票須知</p>
          <div class="m-ticketInfo">
            <div>
              <p>成人票 : 18歲以上</p>
              <p>兒童票 :08~ 18歲</p>
            </div>
            <div>
              <p>優待票 :需有殘障手冊證明</p>
              <p>免費:08歲以下免費</p>
            </div>
          </div>
          <div class="btn">
            <Button btnFontSize="0.5" @click="switchStatus">返回</Button>
          </div>
        </div>
      </div>
    </div>

    <main>
      <!-- 左半邊 -->
      <section>
        <div class="cart">
          <div class="timeInfoBar">
            <div class="timepicker">
              <h2>日期：</h2>
              <input v-if="userTickets.count === 0" type="date" v-model="selectedDate" @change="handleDateChange"
                class="date-input" :min="getToday()" />
              <h2 v-else>{{ selectedDate }}</h2>
            </div>
            <Button btnFontSize="0.3rem" @click="switchStatus" class="btn">暸解票券資訊</Button>
          </div>
          <div class="ticketsOrder" v-for="(item, index) in ticketInfo.allTicketsInfo" :key="item._id">
            <div class="ticketInfo">
              <h4>
                {{ item.ticketType }} ({{ item.fastTrack ? '快速通關' : '一般' }})
              </h4>
              <p>{{ item.price }}元</p>
            </div>
            <div class="counter">
              <div class="box" @click="adjustamount(item, false)">
                -
              </div>
              <p>{{ item.amount || 0 }}</p>
              <div class="box" @click="adjustamount(item, true)">
                +
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 右半邊 -->
      <section>
        <div class="payment">
          <h3 class="payment-title">信用卡支付</h3>
          <div class="payment-content">
            <div>
              <p>信用卡</p>
              <input class="big-input" type="text" placeholder="4136815292895026" />
            </div>

            <div class="twoInputBox">
              <div>
                <p>過期日</p>
                <input class="small-input" type="text" placeholder="10/18" />
              </div>
              <div>
                <p>CVC</p>
                <input class="small-input" type="text" placeholder="212" />
              </div>
            </div>
            <div>
              <p>優惠碼</p>
              <input class="big-input" type="text" />
            </div>
          </div>
        </div>
      </section>
    </main>
    <hr />
    <div class="pricePaybox">
      <h3>總價:{{ totalPrice }}元 ; 票數:{{ totalTicketCount }}張</h3>
      <Button btnFontSize="0.3rem" @click.prevent="submit" btnColor="#0694A7">支付</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 補了sc */
main {
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;

  @media screen and (max-width: 730px) {
    flex-direction: column;
  }
}

section {
  width: 100%;
  height: 440px;

  /* border: 1px solid black; */
  @media screen and (max-width: 730px) {
    height: 300px;
  }
}

.cart {
  .timeInfoBar {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;

    .timepicker {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        @media screen and (max-width: 730px) {
          font-size: 10px;
        }
      }
    }
  }
}

.ticketsOrder {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  margin-bottom: 5px;

  .ticketInfo {
    h4 {
      font-size: 18px;
      padding: 2px 0;
      color: $main-color;
      font-weight: bold;

      @media screen and (max-width: 730px) {
        font-size: 14px;
      }
    }

    p {
      font-size: 15px;
      color: $main-color;
      font-weight: bold;
      margin-bottom: 6px 0;
    }
  }

  .counter {
    display: flex;
    width: 150px;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 730px) {
      width: 100px;
    }

    .box {
      text-align: center;
      width: 18px;
      height: 18px;
      background-color: $main-color;
      color: white;
      cursor: pointer;
    }
  }
}

.payment {
  display: flex;
  flex-direction: column;
  align-items: center;

  .payment-title {
    font-size: 24px;
    line-height: 50px;
    height: 50px;
    text-align: center;
    color: $main-color;
    font-weight: bold;
  }

  .payment-content {
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: $main-color;
    width: 350px;
    height: 250px;
    margin: 0 40px;
    padding: 40px 30px;
    border-radius: 15px;
    gap: 40px;

    @media screen and (max-width: 730px) {
      width: 200px;
    }

    p {
      color: white;
      padding-bottom: 5px;
    }

    .twoInputBox {
      display: flex;
      gap: 5px;
    }

    input {
      max-width: 100%;
      border: 0px;
      border-radius: 3px;
      height: 20px;
    }

    .big-input {
      width: 350px;

      @media screen and (max-width: 730px) {
        width: 200px;
      }
    }

    .small-input {
      width: 170px;

      @media screen and (max-width: 730px) {
        width: 80px;
      }
    }
  }
}

hr {
  width: 75%;
  margin: 0 auto;
}

.pricePaybox {
  width: 65%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  align-items: center;

  @media screen and (max-width: 730px) {
    margin-top: 100px;
  }

  h3 {
    color: $main-color;
    font-size: 30px;
    font-weight: bold;

    @media screen and (max-width: 730px) {
      font-size: 15px;
    }
  }
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

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

  .modal {
    background-color: white;
    padding: 20px 0px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
}

.m-wrapper {
  padding: 10px 30px;

  h3 {
    font-size: 30px;
    color: $main-color;
    font-weight: bold;
    margin-bottom: 20px;
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
</style>
