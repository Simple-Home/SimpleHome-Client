<template>
    <div class="page">
        <div class="header-small">
            <router-link :to="/device-detail/ + this.$route.params.id"><i class="fa fa-angle-left"> Back</i></router-link>
        </div>

        <h4>Currently editing: {{device.name}}</h4>
        <div style="display: flex">
            <p>{{deviceData.name}}</p>
            <input type="text" v-model="deviceData.name">
        </div> 
        <button v-on:click="save()">Save</button>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: null,
            loaded: false,
            deviceData: {
                id: 0,
                data: {
                    icon: '',
                    name: '-',
                    room_id: 0,
                }
            }
        };
    },
    methods: {
        save () {
            console.log(this.deviceData);
            this.$store.dispatch('updateWidget', this.deviceData);
        },
    },
    created() {

        this.deviceData.id = this.$route.params.id;


        if (this.$store.state.rooms.length === 0) {
            this.$store.dispatch('retrieveRooms');
        }

        fetch(process.env.VUE_APP_API_ROOT + `widgets/${this.$route.params.id}/detail`, {
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
            this.loaded = true;
        })
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
                    room_id: 0
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

            console.log(ret);

            this.deviceData.data.name = ret.name;
            this.deviceData.data.icon = ret.icon;            
            this.deviceData.data.room_id = ret.room_id;

            return ret;
        }
    }
}
</script>
