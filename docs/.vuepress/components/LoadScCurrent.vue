<template>
  <div style="overflow:auto">
    <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>
    <p>
    <div class="left">Battery voltage:</div>
    <div class="right"><input type="number" id="voltage" step="2" value="14" @change="updateGraph()"> V</div>

    <div class="left">Battery and charge controller resistance: </div>
    <div class="right"><input type="number" id="bat_ir" step="5" value="10" @change="updateGraph()"> m&#8486;<br /></div>

    <div class="left">Total wire length: </div>
    <div class="right"><input type="number" id="wirelength" step="1" value="1" @change="updateGraph()"> m</div>

    <div class="left">Capacitance: </div>
    <div class="right"><input type="number" id="capacitance" step="100" value="1000" @change="updateGraph()"> µF<br /></div>

    <div class="left">Capacitor ESR: </div>
    <div class="right"><input type="number" id="cap_esr" step="5" value="20" @change="updateGraph()"> m&#8486;<br /></div>
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
      var points_cap = [];
      for (var i = 0; i <= 200; i += 5) {
        points_cap.push({x:i, y:this.I_cap(i)});
      }
      var points_sc = [];
      for (var i = 0; i <= 200; i += 5) {
        points_sc.push({x:i, y:this.I_sc(i)});
      }

      this.chartData = {
        datasets: [
          {
            label: 'Short circuit',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#fbbe59',
            backgroundColor: '#fbbe59',
            fill: false,
            data: points_sc
          }, {
            label: 'Capacitive load',
            pointRadius: 0,
            borderWidth: 2,
            borderColor: '#005e85',
            backgroundColor: '#005e85',
            fill: false,
            data: points_cap
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
              labelString: "Time (µs)",
            },
            gridLines: {
              display: true
            }
          }],
          yAxes: [{
            type: 'linear',
            display:true,
            scaleLabel: {
              display: true,
              labelString: 'Current (A)'
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
    I_cap(t_us) {
      // equations: https://en.wikipedia.org/wiki/RLC_circuit#Underdamped_response

      var L = document.getElementById("wirelength").value * 1e-6;     // wire inductance: 1 uH per meter
      var R_bat = document.getElementById("bat_ir").value * 1e-3;     // mOhm
      var V = document.getElementById("voltage").value;               // V
      var C = document.getElementById("capacitance").value * 1e-6;    // uF
      var R_cap = document.getElementById("cap_esr").value * 1e-3;    // mOhm
      var R_wire = document.getElementById("wirelength").value * 4.2e-3;    // mOhm
      var R = R_bat + R_cap + R_wire;

      var omega_0 = 1/Math.sqrt(L*C);     // natural frequency
      var alpha = R/(2*L);                // damping attenuation
      var zeta = alpha / omega_0;         // damping factor
      var omega_d = Math.sqrt(Math.pow(omega_0, 2) - Math.pow(alpha, 2));    // damped resonance frequency

      return V/(L*omega_d) * Math.exp(-alpha * t_us * 1e-6) * Math.sin(omega_d * t_us * 1e-6);
    },

    I_sc(t_us) {
      // equations: https://en.wikipedia.org/wiki/RL_circuit#Zero-input_response

      var L = document.getElementById("wirelength").value * 1e-6;     // wire inductance: 1 uH per meter
      var V = document.getElementById("voltage").value;               // V
      var R_bat = document.getElementById("bat_ir").value * 1e-3;     // mOhm
      var R_wire = document.getElementById("wirelength").value * 4.2e-3;    // mOhm
      var R = R_bat + R_wire;

      return V/R * (1-Math.exp(-R/L * t_us * 1e-6));
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
</style>