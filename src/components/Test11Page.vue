<template>
  <div style="height: 100%">
    <AgGridVue
      style="width: 90%; height: 600px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :enableRangeSelection="true"
      :copyHeadersToClipboard="false"
      :suppressRowClickSelection="true"
      :gridOptions="gridOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise';

import { dummy_data } from '../../dummy';
import { KEY } from '../../key';

import { RowSpanParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GridOptions } from 'ag-grid-community';

LicenseManager.setLicenseKey(KEY);

const columnDefs = [
  
  /**
   * 유효성 검사 
   * 
   * 예제) '주문번호'란 '1' 입력
   */

  { headerName: '원주문번호', field: 'ORG_ORD_ID', width: 250, headerCheckboxSelection: true, checkboxSelection: true, rowSpan: rowSpan },
  { headerName: '주문번호',field: 'ORD_ID' , width:120,  editable: true, cellClassRules: { 'invalid-value': (params: any) => params.value === '1'}},
  { headerName: 'SEQ', field: 'ORD_SEQ'  , width:80  },
  { headerName: '차수', field: 'ORD_DEGREE'  , width:80, },
  { headerName: '상품명', field: 'RITEM_NM'  , width:200   },
  { headerName: '수량', field: 'OUT_ORD_QTY'  , width:80   },
  { headerName: '출고예정일', field: 'OUT_REQ_DT'  , width:130   },
  { headerName: '수화인', field: 'P_SALES_CUST_NM'  , width:100   },
  { headerName: '번호', field: 'PHONE_1'  , width:150   },
  { headerName: '주소', field: 'ADDR'  , width:300   },
  { headerName: '판매처', field: 'DATA_SENDER_NM', width:100}

];

const rowData = dummy_data;

function rowSpan(params: RowSpanParams) {
/** 인접 행과 비교해야 되는 지? */
  if (params.node?.rowIndex === 0) {
    return 4;
  }

  return 1;
}

const gridOptions: GridOptions = {
  animateRows: true,
  rowSelection: 'multiple'
};

</script>

<style>
.ag-theme-alpine {
  --ag-selected-row-background-color: lightblue;
}
.ag-row-hover {
  background-color: yellow;
}

.ag-row-focus {
  background-color: antiquewhite;
}

.invalid-value {
  background-color: red;
  color: white;
}
</style>
