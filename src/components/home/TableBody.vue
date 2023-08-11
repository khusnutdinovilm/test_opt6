<template>
  <tbody @drop="onDropRow($event)" @dragenter.prevent @dragover.prevent>
    <tr
      class="table__table-row"
      v-for="(row, idx) in rows"
      :id="row.id"
      :key="idx"
      ref="tr"
      :draggable="isDraggable[idx]"
      @dragstart="onDragStart($event, idx)"
      @dragover.prevent="onDragOver($event, row)"
      @dragend.prevent="onDragEnd($event, idx)"
    >
      <template v-for="column in columns" :key="column.id">
        <td
          class="table__table-row-cell"
          v-if="column.id === 'index' && isDesktop"
        >
          <drag-button
            class="table__drag-button"
            :index="idx + 1"
            @mousedown="isDraggable[idx] = true"
          />
        </td>
        <td
          class="table__table-row-cell table__table-row-cell-actions"
          v-else-if="column.id === 'actions'"
        >
          <actions-pop-up
            @delete-row="deleteRow(row.id)"
            @save-row="saveRow(row)"
          />
        </td>
        <td
          v-else-if="column.id === 'unit_title'"
          class="table__table-row-cell"
        >
          <custom-select
            :selectLable="column.title"
            :options="options"
            v-model="row[column.id]"
          />
        </td>
        <td
          class="table__table-row-cell"
          v-else-if="column.id === 'product_title'"
        >
          <custom-input
            v-model.number="row[column.id]"
            :labelText="column.title"
          />
        </td>
        <td
          class="table__table-row-cell"
          v-else-if="row[column.id]"
          :data-key="column.id"
        >
          <custom-input
            v-model.number="row[column.id]"
            :labelText="column.title"
          />
        </td>
      </template>
    </tr>
  </tbody>
</template>

<script>
import SvgIcon from "../ui/SvgIcon.vue";
import { inject, ref, computed } from "vue";

import CustomInput from "@/components/ui/CustomInput.vue";
import CustomSelect from "@/components/ui/CustomSelect.vue";
import DragButton from "@/components/ui/DragButton.vue";
import ActionsPopUp from "@/components/ui/ActionsPopUp.vue";

import { useStore } from "vuex";

export default {
  props: {
    rows: { type: Array },
    columns: { type: Array },
  },
  setup(props, { emit }) {
    const store = useStore();
    const isDraggable = ref(props.rows.map((r) => false));
    const selectItems = ref(props.rows.map((r) => r.unit_title));
    const tr = ref(null);

    const options = ref(
      store.getters.products.map((pr) => ({
        unit_title: pr.unit_title,
        property: pr.property,
      }))
    );

    const saveRowInject = inject("saveOrder");
    const deleteRowInject = inject("deleteOrder");

    const isMobile = ref(null);
    const isDesktop = computed(() => store.getters["isDesktop"]);

    const movedRow = ref(null);
    const movedRowNode = ref(null);

    const updateRows = inject("updateRows");
    let rows;

    const deleteRow = (rowId) => {
      deleteRowInject(rowId);
    };

    const saveRow = (row) => {
      console.log(row.id);
      saveRowInject(row);
    };

    const onDragStart = (e, rowId) => {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("rowId", rowId);

      movedRow.value = props.rows[rowId];

      movedRowNode.value = tr.value[rowId];
      movedRowNode.value.classList.add("table__table-row_move");
    };

    const onDragOver = (e, onDraggedOverRow) => {
      const draggableRowIdx = Number(e.dataTransfer.getData("rowId"));
      let targetRow = props.rows.findIndex((r) => r.id === onDraggedOverRow.id);

      const parentNode = tr.value[draggableRowIdx].parentNode;

      rows = [...props.rows];

      let dragRowIdx = rows.findIndex((r) => r.id === movedRow.value.id);

      rows.splice(dragRowIdx, 1);

      let idx = rows.findIndex((r) => r.id === onDraggedOverRow.id);

      let onDraggedOverRowIdx = dragRowIdx === idx ? idx + 1 : targetRow;

      rows.splice(onDraggedOverRowIdx, 0, movedRow.value);

      if (targetRow > draggableRowIdx) {
        tr.value[targetRow].after(tr.value[draggableRowIdx]);
      } else if (targetRow < draggableRowIdx) {
        tr.value[targetRow].before(tr.value[draggableRowIdx]);
      } else {
        parentNode.insertBefore(tr.value[targetRow], tr.value[draggableRowIdx]);
      }
    };
    const onDragEnd = (e, targetRowId) => {
      isDraggable.value[targetRowId] = false;
      updateRows(rows);
      movedRowNode.value.classList.remove("table__table-row_move");
    };
    const onDropRow = (e) => {};

    return {
      options,
      deleteRow,
      saveRow,
      isDesktop,
      tr,
      isDraggable,
      selectItems,
      onDragStart,
      onDropRow,
      onDragOver,
      onDragEnd,
    };
  },
  components: {
    SvgIcon,
    CustomSelect,
    CustomInput,
    DragButton,
    ActionsPopUp,
  },
};
</script>

<style lang="sass" scoped>

// td
//   // display: table-cell
//   white-space: nowrap
//   padding: 5px 10px !important
.class1
  border: 2px dashed black
  height: 30px
  cursor: gap

  &>td
    display: none
.edited
  border: 1px solid black
</style>
