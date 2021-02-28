<template>
  <div class="container">
    <h2 class="text-center mb-5">Tambah Data Mahasiswa</h2>
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <form @submit.prevent="addData()">
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
          <button type="submit" class="btn btn-primary mt-3 add-data">Tambah Data</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {db} from "../firebaseDB.js";
  export default{
    name:'create-data',
    data(){
      return{
        mahasiswas:{
          studys:[
            {text:'Teknik Informatika', values:'Teknik Informatika'},
            {text:'Teknik Mesin', values:'Teknik Mesin'},
            {text:'Teknik Sipil', values:'Teknik Sipil'},
            {text:'Teknik Lingkunga', values:'Teknik Lingkunga'},
            {text:'Teknik Elektro', values:'Teknik Elektro'},
            {text:'Teknik Kimia', values:'Teknik Kimia'},
            {text:'Teknik Fisika', values:'Teknik Fisika'},
          ]
        }
      }
    },
    methods:{
      addData(){
        db.collection("datamahasiswa").add(this.mahasiswas)
          .then(() => {
            alert("data berhasil ditambahkan");
            this.mahasiswas.nim = "";
            this.mahasiswas.name = "";
            this.mahasiswas.city = "";
            this.mahasiswas.jurusan = "";
            this.mahasiswas.ipk = 0;
            this.$router.replace({name:'List'});
          })
          .catch(err => console.log(err.message));
      },
      showModalButton(){
        return true;
      }
    }
  }
</script>


<style lang="css" scoped>
  .form-group #add-photo{
      margin-left: 15px;
      width: 50%;
  }

  .add-data{
    width: 100%;
    margin-bottom: 35px;
  }
</style>
