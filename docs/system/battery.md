# Battery

A battery can be metaphorized as a container that is slowly filled with liquid. The amount of liquid that the container can hold is corresponding to the amount of energy the battery can store, the battery then runs for some period of time, gradually loses the stored energy and eventually expires since it is highly customized for specific customers needs.

This chapter provides the necessary basics of electrical batteries in order to understand their usage in a DC energy system.

**For more detailed information about batteries, the excellent [Battery University](https://batteryuniversity.com/) website is highly recommended.**

## Working Principle

 The battery is a power device for energy conversion and storage that converts stored chemical energy into electrical energy through a reaction. It consists of a cathode **(+)** and an anode **(-)** terminals made of different materials called **electrodes** and a chemical medium separating these terminals called **electrolyte**.

**The working principle of the battery is shown in the following figure and is explained below.**

<figure>
<center>
    <img src="./images/battery.svg" alt="Basic principle of battery" height="auto" width="auto" />
    <figcaption><b>Figure 1.</b> Basic principle of battery.</figcaption>
</center>
</figure>

 When the battery is connected to an external circuit, such as a lamp, a chemical reaction within the battery occurs which results in building up excess of electrons. This causes an electrical difference between the anode and the cathode. The electrolyte ensures that the extra electrons are not displaced directly to the cathode. The electrons then flow through the external circuit to the cathode. In other words, the electric current starts flowing from the anode to the cathode which in return provides power to any appliance placed along the way.

## Types of Batteries

Batteries can be classifed into two main categories; non-rechargeable (primary) and rechargeable (secondary). **Primary batteries** are normally intended for single-use and can not be recharged once depleted. These types of batteries are not eco-friendly. However, they generally store more energy and last longer than rechargeable batteries of same size. The most common primary batteries are Zinc-carbon, Alkaline and Lithium, while **secondary batteries** can be charged, discharged into a load and recharged for many cycles. The most common are Lead-Acid, Lithium-ion, Nickel-Metal Hydride and Nickel Cadmium.

### Lead-Acid

The lead-acid battery is the first rechargeable system used commercially, commonly used in the solar industry. It requires regular observation to avoid poor performance of the battery.

Lead-acid batteries can be classified into two main groups; ***Flooded (or Wet cell)*** and ***Sealed***. The latter group can be broken down into ***VRLA***, ***AGM*** and ***gel*** which are explained below.

#### Flooded Lead-Acid Battery

The flooded battery is the standard and most economic on the market today. It contains a liquid sulfuric acid electrolyte which moves freely around inside the battery encasement. A reaction occurs between the battery acid and lead plates during the charging process and electric energy is stored.
In order to reach the optimum lifespan, they need to be upright to work properly and the user must frequently access the cells, check the levels and add distilled water as the battery dries out.

#### Sealed Lead-Acid Battery

The Sealed battery is similar to to the flooded type with a slight modification. The user has no access to the inside encasement anymore and does not need to add distilled water. The electrolyte is sealed and there is an enough amount of acid capable of sustaining the chemical reaction within the battery for a calculated number of cycles.

***VRLA or Valve Regulated Lead Acid*** is a general term for sealed the lead-acid battery that consists of a valve that controls the whole mechanism of releasing the gases from the battery during charging. The valve is closed under normal conditions which allows the recombination of the hydrogen and oxygen gases produced and preventing the loss of electrolyte. If the battery is fast-charging or overcharged, the valve opens and allows some gas to escape.

***AGM or Absorbed Glass Mat*** is one kind of the VRLA batteries, the glass mat construction allows the electrolyte to be absorbed in a thin fiberglass mat sandwiched between the lead plates. This type of battery is more proof against vibrations enhancing both the discharge and recharge efficiencies.
The AGM batteries are fast-charging compared to the flooded versions, yet costly and sensitive to over-charging. The lifespan of AGM battery is also longer than the flooded type.

***Gel*** is another kind of the VRLA batteries similar to the AGM battery in the sense of electrolyte suspending. However, it uses a silica additive instead of the glass mat.
The major distinction between them is the rate of charging, AGM batteries can hold higher charge and discharge rates than the gel ones. Gel batteries are also the most costly and sensitive to over-charging among other VRLA batteries.

### Lithium-Ion

The **Lithium-ion** battery has unprecedentedly become a superior battery system on the market in recent years since it comes with distinct improvements over the previous battery versions.

**The battery is characterized by the following specifications:**

* ***Lightweight***.
* ***High energy density*** which is important in today's electronic devices such as mobile phones that need to operate longer between subsequent charges despite their high power consumption.
* ***Recharged*** and ***reused*** many times.
* ***Low-maintenance battery***, a privilege that most other chemistries cannot provide. The battery has no memory effect which does not require any maintenance procedures to check its performance.
* The ***self-discharge*** rate of lithium-ion batteries is much lower than other forms of rechargeable batteries and it does not require deliberate full discharge to maintain its optimum performance.

A major disadvantage of Li-ion batteries is the sensitivity to over-charging or over-discharging circumstances resulting in various battery failures and hence it requires a system that monitors its temperature, current and voltage states, protects the battery from operating outside the safe limits in addition to regulating its charging and discharging processes. This system is called ***BMS or or Battery Management System***.

The BMS is essential for the longevity, safety and performance of Lithium-ion batteries. **More detailed information can be found in the [Battery Management System](bms.md) chapter.**

### Single Cells and Voltage Levels

The voltage of a single electrochemical cell is normally too low to be used in higher power application. If several single cells are connected in series to increase the voltage, this is called battery.

Typical 12V lead-acid batteries consist of 6 cells in series. A battery at a similar voltage using Lithium Iron-Phosphate cells needs only 4 cells, as the single cell voltage is at around 3.3V.

The following interactive graph shows the open circuit voltage (the voltage at the battery terminals without any current flow) for three different types of battery cells vs. their state of charge (SOC).

<battery-voltage-levels/>

For lithium-ion NMC cells, the open circuit voltage is a good indicator to determine the state of charge of the battery. Lead-acid batteries have a large hysteresis in the open circuit voltage, so the actual voltage measured at the terminal highly depends on whether the battery was charged or discharged before. So the SOC can only be roughly estimated. Lithium iron-phosphate cells have a very flat curve, so the voltage is almost the same at high and low SOC. Thus, additional measures for proper SOC calculation need to be implemented in a battery management system.

## Charge Methods

A good selection of the charging technique will prolong the service lifetime of the batteries, optimize their performance and prevent fatal damages.

### Four-Stage Battery Charging

<figure>
<center>
    <img src="./images/four-stage-charging.svg" alt="Battery charging stages" height="auto" width="auto" />
    <figcaption><b>Figure 2.</b> Battery charging stages.</figcaption>
</center>
</figure>

* The ***Bulk or CC or MPPT*** is the first charging stage the battery goes through. This stage involves about 70 percent of the charging process. In this phase, the battery is charged with a constant current, typically the maximum current which the charger can produce. As a result, the terminal voltage increases until the peak charge voltage limit is reached and then it proceeds to the topping phase.
* During the ***Topping or CV or Absorpation*** charging stage, the remaining 30 percent is continued being charged at a constant voltage while gradually decreasing the charge current until the battery is fully charged.
* The ***Equalization*** charging is beneficial for many batteries such as the flooded lead-acid versions. It can be considered as a periodic controlled overcharge that brings the cells to the same voltage level and remove the sulphation by increasing the voltage to a higher value than the peak charge voltage limit while the charging current is set to a very low value.
* The ***Trickle or Float*** charging is the final phase upon the completion of the absorption phase which maintains the battery at full charge. During this stage, the charge voltage is reduced and held constant, while the current is reduced to an insignificant value that prevents any further heating of the battery.

**For lead-acid batteries**, the charging can go through the four charging stages. However, some versions do not have the periodic boost of the equalization charge and are only charged using the other three stages.

**For lithium-ion batteries**, the charging process only goes through the bulk and topping charging stages. The current then disappears and no float charging process occurs.

### Charging Voltages

|      Battery Type               |   Bulk Stage      |  Topping Stage   |   Equalization Stage  |  Float Stage  |
|:-------------------------------:|:-----------------:|:----------------:|:---------------------:|:-------------:|
| Flooded, single cell            |      2.45 V       |      2.4  V      |        2.5  V         |     2.35 V    |
| Flooded, 6-cell                 |      14.7 V       |      14.4 V      |        15   V         |     14.1 V    |
| AGM, 6-cell                     |      14.7 V       |      14.4 V      |        14.7 V         |     13.8 V    |
| Gel, 6-cell                     |      14.7 V       |      14.4 V      |        14.7 V         |     13.8 V    |

::: warning TODO
- Impact on lifetime
:::