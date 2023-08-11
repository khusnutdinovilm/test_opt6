<template>
  <div class="custom-input">
    <label class="label" v-if="$store.getters.isMobile">{{ labelText }}</label>
    <input
      class="input"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    modelValue: {},
    labelText: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    return {
      type: computed(() => {
        return typeof props.modelValue === "string" ? "text" : "number";
      }),
    };
  },
};
</script>

<style lang="sass" scoped>
.input
  height: 35px
  font-size: 15px
  line-height: 16px
  padding: 10px 0 9px 15px
  border-radius: 5px
  border: solid 1px #ccc
  width: 100%
  max-width: 100%
  appearance: textfield
.label
  // display: block
  color: #8f8f8f
  display: flex
  margin: 0 auto 5px 0
  font-size: 10px
  line-height: 11px
</style>
