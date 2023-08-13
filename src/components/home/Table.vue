<template>
  <div class="table-wrapper">
    <filter-columns
      v-if="$store.getters.isDesktop"
      :columns="columns"
      @updated="filterColumns"
    />
    <table class="table" v-col-resize>
      <table-head :columns="filteredColumns" />
      <table-body
        :rows="filteredRows"
        :columns="filteredColumns"
        :key="updated"
      />
    </table>
  </div>
</template>

<script>
import { ref, provide } from "vue";
import FilterColumns from "./FilterColumns.vue";
import TableHead from "./TableHead.vue";
import TableBody from "./TableBody.vue";

export default {
  props: {
    rows: { type: Object, default: () => {} },
    columns: { type: Array, default: () => [] },
  },
  setup(props) {
    const filteredColumns = ref(props.columns);
    const filteredRows = ref(props.rows);
    const updated = ref(0);

    const updateRows = (rows) => {
      filteredRows.value = rows;
      updated.value++;
    };
    provide("updateRows", updateRows);

    const updateColumns = (columns) => {
      filteredColumns.value = columns;
      updated.value++;
    };
    provide("updateColumn", updateColumns);

    const filterColumns = (columns) => {
      filteredColumns.value = columns;
    };

    return {
      updated,
      filteredColumns,
      filteredRows,
      filterColumns,
    };
  },
  components: {
    FilterColumns,
    TableHead,
    TableBody,
  },
};
</script>

<style lang="sass">
.flip-list-move
  transition: transform .3s

.table-wrapper
  // position: relative
  margin: 0 //10px

.filter-columns
  margin: 7px 14px 0 auto
  text-align: right
  position: relative
  &__btn
    border: none
    background-color: #00000000
    cursor: pointer
    // &:hover
    //   opacity: 0.8

  &__menu
    position: absolute
    top: 22px
    right: 5px
    z-index: 6
  &__list
    list-style: none

////
.table
  width: 100%
  table-layout: fixed
  border-collapse: collapse
  position: relative

  td, th
    overflow: hidden
    white-space: nowrap
    text-overflow: clip

  &__table-head
    // display: none

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
    // &-actions
    position: relative
    overflow: visible !important
    // &-select-in-edit
    //   position: relative
    //   overflow: visible !important

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
  // margin-left: -1px
  width: 3px
  // background-color: black
  z-index: 5
  &__grip
    position: absolute
    top: 0
    z-index: 5
    width: 1px
    margin: 0 1px
    height: 100%
    // background-color: black
  &__resizer
    position: absolute
    top: 0
    width: 10px
    height: 100%
    // cursor: e-resizer

.col-resize_moved
  .col-resize__grip
    background-color: black

.columns-resize-bar
  width: 1px
  // background-color: #000
  // margin-left: -5px

  // height: 100%
  // margin: 0 1px
  &:hover
    background-color: #000
</style>
