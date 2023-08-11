<template>
  <thead
    class="table__table-head"
    @drop.prevent
    @dragover.prevent
    @dragenter.prevent
  >
    <transition-group name="flip-list" tag="tr">
      <template v-for="(column, idx) in columns" :key="column.id">
        <th
          v-if="isDesktop"
          class="table__table-head-cell"
          :style="{ position: 'relative', width: column.width }"
          :id="column.id"
          @dragstart="onDragStart($event, idx)"
          @dragover.prevent="onDragColumn($event, column)"
          @dragend.prevent="onDragEnd"
          draggable="true"
          ref="th"
        >
          {{ column.title }}
        </th>
      </template>
    </transition-group>
  </thead>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, inject } from "vue";
import { useStore } from "vuex";

export default {
  props: { columns: { type: Array } },
  setup(props) {
    const th = ref(null);

    const store = useStore();

    const isDesktop = computed(() => store.getters["isDesktop"]);

    // move column
    const updateColumn = inject("updateColumn");
    const movedColumn = ref(null);

    let columns;

    const onDragStart = (e, columnId) => {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("columnId", columnId);

      movedColumn.value = props.columns[columnId];
    };

    const onDragColumn = (e, targetColumn) => {
      const movedColumnId = Number(e.dataTransfer.getData("columnId"));
      const parentNode = th.value[movedColumnId].parentNode;
      let targetColumnId = props.columns.findIndex(
        (c) => c.id === targetColumn.id
      );

      if (e.target === th.value[targetColumnId]) {
        if (movedColumnId !== targetColumnId) {
          columns = [...props.columns];
          let dragColumnIdx = columns.findIndex(
            (col) => col.id === movedColumn.value.id
          );
          columns.splice(dragColumnIdx, 1);
          let idx = columns.findIndex((c) => c.id === targetColumn.id);
          targetColumnId = dragColumnIdx === idx ? idx + 1 : targetColumnId;
          columns.splice(targetColumnId, 0, movedColumn.value);

          if (targetColumnId > movedColumnId) {
            th.value[targetColumnId].after(th.value[movedColumnId])
          }
          else if(targetColumnId < movedColumnId) {
            th.value[targetColumnId].before(th.value[movedColumnId])
          }
          else {
            parentNode.insertBefore(th.value[targetColumnId], th.value[movedColumnId])
          }
        }
      }
    };

    const onDragEnd = () => {
      updateColumn(columns);
    };

    return {
      isDesktop,
      th,
      onDragStart,
      onDragColumn,
      onDragEnd,
    };
  },
};
</script>

<style lang="sass" scoped>
.resize-line
  cursor: col-resize
  position: absolute
  width: 10px
  background-color: black
  z-index: 10
  top: 0
  right: 0
  height: 100%

.show-resize-line
  position: absolute
  z-index: 10
  height: 220px
  width: 10px
  background-color: red
</style>
