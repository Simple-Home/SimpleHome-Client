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
                            <div>
                                <p>{{ i }}</p>
                                
                                <div>
                                    <select @change="changeWidget($event)">
                                        Select value
                                        <option value="" selected disabled>Select value</option>
                                        <option v-for="widget in widgets" :value="widget.subdevice_id" :key="widget.subdevice_id">
                                            {{widget.name}}: {{widget.value}} {{widget.unit}}
                                        </option>
                                    </select>
                                </div>

                                <select @change="changeCondition($event)">Select condition
                                    <option value="" selected disabled>Select condition</option>
                                    <option :value="0">Equals</option>
                                    <option :value="1">Bigger than</option>
                                    <option :value="2">Less than</option> 
                                </select>

                                <input type="text">
                            </div>

                        </div>
                    </li>
                </ul>
                <p v-if="conditionsCount == 0" style="text-align: center">Add actions</p>
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
                            <div>
                                <p>{{ i }}</p>
                                <button>Select device</button>
                            </div>
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
                data: null,
                loaded: false,
                widgets: null
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
            },
            changeCondition()
            {
               console.log(event.target.options[event.target.options.selectedIndex].text); 
            },
            changeWidget()
            {
                console.log(event.target.options[event.target.options.selectedIndex].text);
            },
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
            },
            getActionWidgets: function()
            {
            },
        },
        created: function(){

            this.id = this.$route.params.id;

            if (this.$store.state.automations.length === 0) {
                this.$store.dispatch('retrieveAutomations');
            }
            
            if(this.$store.state.rooms.length === 0)
            {
                this.$store.dispatch('retrieveRooms');
            }

            if(!isNaN(this.id) && this.is != 'new_form')
            {
                this.automation = this.$store.state.automations.find(automation => automation.automation_id == this.id);
            } else if(this.id == 'new_form')
            {
                this.automation.name = 'New automation';
            }
            
            var devices = [];

            //Load all devices
            this.$store.state.rooms.forEach(room => {
                room.widgets.forEach(device => {
                    devices.push(device);
                });
            });

            this.widgets = devices;
            //console.log(this.widgets);
        }
    }
</script>
