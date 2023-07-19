<template>
  <div style="height: 100%">
    <AgGridVue
      style="width: 90%; height: 600px"
      class="ag-theme-alpine"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
      @row-selected="onRowSelected"
    />
  </div>
</template>

<script setup lang="ts">

import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import { IRowNode, LicenseManager } from 'ag-grid-enterprise';

import { dummy_data } from '../../dummy';
import { KEY } from '../../key';

import { GridOptions, CellClassParams, RowSpanParams, RowSelectedEvent } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

LicenseManager.setLicenseKey(KEY);

const rowData = dummy_data;

/** Column Info */
const columnDefs = [
  {
    headerName: 'Row ID', 
    valueGetter: 'node.id',
    width: 100,
  },
  {
    headerName: '주문정보',
    cellClass: "grid-cell-centered",
    children: [
      { 
        field: 'ORG_ORD_ID', 
        headerName: '원주문번호', 
        width: 250,
        headerCheckboxSelection: true, 
        checkboxSelection: true,
        cellClass: "grid-cell-centered",
        cellRendererSelector: CellRendererSelector,
        rowSpan: rowSpan,
        cellClassRules: {
          'cell-span': cellSpanRule
        },
      },
      { 
        field: 'ORD_ID' ,
        headerName: '주문번호',
        width:150,
        headerCheckboxSelection: true,
        checkboxSelection: true  
      },
      { 
        field: 'ORD_SEQ',
        headerName: 'SEQ',
        width:80,
        // headerCheckboxSelection: true,
        // checkboxSelection: true  
      },
      { 
        field: 'ORD_DEGREE',
        headerName: '차수',
        width:80 
      },
      { 
        field: 'OUT_REQ_DT',
        headerName: '출고예정일',
        width:130
      }
    ]
  },
  {
    headerName: '상품정보',
    children: [
      {
        field: 'RITEM_NM',
        headerName: '상품명',
        width: 200
      },
      {
        field: 'OUT_ORD_QTY',
        headerName: '수량',
        width: 80
      },
    ]
  },
  {
    headerName: '고객정보',
    children: [
      {
        field: 'P_SALES_CUST_NM',
        headerName: '수화인',
        width: 100
      },
      {
        field: 'PHONE_1',
        headerName: '번호',
        width: 150
      },
      {
        field: 'ADDR',
        headerName: '주소',
        width: 300
      }
    ]
  },
  {
    field: 'DATA_SENDER_NM',
    headerName: '판매처',
    width: 100
  }
];

const defaultColDef = {
  sortable: true,
  resizable: true,
};

const gridOptions: GridOptions = {
  columnDefs,
  rowData,
  suppressRowTransform: true,       // 병합 전제조건
};


let rowSpanInfo = new Map();  // 행 병합 정보 관리

function rowSpan(params: RowSpanParams) {

  const currentIdx = params.node?.rowIndex ?? 0;
  const currGroupValue = params.node?.data['ORG_ORD_ID'];

  const totalRows = params.api.getDisplayedRowCount();
  let spanCount:number = 1;
  let isSpan:boolean = false;


  // 병합 제외 대상
  if(rowSpanInfo.has(currGroupValue) && rowSpanInfo.get(currGroupValue) != params.node){
    return 1;
  }

  // 병합 행 개수 산정
  for(let i=currentIdx; i < totalRows; i++ ){
      const nextNode = params.api.getRowNode(String(i+1));
      const nextGroupValue = nextNode?.data['ORG_ORD_ID'];

      if(currGroupValue != nextGroupValue){
        break;
      }
      
      isSpan = true;
      spanCount++;
  }

  // 병합 대상 노드 적재
  if(isSpan){
    rowSpanInfo.set(currGroupValue, params.node);
  }
  
  return spanCount;
}

function cellSpanRule(params: CellClassParams){
  return rowSpanInfo.has(params.node?.data['ORG_ORD_ID']);
}


function CellRendererSelector(params:any){

  debugger;

}


function onRowSelected(event:RowSelectedEvent) {

  const rowNode:IRowNode = event.node;

  if(rowNode.isSelected()){
    window.alert(`[선택 값]\n원주문번호: ${event.node.data.ORG_ORD_ID}\n주문번호: ${event.node.data.ORD_ID}\n주문SEQ: ${event.node.data.ORD_SEQ}`);
  }
}

</script>

<style scoped>

.grid-cell-centered {
  text-align: center;
}

</style>
