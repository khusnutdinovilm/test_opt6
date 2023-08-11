import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    orders: [],
    isMobile: true,
    isDesktop: false,

    key: 0,
  },
  getters: {
    products: (s) => s.products,
    orders: (s) => s.orders,
    isMobile: (s) => s.isMobile,
    isDesktop: (s) => s.isDesktop,
    key: (s) => s.key,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    updateOrder(state, order) {
      let idx = state.orders.findIndex((or) => or.id === order.id);
      state.orders[idx] = order;
    },
    addOrder(state, order) {
      state.orders.push(order);
    },
    deleteOrder(state, orderId) {
      let idx = state.orders.findIndex((or) => or.id === orderId);
      state.orders.splice(idx, 1);
    },
    setMobile(state) {
      state.isMobile = true;
      state.isDesktop = false;
      state.key++;
    },
    setDesktop(state) {
      state.isMobile = false;
      state.isDesktop = true;
      state.key++;
    },
  },
  actions: {
    setMobile({ commit }) {
      commit("setMobile");
    },
    setDesktop({ commit }) {
      commit("setDesktop");
    },

    async getProducts({ commit }) {
      let url = "http://localhost:3000/products";
      await axios.get(url).then((responce) => {
        commit("setProducts", responce.data);
      });
    },

    async getOrders({ commit }) {
      let url = "http://localhost:3000/orders";
      await axios.get(url).then((responce) => {
        commit("setOrders", responce.data);
      });
    },

    async addOrder({ commit }, order) {
      let url = "http://localhost:3000/orders";
      await axios
        .post(url, order)
        .then(() => {
          commit("addOrder", order);
        })
        .catch((e) => console.log(e.message));
    },

    async updateOrder({ commit }, order) {
      let url = `http://localhost:3000/orders/${order.id}`;
      await axios
        .put(url, { ...order })
        .then(() => {
          commit("updateOrder", order);
        })
        .catch((e) => console.log(e.message));
    },

    async deleteOrder({ commit }, orderId) {
      let url = `http://localhost:3000/orders/${orderId}`;
      await axios.delete(url).then(() => {
        commit("deleteOrder", orderId);
      });
    },
  },
  modules: {},
});
