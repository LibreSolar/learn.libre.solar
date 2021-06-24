# Droop Control

If the DC grid voltage is decoupled from all power sources and sinks, the locally measured voltage of each grid participant can be used to control the power flows within the grid.

This chapter describes the control mode of the grid port for most important grid participants.

The voltage setpoints can be set arbitrarily. Here we use setpoints currently implemented in a 48V grid pilot developed by Libre Solar for demonstration.

As a convention, current/power flow towards the grid (export) has a positive sign and current consumed from the grid (import) has a negative sign.

## Renewable energy source

A renewable energy source (e.g. solar panel) connected to the grid via a DC/DC converter will only export power to the grid.

The operating range of the converter at the grid side is shown in Fig. 1.

<fig-caption src="system/droop_control_solar.svg" caption="Droop control: Renewable energy source" num="1" />

If no power is consumed from the grid, the grid controller will ramp up the grid voltage until it reaches is maximum grid voltage setpoint $v_{max} = 55\,\mathrm{V}$. As soon as power is consumed, the controller tries to maintain that voltage until it reaches its maximum input power limit $P_{max}$. For a solar panel, this is the maximum power point (MPP), which mainly depends on the solar irradiance. If the power consumed in the grid increases further, the converter cannot maintain the voltage anymore. It will drop until it reaches the maximum current limit of the device and finally completely break down if the demand in the grid is not reduced.

## Energy storage device

An energy storage device like a Lithium-ion battery can import and export power, as shown in Fig. 2.

<fig-caption src="system/droop_control_battery.svg" caption="Droop control: Energy storage device" num="2" />

It will import at high grid voltages and export at lower voltages to support the grid.

Between importing and exporting mode, the battery needs a voltage hysteresis to prevent charge transfer between batteries.

In contrast to the solar panel, the operating curve of an energy storage device has a slope, which is called the droop curve. This droop makes the system react like a voltage source with a series resistor. If the power increases, the voltage drops, indicating that the load in the system is high. This behavior is used to control the grid, as explained further down below.

If the state of charge (SOC) of the battery is high, the operating curve can be slightly moved upwards, which causes full batteries to start exporting their energy before batteries with low state of charge.

## Smart load

Loads can be connected directly to the grid and don't have to be smart, i.e. measure the grid voltage and change their operation depending on it.

However, in order to prioritize different loads depending on the available power or energy, it makes sense to implement at least a threshold below which a load would shut off itself.

If possible, a load should also implement a droop curve behavior, as shown in Fig. 3.

<fig-caption src="system/droop_control_load.svg" caption="Droop control: Smart load (pure consumer)" num="3" />

Loads with low priority operate only at high grid voltages.

The line indicated with "low prio" would switch the load on only after all batteries have been fully charged (i.e. don't pull the grid voltage down anymore). So it would only use abundant renewable energy. This method could be used for heating or other wasteful uses of electricity.

The high priority load with dashed lines would only get switched off when there is no energy left in the grid at all.

## Grid connection

As a demonstration how the different participants interact with each other via the droop control mechanism, Fig. 4 shows a very simple grid with only one solar panel (left side) and one battery (right side).

<fig-caption src="system/droop_control_solar_battery.svg" caption="DC nanogrid overview" num="1" />

The red line indicates the equilibrium which is automatically reached when those two grid interfaces are connected. The solar converter operates in its maximum power point and the battery consumes exactly the same amount of current as provided by the solar panel towards the grid (neglecting any losses).

If the solar panel gets shaded, the maximum power will decrease and the $P_{max}$ curve will move to the left. The battery controller will immediately react and reduce the imported current. The resulting grid voltage will be lower than before.
