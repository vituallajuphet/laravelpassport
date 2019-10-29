import Vue from 'vue'
import VueRouter from 'vue-router'


// import About from '@/assets/js/components/pages/About'
import Home from './components/pages/Home'
import Blog from './components/pages/Blog'
import about from './components/pages/About'
import contact from './components/pages/Contact'
import BlogPost from './components/pages/Viewpost'
import AddPost from './components/pages/AddPost'
import EditPost from './components/pages/EditPost'
import Login from './components/pages/Login'

Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {
            path:'/', 
            name:'home', 
            meta:{
                requiresAuth:true
            },
            component:Home
        },
        {
            path:'/blog', 
            name:'blog', 
            meta:{
                requiresAuth:true
            },
            component:Blog
        },
        {
            path:'/about-us', 
            name:'about', 
            meta:{
                requiresAuth:true
            },
            component:about
        },
        {
            path:'/contact-us', 
            name:'contact', 
            meta:{
                requiresAuth:true
            },
            component:contact
        },
        {
            path:'/add-post', 
            name:'addpost', 
            meta:{
                requiresAuth:true
            },
            component:AddPost
        },
        {
            path:'/edit-post/:id', 
            name:'editpost', 
            meta:{
                requiresAuth:true
            },
            component:EditPost,
            props:true
        },
        {
            path:'/blog/:id', 
            name:'viewpost', 
            meta:{
                requiresAuth:true
            },
            component:BlogPost,
            props:true
        },
        {
            path:'/login', 
            name:'login', 
            component:Login
        },
        {
            path:"/home",
            redirect: { name: 'home' }
        }
    ]
})

export default router