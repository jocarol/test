<template>
  <p>{{ message }}</p>
  <!-- <div align="center">
    <h1 align="center">Bonjour Username <br /></h1>
    <br />

    <div class="row justify-content-md-center">
          <div class="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12">
        <bar-chart
          :data="barChartData"
          :options="barChartOptions"
          :height="200"
        />
      </div>
          <div class="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12">
        <bar-chart
          :data="barChartData"
          :options="barChartOptions"
          :height="200"
        />
      </div>
    </div>
    <div class="contrats col-xl-10 col-lg-10 col-md-6 col-sm-6 col-12">
      <h2 align="left">Mes contrats</h2>
      <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
  </div> -->
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      message: "",
      fields: [
        "Nom_du_contrat",
        "Solde",
        "Date_de_souscription",
        "Mensualités",
      ],
      items: [
        {
          Nom_du_contrat: "Prévoyance Platine",
          Solde: "13.554,00 € ",
          Date_de_souscription: "04/01/21",
          Mensualités: "120,00 €",
        },
        {
          Nom_du_contrat: "Santé Premium",
          Solde: "2.784,42 €",
          Date_de_souscription: "17/09/20",
          Mensualités: "100,00 €",
        },
        {
          Nom_du_contrat: "Epargne Rettraite",
          Solde: "5.551,77 €",
          Date_de_souscription: "23/04/20",
          Mensualités: "260,00 €",
        },
        {
          Nom_du_contrat: "Auto Tout Risque",
          Solde: "6.361,75 €",
          Date_de_souscription: "01/01/19",
          Mensualités: "180,00 €",
        },
      ],
      barChartData: {
        labels: [
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12",
          "2020-01",
          "2020-02",
          "2020-03",
          "2020-04",
          "2020-05",
        ],
        datasets: [
          {
            label: "Assurance Auto",
            data: [10, 15, 20, 30, 40, 50, 60, 70, 34, 45, 11, 78, 45],
            backgroundColor: "#003f5c",
          },
          {
            label: "Assurance Prévoyance",
            data: [30, 24, 57, 23, 68, 72, 25, 64, 133, 143, 165, 33, 56],
            backgroundColor: "#2f4b7c",
          },
          {
            label: "Assurance Habitation",
            data: [45, 65, 30, 53, 34, 35, 26, 37, 34, 45, 67, 87, 98],
            backgroundColor: "#665191",
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Répartitions du patrimoine",
          fontSize: 24,
          fontColor: "#6b7280",
        },
        tooltips: {
          backgroundColor: "#17BF62",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      const content = await response.json();
  
      this.message = `Bonjour ${content.name}`
      this.$nuxt.$emit('auth', true)
      
    } catch (error) {
      this.message = 'You are not logged in'
      this.$nuxt.$emit('auth', false)
    }
  },
});
</script>

<style>
.contrats {
  padding-top: 2rem;
}
</style>