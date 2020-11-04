# Wind Turbines
Harvesting wind energy is one of the oldest forms of energy production in human history. Even without an electric generator it can be used to drive pumps or mills directly. This chapter will explain the core principles of wind energy and highlight the advantages as well as the disadvantages.

## Turbine Types
The two main types of turbines are distinct by their working principles. 
Drag type turbines use the fact that certain bodies or geometries have different drag when moving against the wind and are comonly reffered to as "Savonius turbines". Lift type turbines use the lift effect on airfoils in moving liquids, much like an airplane. 

According to *Betz's Law*, the maximum of energy that can be extraxted from the wind is around $\frac{16}{27}$ or $\approx60\%$ of the total kinetic energy of the moving air. The most important detail of turbines is therefore the power coefficient $c_p% and how close it is to the maximum defined by *Betz's Law*. It is defined by the ratio of turbine energy output to kinetic wind energy:

$$c_p=\frac{P_{turbine}}{P_{wind}}$$


### Drag Runner

Drag type turbines are always Vertikal Axis Wind Turbines (VAWT), where the rotational axis is vertical to the wind.
<figure>
    <center>
        <a href="https://commons.wikimedia.org/wiki/File:Savonius_turbine.svg">
            <fig-caption src="system/savonius_turbine.svg" caption="Two-scooped savonius turbine [1]" style="width:25%"  num="1" />
        </a>
    </center>
</figure>

The mathematical equation to describe the force on the scoops is given by

$$F = \frac{c_w}{2} \cdot \varrho_{air} \cdot A \cdot v_{air}^2$$

where $A$ is the cross-sectional area of the scoop, $v_{air}$ is the windspeed, $\varrho_{air}$ is air density and $c_w$ is the drag coeeficient specific for the geometry used. The coefficient is derived via measurements and can be found in corresponding tables. The force driving the rotation is the difference between the coefficients:

$$\Delta F = \frac{c_{w,1}}{2} \cdot \varrho_{air} \cdot A \cdot v_{air}^2 - \frac{c_{w,2}}{2} \cdot \varrho_{air} \cdot A \cdot v_{air}^2 = \frac{c_{w,1} -c_{w,2}}{2} \cdot \varrho_{air} \cdot A \cdot v_{air}^2$$


A Savonius rotors rotation speed can not exceed the wind velocity, so the Tip Speed Ratio (TSR) defined as

$$\lambda = \frac{\omega r}{v_{air}}$$

with $\omega$ as angular frequency and $r$ as radius, is always $\lambda\le1$. Due to their low power coeefficient ($c_p \lt 25\%)$ and low rotatioal speed, Savonius turbines are not commonly used for power generation. There are however cases were a high starting torque, simple design and low maintenance requirements are beneficial.

### Lift Runner

Lift running turbines use airfoils as blade geometry and are mostly divided into VAWT and Horizontal Axis Wind Turbines (HAWT). There are other hybrids and experimental types of turbines, but those are not commonly used. Most lift types have a much higher TSR ($\lambda$=2...6) than drag types thus the wind velocity at the blade is much higher, resulting in better power coeeficients. All lift types have a relativly low starting torque, resulting in a high cut-in windspeed.

<figure>
    <center>
        <a href="https://commons.wikimedia.org/wiki/File:Airfoil_lift_and_drag.svg#/media/File:Airfoil_lift_and_drag.svg">
            <fig-caption src="system/airfoil_lift_and_drag.svg" caption="Basic principle of lift on an airfoil [2]" style="width:50%"  num="2" />
        </a>
    </center>
</figure>

#### HAWT

Horizontal turbines are most commonly seen in commercial wind energy production due to there high power efficiency ($c_p \approx50\%$) and scalability. To control rotational speed, large systems use active pitch controller where each blade can be individually pitched to adapt generated torque. Small turbines with fixed blades need either a passive stall design or a yaw mechanism to effectivly lower the wind-facing area of the turbine. Most systems will have mechanical or hydraulic brake system for storm protection. Since the relative windspeed attacking the blade changes along the radius, the angle of attack also changes which leads different optimal blade geometries along the blade. 

| Advantages                            | Drawbacks                                     |
|---------------------------------------|-----------------------------------------------|
| High Power coefficient                | Yaw system to follow wind needed              |
| No pulsating torque on drive train    | High noise generation due to high tip speed   |
| Well understood and developed         | Complex blade design and production           |

#### VAWT

Vertical axis wind turbines have a power coefficient of $c_p \approx 30\%-40\%$ and are not often found in commercial setups. They have however some advantages that makes them suitable for a range of applications. Namely their low noise profile and unusal appearance give them high acceptance in urban areas. They also do not require a yaw system and are better suited for turbulent areas. Most common designs are the Darriues turbine, the helical bladed turbine and the straight-bladed Darrieus turbines (see [Wikipedia](https://en.wikipedia.org/wiki/Darrieus_wind_turbine) for more details)

| Advantages                            | Drawbacks                                     |
|---------------------------------------|-----------------------------------------------|
| No yaw mechanism needed               | Medium Power coefficient                      |
| Low noise profile                     | High normal forces on axis                    |
| Simple blade geometry                 | Oscillating torque on generator               |

## Generators

## Projects

<h2>References</h2>

[1] !Original: RottweilerVector: Cmglee, CC BY-SA 3.0, [Link](http://creativecommons.org/licenses/by-sa/3.0/)

[2] By Vector by רונאלדיניו המלך, Original by J Doug McLean, CC BY-SA 4.0, [Link](https://commons.wikimedia.org/w/index.php?curid=775969569)

::: warning TODO
- Types of generators
- Necessary electronics and connection
- Popular designs and projects (e.g. by Hugh Piggott)
:::
 