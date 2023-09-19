<script setup>
import { getTaiwanTime, getFormatDateToISOString } from '@/composable';

const fiveDayData = getFiveDaysLaterInfo(); // 今天加上五天後的數據
const selectedIndex = ref(0);
const currentClickTime = ref(''); // 目前點點擊時間

function selectDate(index) {
  selectedIndex.value = index;
  console.log(selectedIndex.value);
  currentClickTime.value = fiveDayData[index].date;
  console.log(currentClickTime.value);
}

// 今天+四天數據並
function getFiveDaysLaterInfo() {
  const today = getTaiwanTime();
  const fiveDaysLaterInfo = [];
  const chineseDaysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfWeekIndex = date.getDay(); // 0 for Sunday, 1 for Monday, and so on
    const dayOfWeekChinese = chineseDaysOfWeek[dayOfWeekIndex];
    fiveDaysLaterInfo.push({
      date: date.toLocaleDateString('zh-TW'),
      dayOfWeek: dayOfWeekChinese,
    });
  }
  return fiveDaysLaterInfo;
}

console.log(fiveDayData);
</script>
<template>
  <div class="container">
    <main>
      <h2>人氣設施狀態</h2>
      <div class="date">
        <p
          v-for="(date, index) in fiveDayData"
          :key="date.date"
          :class="{ 'btn-color': selectedIndex === index }"
          @click="selectDate(index)"
        >
          {{ date.date.slice(5, 10) }} {{ date.dayOfWeek }}
        </p>
      </div>
      <p>adss</p>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 400px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 30%,
    rgba(251, 246, 227, 1) 100%
  );
}

main {
  width: 70%;
  margin: 0 auto;
}

h2 {
  text-align: center;
  padding: 10% 0 2% 0;
  font-size: 30px;
}

.date {
  display: flex;
  justify-content: center;
  gap: 20px;

  p {
    display: inline-block;

    border: 2px solid #ff8a00;
    font-size: 15px;
    color: #ff8a00;
    padding: 7px 30px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
  }

  .btn-color {
    background-color: #ff8a00;
    color: white;
  }
}
</style>
