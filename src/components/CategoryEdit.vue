<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit' | localizeFilter}}</h4>
      </div>
      <form @submit.prevent="submitHendler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{category.title}}</option>
          </select>
          <label> {{'Select_Cat' | localizeFilter}} </label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model="title"
            :class="{'invalid': $v.title.$dirty && !$v.title.required}"
          />
          <label for="name"> {{'Title' | localizeFilter}} </label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          > {{'Error_NameCat' | localizeFilter}} </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{'invalid': $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">{{'Limit' | localizeFilter}}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          > {{'Min_Value' | localizeFilter}} {{$v.limit.$params.minValue.min}}. {{'Entered' | localizeFilter}} {{$v.limit.$model}}</span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          {{'ProfileUpdate' | localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      select: null,
      title: "",
      limit: 100,
      current: null // при выоборе категории выводит :value="category.id"
    };
  },
  methods: {
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория успешно обновлена!");
        this.$emit('updated', categoryData);
      } catch (e) {
          throw e;
      }
    }
  },
  validations: {
    title: {
      required
    },
    limit: {
      required,
      minValue: minValue(100)
    }
  },
  watch: {
    current(catId) {
      // ищем выбранную в select категорию в массиве categories
      // перебираем массив categories пока не найдем первое совпадение по id внутри вложенных объектов,
      // как только происходит совпадение, останавливаем перебор и возвращаем целиком объект которому принадлежит id
      const { title, limit } = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    // берем первый объект из массива для того чтобы при загрузке стр выводить стартовую категорию в блок редуктирования
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>

<style>
</style>