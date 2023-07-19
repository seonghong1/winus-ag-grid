<template>
  <div style="height: 100%">
    <AgGridVue
      style="width: 90%; height: 1000px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import { onMounted } from 'vue';
import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise';

import { dummy_data } from '../../dummy';
import { KEY } from '../../key';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

LicenseManager.setLicenseKey(KEY);

const columnDefs = [
  { headerName: '원주문번호(문자)', field: 'ORG_ORD_ID', width: 250, filter: 'agTextColumnFilter' },
  { headerName: '주문번호(숫자)',field: 'ORD_ID' , width:150,  filter: 'agNumberColumnFilter' },
  { headerName: 'SEQ', field: 'ORD_SEQ'  , width:80,   filter: 'agSetColumnFilter' },
  { headerName: '차수', field: 'ORD_DEGREE'  , width:80,   filter: 'agSetColumnFilter' },
  { headerName: '상품명', field: 'RITEM_NM'  , width:200,   filter: 'agSetColumnFilter' },
  { headerName: '수량', field: 'OUT_ORD_QTY'  , width:80,   filter: 'agSetColumnFilter'},
  { headerName: '출고예정일(날짜)', field: 'OUT_REQ_DT'  , width:160,   filter: 'agDateColumnFilter' },
  { headerName: '수화인', field: 'P_SALES_CUST_NM'  , width:100,   filter: 'agSetColumnFilter' },
  { headerName: '번호', field: 'PHONE_1'  , width:150,   filter: 'agSetColumnFilter' },
  { headerName: '주소', field: 'ADDR'  , width:300,   filter: 'agSetColumnFilter' },
  { headerName: '판매처', field: 'DATA_SENDER_NM'  , width:100,   filter: 'agSetColumnFilter'}
];

const rowData = dummy_data;

onMounted(() => {});
</script>

<style scoped></style>
