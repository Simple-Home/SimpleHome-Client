<template>
  <div class="page" v-if="loaded">
    <div class="header-small">
      <router-link to="/"><i class="fa fa-angle-left"></i> {{room}}</router-link>
      <router-link to="/" href="" class="text-gray">Edit</router-link>
    </div>
    <div class="detail-header">
      <div>
        <div class="d-flex items-center">
          <div class="detail-icon"><i class="fa" :class="device.icon"></i></div>
          <div>
            <h4>{{device.name}}</h4>
            <small>{{data.lastConnectionTime}}</small>
          </div>
        </div>
      </div>
      <div class="detail-value">
        {{device.value}}{{device.unit}}
      </div>
    </div>
    <div class="detail-chart">
      <device-detail-chart :height="340" :chartdata="data.graph"/>
    </div>
    <div class="detail-table mt-4">
      <table class="table">
        <tr v-for="record in data.records" :key="record.time">
          <td><small>{{record.time}}</small></td>
          <td><b>{{record.value}}</b></td>
        </tr>
      </table>
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
    computed: {
      room() {
        if(this.loaded && this.$store.state.rooms.length){
          return this.$store.state.rooms.find(room => room.room_id === this.data.room_id).name;
        }

        return '';
      },
      device() {
        let ret = {
          icon: '',
          name: '-',
          value: '-',
          unit: '',
        };

        if(this.loaded && this.$store.state.rooms.length){

          let widgets = this.$store.state.rooms.find(room => room.room_id == this.data.room_id).widgets;

          if(widgets !== undefined){
            Object.keys(widgets).forEach(key => {
              if(widgets[key].subdevice_id == this.$route.params.id){
                ret = widgets[key];
              }
            })
          }
        }

        return ret;
      }
    },
    created() {
      if (this.$store.state.rooms.length === 0) {
        this.$store.dispatch('retrieveRooms');
      }

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
        // console.log(data.graph);
        this.loaded = true;
      })
    }
  }
</script>
