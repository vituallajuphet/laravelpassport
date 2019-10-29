<template>
    <div class="container">
       <div class="card">
            <div class="card-header">Blog Post </div>
            <div class="card-body">
               <h2>{{post.title}}  </h2> 
                <p>{{post.content}} <a @click="editPost(post.id)" href="javascript:;"><i class="fa fa-edit"></i>Edit</a></p>
                <br>
                <router-link to="/blog">Back</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        mounted() {
            this.displayPost();
        },
        name:'viewpost',
        data(){
            return{
                post:{}
            }
        },
        methods:{
            displayPost(){
                let id = this.$route.params.id;
                let res = this.$store.getters['posts/getPost'](id)
                if(res == undefined){
                    this.$store.dispatch('posts/fetch_posts').then((resp)=>{
                       this.post = this.$store.getters['posts/getPost'](id)
                       if(this.post == undefined){
                           this.post = {}
                       }
                    }).catch((err)=>{
                        alert(err)
                    })
                }else{
                    this.post = res;
                } 
                if(Object.entries(this.post).length === 0 ){
                    this.$router.push({name: 'blog'});
                }
            },
            editPost(id){
                this.$router.push({name: 'editpost', params:{id:id}});
            }
        }
    }
</script>
