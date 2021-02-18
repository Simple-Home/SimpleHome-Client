<template>
    <div class="page">
        <div class="header-small">
            <router-link to="/automations"><i class="fa fa-angle-left"></i> Automations</router-link>
        </div>
        <h1 class="header-name">{{ automation.name }}</h1>
            <br>
        <div>
            <p> Name: </p>
            <input type="text" v-model="automation.name">
        </div>
        <div>
            <p> Condition: </p>
            <select>
                <option selected>Manual</option>
                <option>AND</option>
                <option>OR</option>
            </select>
        </div>
        <div class="header-small">
            <v-touch tag="div" v-on:tap="save()"><i class="fa fa-angle-left"></i> Save</v-touch>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'AutomationForm',
        data: function(){
            return {
                id: 0,
                automation: {
                    name: "",
                    condition: {
                        operator: "",
                        rules: {}
                    },
                    action: {},
                    days: [],
                    month: []
                },
            }
        },
        created(){

            this.id = this.$route.params.id;

            if (this.$store.state.automations.length === 0) {
                this.$store.dispatch('retrieveAutomations');
            }

            if(!isNaN(this.id) && this.is != 'new_form')
            {
                this.automation = this.$store.state.automations.find(automation => automation.automation_id == this.id);
            } else if(this.id == 'new_form')
            {
                this.automation.name = 'New automation';
            }
            
        }
    }
</script>