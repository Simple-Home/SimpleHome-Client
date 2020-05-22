<template>
  <div class="device">
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
};
</script>
