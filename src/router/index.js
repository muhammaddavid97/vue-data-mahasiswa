import Vue from "vue";
import VueRouter from "vue-router";
import Register from "@/views/register.vue";
import Login from "@/views/login.vue";
import List from "@/components/table-data.vue";
import Create from "@/components/create-data.vue";
import Dashboard from "@/components/dashboard.vue";
import Edit from "@/components/edit_data.vue";
import {auth} from "../firebaseDB.js";

Vue.use(VueRouter);
const routes = [
  {
    path:'/',
    name:'Dashboard',
    component:Dashboard
  },
  {
    path:'/list',
    name:'List',
    component:List
  },
  {
    path:'/register',
    name:'Register',
    component:Register,
    meta:{guest:true}
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta:{guest:true}
  },
  {
    path:'/create',
    name:'Create',
    component:Create,
    meta:{login:true} //menandakan bahwa halaman tersebut hanya boleh diakses ketika user sudah login
  },
  {
    path:'/edit/:nim',
    name:'Edit',
    component:Edit,
    meta:{login:true} //menandakan bahwa halaman tersebut hanya boleh diakses ketika user sudah login
  },
  {
    path:'*',
    redirect:'/'
  }
]

/// mebuat objek dari router nya
const router = new VueRouter({
  mode:'history',
  /// register routes path agar dapat di generate kedalam link
  routes
});


//Navigation Guard Global
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)){
    //jika user belum login maka halaman akan redirect ke halaman login
    if (!auth.currentUser){
      alert("Halaman ini hanya bisa diakses oleh user yang sudah login");
      //redirect ke halaman login
      next({path:'/login'})
      //jika user sudah login maka dia boleh akses halaman tersebut
    }else{
      next();
    }
  }else if(to.matched.some(record => record.meta.guest)){
    //jika user berhasil login maka dia akan redirect ke halaman List
    if (auth.currentUser){
      next({path:'/list'})
    }else{
      next();
    }
  }else{
    next()
  }
})


export default router;
