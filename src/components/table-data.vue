<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-10 bg-light p-1">
        <h2 class="text-left ml-3 text-black text-center">Tabel Data Mahasiswa</h2>
      </div>
    </div>
    <div class="row justify-content-md-between mt-4 create-data">
      <div class="col-md-10">
        <div class="input-group mb-3 search-input">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" v-model="keywords" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Search Data">
        </div>
      </div>
      <div class="col-md-2">
        <router-link to="/create" class="btn btn-primary rounded-circle"><i class="fas fa-plus plus-fonted"></i></router-link>
      </div>
    </div>
    <div class="row justify-content-md-center mt-5">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">NIM</th>
              <th scope="col">Nama Lengkap</th>
              <th scope="col">Kota Asal</th>
              <th scope="col">Jurusan</th>
              <th scope="col">IPK</th>
              <th scope="col">Keterangan</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mahasiswa in filteredData" :key="mahasiswa.key">
              <th scope="row">{{mahasiswa.nim}}</th>
              <td>{{mahasiswa.name}}</td>
              <td>{{mahasiswa.city}}</td>
              <td>{{mahasiswa.jurusan}}</td>
              <td id="ipk">{{mahasiswa.ipk}}</td>
              <td>{{mahasiswa.keterangan()}}</td>
              <td>
                <router-link :to="'/edit/'+mahasiswa.nim" class="btn btn-secondary">Edit Data</router-link>
                <button type="button" name="button" class="btn btn-danger ml-3" @click="deleteData(mahasiswa.nim)">Delete Data</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {db}  from "../firebaseDB.js";
  export default{
    name:'table-data',
    data(){
      return{
        mahasiswas:[],
        keywords:""
      }
    },
    computed:{
      filteredData(){
        return this.mahasiswas.filter(mahasiswa => {
          return mahasiswa.name.toLowerCase().includes(this.keywords);
        })
      }
    },
    created(){
      db.collection("datamahasiswa").orderBy("nim").onSnapshot(querySnapshot => {
        this.mahasiswas = [];
        querySnapshot.forEach(doc => {
          const dokumen = new Map();
          dokumen.set("key", doc.id);
          dokumen.set("nim", doc.data().nim);
          dokumen.set("name", doc.data().name);
          dokumen.set("city", doc.data().city);
          dokumen.set("jurusan", doc.data().jurusan);
          dokumen.set("ipk", doc.data().ipk);
          dokumen.set("keterangan", function(){
            if (doc.data().ipk < 3.0){
              return "Anda Gagal Sidang";
            }else{
              return "Anda Lulus Sidang";
            }
          });

          return this.mahasiswas.push(Object.fromEntries(dokumen));
        });
      });
    },
    methods:{
      deleteData(id){
        if (window.confirm("Apakah anda ingin hapus data ini ?")){
          db.collection("datamahasiswa").where("nim", "==", id).get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete().then(() => {
                  alert("data berhasil dihapus");
                })
                .catch(err => console.log(err.message));
              })
            })
            .catch(err => console.log(err.message));
        }
      }
    }
  }
</script>

<style lang="css" scoped>

  .create{
    padding: 0 10px;
    width: 30%;
  }

  .danger-exam{
    color: red;
  }

  .search-input{
    width: 40%;
  }
</style>
