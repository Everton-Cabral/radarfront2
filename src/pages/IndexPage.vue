<template>
  <q-page class="container">
    <div class="filtro">
      <q-input borderless v-model="placaFiltro" label="PLACA" />
      <q-input borderless v-model="modeloFiltro" label="MODELO" />
      <q-input borderless v-model="clienteFiltro" label="CLIENTE" />
      <q-input borderless v-model="situacaoFiltro" label="SITUAÇÃO" />
      <q-icon name="search" class="lupa" @click="filtro()" />
      <q-icon name="refresh" class="lupa" color="green" @click="chamarCarros()"/>
    </div>

    <!-- checagem de delete -->
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-teal text-white" style="width: 300px">
          <q-card-section>
            <div class="text-h6">Atenção</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Você tem certeza que deseja excluir o carro?
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn flat label="NÃO" v-close-popup />
            <q-btn flat label="SIM" @click="deletarCarros()" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

  <!--   detalhes do carro -->
  <div class="q-pa-md q-gutter-sm carro-detalhe">
      <q-dialog v-model="ativardetalhe" persistent transition-show="scale" transition-hide="scale">
        <q-card class=" modal-detalhe" style="width: 60%; height:70%; background-color:#ececec;">
          <q-card-section>
            <div class="text-h7">
              <div class="sessa-detalhe">
                <strong class="item-detalhe-carro">PLACA: {{ carroDetalhe.placa }}</strong>
                <strong class="item-detalhe-carro">MODELO: {{ carroDetalhe.modelo }}</strong>
                <strong class="item-detalhe-carro">KM: {{ carroDetalhe.km }}</strong>
              </div>

              <div class="sessa-detalhe">
                <strong class="item-detalhe-carro">CLIENTE: {{ carroDetalhe.cliente }}</strong>
                <strong class="item-detalhe-carro">SITUAÇÃO: {{ carroDetalhe.situacao }}</strong>
              </div>

              <div class="sessa-detalhe">
                <strong class="item-detalhe-carro">ORGÃO: {{ carroDetalhe.orgao }}</strong>
                <strong class="item-detalhe-carro">ENTRADA: {{ formatarDataEntrada(carroDetalhe.dataentrada) }}</strong>
              </div>

            </div>
          </q-card-section>

          <q-card-section>
            <strong class="item-detalhe-carro" style="font-size: 12px;">OBSERVAÇÕES: {{ carroDetalhe.obs }}</strong>
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn flat label="FECHAR" v-close-popup />
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
          <th class="text-center">DATA DE ENTRADA</th>
          <th class="text-center">SAIR</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="carro in carros" :key="carro._id">
          <td class="text-center" @click="detalheCarro(carro)">
            <q-icon name="add" class="editar" />
          </td>
          <td class="text-center" @click="editarCarros(carro._id)">
            <q-icon name="edit" class="editar" />
          </td>
          <td class="text-center">{{carro.placa}}</td>
          <td class="text-center">{{carro.modelo}}</td>
          <td class="text-center">{{carro.cliente}}</td>
          <td class="text-center">{{carro.situacao }}</td>
          <td class="text-center">{{carro.orgao}}</td>
          <td class="text-center">{{formatarDataEntrada(carro.dataentrada)}}</td>
          <td class="text-center" @click="checarDelete(carro._id)">
            <q-icon name="logout" class="sair" />
          </td>
        </tr>
      </tbody>
    </table>
</div>




  <!-- <q-markup-table :separator="separator" flat bordered class="tabela">
      <thead>
        <tr>
          <th class="text-center">INFO</th>
          <th class="text-center">EDITAR</th>
          <th class="text-center">PLACA</th>
          <th class="text-center">MODELO</th>
          <th class="text-center">CLIENTE</th>
          <th class="text-center">SITUAÇÃO</th>
          <th class="text-center">ORGÃO</th>
          <th class="text-center">DATA DE ENTRADA</th>
          <th class="text-center">SAIR</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="carro in carros" :key="carro._id">
            <td class="text-center" @click="detalheCarro(carro)">
              <q-icon name="add" class="editar" />
            </td>
            <td class="text-center" @click="editarCarros(carro._id)">
              <q-icon name="edit" class="editar" />
            </td>
            <td class="text-center">{{carro.placa}}</td>
            <td class="text-center">{{carro.modelo}}</td>

            <td class="text-center">{{carro.cliente}}</td>
            <td class="text-center">{{carro.situacao }}</td>
            <td class="text-center">{{carro.orgao}}</td>
            <td class="text-center">{{formatarDataEntrada(carro.dataentrada)}}</td>
            <td class="text-center"  @click="checarDelete(carro._id)">
              <q-icon name="logout" class="sair" />
            </td>


          </tr>
        </tbody>
    </q-markup-table> -->


  </q-page>
