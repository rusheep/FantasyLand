<template>
    <main>
        <div>
            <h3>票夾</h3>
        </div>
        <div>
            <h3>購物車</h3>
        </div>
        <div>
            <h3>會員資料</h3>
        </div>
    </main>
</template>
<script setup>

</script>
<style lang="scss" scoped>
main {
    width: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 20px;

    border: 1px solid $main-color;
    padding: 8px 0;
    border-radius: 5px;

    div {
        background-color: $main-color;
        padding: 5px 30px;
        border-radius: 5px;
        cursor: pointer;

        h3 {
            font-size: 10px;
            color: white
        }
    }
}
</style>