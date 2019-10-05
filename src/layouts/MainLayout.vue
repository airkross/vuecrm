<template>
  <div>
    <app-loader v-if="loading"></app-loader>
    <div class="app-main-layout" v-else>
      <app-navbar @click="isOpen=!isOpen"></app-navbar>
      <app-sidebar :value="isOpen" :key="local"></app-sidebar>

      <main class="app-content" :class="{full:!isOpen}">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>
      <add-button></add-button>
    </div>
  </div>
</template>

<script>
import messages from '@/utils/messages.js';
export default {
  name: "main-layout",
  data() {
    return {
      isOpen: true,
      loading: true
    };
  },
  async mounted() {
    // получение данных у пользователя
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  },
  computed: {
    // при изменении геттер.эррор, вызывается компьютид свойство и сразу возвращается результат
    error() {
      return this.$store.getters.error;
    },
    local(){
      return this.$store.getters.info.local
    }
  },
  watch: {
    // при изменении компьютид метода error(), вернее его содержимого,
    // мы сразу получаем измененное содержимое и выводим его в консоль
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так...")
    }
  },
  components: {
    appSidebar: () => import("../components/app/Sidebar.vue"),
    appNavbar: () => import("../components/app/Navbar.vue"),
    addButton: () => import("../components/app/AddButton.vue")
  }
};
</script>

<style>
</style>