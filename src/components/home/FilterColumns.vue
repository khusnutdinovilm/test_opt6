<template>
  <div class="filter-columns">
    <button class="filter-columns__btn" @click.prevent="f">
      <svg-setting :isClicked="settingBtnClick" />
    </button>

    <div class="filter-columns__menu" v-if="settingBtnClick">
      <div
        class="filter-columns__show-menu"
        @click="columnMenuOpen = !columnMenuOpen"
        :class="{ 'filter-columns__show-menu_reverse': columnMenuOpen }"
      >
        <span class="caption">Отображение столбцов</span>
        <svg-breadcrumbs :isColumnMenuOpen="columnMenuOpen" />
      </div>
      <div class="menu" v-if="columnMenuOpen">
        <div class="checkbox" v-for="column in columns" :key="column.id">
          <input
            type="checkbox"
            class="custom-checkbox"
            :id="column.id"
            :value="column"
            v-model="filterColumns"
          />
          <label :for="column.id">{{ column.title }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import SvgIcon from "../ui/SvgIcon.vue";
import SvgSetting from "@/components/icons/SvgSetting.vue";
import SvgBreadcrumbs from "@/components/icons/SvgBreadcrumbs.vue";

export default {
  props: {
    columns: {
      type: Array,
    },
  },
  emits: ["updated"],
  setup(props, { emit }) {
    const settingBtnClick = ref(false);
    const columnMenuOpen = ref(false);

    const filterColumns = ref(props.columns);

    watch(filterColumns, (filteredColumns) => {
      emit("updated", filteredColumns);
    });

    const f = () => {
      settingBtnClick.value = !settingBtnClick.value;
      if (columnMenuOpen.value) columnMenuOpen.value = false;
    };

    return {
      settingBtnClick,
      columnMenuOpen,
      filterColumns,
      f,
    };
  },
  components: {
    SvgIcon,
    SvgSetting,
    SvgBreadcrumbs,
  },
};
</script>

<style lang="sass" scoped>
.menu
  display: flex
  flex-direction: column
  row-gap: 11px
  text-align: left

.custom-checkbox
  position: absolute
  z-index: -1
  opacity: 0

.custom-checkbox+label
  display: inline-flex
  align-items: center
  user-select: none

.custom-checkbox+label::before
  content: ''
  display: inline-block
  width: 13px
  height: 13px
  flex-shrink: 0
  flex-grow: 0
  border: 1px solid #a6b7d4
  border-radius: 3px
  margin-right: 0.5em
  background-repeat: no-repeat
  background-position: center center
  background-size: 50% 50%
.custom-checkbox:checked+label::before
  background-color: #3261ff
  background-image: url('../../assets/icons/tick.svg')
.custom-checkbox:disabled+label::before
  background-color: #e9ecef



.caption
  font-size: 14px
  line-height: 15px
  color: #161616
  // text-align: left !important
  // font-weight: 600


.filter-columns
  margin: 7px 14px 8px auto
  text-align: right
  position: relative
  z-index: 11
  &__btn
    border: none
    background-color: #00000000
    cursor: pointer
    &:hover
      opacity: 0.8

  &__menu
    position: absolute
    top: 22px
    right: 0
    background-color: #fff
    border-radius: 5px
    box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5)
    padding: 6px 8px 6px 11px

  &__show-menu
    display: flex
    align-items: center
    cursor: pointer
    gap: 11px
    &_reverse
      flex-direction: row-reverse
      font-weight: 600
      padding-bottom: 11px

  &__list
    list-style: none
</style>
