<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title"> {{'Home_Exchenge' | localizeFilter}} </span>
        </div>
        <table>
          <thead>
            <tr>
              <th> {{'Currency' | localizeFilter}} </th>
              <th>{{'Course' | localizeFilter}}</th>
              <th>{{'Date' | localizeFilter}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(2)}}</td>
              <td>{{getDate | dateFilter('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currencies: ["RUB", "USD", "EUR"]
    };
  },
  computed: {
    getDate() {
      return new Date(this.date);
    }
  },
  props: ["rates", "date"]
};
</script>

<style>
</style>