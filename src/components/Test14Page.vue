<template>
  <div style="height: 100%">
    <input type="checkbox" :checked="checked" @click="allCheckHandler" />
    <AgGridVue
      style="width: 90%; height: 600px"
      class="ag-theme-alpine"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
      @row-selected="onRowSelected"
      rowSelection="multiple"
    />
  </div>

  <textarea name="" id="" cols="30" rows="10">{{
    store.checkedArr.value
  }}</textarea>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import { IRowNode, ColDef, LicenseManager, GridApi } from 'ag-grid-enterprise';

import { dummy_data } from '../../dummy';
import { KEY } from '../../key';

import {
  GridOptions,
  CellClassParams,
  RowSpanParams,
  RowSelectedEvent,
} from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CheckboxRenderer from '../renderer/CheckboxRenderer.vue';

import { countSpanRow } from '../utils/spanRow';
import { useCheckStore } from '../store/check';
import { computed, watch } from 'vue';
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
    width: 50,
  },
  {
    headerName: '',
    field: '',
    width: 50,
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
        checkboxSelection: true,
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
let gridApi: GridApi | null = null;
const gridOptions: GridOptions = {
  columnDefs,
  rowData,
  suppressRowTransform: true, // 병합 전제조건
  rowBuffer: 100,
  suppressRowClickSelection: true,
  onGridReady: onGridReady,
};
function rowSpan(params: RowSpanParams) {
  const data = params.data.ORG_ORD_ID;
  // console.log(params.data);
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
function onGridReady(params: any) {
  gridApi = params.api;
}
function onRowSelected(event: RowSelectedEvent) {
  const rowNode: IRowNode = event.node;
  if (rowNode.isSelected()) {
    store.addCheckedArr(rowNode.data);
  } else {
    store.removeCheckedArr(rowNode.data);
  }
}
watch(store.checkedArr, () => {
  rowData.forEach((checkedItem: RowI, i) => {
    console.log(i);
    const index = store.checkedArr.value.findIndex(
      (rowDataItem: RowI) => rowDataItem.ORD_ID === checkedItem.ORD_ID
    );
    if (index !== -1) {
      return gridApi?.getRowNode(index)?.setSelected(true);
    } else {
      return gridApi?.getRowNode(i)?.setSelected(false);
    }
  });
});

/*
  컬럼의 체크박스는 특정 컬럼 클릭시로 변경
  그러면 값이 change되거나 행을 클릭했을때 호출되지 않고 특정 컬럼을 클릭해야만 호출됨

  // onCellClicked 이벤트 핸들러
function onCellClicked(params) {
  // params.colDef 는 클릭된 셀의 컬럼 정의를 나타냅니다.
  // params.data 는 클릭된 셀의 행 데이터를 나타냅니다.
  // params.value 는 클릭된 셀의 값입니다.
  // params.event 는 클릭 이벤트 자체를 나타냅니다.
  
  // 특정 컬럼만 처리하도록 필터링
  const targetColumns = ['columnName1', 'columnName2',];
  if (targetColumns.includes(params.colDef.field)) {
    console.log('특정 컬럼의 셀이 클릭되었습니다.');
    console.log('클릭된 컬럼의 이름:', params.colDef.headerName);
    console.log('클릭된 셀의 행 데이터:', params.data);
    console.log('클릭된 셀의 값:', params.value);
  }
}

// 그리드 초기화
const gridOptions = {
  // ... 다른 옵션들 ...
  onCellClicked: onCellClicked, // 이벤트 핸들러 연결
};

// ag-Grid 그리드 생성
new agGrid.Grid(gridDiv, gridOptions);



*/
// console.log();

// 랜더러 체크박스 클릭시 실제 해당되는 row의 체크박스 상태글 selected로 해줌.
// 실제 node select하고 어떤 용도로 사용? (좌측 체크박스 랜더러도 result에 체크된 애들의 rowdata를 저장해서 checked된 애들의 데이터를 export가능)
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
