<template>
  <div style="overflow:auto">
    <div class = "a">
      <line-chart :chart-data="chartData_efficiency" :options="chartOptions_efficiency"></line-chart>
    </div>
    <div class = "b">
      <line-chart :chart-data="chartData_voltage_drop" :options="chartOptions_voltage_drop"></line-chart>
    </div>
    <p>
    <div class="left">Specific resistance:</div>
    <div class="right"><input type="number" id="sr" step="0.001" value="0.017" min="0" @change="updateGraph_efficiency(),updateGraph_voltage_drop()"> Ω·mm²/m</div>

    <div class="left">System voltage:</div>
    <div class="right"><input type="number" id="v" step="1" value="24" min="0" @change="updateGraph_efficiency(),updateGraph_voltage_drop()"> V</div>

    <div class="left">Wire Length: </div>
    <div class="right"><input type="number" id="wl" step="1" value="10" min="0" @change="updateGraph_efficiency(),updateGraph_voltage_drop()"> m</div>
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
      chartData_voltage_drop: null,
      chartOptions_voltage_drop: null
    }
  },
  mounted () {
    this.updateGraph_efficiency()
    this.updateGraph_voltage_drop()
  },
  methods: {
    updateGraph_efficiency() {
      // cross-section areas in mm2
      var x_sec_1 = 1;
      var x_sec_1_5 = 1.5;
      var x_sec_2_5 = 2.5;
      var x_sec_4 = 4;
      var x_sec_6 = 6;

      //different current for different cross-section areas (x axis points)
      var x_sec_1_steps = 10;
      var x_sec_1_5_steps = 15;
      var x_sec_2_5_steps = 23;
      var x_sec_4_steps = 30;
      var x_sec_6_steps = 38;

      var points_total = [];

      var x_sec_6_points = [];
      for (var i = 0; i <= x_sec_6_steps; i++) {
        points_total.push({x:i, y:this.efficiency(i,x_sec_6)});
        x_sec_6_points.push({x:i, y:this.efficiency(i,x_sec_6)});
      }

      var x_sec_4_points = [];
      for (var i = 0; i <= x_sec_4_steps; i++) {
        x_sec_4_points.push({x:i, y:this.efficiency(i,x_sec_4)-points_total[i].y});
        points_total[i].y += x_sec_4_points[i].y;
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
            label: '6mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#fbbe59',
            backgroundColor: '#fbbe59',
            fill: false,
            data: x_sec_6_points
          }, {
            label: '4mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#070808',
            backgroundColor: '#070808',
            fill: false,
            data: x_sec_4_points
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
    },

    updateGraph_voltage_drop() {
      // cross-section areas in mm2
      var x_sec_1 = 1;
      var x_sec_1_5 = 1.5;
      var x_sec_2_5 = 2.5;
      var x_sec_4 = 4;
      var x_sec_6 = 6;

      //different current for different cross-section areas (x axis points)
      var x_sec_1_steps = 10;
      var x_sec_1_5_steps = 15;
      var x_sec_2_5_steps = 23;
      var x_sec_4_steps = 30;
      var x_sec_6_steps = 38;

        var points_total = [];
      var x_sec_6_points = [];
      for (var i = 0; i <= x_sec_6_steps; i++) {
        x_sec_6_points.push({x:i, y:this.voltage_drop(i,x_sec_6)});
        points_total.push({x:i, y:this.voltage_drop(i,x_sec_6)});
      }

      var x_sec_4_points = [];
      for (var i = 0; i <= x_sec_4_steps; i++) {
        x_sec_4_points.push({x:i, y:this.voltage_drop(i,x_sec_4) - points_total[i].y});
        points_total[i].y += x_sec_4_points[i].y;
      }

      var x_sec_2_5_points = [];
      for (var i = 0; i <= x_sec_2_5_steps; i++) {
        x_sec_2_5_points.push({x:i, y:this.voltage_drop(i,x_sec_2_5) - points_total[i].y});
        points_total[i].y += x_sec_2_5_points[i].y;
      }

      var x_sec_1_5_points = [];
      for (var i = 0; i <= x_sec_1_5_steps; i++) {
        x_sec_1_5_points.push({x:i, y:this.voltage_drop(i,x_sec_1_5) - points_total[i].y});
        points_total[i].y += x_sec_1_5_points[i].y;
      }

      var x_sec_1_points = [];
      for (var i = 0; i <= x_sec_1_steps; i++) {
        x_sec_1_points.push({x:i, y:this.voltage_drop(i,x_sec_1) - points_total[i].y});
      }

      this.chartData_voltage_drop = {
        datasets: [
          {
            label: '6mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#fbbe59',
            backgroundColor: '#fbbe59',
            fill: false,
            data: x_sec_6_points
          }, {
            label: '4mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#070808',
            backgroundColor: '#070808',
            fill: false,
            data: x_sec_4_points
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
      this.chartOptions_voltage_drop = {
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
              labelString: 'voltage drop (V)',
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

    voltage_drop(current,x_sec) {
      var specific_resistance = document.getElementById("sr").value; // Ohm
      var wire_length = document.getElementById("wl").value; // m
      var voltage = document.getElementById("v").value; //v

      var resistance_milli = (specific_resistance * wire_length * 1000)/ x_sec;

      return (resistance_milli * current)/1000;
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
.a {
  width: 50%;
  float:left;
}
.b {
  width: 50%;
  float:right;
}
</style>
