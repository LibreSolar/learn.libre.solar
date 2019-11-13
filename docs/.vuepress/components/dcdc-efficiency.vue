<template>
    <div style="overflow:auto">
        <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>
        <p>
        <div class="left">Maximum output current:</div>
        <div class="right"><input type="number" id="imax" step="1" value="20" min="5" @change="updateGraph()"> A</div>

        <div class="left">Input voltage:</div>
        <div class="right"><input type="number" id="vin" step="1" value="30" min="3" @change="updateGraph()"> V</div>

        <div class="left">Output voltage: </div>
        <div class="right"><input type="number" id="vout" step="1" value="14" min="1" @change="updateGraph()"> V</div>

        <div class="left">MOSFET Rds(on): </div>
        <div class="right"><input type="number" id="rdson" step="1" value="3" min="0" @change="updateGraph()"> m&#8486;</div>

        <div class="left">Switching frequency: </div>
        <div class="right"><input type="number" id="fsw" step="10" value="70" min="10" @change="updateGraph()"> kHz</div>

        <div class="left">Inductance: </div>
        <div class="right"><input type="number" id="l" step="5" value="47" min="1" @change="updateGraph()"> µH</div>

        <div class="left">Inductor resistance: </div>
        <div class="right"><input type="number" id="rl" step="1" value="5" min="0" @change="updateGraph()"> m&#8486;</div>
        </p>
    </div>
</template>

