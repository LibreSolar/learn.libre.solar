# Battery

A battery can be metaphorized as a container that is slowly filled with liquid. The amount of liquid that the container can hold is corresponding to the amount of energy the battery can store, the battery then runs for some period of time, gradually loses the stored energy and eventually expires since it is highly customized for specific customers needs.

This chapter provides the necessary basics of electrical batteries in order to understand their usage in a DC energy system.

**For more detailed information about batteries, the excellent  [Battery University](https://batteryuniversity.com/) website is highly recommended.**

## Working principle

 The battery is a power device for energy conversion and storage that converts stored chemical energy into electrical energy through a reaction. It consists of a cathode **(+)** and an anode **(-)** terminals made of different chemicals called **electrodes** and a chemical medium separating these terminals called **electrolyte**.

**The working principle of the battery is shown in the following figure and is explained below.**

<figure>
<center>
    <img src="./images/battery.svg" alt="Basic principle of battery" height="auto" width="auto" />
    <figcaption><b>Figure 1.</b> Basic principle of battery.</figcaption>
</center>
</figure>

 When the battery is connected to an external circuit, such as a lamp, a chemical reaction within the battery occurs which results in building up excess of electrons. This causes an electrical difference between the anode and the cathode. The electrolyte ensures that the extra electrons are not displaced directly to the cathode. the electrons then flow through the external circuit to the cathode. In other words, the electric current starts flowing from the anode to the cathode which in return provides power to any appliance placed along the way.

## Types of batteries

Batteries can be classifed into two main categories; non-rechargeable (primary) and rechargeable (secondary). **Primary batteries** are normally intended for single-use and can not be recharged once depleted. These types of batteries are not eco-friendly. However, they generally store more energy and last longer than rechargeable batteries of same size [1]. The most common primary batteries are Zinc-carbon, Alkaline and Lithium, while the **secondary batteries** can be charged, discharged into a load and recharged for many cycles. The most common are Lead-Acid, Lithium-ion, Nickel-Metal Hydride and Nickel Cadmium.

### Lead-acid

The lead-acid battery is the first rechargeable system used commercially, commonly used in the solar industry. The charging method is straightforward. However, it requires accurate choice of voltage limits to avoid poor performance, sulfation and corrision [3]. In addition, continuous observation must always be taken into consideration.

Lead-acid batteries can be classified into two main groups; ***Flooded (or Wet cell)*** and ***Sealed***. The latter group can be broken down into ***VRLA***, ***AGM*** and ***GEL*** which are explained below.

#### Flooded Lead-acid battery

The flooded battery is the standard and most economic on the market today. It contains a liquid sulfuric acid electrolyte which moves freely around inside the battery coating. A reaction occurs between the battery acid and lead plates during the charging process and electric energy is stored.
In order to reach the optimum lifespan, they need to be upright to work properly and the user must frequently access the cells, check the levels and add distilled water as the battery dries out.

#### Sealed Lead-acid battery

the Sealed battery is similar to to the flooded type with a slight modification. The electrolyte is sealed, the user has no access to the inside encasement anymore and the manufacturer is responsible for the number of battery cycles and ensures an enough amount of acid that is capable of sustaining the chemical reaction throughout the warranty period.

***VRLA or Valve Regulated Lead Acid*** is a general term for sealed the lead-acid battery that consists of a valve that controls the whole mechanism of releasing the gases from the battery during charging. The valve is closed under normal conditions which allows the recombination of the hydrogen and oxygen gases produced and preventing the loss of electrolyte. If the battery is fast-charging or overcharged, the valve opens and allows some gas to escape.

***AGM or Absorbed Glass Mat*** is one kind of the VRLA batteries, the glass matte construction allows the electrolyte to be absorbed in a thin fiberglass mat sandwiched between the lead plates. This type of battery is more proof against vibrations enhancing both the discharge and recharge efficiencies [2].
The AGM batteries are fast-charging compared to the flooded versions, yet costly and sensitive to over-charging. The lifespan of AGM battery is also longer than the flooded type.

***GEL*** is another kind of the VRLA batteries similar to the AGM battery in the sense of electrolyte suspending. However, it uses a silica additive instead of the glass mat.
The major distinction between them is the rate of charging, AGM batteries can hold higher charge and discharge rates than the gel ones. Gel batteries are also the most costly and sensitive among other VRLA batteries, yet suitable for very slow discharge projects.

**The comparisons between the lead-acid batteries are mostly extracted from the [Battery University](https://batteryuniversity.com/) website.**

### Lithium-ion

The lithium-ion battery has unprecedentedly become a superior battery system on the market in recent years since it comes with distinct improvements over the previous battery versions. For the outstanding technology of lithium-ion batteries, they have recently won the **chemistry Nobel prize** [3].

**The lithium-ion battery is characterized by:**

* ***Lightweight***.
* ***High energy density*** which is important in today's electronic devices such as mobile phones that need to operate longer between subsequent charges despite their high power consumption.
* ***Recharged*** and ***reused*** many times.
* ***Low-maintenance battery***, a privilege that most other chemistries cannot provide. The battery has no memory which does not require any maintenance procedures to check its performance.
* The ***self-discharge*** rate of lithium-ion batteries is much lower than other forms of rechargeable batteries and it does not require deliberate full discharge to maintain its optimum performance.

 **With the growth of solar and electric automotive industries, the development of more powerful and lightweight power storage devices like the lithium-ion batteries will become essential.**

### Single cells and voltage levels

The voltage of a single electrochemical cell is normally too low to be used in higher power application. If several single cells are connected in series to increase the voltage, this is called battery.

Typical 12V lead-acid batteries consist of 6 cells in series. A battery at a similar voltage using Lithium Iron-Phosphate cells needs only 4 cells, as the single cell voltage is at around 3.3V.

The following interactive graph shows the open circuit voltage (the voltage at the battery terminals without any current flow) for three different types of battery cells vs. their state of charge (SOC).

<battery-voltage-levels/>

For lithium-ion NMC cells, the open circuit voltage is a good indicator to determine the state of charge of the battery. Lead-acid batteries have a large hysteresis in the open circuit voltage, so the actual voltage measured at the terminal highly depends on whether the battery was charged or discharged before. So the SOC can only be roughly estimated. Lithium iron-phosphate cells have a very flat curve, so the voltage is almost the same at high and low SOC. Thus, additional measures for proper SOC calculation need to be implemented in a battery management system.

::: warning TODO
- What is special about li-ion chemistry?
- Battery Management System basics
:::

## Charge methods

::: warning TODO
- 2-stage, 3-stage, etc.
- Impact on lifetime
:::

### References

[1] Batteries explanation from "Explain That Stuff",[link](https://www.explainthatstuff.com/batteries.html)

[2] Lead-acid batteries from "Whole Sale Solar", [link](https://www.wholesalesolar.com/blog/lead-acid-battery-comparison/)

[3] Lithium-ion batteries Nobel prize from "Nobel Prize", [link](https://www.nobelprize.org/prizes/chemistry/)