import Vue from 'vue';

// import Vuetify from 'vuetify'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'vuetify/dist/vuetify.min.css'

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');
window.Vue = require('vue');
import store from '@/assets/js/store.js'
import Routes from '@/assets/js/router.js'
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import App from '@/assets/js/App.vue'

console.clear()

Routes.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem("token"); 
    if(to.meta.requiresAuth){
        if(accessToken != "" && accessToken!= undefined){
            let axiosConfig = { headers: { 'Authorization': 'Bearer '+accessToken, "Accept": "application/json" } };
            // axios.post('/larpassport/public/api/details','',axiosConfig )
            // .then((response) =>{
            //     next()
            // }).catch((err)=>{
            //     next({name:'login'})
            // })
            store.dispatch('users/check_auth', axiosConfig).then((res)=>{
                next()
            })
            .catch((err)=>{
                next({name:'login'})
            })
        }else{
            next({name:'login'})
        }
    }else{
        next()
    }
})

const app = new Vue({
    el: '#app',
    router:Routes,
    store: store,
    render: h =>h(App)
});
