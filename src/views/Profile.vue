<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localizeFilter}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHendler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{'invalid': $v.name.$dirty && !$v.name.required }"
        />
        <label for="description">{{'ProfileName' | localizeFilter}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'ProfileInputError' | localizeFilter}}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'ProfileUpdate' | localizeFilter}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "profile",
  metaInfo() {
    return {
      title: this.$title('Navbar_Profile')
    };
  },
  data() {
    return {
      name: "",
      isRuLocale: true
    };
  },
  computed: {
    ...mapGetters(["info"])
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.local === "ru-RU";
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          local: this.isRuLocale === true ? "ru-RU" : "en-US"
        });
      } catch (e) {
        throw e;
      }
    }
  },
  validations: {
    name: {
      required
    }
  }
};
</script>

<style scoped>
.switch {
  margin-bottom: 20px;
}
</style>