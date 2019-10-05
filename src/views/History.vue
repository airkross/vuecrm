<template>
  <div>
    <div class="page-title">
      <h3> {{'Record_History' | localizeFilter}} </h3>
    </div>
    <!-- график -->
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <app-loader v-if="loading"></app-loader>
    <p v-else-if="!records.length" class="center">
      {{ 'Not_Records' | localizeFilter}}
      <router-link to="/record">{{ 'Add_Record' | localizeFilter}}</router-link>
    </p>
    <section v-else>
      <history-table :records="items"></history-table>
      <!-- при помощи v-model мы динамически следим за изменением страницы, если в query параметре -->
      <!-- есть номер страницы, то мы сразу на нее переходим -->
      <app-paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHendler"
        :prev-text="local('Back')"
        :next-text="local('Next')"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      ></app-paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import localizeFilter from '@/filters/localize.filter';
import paginationMixin from "@/mixins/pagination.mixin";

import { Pie } from "vue-chartjs";

export default {
  name: "history",
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    };
  },
  extends: Pie,
  data() {
    return {
      loading: true,
      records: []
    };
  },
  mixins: [paginationMixin],
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.setup(categories);
    this.loading = false;
  },
  
  methods: {
    local(value){
      return localizeFilter(value);
    },
    setup(categories) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoriesName: categories.find(cat => record.categoryId === cat.id)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход"
          };
        })
      );

      this.renderChart({
        labels: categories.map(cat => cat.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map(cat => {
              return this.records.reduce((total, record) => {
                if (
                  record.categoryId === cat.id &&
                  record.type === "outcome"
                ) {
                  total += +record.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      });
    }
  },
  components: {
    historyTable: HistoryTable
  }
};
</script>

<style>
</style>