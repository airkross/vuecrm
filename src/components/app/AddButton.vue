<template>
  <div class="fixed-action-btn">
    <router-link
      class="btn-floating btn-large blue"
      to="/record"
      data-position="left"
      v-tooltip="localMessage"
      :key="getKey"
    >
      <i class="large material-icons">add</i>
    </router-link>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  computed: {
    localMessage() {
      return localizeFilter('Add_Record');
    },
    getKey(){
      return this.$store.getters.info.local
    }
  }
};
</script>

<style>
</style>