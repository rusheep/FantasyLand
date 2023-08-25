<script setup>
import { defineProps, ref } from 'vue';

const visible = ref(true);

const props = defineProps({
  visible: Boolean,
  ticketId: String,
  ticketType: String,
});

const showContent = ref(false);

const toggleContent = () => {
  visible.value = !visible.value;
};

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
</script>
<template>
  <div
    v-if="visible"
    class="modal-overlay"
  >
    <div class="modal">
      <div class="m-wrapper">
        <div
          class="card"
          :style="{ backgroundColor: getColorByTicketType(ticketType) }"
        >
          {{ ticketId }}
          <button @click="toggleContent">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  z-index: 100;
}

.modal {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  width: 400px;
}

.m-wrapper {
  padding: 10px;
}

.card {
  padding: 20px;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  text-align: center;
}
</style>
