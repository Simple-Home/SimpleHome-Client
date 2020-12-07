<template>
  <div class="device" :class="{ 'is-loading': isLoading, 'is-offline': device.connection_error }" v-on:click="run"
    v-long-press="300"
    v-on:long-press-start.stop="openDetail">
    <div class="device-content">
      <div class="device-head">
        <i class="device-icon fa" :class="icon"></i>
        <div class="device-value">
          <div v-if="showValue">
            {{device.value}}<small>{{device.unit}}</small>
          </div>
        </div>
      </div>
      <div class="device-name">{{device.name}}</div>
    </div>
  </div>
</template>

<script>
import LongPress from 'vue-directive-long-press'

export default {
  name: 'Device',
  props: ['device'],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    icon() {
      if(this.device.icon != null){
        return this.device.icon;
      }
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
          icon = 'fa-door-closed';
        } else {
          icon = 'fa-door-open';
        }
      }
      if (this.device.type === 'wifi') {
        icon = 'fa-wifi';
      }
      if (this.device.type === 'vol_cont') {
        icon = 'fa-volume-up';
      }
      if (this.device.type === 'temp') {
        icon = 'fa-thermometer-half';
      }
      if (this.device.type === 'humi') {
        icon = 'fa-tint';
      }
      if (this.device.type === 'battery') {
        icon = 'fa-battery-full';
      }
      if (this.device.type === 'temp_cont') {
        icon = 'fa-fire';
      }
      if (this.device.type === 'move') {
        if (this.device.value) {
          icon = 'fa-running';
        } else {
          icon = 'fa-male';
        }
      }
      if (this.device.type === 'weather') {
        icon = 'fa-cloud';
        if (this.device.value > 800) {
          icon = 'fa-cloud';
        } else if (this.device.value == 800) {
          icon = 'fa-sun';
        } else if (this.device.value >= 500 && this.device.value < 600) {
          icon = 'fa-cloud-showers-heavy';
        }
      }
      if (this.device.type === 'confirmed') {
        icon = 'fa-procedures';
      }
      if (this.device.type === 'deaths') {
        icon = 'fa-heartbeat';
      }
      if (this.device.type === 'recovered') {
        icon = 'fa-fire';
      }
      if (this.device.type === 'active') {
        icon = 'fa-virus';
      }
      return icon;
    },
    showValue() {
      if (
        this.device.type === 'on/off'
        || this.device.type === 'door'
        || this.device.type === 'weather'
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    run() {
      if (this.device.type === 'on/off') {
        if(this.isLoading === false){
          this.isLoading = true;
          this.$store.dispatch('runWidget', this.device).then(() => {
            this.isLoading = false;
          }).catch((err) => {
            this.isLoading = false;
            alert(err);
          });
        }
      }
    },
    openDetail(){
      this.$router.push('device-detail/'+this.device.subdevice_id);
    },
  },
};
</script>
