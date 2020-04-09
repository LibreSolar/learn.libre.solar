# Current measurement

Current-consumption monitoring is more important than ever due to the overwhelming trend toward smaller-sized electronic systems with increased functionality. Picking the correct method to monitor current for a given application is critical in optimizing system performance. 

## Measurement principle

There exists various techniques for current measurement, but can be broadly classified into direct and indirect methods. Direct method make use of **Ohm's law** where as indirect method is based on **Maxwell's equations**. Few popular current measurement techniques are discussed below.

### 1. Shunt resistor

Shunt is a low value resistor ($R_s$) used in current measurement. It is generally connected in series to the branch in which current is to be measured as shown in Fig.1. Using Ohm's law, the current through the branch of interest can be calculated by measuring the voltage across the shunt resistor. In order to minimise the power loss and heat dissipation in the circuit, shunts must have very low value of resistance (in the range of milliohms). But this comes with the downside of low voltage drop across the shunt. Hence, according to the requirement, care must be taken in choosing the appropriate value of resistance for the shunt.
<figure>
<center>
    <img src="./images/shunt_current_measurement.svg" height="auto" width="auto" />
    <figcaption><b>Figure 1.</b> Principle of shunt based current measurement.</figcaption>
</center>
</figure>

To overcome the issue of low voltage drop across the shunt, a voltage amplifier (current sense amplifier) can be used which can amplify this small voltage drop to appropriate range. This voltage amplifier is used in differential configuration in order to measure the volatge differene bewteen its two terminals as shown in Fig.2. The gain depends on the resistors **R3/R1** and **R4/R2**. Further, the output from the current sense amplifier can be applied to Analag to Digital Converter (ADC) or other intermediate circuit to obtain the value of current of interest. 
<figure>
<center>
    <img src="./images/shunt_amplifier.svg" height="auto" width="auto" />
    <figcaption><b>Figure 2.</b> Shunt with current sense amplifier.</figcaption>
</center>
</figure>

### 2. Hall effect sensor

Hall effect current measurement is a noncontact method based on the principle that for a given current flow, a proportional magnetic field is produced around the current-carrying conductor. In a Hall sensor, the current conductor passes through a magnetically permeable core that concentrates the conductor’s magnetic field. The Hall effect device is carefully mounted at a right angle to the concentrated magnetic field. A constant current in the conductor will give rise to magnetic field around it.When Hall effect device is exposed to this magnetic field, it produces a potential difference (voltage) that can be measured. Hence voltage is directly proportional to magnetic field strength.

