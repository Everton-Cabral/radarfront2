// src/store/index.js
import { store } from "quasar/wrappers";
import { createStore } from "vuex";

export default store(function () {
  return createStore({
    state: {
      enderecoIp: "18.229.142.48",
      carros: [],
      idCarroEdit: "",
    },
    mutations: {
      atualizarIdCarroEdit(state, params) {
        state.idCarroEdit = params;
      },
    },
    actions: {
      getCarros(context) {
        fetch(`http://${context.state.enderecoIp}:3000/api/carros`)
          .then((response) => response.json())
          .then((data) => (context.state.carros = data))
          .catch((error) => console.error("Erro ao buscar carros:", error));
      },

      filterCarro(context, params) {
        const url = `http://${
          context.state.enderecoIp
        }:3000/api/carros/filtrado?${params.toString()}`;

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
      },

      deleteCarro(context, params) {
        const url = `http://${context.state.enderecoIp}:3000/api/carros/?id=${params}`;

        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            this.$router.go();
          })
          .catch((error) => console.error("Erro ao buscar carros:", error));
      },

      updateCarro(context, params) {
        const url = `http://${context.state.enderecoIp}:3000/api/carros/${context.state.idCarroEdit}`;
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Carro atualizado com sucesso!");
              this.$router.push("/");
            } else {
              console.error("Erro ao atualizar o carro:", response.status);
            }
          })
          .catch((error) => {
            console.error("Erro ao realizar a requisição PUT:", error);
          });
      },
    },
    getters: {
      // Seus getters aqui
    },
  });
});
