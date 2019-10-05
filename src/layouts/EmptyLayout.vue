<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import messages from '../utils/messages.js'

export default {
  computed: {
    // при изменении геттер.эррор, вызывается компьютид свойство и сразу возвращается результат
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    // при изменении компьютид метода error(), вернее его содержимого,
    // мы сразу получаем измененное содержимое и выводим его в консоль
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так...")
    }
  }
};
</script>

<style>
</style>