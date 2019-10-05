<template>
  <div>
    <div class="page-title">
      <h3> {{'Planning' | localizeFilter}} </h3>
      <h4>{{info.bill | currencyFilter('RUB')}}</h4>
    </div>
    <app-loader v-if="loading"></app-loader>

    <p v-else-if="!categories.length" class="center">
      {{'Warning_Category' | localizeFilter}}
      <router-link to="/categories"> {{'Create_Category' | localizeFilter}} </router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}} :</strong>
          {{cat.spend | currencyFilter('RUB')}} из {{cat.limit | currencyFilter('RUB')}}
        </p>
        <div class="progress" data-position="bottom" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from '@/filters/localize.filter';
export default {
  name: "planing",
  metaInfo() {
    return {
      title: this.$title('Menu_Planning')
    };
  },
  data() {
    return {
      loading: true,
      categories: []
    };
  },
  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id) //т.к. метод filter возвращает массив, к нему снова можно применить метод filter
        .filter(r => r.type === "outcome") // получаем только те рекорды, где тайп равен ауткам
        // total - это счетчик. Изначальное значение тотал указывается перед закрывающей скобкой метода reduce, т.е. равно нулю
        // record - это элемент массива, который мы прибавляем, т.е., если бы массив был [1,2], то record в себе содержит 1 и 2 по очереди
        .reduce((total, record) => {
          // total - изменяется на каждой итерации, record - некоторый рекорд, который относится к текущей итерации
          return (total += +record.amount); // + приводит к интеджеру и уберает конкотинацию строк
        }, 0); // получаем массив тех рекордов которые являются расходами, в них надо посчитать сумму расходов и общую сумму занести в переменную spend
      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0
          ? `${localizeFilter('Tooltip_Limit1')} ${currencyFilter(tooltipValue)} `
          : `${localizeFilter('Tooltip_Limit2')}: ${currencyFilter(tooltipValue)} `
      } `;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      };
    });

    this.loading = false;
  }
};
</script>

<style>
</style>