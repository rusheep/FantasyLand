<template>
    <div class="container">
        <div class="navBarWithBanner">
            <div class="header">
                <Header />
            </div>
            <div class="image-container">
                <img class="my-image" src="@/assets/img/park_image.png" />
            </div>
            <div class="ticket-type-banner">
                <TicketTypeBanner />
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}

.navBarWithBanner {
    .header {
        position: fixed;
        z-index: 100;
        width: 100%;
    }

    .image-container {
        position: relative;
        z-index: 0;
    }

    .ticket-type-banner {
        position: absolute;
        top: 92%;
        left: 0;
        width: 100%;
        z-index: 2;
        /* Ensure the TicketTypeBanner is above the image */
    }
}

.my-image {
    width: 100%;
    max-height: 100%;
}
</style>
