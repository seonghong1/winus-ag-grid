<template>
  <div style="height: 100%">
    <AgGridVue
      style="width: 90%; height: 500px"
      class="ag-theme-alpine"
      :gridOptions="gridOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { dummy_data } from "../../dummy.js";

import {
  GridOptions,
  RowSpanParams,
  CellClassParams,
  ColDef,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const columnDefs: ColDef[] = [
  {
    headerName: "원주문번호",
    field: "ORG_ORD_ID",
    width: 250,
    rowSpan: rowSpan,
    cellClassRules: {
      "cell-span": (params: CellClassParams) => params.node.rowIndex === 0,
    },
  },
  { headerName: "주문번호", field: "ORD_ID", width: 120 },
  { headerName: "SEQ", field: "ORD_SEQ", width: 80 },
  { headerName: "차수", field: "ORD_DEGREE", width: 80 },
  { headerName: "상품명", field: "RITEM_NM", width: 200 },
  { headerName: "수량", field: "OUT_ORD_QTY", width: 80 },
  { headerName: "출고예정일", field: "OUT_REQ_DT", width: 130 },
  { headerName: "수화인", field: "P_SALES_CUST_NM", width: 100 },
  { headerName: "번호", field: "PHONE_1", width: 150 },
  { headerName: "주소", field: "ADDR", width: 300 },
  { headerName: "판매처", field: "DATA_SENDER_NM", width: 100 },
];

const rowData = dummy_data;

const gridOptions: GridOptions = {
  columnDefs,
  rowData,
  suppressRowTransform: true, // 병합 전제조건
};

const countByDate = {};

// dummy_data.forEach((item, index) => {
//   const { ORG_ORD_ID } = item;
//   if (!countByDate[ORG_ORD_ID]) {
//     countByDate[ORG_ORD_ID] = {
//       count: 0,
//       startIndex: index,
//     };
//   }
//   countByDate[ORG_ORD_ID].count++;
// });

function rowSpan(params: RowSpanParams) {
  /** 인접 행과 비교해야 되는 지? */
  if (params.node?.rowIndex === 0) {
    return 4;
  }

  return 1;
}
</script>

<style scoped></style>
