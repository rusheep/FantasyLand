<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition name="route" appear mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-out;
  position: absolute;
}
</style>