<template>
  <div class="room" v-show="active">
    <div class="devices">
      <device v-for="device in room.widgets" :device="device" :key="device.subdevice_id"/>
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
};
</script>
