<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title"> {{'Home_Bill' | localizeFilter}} </span>

        <p v-for="currency of currencies" :key="currency" class="currency-line">
          <span>{{getCurrency(currency) | currencyFilter(currency)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  data() {
    return {
      currencies: ["RUB", "USD", "EUR"]
    };
  },
  computed: {
    // т.к. данные относитель евро, мы конвертируем сразу весь нас счет(10000) в евро,
    // чтобы удобнее было конвертить дальше
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["RUB"] / this.rates["EUR"]) //10000/ 70/1
      );
    }
  },
  methods: {
    // считаем нас счет в других валютах
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    }
  }
};
</script>

<style>
</style>