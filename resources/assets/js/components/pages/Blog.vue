<template>
    <div class="container">
       <div class="card">
            <div class="card-header">BLog
                <router-link to="/add-post" class="btn btn-primary pull-right">Add Post</router-link>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 posts" v-for="post in posts" :key="post.id">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">{{post.title}}</h4>
                                <p class="card-text">{{post.content}}</p>
                                <a href="javascript:;" @click="viewPost(post.id)" class="btn btn-primary">View Post</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        mounted() {
            this.getPosts();
        },
        name:'blog',
        data(){
            return{
                posts:[]
            }
        },
        methods:{
            getPosts(){
                let res = this.$store.getters['posts/getAllPost'];
                console.log(res)
                if(res == undefined || res.length == 0){
                    this.$store.dispatch('posts/fetch_posts').then((resp)=>{
                        this.posts = resp;
                    }).catch((err)=>{s
                        alert(err)
                        this.posts = [];
                    })
                }else{
                     this.posts = res;
                }
            },
            viewPost(id){
                //  let res = this.$store.getters['posts/getPost'](id)
                //  console.log(res.content)
                this.$router.push({name: 'viewpost', params:{id:id}});
            }
        }
    }
</script>


<style  scoped>
 .posts{margin-bottom: 15px}
</style>