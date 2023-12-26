<template>
  <q-page class="container">
    <div class="grupo-form">
      <q-input class="input" v-model="carro.placa" label="Placa" />
      <q-input class="input" v-model="carro.modelo" label="Modelo" />
      <q-input class="input" v-model="carro.km" label="km" />
    </div>

    <div class="grupo-form">
      <q-select
        class="input"
        v-model="carro.situacao"
        :options="optionsSituacao"
        label="Situação"
      />
      <q-input class="input" v-model="carro.cliente" label="Cliente" />
      <q-input class="input" v-model="carro.orgao" label="Orgão" />
    </div>

    <div class="grupo-form">
      <q-input
        filled
        type="date"
        v-model="carro.dataentrada"
        class="input"
        label="Data de Entrada"
      />
      <q-input
        filled
        type="textarea"
        v-model="carro.obs"
        class="input"
        label="Observações"
      />
    </div>

    <div>
      <q-btn
        color="red"
        icon-right="send"
        label="Salvar Alterações"
        @click="atualizarCarro()"
      />
    </div>
    <div class="q-pa-md"></div>
  </q-page>
</template>

<script>
import { data } from "autoprefixer";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "editarCarros",

  data() {
    return {
      carro: [],
      servidor: "18.229.142.48",
      optionsSituacao: [
        "APROVADO",
        "AGUARDANDO",
        "PRONTO",
        "RESERVA",
        "EM SERVIÇO",
        "DESCONHECIDO",
      ],
    };
  },
  computed: {
    ...mapState(["idCarroEdit", "enderecoIp"]),
  },
  methods: {
    filtro() {
      const url = `http://${this.enderecoIp}:3000/api/carros/update?id=${this.idCarroEdit}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.carro = data;
          console.log(data);
        })
        .catch((error) => console.error("Erro ao buscar carros:", error));
    },

    atualizarCarro() {
      const carro = {
        placa: this.carro.placa,
        modelo: this.carro.modelo,
        km: this.carro.km,
        situacao: this.carro.situacao,
        cliente: this.carro.cliente,
        dataentrada: this.carro.dataentrada,
        obs: this.carro.obs,
        orgao: this.carro.orgao,
      };

      this.$store.dispatch("updateCarro", carro);
      this.$router.push("/");
    },
  },

  watch: {
    "carro.placa"(newText) {
      this.carro.placa = newText.toUpperCase();
    },
    "carro.modelo"(newText) {
      this.carro.modelo = newText.toUpperCase();
    },
    "carro.cliente"(newText) {
      this.carro.cliente = newText.toUpperCase();
    },
  },
  mounted() {
    this.filtro();
  },
});
</script>
<style scoped>
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.input {
  margin: 25px 35px 35px 35px;
}

.grupo-form {
  display: flex;
  justify-content: space-around;
}
.grupo-form-footer {
  display: flex;
  justify-content: space-between;
  border: solid;
}
</style>
