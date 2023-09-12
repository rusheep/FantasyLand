<template>
  <div class="content">
    <router-link v-for="(nav, index) in navbarInfo" :key="nav.name" :to="nav.routePath">
      <div class="nav-item">
        <h3 :class="{ selected: routePath.startsWith(nav.routePath) }">{{ nav.name }}</h3>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const routePath = ref('')

const navbarInfo = ref([
  { name: '票夾', routePath: '/user/userTicket' },
  { name: '購物車', routePath: '/user/cart' },
  { name: '會員資料', routePath: '/user/profile' },
]);

const $route = useRoute();

watchEffect(() => {
  routePath.value = $route.path
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
    width: 300px;
    gap: 5px;
  }

  .nav-item {
    width: 100px;

    height: 20px;

    padding: 7px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;

    @media screen and (max-width: 730px) {
      width: 80px;
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
    padding: 5px 20px;
    background-color: $second-color;
    border-radius: 5px;

    @media screen and (max-width: 730px) {
      padding: 5px 10px;
    }
  }
}
</style>
