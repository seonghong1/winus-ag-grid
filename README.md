### 메모

## 2. 페이징 — done

- grid에서 제공해주는 api를 사용하기 위해서 gridOption에 onGridReady를 추가해주어 params.api를 변수에 할당해준다
- 그 외 타입으로는 GridOptions(그리드 옵션 객체타입), GridApi(그리드 api변수 타입)

## 3. 행병합 - done

행 병합시 필요한 값

- 병합할 컬럼의 startindex, key, count 정보 만들기(더미데이터기반으로)
- 병합할 컬럼의 시작값 지정해주기 (cellSpanRule)
- 병합할 row개수 구하기 (rowSpan)

## 4. 정렬

- columnDefs 에 컬럼별 옵션으로 sortable
- Pagination 사용시 sort후 페이지 이동해도 정렬 유지됨

## 5. 필터

- columnDefs에서 각 컬럼정의시 filter옵션을 통해 구현 가능
- agTextColumnFilter(텍스트 필터), agNumberColumnFilter(숫자 필터), agSetColumnFilter(해당 컬럼에 있는 값), agDateColumnFilter(날짜 필터)

## 6. 통계

- AgGridVue 컴포넌트에 pinnedBottomRowData 옵션 추가
- pinnedBottomRowData옵션은 배열 형태임
- {} 배열 내부 객체 하나당 한줄의 영역을 차지
- { “위치할 컬럼 하단”:”들어갈 값” }, { “위치할 컬럼 하단”:”들어갈 값” }, { “위치할 컬럼 하단”:”들어갈 값” } 형태로 구성
- 페이지네이션해도 잘 적용됨

## 7. Context menu(우클릭시 나오는 메뉴)

AgGridVue 컴포넌트에서 2가지 옵션으로 구현

- :allowContextMenuWithControlKey="true" (기존 우클릭시 나오는 메뉴를 대신해서, 커스텀한 메뉴들을 노출시키기)
- :getContextMenuItems="getContextMenuItems" (컨텍스트 메뉴 구성 배열형태임) #### getContextMenuItems 옵션들 {  name: “메뉴의 이름”,  action: ()=> “클릭시 실행되는 로직”,  cssClasses: [“해당 컨텍스트 메누의 class”, “해당 컨텍스트 메누의 class”],  // 클릭시 나오는 서브메뉴들  subMenu:[   {  name…  action….  }  ] }

## 8. 틀고정

- columnDefs 에서 컬럼별로 틀고정 정의
- pinned옵션의 활용해 구현 ( pinned:”left” or pinned:”right” , 좌우로만 가능)

## 9. 그룹헤더

- columnDefs 내부 컬럼에서 children옵션을 활용해 구현
- {headerName:”이름”, children:[{headerName…}, {headerName:,,,}]}

## 10. 편집(셀 개별 드레그, 복사)

    #### AggridVue컴포넌트
    	// 테이블 내에 드래그를 활용해 셀 선택 가능

- enableRangeSelection= true
  // 드레그로 지정한 셀 범위만 복사됨
- copyHeadersToClipboard=false
- editable 셀 더블클릭시 편집가능
- cellEditorPopup, cellEditorParams 더블클릭시 context메뉴를 커스텀하며 노출시킬 수 있음

## 11. 행스타일 (hover, focus, selection)

- 그리드 컴포넌트 옵션 suppressRowClickSelection=“true” (해당 열 아무곳이나 클릭해도 체크박스가 있어도 해당열만 활성화되고 체크박스에 관여하지 않음)
- css영역에 class로 행스타일 옵션을 커스텀할 수 있음
- 행에 hover시
  - .ag-row-hover { background-color: yellow;}
- 행에 focus시
  - .ag-row-focus {background-color: rgb(8, 251, 0);}
- 행의 체크박스 checked시
- .ag-theme-alpine {--ag-selected-row-background-color: rgb(64, 0, 255)}
