<template>
  <div>
    <input @click="check" type="checkbox" name="" id="" :checked="isChecked" />
    <span>{{ props.params.rowIndex }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAllCheckStore } from "../store/allCheck";

const AllCheckStore = useAllCheckStore();

const isChecked = computed(() => {
  return AllCheckStore.checkedArr.value.length !== 0;
});

const props: any = defineProps({});
function check(e: Event) {
  e.preventDefault();
}
</script>

<style scoped>
div {
  display: flex !important;
}
</style>
