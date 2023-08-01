import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { RowI } from '../types/row.type';
import { countSpanRow } from '../utils/spanRow';

export const useCheckStore = defineStore('check', () => {
  // 왼쪽 체크박스 체크된 리스트
  const checkedSpanRow = reactive({ value: [] as RowI[] });
  // 오른쪽 체크박스 체크된 리스트
  const checkedArr = reactive({ value: [] as RowI[] });
  // rowspan 만들때 사용한 객체
  const countByDate = countSpanRow('ORG_ORD_ID');

  const allCheckHandler = (
    allData: RowI[],
    allDataLength: number,
    uniqueKeyData: RowI[]
  ) => {
    if (checkedArr.value.length === allDataLength) {
      checkedSpanRow.value = [];
      checkedArr.value = [];
    } else {
      checkedArr.value = [...allData];
      checkedSpanRow.value = uniqueKeyData;
    }
  };

  // 왼쪽 체크박스 클릭시 호출
  const selectRowSpanData = (selectData: RowI, rowData: RowI[]) => {
    // 내가 클릭릭한 rowdata의 id의 count
    const _countByDate = countByDate[selectData.ORG_ORD_ID];
    // 내가 클릭한 spanrow영역의 데이터
    const filteredData = [];
    // 내가 클릭한 spanrow의 시작 index부터 클릭한sapn rowdata 의 count만큼 순회
    for (
      let i = _countByDate.startIndex;
      i < _countByDate.startIndex + _countByDate.count;
      i++
    ) {
      // rowData : 모든 rowdata
      // 내가 클릭한 spanrow영역의 모든 데이터를 filteredData에 push
      filteredData.push(rowData[i]);
    }

    // 왼쪽 체크박스 체크된 리스트에 포함 유무 확인
    const existingRowSpanIndex = checkedSpanRow.value.findIndex(
      (row) => row.ORG_ORD_ID === selectData.ORG_ORD_ID
    );
    // 미포함
    if (existingRowSpanIndex === -1) {
      // 왼쪽 체크박스 체크리스트에 해당 row의 data를 push
      checkedSpanRow.value.push(selectData);
      // 오른쪽 체크박스에 같은 id값을 가진 데이터를 다 지우고ㅓ
      checkedArr.value = checkedArr.value.filter(
        (row) => row.ORG_ORD_ID !== selectData.ORG_ORD_ID
      );
      // 다시 push
      checkedArr.value.push(...filteredData);
      // 포함
    } else {
      // 왼쪽 체크박스 리스트에서 제거
      checkedSpanRow.value = checkedSpanRow.value.filter(
        (row) => row.ORG_ORD_ID !== selectData.ORG_ORD_ID
      );
      // 오른쪽 체크박스 리스트에서 제거
      checkedArr.value = checkedArr.value.filter(
        (row) => row.ORG_ORD_ID !== selectData.ORG_ORD_ID
      );
    }
  };
  // 오른쪽 체크박스 클릭시 호출 , rowdata가 전달됨ㄹ
  const selectRowData = (selectData: RowI) => {
    // checkedArr에 이미 값이 존재(체크됨)하는지 체크 / -1(없음), 그외 있음
    const existingCheckedIndex = checkedArr.value.findIndex(
      (row) => row.ORD_ID === selectData.ORD_ID
    );
    // checkedArr 배열에 값이 없을때(체크안되어있을때)
    if (existingCheckedIndex === -1) {
      checkedArr.value.push(selectData);

      //checkedArr에서 내가 누른 rowdata.id와 같은 값들로 새 배열생성
      const filteredCheckedArr = checkedArr.value.filter(
        (row) => row.ORG_ORD_ID === selectData.ORG_ORD_ID
      );
      // 내가 누른 rowdata의 개수와, 내가 누른 rowdata의 총 range가 같을때
      if (
        filteredCheckedArr.length === countByDate[selectData.ORG_ORD_ID].count
      )
        checkedSpanRow.value.push(selectData);
      else {
        checkedSpanRow.value = checkedSpanRow.value.filter(
          (row) => row.ORG_ORD_ID !== selectData.ORG_ORD_ID
        );
      }
      // checkedArr 배열에 값이 있을때
    } else {
      // 내가 누른 체크박스를 제외한 나머지 (해제)
      checkedArr.value = checkedArr.value.filter(
        (row) => row.ORD_ID !== selectData.ORD_ID
      );

      const filteredCheckedArr = checkedArr.value.filter(
        (row) => row.ORG_ORD_ID === selectData.ORG_ORD_ID
      );
      // 필터링한 이후 range와 count가 다르면
      if (
        filteredCheckedArr.length !== countByDate[selectData.ORG_ORD_ID].count
      ) {
        // 오른쪽 체크박스에서 내가 클릭한 체크박스와 같은 id를 가진 값을 제거
        checkedSpanRow.value = checkedSpanRow.value.filter(
          (row) => row.ORG_ORD_ID !== selectData.ORG_ORD_ID
        );
      }
    }
  };

  // 체크박스 (렌더러 x)
  const addCheckedArr = (selectData: RowI, isSelected: boolean) => {
    // 클릭시 checkedarr에 넣기
    console.log(isSelected);
    if (isSelected) {
      if (
        checkedArr.value.findIndex(
          (checkedItem) => checkedItem.ORD_ID === selectData.ORD_ID
        ) === -1
      ) {
        checkedArr.value.push(selectData);

        //checkedArr에서 내가 누른 rowdata.id와 같은 값들로 새 배열생성
        const filteredCheckedArr = checkedArr.value.filter(
          (row) => row.ORG_ORD_ID === selectData.ORG_ORD_ID
        );
        // 내가 누른 rowdata의 개수와, 내가 누른 rowdata의 총 range가 같을때
        if (
          filteredCheckedArr.length === countByDate[selectData.ORG_ORD_ID].count
        )
          checkedSpanRow.value.push(selectData);
        else {
          checkedSpanRow.value = checkedSpanRow.value.filter(
            (row) => row.ORG_ORD_ID !== selectData.ORG_ORD_ID
          );
        }
      }
    } else {
      checkedArr.value = checkedArr.value.filter((ckeckedItem) => {
        return ckeckedItem.ORD_ID !== selectData.ORD_ID;
      });

      const filteredCheckedArr = checkedArr.value.filter(
        (row) => row.ORG_ORD_ID === selectData.ORG_ORD_ID
      );
      // 필터링한 이후 range와 count가 다르면
      if (
        filteredCheckedArr.length !== countByDate[selectData.ORG_ORD_ID].count
      ) {
        // 오른쪽 체크박스에서 내가 클릭한 체크박스와 같은 id를 가진 값을 제거
        checkedSpanRow.value = checkedSpanRow.value.filter(
          (row) => row.ORG_ORD_ID !== selectData.ORG_ORD_ID
        );
      }
    }
  };

  return {
    checkedSpanRow,
    checkedArr,
    allCheckHandler,
    selectRowSpanData,
    selectRowData,
    addCheckedArr,
  };
});
