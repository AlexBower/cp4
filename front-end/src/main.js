import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false

let data = {
  students: [],
}

new Vue({
  router,
  data,
  created() {
    this.getStudents();
  },
  watch:{
    $route (){
      this.getStudents();
    }
  },
  methods: {
    async getStudents() {
      try {
        let response = await axios.get("/api/students");
        this.students = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  render: h => h(App)
}).$mount('#app')