</template>
<style scoped>

.container{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
}
.tabela{
  width: 98%;
  margin-top: 0px;
}


.filtro{
  display: flex;

}

.lupa{
  font-size: 40px;
  margin: 10px;
}
.lupa:hover{
  cursor: pointer;
}
.sair{
  font-size: 20px;
  color: red;
}
.sair:hover{
  cursor: pointer;
}
.editar{
  color: blue;
  font-size: 20px;
}
.editar:hover{
  cursor: pointer;
}
.limparFiltro{
  height: 35px;
  background-color: #b71c1c;
  color: white;
  border-radius: 10px;
  border: none;
  margin-left: 50px;
}
.limparFiltro:hover{
  cursor: pointer;
}
tr:hover{
  background-color: #928c8c1c;
}
.carro-detalhe{
  display: flex;
  justify-content: space-around;
  align-items: center;

}
.item-detalhe-carro{
  margin: 10px;
  display: flex;
  justify-content: space-around;
}
.sessa-detalhe{
  display: flex;
  justify-content: center;
}
.modal-detalhe{
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

</style>
<script>
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'IndexPage',

  data(){
    return{
      carros: [],
      placaFiltro:'',
      modeloFiltro:'',
      clienteFiltro:'',
      situacaoFiltro:'',
      persistent: false,
      ativardetalhe: false,
      idCarroDelete: '',
      servidor:'18.229.142.48',
      carroDetalhe:[],

    }
  },
  computed:{

},
  methods:{

    formatarDataEntrada(data) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
      return new Date(data).toLocaleDateString('pt-BR', options);
    },

    filtro() {
      const queryParams = new URLSearchParams({
        placa: this.placaFiltro,
        modelo: this.modeloFiltro,
        cliente: this.clienteFiltro,
        situacao: this.situacaoFiltro,
      });

      const url = `http://${this.servidor}:3000/api/carros/filtrado?${queryParams.toString()}`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        this.carros = data;
      })
      .catch((error) => console.error("Erro ao buscar carros:", error));
    },

    chamarCarros(){
      fetch(`http://${this.servidor}:3000/api/carros`)
      .then((response) => response.json())
      .then((data) => this.carros = data)

      .then(
        this.placaFiltro='',
        this.modeloFiltro='',
        this.clienteFiltro='',
        this.situacaoFiltro=''
      )
      .catch((error) => console.error("Erro ao buscar carros:", error));
    },

    checarDelete(params){
      this.persistent = true
      this.idCarroDelete = params
    },

    deletarCarros(){
      const url = `http://${this.servidor}:3000/api/carros/?id=${this.idCarroDelete}`;
      console.log(this.idCarroDelete)
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then(this.$router.go())
      .catch((error) => console.error("Erro ao buscar carros:", error));
    },
    editarCarros(params){
      this.$store.commit('atualizarIdCarroEdit', params)
      this.$router.push('/editar');
    },
    detalheCarro(params){
    this.ativardetalhe = true,
    this.carroDetalhe = params
  },
  },

  watch: {
    placaFiltro(newText) {
      this.placaFiltro = newText.toUpperCase();
    },
    modeloFiltro(newText){
      this.modeloFiltro = newText.toUpperCase();
    },
    clienteFiltro(newText) {
      this.clienteFiltro = newText.toUpperCase();
    },
    situacaoFiltro(newText) {
      this.situacaoFiltro = newText.toUpperCase();
    },

  },
  mounted(){
    this.chamarCarros();
  },


})
</script>
