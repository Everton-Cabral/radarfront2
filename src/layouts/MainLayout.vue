<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-red-10">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <img src="../assets/logo.png" alt="Logo Radar" />
        <q-toolbar-title>
          Controle de Entrada e Saída de Veículos
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu de Opções </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    caption: "Voltar para tela inicial",
    icon: "home",
    route: "/",
  },
  {
    title: "Entrada de Veículo",
    caption: "Cadastrar Veículos",
    icon: "login",
    route: "cadastro",
  },
  {
    title: "Info",
    caption: "Consultar Informações",
    icon: "info",
    route: "painel",
  },
  {
    title: "Orçamento",
    caption: "Orçamentos em Aberto",
    icon: "attach_money",
    route: "orcamento",
  },
  {
    title: "Histórico",
    caption: "Histórico de Carros",
    icon: "sync_alt",
    route: "historico",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
