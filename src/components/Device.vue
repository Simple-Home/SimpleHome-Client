<template>
  <div class="device" :class="{ 'is-loading': isLoading }" v-on:click="run">
    <div class="device-content">
      <i class="device-icon fa" :class="icon"></i>
      <div class="device-value" v-if="showValue">
        {{device.value}}
        <small>{{device.unit}}</small>
      </div>
      <div class="device-name">{{device.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Device',
  props: ['device'],
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    icon() {
      let icon = 'fa-fa';
      if (this.device.type === 'on/off') {
        if (this.device.value) {
          icon = 'fa-toggle-on';
        } else {
          icon = 'fa-toggle-off';
        }
      }
      if (this.device.type === 'door') {
        if (this.device.value) {
          icon = 'fa-door-open';
        } else {
          icon = 'fa-door-closed';
        }
      }
      return icon;
    },
    showValue() {
      if (
        this.device.type === 'on/off'
        || this.device.type === 'door'
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    run() {
      if (this.device.type === 'on/off') {
        this.isLoading = true;
        this.$store.dispatch('runWidget', this.device).then(() => {
          this.isLoading = false;
        }).catch((err) => {
          this.isLoading = false;
          alert(err);
        });
      }
    },
  },
};
</script>
