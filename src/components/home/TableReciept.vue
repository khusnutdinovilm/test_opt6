<template>
  <div class="receipt order-list__receipt">
    <div class="receipt__list">
      <div class="receipt__row">
        <span class="receipt__row-caption">Сумма: </span>
        <span class="receipt__row-data"> {{ receipt.totalPrice }} руб </span>
      </div>
      <div class="receipt__row">
        <span class="receipt__row-caption">Кол-во: </span>
        <span class="receipt__row-data">{{ receipt.totalCount }} шт</span>
      </div>
      <div class="receipt__row">
        <span class="receipt__row-caption">Общий вес: </span>
        <span class="receipt__row-data">{{ receipt.totalWeight }} кг</span>
      </div>
    </div>
    <div class="receipt__total">
      <span class="receipt__total-caption">Общая сумма: </span>
      <span class="receipt__total-data"> {{ receipt.totalPrice }} руб </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const receipt = ref({
  totalPrice: computed(() =>
    store.getters.orders.reduce((sum, order) => sum + order.total, 0)
  ),
  totalCount: computed(() =>
    store.getters.orders.reduce((sum, order) => sum + order.count, 0)
  ),
  totalWeight: computed(() =>
    store.getters.orders.reduce((sum, order) => sum + order.weight, 0)
  ),
});
</script>

<style lang="sass">
.receipt
  &__list, &__total
    padding: 15px
    border-radius: 5px
    border: 1px solid #eeeff1
    background-color: #fbfcfd

  &__row, &__total
    display: flex
    flex-direction: row
    justify-content: space-between


  &__row-caption
    color: #8f8f8f

  &__row-data
    color: #000
    text-align: right

  &__total
    margin-top: 5px
    &-caption, &-data
      font-weight: 600
      color: #000
</style>
