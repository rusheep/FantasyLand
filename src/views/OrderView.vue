<template >
    <main>
        <div class="title-box">
            <h3>完成訂單！</h3>
            <div class="name-email">
                <div class="name">
                    <p class="bold-title">姓名</p>
                    <p>Asher Lien</p>
                </div>
                <div class="email">
                    <p class="bold-title">電子信箱</p>
                    <p>arthur@gmail.com</p>
                </div>

            </div>

        </div>
        <div class="order">
            <div class="content">
                <div class="order-info">
                    <div class="order-box">
                        <h3 class="bold-title">票券日期</h3>
                        <p>2023-08-11</p>
                    </div>
                    <div class="order-box">
                        <h3 class="bold-title">訂單日期</h3>
                        <p>2023-07-11</p>
                    </div>
                    <div class="order-box">
                        <h3 class="bold-title">總金額</h3>
                        <p>2000元</p>
                    </div>
                </div>
                <div class="tickets">
                    <h3 class="bold-title">票券資訊</h3>
                    <div class="tickets-info">
                        <p>成人票 快速通關 1 張</p>
                        <p>成人票 快速通關 1 張</p>
                        <p>成人票 快速通關 1 張</p>
                        <p>成人票 快速通關 1 張</p>
                        <p>成人票 快速通關 1 張</p>
                    </div>
                </div>
            </div>
            <div class="btn"><Button btnFontSize="0.5" class="mid-btn">回到票夾頁面</Button></div>
        </div>
    </main>
</template>
<script setup></script>
<style lang="scss" scoped>
main {
    width: 75%;
    margin: 0 auto;

}

.bold-title {
    color: $main-color;
    font-weight: bold;
}

//
.title-box {
    margin-bottom: 20px;

    h3 {
        font-size: 25px;
        color: $main-color;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .name-email {
        display: flex;
        align-items: center;
        gap: 20px;

        padding: 5px 0;

        .name {
            gap: 10px;
            display: flex;

        }

        .email {
            gap: 10px;
            display: flex;
        }
    }
}

.order {
    background-color: #f0f0f0;
    height: 200px;


    .content {
        padding: 30px 40px;

        .order-info {
            display: flex;
            gap: 10px;

            .order-box {
                width: 100%;
                height: 70px;
                margin-bottom: 15px;

                h3 {
                    font-size: 16px;
                    margin-bottom: 5px;
                }

                p {
                    font-size: 30px;
                    font-weight: bold;
                }
            }
        }
    }
}

.tickets {
    h3 {
        margin-bottom: 10px;
    }

    .tickets-info {
        display: flex;
        flex-wrap: wrap;

        p {
            width: 200px;
            height: 25px;
        }
    }
}

.btn {
    text-align: center;
    margin-top: 40px;
}
</style>