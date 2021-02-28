<template>
  <div class="container">
    <h2 class="text-center mb-5">Edit Data Mahasiswa</h2>
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <form @submit.prevent="updateData()">
          <div class="form-group">
            <label for="nim">Nomor Induk Mahasiswa</label>
            <input type="text" class="form-control" id="nim" placeholder="Masukan nomor induk mahasiswa" v-model="mahasiswas.nim">
          </div>
          <div class="form-group">
            <label for="nama">Nama Lengkap</label>
            <input type="text" class="form-control" id="nama" placeholder="Masukan nama lengkap anda" v-model="mahasiswas.name">
          </div>
          <div class="form-group">
            <label for="kota">Kota Asal</label>
            <input type="text" class="form-control" id="kota" placeholder="Masukan kota asal anda" v-model="mahasiswas.city">
          </div>
          <div class="form-group">
            <label for="jurusan">Jurusan</label>
            <select class="custom-select input-user" id="jurusan" v-model="mahasiswas.jurusan">
              <option v-for="(study, indeks) in mahasiswas.studys" :key="indeks" :value="study.values">{{study.text}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="ipk">IPK</label>
            <input type="text" class="form-control" id="ipk" placeholder="Masukan IPK terakhir anda" v-model.number="mahasiswas.ipk">
          </div>
          <button type="submit" class="btn btn-primary mt-3 edit-data">Edit Data</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
  import {db} from "../firebaseDB.js";

  export default{
    name:'edit_data',
    data(){
      return{
        mahasiswas:{}
      }
    },
    created(){
      db.collection("datamahasiswa").where("nim", "==", this.$route.params.nim).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.mahasiswas = doc.data();
          })
        })
        .catch(err => console.log(err.message));
    },
    methods:{
      updateData(){
        db.collection("datamahasiswa").where("nim", "==", this.$route.params.nim).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update(this.mahasiswas)
                .then(() => {
                  alert("data berhasil di update");
                  this.$router.replace({name:'List'});
                })
                .catch(() => alert("data gagal di update"));
            })
          })
          .catch(err => console.log(err.message));
      }
    }
  }
</script>

<style lang="css" scoped>
  .form-group #add-photo{
      margin-left: 15px;
      width: 50%;
  }

  .edit-data{
    width: 100%;
    margin-bottom: 35px;
  }
</style>
