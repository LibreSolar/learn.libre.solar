# Losses and Heat

In every real electrical system, flowing currents are generating heat inside the components. While most low energy devices do not generate siginificant amount of thermal waste, power electronics need to dissipate large amount of thermal energy.

There are many different components on a board that contribute to the overall power loss, like resistors, traces, fuses, coil resistance and other ohmic resistances. In circuits with frequent switching, the impedance of capacitators and inductances can play a role as well, but won't be treated here.

The main factor for heat generation in power electronics are the semi-conductors, mainly **MOSFETS** used for switching. In the following, switching and conduction losses for **MOSFETs** are explained and different ways to dissipate the heat are given.

## Conduction loss

Conduction loss appears in the steady-state phase when the system is not changing anymore after being switched on. The power can be calculated using

$$ P_{cond} = r_{ds} \cdot I^2 $$

where $r_{ds}$ is the internal gate to source resistance of the transistor, which can be obtained from the datasheet and $I$ is the current flowing through it. If the transitor is used in converters or else and is switched on and off frequently (e.g. a PWM [charge controller](../system/charge_controller.md)), the duty cycle (in percent) should be used to weigh the power loss:

$$ P_{cond} = r_{ds} \cdot I^2 \cdot D$$

To reduce conduction loss, a bigger transistor with a larger channel can be used to reduce $r_{ds}$. That also means a longer switching time because the capacitance in the transistor is greater, which increases the switching time and therefor the switching loss. In high frequency switching applications with a low duty cycle, it can be better to optimize for low switching time than low internal resistance.

## Switching loss

When a transistor is switching, the conducting channel has to build up. When the gate to source voltage is higher than the threshold voltage, the channels starts to form and the resistance $r_{ds}$ starts to fall. Until the channel has formed completly, the transistor acts as a ohmic resistance, the power loss in it can be obtained by

$$P_{swit} = \frac{1}{2\cdot T_s} \cdot t_{on} \cdot U_{ds} \cdot I_{ds}$$

where $T_s$ is the timespan for one switching process. The equivalent function with $f_s = \frac{1}{T_s}$ shows that the switching loss increases with the switching frequency:

$$P_{swit} = \frac{1}{2} \cdot t_{on} \cdot U_{ds} \cdot I_{ds} \cdot f_s$$

Both $U_{ds}$ and $I_{ds}$ are changing during the switching time. Figure 1 shows voltage and current during the process.

<figure>
    <switching-loss/>
    <br/>
<center>
    <figcaption><b>Figure 1.</b> Current and voltage of the transistor during switching.
    </figcaption>
</center>
</figure>

At $t1$, the gate voltage reaches the threshold voltage and the drain-source current starts to flow. At $t2$ the current reaches its maximum and the drain voltage starts to fall. In this point, the switching power loss is at its maximum too. Until $t3$, the drain voltage drops as inner resistance $r_{ds}$ decreases and so $t_{on} = t_3 -t_1$. The same procedure in reverse happens when the MOSFET is switched off.

The total power loss per duty cylce can be aggregated as

$$P_{tot} = 2\cdot P_{swit} + P_{cond}$$

## Heat dissipation


### Further onformation

Training video from Texas Instruments: [Video](https://training.ti.com/conduction-convection-and-radiation?context=1147983-1148063-1148064)

Good mathematical description on Youtube: [Video](https://www.youtube.com/watch?v=2uWHkUAsEaQ)

::: warning TODO
- Description of losses in power electronics
    - Switching losses
    - Conduction losses
- Methods for cooling
    - Passive using PCB
    - Passive via heat sink
    - Active (forced convection)
:::
