---
sidebarDepth: 2
---

# Charge Controller

A charge controller regulates the voltage and/or current flowing into batteries. By doing so, it prevents the batteries from overcharging and ensures good battery lifetime.

## Solar

Solar energy is the predominant method for off-grid electricity generation, as it does not require any moveable parts and is easily installed.
PWM (Pulse Width Modulation) charge controller is in pratice a switch connected between solar panel and a battery. During bulk or constant current load, the switch is simply closed and the battery is charged with whatever current the panel can provide. The panel's voltage is pulled down which effectively lowers the panels efficiency since it is not operating in its **maximum power point**. After bulk charging, the pwm-controller will apply different duty cycles resulting in current boosts, effectively applying a constant voltage. The cycles are adapted depending on the the battery's charge state. The **interactive** example in Figure [1] shows the power effectively used for charging a battery with a given base voltage. The closer the rated battery voltage to the maximum power point voltage, the higher the overall efficiency.

As explained in the [Solar Panel](solar_panel.md) chapter, the voltage of a solar panel depends on the number of cells, the temperature, the irradiance and the amount current draw.

Most 12 V solar panels output 16-20 V in their maximum power point, whereas 12 V batteries usually need around 14-14.5 V to get fully charged. Direct connection of batteries to the solar panel without any regulation causes damage to the batteries as a result of overcharging.

There are mainly two different types of charge controllers, the Maximum Power Point Trackers (MPPT) and cheaper pulse-width modulated (PWM) series switch regulators.

### Maximum Power Point Tracker

<fig-caption src="system/mppt-charge-controller.svg" caption="MPPT charge controller" num="1" />

MPPT (Maximum Power Point Tracking) controllers contain a DC-DC converter which matches varying voltage at the solar panel input with the output at the battery side.

Because of the typically high conversion efficiencies (>95%), power at input and output remains the same whereas the voltage and current varies correspondingly. In order to get the best out of solar panels, MPPT charge controller finds and operates at optimal current-voltage point. In contrast, PWM controllers operate at the voltage equal to that of battery voltage which is not an optimal current-voltage point resulting in wastage of power. There are many ways to implement the tracking, two will be described here.

#### Fractional Open Circuit Voltage

This methods uses a simple linear relationship between the open circuit and maximum powerpoint voltage:

$$V_{MPP} = k \cdot V_{oc}$$

The factor $k$ can be determined for a given solar panel than used to track the maximum. It is dependant on the panels' temperature though and has to be corrected accordingly. This method is simple to implement though the factor and its temperature dependency has to be adapted to every installation so that the controller itself is not that versatile.

#### Perturb and Observe

As described in the [DC/DC-Converter chapter](../development/dcdc_converter), a longer duy cycle corresponds to higher input voltage at the converter which is also the voltage across the panel. With this method, the converter will start to draw small amounts of power with a small duty cycle and closely measure the power output. It will increase the duty cycle and measure again. If the output is increased, it will further increase the duty cycle and so on until the power decreases and the duty cycle is decreased as well. With a high frequeny, this method will find the MPP but will also always move away again and then jump back. Though it will not always be precisely on the MPP, it will stay very close to it and does not need any temperature adjustmenents.

### PWM Series Regulator

<fig-caption src="system/pwm-charge-controller.svg" caption="PWM charge controller" num="2" />

PWM (Pulse Width Modulation) charge controller is in pratice a switch connected between solar panel and a battery. Instead of providing a steady output, it sends out a series of charging pulses to the battery. The controller constantly checks the state of the battery to determine the frequency and duty cycle of the pulse. In a fully discharged battery, the pulses would be continuous while at the end of the battery charging cycles, pulses get very short to reduce the average current. The controller checks the state of charge on the battery between pulses and adjusts itself each time.

### Other types

#### On/off regulators

#### Shunt regulators

### MPPT vs. PWM comparison

::: warning TODO
- Characteristic curve of solar and what is good about it
- Interactive graph to explain different performance of MPPT and PWM
:::

The current-voltage and power-voltage curves of the panels are given in the below interactive graph as shown in Fig.1

The red line indicates the battery voltage and the corrsponding power output when using a PWM-controller. Increasing the battery voltage to match the panels voltage would improve the systems performance but as soon as the panels voltage drops, no loading could be done anymore.

<charge-controller-curve/>

<figure>
<center>
    <figcaption><b>Figure 1.</b> Usable energy MPPT vs. PWM <b>(interactive)</b>.</figcaption>
</center>
</figure>

#### Temperature influence

Temperature has significant effect on the efficiency of charge controllers. As the temperature increases, $V_{oc}$ decreases i.e, current-voltage curve moves to the left but the current remains almost constant as seen from the interactive graph in Fig.1. Consequently, the power-voltage graph and hence maximum power point also moves towards lower value.
Since the maximum power point moved to the lower value, the power transferred with a MPPT charge controller decreases. At this point, MPPT charge controllers can no longer outperform PWM charge controllers.

## Wind

For small wind turbines without variable-pitch speed-controller, a charge-controller can be used to keep the turbine at optimal rotation speed. Especially for wind speeds below the rated optimal wind, it is beneficial to reduce the load so that the turbine is not slowed down too much. For most turbines, the power coefficient $c_p$ is linked to the ratio between blade tips and the wind speed (TSR or $\lambda$) as shown in Figure [3]. A MPPT can be implemented in different ways. One approach could be to measure wind, rotational speed and have a pre-calculated look-up table for the power coefficient and regulate the accordingly. A major drawback is the pre-calculated look-up table, which is specific to one turbine and has to be verified with measurements in controlled conditions like a wind tunnel. It is also necessary to measure the wind which adds to the complexity. 

Another, turbine-agnostic way is a dynamic approach where the duty cycle of the converter is permanently changed and the slope of the power production measured. Since the general curve is known (Figure [3]), this mehod will always approach the maximum point independently from any wind or rotational speed measurements. 

<fig-caption src="system/cp_vs_tsr.png" caption="Power coefficient vs. Tip Speed Ratio  [1]" style="width:100%"  num="3" />

### MPPT with dump load

Since wind turbines require a [dump load](dump_load) to protect it from spinning free, the circuit has to be adopted so that the charge controller can use it.

<fig-caption src="system/wind-mppt-charge-controller.svg" caption="Wind MPPT charge controller" num="4" />

### PWM load diversion

<h2>References</h2>

[1] R. Kot, , M. Rolak, M. Malinowski: Comparison of maximum peak power tracking algorithms for a small wind turbine, Warsaw, 2013