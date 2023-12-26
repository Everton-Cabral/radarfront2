<template>
  <div>
    <div class="container">
      <h5>Orçamentos</h5>
      <div class="filtro">
        <q-input
          v-model="placa"
          filled
          label="PLACA"
          type="search"
          class="form"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-input
          v-model="modelo"
          filled
          label="MODELO"
          type="search"
          class="form"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-input
          v-model="cliente"
          filled
          label="CLIENTE"
          type="search"
          class="form"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-input
          filled
          type="date"
          v-model="entrada"
          label="ENTRADA"
          class="form"
        />
        <q-input
          filled
          type="date"
          v-model="saida"
          label="SAÍDA"
          class="form"
        />
      </div>
      {{ this.entrada }}
      {{ this.saida }}
      <div class="tabelaFixa">
        <table class="tabela">
          <thead>
            <tr>
              <th class="text-center">FICHA</th>
              <th class="text-center">PLACA</th>
              <th class="text-center">MODELO</th>
              <th class="text-center">CLIENTE</th>
              <th class="text-center">DATA ENTRADA</th>
              <th class="text-center">DATA SAÍDA</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="carro in carroFiltrado"
              :key="carro._id"
              style="height: 10px"
            >
              <td class="text-center">
                <q-btn icon="folder_open" @click="fichaCarro(carro._id)" />
              </td>
              <td class="text-center">{{ carro.placa }}</td>
              <td class="text-center">{{ carro.modelo }}</td>
              <td class="text-center">{{ carro.cliente }}</td>
              <td class="text-center">{{ formatarData(carro.dataentrada) }}</td>
              <td class="text-center">{{ formatarData(carro.datasaida) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      placa: "",
      modelo: "",
      cliente: "",
      entrada: "",
      saida: "",
    };
  },
  computed: {
    ...mapState(["carrosOrcamento"]),
    carroFiltrado() {
      if (this.placa) {
        return this.carrosOrcamento.filter((carro) =>
          carro.placa.includes(this.placa)
        );
      } else if (this.modelo) {
        return this.carrosOrcamento.filter((carro) =>
          carro.modelo.includes(this.modelo)
        );
      } else if (this.cliente) {
        return this.carrosOrcamento.filter((carro) =>
          carro.cliente.includes(this.cliente)
        );
      } else if (this.entrada) {
        const dataEntrada = this.entrada;
        return this.carrosOrcamento.filter((carro) =>
          carro.dataentrada
            ? carro.dataentrada.slice(0, 10) === dataEntrada
            : false
        );
      } else if (this.saida) {
        const dataSaida = this.saida;
        return this.carrosOrcamento.filter((carro) =>
          carro.datasaida ? carro.datasaida.slice(0, 10) === dataSaida : false
        );
      } else {
        return this.carrosOrcamento;
      }
    },
  },
  methods: {
    formatarData(data) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC",
      };
      if (!data) {
        return "Na Oficina";
      }
      return new Date(data).toLocaleDateString("pt-BR", options);
    },

    fichaCarro(params) {
      const ficha =
        this.carrosOrcamento.find((carro) => carro._id === params) || null;
      this.$store.commit("selecionandoFicha", ficha);
      this.$router.push("/fichaorcamento");
    },
  },
  watch: {
    placa(newText) {
      this.placa = newText.toUpperCase();
      this.modelo = "";
      this.cliente = "";
      this.entrada = "";
      this.saida = "";
    },
    modelo(newText) {
      this.modelo = newText.toUpperCase();
      this.cliente = "";
      this.placa = "";
      this.entrada = "";
      this.saida = "";
    },
    cliente(newText) {
      this.cliente = newText.toUpperCase();
      this.placa = "";
      this.modelo = "";
      this.entrada = "";
      this.saida = "";
    },
    entrada() {
      this.cliente = "";
      this.placa = "";
      this.modelo = "";
      this.saida = "";
    },
    saida() {
      this.cliente = "";
      this.placa = "";
      this.modelo = "";
      this.entrada = "";
    },
  },

  mounted() {
    this.$store.dispatch("getCarrosOrcamento");
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.filtro {
  display: flex;
  justify-content: center;
}
.form {
  margin: 10px;
}
.tabelaFixa {
  max-height: 70vh; /* Ajuste conforme necessário */
  width: 98%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.tabelaFixa thead {
  position: sticky;
  top: 0;
  background-color: #f5f5f5; /* Cor de fundo do cabeçalho fixo */
  z-index: 1;
}

.tabelaFixa th {
  text-align: center;
}
tr:hover {
  background-color: #1817171c;
}
tr {
  height: 30px; /* Ajuste a altura conforme necessário */
}
</style>
