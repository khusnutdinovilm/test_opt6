<template>
  <div class="custom-checkbox">
    <input
      :id="data.id"
      v-model="model"
      :value="data"
      type="checkbox"
      class="custom-checkbox__input"
    />
    <label :for="data.id" class="custom-checkbox__label">
      {{ data.title }}
    </label>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: { type: Object },
  modelValue: {},
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value)
  }
})
</script>

<style lang="sass" scoped>
.custom-checkbox
  display: flex
  align-content: center

  &__input
    position: absolute
    z-index: -1
    opacity: 0
    &+label
      position: relative
      cursor: pointer
    &+label:before
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
    &:checked+label::before
      background-color: #3261ff
      background-image: url('../../assets/icons/tick.svg')
</style>