When a hall sensor (component with X mark) like [ACS712](https://www.sparkfun.com/datasheets/BreakoutBoards/0712.pdf) is connected to the branch carrying the current of interest, due to the above principle, a voltage difference is generated at the two output terminals of the sensor. The generated voltage potential is linearly proportional to the current passing through the hall sensor. Based on the requirement, if the generated voltage potential is found to be small, then an amplifier of appropriate gain can be used to magnify the magnitude as shown in the Fig.3. This method was usually preferred when current to be measured used to be greater than 50A. This method provides good isolation from the main circuit unlike shunt based method which decreases the heat dissipation. Since sensitive components are used, implementation of hall sensor based current measurement is more expensive than the former method.
<figure>
<center>
    <img src="./images/hall_current_measurement.svg" height="auto" width="auto" />
    <figcaption><b>Figure 3.</b> Principle of hall sensor based current measurement.</figcaption>
</center>
</figure>

### 3. Inductive sensor

The inductive sensor consists of a wire-wound core. The current conductor passes through a magnetically permeable core that magnifies the conductor’s magnetic field. AC current constantly changes potential from positive to negative and back again. This results in expanding and collapsing magnetic field which induces current in the windings. Further inductive sensor converts this current into proportional voltage and will be given as output. Hence, in this case, voltage is measure of change in magnetic field strength and not direct measure of magnetic field as in the case of Hall effect sensor. Hence inductive sensors are more suitable for measuring AC currents over other methods. Like Hall sensor, this also provides excellent isolation from the main circuit and also results in very low voltage drop (heat dissipation), but has the advantage of very low noise when compared with the former. 

#### Conclusion

The comparision of different methods of current measurement is tabulated in the table below. Although on a quick look, shunt based method looks more promising and efficient than other methods, it is preferrable only for small voltages or currents. For applications which involve high voltage or current ratings or need good isolation from the main circuit, Hall sensor or inductive sensor methods are usually preferred. Also, when AC current is involved, inductive sensor is often a good choice. But due to very good linearity in shunt based methods, lot of advancements have been made which curb it's shortcomings. Hence suitable method must be chosen according to the requirement of the system.

| Paramter         | Shunt resistor  | Hall sensor   |Inductive sensor|
|:----------------:|:---------------:|:-------------:|:------------:  |
| Complexity       | Low             | High          | High           |
| Cost             | Low             | High          | High           |
| Accuracy         | High            | Medium        | Medium         |
| Power dissipation| High            | Low           | Low            |
| Noise            | Very Low        | High          | Low            |

## Positioning of sensor

In the popular shunt based current measurement technique, the position of shunt is of importance sometimes depepending on the application.
Based on it's position, it can be classified into low-side and high-side current measurement technique. Although both of these configurations work almost in a same manner, each have their own merits and demerits.

### 1. Low-side current measurement.

In this configuration, the shunt is placed between the load and the ground as shown in Fig.4. Here, the common mode voltage for the amplifier (to amplify small voltage drop) is referenced to ground and hence any cheaper and readily available voltage amplifier can be used. But this configuration also has a major diasdvantage of ground loop issues. Since, shunt is connected between load and the ground, load may not be at exact same ground potential as rest of the circuit. Another major problem with the low-side configuration is short circuit currents resulting from accidental shorts between top of the shunt and the ground. This might give rise to large currents which can destroy other components in the circuit.

In spite of the above disadvantages, low-side current measurement technique is often found attractive due to it's simple and elegant design and low cost of implementation. For circuits which do not need shot-circuit protection, this method is very suitable.
<figure>
<center>
    <img src="./images/low_side_current_measurement.svg" height="auto" width="auto" />
    <figcaption><b>Figure 4.</b> Principle of low-side current measurement.</figcaption>
</center>
</figure>

Further in order to amplify the small voltage drop across the shunt, an amplifier can be connected in either sinle ended or differential configuration. Single ended configuration is shown in Fig.5a and make use of least components and is very simple. But for low value sense resistors and designs that can have high ground current suffer from low accuracy issue. Whereas differential configuration as shown in Fig.5b make use of classic differential amplifier that sense the voltage drop directly across the shunt and hence provides better accuracy than the former.

<figure>
<center>
    <img src="./images/low_side_amplifier.svg" height="auto" width="auto" />
    <figcaption><b>Figure 5.</b> Low-side current measurement using (a) Singled ended and (b) Differential configuration.</figcaption>
</center>
</figure>

### 2. High-side current measurement.

In this configuration, the shunt is placed between the supply voltage and the load as shown in Fig.6. This configuration helps to eliminate ground disturbances which was a hurdle in low-side measurement technique and also helps in detecting accidental shorts to system ground. In spite of having this advanctage, it suffers from the problem of high common mode voltage. Hence the amplifier used to amplify small voltage drop across the shunt need to have specification such that, it can tolerate high common mode voltage (close to supply voltage). This poses a problem in selection of suitable amplifier and limits the choice. Hence, depending on the application, suitable configuration - either low-side or high-side current measurement technique has to be selected. 

<figure>
<center>
    <img src="./images/high_side_current_measurement.svg" height="auto" width="auto" />
    <figcaption><b>Figure 6.</b> Principle of high-side current measurement.</figcaption>
</center>
</figure>








