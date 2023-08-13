<template>
  <tbody @drop.prevent @dragenter.prevent @dragover.prevent>
    <table-body-row
      v-for="(row, idx) in rows"
      :key="row.id"
      :idx="idx"
      :row="row"
      :columns="columns"
      :isDraggable="isDraggable"
      @dragstart="onDragStart($event, idx)"
      @dragover.prevent="onDragOver($event, row)"
      @dragend.prevent="onDragEnd"
    />
  </tbody>
</template>

<script>
import { inject, ref } from "vue";

import TableBodyRow from "@/components/home/TableBodyRow.vue";

export default {
  props: {
    rows: { type: Array },
    columns: { type: Array },
  },
  setup(props) {
    const isDraggable = ref(false);
    const tr = ref(null);

    const movedRow = ref(null);
    const movedRowNode = ref(null);

    const updateRows = inject("updateRows");
    let rows;

    const onDragStart = (e, rowIdx) => {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("rowId", rowIdx);

      tr.value = document.querySelectorAll("tr.table__table-row");

      movedRow.value = props.rows[rowIdx];

      movedRowNode.value = tr.value[rowIdx];

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
    const onDragEnd = (e) => {
      updateRows(rows);
      movedRowNode.value.classList.remove("table__table-row_move");
    };

    return {
      isDraggable,
      onDragStart,
      onDragOver,
      onDragEnd,
    };
  },
  components: {
    TableBodyRow,
  },
};
</script>
