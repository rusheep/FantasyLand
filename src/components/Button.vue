<template>
  <button
    :style="buttonStyle"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
  >
    <slot>預設</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  btnTextColor: {
    type: String,
    default: 'white',
  },
  btnFontSize: {
    type: String,
    default: '12px',
  },
  btnColor: {
    type: String,
    default: '#30B0C9',
  },
  btnHoverColor: {
    type: String,
    default: '#0694A7',
  },
});

const buttonStyle = ref({
  color: props.btnTextColor,
  fontSize: props.btnFontSize,
  backgroundColor: props.btnColor,
});

const onMouseOver = () => {
  buttonStyle.value.backgroundColor = props.btnHoverColor;
};

const onMouseOut = () => {
  buttonStyle.value.backgroundColor = props.btnColor;
};
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
