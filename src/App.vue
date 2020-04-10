<template>
  <div id="app">
    <router-view/>

    <div id="nav" class="nav" v-if="loggedIn">
      <router-link tag="div" class="nav-item" active-class="is-active" to="/" exact>
        <a><i class="fa fa-home"></i></a>
      </router-link>
      <router-link tag="div" class="nav-item" active-class="is-active" to="/scenes">
        <a><i class="fa fa-film"></i></a>
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
export default {
  name: 'App',
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
