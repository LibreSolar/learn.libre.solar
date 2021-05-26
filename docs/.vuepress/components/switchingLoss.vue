<template>
  <div style="overflow:auto">
    <div class = "a">
      <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>
    </div>
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
      chartData: null,
      chartOptions: null,

    }
  },
  mounted () {
this.createGraph()
  },
  methods: {
    createGraph() {
      var i = 0
      var ids = []
      var vd = []
      var vg = []
      var uth = []

      for (; i <= 20; i++) {
        ids.push({x:i, y:0})
        vg.push({x:i, y:0.05*i})
        vd.push({x:i, y:5})
        uth.push({x:i, y:1})
      }

      for (; i <= 50; i++) {
        ids.push({x:i, y:0.01*i - 0.2})
        vg.push({x:i, y:0.05*i})
        vd.push({x:i, y:5})
      }

      for (; i <= 80; i++) {
        ids.push({x:i, y:0.01*50 - 0.2})
        vg.push({x:i, y:0.05*50})
        vd.push({x:i, y: 5 - 5*(i-50)/30})
      }

      for (; i < 100; i++) {
        ids.push({x:i, y:0.01*50 - 0.2})
        vg.push({x:i, y:0.05*(i - 30)})
        vd.push({x:i, y:0})
      }




      this.chartData = {
        datasets: [
          {
            label: 'Ids',
            yAxisID: 'current',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#ff5e85',
            backgroundColor: '#005e85',
            fill: false,
            data: ids
          }, {
            label: 'Vd',
            yAxisID: 'voltage',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#00ff00',
            backgroundColor: '#6b6b6b',
            fill: false,
            data: vd
          }, {
            label: 'Vg',
            yAxisID: 'voltage',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#5c9aaf',
            backgroundColor: '#5c9aaf',
            fill: false,
            data: vg
          }, {
            label: 'vth',
            yAxisID: 'voltage',
            pointRadius: 0,
            borderWidth: 2,
            borderDash:[3,3],
            borderColor: '#ff90af',
            backgroundColor: '#5c9aaf',
            fill: false,
            data: uth
          }
        ]
      },
      this.chartOptions= {
        scales: {
          xAxes: [{
            type: "linear",
            display: true,
            scaleLabel: {
              labelString: "time",
              fontSize: 14,
              display: true,
            },
            ticks: {
              callback: function(value, index, values) {
                        if(value === 20) {
                          return "t1"
                        } else if (value === 50) {
                          return "t2"
                        } else if (value === 80) {
                          return "t3"
                        } else return null
                    }
            }
          }],
          yAxes: [{
            id: "voltage",
            type: 'linear',
            position: 'left',
            display: true,
            scaleLabel: {
              labelString: 'voltage',
              fontSize: 14,
              display: true,
            },
            ticks: {
              beginAtZero: true,
              suggestedMax: 6.0,
              callback: function(value, index, values) {
                console.log(value)
                        if(value === 1) {
                          return "Uth"
                        }else if (value === 5) {
                          return "Ud"
                        } else return null
                    }
            },
          }, {
            id: "current",
            type: 'linear',
            position: 'right',
            display: true,
            scaleLabel: {
              labelString: 'current',
              fontSize: 14,
              display: true,
            },
            ticks: {
              beginAtZero: true,
              suggestedMax: 0.4,
              callback: function(value, index, values) {
                console.log(value)
                        if(value === 0.3) {
                          return "I max"
                        } else null
                    }
            },
          }]
        },
        legend: {
          usePointStyle: true,
          labels: {
            boxWidth: 20,
            filter: function(item, chart) {
              return !item.text.includes('vth')
          }
          }
        },
        tooltips: {
          enabled: false
        },
        responsive: true,
        maintainAspectRatio: false
      }

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
