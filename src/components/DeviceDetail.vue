<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    data: () => ({
      chartdata: {
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 10, 23]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }),

    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>
