<template>      
<div>
    <h4>Estatística Janeiro 2024 </h4>
    
    <div class="grafico">
        <graficoOne 
        :cs="csCarrosjan"
        :localiza="localizaCarrosjan"
        :outros="outros"/>
    </div>
    
</div>


</template>
<script>
import { mapState } from "vuex";
import graficoOne from "../components/graficoOne.vue"


export default{
    components:{
       graficoOne,
    },
    mounted() {
        this.$store.dispatch("getCarrosHistorico");
   
  },
    data(){
        return{
            
        }
    },

    computed: {
    ...mapState(["carrosHistorico"]),
    csCarrosjan() {
      const carrosCSDesdeJaneiro24 = this.carrosHistorico.filter((carro) => {
        const dataEntrada = new Date(carro.dataentrada);
        return carro.cliente === "CS" && dataEntrada >= new Date("2024-01-01");
      });
      return carrosCSDesdeJaneiro24.length;
    },
    localizaCarrosjan() {
      const carrosCSDesdeJaneiro24 = this.carrosHistorico.filter((carro) => {
        const dataEntrada = new Date(carro.dataentrada);
        return carro.cliente === "LOCALIZA" && dataEntrada >= new Date("2024-01-01");
      });
      return carrosCSDesdeJaneiro24.length;
    },
    outros() {
      const carrosCSDesdeJaneiro24 = this.carrosHistorico.filter((carro) => {
        const dataEntrada = new Date(carro.dataentrada);
        return carro.cliente != "LOCALIZA" && carro.cliente != "CS" && dataEntrada >= new Date("2024-01-01");
      });
      return carrosCSDesdeJaneiro24.length;
    },
  },
}
</script>
<style>
.grafico{
    display: flex;
    justify-content: center;
    height: 350px;
}
h4{
    margin-left: 40px;
    color: rgb(126, 118, 118);
}
</style>