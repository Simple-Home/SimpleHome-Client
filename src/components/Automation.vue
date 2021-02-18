<template>

    <v-touch tag="div" class="device"
v-bind:press-options="{time: 300}"
v-on:press="openDetail()">
        <div class="device-content">
            <div class="device-head">
                <i class="fas fa-cogs"></i>
            </div>
            <div class="device-name">{{automation.name}}</div>
            <div class="device-head">
                <v-touch tag="i" v-on:tap="run()" class="device-icon fa" :class="icon"></v-touch>
                <v-touch tag="i" v-on:tap="restart()" class="fas fa-redo-alt"></v-touch>
            </div>
        </div>
    </v-touch>

</template>

<script>
export default {
    name: 'Automation',
    props: ['automation'],
    data() {
        return {
            isEnabled: false,
        };
    },
    methods:
    {
        run: function() {
            this.isEnabled = !this.isEnabled;
        },
        restart: function()
        {
            //alert('restart'); //To be removed
        },
        openDetail: function () {
            this.$router.push('automation-form/' + this.automation.automation_id);
        }
    },
    computed:
    {
        icon: function() {
            let icon = 'fa fa-fa';
            if(this.isEnabled)
            {
                icon = 'fa fa-toggle-on';
            } else 
            {
                icon = 'fa fa-toggle-off'
            }

            return icon;
        }
    }
}
</script>