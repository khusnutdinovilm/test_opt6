<template>
  <div class="filter-columns">
    <button class="filter-columns__btn" @click.prevent="showMenu">
      <svg-setting :isClicked="settingBtnClick" />
    </button>

    <div class="filter-columns__menu-wrapper" v-if="settingBtnClick">
      <div
        class="filter-columns__show-menu-btn"
        @click="columnMenuOpen = !columnMenuOpen"
        :class="{ 'filter-columns__show-menu-btn_reverse': columnMenuOpen }"
      >
        Отображение столбцов
        <svg-breadcrumbs :isColumnMenuOpen="columnMenuOpen" />
      </div>
      <div class="filter-columns__menu" v-if="columnMenuOpen">
        <template v-for="column in columns" :key="column.id">
          <custom-checkbox :data="column" v-model="selectedColumns" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgSetting from "@/components/icons/SvgSetting.vue";
import SvgBreadcrumbs from "@/components/icons/SvgBreadcrumbs.vue";
import CustomCheckbox from "@/components/ui/CustomCheckbox.vue";

import { onMounted, ref, watch } from "vue";

const props = defineProps({
  columns: { type: Array },
});
const emit = defineEmits(["filter-columns"]);

const settingBtnClick = ref(false);
const columnMenuOpen = ref(false);

const selectedColumns = ref(props.columns);
watch(selectedColumns, (selectedColumns) =>
  emit("filter-columns", selectedColumns)
);

const showMenu = () => {
  settingBtnClick.value = !settingBtnClick.value;
  if (columnMenuOpen.value) columnMenuOpen.value = false;
};
</script>

<style lang="sass" scoped>
.filter-columns
  margin: 7px 14px 8px auto
  text-align: right
  position: relative
  z-index: 11
  font-size: 14px
  &__btn
    border: none
    background-color: #00000000
    cursor: pointer
    &:hover
      opacity: 0.8

  &__menu-wrapper
    position: absolute
    top: 22px
    right: 0
    background-color: #fff
    border-radius: 5px
    box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5)
    padding: 6px 8px 6px 11px
    text-align: left
    font-size: 14px !important

  &__show-menu-btn
    display: flex
    align-items: center
    cursor: pointer
    gap: 11px
    &_reverse
      flex-direction: row-reverse
      font-weight: 600
      padding-bottom: 11px

  &__menu
    display: flex
    flex-direction: column
    row-gap: 11px
    text-align: left

  &__list
    list-style: none
</style>
