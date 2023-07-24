<template>
  <div @click="exportData">excel export button</div>
  <div style="height: 100%">
    <AgGridVue
      style="width: 90%; height: 600px"
      class="ag-theme-alpine"
      :gridOptions="gridOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
import { dummy_data } from "../../dummy";
import { KEY } from "../../key";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

LicenseManager.setLicenseKey(KEY);
const gridOptions = {
  columnDefs: [
    {
      headerName: "원주문번호",
      field: "ORG_ORD_ID",
      width: 250,
      checkboxSelection: true,
    },
    { headerName: "주문번호", field: "ORD_ID", width: 120, checkbox: true },
    { headerName: "SEQ", field: "ORD_SEQ", width: 80 },
    { headerName: "차수", field: "ORD_DEGREE", width: 80 },
    { headerName: "상품명", field: "RITEM_NM", width: 200 },
    { headerName: "수량", field: "OUT_ORD_QTY", width: 80 },
    { headerName: "출고예정일", field: "OUT_REQ_DT", width: 130 },
    { headerName: "수화인", field: "P_SALES_CUST_NM", width: 100 },
    { headerName: "번호", field: "PHONE_1", width: 150 },
    { headerName: "주소", field: "ADDR", width: 300 },
    { headerName: "판매처", field: "DATA_SENDER_NM", width: 100 },
  ],
  rowData: dummy_data,
  rowSelection: "multiple",
};
// const columnDefs = [
//   // {
//   //   headerName: '명세일자',
//   //   field: 'TRANS_DATE',
//   // },
//   // { headerName: '명세번호', field: 'TRANS_SEQ' },
//   // { headerName: '매입일자', field: 'WORK_DATE' },
//   // { headerName: '매입구분', field: 'WORK_TYPE_NM' },
//   // { headerName: '창고이름', field: 'STOCK_NM' },
//   // { headerName: '창고이름', field: 'STOCK_NM' },
//   // { headerName: '창고이름', field: 'STOCK_NM' },
// ];

/*
  selected rows만 excel export해주기 ,, 참고
  https://www.ag-grid.com/javascript-data-grid/excel-export-rows/
*/

const rowData = dummy_data;
</script>

<style></style>
