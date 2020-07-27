# Charge Controller

A charge controller regulates the voltage and/or current flowing from solar panels into batteries. By doing so, it prevents the batteries from overcharging and ensures good battery life. Most 12$V$ solar panels outputs 16-20$V$, whereas batteries usually need around 14-14.5$V$ to get fully charged. Direct connection of batteries to the solar panel without any regulation, causes damage to the batteries as a result of overcharging. To prevent this a charge controller can be used between solar panels and charging batteries to regulate voltage and/or current. Mainly, there are two major type of charge controllers.
1. PWM charge controllers
2. MPPT charge controllers

To demonstrate the examples for different scenarios, consider the standard test case conditions (unless specified) to be
* Voltage in maximum power point ($V_{mpp}$) = 18$V$
* Current in maximum power point ($I_{mpp}$) = 5.56$A$
* Open circuit voltage ($V_{oc}$) = 21.6$V$
* Short circuit current ($I_{sc}$) = 6.12$A$

and other parameters are assumed to be
* Cell temperature = 25$^{\circ}C$
* Temperature co-efficient of $I_{sc}$ = 0.05%/$K$
* Temperature co-efficient of $V_{oc}$ = -0.35%/$K$
* Solar irradiance = 1000$W/m^2$
* Ambient temperature = 25$^{\circ}C$

The current-voltage and power-voltage curves of the panels are given in the below interactive graph as shown in Fig.1

<solar-panel-characteristic-curve/>

<figure>
<center>
    <figcaption><b>Figure 1.</b> Solar panel characteristic curve <b>(interactive)</b>.</figcaption>
</center>
</figure>


## PWM charge controllers

PWM (Pulse Width Modulation) charge controller is in pratice a switch connected between solar panel and a battery. Instead of providing a steady output, it sends out a series of charging pulses to the battery. The controller constantly checks the state of the battery to determine the frequency and duty cycle of the pulse. In a fully discharged battery, the pulses would be very long and almost continuous while as the charge in battery increases, pulses might be very short. The controller checks the state of charge on the battery between pulses and adjusts itself each time.

Consider the interactive graph as shown in Fig.1 with standard test conditions. The charge voltage imposed on the solar panel (i.e, PWM voltage $V_{pwm}$) can be found by drawing a vertical line at the voltage point equal to the battery Voltage ($V_{bat}$) + 0.5$V$. The additional 0.5$V$ represents the voltage loss in the cabling and controller. The intersection of this line with the current-voltage curve gives the corresponding PWM current ($I_{pwm}$).

Eg - If $V_{bat}$ = 13$V$, then $V_{PWM}$ = 13.5$V$ and corresponding $I_{PWM}$ = 6.2$A$  
Total power $P_{PWM}$ = $V_{PWM}$ * $I_{PWM}$ = 13.5 * 6.2 = 83.7$W$

## MPPT charge controller

MPPT (Maximum Power Point Tracking) controllers contain a DC-DC transformer which transfers the power from higher voltage to lower voltage system. The amount of power transfered remains the same whereas the voltage and current varies correspondingly. In order to get the best out of solar panels, MPPT charge controller finds and operates at optimal current-voltage point where maximum power can be transferred. In contrast, PWM controllers operate at the voltage equal to that of battery voltage which is not an optimal current-voltage point resulting in wastage of power. In the interactive graph shown in Fig.1, voltage at maximum power ($V_{mpp}$) is found out by drawing a vertical line at the peak of power-voltage curve. Corresponding current is obtained by the point of intersection of the vertical line with the current-voltage curve. 

Eg - If $V_{MPP}$ = 18$V$, then corresponding I = 5.56$A$.  
Total power = 18 * 5.56 = 100$W$.

It can be clearly noted that MPPT charge controller outperforms the PWM charge controller from the above example. 

## Effect of temperature

Temperature has significant effect on the efficiency of charge controllers. As the temperature increases, $V_{oc}$ decreases i.e, current-voltage curve moves to the left but the current remains almost constant as seen from the interactive graph in Fig.1. Consequently, the power-voltage graph and hence maximum power point also moves towards lower value.

Eg - At temperature = 75$^{\circ}C$     
MPPT charge controller : Total power = 14.2$V$ * 5.6$A$= 79.52$W$    
PWM charge controller : Total power = 13.5$V$ * 6$A$ = 81$W$

Since the maximum power point moved to the lower value, the power transferred in case of MPPT charge controller decreased resulting in lower performance. At this point, MPPT charge controllers can no longer outperforms PWM charge controllers.





