// src/store/index.js
import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';

export default store(function () {
  return createStore({
    state: {
      idCarroEdit:''
    },
    mutations: {
      atualizarIdCarroEdit(state, params) {
        state.idCarroEdit = params;
      }
    },
    actions: {
      // Suas actions aqui
    },
    getters: {
      // Seus getters aqui
    }
  });
});
