<template>
  <div class="page" v-if="loaded">
    <div class="header-small">
      <router-link to="/"><i class="fa fa-angle-left"></i> Living room</router-link>
      <router-link to="/" href="" class="text-gray">Edit</router-link>
    </div>
    <div class="detail-header">
      <div>
        <div class="d-flex items-center">
          <div class="detail-icon"><i class="fa fa-thermometer-half"></i></div>
          <div>
            <h4>Temperature</h4>
            <small>{{data.lastConnectionTime}}</small>
          </div>
        </div>
      </div>
      <div class="detail-value">
        32°C
      </div>
    </div>
    <div class="detail-chart">
      <device-detail-chart :height="340" :chartdata="data.graph"/>
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
    data() {
      return {
        data: null,
        loaded: false,
      };
    },
    created() {
      fetch(`/vasek/home-update/api/widgets/${this.$route.params.id}/detail`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        this.data = data;
        console.log(data.graph);
        this.loaded = true;
      })
    }
  }
</script>
