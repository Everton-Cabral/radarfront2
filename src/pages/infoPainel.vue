<template>
  <div class="container">
    <div class="cart" style="background-color: gray">
      Total de Carros -{{ carros.length }}
    </div>
    <div class="cart" style="background-color: rgb(70, 199, 70)">
      Carros Prontos -{{ carrosProntos }}
    </div>
    <div class="cart" style="background-color: rgb(214, 51, 51)">
      Aguardando Aprovação -{{ aguarApro }}
    </div>
    <div class="cart" style="background-color: orange">
      Carros em Serviço -{{ emServico }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "infoPainel",

  computed: {
    ...mapState(["carros"]),
    carrosProntos() {
      return this.carros.filter((carro) => carro.situacao === "PRONTO").length;
    },
    aguarApro() {
      return this.carros.filter((carro) => carro.situacao === "AGUARDANDO")
        .length;
    },
    emServico() {
      return this.carros.filter((carro) => carro.situacao === "EM SERVIÇO")
        .length;
    },
  },
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@200&display=swap");
.container {
  display: flex;
  font-family: "Dosis", sans-serif;
  font-size: 40px;
}
.cart {
  justify-content: center;
  text-align: center;
  border: none;
  border-bottom-right-radius: 15px;
  margin: 20px;
  padding: 2px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.3);
  color: white;
}
</style>
