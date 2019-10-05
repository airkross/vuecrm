<template>
  <form class="card auth-card" @submit.prevent="submitHendler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <!-- $v.email.$dirty - если непраильно вписал то возвращает true и вывод ошибки-->
        <!-- $v.email.required - если поле заполнено то возвращает true -->
        <!-- поэтому делаем инверсию поскольку true выведет ошибку, а заполненность поля это наоборот правильно -->
        <input
          id="email"
          type="text"
          :class="{'invalid': ($v.email.$dirty && !$v.email.required ) || ($v.email.$dirty && !$v.email.email )}"
          v-model.trim="email"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Пожалуйста введите Email</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Вы ввели некоректный Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          :class="{'invalid': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          v-model.trim="password"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >Пожалуйста введите пароль</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Минимальная длина пароля {{$v.password.$params.minLength.min}} символов, сейчас он {{$v.password.$model.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages.js";
export default {
  name: "login",
  metaInfo() {
    return {
      title: this.$title('auth')
    };
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    // 1. если вся наша форма находится в состоянии invalid=true, то мы активизируем валидаци
    // и производим ретерн и остаемся на стр логина
    // 2. если вся наша форма находится в состоянии invalid=false, то мы переходим на главну
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {}
    }
  }
};
</script>

<style>
</style>