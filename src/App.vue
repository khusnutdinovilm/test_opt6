<template>
  <app-header />
  <main>
    <router-view />
  </main>
</template>

<script>
import Sidebar from "@/components/app/Sidebar.vue";
import { onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
// import Vue from "vue";
import AppHeader from "@/components/app/Header.vue";

export default {
  name: "App",
  methods: {
    forseUpdate() {
      this.$forceUpdate();
    },
  },
  setup() {
    const store = useStore();

    const set = () =>
      window.innerWidth >= 800
        ? store.dispatch("setDesktop")
        : store.dispatch("setMobile");

    set();
    window.addEventListener("resize", set);

    return {};
  },
  components: { AppHeader, Sidebar },
};
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: 'MyriadPro', sans-serif
  // font-size: 16px
main, header
  padding: 25px
  &.full
    padding: 25px
</style>
