import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL='http://musicapi.leanapp.cn/'

Vue.prototype.$axios = axios
