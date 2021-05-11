<template>
  <div style="overflow:auto">
    <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>

    <p>
    <div class="subhead">Sample data:</div>
    <div class="left">Voltage in maximum power point:</div>
    <div class="right"><input type="number" id="vmpp_stc" step="1" value="18.3" @change="updateGraph()"> V</div>
    <div class="left">Current in maximum power point:</div>
    <div class="right"><input type="number" id="impp_stc" step="1"value="8.27" @change="updateGraph()"> A</div>
    <div class="left">Rated battery voltage:</div>
    <div class="right"><input type="number" id="vbat" step="0.1" value="12" @change="updateGraph()"> V</div>

    <p style="padding-top:50px">
    <div class="subhead">Actual environmental conditions:</div>
    <div class="left">Solar Irradiance:</div>
    <div class="right"><input type="number" id="g" step="100" value="1000" max="1000" @change="updateGraph()"> W/m²</div>
    <div class="left">Ambient Temperature: </div>
    <div class="right"><input type="number" id="t_ambient" step="5" value="25" @change="updateGraph()"/> °C</div>
    </p>
    </p>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'

var vmpp;       // Vmpp at defined temperature and irradiance
var impp;       // Impp at defined temperature and irradiance
var voc;        // Voc at defined temperature and irradiance
var isc;        // Isc at defined temperature and irradiance
var vbat;       // Nominal attery voltage

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
    updateGraph () {
      var points_v = [];
      var points_p = [];
      var points_bat_v = [];
      var points_bat_p = [];
      

      for (var step = 0; step <= 100; step++) {
        var v = this.getVoc() * step / 100;
        points_v.push({x:v, y:this.i(v)});
      }
      for (var step = 0; step <= 100; step++) {
        var v = this.getVoc() * step / 100;
        points_p.push({x:v, y:this.p(v)});
      }
      for (var step = 0; step < 2; step++) {
          var v = this.getBat();
          points_bat_v.push({x:v, y:this.p(v)*step})
      }
      for (var step = 0; step < 2; step++) {
          var v = this.getBat();
          points_bat_v.push({x:v, y:this.p(v)*step})
      }
      for (var step = 0; step < 2; step++) {
          var v = step ? this.getBat() : this.getVmax();
          points_bat_p.push({x:v, y:this.p(this.getBat())})
      }
      
      
      this.chartData = {
        datasets: [{
          label: 'Current',
          yAxisID:'I',
          backgroundColor: '#fbbe59',
          borderColor: '#fbbe59',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          data: points_v
                 },
                 {
          label: 'Power',
          yAxisID: 'P',
          backgroundColor: '#005e85',
          borderColor: '#005e85',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          data: points_p
                 },
                 {
          label: 'bat',
          yAxisID: 'P',
          backgroundColor: '#8b0000',
          borderColor: '#8b0000',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          data: points_bat_v
                 },
                 {
          label: 'bat',
          yAxisID: 'P',
          backgroundColor: '#8b0000',
          borderColor: '#8b0000',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          data: points_bat_p
          }]
      },
      this.chartOptions = {
        scales: {
          xAxes: [{
            type: 'linear',
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Voltage (V)",
            },
            ticks: {
              beginAtZero: true,
              suggestedMax: this.getVmax(),
            },
            gridLines: {
              display: true
            }
          }],
          yAxes: [{
            type: 'linear',
            position: 'left',
            id: 'I',
            scalePositionLeft: true,
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Current (A)'
            },
            ticks: {
              beginAtZero: true,
              suggestedMax: this.getImax(),
            },
            gridLines: {
              display: true
            }
          },
          {
            type: 'linear',
            id: 'P',
            position: 'right',
            scalePositionLeft: false,
            display: true,
            scaleLabel:{
              display: true,
              labelString: 'Power (W)'
            },
            ticks: {
              beginAtZero: true,
              min: 0
            },
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          usePointStyle: true,
          labels:{
            filter: function(item, chart) {
              return !item.text.includes('bat')
          }
          }
        },
        tooltips: {
          enabled: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    },

    // Reads the datasheet parameters at standard test conditions (user input)
    // and calculate values for actual condition
    getValues() {
      var vmpp_stc = parseFloat(document.getElementById("vmpp_stc").value);
      var impp_stc = parseFloat(document.getElementById("impp_stc").value);
      vbat = parseFloat(document.getElementById("vbat").value)
      var voc_stc = 22.5;
      var isc_stc = 8.81;
      var isc_coeff = 0.08
      var voc_coeff = -0.37
      var g = parseFloat(document.getElementById("g").value);

      // calculate cell temperature
      var t_ambient= parseFloat(document.getElementById("t_ambient").value);
      var noct = 46
      var t_cell = t_ambient + g / 800 * (noct - 20);

      // calculate values for actual temperature and irradiance
      voc = voc_stc * (1 + voc_coeff / 100 * (t_cell - 25));
      isc = isc_stc * (1 + isc_coeff / 100 * (t_cell - 25)) * g / 1000;
      vmpp = vmpp_stc * (1 + voc_coeff / 100 * (t_cell - 25));
      impp = impp_stc * (1 + isc_coeff / 100 * (t_cell - 25)) * g / 1000;
    },

    getBat() {
        this.getValues();
        return vbat;
    },

    getVoc() {
      this.getValues();
      return voc;
    },

    getVmax() {
      var voc_stc = 22.5;
      var voc_coeff = -0.37;
      return voc_stc * (1 + voc_coeff / 100 * (0 - 25));
    },

    getImax() {
      var isc_stc = 8.81;
      var isc_coeff = 0.08;
      return isc_stc * (1 + isc_coeff / 100 * (70 - 25));
    },

    // calculate I-V characteristic curve based on El Tayyan simplified method:
    // https://pdfs.semanticscholar.org/c8af/14dd80bd568eb8c717ae24fd9ea6222f9ad0.pdf
    i(v) {
      this.getValues();
      var c1 = isc;
      var c2 = (vmpp - voc) / Math.log(1 - impp/isc);

      return isc - (c1 * Math.exp(-voc/c2) * (Math.exp(v/c2) - 1));
    },

    // calculate solar module power vs. panel voltage
    p(v) {
      return v * this.i(v);
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
  float: left;
}
.subhead {
  width: 95%;
  margin-left: 10px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
