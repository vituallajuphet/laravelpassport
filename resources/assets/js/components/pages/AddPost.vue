<template>
    <div class="container">
       <div class="card">
            <div class="card-header">Create Post</div>
            <div class="card-body">
                <form @submit.prevent="savePost()">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Title</label>
                        <input v-model="title" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Title">
                    </div>
                    <div class="form-group">
                    <label for="exampleFormControlTextarea1">Post Content</label>
                    <textarea v-model="content" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div>
                    <span v-if="msgShow" class="msg" :class=" hasErr ? 'err' : ''">{{msg}}</span>
                </div>
                    <button type="submit" class="btn btn-primary">Save</button>
                    <router-link to="/blog" class="btn btn-danger">Back</router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            
        },
        data(){
            return{
                title:"",
                content:"",
                msg:"",
                msgShow: true,
                hasErr:false
            }
        },
        methods:{
            savePost(){

                // get user
                const user_id = this.$store.getters["users/getUserId"];
                
                const accessToken = localStorage.getItem("token"); 
                let frm = this.formData({ title:this.title, content:this.content, user_id })
                let axiosConfig = { headers: { 'Authorization': 'Bearer '+accessToken, "Accept": "application/json" } };
                let frmdata= { postData: frm, axiosConfig }
               this.$store.dispatch('posts/save_post', frmdata )
                .then((resp)=>{
                    this.msgShow = true
                    this.msg= "Post Added!"
                    this.hasErr = false
                    this.clearData()
                })
                .catch((err)=>{
                    this.msgShow = true
                    this.hasErr = true
                    this.msg= err
                })
            },
            formData(obj) {
                var formData = new FormData();
                for (var key in obj) {
                    formData.append(key, obj[key]);
                }
                return formData;
           },
           clearData(){
               setTimeout(() => {
                   this.msgShow = false
                    this.msg= ""
                    this.hasErr = false
                    this.$router.push({name:'blog'})
               }, 1200);
           }
        },
        name:'addPost'
    }
</script>

<style scoped>
    .msg{color: green}
    .err{color: red!important}
</style>
