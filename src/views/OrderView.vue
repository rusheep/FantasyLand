<template >
    <main>
        <div class="title-box">
            <div class="title">
                <h3>完成訂單!</h3>
                <p>進入冒險者的旅途吧!</p>
            </div>
            <div class="personalInfo">
                <p>姓名:Asher</p>
                <p>電子信箱：arthur4lien@yahoo.com.tw</p>
            </div>
        </div>
        <div>下部分</div>
    </main>
</template>
<script setup></script>
<style lang="scss" scoped>
main {
    width: 75%;
    margin: 0 auto;
}

//
.title-box {

    display: flex;
    justify-content: space-between;

    .title {
        h3 {
            font-size: 25px;
            color: $main-color;
            font-weight: bold;
            padding: 10px 0;
        }

        p {
            color: #9e9e9e;

        }
    }

    .personalInfo {
        display: flex;
        flex-direction: column;
        justify-content: end;

        p {
            font-size: 14px;
            padding: 5px 0;
        }
    }
}
</style>