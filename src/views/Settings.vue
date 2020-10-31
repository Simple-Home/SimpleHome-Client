<template>
  <div class="page">
    <header class="header">
      <h1 class="header-name">Settings</h1>
      <router-link to='/logout' class="button is-danger is-small">Log out</router-link>
    </header>
    <div class="col-12 col-sm-9 mx-auto mt-4" v-if="settings !== null">
        <label>UPTIME: <b>{{settings.uptime}}</b></label><br>
        <label>SERVER TIME: <b>{{settings.serverTime}}</b></label><br>
        <hr>
        <label>CPU: <b>{{settings.cpu_load}}%</b></label><br>
        <label>CPU Usage: </label>
        <progress :value="settings.cpu_load" max="100"></progress><br>
        <hr>
        <label>RAM TOTAL: <b>{{settings.ramTotal}}</b></label><br>
        <label>RAM FREE: <b>{{settings.ramFree}}</b></label><br>
        <label>RAM Usage: </label><progress :value="parseInt(settings.ramTotal)-parseInt(settings.ramFree)" :max="parseInt(settings.ramTotal)"></progress><br>
        <hr>
        <label>DISK TOTAL: <b>{{settings.diskTotal}} bytes</b></label><br>
        <label>DISK FREE: <b>{{settings.diskFree}} bytes</b></label><br>
        <label>DISK Usage: </label><progress :value="(settings.diskTotal - settings.diskFree)" :max="settings.diskTotal"></progress><br>
        <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  computed: {
    settings() {
      return this.$store.state.server;
    },
  },
  created() {
    if (this.$store.state.server === null) {
      this.$store.dispatch('retrieveServer');
    }
  },
}
</script>
