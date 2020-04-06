<template>
  <div class="room" v-show="active">
    <span>{{ room.name }} devices:</span>
    <div class="devices">
      <device v-for="device in devices" :device="device" :key="device.id"/>
    </div>
  </div>
</template>

<script>
import Device from '@/components/Device.vue';

export default {
  name: 'Room',
  props: ['room', 'active'],
  components: {
    Device,
  },
  data() {
    return {
      devices: [
        {
          id: 0, name: 'Tempetarure', value: `${Math.floor(Math.random() * 15 + 15)}°C`, icon: 'fa-thermometer-half', 'icon-color': '#FF3A3A',
        },
        {
          id: 1, name: 'Humidity', value: `${Math.floor(Math.random() * 15 + 60)}%`, icon: 'fa-tint', 'icon-color': '#3A6EFF',
        },
      ],
    };
  },
};
</script>
