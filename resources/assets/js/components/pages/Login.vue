<template>
    <div class="container">
        <div class="card w-50">
            <div class="card-body">
                <h5 class="card-title">Login Account</h5>
                 <form method="post" @submit.prevent="login()" >
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input v-model="email" required type="email" class="form-control" id="email">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input v-model="password" required  type="password" class="form-control" id="pwd">
                </div>
                <div v-if="loading" style="text-align:center;">
                    Loading...
                </div>
                <div v-if="hasErr" class="err msg">
                    {{errMsg}}
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
             </form> 
            </div>
        </div>
            
         </div>
</template>

<script>
import axios from 'axios'
    export default {
        
        data(){
            return{
                email:"",
                password:"",
                hasErr:false,
                errMsg:"",
                loading:false
            }
        },
        mounted() {
      
        },
        methods:{
            login (){
                let frm = this.formData({ email:this.email, password:this.password })
                let frmdata= {
                    postData: frm,
                    axiosConfig:{
                            headers: { 'Content-Type': 'multipart/form-data' }
                    }
                }
                this.loading = true
                this.$store.dispatch('users/login_accnt',frmdata).then((res)=>{
                    this.hasErr = false
                     this.loading = false

                   this.$router.push({name:'home'})
                }).catch((err)=>{
                    this.hasErr = true
                    this.loading = false
                    if(err=="Error: Request failed with status code 401"){
                       this.errMsg ="Incorrect Username / Password!"
                    }
                    else if(err=="Error: Network Error"){
                       this.errMsg ="Please check the network!"
                    }
                    else{
                        this.errMsg = err
                    }
                })
            },
            formData(obj) {
                var formData = new FormData();
                for (var key in obj) {
                    formData.append(key, obj[key]);
                }
                return formData;
         }
        },
        name:'login'
    }
</script>

<style scoped>
    .card{margin: 0 auto}
    .err{color: red}
    .msg{text-align: center}
</style>