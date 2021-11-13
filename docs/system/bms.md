# Battery Management System

A Battery Management System (BMS) is an electronic circuit to monitor and protect rechargeable battery cells.

Like most electronics, accumulators are limited in the voltage and current they can handle. While some are quite robust in terms of e.g. overvoltage or deep-discharge, it is vital especially for Li-on batteries to monitor charge and discharge currents as well as charging cycles to ensure a long lifetime.
In most cases, a battery **pack** consists of multiple **modules**, which each again consist of multiple **cells**. A single cell is the atomic unit of a battery and comes in different shapes [1]. The pouch and prismatic cell shapes are most used in consumer electronics (mobile phones, laptops). In applications with higher energy demand, prismatic, cylindrical and pouch shaped cells are common. Pouch cells need to be packed into modules, which include a frame, sensors and sometimes features for cooling. Multiple modules are than stacked into a pack, which includes the BMS, cooling, fuses and necessary wiring amongst other components [1].

## Main Functions

### State of Charge

The BMS monitors the current going into and out of the cells determines when to stop dis-/charging based on the state of charge (SOC).

The SOC of the cells is calculated by combining current and voltage measurements, sometimes temperature.

The most simple SOC determination is done with an open circuit voltage (OCV) lookup table.
It can have a significant deviations from the actual SOC due to the OCV not being accurately measurable during current flow. An improved algorithm consists of combining the voltage measurement with a current measurement, accumulating the current into or out of a cell, also known as coulomb counting.

The current research on SOC estimation suggests that a favorable algorithm to perform the combination of current and voltage is the extended Kalman filter (EKF) or variations of it. This method is known as sensor fusion and is well established. More advanced methods use an equivalent circuit model of the cell (ECM) in order to account for changing cell characteristics like internal resistance. These methods not only provide a better SOC, but also the state of health (SOH) of the battery. Good literature by Dr. Gregory L. Plett on implementation of such algorithms can be found [here](http://mocha-java.uccs.edu/ECE5720/index.html).

### Electric Cell Protection

As described in chapter ["Battery"](battery.md), different cells have different minimum and maximum voltage levels as well as different phases while charging/discharging.

The BMS is responsible to measure the voltage, current and temperature and stop or reduce dis-/charging in order to stay within defined safety limits of the cells.

To disconnect the battery from the load/charger, different types of switches can be used. For low current systems, a MOSFET switch is often easiest to use, while a mechanical or solid state relais can be necessary to switch higher voltages and currents.

### Thermal Protection

In order to keep the battery in a safe operational state, a thermal managmenent is required. The system can either be active or passive, using mostly air or another liquid coolant. The necessary hardware like fans and their electronics are mostly not considered part of the BMS but are controlled by it.

### Balancing

To optimize performance and lifetime of battery packs, balancing is used to compensate deviations in cell capacity and prevent localized over- or under-charging of cells. Since cells differ slightly in capacity depending on the quality of the manufacturing process and used materials or by cell aging, cells connected in series can show different voltages.

To normalize the SOC for each cell, a BMS can either actively transfer energy from higher charged cells to those with lower SOC or passively by converting energy from cells with high SOC into heat through a resistor. The resistor is connected in parallel to the cell and switched on with a transistor for the cells with higher voltage, thus having excessive charge in comparisons to the other cells in series. Passive balancing slightly increases the thermal energy dissipated by the pack and decreases the overall efficiency.

Active balancing aims to distribute the energy better while charging and discharging, but is more complex and needs more expensive circuitry.

### Communication

A BMS usually also features communication capabilities to distribute information to other system components like [charge-controllers](charge_controller.md) or logging systems. Commonly used for standalone setups is a serial connection while bus connections like CAN are preferably used in systems with multiple components. See chapter [Communication](../development/communication.md) for more information.

### Bus precharge

Especially batteries with higher voltages usually have a precharge system to prevent high inrush currents into large capacitors connected to the battery (e.g. inside inverters). The system slowly charges these capacitors by connecting a resistor in series with the battery for a short period of time before switching the battery on. As soon as the bus voltage is close to the battery voltage, the resistor is bypassed and the battery is directly connected to the external system via a contactor or solid-state switch.

## Topologies

Depending on the size of the battery and the application, a BMS can have different topologies.

### Centralized

The BMS is directly connected to every single cell of the battery, monitoring several states in parallel. For standalone setups, where size is fixed, this topology is easiest to implement. The systems developed by Libre Solar follow this centralized approach.

<fig-caption src="system/bms_centralized.svg" caption="Centralized BMS layout" num="1" />

### Distributed

A monitoring unit is connected to each cell, reporting information about the cell to a central controller. The cell monitoring units are connected (daisy-chained) using galvanically isolated communication.

<fig-caption src="system/bms_distributed.svg" caption="Distributed BMS layout" num="2" />

This topology is mainly found in DIY projects and is feasible also for a high number of cells in series (high voltage batteries). A good Open Source project using this approach is Stuart Pittaways [diyBMS](https://github.com/stuartpittaway/diyBMSv4).

### Modular

Larger battery packs e.g. for electric vehicles predominantly use a modular BMS. A module controller board is connected to 8 to 16 cells, measuring cell voltages and temperatures. Each of those units is than connected to a main BMS controller using galvanically isolated communication. The main BMS controller is responsible for the core safety functions and the analysis of the data collected from the module controllers.

<fig-caption src="system/bms_modular.svg" caption="Modular BMS layout" num="3" />

An Open Source project using this toplology is the [foxBMS](https://foxbms.org/).

<h2>References</h2>

[1] Automotive Batteries 101, David Greenwood, University of Warwick,  2018 [Link](https://warwick.ac.uk/fac/sci/wmg/business/automotive_batteries_101_wmg-apc.pdf)
