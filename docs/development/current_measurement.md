# Current measurement

Current-consumption monitoring is more important than ever due to the overwhelming trend toward smaller-sized electronic systems with increased functionality. Picking the correct method to monitor current for a given application is critical in optimizing system performance. 

## Measurement principle

There exists various techniques for current measurement, but can be broadly classified into direct and indirect methods. Direct method make use of **Ohm's law** where as indirect method is based on **Maxwell's equations**. Few popular current measurement techniques are discussed below.

### 1. Shunt resistor

Shunt is a low value resistor ($R_s$) used in current measurement. It is generally connected in series to the branch in which current is to be measured as shown in Fig.1. Using Ohm's law, the current through the branch of interest can be calculated by measuring the voltage across the shunt resistor. For example, if $V_s$ (or $V_{shunt}$) is the measured voltage across the shunt of value $R_s$ (or $R_{shunt}$), then current is given by

$$I_s = \frac{V_s}{R_s}\$$

In order to minimize the power loss and heat dissipation in the circuit, shunts must have very low value of resistance (in the range of milli ohms). But this comes with the downside of low voltage drop across the shunt. Hence, according to the requirement, care must be taken in choosing the appropriate value of resistance for the shunt.

<figure>
<center>
    <img src="./images/shunt_current_measurement.svg" height="auto" width="auto" />
    <figcaption><b>Figure 1.</b> Principle of shunt based current measurement.</figcaption>
</center>
</figure>

To overcome the issue of low voltage drop across the shunt, a voltage amplifier (current sense amplifier) can be used which can amplify this small voltage drop to appropriate range. This voltage amplifier is used in differential configuration in order to measure the voltage difference between its two terminals as shown in Fig.2. The gain depends on the resistors **R3/R1** and **R4/R2**. Further, the output from the current sense amplifier can be applied to Analog to Digital Converter (ADC) or other intermediate circuit to obtain the value of current of interest. 

<figure>
<center>
    <img src="./images/shunt_amplifier.svg" height="auto" width="auto" />
    <figcaption><b>Figure 2.</b> Shunt with current sense amplifier.</figcaption>
</center>
</figure>

The output voltage $V_{out}$ is given by 

V_{out} = Gain \cdot V_{shunt}

where Gain = Gain = \frac{R_1}{R_2} and V_{shunt} = I_{shunt} \cdot R_{shunt}

The circuit shown in Fig.2 can measure only uni-directional current. In order to measure bi-directional current of same magnitude, the resistor $R_3$ has to be connected to a reference voltage (mid supply voltage) as shown in Fig.3. The required reference voltage can be generated in various ways like - using Zener diode, voltage follower Opamp, DAC from micro-controller and many more methods which vary according to the user requirements. In the following case, V_{out} is given by

V_{out} = Gain \cdot V_{shunt} + V_{ref}

<figure>
<center>
    <img src="./images/shunt_amplifier_bidirectional.svg" height="auto" width="auto" />
    <figcaption><b>Figure 3.</b> Shunt with bi-directional current sense amplifier.</figcaption>
</center>
</figure>

### 2. Hall effect sensor

