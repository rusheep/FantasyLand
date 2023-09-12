<script setup>
import { getFormatDateToISOString, getTicketTypeToChinese } from '@/composable';

const seeAllTicketsToggle = ref(true);
const props = defineProps(['ticketsHistory', 'status']);

const ticketArr = ref(4)

function addticketArr() {
  ticketArr.value = ticketArr.value + 1
}

watch(() => props.ticketsHistory, () => {
  // Call addticketArr() when props.ticketsHistory changes
  addticketArr();
});

const ticketHistory = function () {
  switch (props.status) {
    // 只顯示五張
    case 0:
      return props.ticketsHistory.slice(0, ticketArr.value);
    // 顯示全部
    case 1:
      seeAllTicketsToggle.value = false;
      return props.ticketsHistory;
    default:
      return 0;
  }
};
</script>

<template>
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
        <transition-group name="list" appear>
          <tr v-for="(ticket, index) in ticketHistory()" :key="ticket._id">
            <td>
              {{
                ticket.ticketDate && getFormatDateToISOString(ticket.ticketDate)
              }}
            </td>
            <td>{{ getTicketTypeToChinese(ticket.status) }}</td>
            <td>
              {{ ticket.ticketCategoryId.ticketType }}
              {{ ticket.ticketCategoryId.fastTrack ? '快速通關' : '一般票' }}
            </td>
            <td>{{ ticket.currentPurchasePrice }}元</td>
          </tr>

        </transition-group>
      </tbody>
    </table>
    <div class=" no-tickets" v-show="props.ticketsHistory.length === 0">
      無使用票券
    </div>
    <div v-show="seeAllTicketsToggle">
      <router-link to="/user/userTicket/ticketHistory">查看全部</router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.no-tickets {
  display: block;
  width: 100%;
  text-align: center;
  margin: 30px 0;
  color: $main-color;
}

.title {
  @media screen and (max-width: 730px) {
    display: flex;
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

    @media screen and (max-width: 730px) {
      font-size: 14px;
      padding: 0.5rem 0.5rem;
      width: 4rem;
    }
  }
}

section {
  width: 100%;
  background-color: #f1f1f1;
  padding: 2rem;
  border-radius: 15px;

  div {
    display: flex;
    justify-content: end;
    width: 90%;
    margin-top: 10px;
  }

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

.responsive-table {
  overflow: hidden;
}

@media screen and (max-width: 730px) {

  .responsive-table th:nth-child(2),
  /* 隐藏狀態列 */
  .responsive-table td:nth-child(2),
  .responsive-table th:nth-child(4),
  /* 隐藏價格列 */
  .responsive-table td:nth-child(4) {
    display: none;
  }
}


/* List Transtion */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}

.list-enter-to {
  opacity: 1;
  transform: scale(1);
}

.list-enter-active {
  transition: all 0.4s ease;
}

.list-leave-from {
  opacity: 1;
  transform: scale(1);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.list-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}

.list-move {
  transition: all 0.3s ease;
}
</style>
