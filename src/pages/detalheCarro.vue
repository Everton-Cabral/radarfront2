<template>
  <div class="container">
    <div class="car-info-container-left">
      <div class="car-info">
        <div class="info-label">Placa:</div>
        <div class="info-value">{{ carro.placa }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">Modelo:</div>
        <div class="info-value">{{ carro.modelo }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">KM:</div>
        <div class="info-value">{{ carro.km }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">Situação:</div>
        <div class="info-value">{{ carro.situacao }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">Cliente:</div>
        <div class="info-value">{{ carro.cliente }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">Órgão:</div>
        <div class="info-value">{{ carro.orgao }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">Entrada:</div>
        <div class="info-value">
          {{ formatarDataEntrada(carro.dataentrada) }}
        </div>
      </div>
    </div>
    <!-- Senha de segurança-->
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
            Para inserir mais informações após o envio do orçamento, digite a
            senha de segurança.
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-input v-model="senha" filled type="password" label="Senha" />
            <q-btn flat label="OK" @click="maisOrcamento()" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="car-info-container-right">
      <div class="car-obs">
        <div class="info-label">Demanda de Serviço:</div>
        <div class="obs-value" style="flex: 1; overflow: auto">
          {{ carro.obs }}
        </div>
      </div>

      <div class="car-obs">
        <div class="info-label">
          Orçamento:
          <em
            v-if="carro.fezorcamento == false || this.acesso == true"
            @click="adicionarInformacoes()"
            >Adicionar Informações</em
          >
        </div>

        <div class="obs-value" style="flex: 1; overflow: auto">
          {{ carro.orcamento }}
        </div>
        <div
          class="info-label"
          v-if="carro.fezorcamento == true && this.acesso == false"
          style="margin-top: 10px"
        >
          Orçamento Enviado
          <q-icon name="check" style="font-size: 30px" color="green" />
          <div class="info-label">
            <em @click="persistent = true">Adicionar Informações</em>
          </div>
        </div>
      </div>

      <div v-if="carro.fezorcamento == false || this.acesso == true">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          class="buttonUpload"
        />
        <button @click="uploadFile(carro._id)" class="buttonUpload">
          Enviar Evidência
        </button>
      </div>

      <div class="arquivos">
        <!-- Exibição de Imagens -->
        <div class="containerImagens">
          <h5 class="info-label">Imagens</h5>
          <q-scroll-area
            style="height: 300px; max-width: 250px"
            class="cardFiles"
          >
            <div class="image-container">
              <div v-for="(imagem, i) in carro.imagens" :key="i">
                <a :href="imagem" target="_blank">
                  <img class="car-image" :src="imagem" alt="Imagem do Carro" />
                </a>
                <div class="excluirImagem" @click="excluirImagem(i)">
                  <q-icon name="closed" />
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>

        <!-- Exibição de Videos -->
        <div class="containerVideos">
          <h5 class="info-label">Videos</h5>
          <q-scroll-area
            style="height: 300px; max-width: 300px"
            class="cardFiles"
          >
            <div v-for="(video, i) in carro.videos" :key="i">
              <q-video :src="video" style="width: 95%; height: 400px" />

              <div class="excluirVideo" @click="excluirVideo(i)">
                <q-icon name="closed" />
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>

    <!-- Modal para inserir mais informações no orçamento -->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Adicionar Orçamento</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <textarea
            name="orcamento"
            cols="40"
            rows="10"
            v-model="orcamento"
          ></textarea>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Salvar" v-close-popup @click="updateCarro()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      carro: [],
      selectedFile: null,
      prompt: false,
      orcamento: "",
      persistent: false,
      senha: "",
      senhacorreta: "1234",
      acesso: false,
    };
  },

  computed: {
    ...mapState(["idCarroDetalhe", "enderecoIp"]),
  },
  methods: {
    maisOrcamento() {
      if (this.senha === this.senhacorreta) {
        this.acesso = true;
      } else {
        alert("Senha Incorreta");
      }
    },
    chamarCarroDetalhe() {
      const url = `http://${this.enderecoIp}:3000/api/carros/update?id=${this.idCarroDetalhe}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.carro = data;
        })
        .catch((error) => console.error("Erro ao buscar carros:", error));
    },
    handleFileChange() {
      this.selectedFile = this.$refs.fileInput.files[0];
    },

    async uploadFile(params) {
      try {
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        console.log("Arquivo anexado ao FormData:", formData.get("file"));

        const response = await fetch(
          `http://localhost:3000/api/carros/upload/${params}`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const data = await response.json();

          console.log("Upload bem-sucedido=>:", data);

          const tipoArquivo = this.selectedFile.type.split("/")[0];

          if (tipoArquivo === "image") {
            this.carro.imagens = data.imagens;
          } else if (tipoArquivo === "video") {
            this.carro.videos = data.videos;
          }
        } else {
          console.error("Falha no upload. Status:", response.status);
        }
      } catch (error) {
        console.error("Erro durante a requisição:", error);
      }
    },

    adicionarInformacoes() {
      this.prompt = true;
      this.orcamento = this.carro.orcamento;
    },
    updateCarro() {
      this.$store.commit("atualizarIdCarroEdit", this.carro._id);
      this.carro.orcamento = this.orcamento;
      this.$store.dispatch("updateCarro", this.carro);
    },
    excluirObjetoPorIndice(array, indiceParaRemover) {
      return array.filter((_, index) => index !== indiceParaRemover);
    },
    excluirImagem(params) {
      this.$store.commit("atualizarIdCarroEdit", this.carro._id);
      this.carro.imagens = this.excluirObjetoPorIndice(
        this.carro.imagens,
        params
      );
      this.$store.dispatch("updateCarro", this.carro);
    },
    excluirVideo(params) {
      this.$store.commit("atualizarIdCarroEdit", this.carro._id);
      this.carro.videos = this.excluirObjetoPorIndice(
        this.carro.videos,
        params
      );
      this.$store.dispatch("updateCarro", this.carro);
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
  },
  mounted() {
    this.chamarCarroDetalhe();
  },
};
</script>
<style scoped>
.container {
  display: flex;
}
.car-info-container-left {
  margin: 20px;
  display: flex;
  flex-direction: column;
}

.car-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  width: 200px;
  margin: 10px;
}

.info-label {
  font-weight: bold;
  color: #4a90e2; /* Azul mais escuro */
}

.info-value {
  flex: 1;
  margin-left: 10px;
  color: #555;
}

.car-obs {
  margin: 10px;
}

.obs-value {
  overflow: auto; /* Adicionado para permitir rolagem */
  max-height: 100px; /* Adicione um valor máximo de altura para controlar a exibição */
  background-color: #f5f5f5; /* Cor de fundo mais clara */
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-style: italic;
}
.car-info-container-right {
  margin: 20px;
  display: flex;
  flex-direction: column;
  width: 80%;
}

/* Estilo para a área de exibição de imagens */
.q-ma-md {
  margin-top: 20px;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; /* Distribui as imagens uniformemente na linha */
}

.car-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: transform 0.2s; /* Adiciona uma transição suave ao passar o mouse */
}

.car-image:hover {
  transform: scale(1.1); /* Aumenta um pouco o tamanho ao passar o mouse */
}
.arquivos {
  display: flex;
  width: 100%;
}
.containerImagens {
  width: 40%;
}
.containerVideos {
  width: 60%;
}
em {
  text-decoration: underline;
  font-style: italic;
  opacity: 0.5;
}
em:hover {
  cursor: pointer;
}
.cardFiles {
  border: solid rgb(187, 181, 181) 0.5px;
  border-radius: 10px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.3);
}
.excluirImagem {
  position: absolute;
  margin: -115px 0px 0px 20px;
  color: white;
  font-size: 20px;
}
.excluirImagem:hover {
  cursor: pointer;
}
.excluirVideo {
  position: absolute;
  margin: -400px 0px 0px 15px;
  color: white;
  font-size: 20px;
}
.excluirVideo:hover {
  cursor: pointer;
}
</style>
