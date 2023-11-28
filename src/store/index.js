// src/store/index.js
import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';

export default store(function () {
  return createStore({
    state: {
      enderecoIp:'18.229.142.48',
      carros:[],
      idCarroEdit:''
    },
    mutations: {
      atualizarIdCarroEdit(state, params) {
        state.idCarroEdit = params;
      }
    },
    actions: {

      getCarros(context){
        fetch(`http://${context.state.enderecoIp}:3000/api/carros`)
        .then((response) => response.json())
        .then((data) => context.state.carros = data)
        .catch((error) => console.error("Erro ao buscar carros:", error));
      },
      filterCarro(context, params){

        const url = `http://${context.state.enderecoIp}:3000/api/carros/filtrado?${params.toString()}`;

        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            context.state.carros = data;
          })
          .catch((error) => console.error("Erro ao buscar carros:", error));
        }
    },
    getters: {
      // Seus getters aqui
    }
  });
});
