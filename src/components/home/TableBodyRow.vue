<template>
  <tr class="table__table-row" :id="row.id" :draggable="isDraggable">
    <template v-for="column in columns" :key="column.id">
      <td v-if="column.id === 'index' && isDesktop" class="table__table-row-cell">
        <drag-button
          class="table__drag-button"
          :index="idx + 1"
          @mousedown="isDraggable = true"
          @mouseup="isDraggable = false"
        />
      </td>
      <td v-else-if="column.id === 'actions'" class="table__table-row-cell">
        <actions-pop-up
          @delete-row="deleteRow(row.id)"
          @save-row="saveRow(row)"
        />
      </td>
      <td v-else-if="column.id === 'unit_title'" class="table__table-row-cell">
        <custom-select
          :selectLable="column.title"
          :options="options"
          v-model="row[column.id]"
        />
      </td>
      <td
        v-else-if="column.id === 'product_title'"
        class="table__table-row-cell"
      >
        <custom-input
          v-model.number="row[column.id]"
          :labelText="column.title"
        />
      </td>
      <td
        v-else-if="row[column.id] && column.id !== 'total'"
        class="table__table-row-cell"
      >
        <custom-input
          v-model.number="row[column.id]"
          :labelText="column.title"
        />
      </td>
      <td v-else-if="column.id === 'total'" class="table__table-row-cell">
        <custom-input v-model.number="total" :labelText="column.title" />
      </td>
    </template>
  </tr>
</template>

<script setup>
import CustomInput from "@/components/ui/CustomInput.vue";
import CustomSelect from "@/components/ui/CustomSelect.vue";
import DragButton from "@/components/ui/DragButton.vue";
import ActionsPopUp from "@/components/ui/ActionsPopUp.vue";

import { useStore } from "vuex";
import { computed, inject, ref } from "vue";

const props = defineProps({
  columns: { type: Array, required: true },
  row: { type: Object, required: true },
  idx: { type: Number, required: true },
  isDraggable: { type: Boolean },
});

const store = useStore();
const isDesktop = computed(() => store.getters.isDesktop);

const total = computed(() => {
  // TODO: Так лучше не делать.. придумать, как можно это обойти
  props.row.total = props.row.price * props.row.count;
  return props.row.price * props.row.count;
});

const options = ref(
  store.getters.products.map((pr) => ({
    unit_title: pr.unit_title,
    property: pr.property,
  }))
);

const deleteRowInject = inject("deleteOrder");
const deleteRow = (rowId) => {
  deleteRowInject(rowId);
};

const saveRowInject = inject("saveOrder");
const saveRow = (row) => {
  saveRowInject(row);
};
</script>
