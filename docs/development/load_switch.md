# Load Switch

Charge controllers are often equipped with a load switch that protects the battery from deep-discharge. If supported by the charge controller, the load switch can also be used for advanced control of connected loads, e.g. switching on lights during the night.

The following image shows the layout of a typical MPPT charge controller with the DC/DC power stage between the solar panel and the battery and a switch between the battery and the load output.

<fig-caption src="development/charge-controller-layout.svg" caption="Charge Controller Layout" num="1" />

Even though it might seem very simple to switch on and off a load using a MOSFET, a reliable load switch control can get quite complicated. The load switch needs to protect itself and the charge controller from overcurrents and from exceeding its thermal limits. In addition to that, it must protect the wires from short circuits, acting like an electronic fuse. These different protection features are described below in more detail.

## High-side vs. low-side

::: warning TODO
- Circuit diagrams
- Advantages and disadvantages
:::

## Inrush current during turn-on

A load with high capacitance will generate an inrush current after the switch was turned on. This current spike can be limited with two different methods:

### Slew-rate limitation using gate capacitor

This approach is described in the [Application Note AND9093-D](https://www.onsemi.com/pub/Collateral/AND9093-D.PDF) by ON Semiconductors. Also [this page](https://www.rohm.com/electronics-basics/transistors/what-is-a-load-switch) by ROHM gives a short introduction to the topic.

### PWM switching

Instead of switching on continuously, a PWM signal can be applied to the load switch, so that the capacitance is charged in several small quantities over a few milliseconds. Depending on the PWM frequency, this method requires stronger MOSFET gate drivers.

This method is also described in detail in the [following blog post](https://community.victronenergy.com/articles/2992/load-output-of-mppt-charge-controllers.html) by Victron Energy.

## Overcurrent

The maximum continuous current the load switch can handle is mainly determined by the thermal limits of the MOSFET. The relevant temperature is the junction temperature $T_j$ which has to stay below the maximum temperature stated in the datasheet. Typical values are around 150 °C.

### Thermal model

As the junction temperature cannot be measured directly, the following thermal model provides a method to estimate it based on the measured current flow and control the load switch accordingly.

The heat flow $\dot{Q}$ dissipated in the MOSFET is calculated from its on-state resistance $R_{DS(on)}$ and the current $i$ going through it:

$$\dot{Q}(i)=R_{DS(on)} \cdot i^2$$

For simplicity reasons, the on-state resistance is assumed to be independent of the temperature, so the worst case resistance should be considered for a safe estimation.

The dissipated heat is partly stored in the thermal capacity of the MOSFET and its surrounding PCB area, considered as a single thermal mass $mc_p$. Another part of the heat is transferred to the ambient, described by the thermal resistance between junction and ambient, $R_{th,ja}$.

Using an energy balance, the junction temperature $T_{j,k+1}$ at a time step $k + 1$ can be calculated based on the temperature of the previous step $T_{j,k}$, the ambient temperature $T_a$ and the average heat dissipated during the period $\Delta t$ between two steps:

$$T_{j,k+1} = T_{j,k} + \frac{1}{mc_p} \left(\dot{Q}(i) - \frac{T_{j,k} - T_a}{R_{th,ja}} \right) \Delta t$$

With the thermal time constant of the system $\tau = mc_p \cdot R_{th,ja}$ the equation can be rewritten as:

$$T_{j,k+1} = T_{j,k} + \left(\frac{\dot{Q}(i) \cdot R_{th,ja}}{\tau} - \frac{T_{j,k} - T_a}{\tau} \right) \Delta t$$

The time constant depends on the PCB design, the used components and attached heat sinks. It is normally quite small, in the order of a few seconds. It can be determined from a measured temperature response after a load step or estimated based on experience with similar designs.

As the circuit should be designed for a certain maximum constant current $i_{max}$ at a maximum expected ambient temperature $T_{a,max}$, the steady-state thermal resistance $R_{th,ja}$ can be expressed as:

$$R_{th,ja} = \frac{T_{j,max} - T_{a,max}}{\dot{Q}(i_{max})} = \frac{T_{j,max} - T_{a,max}}{R_{ds(on)} \cdot i_{max}^2}$$

The maximum junction temperature $T_{j,max}$ for the layout should be chosen with some safety margin to the value specified in the datasheet.

This leads to the final temperature model equation:

$$T_{j,k+1} = T_{j,k} + \left( \frac{i^2}{i_{max}^2}(T_{j,max} - T_{a,max}) - (T_{j,k} - T_a) \right) \frac{\Delta t}{\tau}$$

For the implementation in the microcontroller, the previous temperature $T_{j,k}$ has to be stored, with a starting condition equal to the ambient temperature $T_a$. $\Delta t$ is the time between each call of the function and $i$ is the measured current through the MOSFET. The other values are constant for a given design and can be determined during testing.

## Short circuit

Normally, there should be a fuse installed at the battery terminal to protect the wires from short circuits, which also protects the load output. However, even if the fuse rating at the battery is not much higher than the rating of the load output, fuses react quite slow. Typical [automotive blade fuses](https://www.littelfuse.com/~/media/automotive/datasheets/fuses/passenger-car-and-commercial-vehicle/blade-fuses/littelfuse_atof_datasheet.pdf) for example need more than 10 ms to melt even for approx. 10x the rated current.

MOSFET datasheets normally state a so-called safe operating area, which shows the maximum allowed current vs. the drain-source-voltage. The following example is from the [Nexperia PSMN5R2-60YL datasheet](https://assets.nexperia.com/documents/data-sheet/PSMN5R2-60YL.pdf):

<fig-caption src="development/mosfet-safe-operating-area.png" caption="Safe operating area of PSMN5R2-60YL" num="2" />

As long as the maximum junction temperature is not exceeded, this MOSFET can handle 100A continuously. However, under real operating conditions with passive cooling via the PCB, the continuous current will be in the range of 20A. During a short-circuit, the current rises very quickly, only limited by the impedance of the battery, the wires and the PCB.

According to [this study](https://www.sbsbattery.com/PDFs/VRLAshortCurrentsStorageBatterySystems.pdf), a dead short circuit of VRLA lead-acid batteries in the range of 100 Ah can reach currents >2000 A within less than 10 ms. So the MOSFET could get destroyed before any fuse reacted.

<!--
Above study also states that the time constant to reach a steady state current flow und dead short conditions is in the order of 4 ms. This means that the electronic short circuit protection using the MOSFET has to trigger at least an order of magnitude faster.

For the following calculations, we require the firmware to detect a short circuit and switch off the MOSFET within less than 100 µs.
-->

<!--
The battery internal resistance is in the range of 50 m&#8486; for a 60-100 Ah battery (see also [here](https://eu.industrial.panasonic.com/sites/default/pidseu/files/downloads/files/18-292_vrla_whitepaper_interactive.pdf))
-->

### Inrush current when connecting capacitive loads

It would be a simple task to just switch off immediately as soon as a current above a certain limit is reached. However, this sort of protection creates false positives when connecting a load with a high input capacitance. A capacitance acts as a short circuit in the short moment of connection, but the current decreases quickly after the capacitor got charged.

The following simplified RLC circuit can be used to analyze the behavior of the system:

<fig-caption src="development/load-switch-capacitive-load.svg" caption="Load output with capacitive load" num="3" />

The resistance $R_{total}$ consists of the battery internal resistance, the wire resistance and any resistance inside the charge controller, e.g. because of connectors or a shunt for current measurement.

The wire inductance slows down the current increase and reduces the current peak during a failure. So the worst case is a short wire. The [self-inductance of two parallel wires](https://en.wikipedia.org/wiki/Inductance#Self-inductance_of_thin_wire_shapes) with a conductor radius $r$, a distance $d$ between the conductors and a length $l$ of the pair is:

$$L = \frac{\mu_0 l}{\pi} \left( \ln(\frac{d}{r}) + 0.25 \right)$$

This results in an inductance of approx. 1 µH per meter for a pair of 4 mm² wires.

The following interactive graph shows the current vs. time with worst-case assumptions as default values:

- Total wire length of 1 m (calculations assume 4 mm² cross-section)
- A [good quality large VRLA battery](https://eu.industrial.panasonic.com/sites/default/pidseu/files/downloads/files/panasonic-batteries-vrla-for-professionals_interactive.pdf) at full state of charge with 5 m&#8486; internal resistance plus another 5 m&#8486; contributed by the charge controller terminals and PCB.
- A low-ESR electrolytic capacitor of 1000 µF with around 20 m&#8486; ESR (e.g. Panasonic FR series)

<load-sc-current/>

<figure>
<center>
    <figcaption><b>Figure 4.</b> Load short-circuit current calculation <b>(interactive)</b>.</figcaption>
</center>
</figure>

The default values are realistic for what a typical 10-20A charge controller needs to detect and handle. In order to protect the MOSFET, the charge controller should switch off within less than 20 µs in case of the steep current increase of the short circuit. You can change the values to get an impression of your particular system and the general influencing factors on the maximum current.

#### Digital solution with fast ADC

In order to distinguish between inrush current for capacitive loads and an actual short circuit, the microcontroller has to take multiple measurements and not only consider the absolute values, but also the slope of the current.

For a fast detection of the steep short circuit current increase, a sample frequency of less than 5 µs is necessary. This is at the limit of what lower end microcontrollers can do, if the ADC needs to measure not only the current, but also other values continuously. In addition to that, the delay and bandwidth of the current measurement have to be considered.

#### Analog solution with filter and comparator

A comparator can be used to trigger a load switch-off signal as soon as a certain threshold of the current measurement signal is reached. As the comparator does not consider the slope or the length of the pulse, but just the absolute value, this approach can lead to false positives as described above if the signal is not filtered.

The current measurement output normally contains a low-pass filter (RC circuit). The filter time constant should be chosen such that the maximum allowed pulse caused by a capacitor just does not yet trigger the comparator, i.e. the damping at the frequency of the pulse is high enough to get an output signal below the threshold. In order to validate the correct filter layout, SPICE simulation of the circuit and laboratory tests should be used.

The comparator can be a dedicated part on the PCB that pulls down the MOSFET gate and switches the load output off. If the used microcontroller has an internal comparator, this can be used to trigger an interrupt and switch off the load output via software. In some MCUs, the comparator can also directly control an output pin without any interference of software.

The approach using an internal comparator to drive a GPIO pin is used in the Libre Solar PWM charge controller (see [hardware](https://github.com/LibreSolar/pwm-2420-lus) and [firmware](https://github.com/LibreSolar/charge-controller-firmware)).

## Overvoltage

If the battery voltage rises above allowed limits, e.g. because of a fault in the charger or because of transients, the load output should be switched off to protect connected consumers from overvoltage. This is a trivial task and will work reliably as long as there is enough margin to the maximum $V_{DS}$ of the MOSFET.

However, switching off an inductive load like a motor or a relay can result in voltage peaks at the load switch. This is the reason why most charge controllers don't allow switching inductive loads at the load port.

In order to allow the current to decay slowly, a free-wheeling diode $D_{fw}$ can be added to the load output. Such a circuit is shown in the following schematic:

<fig-caption src="development/load-switch-freewheeling-diode.svg" caption="Load output with freewheeling diode" num="5" />

A freewheeling diode in the charge controller should only be seen as an additional protection measure. Ideally, the diode should be located as close to the load itself as possible.
