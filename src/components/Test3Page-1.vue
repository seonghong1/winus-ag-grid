<template>
  <div>
    <input
      type="checkbox"
      :checked="isChecked"
      @click="checkAllrow"
      name=""
      id=""
    />
    <AgGridVue
      class="ag-theme-alpine"
      :gridOptions="gridOptions"
      style="width: 100vw; height: 500px"
    />
  </div>
</template>

<script setup lang="ts">
//ag-grid
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import type { GridOptions } from "ag-grid-community";
import { CellClassParams } from "ag-grid-community";
import { RowSpanParams } from "ag-grid-community";
import { GridApi } from "ag-grid-community";
//vue
import { computed } from "vue";
import { dummy_data } from "../../dummy";
import HeaderCheckboxTest from "../renderer/HeaderCheckboxTest.vue";
//store
import { useAllCheckStore } from "../store/allCheck";
import { storeToRefs } from "pinia";

const AllCheckStore = useAllCheckStore();

const countByAddress = conuntSpanrowByAddress("ADDR");
let paramsApi: GridApi | null = null;

const columnDefs = [
  {
    headerName: "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 주문번호",
    field: "ORD_ID",
    width: 120,
    cellRenderer: HeaderCheckboxTest,
  },
  { headerName: "SEQ", field: "ORD_SEQ", width: 80 },
  { headerName: "차수", field: "ORD_DEGREE", width: 80 },
  { headerName: "상품명", field: "RITEM_NM", width: 200 },
  { headerName: "수량", field: "OUT_ORD_QTY", width: 80 },
  { headerName: "출고예정일", field: "OUT_REQ_DT", width: 130 },
  { headerName: "수화인", field: "P_SALES_CUST_NM", width: 100 },
  { headerName: "번호", field: "PHONE_1", width: 150 },
  {
    headerName: "주소",
    field: "ADDR",
    width: 500,
    rowSpan: rowSpan,
    cellClassRules: {
      "cell-span": cellSpanRule,
    },
  },
  { headerName: "판매처", field: "DATA_SENDER_NM", width: 100 },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: dummy_data,
  suppressRowTransform: true, // 병합 전제조건
  rowBuffer: 100,
  rowSelection: "multiple",
  onGridReady: onGridReady,
};
function onGridReady(params: any) {
  paramsApi = params.api;
}

//store checked
function checkAllrow(e: Event) {
  if (AllCheckStore.checkedArr.value.length === 0) {
    return AllCheckStore.checkedAllRow(dummy_data);
  }
  return AllCheckStore.checkedAllRow([]);
}
const isChecked = computed(() => {
  return AllCheckStore.checkedArr.value.length !== 0;
});

// rowspan이 되는 rowdata기준점 찾기, return boolean(true: 기준점, false:무시)
function cellSpanRule(params: CellClassParams) {
  const data = params.data.ADDR;
  return (
    params.node?.rowIndex === countByAddress[data].startIndex &&
    countByAddress[data].count !== 1
  );
}
// cellSpanRule로 지정한 기준점으로부터, return 병합 카운트
function rowSpan(params: RowSpanParams) {
  const data = params.data.ADDR;
  if (
    data === countByAddress[data].data &&
    params.node?.rowIndex === countByAddress[data].startIndex
  ) {
    return countByAddress[data].count;
  }
  return 1;
}

// cellspan 유틸함수
function conuntSpanrowByAddress(key) {
  const countByAddress = {};

  dummy_data.forEach((data: string, index: number) => {
    // countByAddress객체인에 해당key값을 가진 데이터가 없는경우
    if (!countByAddress[data[key]]) {
      // 키값 : {} 형태로 삽입
      countByAddress[data[key]] = {
        data: data[key],
        count: 0,
        startIndex: index,
      };
    }
    countByAddress[data[key]].count++;
  });
  return countByAddress;
}
</script>

<style scoped>
input {
  position: absolute;
  top: 55px;
  left: 26px;
  z-index: 100;
}
</style>
