import axios from 'axios'
import { setTimeout } from 'timers';

const burl  = "/larpassport/public/api/";


axios.interceptors.response.use((response) => {
    return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const posts = {
    namespaced: true,
    state:{
        posts:[]
    },
    actions:{
          // user here
        fetch_posts({ commit }){
            return new Promise((resolve, reject) =>{
                const accessToken = localStorage.getItem("token");
                let axiosConfig = { headers: { 'Authorization': 'Bearer '+accessToken, "Accept": "application/json", } }; 
                axios.get(burl+'posts',  axiosConfig )
                .then((response) =>{
                    commit('SET_POSTS', response.data.success)
                    resolve(response.data.success)
                })
                .catch((err)=>{
                    commit("UNSET_POSTS");
                    reject(err)
                })  
            })
        },
        save_post({ commit }, frmdata){
            return new Promise((resolve, reject) =>{
                axios.post(burl+'posts/savepost', frmdata.postData, frmdata.axiosConfig )
                .then((response) =>{
                    commit('SET_POSTS', response.data.success)
                    resolve(response.data.success)
                })
                .catch((err)=>{
                    reject(err)
                })  
            })
        },
        update_post({ commit }, frmdata){
            return new Promise((resolve, reject) =>{
                axios.post(burl+'posts/updatepost', frmdata.postData, frmdata.axiosConfig )
                .then((response) =>{
                    resolve(response.data.success)
                    commit('SET_POST', response.data.success)
                })
                .catch((err)=>{
                    reject(err)
                })  
            })
        }
    },
    getters:{
        getAllPost : (state) =>{
            return state.posts;
        },
        getPost : (state) => id => {
            return state.posts.find(post => post.id == id) 
        }
    },
    mutations:{
           // user here
        SET_POSTS (state, postdata) {
            state.posts = postdata
        },
        SET_POST (state, postdata) {
            state.posts.find(post=> {
                if(post.id == postdata.id){
                    post.title = postdata.title
                    post.content = postdata.content
                }
            })
        },
        UNSET_POSTS (state) {
            state.posts = []
        }
    }
}

export default posts

