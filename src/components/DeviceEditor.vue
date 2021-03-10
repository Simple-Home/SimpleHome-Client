<template>
    <div class="page">
        <div class="header-small">
            <router-link :to="/device-detail/ + this.$route.params.id"><i class="fa fa-angle-left"> Back</i></router-link>
        </div>



        <div class="detail-header">
            <h4>{{device.name}}</h4>
            <h4>{{device.icon}}</h4>
            <h4>{{device.value}}</h4>
            <h4>{{device.unit}}</h4>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            id: 0,
            data: null,
            loaded: false,
        };
    },
    created() {

        this.id = this.$route.params.id;

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
    }
}
</script>