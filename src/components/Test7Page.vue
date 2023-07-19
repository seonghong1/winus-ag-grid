<template>
  <div style="height: 100%">
    <AgGridVue
      style="width: 90%; height: 600px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :getContextMenuItems="getContextMenuItems"
      :allowContextMenuWithControlKey="true"
    />
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise';

import { dummy_data } from '../../dummy';
import { KEY } from '../../key';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

LicenseManager.setLicenseKey(KEY);

const columnDefs = [
  { headerName: '원주문번호', field: 'ORG_ORD_ID', width: 250, filter: 'agSetColumnFilter' },
  { headerName: '주문번호',field: 'ORD_ID' , width:120,  filter: 'agSetColumnFilter' },
  { headerName: 'SEQ', field: 'ORD_SEQ'  , width:80,   filter: 'agSetColumnFilter' },
  { headerName: '차수', field: 'ORD_DEGREE'  , width:80,   filter: 'agSetColumnFilter' },
  { headerName: '상품명', field: 'RITEM_NM'  , width:200,   filter: 'agSetColumnFilter' },
  { headerName: '수량', field: 'OUT_ORD_QTY'  , width:80,   filter: 'agSetColumnFilter'},
  { headerName: '출고예정일', field: 'OUT_REQ_DT'  , width:130,   filter: 'agSetColumnFilter' },
  { headerName: '수화인', field: 'P_SALES_CUST_NM'  , width:100,   filter: 'agSetColumnFilter' },
  { headerName: '번호', field: 'PHONE_1'  , width:150,   filter: 'agSetColumnFilter' },
  { headerName: '주소', field: 'ADDR'  , width:300,   filter: 'agSetColumnFilter' },
  { headerName: '판매처', field: 'DATA_SENDER_NM'  , width:100,   filter: 'agSetColumnFilter'}
];

const rowData = dummy_data;

const getContextMenuItems = (params: any) => {
  const result = [
    {
      // custom item
      name: 'Alert ' + params.value,
      action: () => {
        window.alert('Alerting about ' + params.value);
      },
      cssClasses: ['redFont', 'bold'],
    },
    {
      name: 'Country',
      subMenu: [
        {
          name: 'Ireland',
          action: () => {
            console.log('Ireland was pressed');
          },
        },
        {
          name: 'UK',
          action: () => {
            console.log('UK was pressed');
          },
        },
        {
          name: 'France',
          action: () => {
            console.log('France was pressed');
          },
        },
      ],
    },
    {
      name: 'Person',
      subMenu: [
        {
          name: 'Niall',
          action: () => {
            console.log('Niall was pressed');
          },
        },
        {
          name: 'Sean',
          action: () => {
            console.log('Sean was pressed');
          },
        },
        {
          name: 'John',
          action: () => {
            console.log('John was pressed');
          },
        },
        {
          name: 'Alberto',
          action: () => {
            console.log('Alberto was pressed');
          },
        },
        {
          name: 'Tony',
          action: () => {
            console.log('Tony was pressed');
          },
        },
        {
          name: 'Andrew',
          action: () => {
            console.log('Andrew was pressed');
          },
        },
        {
          name: 'Kev',
          action: () => {
            console.log('Kev was pressed');
          },
        },
        {
          name: 'Will',
          action: () => {
            console.log('Will was pressed');
          },
        },
        {
          name: 'Armaan',
          action: () => {
            console.log('Armaan was pressed');
          },
        },
      ],
    },
    'separator',
    {
      // custom item
      name: 'Windows',
      shortcut: 'Alt + W',
      action: () => {
        console.log('Windows Item Selected');
      },
      icon: '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
    },
    {
      // custom item
      name: 'Mac',
      shortcut: 'Alt + M',
      action: () => {
        console.log('Mac Item Selected');
      },
      icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
    },
    'separator',
    {
      // custom item
      name: 'Checked',
      checked: true,
      action: () => {
        console.log('Checked Selected');
      },
      icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
    },
    'copy',
    'separator',
    'chartRange',
  ];

  return result;
};
</script>

<style scoped></style>
