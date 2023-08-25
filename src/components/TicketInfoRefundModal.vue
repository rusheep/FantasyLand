<script setup>
const getColorByTicketType = (ticketType) => {
  if (ticketType === '成人票') {
    return '#00B9D2';
  } else if (ticketType === '兒童票') {
    return '#4786D0';
  } else if (ticketType === '優待票') {
    return '#04D200';
  }
  return '#B3C3C5';
};

const emits = defineEmits();

const closeInfoModal = () => {
  emits('close');
};

const props = defineProps({
  isOpen: Boolean,
  currentTicketData: Object,
});
const currentTicketData = ref(props.currentTicketData);

watch(
  () => props.currentTicketData,
  (newData) => {
    currentTicketData.value = newData;
  }
);
</script>
<template>
  <div
    v-if="props.isOpen"
    class="modal-overlay"
  >
    <div class="modal">
      <div class="m-wrapper">
        <div class="card">
          <div class="box-content">
            <div class="status">
              <p>{{ currentTicketData.status }}</p>
            </div>
            <div class="ticketitle">
              {{ currentTicketData.ticketCategoryId.ticketType }}
            </div>
            <h3>
              {{
                currentTicketData.ticketCategoryId.fastTrack
                  ? '快速通關'
                  : '一般票'
              }}
            </h3>
            <!-- 其他详细信息的显示 -->
            <div class="btn-wrap">
              <Button
                class="btn"
                btnFontSize="0.5"
                btnColor="rgba(0,0,0,0)"
                @click="closeInfoModal"
                >返回</Button
              >
              <Button
                class="btn"
                btnColor="rgba(0,0,0,0)"
                >退票</Button
              >
            </div>
          </div>
          <QRCodeGenerator :id="currentTicketData._id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
main {
  width: 75%;
  margin: 0 auto;

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
    padding-bottom: 2rem;
    padding-top: 2rem;
    border-radius: 15px;

    .form {
      width: 80%;
      margin: 0 auto;
      color: #00b9d2;
    }

    .form tbody {
      border: 2px solid #00b9d2;
      background-color: #fff;
    }

    .form th,
    .form td {
      padding: 8px;
      text-align: center;
      font-size: 20px;
    }
    .form tr {
      border-bottom: 1px solid #e4d0d0;
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
    color: #ffff;
    font-weight: bold;
    margin-bottom: 3rem;
  }

  .card {
    width: 40vw;
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
