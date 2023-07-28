<template>
  <div>
    <input type="checkbox" @click="checkHandler" :checked="checked" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RowNode, GridApi } from 'ag-grid-community';
import { useCheckStore } from '../store/check';

const store = useCheckStore();
const props: any = defineProps({});
const api: GridApi = props.params.api;
const rowNode: RowNode = api.getRowNode(props.params.rowIndex) as RowNode;
const rowData = props.params.data;

// checked 값
const checked = computed(() => {
  return (store.checkedArr.value.findIndex(
    (row) => row.ORD_ID === rowData.ORD_ID
  ) > -1 || rowNode.isSelected()) as boolean;
  // return (store.checkedArr.value.findIndex((row) => row.ORD_ID === rowData.ORD_ID) > -1);
});

const checkHandler = () => {
  rowNode.setSelected(true);
  store.selectRowData(rowData);
};
</script>

<style scoped>
input {
  margin-right: 20px;
}
</style>
