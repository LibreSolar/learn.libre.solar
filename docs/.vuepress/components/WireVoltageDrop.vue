<template>
    <div>
      <line-chart :chart-data="chartData_voltage_drop" :options="chartOptions_voltage_drop"></line-chart>
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
      chartData_voltage_drop: null,
      chartOptions_voltage_drop: null
    }
  },
  mounted () {
    this.createGraphValues()
  },
  methods: {
    createGraphValues() {
      // cross-section areas in mm2
      var x_sec_1 = 1;
      var x_sec_1_5 = 1.5;
      var x_sec_2_5 = 2.5;
      var x_sec_4 = 10;
      var x_sec_6 = 50;

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
            label: '50mm2',
            yAxisID: 'loss',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#fbbe59',
            backgroundColor: '#fbbe59',
            fill: false,
            data: x_sec_6_points
          }, {
            label: '10mm2',
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
      var specific_resistance = 0.017
      var wire_length = 20

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
</style>
