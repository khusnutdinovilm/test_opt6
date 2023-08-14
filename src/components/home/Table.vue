<template>
  <div class="table-wrapper">
    <filter-columns
      v-if="$store.getters.isDesktop"
      :columns="columns"
      @filter-columns="filter"
    />
    <table class="table" v-col-resize>
      <table-head :columns="filteredColumns" />
      <table-body
        :rows="filteredRows"
        :columns="filteredColumns"
        :key="updatedTable"
      />
    </table>
  </div>
</template>

<script setup>
import FilterColumns from "./FilterColumns.vue";
import TableHead from "./TableHead.vue";
import TableBody from "./TableBody.vue";
import TableReciept from "@/components/home/TableReciept.vue";

import { ref, provide } from "vue";

const props = defineProps({
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
});

const filteredColumns = ref(props.columns);
const filteredRows = ref(props.rows);

const updatedTable = ref(0);

const updateRows = (rows) => {
  if (!rows) return;
  filteredRows.value = rows;
  updatedTable.value++;
};
provide("updateRows", updateRows);

const updateColumns = (columns) => {
  filteredColumns.value = columns;
  updatedTable.value++;
};
provide("updateColumn", updateColumns);

const filter = (columns) => (filteredColumns.value = columns);
</script>

<style lang="sass">
.table
  width: 100%
  table-layout: fixed
  border-collapse: collapse
  position: relative

  td, th
    overflow: hidden
    white-space: nowrap
    text-overflow: clip

  &__table-head-cell
    cursor: grab
    text-align: left
    min-width: 15px
    padding:  14px 8px
    border: 1px solid #eeeff1
    user-select: none

  &__table-row
    display: flex
    flex-direction: column
    margin-bottom: 15px
    padding: 14px 4px 10px
    border-radius: 10px
    background-color: #fff
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07)
    border: 1px solid #eeeff1
    &_move
      height: 45px
      cursor: gap
      border-radius: 5px !important
      border: dashed 2px #a6b7d4 !important
      background-color: #fbfcfd
      td
        display: none
    @media screen and (min-width: 800px)
      display: table-row
      border: none
      border-radius: 0
      box-shadow: none

  &__table-row-cell
    vertical-align: center
    padding: 5px 10px
    min-width: 15px
    position: relative
    overflow: visible !important

  &__drag-button
    margin-bottom: 5px !important

  &__pop-up-button
    margin-bottom: 5px !important

  &__pop-up-menu
    position: absolute
    bottom: -48px
    left: 13px
    z-index: 100

.col-resize
  position: absolute
  width: 3px
  z-index: 5

  &__grip
    position: absolute
    top: 0
    z-index: 5
    width: 1px
    margin: 0 1px
    height: 100%
  &__resizer
    position: absolute
    top: 0
    width: 10px
    height: 100%

.col-resize_moved
  .col-resize__grip
    background-color: black

.columns-resize-bar
  width: 1px

  &:hover
    background-color: #000
</style>
