<template>
    <div>
         <appnav></appnav>
        <div class="row">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import appnav from './components/includes/Nav.vue'
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        components:{
            appnav
        },
        name:'mainapp'
    }
</script>
