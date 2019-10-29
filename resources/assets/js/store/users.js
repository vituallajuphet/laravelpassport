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

const users = {
    namespaced: true,
    state:{
        users:{
            name:"",
            email:"",   
            id:""
        },
        isLogin:false
    },
    actions:{
          // user here
        login_accnt({ commit }, frmdata){
            return new Promise((resolve, reject) =>{

                axios.post(burl+'login', frmdata.postData, frmdata.axiosConfig )
                .then((response) =>{
                    commit('SET_USER', response.data.success.user)
                    localStorage.setItem("token", response.data.success.token); 
                    resolve(response.data.success)
                })
                .catch((err)=>{
                    commit("UNSET_USER");
                    localStorage.removeItem("token")
                    reject(err)
                })  
            })
        },
        check_auth({ commit }, frmdata){
            return new Promise((resolve, reject) =>{
                axios.post(burl+'details', '', frmdata )
                .then((response) =>{
                    commit('SET_USER', response.data.success)
                    //localStorage.setItem("token", response.data.success.token); 
                    resolve(response.data.success)
                })
                .catch((err)=>{
                    reject(err)
                })  
            })
        },
          logout_user({ commit }, frmdata){
            return new Promise((resolve, reject) =>{
                axios.get(burl+'logout', frmdata)
                .then((response) =>{
                    commit("UNSET_USER");
                    // commit('SET_USER', response.data.success)
                    //localStorage.setItem("token", response.data.success.token); 
                    resolve(response.data.success)
                })
                .catch((err)=>{
                    reject(err)
                })  
            })
        },
    },
    getters:{
        getUserInfo : (state) =>{
            return state.users;
        },
        getUserId : (state) =>{
            return state.users.id;
        },
        getUserAuth : (state) =>{
            return state.isLogin;
        }
    },
    mutations:{
           // user here
        SET_USER (state, dd) {
            state.users.name = dd.name
            state.users.email = dd.email
            state.users.id = dd.id
            state.isLogin = true
        },
        UNSET_USER (state) {
            state.users.name = ""
            state.users.email = ""
            state.users.id = ""
            state.isLogin = false
        }
    }
}

export default users

