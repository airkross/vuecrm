<template>
  <div>
    <app-loader v-if="loading"></app-loader>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb"> {{'Menu_History' | localizeFilter}} </router-link>
        <a @click.prevent class="breadcrumb">{{ local(record.type === 'income' ? 'Доход' : 'Расход') }}</a>
      </div>
      <!-- <app-loader v-if="loading"></app-loader> -->
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.type === 'income' ? 'green' : 'red'">
            <div class="card-content white-text">
              <p> {{'Description' | localizeFilter}}: {{record.discription}}</p>
              <p>{{'Sum' | localizeFilter}}: {{record.amount | currencyFilter}}</p>
              <p>{{'Category' | localizeFilter}}: {{record.categoryName}}</p>

              <small>{{new Date(record.date) | dateFilter('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись не найдеда!</p>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';
export default {
  name: "detailrecord",
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    };
  },
  data() {
    return {
      record: null,
      loading: true
    };
  },
  methods:{
    local(val){
      return localizeFilter(val);
    }
  },
  async mounted() {
    const recordId = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", recordId);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.title
    };

    this.loading = false;
  }
};
</script>

<style>
</style>