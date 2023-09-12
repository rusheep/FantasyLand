<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getFormatDateToISOString } from '@/composable';
import router from '@/router';
/* 票券 */
const userTickets = ref([]); //所有票券
const ticketModal = ref(false); //單張票券彈窗開關
const currentTicketData = ref(null); // 當前點擊票券資料
const ticketBoxToggele = ref(false); // 無票券ＵＩ開關

/* 歷史票券 */
const ticketHistory = ref([]);

// 時間
const selectedDate = computed(() => {
  if (userTickets.value.length > 0) {
    const firstTicket = userTickets.value[0];
    return getFormatDateToISOString(firstTicket.ticketDate);
  }
});

onMounted(async () => {
  refreshTickets();
});

const openRefundModal = (ticket) => {
  if (ticket.status !== 'used') {
    currentTicketData.value = ticket;
    ticketModal.value = true;
  }
};

const refreshTickets = async () => {
  // 取得 目前票券
  const getTickets = await axios.get('/api/v1/userTickets/getTickets');
  userTickets.value = getTickets.data;

  if (userTickets.value.length === 0) {
    ticketBoxToggele.value = true;
  } else {
    ticketBoxToggele.value = false;
  }
  // 取得 目前票券歷史
  const getTicketHistory = await axios.get('/api/v1/userTickets/ticketHistory');
  ticketHistory.value = getTicketHistory.data;
};

function toCart() {
  router.push('/user/cart');
}
</script>

<template>
  <div>
    <TicketInfoRefundModal :isOpen="ticketModal" @close="ticketModal = false" :currentTicketData="currentTicketData"
      @refresh-tickets="refreshTickets" />

    <main>
      <div class="title">
        <h3>{{ selectedDate }}</h3>
      </div>
      <!-- 單個票券 -->

      <transition-group name="list" appear tag="div" class="ticketBox">
        <Tickets v-for="(ticket, index) in userTickets" :key="ticket._id" :ticketData="ticket"
          @click="openRefundModal(ticket)" />
      </transition-group>
      <div class="noTicketBox" v-if="ticketBoxToggele">
        <h2>目前沒有訂票</h2>
        <Button @click="toCart">前往訂票頁面</Button>
      </div>


      <div class="title">
        <h2>使用紀錄</h2>
      </div>
      <!-- 票券紀錄 -->
      <TicketHistory :ticketsHistory="ticketHistory" :status="0" />
    </main>
  </div>
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
    justify-content: start;

    @media screen and (max-width: 730px) {
      justify-content: center;
    }

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
    margin-top: 20px;
    margin-bottom: 50px;

    @media screen and (max-width: 730px) {
      margin-top: 0px;
      flex-direction: column;
      align-items: center;
    }
  }

  .noTicketBox {
    background-color: #ebebeb;
    width: 100%;
    height: 100px;
    text-align: center;
    padding: 50px;
  }
}

.list-enter-from {
  opacity: 0;
  transform: scale(0.5);
  /* Start from a smaller size */
  transform-origin: center center;
  /* Scale from the center */
}

.list-enter-to {
  opacity: 1;
  transform: scale(1);
  /* Scale to the normal size */
}

.list-enter-active {
  transition: all 0.4s ease;
}

.list-leave-from {
  opacity: 1;
  transform: scale(1);
  /* Start from the normal size */
  transform-origin: center center;
  /* Scale from the center */
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.5);
  /* Scale down to a smaller size */
}

.list-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}

.list-move {
  transition: transform 0.4s ease, opacity 0.1s ease;
}
</style>
