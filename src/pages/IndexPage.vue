<template>
  <q-page class="container">
    <div class="filtro">
      <q-input borderless v-model="placaFiltro" label="PLACA" />
      <q-input borderless v-model="modeloFiltro" label="MODELO" />
      <q-input borderless v-model="clienteFiltro" label="CLIENTE" />
      <q-input borderless v-model="situacaoFiltro" label="SITUAÇÃO" />
      <q-icon name="search" class="lupa" @click="filtro()" />
      <q-icon
        name="refresh"
        class="lupa"
        color="green"
        @click="chamarCarros()"
      />
    </div>

    <!-- checagem de delete -->
    <div class="q-pa-md q-gutter-sm">
      <q-dialog
        v-model="persistent"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="bg-teal text-white" style="width: 300px">
          <q-card-section>
            <div class="text-h6">Atenção</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Você tem certeza que o carro está saindo da oficina?
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn flat label="NÃO" v-close-popup />
            <q-btn flat label="SIM" @click="exitCarro()" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="tabelaFixa">
      <table class="tabela">
        <thead>
          <tr>
            <th class="text-center">INFO</th>
            <th class="text-center">EDITAR</th>
            <th class="text-center">PLACA</th>
            <th class="text-center">MODELO</th>
            <th class="text-center">CLIENTE</th>
            <th class="text-center">SITUAÇÃO</th>
            <th class="text-center">ORGÃO</th>

            <th class="text-center">SAIR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="carro in carroFiltrado" :key="carro._id">
            <td class="text-center" @click="detalheCarro(carro._id)">
              <q-icon name="add" class="editar" />
            </td>
            <td class="text-center" @click="editarCarros(carro._id)">
              <q-icon name="edit" class="editar" />
            </td>
            <td class="text-center">{{ carro.placa }}</td>
            <td class="text-center">{{ carro.modelo }}</td>
            <td class="text-center">{{ carro.cliente }}</td>
            <td class="text-center">
              {{ carro.situacao }}
              <q-icon
                v-if="carro.situacao === 'EM SERVIÇO'"
                name="construction"
                class="emServicoIcon"
              ></q-icon>
              <q-icon
                v-if="carro.situacao === 'AGUARDANDO'"
                name="cancel"
                class="aguardandoIcon"
              ></q-icon>
              <q-icon
                v-if="carro.situacao === 'DESCONHECIDO'"
                name="help"
                class="desconhecidoIcon"
              ></q-icon>
              <q-icon
                v-if="carro.situacao === 'PRONTO'"
                name="check"
                class="prontoIcon"
              >
              </q-icon>
            </td>
            <td class="text-center">{{ carro.orgao }}</td>

            <td class="text-center" @click="checarDelete(carro._id)">
              <q-icon name="logout" class="sair" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <q-dialog
      v-model="ativardetalhe"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="card">
        <q-card-section>
          <div class="text-h7">
            <div class="sessa-detalhe">
              <strong class="item-detalhe-carro"
                >PLACA: {{ carroDetalhe.placa }}</strong
              >
              <strong class="item-detalhe-carro"
                >MODELO: {{ carroDetalhe.modelo }}</strong
              >
              <strong class="item-detalhe-carro"
                >KM: {{ carroDetalhe.km }}</strong
              >
            </div>

            <div class="sessa-detalhe">
              <strong class="item-detalhe-carro"
                >CLIENTE: {{ carroDetalhe.cliente }}</strong
              >
              <strong class="item-detalhe-carro"
                >SITUAÇÃO: {{ carroDetalhe.situacao }}</strong
              >
            </div>

            <div class="sessa-detalhe">
              <strong class="item-detalhe-carro"
                >ORGÃO: {{ carroDetalhe.orgao }}</strong
              >
              <strong class="item-detalhe-carro"
                >ENTRADA:
                {{ formatarDataEntrada(carroDetalhe.dataentrada) }}</strong
              >
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <strong class="item-detalhe-carro" style="font-size: 12px"
            >OBSERVAÇÕES: {{ carroDetalhe.obs }}</strong
          >
        </q-card-section>

        <div>
          <input type="file" ref="fileInput" @change="handleFileChange" />
          <button @click="uploadFile(carroDetalhe._id)">Enviar Arquivo</button>
        </div>

        <div class="q-ma-md">
          <q-scroll-area style="height: 200px; max-width: 300px">
            <div
              class="containerImagens"
              v-for="(imagem, i) in carroDetalhe.imagens"
              :key="i"
            >
              <a :href="imagem">
                <img class="imagensCarro" :src="imagem" alt="" />
              </a>
            </div>
          </q-scroll-area>
        </div>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="FECHAR" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "IndexPage",

  data() {
    return {
      placaFiltro: "",
      modeloFiltro: "",
      clienteFiltro: "",
      situacaoFiltro: "",
      persistent: false,
      ativardetalhe: false,
      idCarroDelete: "",
      servidor: "18.229.142.48",
      carroDetalhe: [],
      selectedFile: null,
    };
  },
  computed: {
    ...mapState(["carros"]),
    carroFiltrado() {
      if (this.placaFiltro) {
        return this.carros.filter((carro) =>
          carro.placa.includes(this.placaFiltro)
        );
      } else if (this.modeloFiltro) {
        return this.carros.filter((carro) =>
          carro.modelo.includes(this.modeloFiltro)
        );
      } else if (this.clienteFiltro) {
        return this.carros.filter((carro) =>
          carro.cliente.includes(this.clienteFiltro)
        );
      } else if (this.situacaoFiltro) {
        return this.carros.filter((carro) =>
          carro.situacao.includes(this.situacaoFiltro)
        );
      } else return this.carros;
    },
  },
  methods: {
    handleFileChange() {
      this.selectedFile = this.$refs.fileInput.files[0];
    },

    async uploadFile(params) {
      try {
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        console.log("Arquivo anexado ao FormData:", formData.get("file"));

        const response = await fetch(
          `http://${servidor}:3000//api/carros/upload/${params}`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Upload bem-sucedido=>:", data);
          this.carroDetalhe.imagens = data.imagens;
          await this.chamarCarros();
        } else {
          console.error("Falha no upload. Status:", response.status);
        }
      } catch (error) {
        console.error("Erro durante a requisição:", error);
      }
    },
    formatarDataEntrada(data) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC",
      };
      return new Date(data).toLocaleDateString("pt-BR", options);
    },

    filtro() {
      const params = new URLSearchParams({
        placa: this.placaFiltro,
        modelo: this.modeloFiltro,
        cliente: this.clienteFiltro,
        situacao: this.situacaoFiltro,
      });

      this.$store.dispatch("filterCarro", params);
    },

    chamarCarros() {
      this.$store
        .dispatch("getCarros")
        .then(
          (this.placaFiltro = ""),
          (this.modeloFiltro = ""),
          (this.clienteFiltro = ""),
          (this.situacaoFiltro = "")
        );
    },

    checarDelete(params) {
      this.persistent = true;
      this.idCarroDelete = params;
    },

    exitCarro() {
      this.$store.dispatch("exitCarro", this.idCarroDelete);
    },
    editarCarros(params) {
      this.$store.commit("atualizarIdCarroEdit", params);
      this.$router.push("/editar");
    },
    detalheCarro(params) {
      this.$store.commit("atualizarIdCarroDetalhe", params);
      this.$router.push("/detalhe");
    },
  },

  watch: {
    placaFiltro(newText) {
      this.placaFiltro = newText.toUpperCase();
      this.modeloFiltro = "";
      this.clienteFiltro = "";
      this.situacaoFiltro = "";
    },
    modeloFiltro(newText) {
      this.modeloFiltro = newText.toUpperCase();
      this.placaFiltro = "";
      this.clienteFiltro = "";
      this.situacaoFiltro = "";
    },
    clienteFiltro(newText) {
      this.clienteFiltro = newText.toUpperCase();
      this.placaFiltro = "";
      this.situacaoFiltro = "";
      this.modeloFiltro = "";
    },
    situacaoFiltro(newText) {
      this.situacaoFiltro = newText.toUpperCase();
      this.modeloFiltro = "";
      this.clienteFiltro = "";
      this.placaFiltro = "";
    },
  },
  mounted() {
    this.chamarCarros();
  },
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
}
.tabela {
  width: 98%;
  margin-top: 0px;
}
.filtro {
  display: flex;
}
.lupa {
  font-size: 40px;
  margin: 10px;
}
.lupa:hover {
  cursor: pointer;
}
.sair {
  font-size: 20px;
  color: red;
}
.sair:hover {
  cursor: pointer;
}
.editar {
  color: blue;
  font-size: 20px;
}
.editar:hover {
  cursor: pointer;
}
.limparFiltro {
  height: 35px;
  background-color: #b71c1c;
  color: white;
  border-radius: 10px;
  border: none;
  margin-left: 50px;
}
.limparFiltro:hover {
  cursor: pointer;
}
tr:hover {
  background-color: #928c8c1c;
}

.item-detalhe-carro {
  margin: 10px;
  display: flex;
  justify-content: space-around;
}
.sessa-detalhe {
  display: flex;
  justify-content: center;
}
.modal-detalhe {
  background: linear-gradient(45deg, #f5f5f5, #e0e0e0);
  color: #333; /* Cor de texto padrão */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Sombra sutil para o texto */
  /* Adição de borda com efeito de profundidade */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.tabelaFixa {
  height: 70vh; /* Ajuste conforme necessário */
  width: 98%;
  overflow-y: auto;
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

.prontoIcon {
  color: green;
  font-size: 25px;
}
.aguardandoIcon {
  color: red;
  font-size: 20px;
}
.desconhecidoIcon {
  color: grey;
  font-size: 20px;
}
.emServicoIcon {
  color: orange;
  font-size: 25px;
}
.containerImagens {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.imagensCarro {
  height: 200px;
  width: 300px;
}
.card {
  width: 50% !important;
  height: 800px;
}
</style>
