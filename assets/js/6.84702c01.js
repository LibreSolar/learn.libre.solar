(window.webpackJsonp=window.webpackJsonp||[]).push([[6,16],{445:function(s,t,e){"use strict";e.r(t);var a=e(448),n=a.b.reactiveProp,r={extends:a.a,mixins:[n],props:["chartData","options"],mounted:function(){this.renderChart(this.chartData,this.options)}},i=e(18),j=Object(i.a)(r,void 0,void 0,!1,null,null,null);t.default=j.exports},447:function(s,t,e){var a={"./af":310,"./af.js":310,"./ar":311,"./ar-dz":312,"./ar-dz.js":312,"./ar-kw":313,"./ar-kw.js":313,"./ar-ly":314,"./ar-ly.js":314,"./ar-ma":315,"./ar-ma.js":315,"./ar-sa":316,"./ar-sa.js":316,"./ar-tn":317,"./ar-tn.js":317,"./ar.js":311,"./az":318,"./az.js":318,"./be":319,"./be.js":319,"./bg":320,"./bg.js":320,"./bm":321,"./bm.js":321,"./bn":322,"./bn-bd":323,"./bn-bd.js":323,"./bn.js":322,"./bo":324,"./bo.js":324,"./br":325,"./br.js":325,"./bs":326,"./bs.js":326,"./ca":327,"./ca.js":327,"./cs":328,"./cs.js":328,"./cv":329,"./cv.js":329,"./cy":330,"./cy.js":330,"./da":331,"./da.js":331,"./de":332,"./de-at":333,"./de-at.js":333,"./de-ch":334,"./de-ch.js":334,"./de.js":332,"./dv":335,"./dv.js":335,"./el":336,"./el.js":336,"./en-au":337,"./en-au.js":337,"./en-ca":338,"./en-ca.js":338,"./en-gb":339,"./en-gb.js":339,"./en-ie":340,"./en-ie.js":340,"./en-il":341,"./en-il.js":341,"./en-in":342,"./en-in.js":342,"./en-nz":343,"./en-nz.js":343,"./en-sg":344,"./en-sg.js":344,"./eo":345,"./eo.js":345,"./es":346,"./es-do":347,"./es-do.js":347,"./es-mx":348,"./es-mx.js":348,"./es-us":349,"./es-us.js":349,"./es.js":346,"./et":350,"./et.js":350,"./eu":351,"./eu.js":351,"./fa":352,"./fa.js":352,"./fi":353,"./fi.js":353,"./fil":354,"./fil.js":354,"./fo":355,"./fo.js":355,"./fr":356,"./fr-ca":357,"./fr-ca.js":357,"./fr-ch":358,"./fr-ch.js":358,"./fr.js":356,"./fy":359,"./fy.js":359,"./ga":360,"./ga.js":360,"./gd":361,"./gd.js":361,"./gl":362,"./gl.js":362,"./gom-deva":363,"./gom-deva.js":363,"./gom-latn":364,"./gom-latn.js":364,"./gu":365,"./gu.js":365,"./he":366,"./he.js":366,"./hi":367,"./hi.js":367,"./hr":368,"./hr.js":368,"./hu":369,"./hu.js":369,"./hy-am":370,"./hy-am.js":370,"./id":371,"./id.js":371,"./is":372,"./is.js":372,"./it":373,"./it-ch":374,"./it-ch.js":374,"./it.js":373,"./ja":375,"./ja.js":375,"./jv":376,"./jv.js":376,"./ka":377,"./ka.js":377,"./kk":378,"./kk.js":378,"./km":379,"./km.js":379,"./kn":380,"./kn.js":380,"./ko":381,"./ko.js":381,"./ku":382,"./ku.js":382,"./ky":383,"./ky.js":383,"./lb":384,"./lb.js":384,"./lo":385,"./lo.js":385,"./lt":386,"./lt.js":386,"./lv":387,"./lv.js":387,"./me":388,"./me.js":388,"./mi":389,"./mi.js":389,"./mk":390,"./mk.js":390,"./ml":391,"./ml.js":391,"./mn":392,"./mn.js":392,"./mr":393,"./mr.js":393,"./ms":394,"./ms-my":395,"./ms-my.js":395,"./ms.js":394,"./mt":396,"./mt.js":396,"./my":397,"./my.js":397,"./nb":398,"./nb.js":398,"./ne":399,"./ne.js":399,"./nl":400,"./nl-be":401,"./nl-be.js":401,"./nl.js":400,"./nn":402,"./nn.js":402,"./oc-lnc":403,"./oc-lnc.js":403,"./pa-in":404,"./pa-in.js":404,"./pl":405,"./pl.js":405,"./pt":406,"./pt-br":407,"./pt-br.js":407,"./pt.js":406,"./ro":408,"./ro.js":408,"./ru":409,"./ru.js":409,"./sd":410,"./sd.js":410,"./se":411,"./se.js":411,"./si":412,"./si.js":412,"./sk":413,"./sk.js":413,"./sl":414,"./sl.js":414,"./sq":415,"./sq.js":415,"./sr":416,"./sr-cyrl":417,"./sr-cyrl.js":417,"./sr.js":416,"./ss":418,"./ss.js":418,"./sv":419,"./sv.js":419,"./sw":420,"./sw.js":420,"./ta":421,"./ta.js":421,"./te":422,"./te.js":422,"./tet":423,"./tet.js":423,"./tg":424,"./tg.js":424,"./th":425,"./th.js":425,"./tk":426,"./tk.js":426,"./tl-ph":427,"./tl-ph.js":427,"./tlh":428,"./tlh.js":428,"./tr":429,"./tr.js":429,"./tzl":430,"./tzl.js":430,"./tzm":431,"./tzm-latn":432,"./tzm-latn.js":432,"./tzm.js":431,"./ug-cn":433,"./ug-cn.js":433,"./uk":434,"./uk.js":434,"./ur":435,"./ur.js":435,"./uz":436,"./uz-latn":437,"./uz-latn.js":437,"./uz.js":436,"./vi":438,"./vi.js":438,"./x-pseudo":439,"./x-pseudo.js":439,"./yo":440,"./yo.js":440,"./zh-cn":441,"./zh-cn.js":441,"./zh-hk":442,"./zh-hk.js":442,"./zh-mo":443,"./zh-mo.js":443,"./zh-tw":444,"./zh-tw.js":444};function n(s){var t=r(s);return e(t)}function r(s){if(!e.o(a,s)){var t=new Error("Cannot find module '"+s+"'");throw t.code="MODULE_NOT_FOUND",t}return a[s]}n.keys=function(){return Object.keys(a)},n.resolve=r,s.exports=n,n.id=447},472:function(s,t,e){},509:function(s,t,e){"use strict";e(472)},525:function(s,t,e){"use strict";e.r(t);var a={components:{LineChart:e(445).default},data:function(){return{chartData:null,chartOptions:null}},mounted:function(){this.updateGraph()},methods:{updateGraph:function(){for(var s=[2.13,2.12,2.109,2.099,2.088,2.078,2.067,2.057,2.046,2.036,2.025,2.015,2.004,1.994,1.983,1.973,1.962,1.952,1.941,1.931,1.92],t=document.getElementById("leadacid").value,e=[],a=0;a<21;a++)e.push({x:100-5*a,y:s[a]*t});var n=[3.392,3.314,3.309,3.308,3.304,3.296,3.283,3.275,3.271,3.268,3.265,3.264,3.262,3.252,3.24,3.226,3.213,3.19,3.177,3.132,2.833],r=document.getElementById("lfp").value,i=[];for(a=0;a<21;a++)i.push({x:100-5*a,y:n[a]*r});var j=[4.195,4.134,4.088,4.055,4.025,3.992,3.961,3.923,3.882,3.857,3.837,3.818,3.802,3.786,3.763,3.744,3.725,3.701,3.683,3.587,2.75],l=document.getElementById("nmc").value,o=[];for(a=0;a<21;a++)o.push({x:100-5*a,y:j[a]*l});this.chartData={datasets:[{label:"Lead acid",pointRadius:0,borderWidth:2,borderColor:"#6b6b6b",backgroundColor:"#6b6b6b",fill:!1,data:e},{label:"LiFePO4",pointRadius:0,borderWidth:2,borderColor:"#fbbe59",backgroundColor:"#fbbe59",fill:!1,data:i},{label:"Li-ion NMC",pointRadius:0,borderWidth:2,borderColor:"#005e85",backgroundColor:"#005e85",fill:!1,data:o}]},this.chartOptions={scales:{xAxes:[{type:"linear",display:!0,scaleLabel:{display:!0,labelString:"State of charge (%)"},gridLines:{display:!0},ticks:{reverse:!0}}],yAxes:[{type:"linear",display:!0,scaleLabel:{display:!0,labelString:"Battery voltage (V)"},ticks:{beginAtZero:!0},gridLines:{display:!0}}]},legend:{usePointStyle:!0},tooltips:{enabled:!1},responsive:!0,maintainAspectRatio:!1}}}},n=(e(509),e(18)),r=Object(n.a)(a,(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticStyle:{overflow:"auto"}},[e("line-chart",{attrs:{"chart-data":s.chartData,options:s.chartOptions}}),s._v(" "),e("p"),e("div",{staticClass:"left"},[s._v("Lead-acid:")]),s._v(" "),e("div",{staticClass:"right"},[e("input",{attrs:{type:"number",id:"leadacid",step:"1",value:"6",width:"30"},on:{change:function(t){return s.updateGraph()}}}),s._v(" cells in series")]),s._v(" "),e("div",{staticClass:"left"},[s._v("LiFePO4: ")]),s._v(" "),e("div",{staticClass:"right"},[e("input",{attrs:{type:"number",id:"lfp",step:"1",value:"4"},on:{change:function(t){return s.updateGraph()}}}),s._v(" cells in series")]),s._v(" "),e("div",{staticClass:"left"},[s._v("Li-ion NMC: ")]),s._v(" "),e("div",{staticClass:"right"},[e("input",{attrs:{type:"number",id:"nmc",step:"1",value:"3"},on:{change:function(t){return s.updateGraph()}}}),s._v(" cells in series")]),s._v(" "),e("p")],1)}),[],!1,null,null,null);t.default=r.exports}}]);