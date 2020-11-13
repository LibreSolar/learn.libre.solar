<template>
  <div style="overflow:auto">
    <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>
    <p>
    <div class="left">Lead-acid:</div>
    <div class="right"><input type="number" id="leadacid" step="1" value="6" width="30" @change="updateGraph()"> cells in series</div>

    <div class="left">LiFePO4: </div>
    <div class="right"><input type="number" id="lfp" step="1" value="4" @change="updateGraph()"> cells in series</div>

    <div class="left">Li-ion NMC: </div>
    <div class="right"><input type="number" id="nmc" step="1" value="3" @change="updateGraph()"> cells in series</div>
    </p>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      chartData: null,
      chartOptions: null
    }
  },
  mounted () {
    this.updateGraph()
  },
  methods: {
    updateGraph() {
      var cell_leadacid = [2.130, 2.120, 2.109, 2.099, 2.088, 2.078, 2.067, 2.057, 2.046,
        2.036, 2.025, 2.015, 2.004, 1.994, 1.983, 1.973, 1.962, 1.952, 1.941, 1.931, 1.920];
      var n_leadacid = document.getElementById("leadacid").value;
      var points_leadacid = [];
      for (var i = 0; i < 21; i++) {
        points_leadacid.push({x:(100 - i*5), y:cell_leadacid[i]*n_leadacid});
      }

      var cell_lfp = [3.392, 3.314, 3.309, 3.308, 3.304, 3.296, 3.283, 3.275, 3.271, 3.268,
        3.265, 3.264, 3.262, 3.252, 3.240, 3.226, 3.213, 3.190, 3.177, 3.132, 2.833];
      var n_lfp = document.getElementById("lfp").value;
      var points_lfp = [];
      for (var i = 0; i < 21; i++) {
        points_lfp.push({x:(100 - i*5), y:cell_lfp[i]*n_lfp});
      }

      var cell_nmc = [4.195, 4.134, 4.088, 4.055, 4.025, 3.992, 3.961, 3.923, 3.882, 3.857,
        3.837, 3.818, 3.802, 3.786, 3.763, 3.744, 3.725, 3.701, 3.683, 3.587, 2.750];
      var n_nmc = document.getElementById("nmc").value;
      var points_nmc = [];
      for (var i = 0; i < 21; i++) {
        points_nmc.push({x:(100 - i*5), y:cell_nmc[i]*n_nmc});
      }

      this.chartData = {
        datasets: [
          {
            label: 'Lead acid',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#6b6b6b',
            backgroundColor: '#6b6b6b',
            fill: false,
            data: points_leadacid
          }, {
            label: 'LiFePO4',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#fbbe59',
            backgroundColor: '#fbbe59',
            fill: false,
            data: points_lfp
          }, {
            label: 'Li-ion NMC',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#005e85',
            backgroundColor: '#005e85',
            fill: false,
            data: points_nmc
          }
        ]
      },
      this.chartOptions = {
        scales: {
          xAxes: [{
            type: "linear",
            display: true,
            scaleLabel: {
              display: true,
              labelString: "State of charge (%)",
            },
            gridLines: {
              display: true
            },
            ticks: {
              reverse: true
            },
          }],
          yAxes: [{
            type: 'linear',
            display:true,
            scaleLabel: {
              display: true,
              labelString: 'Battery voltage (V)'
            },
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }]
        },
        legend: {
          usePointStyle: true
        },
        tooltips: {
          enabled: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    },
  }
}
</script>

<style>
.left {
  width: 45%;
  float: left;
  text-align: right;
}
.right {
  width: 50%;
  margin-left: 10px;
  float:left;
}
input[type="number"] {
  width:50px;
}
</style>