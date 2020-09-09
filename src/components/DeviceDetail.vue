<template>
  <div>
    Chart: {{$route.params.id}}
    <div class="p-4">
      <device-detail-chart :chartdata="chartdata"/>
    </div>
  </div>
</template>

<script>
  import DeviceDetailChart from '@/components/DeviceDetailChart.vue';

  export default {
    name: 'DeviceDetail',
    components: {
      DeviceDetailChart,
    },
    data: () => ({
      chartdata: {
        datasets: [
          {
            label: 'Detail ID',
            backgroundColor: '#f87979',
            data: [40, 20, 23, 34]
          },
        ],
        labels: [40, 20, 23, 34],
      },
    })
  }
</script>
