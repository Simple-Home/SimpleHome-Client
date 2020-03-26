<template>
  <div id="app">
    <router-view/>

    <div id="nav" class="nav">
      <router-link tag="li" class="nav-item" active-class="is-active" to="/"><a><i class="fa fa-home"></i></a></router-link>
      <router-link tag="li" class="nav-item" active-class="is-active" to="/scenes"><a><i class="fa fa-film"></i></a></router-link>
      <router-link tag="li" class="nav-item" active-class="is-active" to="/automations"><a><i class="fa fa-clock-o"></i></a></router-link>
      <router-link tag="li" class="nav-item" active-class="is-active" to="/settings"><a><i class="fa fa-bars"></i></a></router-link>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/styles/main.scss";

</style>
