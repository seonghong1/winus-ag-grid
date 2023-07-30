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
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { IRowNode, ColDef, LicenseManager, GridApi } from "ag-grid-enterprise";

import { dummy_data } from "../../dummy";
import { KEY } from "../../key";

import {
  GridOptions,
  CellClassParams,
  RowSpanParams,
  RowSelectedEvent,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CheckboxRenderer from "../renderer/CheckboxRenderer.vue";

import { countSpanRow } from "../utils/spanRow";
import { useCheckStore } from "../store/check";
import { computed, watch } from "vue";
import { RowI } from "../types/row.type";

LicenseManager.setLicenseKey(KEY);

const store = useCheckStore();

const countByDate = countSpanRow("ORG_ORD_ID") as typeof dummy_data;

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
    headerName: "",
    field: "",
    cellRenderer: CheckboxRenderer,
    rowSpan: rowSpan,
    cellClassRules: {
      "cell-span": cellSpanRule,
    },
    width: 50,
  },
  {
    headerName: "",
    field: "",
    width: 50,
  },
  {
    headerName: "주문정보",
    cellClass: "grid-cell-centered",
    // @ts-ignore
    children: [
      {
        field: "ORG_ORD_ID",
        headerName: "원주문번호",
        width: 250,
        cellClass: "grid-cell-centered",
        rowSpan: rowSpan,
        cellClassRules: {
          "cell-span": cellSpanRule,
        },
      },
      {
        field: "ORD_ID",
        headerName: "주문번호",
        width: 150,
        checkboxSelection: true,
      },
      {
        field: "ORD_SEQ",
        headerName: "SEQ",
        width: 80,
      },
      {
        field: "ORD_DEGREE",
        headerName: "차수",
        width: 80,
      },
      {
        field: "OUT_REQ_DT",
        headerName: "출고예정일",
        width: 130,
      },
    ],
  },
  {
    headerName: "상품정보",
    // @ts-ignore
    children: [
      {
        field: "RITEM_NM",
        headerName: "상품명",
        width: 200,
      },
      {
        field: "OUT_ORD_QTY",
        headerName: "수량",
        width: 80,
      },
    ],
  },
  {
    headerName: "고객정보",
    // @ts-ignore
    children: [
      {
        field: "P_SALES_CUST_NM",
        headerName: "수화인",
        width: 100,
      },
      {
        field: "PHONE_1",
        headerName: "번호",
        width: 150,
      },
      {
        field: "ADDR",
        headerName: "주소",
        width: 300,
      },
    ],
  },
  {
    field: "DATA_SENDER_NM",
    headerName: "판매처",
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
  // row클릭시 체크박스 체크방지
  suppressRowClickSelection: true,
  onGridReady: onGridReady,
  // onCellClicked: onCellClicked,
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

  store.addCheckedArr(rowNode.data, rowNode.isSelected() as boolean);
}

watch(
  store.checkedSpanRow,
  () => {
    console.log("checkedSpanRow : ", store.checkedSpanRow.value);
    for (let i = 0; rowData.length > i; i++) {
      const index = store.checkedSpanRow.value.findIndex((spanRowItem) => {
        return spanRowItem.ORG_ORD_ID === rowData[i].ORG_ORD_ID;
      });
      if (index !== -1) {
        gridApi?.getRowNode(String(i))?.setSelected(true);
      } else {
        gridApi?.getRowNode(String(i))?.setSelected(false);
      }
    }
  },
  { deep: true }
);

/*
  1. 셀 체크박스 클릭시 checkedArr에는 push가 되지만 checkedSpanRow 배열에는 추가되지 않음()

  2. 셀 체크박슥는 checkedSpanRow를 watch하고 있어서 rowspan영역의 체크박스를 모두 클릭하고, 다른 rowspan 체크박스랜더러를 클릭하면,
     셀 체크박스를 직접 체크한 아이템들이 해제됨

  3. 그럼 여기서 셀 체크박스가 checkedSpanRow배열에 push한다 ? -> 그러면 셀 체크박스는 checkedSpanRow배열을 바라보고있어 무한 루프가 발생됨

  4. 셀 체크박스의 클릭 api는 존재하지 않음, 대신 onRowSelected이벤트가 있음. 이 이벤트는 타의적으로 해당 셀 체크박스의 상태가 변하거나 직접 클릭해서 상태를 변화시킬때 호출된다.

  5. watch(store.checkedSpanRow , () => { 이 부분에서는 셀 체크박스의 상태를 타의적으로 바꾸는 로직이 있어 바꾸게 되면 onRowSelected 이게 다시 호출되어서 
    무한루프가 발생됨.
*/
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
