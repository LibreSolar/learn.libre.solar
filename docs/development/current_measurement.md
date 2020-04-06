# Current measurement

Current-consumption monitoring is more important than ever due to the overwhelming trend toward smaller-sized electronic systems with increased functionality. Picking the correct method to monitor current for a given application is critical in optimizing system performance. 

## Measurement principle

There exists various techniques for current measurement, but can be broadly classified into direct and indirect methods. Direct method make use of **Ohm's law** where as indirect method is based on **Maxwell's equations**. Few popular current measurement techniques are discussed below.

### 1. Shunt resistor

Shunt is a low value resistor (Rs) used in current measurement. It is generally connected in series to the branch in which current is to be measured. Using Ohm's law, the current through the branch of interest can be calculated by measuring the voltage across the shunt resistor. In order to minimise the power loss and heat dissipation in the circuit, shunts must have very low value of resistance (in the range of milliohms). But this comes with the downside of low voltage drop across the shunt. Hence, according to the requirement, care must be taken in choosing the appropriate value of resistance for the shunt. In spite of this trade off, this method is proven to exhibit high level of accuracy and cost-effectiveness in terms of implementation.
<figure>
<center>
    <img src="./images/shunt_current_measurement.svg" alt="Principle of shunt based measurement" height="auto" width="auto" />
    <figcaption><b>Figure 1.</b> Principle of shunt based measurement.</figcaption>
</center>
</figure>



