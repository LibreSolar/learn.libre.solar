(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{561:function(e,t,a){"use strict";a.r(t);var r=a(18),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"battery-management-system"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#battery-management-system"}},[e._v("#")]),e._v(" Battery Management System")]),e._v(" "),a("p",[e._v("A Battery Management System (BMS) is an electronic circuit to monitor and protect rechargeable battery cells.")]),e._v(" "),a("p",[e._v("Like most electronics, accumulators are limited in the voltage and current they can handle. While some are quite robust in terms of e.g. overvoltage or deep-discharge, it is vital especially for Li-on batteries to monitor charge and discharge currents as well as charging cycles to ensure a long lifetime.\nIn most cases, a battery "),a("strong",[e._v("pack")]),e._v(" consists of multiple "),a("strong",[e._v("modules")]),e._v(", which each again consist of multiple "),a("strong",[e._v("cells")]),e._v(". A single cell is the atomic unit of a battery and comes in different shapes [1]. The pouch and prismatic cell shapes are most used in consumer electronics (mobile phones, laptops). In applications with higher energy demand, prismatic, cylindrical and pouch shaped cells are common. Pouch cells need to be packed into modules, which include a frame, sensors and sometimes features for cooling. Multiple modules are than stacked into a pack, which includes the BMS, cooling, fuses and necessary wiring amongst other components [1].")]),e._v(" "),a("h2",{attrs:{id:"main-functions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#main-functions"}},[e._v("#")]),e._v(" Main Functions")]),e._v(" "),a("h3",{attrs:{id:"state-of-charge"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#state-of-charge"}},[e._v("#")]),e._v(" State of Charge")]),e._v(" "),a("p",[e._v("The BMS monitors the current going into and out of the cells determines when to stop dis-/charging based on the state of charge (SOC).")]),e._v(" "),a("p",[e._v("The SOC of the cells is calculated by combining current and voltage measurements, sometimes temperature.")]),e._v(" "),a("p",[e._v("The most simple SOC determination is done with an open circuit voltage (OCV) lookup table.\nIt can have a significant deviations from the actual SOC due to the OCV not being accurately measurable during current flow. An improved algorithm consists of combining the voltage measurement with a current measurement, accumulating the current into or out of a cell, also known as coulomb counting.")]),e._v(" "),a("p",[e._v("The current research on SOC estimation suggests that a favorable algorithm to perform the combination of current and voltage is the extended Kalman filter (EKF) or variations of it. This method is known as sensor fusion and is well established. More advanced methods use an equivalent circuit model of the cell (ECM) in order to account for changing cell characteristics like internal resistance. These methods not only provide a better SOC, but also the state of health (SOH) of the battery. Good literature by Dr. Gregory L. Plett on implementation of such algorithms can be found "),a("a",{attrs:{href:"http://mocha-java.uccs.edu/ECE5720/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"electric-cell-protection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#electric-cell-protection"}},[e._v("#")]),e._v(" Electric Cell Protection")]),e._v(" "),a("p",[e._v("As described in chapter "),a("RouterLink",{attrs:{to:"/system/battery.html"}},[e._v('"Battery"')]),e._v(", different cells have different minimum and maximum voltage levels as well as different phases while charging/discharging.")],1),e._v(" "),a("p",[e._v("The BMS is responsible to measure the voltage, current and temperature and stop or reduce dis-/charging in order to stay within defined safety limits of the cells.")]),e._v(" "),a("p",[e._v("To disconnect the battery from the load/charger, different types of switches can be used. For low current systems, a MOSFET switch is often easiest to use, while a mechanical or solid state relais can be necessary to switch higher voltages and currents.")]),e._v(" "),a("h3",{attrs:{id:"thermal-protection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#thermal-protection"}},[e._v("#")]),e._v(" Thermal Protection")]),e._v(" "),a("p",[e._v("In order to keep the battery in a safe operational state, a thermal managmenent is required. The system can either be active or passive, using mostly air or another liquid coolant. The necessary hardware like fans and their electronics are mostly not considered part of the BMS but are controlled by it.")]),e._v(" "),a("h3",{attrs:{id:"balancing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#balancing"}},[e._v("#")]),e._v(" Balancing")]),e._v(" "),a("p",[e._v("To optimize performance and lifetime of battery packs, balancing is used to compensate deviations in cell capacity and prevent localized over- or under-charging of cells. Since cells differ slightly in capacity depending on the quality of the manufacturing process and used materials or by cell aging, cells connected in series can show different voltages.")]),e._v(" "),a("p",[e._v("To normalize the SOC for each cell, a BMS can either actively transfer energy from higher charged cells to those with lower SOC or passively by converting energy from cells with high SOC into heat through a resistor. The resistor is connected in parallel to the cell and switched on with a transistor for the cells with higher voltage, thus having excessive charge in comparisons to the other cells in series. Passive balancing slightly increases the thermal energy dissipated by the pack and decreases the overall efficiency.")]),e._v(" "),a("p",[e._v("Active balancing aims to distribute the energy better while charging and discharging, but is more complex and needs more expensive circuitry.")]),e._v(" "),a("h3",{attrs:{id:"communication"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#communication"}},[e._v("#")]),e._v(" Communication")]),e._v(" "),a("p",[e._v("A BMS usually also features communication capabilities to distribute information to other system components like "),a("RouterLink",{attrs:{to:"/system/charge_controller.html"}},[e._v("charge-controllers")]),e._v(" or logging systems. Commonly used for standalone setups is a serial connection while bus connections like CAN are preferably used in systems with multiple components. See chapter "),a("RouterLink",{attrs:{to:"/development/communication.html"}},[e._v("Communication")]),e._v(" for more information.")],1),e._v(" "),a("h3",{attrs:{id:"bus-precharge"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bus-precharge"}},[e._v("#")]),e._v(" Bus precharge")]),e._v(" "),a("p",[e._v("Especially batteries with higher voltages usually have a precharge system to prevent high inrush currents into large capacitors connected to the battery (e.g. inside inverters). The system slowly charges these capacitors by connecting a resistor in series with the battery for a short period of time before switching the battery on. As soon as the bus voltage is close to the battery voltage, the resistor is bypassed and the battery is directly connected to the external system via a contactor or solid-state switch.")]),e._v(" "),a("h2",{attrs:{id:"topologies"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#topologies"}},[e._v("#")]),e._v(" Topologies")]),e._v(" "),a("p",[e._v("Depending on the size of the battery and the application, a BMS can have different topologies.")]),e._v(" "),a("h3",{attrs:{id:"centralized"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#centralized"}},[e._v("#")]),e._v(" Centralized")]),e._v(" "),a("p",[e._v("The BMS is directly connected to every single cell of the battery, monitoring several states in parallel. For standalone setups, where size is fixed, this topology is easiest to implement. The systems developed by Libre Solar follow this centralized approach.")]),e._v(" "),a("fig-caption",{attrs:{src:"system/bms_centralized.svg",caption:"Centralized BMS layout",num:"1"}}),e._v(" "),a("h3",{attrs:{id:"distributed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#distributed"}},[e._v("#")]),e._v(" Distributed")]),e._v(" "),a("p",[e._v("A monitoring unit is connected to each cell, reporting information about the cell to a central controller. The cell monitoring units are connected (daisy-chained) using galvanically isolated communication.")]),e._v(" "),a("fig-caption",{attrs:{src:"system/bms_distributed.svg",caption:"Distributed BMS layout",num:"2"}}),e._v(" "),a("p",[e._v("This topology is mainly found in DIY projects and is feasible also for a high number of cells in series (high voltage batteries). A good Open Source project using this approach is Stuart Pittaways "),a("a",{attrs:{href:"https://github.com/stuartpittaway/diyBMSv4",target:"_blank",rel:"noopener noreferrer"}},[e._v("diyBMS"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"modular"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#modular"}},[e._v("#")]),e._v(" Modular")]),e._v(" "),a("p",[e._v("Larger battery packs e.g. for electric vehicles predominantly use a modular BMS. A module controller board is connected to 8 to 16 cells, measuring cell voltages and temperatures. Each of those units is than connected to a main BMS controller using galvanically isolated communication. The main BMS controller is responsible for the core safety functions and the analysis of the data collected from the module controllers.")]),e._v(" "),a("fig-caption",{attrs:{src:"system/bms_modular.svg",caption:"Modular BMS layout",num:"3"}}),e._v(" "),a("p",[e._v("An Open Source project using this toplology is the "),a("a",{attrs:{href:"https://foxbms.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("foxBMS"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h2",[e._v("References")]),e._v(" "),a("p",[e._v("[1] Automotive Batteries 101, David Greenwood, University of Warwick,  2018 "),a("a",{attrs:{href:"https://warwick.ac.uk/fac/sci/wmg/business/automotive_batteries_101_wmg-apc.pdf",target:"_blank",rel:"noopener noreferrer"}},[e._v("Link"),a("OutboundLink")],1)])],1)}),[],!1,null,null,null);t.default=s.exports}}]);