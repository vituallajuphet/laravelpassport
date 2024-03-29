import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { setTimeout } from 'timers';

import posts from '@/assets/js/store/posts.js';
import users from '@/assets/js/store/users.js';


Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    posts,
    users
  }
 
})