<script>
import LineChart from './line-chart.js'

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
            var imax = document.getElementById("imax").value;
            var steps = 100;

            var points_total = [];
            var points_hs_cond = [];
            for (var i = 0; i <= steps; i++) {
                var Iout = (i/steps*imax);
                points_hs_cond.push({x:Iout, y:this.Q_HS_cond(Iout)});
                points_total.push({x:Iout, y:this.Q_HS_cond(Iout)});
            }
            var points_hs_sw = [];
            for (var i = 0; i <= steps; i++) {
                var Iout = (i/steps*imax);
                points_hs_sw.push({x:Iout, y:this.Q_HS_sw(Iout)});
                points_total[i].y += this.Q_HS_sw(Iout);
            }
            var points_ls_cond = [];
            for (var i = 0; i <= steps; i++) {
                var Iout = (i/steps*imax);
                points_ls_cond.push({x:Iout, y:this.Q_LS_cond(Iout)});
                points_total[i].y += this.Q_LS_cond(Iout);
            }
            var points_l_dc = [];
            for (var i = 0; i <= steps; i++) {
                var Iout = (i/steps*imax);
                points_l_dc.push({x:Iout, y:this.Q_L(Iout)});
                points_total[i].y += this.Q_L(Iout);
            }
            var points_driver = [];
            for (var i = 0; i <= steps; i++) {
                var Iout = (i/steps*imax);
                points_driver.push({x:Iout, y:this.Q_driver(Iout)});
                points_total[i].y += this.Q_driver(Iout);
            }
            var efficiency = [];
            for (var i = 0; i <= steps; i++) {
                var Iout = (i/steps*imax);
                efficiency.push({x:Iout, y:this.eff(Iout, points_total[i].y)});
            }

            this.chartData = {
                datasets: [
                    {
                        label: 'Efficiency',
                        yAxisID: 'eff',
                        pointRadius: 0,
                        borderWidth: 2,
                        borderColor: '#fbbe59',
                        backgroundColor: '#fbbe59',
                        fill: false,
                        data: efficiency
                    }, {
                        label: 'Driver',
                        yAxisID: 'loss',
                        pointRadius: 0,
                        borderWidth: 2,
                        borderColor: '#6b6b6b',
                        backgroundColor: '#6b6b6b',
                        fill: false,
                        data: points_driver
                    }, {
                        label: 'HS switching',
                        yAxisID: 'loss',
                        pointRadius: 0,
                        borderWidth: 2,
                        borderColor: '#005e85',
                        backgroundColor: '#005e85',
                        fill: false,
                        data: points_hs_sw
                    }, {
                        label: 'HS conduction',
                        yAxisID: 'loss',
                        pointRadius: 0,
                        borderWidth: 2,
                        borderColor: '#5c9aaf',
                        backgroundColor: '#5c9aaf',
                        fill: false,
                        data: points_hs_cond
                    }, {
                        label: 'LS conduction',
                        yAxisID: 'loss',
                        pointRadius: 0,
                        borderWidth: 2,
                        borderColor: '#d3d5cc',
                        backgroundColor: '#d3d5cc',
                        fill: false,
                        data: points_ls_cond
                    }, {
                        label: 'Inductor DC',
                        yAxisID: 'loss',
                        pointRadius: 0,
                        borderWidth: 2,
                        borderColor: '#262626',
                        backgroundColor: '#262626',
                        fill: false,
                        data: points_l_dc
                    }
                ]
            },
            this.chartOptions = {
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
                        position: 'right',
                        display: true,
                        stacked: true,
                        scaleLabel: {
                            labelString: 'Total Losses (W)',
                            fontSize: 14,
                            display: true,
                        },
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }, {
                        id: "eff",
                        type: 'linear',
                        position: 'left',
                        display: true,
                        scaleLabel: {
                            labelString: 'Efficiency (%)',
                            fontSize: 14,
                            display: true,
                        },
                        ticks: {
                            max: 100,
                            min: 90
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

        Q_HS_cond(Iout) {
            var f_sw = document.getElementById("fsw").value; // kHz
            var Rdson = document.getElementById("rdson").value;; // mOhm
            var Vin = document.getElementById("vin").value;
            var Vout = document.getElementById("vout").value;
            var L = document.getElementById("l").value; // uH
            var D = Vout/Vin;
            var Iripple = (Vin - Vout) * D / (f_sw * 1e3) / (L * 1e-6);

            return Rdson / 1000 * (D * (Math.pow(Iout, 2) + Math.pow(Iout, 2) / 12));
        },

        Q_HS_sw(Iout) {
            var Vin = document.getElementById("vin").value;
            var Vout = document.getElementById("vout").value;
            var D = Vout/Vin;
            var Rdson = document.getElementById("rdson").value;; // mOhm
            var f_sw = document.getElementById("fsw").value;; // mOhm
            var t_rise = 20; // ns
            var t_fall = 20; // ns

            return Vin * Iout / 2 * f_sw * 1e3 * (t_rise + t_fall) * 1e-9;
        },

        Q_LS_cond(Iout) {
            var Vin = document.getElementById("vin").value;
            var Vout = document.getElementById("vout").value;
            var D = Vout/Vin;
            var Rdson = document.getElementById("rdson").value;; // mOhm
            var f_sw = document.getElementById("fsw").value;; // mOhm
            var L = document.getElementById("l").value; // uH
            var t_rise = 20; // ns
            var t_fall = 20; // ns
            var deadtime = 200; // ns
            var Vsd = 0.6; // diode forward voltage
            var Iripple = (Vin - Vout) * D / (f_sw * 1e3) / (L * 1e-6);

            return Rdson / 1000 * ((1-D) * (Math.pow(Iout, 2) + Math.pow(Iripple, 2) / 12))
                + 2 * deadtime * 1e-9 * f_sw * 1e3 * Vsd * Iout;
        },

        Q_L(Iout) {
            var Vin = document.getElementById("vin").value;
            var Vout = document.getElementById("vout").value;
            var f_sw = document.getElementById("fsw").value; // kHz
            var L = document.getElementById("l").value; // uH
            var D = Vout/Vin;
            var R_l = document.getElementById("rl").value;
            var Iripple = (Vin - Vout) * D / (f_sw * 1e3) / (L * 1e-6);

            return R_l / 1000 * (Math.pow(Iout, 2) + Math.pow(Iripple, 2) / 12);
        },

        Q_driver(Iout) {
            var Vdriver = 12;   // V
            var Qg = 40;    // nC
            var f_sw = document.getElementById("fsw").value; // kHz

            return 2 * Qg * 1e-9 * Vdriver * f_sw * 1e3;
        },

        eff(Iout, Q) {
            var Vout = document.getElementById("vout").value;

            return Vout * Iout / (Vout * Iout + Q) * 100;
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