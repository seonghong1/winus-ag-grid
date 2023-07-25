import { defineStore } from "pinia";
import { reactive } from "vue";
import type { RowI } from "../types/row.type";

export const useAllCheckStore = defineStore("check", () => {
  const checkedArr = reactive({ value: [] as RowI[] });

  const checkedAllRow = (data: RowI[]) => {
    checkedArr.value = data;
    console.log(checkedArr.value);
  };

  return { checkedArr, checkedAllRow };
});
