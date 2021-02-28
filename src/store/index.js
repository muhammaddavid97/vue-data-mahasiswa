import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    user:{
      loggedIn:false, //state ini digunakan untuk mengetahui user sedang login atau tidak
      data:null //state ini digunakan untuk menampung informasi dari user seperti username dan email
    }
  },
  getters:{
    user: state => state.user
  },
  mutations:{
    SET_LOGGED_IN : (state, value) => {
      state.user.loggedIn = value
    },
    SET_USER : (state, data) => {
      state.user.data = data
    }
  },
  actions: {
    FETCH_USER : ({commit}, user) => {
      //jika ada user yang sedang login maka simpan perubahan
      //SET_LOGGED_IN dnegna nilai !== null
      commit(`SET_LOGGED_IN`, user !== null);

      if (user){
        //menyimpan informasi pengguna yang sudah login
        commit(`SET_USER`, {
          displayName: user.displayName, //menampilkan informasi dari username user
          email: user.email //menampilkan informasi dari email user
        })
      }else{
        commit(`SET_USER`, null);
      }
    }
  },
  modules: {
  }
})
