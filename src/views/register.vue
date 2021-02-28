<template>
  <div class="container">
    <h3 class="text-center mb-5">Register Form</h3>
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <div v-if="error" class="alert alert-danger">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          {{error}}
        </div>
        <form @submit.prevent="authSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Masukan username anda" v-model="user.username">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Masukan email lengkap anda" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Masukan password lengkap anda" v-model="user.password">
          </div>
          <button type="submit" name="button" class="btn btn-primary btn-register">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {auth} from "../firebaseDB.js";

  export default{
    name:'register',
    data(){
      return{
        user:{
          username:'',
          email:'',
          password:''
        },
        error:null
      }
    },
    methods:{
      authSubmit(){
        auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(data => {
            data.user.updateProfile({
              displayName: this.user.username
            })
            .then(() => {
              this.$router.replace({name:'Login'});
            })
          })
          .catch(err => {
            this.error = err.message;
          });
      }
    }
  }
</script>

<style lang="css" scoped>
  .btn-register{
    width: 100%;
  }
</style>
