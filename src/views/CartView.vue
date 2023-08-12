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
                <div>內容</div>
            </div>
        </section>
        <!-- 右半邊 -->
        <section>
            <div class="payment">
                <h3>信用卡支付</h3>
                <div>內容</div>
            </div>
        </section>
    </main>
</template>
<script setup></script>
<style lang="scss">
main {
    width: 75%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 10px;
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

        .timepicker {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

}

.payment {
    h3 {
        border: 1px solid black;
        height: 50px;
    }
}
</style>