<template>
  <button
    class="actions-pop-up table__pop-up-button"
    @click.prevent="isActionsMenuOpen = !isActionsMenuOpen"
  >
    <span v-if="$store.getters.isMobile" class="actions-pop-up__caption"
      >Действие</span
    >
    <svg-action-button />
  </button>
  <div class="actions-pop-up__menu table__pop-up-menu" v-if="isActionsMenuOpen">
    <span @click="saveRow">Сохранить</span>
    <span @click="deleteRow">Удалить</span>
  </div>
</template>

<script>
import SvgActionButton from "@/components/icons/SvgActionButton.vue";
import { ref } from "vue";

export default {
  props: {
    isEdit: {
      type: Boolean,
    },
  },
  emits: ["edit-row", "delete-row", "save-row"],
  setup(_, { emit }) {
    const isActionsMenuOpen = ref(false);

    const deleteRow = () => {
      isActionsMenuOpen.value = false;
      emit("delete-row");
    };

    const saveRow = () => {
      isActionsMenuOpen.value = false;
      emit("save-row");
    };

    return {
      isActionsMenuOpen,
      deleteRow,
      saveRow,
    };
  },
  components: { SvgActionButton },
};
</script>

<style lang="sass">
.actions-pop-up
  border: none
  background-color: #00000000
  display: flex
  flex-direction: column
  cursor: pointer
  &__caption
    color: #8f8f8f
    margin: 0 auto 5px 0
    font-size: 10px
    line-height: 11px
  &__menu
    width: 179px
    padding: 7px 20px 7px 0
    border-radius: 5px
    box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5)
    background-color: #fff
    display: flex
    flex-direction: column
    white-space: normal
    span
      margin-left: 10px
      cursor: pointer
      font-size: 14px
      margin-bottom: 5px
      &:last-child
        color: #ae0a0a
        margin-bottom: 0
</style>
