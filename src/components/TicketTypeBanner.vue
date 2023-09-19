<template>
    <div class="container">
        <div class="ticket-box">
            <div>
                <img src="@/assets/img/ticket01.png">
            </div>
            <div class="ticket-type">
                <img src="@/assets/img/ticket01.png">
            </div>
            <div class="ticket-type">
                <img src="@/assets/img/ticket01.png">
            </div>
        </div>
        <div class="image-container">
            <h3>園區票型</h3>
            <img src="@/assets/img/park_image2.png" alt="" />
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}

.ticket-box {
    width: 65%;
    height: 60%;
    position: absolute;
    z-index: 3;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #2A5C6E;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    div {
        height: 80%;
        margin: 10px 0;
        z-index: 4;

        img {
            max-height: 100%;
        }
    }
}

.image-container {
    position: relative;
    z-index: 0;

    h3 {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        font-size: 30px;
        font-weight: bold;
        color: white;
    }

    img {
        width: 100%;
        max-height: 100%;
    }
}
</style>
