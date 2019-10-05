<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create' | localizeFilter}}</h4>
      </div>

      <form @submit.prevent="submitHendler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{'invalid': $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">{{'Title' | localizeFilter}}</label>
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
            v-if=" $v.limit.$dirty && !$v.limit.minValue"
          > {{'Min_Value' | localizeFilter}} {{$v.limit.$params.minValue.min}}.  {{'Entered' | localizeFilter}} {{$v.limit.$model}}</span>
        </div>
        <!-- <pre> {{$v}} </pre> -->
        <button class="btn waves-effect waves-light" type="submit">
          {{'Create' | localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      title: "",
      limit: 100
    };
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        title: this.title,
        limit: this.limit
      };
      try {
        const category = await this.$store.dispatch("createCategory", formData);
        this.title = '';
        this.limit = 100;
        this.$v.$reset(); // сбрасываем валидаторы формы, то есть приводим к начальному состоянию
        this.$message('Категория была создана');
        this.$emit('created', category);
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
      minValue: minValue(100) //1 рубль это минимум который мы можем ввести
    }
  }
};
</script>

<style>
</style>