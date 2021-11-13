(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{551:function(e,t,r){"use strict";r.r(t);var a=r(18),o=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"printed-circuit-board"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#printed-circuit-board"}},[e._v("#")]),e._v(" Printed Circuit Board")]),e._v(" "),r("p",[e._v("The first step to build up the hardware is ordering a PCB. Most of the PCBs for the Libre Solar devices are too complex to be produced yourself with etching or milling processes, so the PCBs will need to be ordered from a manufacturer. This guide shows how all necessary data are obtained for the fabrication.")]),e._v(" "),r("h2",{attrs:{id:"native-board-files"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#native-board-files"}},[e._v("#")]),e._v(" Native board files")]),e._v(" "),r("p",[e._v("More and more PCB manufacturers accept native KiCad or Eagle board files and thus provide a very easy way to get the PCB produced. For KiCad, just upload the "),r("em",[e._v(".kicad_pcb")]),e._v(" found in your PCB root directory and you are done.")]),e._v(" "),r("h2",{attrs:{id:"gerber-file-export"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#gerber-file-export"}},[e._v("#")]),e._v(" Gerber file export")]),e._v(" "),r("p",[e._v("Gerber is a standardized exchange format for PCBs, which is understood by all manufacturers and which can be exported with any PCB design software.")]),e._v(" "),r("p",[e._v("However, the Gerber export is a bit more complicated than providing native files and needs some correct settings. We will explain the export in KiCad.")]),e._v(" "),r("p",[e._v("After the board is opened in Pcbnew, the solder mask clearance and min width must be set to zero. This is important because the manufacturers normally want to define the clearance themselves based on their process. Setting it to zero makes it easier for them to shrink/enlarge the pads for the solder mask. The dialogue can be found under "),r("em",[e._v("File > Board Setup")]),e._v(" as shown in Figure 1.")]),e._v(" "),r("fig-caption",{attrs:{src:"production/pcbs_kicad_pads_clearance.png",caption:"Pads and Mask Clearance dialog (KiCad v5.1.4)",num:"1"}}),e._v(" "),r("p",[e._v("After that, open the Gerber export dialog under "),r("em",[e._v("File > Plot")]),e._v(" and select at least the following layers for export:")]),e._v(" "),r("ul",[r("li",[e._v("Top (Top copper plane)")]),e._v(" "),r("li",[e._v("GND (Internal GND plane, if existing)")]),e._v(" "),r("li",[e._v("3V3 (Internal power supply plane, if existing)")]),e._v(" "),r("li",[e._v("In"),r("em",[e._v("X")]),e._v(".Cu (Other internal copper planes, if existing)")]),e._v(" "),r("li",[e._v("Bottom (Bottom copper plane)")]),e._v(" "),r("li",[e._v("F.Silk (Front silk screen: white plots with part names, etc.)")]),e._v(" "),r("li",[e._v("B.Silk (Bottom silk screen)")]),e._v(" "),r("li",[e._v("F.Mask (Front solder mask: inverted surface areas for the typical green paint on the PCB)")]),e._v(" "),r("li",[e._v("B.Mask (Bottom solder mask)")]),e._v(" "),r("li",[e._v("Edge.Cuts (Margins along which the PCB edges should be cut, e.g. by milling)")]),e._v(" "),r("li",[e._v("F.Fab (Information for parts placement on top layer)")]),e._v(" "),r("li",[e._v("B.Fab (Information for parts placement on bottom layer)")])]),e._v(" "),r("p",[e._v("Select a folder where your files should be saved and press "),r("em",[e._v("Plot")]),e._v(":")]),e._v(" "),r("fig-caption",{attrs:{src:"production/pcbs_kicad_gerber_export.png",caption:"Gerber Export Settings (KiCad v5.1.4)",num:"2"}}),e._v(" "),r("p",[e._v("After sucessful export, press "),r("em",[e._v("Generate Drill Files")]),e._v(". Then select the same output directory and make sure that "),r("em",[e._v("PTH and NPTH in single file")]),e._v(" is "),r("strong",[e._v("not")]),e._v(" checked. Otherwise, your manufacturer doesn't know which holes are copper plated or not.")]),e._v(" "),r("fig-caption",{attrs:{src:"production/pcbs_kicad_drill_file.png",caption:"Drill Files Generation (KiCad v5.1.4)",num:"3"}}),e._v(" "),r("p",[e._v("After that you should have all necessary files ready for the PCB production. Compress all the files (gerber and drill files) to a .zip file and send them to the manufacturer.")])],1)}),[],!1,null,null,null);t.default=o.exports}}]);