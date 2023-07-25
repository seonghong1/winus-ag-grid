<template>
  <div style="height: 100%">
    <AgGridVue
      style="width: 90%; height: 600px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
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

const columnDefs = [
  // {
  //   headerName: '양도',
  //   children: [
  //     { headerName: '명세일자', field: 'TRANS_DATE' },
  //     { headerName: '명세번호', field: 'TRANS_SEQ' },
  //     { headerName: '매입일자', field: 'WORK_DATE' },
  //   ],
  // },
  // {
  //   headerName: '양수',
  //   children: [
  //     { headerName: '매입구분', field: 'WORK_TYPE_NM' },
  //     { headerName: '창고이름', field: 'STOCK_NM' },
  //     { headerName: '창고이름', field: 'STOCK_NM' },
  //     { headerName: '창고이름', field: 'STOCK_NM' },
  //   ],
  // },

  {
    headerName: "주문정보",
    cellClass: "grid-cell-centered",
    children: [
      {
        headerName: "원주문번호",
        field: "ORG_ORD_ID",
        width: 250,
        cellClass: "grid-cell-centered",
      },
      { headerName: "주문번호", field: "ORD_ID", width: 500 },
      { headerName: "SEQ", field: "ORD_SEQ", width: 80 },
      { headerName: "차수", field: "ORD_DEGREE", width: 80 },
    ],
  },
  {
    headerName: "상품정보",
    children: [
      { headerName: "품명", field: "RITEM_NM", width: 500 },
      { headerName: "수량", field: "OUT_ORD_QTY", width: 80 },
    ],
  },
  {
    headerName: "고객정보",
    children: [
      { headerName: "수화인", field: "P_SALES_CUST_NM", width: 500 },
      { headerName: "번호", field: "PHONE_1", width: 150 },
      { headerName: "주소", field: "ADDR", width: 300 },
    ],
  },
  { headerName: "출고예정일", field: "OUT_REQ_DT", width: 130 },
  {
    headerName: "판매처",
    field: "DATA_SENDER_NM",
    width: 100,
    pinned: "right",
  },
];

const defaultColDef = {
  sortable: true,
  resizable: true,
};

const rowData = dummy_data;
</script>

<style>
.grid-cell-centered {
  text-align: center;
}
</style>
