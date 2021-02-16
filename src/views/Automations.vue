<template>
  <div class="page">
    <header class="header">
      <h1 class="header-name">Automations</h1>
        <button class="button is-primary button-add" v-on:click="openForm()">
          <i class="fa fa-plus"></i>
        </button>
    </header>
    <automation v-for="automation in automations" :automation="automation" 
    :key="automation.automation_id"/>
  </div>
</template>

<script>

import Automation from '@/components/Automation.vue';

export default {
  name: 'Automations',
  components: {
    Automation,
  },
  computed:
  {
    automations() {
      return this.$store.state.automations;
    },
  },
  methods: {
    openForm: function()
    {
      this.$router.push('/automation-form');
    },
    created()
    {
      if(this.$store.state.automations.length === 0)
      {
        this.$store.dispatch('retrieveRooms');
      }
    }
  },
}
</script>

Automation