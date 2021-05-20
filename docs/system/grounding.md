# Grounding

The voltage $U$ in any electrical system is defined as the difference of two electric potentials:

$$U=\varphi_1 -\varphi_2$$

Therefor, a battery with the voltage of $U=3V$ can have any potential on the negative or positive side, as long as the difference is $3V$. In theorie, two batteries could have each $3V$ accross, one with a negative potential of $\varphi_{1,neg} = 0V$ and a positive potential of $\varphi_{1,pos}= 3V$ and the other with $\varphi_{2,neg} = 1000V$ and $\varphi_{2,pos}=1003V$. It is clear that the voltage across the two negative sides of the batteries is $U=\varphi_{2,neg} - \varphi_{1,neg} = 1000V$, which could pose a risk and causes possibly undefinded behaviour.
::: warning Common Ground
In order to have a common **reference potential**, the potential of the earth is defined as $\varphi_{earth}=0V$
:::
If a circuit is connected to ground on one side, the rest of the potentials within it are clearly defined and comparable to all other grounded circuitry.

## positive vs. negative grounding

Which side of the circuit should be connected depends on the parts used. Most common is negative grounding, so that all voltages in the circuit are positive. Some components or combinations require negative voltages, so a positive grounding is required. Another reason to use positive grounding is electro-chemical corrosion. Corrosive effects are mainly driven by potential differences between metals or minerals, mostly in the presence of moisture. For wires buried in the ground or circuits in moist conditions, it could be beneficial to "pull" the potentials down.

## high-side vs. low-side switching

When switching a load or circuit, the switch can either separate the higher potential or the lower potential from the rest of the components. If using a mechanical switch like a relay, it is not important on which side of the load or circuit it is located for it to work. If using a MOSFET however, the turn-on conditions are based on the voltage between gate and source. When the MOSFET is on, the source voltage is equal to the drain voltage as there is basicaly no voltage drop across. To avoid additional circuitry to provide a gate voltage high enough, a low side switch can always be implemented. See the pictures below for more details.

One reason to use high side switching is to keep the components at ground potential when switched of. With low-side switching, the components are on the higher potential, e.g. $20V$, when turned off and any unintended connection to ground like moisture or by touching can lead to a short cicuit. For safety reasons it is mostly better to implement high-side switching.

Figure 1 illustrates why a n-channel MOSFET cannot be used for high-side switching without additional circuitry. Assuming the gate voltage is the highest possible (same as the only source), $U_G=10V$. When the transitor is switched on, the drain and the source voltage become the same ($U_D=U_S=10V$) and the gate-source voltage is then $U_{GS} = U_G - U_S = 0V$ which is below the threshold voltage $U_{th} and the transistor closes again.
<fig-caption src="system/high-side-mosfet.svg" caption="High side MOSFET, not working" num="1" />

To circumvent this, an additional circuit which provides higher voltage is needed, so that $U_{GS} > U{th}$.