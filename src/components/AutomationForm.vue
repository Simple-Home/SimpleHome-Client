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

        <div style="background-color: #e8e8e8; padding: 5px; border-radius: 10px; margin-top: 15px">
            <div>
                <div class="header-title" style="margin-top: 2%">
                    <p style="margin-right: 10%; margin-top: 10px"><b> Conditions:</b></p>
                    <button class="button is-primary button-add" v-on:click="addCondition()">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
            <div style="max-height:200px; overflow-y: auto; margin-top: 10px">
                <ul style="margin-top: inherit; padding-left: 0px">
                    <li style="list-style: none; margin-bottom: 5px" v-for="i in conditionsCount" :key="i">
                        <div style="background-color: #34eb74; padding-top: 15px; padding-bottom: 10px; padding-left: 5px; border-radius: 5px">
                            <p>{{ i }}</p>
                        </div>
                    </li>
                </ul>
                <p v-if="conditionsCount == 0" style="text-align: center">Add conditions</p>
            </div>
        </div>

        <div style="background-color: #e8e8e8; padding: 5px; border-radius: 10px; margin-top: 15px">
            <div>
                <div class="header-title" style="margin-top: 2%">
                    <p style="margin-right: 10%; margin-top: 10px"><b> Actions:</b></p>
                    <button class="button is-primary button-add" v-on:click="addAction()">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
            <div style="max-height:200px; overflow-y: auto; margin-top: 10px">
                <ul style="margin-top: inherit; padding-left: 0px">
                    <li style="list-style: none; margin-bottom: 5px" v-for="i in actionsCount" :key="i">
                        <div style="background-color: #34eb74; padding-top: 15px; padding-bottom: 10px; padding-left: 5px; border-radius: 5px">
                            <p>{{ i }}</p>
                        </div>
                    </li>
                </ul>
                <p v-if="actionsCount == 0" style="text-align: center">Add actions</p>
            </div>
        </div>

        <div class="header-small">
            <v-touch tag="a" v-on:tap="submit()">{{submitText}}</v-touch>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'AutomationForm',
        data: function(){
            return {
                id: 0,
                conditionsCount: 0,
                actionsCount: 0,
                automation: {
                    name: "",
                    condition: {
                        operator: [],
                        rules: []
                    },
                    action: {},
                    days: [],
                    month: []
                },
            }
        },
        methods:
        {
            submit()
            {
                this.$store.commit('createAutomation', this.automation);
            },
            addCondition()
            {
                this.conditionsCount++;
            },
            addAction()
            {
                this.actionsCount++;
            }
        },
        computed:
        {
            submitText: function()
            {
                if(this.id == 'new_form')
                {
                    return 'Create';
                }
                else
                {
                    return 'Save';
                }
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