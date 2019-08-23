# DC/DC converter

A DC to DC converter is an electronic circuit that converts between different voltage levels of direct current (DC). The direction can be from higher voltage to lower voltage or

## Linear regulators

A linear regulator generates an output voltage $V_{out}$ lower than the input voltage $V_{in}$ using a resistive voltage drop.

The difference between output and input voltage is dissipated as heat:

$$Q_{loss} = i \cdot (V_{in}-V_{out})$$

This results in a comparably low efficiency for large voltage differences.

### Emitter follower

A very simple type of linear regulator can be built using an NPN transistor, a resistor and a Zener diode, as shown in figure 1.

<figure>
<center>
    <img src="./images/dcdc-emitter-follower.svg" alt="Emitter follower as simple linear regulator" height=auto width=auto />
    <figcaption>Fig. 1: Emitter follower as a simple linear regulator</figcaption>
</center>
</figure>

The resulting output voltage for low currents is approximately the Zener voltage of $D_z$ minus the transistor base threshold voltage (around 0.6 V).

This type of converter can be used if the output voltage does not need to be very stable, for example as the driving voltage for MOSFETs of around 10 V.

### Advanced LDOs

For stable power supply e.g. a 3.3 V supply rail for microcontrollers, a dedicated regulator IC is normally used. Most available regulators are so-called low-dropout (LDO) types, that allow a very small difference between input and output voltage.

## Switching regulators

Typical switching mode converters use a switch, an inductor, a capacitor and a diode to transfer energy from input to output. The input energy is stored temporarily in an inductor and then released to the output at a different voltage. Swichting regulators allow high power conversion efficiency up to 99%.

Switching regulators can be either isolated or non-isoladed. Galvanically isolated converters include a transformer, which typically decreases the efficiency of the conversion.

For DC energy systems, the non-isolated synchronous buck-converter is the most important type and will be explained in further detail below. A buck converter is also used in most MPPT charge controllers to convert the higher solar panel voltage to the lower battery voltage.

## Buck converter

A non-Isolated buck converter is shown in figure 2.

<figure>
<center>
    <img src="./images/dcdc-non-synchronous.svg" alt="Non-synchronous DC/DC" height=auto width=auto />
    <figcaption>Fig. 2: Non-Synchronous Non-Isolated Buck Converter</figcaption>
</center>
</figure>

The MOSFET (Q1) is an N-channel MOSFET and the diode (D1) is called catch diode or freewheeling diode. The inductor (L) and capacitor (C) make up the output filter. The capacitor has an equivalent series resistance ($R_{ESR}$). Similarly, the inductor DC resistance ($R_L$) is considered. The resistor (R) represents the load seen by the power stage output. During normal operation, Q1 is repeatedly switched ON and OFF. This switching action causes a train of pulses at the junction of Q1, D1, and L (the so-called switch node) which is filtered by the LC output filter to produce a dc output voltage ($V_{out}$).

A power stage can operate in continuous conduction mode or discontinuous conduction mode. In continuous conduction mode, current flows continuously in the inductor during the entire switching cycle. In discontinuous conduction mode, current starts from zero, then reaches a peak value and returns to zero during each switching cycle.

### Continuous conduction mode

In this mode, the power stage works in two states (ON and OFF) per switching cycle. The ON state is when Q1 is ON and D1 is OFF. The OFF state is when Q1 is OFF and D1 is ON. The simplified or equivalent circuit for these two states are shown in figure 3.

<figure>
<center>
    <img src="./images/dcdc-on-off-states.svg" alt="synchronous_dc_dc" height=auto width=auto />
    <figcaption>Fig. 3: Equivalent circuit for ON and OFF state of Buck converter</figcaption>
</center>
</figure>

The duty cycle $D$ is given by the ratio of ON time $T_{ON}$ to the switching period. The duration of the ON state is $DT_s$ and the duration of the OFF state is $(1-D)T_s$

<figure>
<center>
    <img src="./images/dcdc-continuous-mode.svg" alt="continuous_mode" height=auto width=auto />
    <figcaption>Fig. 4: Continuous conduction mode [1]</figcaption>
</center>
</figure>

#### ON state

The inductor current $i_L$ flows from input source through $T_1$ to capacitor $C$ and load resistor $R$. The $Q_1$ is ON and offers very low resistance ($R_{DS(on)}$) and voltage drop is given by $i_L \cdot R_{DS(on)}$. The small voltage drops across $R_L$ and is given by $i_L \cdot R_L$. Diode $D_1$ is OFF during this time because it is reverse biased. The voltage applied across the inductor equals to $V_g – (i_L \cdot R_{DS(on)}) – (i_L \cdot R_L) – Vout$. During ON time, applied voltage $V_g$ is constant hence the inductor current increases linearly.

The increase in inductor current is given by

$$V_L = L \cdot \frac{di_L}{dt}$$

$$\Delta i_L = \frac{V_L}{L} \cdot \Delta T$$

The inductor current increase during the ON state is given by

$$\Delta i_L (+) = \frac{ V_g – (i_L \cdot R_{DSon}) – (i_L \cdot R_L) – Vout}{L} \cdot \Delta T_{ON}$$

