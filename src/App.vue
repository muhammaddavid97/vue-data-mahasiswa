<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <Navbar />
        </div>
      </div>
      <div class="row justify-content-md-center mt-5">
        <div class="col-md-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/views/navbar.vue";

  export default{
    name:'app',
    components:{Navbar}
  }
</script>