Hall effect current measurement is a non-contact method based on the principle that for a given current flow, a proportional magnetic field is produced around the current-carrying conductor. In a [Hall sensor](https://www.nktechnologies.com/engineering-resources/current-sensing-theory/), the current conductor passes through a magnetically permeable core that concentrates the conductor’s magnetic field. The Hall effect device is carefully mounted at a right angle to the concentrated magnetic field as shown in the Fig.4. A constant current in the conductor will give rise to magnetic field around it. When Hall effect device is exposed to this magnetic field, it produces a potential difference (voltage) that can be measured. Hence voltage is directly proportional to magnetic field strength.

<figure>
<center>
    <img src="./images/hall_sensor.gif" height="350" width="450" />
    <figcaption><b>Figure 4.</b> Principle of working of Hall and inductive sensor.</figcaption>
</center>
</figure>


When a hall sensor (component with X mark) like [ACS712](https://www.sparkfun.com/datasheets/BreakoutBoards/0712.pdf) is connected to the branch carrying the current of interest, due to the above principle, a voltage difference is generated at the two output terminals of the sensor. The generated voltage potential is linearly proportional to the current passing through the hall sensor. Based on the requirement, if the generated voltage potential is found to be small, then an amplifier of appropriate gain can be used to magnify the magnitude as shown in the Fig.5. This method was usually preferred when current to be measured used to be greater than 50A. This method provides good isolation from the main circuit unlike shunt based method which decreases the heat dissipation. Since sensitive components are used, implementation of hall sensor based current measurement is more expensive than the former method.
<figure>
<center>
    <img src="./images/hall_current_measurement.svg" height="auto" width="auto" />
    <figcaption><b>Figure 5.</b> Principle of hall sensor based current measurement.</figcaption>
</center>
</figure>

### 3. Inductive sensor

The [inductive sensor](https://en.wikipedia.org/wiki/Inductive_sensor) consists of a wire-wound core as shown in the Fig.4. The current conductor passes through a magnetically permeable core that magnifies the conductor’s magnetic field. AC current constantly changes potential from positive to negative and back again. This results in expanding and collapsing magnetic field which induces current in the windings. Further inductive sensor converts this current into proportional voltage and will be given as output. Hence, in this case, voltage is measure of change in magnetic field strength and not direct measure of magnetic field as in the case of Hall effect sensor. Hence inductive sensors are more suitable for measuring AC currents over other methods. Like Hall sensor, this also provides excellent isolation from the main circuit and also results in very low voltage drop (heat dissipation), but has the advantage of very low noise when compared with the former. 

#### Conclusion

The comparison of different methods of current measurement is tabulated in the table below. Although on a quick look, shunt based method looks more promising and efficient than other methods, it is preferable only for small voltages or currents. For applications which involve high voltage or current ratings or need good isolation from the main circuit, Hall sensor or inductive sensor methods are usually preferred. Also, when AC current is involved, inductive sensor is often a good choice. But due to very good linearity in shunt based methods, lot of advancements have been made which curb it's shortcomings. Hence suitable method must be chosen according to the requirement of the system.

| Parameter         | Shunt resistor  | Hall sensor   |Inductive sensor|
|:----------------:|:---------------:|:-------------:|:------------:  |
| Complexity       | Low             | High          | High           |
| Cost             | Low             | High          | High           |
| Accuracy         | High            | Medium        | Medium         |
| Power dissipation| High            | Low           | Low            |
| Noise            | Very Low        | High          | Low            |
| Isolation        | No              | Good          | Good           |

## Positioning of sensor

In the popular shunt based current measurement technique, the position of shunt is of importance sometimes depending on the application.
Based on it's position, it can be classified into low-side and high-side current measurement technique. Although both of these configurations work almost in a same manner, each have their own merits and demerits.

### 1. Low-side current measurement.

In this configuration, the shunt is placed between the load and the ground as shown in Fig.6. Here, the common mode voltage for the amplifier (to amplify small voltage drop) is referenced to ground and hence any cheaper and readily available voltage amplifier can be used. But this configuration also has a major disadvantage of ground loop issues. Since, shunt is connected between load and the ground, load may not be at exact same ground potential as rest of the circuit. Another major problem with the low-side configuration is short circuit currents resulting from accidental shorts between top of the shunt and the ground. This might give rise to large currents which can destroy other components in the circuit.

In spite of the above disadvantages, low-side current measurement technique is often found attractive due to it's simple and elegant design and low cost of implementation. For circuits which do not need shot-circuit protection, this method is very suitable.
<figure>
<center>
    <img src="./images/low_side_current_measurement.svg" height="auto" width="auto" />
    <figcaption><b>Figure 6.</b> Principle of low-side current measurement.</figcaption>
</center>
</figure>

Further in order to amplify the small voltage drop across the shunt, an amplifier can be connected in either single ended or differential configuration. Single ended configuration is shown in Fig.7a and make use of least components and is very simple. But for low value sense resistors and designs that can have high ground current suffer from low accuracy issue. Whereas differential configuration as shown in Fig.7b make use of classic differential amplifier that sense the voltage drop directly across the shunt and hence provides better accuracy than the former.

<figure>
<center>
    <img src="./images/low_side_amplifier.svg" height="auto" width="auto" />
    <figcaption><b>Figure 7.</b> Low-side current measurement using (a) Singled ended and (b) Differential configuration.</figcaption>
</center>
</figure>

### 2. High-side current measurement.

In this configuration, the shunt is placed between the supply voltage and the load as shown in Fig.8. This configuration helps to eliminate ground disturbances which was a hurdle in low-side measurement technique and also helps in detecting accidental shorts to system ground. In spite of having this advantage, it suffers from the problem of high common mode voltage. Hence the amplifier used to amplify small voltage drop across the shunt need to have specification such that, it can tolerate high common mode voltage (close to supply voltage). This poses a problem in selection of suitable amplifier and limits the choice. Hence, depending on the application, suitable configuration - either low-side or high-side current measurement technique has to be selected. 

<figure>
<center>
    <img src="./images/high_side_current_measurement.svg" height="auto" width="auto" />
    <figcaption><b>Figure 8.</b> Principle of high-side current measurement.</figcaption>
</center>
</figure>

## Dedicated ICs

The circuit for current measurement can be designed by the user using individual discrete components according to the specific requirements, which provides great deal of flexibility. But this comes with the downside of various challenges that makes the design process difficult and also expensive. 

When the current sense amplifier has external gain setting resistors, problems like resistor matching and temperature dependency comes into picture. Dedicated ICs like [INA210](https://www.ti.com/product/INA210), integrates the external gain setting resistors and overcomes the above issue, thereby providing better accuracy. 

Choosing a suitable shunt resistor always comes with the trade-off between measurement accuracy and power dissipation. Choosing shunt with high resistance, increases the voltage developed across them. This increases the accuracy of measurement dramatically but also results in high power dissipation. Whereas, choosing a low value shunt will help reduce the problem of power dissipation, but with less accuracy. Apart from deciding the value of shunt resistor, the next challenge would be a proper PCB layout for the shunt. Ignoring this often leads to error in measurement results. To overcome the challenge, dedicated ICs like [INA250](https://www.ti.com/product/INA250) can be used which integrates the shunt resistor into the IC and provides the best possible PCB layout to achieve accurate measurement results.

Selection of suitable ADC is also equally important to obtain accurate measurement. The smallest possible voltage that can be measured by an ADC depends on it's input voltage range and resolution. For example, an ADC with full scale input range($V_in$) of 2.5V and resolution(n) of 16-bits, the smallest measurable voltage($V_min$) is approximately 38uV (micro-volts).

$$V_{min} = \frac{V_{in}}{2^n}\$$

Dedicated ADC designed specifically for bi-directional current measurement like [INA226](https://www.ti.com/product/INA226) has an input range of $\pm 80mV$ with resolution of 16-bits. This not only eliminates the need of amplifying the voltage drop across shunt, but also can measure really voltages.

## Signal filtering

In current measurement, filtering of the signals may be required for several different reasons. Signals can be filtered either at the input side or at the output side of the current sense amplifier. 

When the current being measured is inherently noisy, appropriate simple filters can be used at the output of current sense amplifier to get rid of noise. But, along with the input signal, noise will also be amplified by the amplifier. In this case, since low magnitude signals are being amplified, effect of noise can be significant. This also comes with the downside of loading down of the ADC.

Current sensing applications, often have high amplitude and fast switching common-mode signal on the branch to which shunt is connected, which may have frequent overshoot (spike). Along with this, in low value shunts (\leq 5\ohm), inductance becomes more significant which increases the amplitude of such spike transient events. The amplifier must be protected against these overshoots, even though spike frequency are above the rated bandwidth of the device. Hence, appropriate filters are used at the input side of amplifier as shown in the Fig.9. 

<figure>
<center>
    <img src="./images/input_filtering.svg" height="auto" width="auto" />
    <figcaption><b>Figure 9.</b> Input side filtering of amplifier.</figcaption>
</center>
</figure>

The resistance of input resistors $R_5$ and $R_6$ and associated mismatch can adversely effect gain, CMRR and offset voltage of opamp. Hence, the value of these resistor have to be as low as possible (apprx 10 Ohm). The capacitor has to be selected to perfectly match the time constant of shunt resistance and inductance. i.e, in general,

$$\frac{L_{shunt}}{R_{shunt}}\ \geq 2 \cdot R_{filt} \cdot C_{filt}$$

If the main purpose is to filter high frequency noise, the capacitor should be increased to a value that provides the desired filtering.

$$C_{filt} = \frac{1}{2 \cdot \pi \cdot f_{3db} \cdot (R_5 + R_6)}$$

Detailed explanation about filtering circuits for the amplifier can be obtained by corresponding device's datasheet. (Ex - [NCS210R](https://www.onsemi.com/pub/Collateral/NCS210R-D.PDF) and [STM application notes](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=2ahUKEwjwqNrr1OroAhWFjKQKHUqrCAYQFjAAegQIARAB&url=https%3A%2F%2Fwww.st.com%2Fresource%2Fen%2Fapplication_note%2Fdm00086777-how-to-filter-the-input-of-a-highside-current-sensing-stmicroelectronics.pdf&usg=AOvVaw3U5UXHSSAWIkAS2qLeRJ1N))




