<template>
  <div>
    <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card style="max-width: 320px; margin: 0px" class="q-pa-sm q-pb-md" flat>
        <q-list>
          <q-item-label class="text-weight-bold">Datasheet parameters (STC):</q-item-label>
          <param-input label="Voltage in maximum power point:" unit="V" v-model="vmpp_stc" @input="updateGraph()"></param-input>
          <param-input label="Current in maximum power point:" unit="A" v-model="impp_stc" @input="updateGraph()"></param-input>
          <param-input label="Open circuit voltage:" unit="V" v-model="voc_stc" @input="updateGraph()"></param-input>
          <param-input label="Short circuit current:" unit="A" v-model="isc_stc" @input="updateGraph()"></param-input>
          <param-input label="Temperature coefficient of Voc:" unit="%/K" v-model="voc_coeff" step="0.01" @input="updateGraph()"></param-input>
          <param-input label="Temperature coefficient of Isc:" unit="%/K" v-model="isc_coeff" step="0.01" @input="updateGraph()"></param-input>
          <param-input label="Normal operating cell temperature (NOCT):" unit="°C" v-model="noct" @input="updateGraph()"></param-input>
        </q-list>
      </q-card>

      <q-card style="width: 320px; margin: 0px" class="q-pa-sm q-pb-md" flat>
        <q-list>
          <q-item-label class="text-weight-bold">Actual environmental conditions:</q-item-label>
          <param-input label="Solar Irradiance:" unit="W/m²" v-model="g" step="100" max="1000" @input="updateGraph()"></param-input>
          <param-input label="Ambient Temperature:" unit="°C" v-model="t_ambient" step="5" @input="updateGraph()"></param-input>
          <q-item style="padding: 0px">
            <q-item-section><q-item-label>Calculated cell temperature:</q-item-label></q-item-section>
            <q-item-section side>{{ Math.round(t_cell * 10) / 10 }} °C</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import ParamInput from './ParamInput.vue'

var vmpp;       // Vmpp at defined temperature and irradiance
var impp;       // Impp at defined temperature and irradiance
var voc;        // Voc at defined temperature and irradiance
var isc;        // Isc at defined temperature and irradiance

export default {
  components: {
    LineChart
  },
  data () {
    return {
      chartData: null,
      chartOptions: null,
      vmpp_stc: 18.3,
      impp_stc: 8.27,
      voc_stc:  22.5,
      isc_stc: 8.81,
      isc_coeff: 0.08,
      voc_coeff: -0.37,
      g: 1000,
      t_ambient: 25,
      noct: 46,
      t_cell: 25.0
    }
  },
  mounted () {
    this.updateGraph()
  },
  methods: {
    updateGraph () {
      var points_v = [];
      var points_p = [];

      for (var step = 0; step <= 100; step++) {
        var v = this.getVoc() * step / 100;
        points_v.push({x:v, y:this.i(v)});
      }
      for (var step = 0; step <= 100; step++) {
        var v = this.getVoc() * step / 100;
        points_p.push({x:v, y:this.p(v)});
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
          usePointStyle: true
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
      this.t_cell = parseFloat(this.t_ambient) + parseFloat(this.g) / 800 * (parseFloat(this.noct) - 20);
      voc = this.voc_stc * (1 + this.voc_coeff / 100 * (this.t_cell - 25));
      isc = this.isc_stc * (1 + this.isc_coeff / 100 * (this.t_cell - 25)) * this.g / 1000;
      vmpp = this.vmpp_stc * (1 + this.voc_coeff / 100 * (this.t_cell - 25));
      impp = this.impp_stc * (1 + this.isc_coeff / 100 * (this.t_cell - 25)) * this.g / 1000;
    },

    getVoc() {
      this.getValues();
      return voc;
    },

    getVmax() {
      return this.voc_stc * (1 + this.voc_coeff / 100 * (0 - 25));
    },

    getImax() {
      return this.isc_stc * (1 + this.isc_coeff / 100 * (70 - 25));
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
