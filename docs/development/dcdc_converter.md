---
sidebarDepth: 2
---

# DC/DC Converter

A DC to DC converter is an electronic circuit that converts between different voltage levels of direct current (DC). The direction can be from higher voltage to lower voltage or in reverse direction.

## Linear regulators

A linear regulator generates an output voltage $V_{out}$ lower than the input voltage $V_{in}$ using a resistive voltage drop.

The difference between output and input voltage is dissipated as heat. The heat loss $Q_{loss}$ is proportional to the current $I$:

$$Q_{loss} = I \cdot (V_{in}-V_{out})$$

This results in a comparably low efficiency for large voltage differences.

### Emitter follower

A very simple type of linear regulator can be built using an NPN transistor, a resistor and a Zener diode:

<fig-caption src="development/dcdc-emitter-follower.svg" caption="Emitter follower as a simple linear regulator" num="1" />

The resulting output voltage for low currents is approximately the Zener voltage of $D_z$ minus the transistor base threshold voltage (around 0.6 V).

This type of converter can be used if the output voltage does not need to be very stable, e.g. for a 10 V MOSFET gate driver supply voltage.

### Advanced LDOs

If a stable power supply voltage like 3.3 V for microcontrollers is needed, a dedicated regulator IC is normally used. Most available regulators are so-called low-dropout (LDO) types, that allow a very small difference between input and output voltage.

LDOs are based on similar principles as the emitter follower, but contain more sophisticated analog circuitry for improved stability and load regulation.

## Switching regulators

Typical switching mode converters contain a switch, an inductor, a capacitor and a diode to transfer energy from input to output. The input energy is stored temporarily in an inductor and then released to the output at a different voltage. This conversion principle allows high efficiencies of up to 99%.

Switching regulators can be either isolated or non-isoladed. Galvanically isolated converters include a transformer, which typically decreases the efficiency of the conversion.

For DC energy systems, the non-isolated synchronous buck-converter is the most important type and will be explained in detail below. A buck converter is also used in most MPPT charge controllers to convert the higher solar panel voltage to the lower battery voltage.

### Buck converter

The simplified schematic of a non-isolated buck converter is shown in Figure 2. It uses an N-channel MOSFET (Q) as the switch and a freewheeling diode (D).

<fig-caption src="development/dcdc-buck.svg" caption="Non-synchronous non-isolated buck converter" num="2" />

During operation, Q is repeatedly switched ON and OFF. This switching action causes a train of pulses at the junction of Q, D, and L (the so-called switch node) which is filtered by the LC output filter to produce a DC output voltage ($V_{out}$).

At low loads, the power stage operates in discontinuous conduction mode where current starts from zero, reaches a peak value and returns to zero during each switching cycle. In continuous conduction mode at higher output currents, current flows continuously in the inductor during the entire switching cycle.

Figure 3 shows the current and voltage behavior during continuous conduction mode.

<fig-caption src="development/dcdc-continuous-mode.svg" caption="Buck converter in continuous conduction mode" num="3" />

During on-time, the current $I_L$ flows from the input capacitor $C_{in}$ through the MOSFET switch $Q$ to the output capacitor $C_{out}$.

The voltage $V_{in} – V_{out}$ applied across the inductor can be considered constant during the switching period, hence the inductor current increases linearly:

$$V_L = V_{in} – V_{out} = L \cdot \frac{dI_L}{dt}$$

The current increase during on state $\Delta I_L$ is called ripple current and can be calculated as follows:

$$\Delta I_{L+} = \frac{V_{in} – V_{out}}{L} \cdot t_{on}$$

This quantity is important for the selection of the filter capacitors, which have to be able to handle the maximum ripple current.

During off-state, the switch node voltage goes to almost zero (neglecting the diode forward voltage drop). This results in a current decrease:

$$\Delta I_{L-} = \frac{V_{out}}{L} \cdot t_{off}$$

In steady state conditions, the current increase $\Delta I_{L+}$ during on-time and the current decrease $\Delta I_{L-}$ during off-time must be equal. This leads to the equation for the so-called duty cycle $D$ of the PWM signal:

