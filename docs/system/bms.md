# Battery Management System

A Battery Management System (BMS) is an electronic circuit that can manage a rechargeable device such as a battery pack or a single cell. Like most electonics, accumulator are limited in the voltage and current they can handle. Furthermore it is vital for most types of rechargeable batteries to monitor discharge and charge cycles to ensure a long lifetime.

## Main Functions

### Electric Cell Protection

As described in chapter ["Battery"](battery.md), different cells have different minimum and maximum voltage levels as well as different phases while charging/discharging.
The BMS is responsible to measure the voltage (and/or other indicators) and decide, in which state of charge (SOC) the cells are in order to apply the correct current and/or voltage.
It will optimise the charging rate and determine when to stop charging/discharging.

To disconnect the battery from the load/charger, different types of switches can be used. For low current systems, a MOSFET switch is often easiest to use, while a mechanical or solid state relais can be necessary to switch higher currents.



### Thermal Protection

In order to keep the battery in a safe operational state, the thermal managmenent is vital. The system can either be active or passive, using mostly air or another liquid coolant. The necessary hardware like fans and their electronics are mostly consider part of the BMS as well.


### Balancing

To optimize performance and lifetime of battery packs, balancing is used to distribute load and prevent localized over- or under-charging of cells. Since cells differ slightly in capacity depending on the quality of the manufacturing process and used materials or by cell-aging, cells connected in series can show different voltages. To normalize the SOC for each cell, a BMS can either actively transfer energy from higher charged cells to those with lower SOC or passivly limiting the charging, mostly by wasting energy from cells with 100% SOC until every cell is fully charged. 

Passive balancing can be done by bleeding energy to ground through a resistor and a transistor or bypassing the cell with an appropriate resistor, dropping the voltage across. In any case, passive balancing increases the thermal energy that needs to be dissipated by the thermal protection and decreases the overall efficieny.

Active balancing aims to distribute the energy better while charging and discharging, but need much more circuitry. Examples....

### Misc

A BMS can also feature communication capabilities to distribute information to other BMS or [charge-controllers](charge_controller.md) or logging systems. Commonly used for standalone setups is a serial connection while BUS connections like CAN are preferably used in systems with several components. See chapter [Communication](../development/communication.md) for more.

A common feature may also be the connection to a load, including a precharge system to mitigate spikes in current or voltage when the load is connected.

## Topologies

### Centralised

One single BMS is connected to every single cell of the battery, monitoring several states in parallel. For standalone setups, where size is fixed and cells are rather uniform, this topology is easiest to implement. The systems developed by LibreSolar follow this centralized approach.

<fig-caption src="system/bms_centralized.svg" caption="Centralized BMS layout" num="1" />


### Distributed

A monitoring unit is connected to each cell, reporting information about the cell to a central controller. A good OpenSource Project using this approach is Stuart Pittaways [diyBMS](https://github.com/stuartpittaway/diyBMSv4).

<fig-caption src="system/bms_distributed.svg" caption="Distributed BMS layout" num="2" />

### Modular

A modular setup is designed for larger battery packs. A specialized board is connected to 8 to 16 cells, measuring necessary data. Each of those units is than connected to a main BMS controller, who is responsible for the analysis of the data and has to take the appropriate steps. An OpenSource Project can be found [here](https://foxbms.org/).

<fig-caption src="system/bms_modular.svg" caption="Modular BMS layout" num="3" />
