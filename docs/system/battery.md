# Battery

This chapter will cover the necessary basics of electrical batteries in order to understand their usage in a DC energy system.
For more detailed information about the batteries,the excellent [Battery University website](https://batteryuniversity.com/) is highly recommended.


## Getting to know the battery

Battery can be seen metaphorically as a vessel or container that is slowly filled with a liquid. the amount of liquid that the vessel can hold is corresponding to the amount of energy the battery can store, the battery then runs for a certain amount of time like the common electric toys people purchase for their kids, gradually loses this filled amount of energy,  eventually it requires a replacement after the energy fades away completely and becomes a useless piece of hardware (if it does not have the option of recharging like the lithium-ion family). Theoretically speaking, batteries run for a while, deliver the charged energy for a time and then it expires since they are highly customized for specific customers needs and their daily usage.

In the context of physics, the battery is a device that converts the chemical energy stored inside it into electrical energy. it contains positive (+) and negative (-) terminals, generates electrons when electrochemical reactions occur between its two metal plates. when an external load is connected to it, the electrons flow from the negative to the positive terminal creating electrical current. it can then be used to power mobile devices, laptops and other electronics. for further understanding of the basic battery operation, the following youtube videos by [NICERC CIC](https://www.youtube.com/watch?v=PyrWx4ExZE4) and [MocomiKids](https://www.youtube.com/watch?v=gWKOjncBMCQ) are helpful.
 


In general, Batteries do not address adequate and sufficient solutions for the daily energy needs of people, yet they reasonably-well act as suitable energy storage for a specific amount of time.

## Battery types
### Single cells and voltage levels

The voltage of a single electrochemical cell is normally too low to be used in higher power application. If several single cells are connected in series to increase the voltage, this is called battery.

Typical 12V lead-acid batteries consist of 6 cells in series. A battery at a similar voltage using Lithium Iron-Phosphate cells needs only 4 cells, as the single cell voltage is at around 3.3V.

The following interactive graph shows the open circuit voltage (the voltage at the battery terminals without any current flow) for three different types of battery cells vs. their state of charge (SOC).

<battery-voltage-levels/>

For lithium-ion NMC cells, the open circuit voltage is a good indicator to determine the state of charge of the battery. Lead-acid batteries have a large hysteresis in the open circuit voltage, so the actual voltage measured at the terminal highly depends on whether the battery was charged or discharged before. So the SOC can only be roughly estimated. Lithium iron-phosphate cells have a very flat curve, so the voltage is almost the same at high and low SOC. Thus, additional measures for proper SOC calculation need to be implemented in a battery management system.

### Lead-acid

::: warning TODO
- Different types of lead-acid (wet, VRLA, AGM, etc.)
:::

### Lithium-ion

::: warning TODO
- What is special about li-ion chemistry?
- Battery Management System basics
:::


## Charge methods

::: warning TODO
- 2-stage, 3-stage, etc.
- Impact on lifetime
:::
