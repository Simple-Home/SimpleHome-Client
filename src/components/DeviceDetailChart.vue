<script>
  import { Line } from 'vue-chartjs'

  export default {
    name: 'DeviceDetailChart',
    extends: Line,
    props: ['chartdata'],

    mounted () {
      this.chartdata.options.responsive = true;
      this.chartdata.data.datasets[0].borderColor = '#FF3A3A';
      this.chartdata.data.datasets[0].backgroundColor = '#FF3A3A33';
      this.chartdata.data.datasets[0].pointRadius = 1;
      this.chartdata.data.datasets[0].pointHoverRadius = 5;
      this.renderChart(this.chartdata.data, this.chartdata.options)
    }
  }
</script>
