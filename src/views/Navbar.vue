<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel bg-danger">
    <div class="container">
      <router-link to="/" class="navbar-brand text-white">Data Mahasiswa</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <div class="nav-item">{{user.data.displayName}}</div>
            <li class="nav-item">
              <a class="nav-link text-white signout-link" @click.prevent="signOut">Sign out</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="nav-link text-white">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/list" class="nav-link text-white">List Mahasiswa</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from "vuex";
  import {auth} from "../firebaseDB.js";

  export default{
      computed:{
        ...mapGetters(['user'])
      },
      methods:{
        //fungsi ini digunakan untuk melakukan signOut
        signOut(){
          auth.signOut()
            .then(() => {
              this.$router.replace({name:'Login'});
            })
        }
      }
  }
</script>

<style media="screen">
  .signout-link{
    cursor: pointer;
  }
</style>
