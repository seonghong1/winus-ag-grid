<template>
  <div style="height: 100%">
    <AgGridVue
      style="width: 90%; height: 600px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :enableRangeSelection="true"
      :copyHeadersToClipboard="false"
      :rowData="rowData"
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
  {
    headerName: "원주문번호",
    field: "ORG_ORD_ID",
    width: 250,
    cellEditorPopup: true,
    cellEditorParams: {
      values: ["Male", "Female"],
      cellRenderer: "",
      cellEditorPopup: true,
    },
  },
  { headerName: "주문번호", field: "ORD_ID", width: 120, editable: true },
  { headerName: "SEQ", field: "ORD_SEQ", width: 80, editable: true },
  { headerName: "차수", field: "ORD_DEGREE", width: 80, editable: true },
  { headerName: "상품명", field: "RITEM_NM", width: 200, editable: true },
  { headerName: "수량", field: "OUT_ORD_QTY", width: 80, editable: true },
  { headerName: "출고예정일", field: "OUT_REQ_DT", width: 130, editable: true },
  {
    headerName: "수화인",
    field: "P_SALES_CUST_NM",
    width: 100,
    editable: true,
  },
  { headerName: "번호", field: "PHONE_1", width: 150, editable: true },
  { headerName: "주소", field: "ADDR", width: 300, editable: true },
  { headerName: "판매처", field: "DATA_SENDER_NM", width: 100, editable: true },
];

const rowData = dummy_data;
</script>

<style scoped></style>
