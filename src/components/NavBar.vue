<template>
  <div class="content">
    <router-link
      v-for="(nav, index) in navbarInfo"
      :key="nav.name"
      :to="nav.routePath"
    >
      <div>
        <h3 :class="{ selected: index === props.statusIdx }">{{ nav.name }}</h3>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const navbarInfo = ref([
  { name: '票夾', routePath: '/user/userticket' },
  { name: '購物車', routePath: '/user/cart' },
  { name: '會員資料', routePath: '/user/profile' },
]);

const props = defineProps({
  statusIdx: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.content {
  width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid $main-color;
  padding: 4px 0;
  border-radius: 8px;

  @media screen and (max-width: 730px) {
    width: 200px;
  }
  div {
    padding: 7px 30px;
    border-radius: 5px;
    cursor: pointer;
    @media screen and (max-width: 730px) {
      padding: 7px 0px;
    }
    h3 {
      font-size: 10px;
      color: $second-color;
      font-weight: bold;

      @media screen and (max-width: 730px) {
        font-size: 13px;
      }
    }
  }

  h3.selected {
    color: white;
    padding: 5px 30px;
    background-color: $second-color;
    border-radius: 5px;
    @media screen and (max-width: 730px) {
      padding: 5px 10px;
    }
  }
}
</style>
