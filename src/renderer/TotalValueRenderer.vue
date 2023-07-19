<template>
  <div style="display: inline-flex; justify-content: space-between; min-width: 120px;">
    <button @click="buttonClicked">1</button>
    <button @click="buttonClicked">2</button>
    <button @click="buttonClicked">3</button>
  </div>
</template>

<script setup lang="ts">
const props: any = defineProps({});

const buttonClicked = () => {
  console.log('first');
  console.log(props.params);
};
</script>

<style scoped></style>
  