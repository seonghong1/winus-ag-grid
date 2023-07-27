<template>
  <div style="height: 100%">
    <input type="checkbox" :checked="checked" @click="allCheckHandler" />
    <AgGridVue
      style="width: 90%; height: 600px"
      class="ag-theme-alpine"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
      @row-selected="onRowSelected"
    />
  </div>

  <textarea name="" id="" cols="30" rows="10">{{
    store.checkedArr.value
  }}</textarea>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import { IRowNode, ColDef, LicenseManager } from 'ag-grid-enterprise';

import { dummy_data } from '../../dummy';
import { KEY } from '../../key';

import { GridOptions, CellClassParams, RowSpanParams, RowSelectedEvent } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CheckboxRenderer from '../renderer/CheckboxRenderer.vue';
import CheckboxRendererSecond from '../renderer/CheckboxRendererSecond.vue';
import { countSpanRow } from '../utils/spanRow';
import { useCheckStore } from '../store/check';
import { computed } from 'vue';
import { RowI } from '../types/row.type';

LicenseManager.setLicenseKey(KEY);

const store = useCheckStore();

const countByDate = countSpanRow('ORG_ORD_ID') as typeof dummy_data;

const checked = computed(
  () => store.checkedArr.value.length === dummy_data.length
);

const uniqueKeyData = dummy_data.filter(
  (row: RowI, i: number, _allData: RowI[]) =>
    row.ORG_ORD_ID !== _allData[i + 1]?.ORG_ORD_ID
);

const allCheckHandler = () => {
  store.allCheckHandler(dummy_data, dummy_data.length, uniqueKeyData);
};

const columnDefs: ColDef[] = [
  {
    headerName: '',
    field: '',
    cellRenderer: CheckboxRenderer,
    rowSpan: rowSpan,
    cellClassRules: {
      'cell-span': cellSpanRule,
    },
    // headerCheckboxSelection: true,
    width: 50,
  },
  {
    headerName: '',
    field: '',
    cellRenderer: CheckboxRendererSecond,
    width: 50,
    // cellRendererSelector: CellRendererSelector
  },
  {
    headerName: '주문정보',
    cellClass: 'grid-cell-centered',
    // @ts-ignore
    children: [
      {
        field: 'ORG_ORD_ID',
        headerName: '원주문번호',
        width: 250,
        cellClass: 'grid-cell-centered',
        rowSpan: rowSpan,
        cellClassRules: {
          'cell-span': cellSpanRule,
        },
      },
      {
        field: 'ORD_ID',
        headerName: '주문번호',
        width: 150,
        checkboxSelection: true
      },
      {
        field: 'ORD_SEQ',
        headerName: 'SEQ',
        width: 80,
      },
      {
        field: 'ORD_DEGREE',
        headerName: '차수',
        width: 80,
      },
      {
        field: 'OUT_REQ_DT',
        headerName: '출고예정일',
        width: 130,
      },
    ],
  },
  {
    headerName: '상품정보',
    // @ts-ignore
    children: [
      {
        field: 'RITEM_NM',
        headerName: '상품명',
        width: 200,
      },
      {
        field: 'OUT_ORD_QTY',
        headerName: '수량',
        width: 80,
      },
    ],
  },
  {
    headerName: '고객정보',
    // @ts-ignore
    children: [
      {
        field: 'P_SALES_CUST_NM',
        headerName: '수화인',
        width: 100,
      },
      {
        field: 'PHONE_1',
        headerName: '번호',
        width: 150,
      },
      {
        field: 'ADDR',
        headerName: '주소',
        width: 300,
      },
    ],
  },
  {
    field: 'DATA_SENDER_NM',
    headerName: '판매처',
    width: 100,
  },
];

const rowData = dummy_data;

const defaultColDef = {
  sortable: false,
  resizable: false,
};

const gridOptions: GridOptions = {
  columnDefs,
  rowData,
  suppressRowTransform: true, // 병합 전제조건
  rowBuffer: 100,
};

function rowSpan(params: RowSpanParams) {
  const data = params.data.ORG_ORD_ID;

  if (
    data === countByDate[data].data &&
    params.node?.rowIndex === countByDate[data].startIndex
  ) {
    return countByDate[data].count;
  }

  return 1;
}

function cellSpanRule(params: CellClassParams) {
  const data = params.data.ORG_ORD_ID;

  return (
    data === countByDate[data].data &&
    params.node?.rowIndex === countByDate[data].startIndex &&
    countByDate[data].count !== 1
  );
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

input {
  position: absolute;
  top: 80px;
  left: 25px;
  z-index: 10;
}
</style>
