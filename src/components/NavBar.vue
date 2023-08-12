<template>
    <main>
        <div v-for="(nav, index) in navbarInfo" :key="nav.name" @click="changeStatus(index)">
            <h3 :class="{ selected: index === props.statusIdx }">{{ nav.name }}</h3>
        </div>
    </main>
</template>

<script setup>
const navbarInfo = ref([
    { name: '票夾' },
    { name: '購物車' },
    { name: '會員資料' },
]);

const props = defineProps({
    statusIdx: {
        type: Number,
        default: 0,
    },
});

const changeStatus = (index) => {
    props.statusIdx = index;
};

</script>

<style lang="scss" scoped>
main {
    width: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border: 1px solid $main-color;
    padding: 4px 0;
    border-radius: 8px;

    div {
        padding: 7px 30px;
        border-radius: 5px;
        cursor: pointer;

        h3 {
            font-size: 10px;
            color: $second-color;
            font-weight: bold;
        }
    }

    h3.selected {
        color: white;
        padding: 5px 30px;
        background-color: $second-color;
        border-radius: 5px;
    }
}
</style>
