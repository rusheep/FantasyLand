<script setup>
const ticketInfo = ref({
    "allTicketsInfo": [
        {
            "_id": "64dac5c109335151831a1c01",
            "ticketType": "成人票",
            "fastTrack": true,
            "price": 800,
            "active": false,
            "description": "描述ticket資訊",
            "__v": 0
        },
        {
            "_id": "64dac5d109335151831a1c04",
            "ticketType": "成人票",
            "fastTrack": false,
            "price": 800,
            "active": false,
            "description": "描述ticket資訊",
            "__v": 0
        },
        {
            "_id": "64dac5d709335151831a1c07",
            "ticketType": "兒童票",
            "fastTrack": true,
            "price": 800,
            "active": false,
            "description": "描述ticket資訊",
            "__v": 0
        },
        {
            "_id": "64dac5d709335151831a1c07",
            "ticketType": "兒童票",
            "fastTrack": true,
            "price": 800,
            "active": false,
            "description": "描述ticket資訊",
            "__v": 0
        },
        {
            "_id": "64dac5d709335151831a1c07",
            "ticketType": "兒童票",
            "fastTrack": true,
            "price": 800,
            "active": false,
            "description": "描述ticket資訊",
            "__v": 0
        }
    ],
    "count": 3
});


</script>
<template>
    <NavBar :statusIdx="1" class="navbar" />
    <main>
        <!-- 左半邊 -->
        <section>
            <div class="cart">
                <div class="timeInfoBar">
                    <div class="timepicker">
                        <h2>日期：</h2>
                        <Button btnFontSize="0.5" btnColor="#cccccc">選擇日期</Button>
                    </div>
                    <Button btnFontSize="0.5">暸解票券資訊</Button>
                </div>
                <div class="ticketsOrder" v-for="(item, index) in ticketInfo.allTicketsInfo" :key="item._id">
                    <div class="ticketInfo">
                        <h4>{{ item.ticketType }} ({{ item.fastTrack ? "快速通關" : "一般" }})</h4>
                        <p>{{ item.price }}元</p>
                    </div>
                    <div class="counter">
                        <div class="box">+</div>
                        <p>1</p>
                        <div class="box">-</div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 右半邊 -->
        <section>
            <div class="payment">
                <h3 class="payment-title">信用卡支付</h3>
                <div class="payment-content">
                    <div>
                        <p>信用卡</p>
                        <input class="big-input" type="text">
                    </div>

                    <div class="twoInputBox">
                        <div>
                            <p>過期日</p>
                            <input class="small-input" type="text">
                        </div>
                        <div>
                            <p>CVC</p>
                            <input class="small-input" type="text">
                        </div>
                    </div>
                    <div>
                        <p>優惠碼</p>
                        <input class="big-input" type="text">
                    </div>

                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss">
main {
    width: 75%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px;
}

section {
    width: 100%;
    height: 500px;
    /* border: 1px solid black; */
}



.cart {
    .timeInfoBar {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 22px;

        .timepicker {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}

.ticketsOrder {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    margin-bottom: 5px;

    .ticketInfo {
        h4 {
            font-size: 18px;
            padding: 2px 0;
            color: $main-color;
            font-weight: bold;
        }

        p {
            font-size: 15px;
            color: $main-color;
            font-weight: bold;
            margin-bottom: 6px 0;
        }
    }

    .counter {
        display: flex;
        width: 150px;
        justify-content: space-between;
        align-items: center;

        .box {
            text-align: center;
            width: 18px;
            height: 18px;
            background-color: $main-color;
            color: white;
            cursor: pointer;
        }


    }
}


.payment {
    display: flex;
    flex-direction: column;
    align-items: center;

    .payment-title {
        line-height: 50px;
        height: 50px;
        text-align: center;
        color: $main-color;
        font-weight: bold;

    }

    .payment-content {
        display: flex;
        flex-direction: column;
        align-items: start;
        background-color: $main-color;
        width: 350px;
        height: 250px;
        margin: 0 40px;
        padding: 40px 30px;
        border-radius: 15px;
        gap: 40px;

        p {
            color: white;
            padding-bottom: 5px;
            font-size: 5px;
        }

        .twoInputBox {
            display: flex;
            gap: 5px;
        }

        input {

            max-width: 100%;
            border: 0px;
            border-radius: 3px;
            height: 20px;

        }

        .big-input {
            width: 350px;
        }

        .small-input {
            width: 170px;
        }
    }
}
</style>