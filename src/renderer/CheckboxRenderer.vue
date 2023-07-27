<template>
  <div>
    <input type="checkbox" @click="selectHandler" :checked="checked" />
  </div>
</template>

<script setup lang="ts">
import { Column, RowNode } from 'ag-grid-community';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { useCheckStore } from '../store/check';
import { computed } from 'vue';
import { countSpanRow } from '../utils/spanRow';

const props: any = defineProps({});
const store = useCheckStore();

const rowData = props.params.data;
const api: GridApi = props.params.api;
const rowNode: RowNode = api.getRowNode(props.params.rowIndex) as RowNode;
const colApi: ColumnApi = props.params.columnApi;
// 테이블의 모든 rowdata정보
const cols: Column | null = colApi.getColumn('ORG_ORD_ID');

// @ts-ignore ///
const allRowData = cols?.gridOptionsService.gridOptions.rowData;

const countByDate = countSpanRow('ORG_ORD_ID');

const checked = computed(
  // countByDate.count와 checkedArr를 핉터한 length가 같을때
  () =>
  {
    return countByDate[rowData.ORG_ORD_ID].count ===
    store.checkedArr.value.filter(
      (row) => row.ORG_ORD_ID === rowData.ORG_ORD_ID
    ).length;
  }
    
);

const selectHandler = () => {
  store.selectRowSpanData(rowData, allRowData);
  
  // TODO :: Span 대상 Row Index를 받아, selected 처리
  // rowNode.setSelected(true);
};
</script>

<style scoped>
input {
  margin-right: 20px;
}
</style>