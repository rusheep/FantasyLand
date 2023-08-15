<script setup>
import { nextTick } from 'vue';

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

let infoModal = ref(false);

const switchStatus = function () {
    infoModal.value = !infoModal.value
};


</script>
<template>
    <!-- 彈窗 -->
    <div v-if="infoModal" class="modal-overlay">
        <div class="modal">
            <div class="m-wrapper">
                <h3>一組帳號只能在同日期買五張票</h3>
                <div class="m-userTickets">
                    <div>
                        <p>目前在</p>
                        <h4>2023-05-06 有3張票</h4>
                    </div>
                    <div>
                        <p>可再購買</p>
                        <h4>2張票</h4>
                    </div>
                </div>
                <p class="m-title">購票須知</p>
                <div class="m-ticketInfo">
                    <div>
                        <p>成人票 : 18歲以上</p>
                        <p>兒童票 :08~ 18歲</p>
                    </div>
                    <div>
                        <p>優待票 :需有殘障手冊證明</p>
                        <p>免費:08歲以下免費</p>
                    </div>
                </div>
                <div class="btn"> <Button btnFontSize="0.5" @click="switchStatus">返回</Button></div>

            </div>

        </div>

    </div>
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
                    <Button btnFontSize="0.5" @click="switchStatus">暸解票券資訊</Button>
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
    <hr />
    <div class="pricePaybox">
        <h3>總價:2000元</h3>
        <Button btnFontSize='1' btnColor="#0694A7">信用卡支付</Button>
    </div>
</template>

<style lang="scss" scoped>
/* 補了sc */
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
    height: 440px;
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
        font-size: 24px;
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

hr {
    width: 75%;
    margin: 0 auto;
}

.pricePaybox {
    width: 65%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    align-items: center;


    h3 {
        color: $main-color;
        font-size: 30px;
        font-weight: bold;
    }
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    .modal {
        background-color: white;
        padding: 20px 0px;
        border-radius: 5px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);



    }
}

.m-wrapper {
    padding: 10px 30px;

    h3 {
        font-size: 30px;
        color: $main-color;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .m-userTickets {
        display: flex;
        justify-content: space-between;

        div {
            p {
                color: $main-color;
                font-weight: bold;
                margin-bottom: 5px;
            }

            h4 {
                font-size: 25px;
                margin-bottom: 10px;
            }


        }
    }

    .m-title {
        color: $main-color;
        font-weight: bold;
        margin-bottom: 5px;

    }

    .m-ticketInfo {
        display: flex;
        justify-content: space-between;

        div {
            p {
                margin-bottom: 3px;
            }
        }
    }
}

.btn {
    text-align: end;
    margin-top: 20px;
}
</style>