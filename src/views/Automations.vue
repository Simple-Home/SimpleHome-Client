<template>
  <div class="page">

    <header class="header">
      <h1 class="header-name">Automations</h1>
        <button class="button is-primary button-add" v-on:click="openForm()">
          <i class="fa fa-plus"></i>
        </button>
    </header>


    <offline @detected-condition="amIOnline">

      <div slot="online" :slot-name="onlineSlot">
        <i class="fad fa-signal-alt-slash"></i>
        <p>( Online: {{ onLine }} )</p>
      </div>

      <div slot="offline" :slot-name="offlineSlot">
        <i class="fad fa-signal-alt-slash"></i>
        <p>( Online: {{ onLine }} )</p>
      </div>

    </offline>

    <div class="devices">
      <automation v-for="automation in automations" :automation="automation" 
      :key="automation.automation_id"/>
    </div>

  </div>
</template>

<script>
import offline from 'v-offline';
import Automation from '@/components/Automation.vue';

export default {
  name: 'Automations',
  components: {
    Automation,
    offline,
  },
  data: () => ({
    onLine: false,
    onlineSlot: 'online',
    offlineSlot: 'offline',
  }),
  computed:
  {
    automations() {
      return this.$store.state.automations;
    },
  },
  methods: {
    openForm: function()
    {
      this.$router.push('automation-form/' + 'new_form');
    },
    amIOnline(e) {
      this.onLine = e;
    },
  },
  created()
  {
    if(this.$store.state.automations.length === 0)
    {
      this.$store.dispatch('retrieveAutomations');
    }
    amIOnline();
  }
}
</script>

Automation