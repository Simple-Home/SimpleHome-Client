<template>
  <div id="app">
    <alert-update/>

    <alerts/>

    <router-view/>

    <div id="nav" class="nav" v-if="loggedIn">
      <router-link tag="div" class="nav-item" active-class="is-active" to="/" exact>
        <a><i class="fa fa-home"></i></a>
      </router-link>
      <router-link tag="div" class="nav-item" active-class="is-active" to="/automations">
        <a><i class="fa fa-clock-o"></i></a>
      </router-link>
      <router-link tag="div" class="nav-item" active-class="is-active" to="/settings">
        <a><i class="fa fa-sliders-h"></i></a>
      </router-link>
    </div>
  </div>
</template>

<script>
import Alerts from '@/components/Alerts.vue';
import AlertUpdate from "@/components/AlertUpdate.vue";

export default {
  name: 'App',
  components: {
    Alerts,
    AlertUpdate,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";

</style>
