<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'Sum' | localizeFilter}}</th>
        <th>{{'Date' | localizeFilter}}</th>
        <th>{{'Category' | localizeFilter}}</th>
        <th>{{'Type' | localizeFilter}}</th>
        <th>{{'Open' | localizeFilter}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(r, index) in records" :key="r.id">
        <td>{{index + 1}}</td>
        <td>{{r.amount | currencyFilter}}</td>
        <td>{{new Date(r.date) | dateFilter('datetime') }}</td>
        <td>{{r.categoriesName}}</td>
        <td>
          <span class="white-text badge red" :class="r.typeClass">{{local(r.typeText)}}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detailRecord/${r.id}`)"
            v-tooltip="local('Look')"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';
export default {
  methods:{
    local(val){
      return localizeFilter(val);
    }
  },
  props: {
    records: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
</style>