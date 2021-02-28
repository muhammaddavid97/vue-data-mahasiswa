<template>
  <div class="container">
    <h3 class="text-center mb-5">Login Form</h3>
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <div v-if="error" class="alert alert-danger closed">
          <button type="button" @click="closeError()" class="close mb-4" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          {{error}}
        </div>
        <form @submit.prevent="sigInUserSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Masukan email lengkap anda" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Masukan password lengkap anda" v-model="user.password">
          </div>
          <button type="submit" name="button" class="btn btn-primary btn-register">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  import {auth} from "../firebaseDB.js";

  export default{
    name:'login',
    data(){
      return{
        user:{
          email:'',
          password:''
        },
        error:null
      }
    },
    methods:{
      closeError(){
        return document.querySelector(".closed").style.display = "none";
      },
      sigInUserSubmit(){
        auth.signInWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
            this.$router.replace({name:'List'});
          })
          .catch(err => this.error = err.message);
      }
    }
  }
</script>

<style lang="css" scoped>
  .btn-register{
    width: 100%;
  }

  .close-error{
    display: none;
  }
</style>
