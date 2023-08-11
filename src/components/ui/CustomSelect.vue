<template>
  <div class="select">
    <div class="select__label" v-if="$store.getters.isMobile">
      {{ selectLable }}
    </div>
    <div class="select__selected-item" @click="isSelectOpen = !isSelectOpen">
      {{ modelValue }}
    </div>
    <div class="select__options" v-if="isSelectOpen">
      <div
        class="select__item"
        v-for="(option, idx) in options"
        :key="idx"
        @click="change(idx)"
      >
        <span :class="{ select__item_bold: $store.getters.isDesktop }">
          {{ option.unit_title }}
        </span>
        &nbsp;
        <span>{{ option.property }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    selectLable: {},
    modelValue: {},
    options: {
      type: Array,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isSelectOpen = ref(false);

    const change = (idx) => {
      isSelectOpen.value = false;
      emit(
        "update:modelValue",
        `${props.options[idx].unit_title} ${props.options[idx].property}`
      );
    };

    return {
      isSelectOpen,
      change,
    };
  },
};
</script>

<style lang="sass">
.select
  position: relative
  &__label
    color: #8f8f8f
    display: flex
    margin: 0 auto 5px 0
    font-size: 10px
    line-height: 11px
  &__selected-item
    border-radius: 5px
    border: 1px solid #ccc
    background-color: #fff
    padding: 10px 15px
    overflow: hidden
    overflow: hidden
    white-space: nowrap
    text-overflow: clip
    cursor: pointer
    font-size: 16px

  &__item
    font-size: 14px
    color: #161616
    margin-bottom: 14px
    cursor: pointer
    &:hover
      color: #000
    &_bold
      font-weight: 700

  &__options
    position: absolute
    padding: 7px 10px
    border-radius: 5px
    box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5)
    background-color: #fff
    top: 46px
    left: 1px
    z-index: 10
</style>
