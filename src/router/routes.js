const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "cadastro", component: () => import("pages/cadastroCarros.vue") },
      { path: "editar", component: () => import("pages/editarCarros.vue") },
      { path: "painel", component: () => import("pages/infoPainel.vue") },
      { path: "detalhe", component: () => import("pages/detalheCarro.vue") },
      {
        path: "historico",
        component: () => import("pages/historicoCarros.vue"),
      },
      {
        path: "ficha",
        component: () => import("pages/detalheCarroHistorico.vue"),
      },
      { path: "orcamento", component: () => import("pages/appOrcamento.vue") },
      {
        path: "fichaorcamento",
        component: () => import("pages/fichaOrcamento.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
