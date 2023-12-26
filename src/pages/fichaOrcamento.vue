<template>
  <div class="container">
    <!-- Confirmação do envio do Orçamento-->
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
            Você tem certeza que enviou o orçamento?
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn flat label="NÃO" v-close-popup />
            <q-btn
              flat
              label="SIM"
              @click="checkOrcamento(fichaHistorico._id)"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="car-info-container-left">
      <div class="car-info">
        <div class="info-label">Entrada:</div>
        <div class="info-value">
          {{ formatarData(fichaHistorico.dataentrada) }}
        </div>
      </div>

      <div class="car-info">
        <div class="info-label">Saída</div>
        <div class="info-value">
          {{ formatarData(fichaHistorico.datasaida) }}
        </div>
      </div>
      <div class="car-info">
        <div class="info-label">Placa:</div>
        <div class="info-value">{{ fichaHistorico.placa }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">Modelo:</div>
        <div class="info-value">{{ fichaHistorico.modelo }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">KM:</div>
        <div class="info-value">{{ fichaHistorico.km }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">Situação:</div>
        <div class="info-value">{{ fichaHistorico.situacao }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">Cliente:</div>
        <div class="info-value">{{ fichaHistorico.cliente }}</div>
      </div>

      <div class="car-info">
        <div class="info-label">Órgão:</div>
        <div class="info-value">{{ fichaHistorico.orgao }}</div>
      </div>
    </div>

    <div class="car-info-container-right">
      <div class="car-obs">
        <div class="info-label">Demanda de Serviço:</div>
        <div class="obs-value" style="flex: 1; overflow: auto">
          {{ fichaHistorico.obs }}
        </div>
      </div>
      <div class="car-obs">
        <div class="info-label">Orçamento:</div>
        <div class="obs-value" style="flex: 1; overflow: auto">
          {{ fichaHistorico.orcamento }}
        </div>
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
              <div v-for="(imagem, i) in fichaHistorico.imagens" :key="i">
                <a :href="imagem" target="_blank">
                  <img class="car-image" :src="imagem" alt="Imagem do Carro" />
                </a>
              </div>
            </div>
          </q-scroll-area>
        </div>

        <div class="containerVideos">
          <h5 class="info-label">Videos</h5>
          <q-scroll-area
            style="height: 300px; max-width: 300px"
            class="cardFiles"
          >
            <div v-for="(video, i) in fichaHistorico.videos" :key="i">
              <q-video :src="video" style="width: 95%; height: 400px" />
            </div>
          </q-scroll-area>
        </div>
      </div>
      <q-btn
        color="primary"
        icon="check"
        label="Orçamento Enviado"
        style="width: 300px; margin-top: 20px"
        @click="persistent = true"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      persistent: false,
    };
  },
  computed: {
    ...mapState(["fichaHistorico"]),
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
    checkOrcamento(params) {
      this.$store.dispatch("checkOrcamento", params).then(() => {
        this.$router.push("/orcamento");
      });
    },
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
</style>
