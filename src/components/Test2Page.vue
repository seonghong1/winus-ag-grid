<template>
  <div style="height: 100%">
    <div class="container">
      <AgGridVue
        style="width: 90%; height: 600px"
        class="ag-theme-alpine"
        :gridOptions="gridOptions"
      />
      <div class="example-header">
        Page Size:
        <select @change="onPageSizeChanged" id="page-size">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import { dummy_data } from '../../dummy.js';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridOptions } from 'ag-grid-community';
import { GridApi } from 'ag-grid-community';

let gridApi: GridApi | null = null;

const columnDefs = [

  { headerName: '원주문번호', field: 'ORG_ORD_ID', width: 250, sortable: true},
  { headerName: '주문번호',field: 'ORD_ID' , width:120, sortable: true },
  { headerName: 'SEQ', field: 'ORD_SEQ'  , width:80,  },
  { headerName: '차수', field: 'ORD_DEGREE'  , width:80,  },
  { headerName: '상품명', field: 'RITEM_NM'  , width:200,  },
  { headerName: '수량', field: 'OUT_ORD_QTY'  , width:80,  },
  { headerName: '출고예정일', field: 'OUT_REQ_DT'  , width:130,  },
  { headerName: '수화인', field: 'P_SALES_CUST_NM'  , width:100,  },
  { headerName: '번호', field: 'PHONE_1'  , width:150,  },
  { headerName: '주소', field: 'ADDR'  , width:300,  },
  { headerName: '판매처', field: 'DATA_SENDER_NM'  , width:100,  },

];

const rowData = dummy_data;

const onGridReady = (params: any) => {
  gridApi = params.api;
};

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  pagination: true,
  paginationPageSize: 100,
  onGridReady: onGridReady,
};

function onPageSizeChanged(e: Event) {
  const target = e.target as HTMLSelectElement;

  gridApi?.paginationSetPageSize(Number(target.value));
}
</script>

<style scoped>
.container {
  position: relative;
}
.example-header {
  position: absolute;
  bottom: 15px;
  left: 15px;
}
</style>
