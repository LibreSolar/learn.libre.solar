<template>
  <div style="overflow:auto">
    <div>
      <line-chart :chart-data="chartData_efficiency" :options="chartOptions_efficiency"></line-chart>
    </div>
    <p>
    <div class="left">Specific Resistance:</div>
    <div class="right"><input type="number" id="sr" step="0.001" value="0.017" min="0" @change="updateGraph_efficiency()"> Ω·mm²/m</div>

    <div class="left">System voltage:</div>
    <div class="right"><input type="number" id="v" step="1" value="24" min="0" @change="updateGraph_efficiency()"> V</div>

    <div class="left">Wire Length: </div>
    <div class="right"><input type="number" id="wl" step="1" value="10" min="0" @change="updateGraph_efficiency()"> m</div>
    </p>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'

//chart for efficiency
export default {
  components: {
    LineChart
  },
  data () {
    return {
      chartData_efficiency: null,
      chartOptions_efficiency: null,
    }
  },
  mounted () {
    this.updateGraph_efficiency()
  },
  methods: {
    updateGraph_efficiency() {
      // cross-section areas in mm2
      var x_sec_1 = 1;
      var x_sec_1_5 = 1.5;
      var x_sec_2_5 = 2.5;
      var x_sec_10 = 10;
      var x_sec_50 = 50;

      //different current for different cross-section areas (x axis points)
      var x_sec_1_steps = 10;
      var x_sec_1_5_steps = 15;
      var x_sec_2_5_steps = 23;
      var x_sec_10_steps = 30;
      var x_sec_50_steps = 38;

      var points_total = [];

      var x_sec_50_points = [];
      for (var i = 0; i <= x_sec_50_steps; i++) {
        points_total.push({x:i, y:this.efficiency(i,x_sec_50)});
        x_sec_50_points.push({x:i, y:this.efficiency(i,x_sec_50)});
      }

      var x_sec_10_points = [];
      for (var i = 0; i <= x_sec_10_steps; i++) {
        x_sec_10_points.push({x:i, y:this.efficiency(i,x_sec_10)-points_total[i].y});
        points_total[i].y += x_sec_10_points[i].y;
      }

      var x_sec_2_5_points = [];
      for (var i = 0; i <= x_sec_2_5_steps; i++) {
        x_sec_2_5_points.push({x:i, y:this.efficiency(i,x_sec_2_5)-points_total[i].y});
        points_total[i].y += x_sec_2_5_points[i].y;
      }

      var x_sec_1_5_points = [];
      for (var i = 0; i <= x_sec_1_5_steps; i++) {
        x_sec_1_5_points.push({x:i, y:this.efficiency(i,x_sec_1_5)-points_total[i].y});
        points_total[i].y += x_sec_1_5_points[i].y;
      }

      var x_sec_1_points = [];
      for (var i = 0; i <= x_sec_1_steps; i++) {
        x_sec_1_points.push({x:i, y:this.efficiency(i,x_sec_1)-points_total[i].y});
      }

      this.chartData_efficiency = {
        datasets: [
          {
            label: '50mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#fbbe59',
            backgroundColor: '#fbbe59',
            fill: false,
            data: x_sec_50_points
          }, {
            label: '10mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#070808',
            backgroundColor: '#070808',
            fill: false,
            data: x_sec_10_points
          }, {
            label: '2.5mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#005e85',
            backgroundColor: '#005e85',
            fill: false,
            data: x_sec_2_5_points
          }, {
            label: '1.5mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#6b6b6b',
            backgroundColor: '#6b6b6b',
            fill: false,
            data: x_sec_1_5_points
          }, {
            label: '1mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#5c9aaf',
            backgroundColor: '#5c9aaf',
            fill: false,
            data: x_sec_1_points
          }
        ]
      },
      this.chartOptions_efficiency = {
        scales: {
          xAxes: [{
            type: "linear",
            display: true,
            scaleLabel: {
              labelString: "Output current (A)",
              fontSize: 14,
              display: true,
            },
            gridLines: {
              display: true
            }
          }],
          yAxes: [{
            id: "loss",
            type: 'linear',
            position: 'left',
            display: true,
            stacked: true,
            scaleLabel: {
              labelString: 'Efficiency loss (%)',
              fontSize: 14,
              display: true,
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
          usePointStyle: true,
          labels: {
            boxWidth: 20
          }
        },
        tooltips: {
          enabled: false
        },
        responsive: true,
        maintainAspectRatio: false
      }

    },

    // Most calculations from Richtek AN005

    efficiency(current,x_sec) {
      var specific_resistance = document.getElementById("sr").value; // Ohm
      var wire_length = document.getElementById("wl").value; // m
      var voltage = document.getElementById("v").value; //v

      var resistance_milli = (specific_resistance * wire_length * 1000)/ x_sec;
      var power_loss = (Math.pow(current,2) * resistance_milli)/1000;

      return (power_loss * 100)/(voltage * current);
    }
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
</style>