This quantity $\Delta i_L (+)$ is referred to as the inductor ripple current.

#### OFF state

The $Q_1$ is OFF and offers very high impedance from its drain to source. The inductor current $i_L$ flows from ground through $D_1$ to capacitor $C$ and load resistor $R$. The voltage on the left-hand side of inductor becomes $–V_d + i_L \cdot R_L$ where $V_d$ is the forward voltage drop of $D_1$. The voltage applied to the right-hand side of an inductor is still the output voltage $V_{out}$. The applied voltage across inductor equals to $V_{out}+V_d + i_L \cdot R_L$. During OFF time, the applied voltage polarity is negative and constant hence the inductor current decreases linearly.

The inductor current decrease during the OFF state is given by

$$\Delta i_L (-) = \frac{V_{out}+V_d + i_L \cdot R_L}{L} \cdot \Delta T_{OFF}$$

This quantity $\Delta i_L (-)$ is referred to as the inductor ripple current.

In steady state conditions, the $\Delta i_L (+)$ during the ON time and the $\Delta i_L (-)$ during the OFF time must be equal. Therefore,

$$V_{out} = \biggl( (V_{in} - V_{DS}) \cdot \frac{T_{ON}}{T_{ON}+T_{OFF}}\biggl)-\biggl( V_d \cdot \frac{T_{OFF}}{T_{ON}+T_{OFF}}\biggl) - (i_L \cdot R_L )$$

Substituting $T_s = T_{ON}+T_{OFF}$, $D =\frac{T_{ON}}{T_s}$ and $(1-D) =\frac{T_{OFF}}{T_s}$, we get

$$V_{out} = \bigl( (V_{in} - V_{DS}) \cdot D\bigl) - \bigl( V_d \cdot (1-D)\bigl) - (i_L \cdot R_L )$$

From the above equation, we can see the output voltage $V_{out}$ can be set by adjusting the duty cycle $D$. The $V_{DS}$, $V_{in}$ and $R_L$ are assumed to be very small and is equated to zero. Then the output voltage $V_{out}$ is equal to

$$V_{out} = D \cdot V_{in}$$

More information on the buck converter operation, please refer to [1]

## Synchronous converter

The synchronous non-isolated buck convertor as shown in figure 5 consists of two power MOSFETs, an output inductor and an output capacitor. The name synchronous is because the switching of power transistors is synchronized to provide a regulated output voltage and to prevent the MOSFETs from turning ON at the same time.

<figure>
<center>
    <img src="./images/dcdc-synchronous.svg" alt="synchronous_dc_dc" height=auto width=auto />
    <figcaption>Fig. 5 Synchronous Non-Isolated Buck Convertor</figcaption>
</center>
</figure>

The high side MOSFET (Q1) is connected directly to the input voltage. When Q1 turns ON, the current flows from input to the load through the high side MOSFET. At this time, low side MOSFET (Q2) is OFF and the current through the inductor increases, charging the LC filter. When Q2 turns ON and current is supplied to the load through the low side MOSFET. At this time, Q1 is OFF and the current through the inductor decreases, discharging the LC filter.

The switch voltage is smoothed out by the LC stage which results in regulated DC output voltage. The MOSFETs are controlled synchronous such that the high side and low side MOSFET are not turned ON at the same time which prevents the direct short to ground (shoot-through).

The high side MOSFET on−time determines the duty cycle and is given by:

$$Duty\;Cycle = \frac{t_{ON,HS}}{t_{ON,HS}+t_{OFF,HS}} = \frac{V_{out}}{V_{in}}$$

A duty cycle of 0.5 results in output voltage which is half of the input voltage.

### LC stage

To calculate the values of inductor and capacitor, we recommend [this website](http://schmidt-walter-schaltnetzteile.de/smps_e/smps_e.html#Abw).

Inductor($L$) influences the amount of current ripple seen on the inductor current. Inductors have DC resistance ($R_L$)that impacts the performance of the output stage. Minimizing the $R_L$ improves the overall performance of the converter. The $R_L$ is small for lower inductor values but there is a trade-off between inductance and ripple current. The lower the inductance the higher the ripple current through the inductor.

Capacitor (C) directly influences the output voltage of the converter, the response time of the output feedback loop, and the amount of output voltage overshoot that occurs during changes in load current. The higher value of capacitor lower the amount of ripple voltage and lower the output voltage overshoot, but higher the response time for the changes at load.

Capacitors also have a parasitic series resistance, known as the equivalent series resistance ($R_{ESR}$). The $R_{ESR}$ affects the output voltage ripple and the overall efficiency of the converter. Lower the $R_{ESR}$ value higher the performance. The idea to reduce ESR is to use multiple capacitors in parallel.

More information on the LC value selection see this [ON Semiconductor application note](https://www.onsemi.com/pub/Collateral/AND9135-D.PDF).

<h2>References</h2>

[1] [Understanding Buck Power Stages in Switch mode Power Supplies](http://www.ti.com/lit/an/slva057/slva057.pdf)
