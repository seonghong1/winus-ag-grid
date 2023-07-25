<template>
  <div>
    <select @change="changePagingStep" id="">
      <option value="10">10</option>
      <option value="22">22</option>
      <option value="33">33</option>
      <option value="44">44</option>
      <option value="55">55</option>
      <option value="100">100</option>
    </select>
  </div>
  <AgGridVue
    :gridOptions="gridOptions"
    style="width: 100vw; height: 500px"
    class="ag-theme-alpine"
  />
</template>
<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import type { GridApi } from "ag-grid-community";
import { dummy_data } from "../../dummy";
import type { GridOptions } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const columnDef = [
  { headerName: "원주문번호", field: "ORG_ORD_ID", width: 300, sortable: true },
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

let gridApi: GridApi | null = null;
function onGridReady(params: any) {
  gridApi = params.api;
}
const gridOptions: GridOptions = {
  columnDefs: columnDef,
  rowData: dummy_data,
  pagination: true,
  paginationPageSize: 100,
  onGridReady: onGridReady,
};

function changePagingStep(e: Event) {
  const target = e.target as HTMLSelectElement;

  gridApi?.paginationSetPageSize(Number(target.value));
}
</script>
<style lang=""></style>
