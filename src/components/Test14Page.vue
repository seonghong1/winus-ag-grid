<template>
  <div style="height: 100%">
    <AgGridVue
      style="width: 90%; height: 600px"
      class="ag-theme-alpine"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
    />
  </div>

  <textarea name="" id="" cols="30" rows="10">{{
    store.checkedArr.value
  }}</textarea>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { ColDef, LicenseManager } from "ag-grid-enterprise";

import { dummy_data } from "../../dummy";
import { KEY } from "../../key";

import { GridOptions, CellClassParams, RowSpanParams } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CheckboxRenderer from "../renderer/CheckboxRenderer.vue";
import CheckboxRendererSecond from "../renderer/CheckboxRendererSecond.vue";
import { countSpanRow } from "../utils/spanRow";
import { useCheckStore } from "../store/check";

LicenseManager.setLicenseKey(KEY);

const store = useCheckStore();

const countByDate = countSpanRow("ORG_ORD_ID") as typeof dummy_data;

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
    cellRenderer: CheckboxRendererSecond,
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
  sortable: true,
  resizable: true,
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
</script>

<style scoped>
.grid-cell-centered {
  text-align: center;
}
</style>
