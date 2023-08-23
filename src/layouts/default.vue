<script>
import Header from '../components/-Global/Header.vue';
import Footer from '../components/-Global/Footer.vue';

export default {
  components: { Header, Footer },
};
</script>
<template>
  <Header />
  <router-view />
</template>
