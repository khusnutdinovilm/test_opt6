<template>
  <button class="drag-button">
    <svg-drag-button />
    <span class="drag-button__index">
      {{ index }}
    </span>
  </button>
</template>

<script>
import SvgDragButton from "@/components/icons/SvgDragButton.vue";

export default {
  props: {
    index: { type: Number },
  },
  setup() {},
  components: {
    SvgDragButton,
  },
};
</script>

<style lang="sass">
.drag-button
  padding: 0
  margin: 0
  border: 0
  background-color: #00000000
  font-size: inherit
  display: flex
  align-items: center
  cursor: grab
  &__index
    margin-left: 5px
</style>