$$D = \frac{t_{on}}{t_{on}+t_{off}} = \frac{V_{out}}{V_{in}}$$

From the above equation, we can see that the output voltage $V_{out}$ can be controlled by adjusting the duty cycle $D$. Controlling of the duty cycle can be done using analog circuits or with a microcontroller. The DC/DC control will be covered in a separate chapter.

Further details regarding operation modes of buck converters are explained [on Wikipedia](https://en.wikipedia.org/wiki/Buck_converter) and will not be replicated here.

### Boost converter

A non-synchronous boost converter is very similar to the buck converter, but the diode and the switch are swapped, as shown in the schematic in Figure 4.

<fig-caption src="development/dcdc-boost.svg" caption="Non-synchronous non-isolated boost converter" num="4" />

Note that the input of the converter is now at the right side of the schematic. This notation may differ from other publications, but helps to show the similarities of buck and boost converters.

For a detailed explanation of the boost converter operating mode see also [the Wikipedia page](https://en.wikipedia.org/wiki/Boost_converter).

### Synchronous converter

For a synchronous non-isolated buck or boost converter as shown in Figure 5, the diode of the non-synchronous converters is replaced by an additional power MOSFET. Synchronous means that the switching of the power transistors is synchronized such that the high side and low side MOSFETs are not turned on at the same time. Otherwise, a direct short of the high voltage side to ground would destroy the circuit (shoot-through).

<fig-caption src="development/dcdc-synchronous.svg" caption="Synchronous non-isolated converter (buck and boost)" num="5" />

The main advantage of a synchronous converter compared to the non-synchronous counterparts is the increased efficiency at higher power. Instead of the loss resulting from the forward voltage drop in the diode, only the lower resistive loss during on-state of the MOSFET is dissipated.

Depending on the control of the PWM signal, the synchronous converter can be operated in buck or in boost mode. This is why the output and input sides are now renamed to high voltage ($V_H$) and low voltage ($V_L$) side. Both can be either input or output.

Similar to the buck converter, the duty cycle controls the ratio between high and low voltage sides. During on-time of the PWM signal, the high-side MOSFET $Q_{HS}$ is on, otherwise the low-side MOSFET $Q_{LS}$.

$$D = \frac{t_{on,HS}}{t_{on,HS}+t_{off,HS}} = \frac{V_L}{V_H}$$

### Component selection

Lots of literature is available to help with passive component selection for a given application. For a basic calculation of inductor and capacitor values, we recommend [this website](http://schmidt-walter-schaltnetzteile.de/smps_e/smps_e.html#Abw).

The inductor selection ($L$) influences the amount of current ripple seen on the inductor current. Inductors have DC resistance ($R_L$) that impacts the performance of the output stage. Minimizing the $R_L$ improves the overall performance of the converter. The $R_L$ is small for lower inductor values but there is a trade-off between inductance and ripple current. The lower the inductance, the higher the ripple current through the inductor.

The capacitors directly influence the output voltage of the converter, the response time of the output feedback loop, and the amount of output voltage overshoot that occurs during changes in load current. Higher values of capacitance lower the amount of ripple voltage and lower the output voltage overshoot, but increase the response time for load changes.

Capacitors also have a parasitic series resistance, known as the equivalent series resistance ($R_{ESR}$). The $R_{ESR}$ affects the output voltage ripple and the overall efficiency of the converter. The lower the $R_{ESR}$ value, the higher the performance. In order to reduce the ESR, multiple capacitors can be connected in parallel.

More information on the LC value selection see this [ON Semiconductor application note](https://www.onsemi.com/pub/Collateral/AND9135-D.PDF).

### Efficiency

The following interactive graph can be used to calculate the efficiency depending on different input parameters.

See [Richtek AN005](https://www.richtek.com/Design%20Support/Technical%20Document/AN005?sc_lang=en) for details and equations behind the loss calculations.

<figure>
    <dcdc-efficiency/>
    <br/>
<center>
    <figcaption><b>Figure 6.</b> Synchronous buck converter efficiency <b>(interactive)</b>.</figcaption>
</center>
</figure>
