<template>
  <div class="order-list">
    <div class="order-list__section order-list__add-new-order">
      <button class="order-list__add-new-order-btn" @click="addOrder">
        <svg-icon name="btn-plus" />
        <span>Добавить строку</span>
      </button>
    </div>
    <div class="order-list__section" v-if="loading">...loading</div>
    <div class="order-list__section" v-else-if="!orders.length">
      Записей пока что нет. Добавьте новую.
    </div>
    <div class="order-list__section order-list__table" v-else>
      <home-table :columns="columns" :rows="orders" />
      <div class="order-list__receipt">
        <div class="receipt">
          <div class="receipt__list">
            <div class="receipt__row">
              <span class="receipt__row-caption">Сумма: </span>
              <span class="receipt__row-data">
                {{ receipt.totalPrice }} руб
              </span>
            </div>
            <div class="receipt__row">
              <span class="receipt__row-caption">Кол-во: </span>
              <span class="receipt__row-data">{{ receipt.totalCount }} шт</span>
            </div>
            <div class="receipt__row">
              <span class="receipt__row-caption">Общий вес: </span>
              <span class="receipt__row-data"
                >{{ receipt.totalWeight }} кг</span
              >
            </div>
          </div>
          <div class="receipt__total">
            <span class="receipt__total-caption">Общая сумма: </span>
            <span class="receipt__total-data">
              {{ receipt.totalPrice }} руб
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { provide, ref, computed, onMounted } from "vue";

import SvgIcon from "@/components/ui/SvgIcon.vue";
import HomeTable from "@/components/home/Table.vue";
import Amount from "@/components/home/Amount.vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const columns = ref([
      { id: "index", title: "Номер", width: "5%" },
      { id: "actions", title: "Действия", width: "3%" },
      { id: "unit_title", title: "Наименование единицы", width: "40%" },
      { id: "price", title: "Цена" },
      { id: "count", title: "Кол-во" },
      { id: "product_title", title: "Название товара" },
      { id: "total", title: "Итого" },
    ]);

    const orders = computed(() => store.getters["orders"]);

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

    const loading = ref(true);

    onMounted(async () => {
      await store.dispatch("getProducts");
      await store.dispatch("getOrders");
      loading.value = false;
    });

    const addOrder = async () => {
      const firstProduct = store.getters.products[0];
      const newOrder = {
        id: Math.random(),
        unit_title: `${firstProduct.unit_title} ${firstProduct.property}`,
        price: firstProduct.price,
        count: 1,
        weight: firstProduct.weight,
        product_title: firstProduct.product_title,
        total: firstProduct.price,
      };

      await store.dispatch('addOrder', newOrder)
    };

    const saveOrder = async (order) => {
      await store.dispatch("updateOrder", order);
    };
    provide("saveOrder", saveOrder);

    const deleteOrder = async (orderId) => {
      await store.dispatch("deleteOrder", orderId);
    };
    provide("deleteOrder", deleteOrder);

    return {
      columns,
      orders,
      loading,
      receipt,
      addOrder,
    };
  },
  components: {
    SvgIcon,
    HomeTable,
    Amount,
  },
};
</script>

<style lang="sass" scoped>
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

.table-wrapper
  margin-bottom: 15px

.order-list
  &__receipt
    @media screen and (min-width: 800px)
      margin-left: auto
      margin-right: 10px
      width: 304px
  &__section
    @media screen and (min-width: 800px)
      border: solid 1px #eeeff1
      border-radius: 10px
      box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07)

  &__add-new-order
    margin: 0 0 25px
    padding: 19px 24px
    border: solid 1px #eeeff1
    border-radius: 10px
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07)

  &__add-new-order-btn
    border: none
    cursor: pointer
    padding: 10px 16px 10px 10px
    background-color: #2f8cff
    border-radius: 5px
    color: #fff
    font-size: 14px
    line-height: 15px
    display: flex
    align-items: center
    column-gap: 7px
    &:hover
      opacity: 0.8

  &__table
    margin-bottom: 15px
    position: relative
</style>
