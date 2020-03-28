<template>
  <div class="room" v-show="active">
    <span>{{ room.name }} devices:</span>
    <div class="devices">
      <device v-for="device in devices" :device="device" :key="device.id"/>
    </div>
  </div>
</template>

<script>
import Device from '@/components/Device.vue'

export default {
  name: 'Room',
  props: ['room', 'active'],
  components: {
    Device
  },
  data: function () {
    return {
      devices: [
        { id: 0, name: 'Device', value: Math.floor(Math.random() * 15 + 15) + '°C', icon: 'fa-thermometer-half', 'icon-color': '#FF3A3A' }
      ]
    }
  }
}
</script>
