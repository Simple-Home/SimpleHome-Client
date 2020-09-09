<script>
  import { Line } from 'vue-chartjs'

  export default {
    name: 'DeviceDetailChart',
    extends: Line,
    props: ['chartdata'],
    data: () => ({
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                ticks: {
                    display: false //this will remove only the label
                }
            }]
        }
      }
    }),

    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>
