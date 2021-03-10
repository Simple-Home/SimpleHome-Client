<template>
    <div class="page">
        <div class="header-small">
            <router-link to="/"><i class="fa fa-angle-left"> Fuck go back</i></router-link>
            <router-link to="/" href="" class="text-gray">Edit</router-link>
        </div>

        <div class="detail-header">
            <div>
                {{this.id}}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data: function(){
            return {
                id: 0
            }
    },
    created()
    {
        this.id = this.$route.params.id;
    }
}
</script>