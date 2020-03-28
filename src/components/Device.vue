<template>
  <div class="device">
    <div class="device-content text-center">
      <i class="device-icon fa" :class="device.icon" v-bind:style="{color: device['icon-color']}"></i>
      <div class="device-value">{{device.value}}</div>
      <div class="device-name">{{device.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Device',
  props: ['device']
}
</script>
