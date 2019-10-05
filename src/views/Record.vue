<template>
  <div>
    <div class="page-title">
      <h3> {{'Menu_Record' | localizeFilter}} </h3>
    </div>

    <app-loader v-if="loading"></app-loader>

    <p class="center" v-else-if="!categories.length">
      {{'Warning_Category' | localizeFilter}}
      <router-link to="/Categories"> {{'Create_Category' | localizeFilter}} </router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHendler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
        </select>
        <label> {{'Inpute_Category' | localizeFilter}} </label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span> {{'income' | localizeFilter}} </span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span> {{'outcome' | localizeFilter}} </span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{'invalid': ($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue)}"
        />
        <label for="amount"> {{'Sum' | localizeFilter}} </label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.required"
        > {{'Error_Sum' | localizeFilter}} </span>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        > {{'Min_Sum' | localizeFilter}} {{$v.amount.$params.minValue.min}}. {{'Entered' | localizeFilter}} {{$v.amount.$model}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="discription"
          :class="{'invalid': $v.discription.$dirty && !$v.discription.required}"
        />
        <label for="description"> {{'Description' | localizeFilter}} </label>
        <span
          class="helper-text invalid"
          v-if="$v.discription.$dirty && !$v.discription.required"
        > {{'Error_Description' | localizeFilter}} </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create' | localizeFilter}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "record",
  metaInfo() {
    return {
      title: this.$title('Menu_Record')
    };
  },
  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: "outcome",
      amount: 1,
      discription: ""
    };
  },
  computed: {
    // mapGetters - вспомогательная функци vuex, служит для преобразования геттеров vuex в локальные вычисляемые свойства
    // простыми словами мы получили объект и сделали обычным свойством и можем теперь обращаться к нему как к любому data свойству
    // мы получем объект info в котором находится name и  bill
    ...mapGetters(["info"]),
    canCreateRecor() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecor) {
        try {
          const formData = {
            categoryId: this.category,
            amount: this.amount,
            discription: this.discription,
            type: this.type,
            date: new Date().toJSON()
          };
          await this.$store.dispatch("createRecord", formData);
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch("updateInfo", { bill });
          this.$message('Запись добавлена успешно!');
          this.$v.$reset();
          this.amount = 1;
          this.discription = "";
        } catch (e) {
          throw e;
        }
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        );
      }

      
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      M.updateTextFields();
      this.select = M.FormSelect.init(this.$refs.select);
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  validations: {
    amount: {
      required,
      minValue: minValue(1)
    },
    discription: {
      required
    }
  }
};
</script>

<style>
</style>