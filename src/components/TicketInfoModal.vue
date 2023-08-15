<template >
    <div class="modal-overlay">
        <div class="modal">
            <h2>这是一个弹窗</h2>
            <p>弹窗的内容在这里。</p>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f0f0;
}

#app {
    text-align: center;
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
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}
</style>