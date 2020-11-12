# Wind Turbines
Harvesting wind energy is one of the oldest forms of energy production in human history. Even without an electric generator it can be used to drive pumps or mills directly. This chapter will explain the core principles of wind energy and highlight the advantages as well as the disadvantages.

## Turbine Types
The two main types of turbines are distinct by their working principles. 
Drag type turbines use the fact that certain bodies or geometries have different drag when moving against the wind and are comonly reffered to as "Savonius turbines". Lift type turbines use the lift effect on airfoils in moving liquids, much like an airplane. 

According to *Betz's Law*, the maximum amount of energy that can be extracted from the wind is around $\frac{16}{27}$ or $\approx60\%$ of the total kinetic energy of the moving air [3]. The most important detail of turbines is therefore the power coefficient $c_p$ and how close it is to the maximum posted by *Betz's Law*. It is defined by the ratio of turbine energy output to kinetic wind energy [3]:

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

where $A$ is the cross-sectional area of the scoop, $v_{air}$ is the windspeed, $\varrho_{air}$ is air density and $c_w$ is the drag coeeficient specific for the geometry used. The coefficient is derived via measurements and can be found in corresponding tables. The force driving the rotation is the difference between the coefficients $c_{w,1}$ and $c_{w,2}$ for the flat and curved sides of the scoop, respectively:

$$\Delta F = \frac{c_{w,1}}{2} \cdot \varrho_{air} \cdot A \cdot v_{air}^2 - \frac{c_{w,2}}{2} \cdot \varrho_{air} \cdot A \cdot v_{air}^2 = \frac{c_{w,1} -c_{w,2}}{2} \cdot \varrho_{air} \cdot A \cdot v_{air}^2$$


A Savonius rotor's rotation speed can not exceed the wind velocity, so the Tip Speed Ratio (TSR) defined as

$$\lambda = \frac{\omega r}{v_{air}}$$

with $\omega$ as angular frequency and $r$ as radius, is always $\lambda\le1$. Due to their low power coeefficient ($c_p \lt 25\%$) and low rotatioal speed, Savonius turbines are not commonly used for power generation. There are however cases were a high starting torque, simple design and low maintenance requirements are beneficial.

### Lift Runner

Lift running turbines use airfoils as blade geometry and are mostly divided into VAWT and Horizontal Axis Wind Turbines (HAWT). There are other hybrids and experimental types of turbines, but those are not commonly used. Most lift types have a much higher TSR ($\lambda$=2...12) [4] than drag types thus the wind velocity at the blade is much higher, resulting in better power coeeficients. All lift types have a relativly low starting torque, resulting in a high cut-in windspeed.

<figure>
    <center>
        <a href="https://commons.wikimedia.org/wiki/File:Airfoil_lift_and_drag.svg#/media/File:Airfoil_lift_and_drag.svg">
            <fig-caption src="system/airfoil_lift_and_drag.svg" caption="Basic principle of lift on an airfoil [2]" style="width:50%"  num="2" />
        </a>
    </center>
</figure>

#### HAWT

Horizontal turbines are most commonly seen in commercial wind energy production due to there high power efficiency ($c_p \approx50\%$) and scalability. To control rotational speed, large systems use active pitch controller where each blade can be individually pitched to adapt generated torque. Small turbines with fixed blades need either a passive stall design or a yaw mechanism to effectivly lower the wind-facing area of the turbine. Most systems will have mechanical or hydraulic brake systems for storm protection. Since the relative windspeed attacking the blade changes along the radius, the angle of attack also changes which leads different optimal blade geometries along the blade [4]. 

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

Electric generators can be classified into radial flux machines and axial flux machines. The main difference is the flow direction of magnetic flux, where it is either parallel or radial to the rotaional axis. The common synchronous and asynchronous (induction) machines belong to the radial flux machines and are mainly used in large turbines. One of the main challenges for larger wind turbines is the connection to the grid. While DC-Sources can be connected to the grid when their voltage is equal to the grid voltage, AC-Sources have to be in synch with the grid's voltage frequency and amplitude [4]. For small scale, especially off-grid turbines, axial flux generators are more common as they can be fairly easily constructed without high level machinery, especially for low-rpm usecases.

### Asynchronous

The distinctive property of induction generators is the slip between rotor and stator fields. In generator operation, the turbine moves the rotor *above* the synchronous speed. Because of the two magnetic fields running against each other, this type of generator can introduce high reactive power loads in the system. 

The synchronous speed $n_s$ in *rpm* is dependend on the pole count $p$ (as pairs, four poles -> two pairs)  of the stator and the excitation frequenzy $f_e$:

$$n=\frac{f_e\cdot60}{p}$$

The synchronous speed for a four pole generator on grid frequenzy of $f=50Hz$ is $1500rpm$. To achieve these speeds, a gearbox is installed. Alternatively the pole pairs could be increased, leading to higher overall mass. To run a turbine at $n_s=120rpm$ and $f=e=50Hz$, $p=25$ pole pairs (!) are needed which is simply not feasible for this type of machine. To manipulate the synchronous speed to allow variable turbine speed, several approaches are possible. The quasi-standard are double-fed induction generators (DFIG) (always as wound-rotor) where the field windings are fed with an adjustable frequency AC-power [4] while the armature windings are directly connected to the grid or other equipment for conversion. With this setup, the rotational speed of the turbine can vary with windspeed while the active *and* reactive power of the generator can be controlled.

