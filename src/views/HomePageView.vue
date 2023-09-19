<template>
    <div class="container">
        <!-- 導覽列 和 第一個 Banner -->
        <div class="navBarWithBanner">
            <div class="header">
                <Header />
            </div>
            <div class="image-container">
                <img class="my-image" src="@/assets/img/park_image.png" />
            </div>
            <!-- 票型 Banner -->
            <div class="ticket-type-banner">
                <TicketTypeBanner />
            </div>
            <div class="facility-status">
                <FacilityState />
            </div>
        </div>
    </div>
</template>


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

        .my-image {
            width: 100%;
            max-height: 100%;
        }
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

.facility-status {
    position: absolute;
    /* top: 150%; */
    top: 165%;
    left: 0;
    width: 100%;
    z-index: 1;
}
</style>
