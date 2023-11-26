<template>
  <q-page class="container">



    <div class="grupo-form">
      <q-input class="input" v-model="placa" label="Placa" />
      <q-input class="input" v-model="modelo" label="Modelo" />
      <q-input class="input" v-model="km" label="km" />

    </div>

    <div class="grupo-form">
      <q-select class="input" v-model="situacao" :options="optionsSituacao" label="Situação" />
      <q-input class="input" v-model="cliente" label="Cliente" />
      <q-input class="input" v-model="orgao" label="Orgão" />

    </div>

    <div class="grupo-form">
      <q-input  filled type="date" v-model="dataentrada" class="input" label="Data de Entrada" />
      <q-input filled type="textarea" v-model="obs" class="input" label="Observações"/>
    </div>

    <div>
      <q-btn  color="red"
              icon-right="send"
              label="Cadastrar Carro"
              @click="cadastrarCarro()"
      />
    </div>
    <div class="q-pa-md">

  </div>

  </q-page>
</template>

<style scoped>
.container{
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.input{
  margin: 25px 35px 35px 35px;
}

.grupo-form{
  display: flex;
  justify-content: space-around;

}
.grupo-form-footer{
  display: flex;
  justify-content: space-between;
  border: solid;
}
</style>

<script>
import { data } from 'autoprefixer';
import { defineComponent } from 'vue';



export default defineComponent({
  name: 'cadastroCarros',

  data(){
    return{
      placa:'',
      modelo:'',
      cliente:'',
      situacao:'DESCONHECIDO',
      optionsSituacao:['APROVADO', 'EVIDENCIAR','PRONTO','DESCONHECIDO'],
      orgao:'',
      km:'',
      dataentrada: '',
      obs:'',
      servidor:'18.229.142.48'

    }
  },
  methods:{

    cadastrarCarro(){
      const novoCarro = {
        placa: this.placa,
        modelo: this.modelo,
        cliente: this.cliente,
        situacao: this.situacao,
        orgao: this.orgao,
        km: this.km,
        dataentrada: this.dataentrada,
        obs: this.obs
      }

      fetch(`http://${this.servidor}:3000/api/carros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoCarro),
    })
      .then((response) => response.json())
      .then(
        this.$q.notify({
        message: 'Cadastro realizado com sucesso!',
        color: 'positive',
        position: 'center',
        timeout: 2000,
      })
      )

      .then(

        this.placa = '',
        this.modelo = '',
        this.cliente = '',
        this.situacao ='',
        this.orgao ='',
        this.km ='',
        this.dataentrada = '',
        this.obs ='',
      )


      .catch((error) => console.error("Erro ao criar carro:", error));
    }


  },
  watch: {
    placa(newText) {
      this.placa = newText.toUpperCase();
    },
    modelo(newText){
      this.modelo = newText.toUpperCase();
    },
    cliente(newText) {
      this.cliente = newText.toUpperCase();
    }
  },
  computed:{
    teste(){
      return this.$store.state.teste1
    }
  }
})


</script>
