# Losses and Heat

In every real electrical system, flowing currents are generating heat inside the components. While most low energy devices do not generate significant amount of losses, power electronics need to dissipate large amount of thermal energy.

There are many different components on a board that contribute to the overall power loss, like resistors, traces, fuses, coil resistance and other ohmic resistances. In circuits with frequent switching, the impedance of capacitators and inductances can play a role as well, but won't be treated here.

The main factor for heat generation in power electronics are the semi-conductors, mainly **MOSFETs** used for switching. In the following, switching and conduction losses for MOSFETs are explained and different ways to dissipate the heat are given.

## Conduction loss

Conduction loss appears in the steady-state phase when the system is not changing anymore after being switched on. The heat flow can be calculated using

$$ \dot{Q}_{cond} = R_{DS(on)} \cdot I^2 $$

where $R_{DS}$ is the internal gate to source resistance of the transistor, which can be obtained from the datasheet and $I$ is the current flowing through it. If the transitor is used in converters or else and is switched on and off frequently (e.g. a PWM [charge controller](../system/charge_controller.md)), the duty cycle (in percent) should be used to weigh the power loss:

$$ \dot{Q}_{cond} = R_{DS} \cdot I^2 \cdot D$$

To reduce conduction loss, a bigger transistor with a larger channel can be used to reduce $R_{DS}$. That also means a longer switching time because the internal gate capacitance in the transistor is greater, which increases the switching time and therefore the switching loss. In high frequency switching applications with a low duty cycle, it can be better to optimize for low switching time than low internal resistance.

## Switching loss

When a transistor is switching, the conducting channel has to build up. When the gate to source voltage is higher than the threshold voltage, the channels starts to form and the resistance $R_{DS}$ starts to fall. Until the channel has formed completly, the transistor acts as a ohmic resistance, the power loss in it can be obtained by

$$\dot{Q}_{swit} = \frac{1}{2\cdot T_s} \cdot t_{on} \cdot V_{DS} \cdot I_{DS}$$

where $T_s$ is the timespan for one switching process. The equivalent function with $f_s = \frac{1}{T_s}$ shows that the switching loss increases with the switching frequency:

$$\dot{Q}_{swit} = \frac{1}{2} \cdot t_{on} \cdot V_{DS} \cdot I_{DS} \cdot f_s$$

Both $V_{DS}$ and $I_{DS}$ are changing during the switching time. Figure 1 shows voltage and current during the process.

<figure>
    <switching-loss/>
    <br/>
<center>
    <figcaption><b>Figure 1.</b> Current and voltage of the transistor during switching.
    </figcaption>
</center>
</figure>

At $t1$, the gate voltage reaches the threshold voltage and the drain-source current starts to flow. At $t2$ the current reaches its maximum and the drain voltage starts to fall. In this point, the switching power loss is at its maximum too. Until $t3$, the drain voltage drops as inner resistance $R_{DS}$ decreases and so $t_{on} = t_3 -t_1$. The same procedure in reverse happens when the MOSFET is switched off.

The total power loss per duty cylce can be aggregated as

$$\dot{Q}_{tot} = 2\cdot \dot{Q}_{swit} + \dot{Q}_{cond}$$

## Heat dissipation

To dissipate heat from the board, some design considerations have to be made. In general, heat can be transferred through convection, conduction and radiation, where radiation is the least effective at low temperatures. Dissipation is necessary to keep parts from overheating. Especially semiconductors deteriorate faster when working under high temperatures.

In many cases, conduction is used to transfer heat between parts, e.g. the MOSFET case and a heat sink while convection is used to transfer the heat to the environment and away from the component. The main factor for heat dissipation is the thermal resistance. This can be the connection from a MOSFET to a heat sink or the junction within the MOSFET to its case. It depends on the thermal conductivity of elements and connection between parts. The greater the surface of a connection, the lower the resistance. For example, copper has a better conductivity and thus lower thermal resistance than plastic. For many electronic components, thermal resistance values are given in the datasheet.

The calculations for thermal resistance and heat transfer are quite similar to those for voltage, current and resistance.

The thermal resistance is given in $\mathrm{°C/W}$, the temperature in $\mathrm{°C}$ and the power in $\mathrm{W}$.
When a power (equivalent to current) of $1\, \mathrm{W}$ is flowing through a thermal resistance with $2\, \mathrm{°C/W}$ (equivalent to electrical resistance), a temperature difference of $2\, \mathrm{°C}$ is seen over the component (equivalent to voltage drop across a resistance). Like with electronic circuits, thermal resistances can be placed in series or in parallel.

**Example:**

A heat sink is connected to a MOSFET with a screw only (no heat paste or silikon conductor). The thermal resistance between air and heat sink is $R_{th,1}=6\, \mathrm{°C/W}$ and the connection with the MOSFET has a thermal resistance of $R_{th,2}=1\, \mathrm{°C/W}$. The connection between the semiconductor and the casing has a thermal resistance of $R_{th,3}=5\, \mathrm{°C/W}$ and the ambient temperature is $20\, \mathrm{°C}$. The power dissipated in the semiconductor is $\dot{Q}=5\, \mathrm{W}$.

The first temperature difference from the air to the heat sink can be calculated:

$$\Delta T_1 = \dot{Q} \cdot R_{th, 1} = 5\, \mathrm{W} \cdot 6\, \mathrm{°C/W} = 30\, \mathrm{°C}$$

The next temperature differences are calculated accordingly:

$$\Delta T_2 = \dot{Q} \cdot R_{th, 2} = 5\, \mathrm{W} \cdot 1\, \mathrm{°C/W} = 5\, \mathrm{°C} \\
\Delta T_3 = \dot{Q} \cdot R_{th, 3} = 5\, \mathrm{W} \cdot 5\, \mathrm{°C/W} = 25\, \mathrm{°C}$$

So beginning with the ambient temperature, the epected temperature inside the MOSFET is the sum of the differences across all thermal resistances:

$$T_{trans} = T_{amb} + \Delta T_1 + \Delta T_2 + \Delta T_3 = 80\, \mathrm{°C}$$

It is clear, that the temperature rises with the ambient temperature or with increased thermal resistance in the chain. While this method is not highly precise, it gives a good overview of the weakest links and can help to improve cooling. The goal should always be to keep the temperature as low as possible without exaggerated complexity and cost.

### Passive cooling

When passive cooling is used, the air flow (or any other liquid) is created simply by the density differences due to temperature gradients. The MOSFET can be either connected to the PCB where its surface is then passing the heat to the air passively or to a heat sink. The heat sink has an optimized surface and good heat conducting characteristics to spread the heat fast and transfer it to the air over a large surface area. In both cases, the airflow is low and so is the amount of heat dissipated. For low power appliances, this method is suitable, for larger power electronics, active cooling can be necessary.

### Active Cooling

With active cooling, a forced flow is generated over the surface of the PCB or heat sink. This can be done by simply blowing air with a fan or pumping a liquid. While a fan is mostly cheapest and easiest to implement, using a water cooled system can be necessary for very high power density and with limited space.

In the above example, if active cooling would reduce the thermal resistance of the heat sink by e.g. $50\, \mathrm{\%}$, the expected temperature would be reduced by $15\, \mathrm{°C}$.

### Further information

Training video from Texas Instruments: [Video](https://training.ti.com/conduction-convection-and-radiation?context=1147983-1148063-1148064)

Good mathematical description on Youtube: [Video](https://www.youtube.com/watch?v=2uWHkUAsEaQ)
