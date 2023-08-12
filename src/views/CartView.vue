<template>
    <main>
        <section>
            <div class="cart">
                <div class="timeInfoBar">ss</div>
                <div>內容</div>
            </div>
        </section>
        <section>
            <div class="payment">
                <h3>信用卡支付</h3>
                <div>內容</div>
            </div>
        </section>
    </main>
</template>
<script setup>

</script>
<style lang="scss">
main {
    width: 75%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 10px;
}

section {
    width: 100%;
    height: 500px;
    border: 1px solid black;

    .cart {
        .timeInfoBar {
            border: 1px solid black;
            height: 50px;
        }

    }

    .payment {
        h3 {
            border: 1px solid black;
            height: 50px;
        }
    }
}
</style>