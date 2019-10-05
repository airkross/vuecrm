<template>
  <ul class="sidenav app-sidenav" :class="{open:value}">
    <router-link
      tag="li"
      active-class="active"
      :to="link.url"
      v-for="link in links"
      :key="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  data() {
    return {
      links: [
        { title: localizeFilter('Menu_Bill'), url: "/", exact: true },
        { title: localizeFilter('Menu_History'), url: "/history" },
        { title: localizeFilter('Menu_Planning'), url: "/planing" },
        { title: localizeFilter('Menu_Record'), url: "/record" },
        { title: localizeFilter('Menu_Categories'), url: "/categories" }
      ]
    };
  },
  props: ["value"]
};
</script>

<style>
</style>