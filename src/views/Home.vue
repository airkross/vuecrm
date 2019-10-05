<template>
  <div>
    <div class="page-title">
      <h3> {{'Menu_Bill' | localizeFilter}} </h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <app-loader v-if="loading"></app-loader>

    <div class="row" v-else>
      <home-bill :rates="currency.rates"></home-bill>

      <home-currency :rates="currency.rates" :date="currency.date"></home-currency>
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";

export default {
  name: "home",
  metaInfo() {
    return {
      title: this.$title('Menu_Bill')
    };
  },
  data() {
    return {
      loading: true,
      currency: null
    };
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
  components: {
    homeBill: HomeBill,
    homeCurrency: HomeCurrency
  }
};
</script>

<style>
</style>