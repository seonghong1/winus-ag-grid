<template>
  <div>
    <input type="checkbox" @click="checkHandler" :checked="checked" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCheckStore } from '../store/check';

const store = useCheckStore();
const props: any = defineProps({});

const rowData = props.params.data;

// checked 값
const checked = computed(
  () =>
    store.checkedArr.value.findIndex((row) => row.ORD_ID === rowData.ORD_ID) >
    -1
);

const checkHandler = () => {
  store.selectRowData(rowData);
};
</script>

<style scoped>
input {
  margin-right: 20px;
}
</style>
