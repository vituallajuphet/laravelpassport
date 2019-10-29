<template>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <!-- Brand -->
  <a class="navbar-brand" href="#">PEtWeb</a>

  <!-- Links -->
  <ul class="navbar-nav">
    <li class="nav-item"> <span class="nav-link"> <router-link  to="/">Home</router-link></span> </li>
    <li class="nav-item"> <span class="nav-link"><router-link to="/blog">Blog</router-link></span> </li>
    <li class="nav-item"> <span class="nav-link"><router-link to="/about-us">About Us</router-link></span> </li>
    <li class="nav-item"> <span class="nav-link"><router-link to="/contact-us">Contact Us</router-link></span> </li>
  </ul>

  <ul class="nav navbar-nav ml-auto">
      <li  v-if="isAuth">{{}}</li>
      <li v-if="isAuth"><a @click="logoutUser()" href="javascript:;"><span class="glyphicon glyphicon-user"></span> Logout</a></li>
      <li v-else><router-link  to="/login"><span class="glyphicon glyphicon-user"></span> Login</router-link></li>
  
  </ul>
</nav> 
</template>

<script>
    export default {
        mounted() {
        
        },
        data:{
          name:""
        },
        name:'main_nav',
        methods:{
          logoutUser(){
               const accessToken = localStorage.getItem("token"); 
              let axiosConfig = { headers: { 'Authorization': 'Bearer '+accessToken, "Accept": "application/json" } };
                this.$store.dispatch('users/logout_user', axiosConfig).then((res)=>{
                  this.$router.push({name:'login'})
                })
          }
        },
        computed :{
          isAuth(){
            const res=  this.$store.getters['users/getUserAuth'];
            return res;
          }
        }
    }
</script>

<style scoped>
  .router-link-exact-active{text-decoration: underline}
</style>