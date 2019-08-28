# Battery

This chapter will cover the necessary basics of electrical batteries in order to understand their usage in a DC energy system. For more detailed information the excellent [Battery University website](https://batteryuniversity.com/) is highly recommended.

## Battery types

### Single cells and voltage levels

The voltage of a single electrochemical cell is normally too low to be used in higher power application. If several single cells are connected in series to increase the voltage, this is called a battery.

Typical 12V lead-acid batteries consist of 6 cells in series. An battery at a similar voltage using Lithium Iron-Phosphate cells needs only 4 cells, as the single cell voltage is at around 3.3V.

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
