<template >
    <div class="container">
        <div class="header">
            <Header />
        </div>
        <div class="image-container">
            <img class="my-image" src="@/assets/img/park_image.png">
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss">
.container {
    position: relative;

}

.header {
    position: fixed;
    z-index: 1;
    width: 100%;
}

.image-container {
    position: relative;
    z-index: 0;

}


.my-image {
    width: 100%;
    max-height: 100%;
}
</style>
