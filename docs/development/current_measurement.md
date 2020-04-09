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

Hall effect current measurement is a noncontact method based on the principle that for a given current flow, a proportional magnetic field is produced around the current-carrying conductor. When a hall sensor (component with X mark) is connected to the branch carrying the current of interest, due to the above principle, a proportional voltage difference is generated at the two output terminals of the sensor. The generated voltage potential is proportional to the current passing through the hall sensor. Based on the requirement, if the generated voltage potential is found to be small, then an amplifier of appropriate gain can be used to magnify the magnitude as shown in the Fig.3. The generated voltage potential can be further fed to an ADC or other measurement circuit and the required current can be calculated. This method was usually preferred when current to be measured used to be greater than 50A. But, due to advancements in shunt based techniques, both are equally accurate and preferred for high currents.
<figure>
<center>
    <img src="./images/hall_current_measurement.svg" height="auto" width="auto" />
    <figcaption><b>Figure 3.</b> Principle of hall sensor based current measurement.</figcaption>
</center>
</figure>