<figure>
    <center>
        <a href="https://commons.wikimedia.org/wiki/File:DFIG_in_Wind_Turbine.svg#/media/File:DFIG_in_Wind_Turbine.svg">
            <fig-caption src="system/DFIG_in_Wind_Turbine.svg" caption="Schematics for a double fed induction generator [5]" style="width:50%"  num="3" />
        </a>
    </center>
</figure>

### Synchronous

#### Field Coil Excitation

Synchronous generators can be build with a much higher pole count than asynchronous generators and are used for gearless setups which reduces the maintance requirements significantly. If they are directly coupled to the grid, they need to be synchronized first and cannot run with different speeds. In fact, when the force on the turbine increases and the generator comes out of sync with the grid, the system can be damage due to balancing currents.
Most turbines have a rectifier and a [power inverter](inverter) to connect to the grid.

#### Permanent Magnet Excitation

Exitation with permanent magnets reduces the complexity and therefor maintance. For this reason, PM generators are used mostly on offshore wind farms. There is also no energy needed for exitation so they have slightly better efficieny. Considering the large amount of rare earths needed for permanent magnets though, this effect is negligible [6].

The axial flux or axial gap generators are a special type of synchronous PM generators not widely found in larger applications. It can however be found frequently for small scale DIY turbines. Their flat structure and easy-to-wind coils makes them very suited for small workshops. They provide a fairly good efficiency and common materials such as wood, steel and epoxy can be used. Since the rotor becomes wider with increasing pole count, rotational inertia and centrifugal forces are increased as well, though higher pole count mostly means lower rpm needed.

## Electronics

Depending on the generator used and to what load (machine, grid, battery, ...) the sytem will be connected, different electronic components are necessary. Since this OER is aimed at makers and for off-grid (or local tiny-grid) use cases, high power AC/DC-DC/AC setups, frequency synchronizing elements for direct coupled wind turbines or storage units like pumped hydroelectric energy storage are not discussed.
Most common standalone systems consist of a source, a sink and a storage unit.

As a storage unit, mostly [batteries](battery) are used. While it is possible to connect a turbine directly to some types of batteries using a rectifier and a charge controller like [Hugh Piggott](#projects) suggested, it has some serious drawbacks.


<fig-caption src="system/wind_direct_battery.svg" caption="Simplified layout for direct connection to the battery after Piggott's design" style="width:100%"  num="4" />


Whenever there is an increase in voltage or the battery is full and no load is connected, current will be diverted to the dump load and dissipated. If the voltage of the turbine is much higher than the battery's, it's not suitable to charge the battery. The same happens when the turbine voltage is below charging voltage. To mitigate these flaws, a rectifier and a [DC/DC-Converter](../development/dcdc_converter) can be used to either step-down or step-up the voltage needed to efficiently charge the battery. This is mostly done inside a [charge controller](charge_controller) which can take several parameters into account like optimal current at given generator voltage. Modern batteries like [Lithium-Ion](battery#lithium-ion) require a proper [Battery Management System](bms) to work safely. 


<fig-caption src="system/wind_controlled_battery.svg" caption="Simplified layout for controlled connection to the battery" style="width:100%"  num="5" />

The disadvantage of this design is that all components need to be able to take the full maximum power taken by the load or given by the turbine.

## Projects
One of the most famous DIY-projects is [Hugh Piggott's](http://scoraigwind.co.uk/) 2F-Windturbine. His [books](http://scoraigwind.co.uk/all-of-the-books-by-hugh-how-to-get-them/) provide many details as well as basic principles on how to design, build and run small off-grid turbines.

Another well-documented project with good [video](https://www.youtube.com/watch?v=EPmW-BjCiWI&list=PLdO3Wk-XPC_CZxL8AA-ZpndukLLF0TlQu) material is James Biggar's [Reaper Turbine](https://www.resystech.com/3-kw-wind-turbine.html)

Another seriously low-tech wind turbine is the design provided as open source by [Daniel Connel]( https://opensourcelowtech.org/wind_turbine.html). It is a VAWT as a combination of lift and drag type and can be constructed for under 100€ in material cost.

<h2>References</h2>

[1] !Original: RottweilerVector: Cmglee, CC BY-SA 3.0, [Link](http://creativecommons.org/licenses/by-sa/3.0/)

[2] By Vector by רונאלדיניו המלך, Original by J Doug McLean, CC BY-SA 4.0, [Link](https://commons.wikimedia.org/w/index.php?curid=775969569)

[3] E. Hau, Windkraftanlagen: Grundlagen, Technik, Einsatz, Wirtschaftlichkeit. Springer-Verlag Berlin Heidelberg, 2008

[4] S. Heier, Windkraftanlagen: Systemauslegung, Netzintegration und Regelung. 6. Auflage, Springer Vieweg Verlag Wiesbaden, 2018, DOI: https://doi.org/10.1007/978-3-8348-2104-1

[5] By Funkjoker23 - Own work, CC0, https://commons.wikimedia.org/w/index.php?curid=17634829

[6] Wikipedia contributors. (2020, October 19). Rare-earth element. In Wikipedia, The Free Encyclopedia. Retrieved 07:59, November 6, 2020, [Link](from )https://en.wikipedia.org/w/index.php?title=Rare-earth_element&oldid=984305200)
