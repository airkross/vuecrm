<template>
  <div id="app">
    <component :is="layout">
       <!-- Данную заглушку router-vue можно удалить, она ничего не делает -->
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayout from "./layouts/MainLayout";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    emptyLayout: EmptyLayout,
    mainLayout: MainLayout
  }
};
</script>

<style>
@import "~materialize-css/dist/css/materialize.min.css";
@import "./assets/index.css";
</style>
