<template>
  <div>
    <div class="page-title">
      <h3> {{'Categories' | localizeFilter}} </h3>
    </div>
    <section>
      <app-loader v-if="loading"></app-loader>
      <div class="row" v-else>
        <category-create @created="addNewCategory($event)"></category-create>
        <category-edit @udated="updateCategory($event)" v-if="categories.length" :categories="categories" :key="categories.length + updateCount"></category-edit>
        <p v-else class="center">Пока нет созданных категорий!</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
  name: "catgories",
  metaInfo() {
    return {
      title: this.$title('Menu_Categories')
    };
  },
  data(){
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods:{
    addNewCategory(category){
      this.categories.push(category);
    },
    updateCategory(category){
      const index = this.categories.findIndex(c => c.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updateCount++;
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit

  }
};
</script>

<style>
</style>