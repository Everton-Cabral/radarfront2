<template>
    <Bar :data="data" :options="options" />
  </template>
  
  <script>
  
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  import { Bar } from "vue-chartjs";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export default {
    name: "App",
    components: {
      Bar,
    },
    props:{
      cs: Number,
      localiza: Number,
      outros: Number,
    },
    data() {
      return {
        data: {
          labels: ["CS Brasil", "Localiza", "Outros"],
          datasets: [{ 
            data: [this.cs, this.localiza, this.outros],
            backgroundColor: ["#5ecae6", "#5ee682", "grey"] 
          }],
        
        },
        options: {
          responsive: true,
        },
      };
    },

  };
  </script>
  