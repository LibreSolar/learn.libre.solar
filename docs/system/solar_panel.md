# Solar Panel

Photovoltaic solar energy is especially suitable for decentralized and small-scale systems as it does not require maintainance of mechanical parts and because the efficiency is independent of the size of the system.

This chapter provides basic understanding of the working principles of solar panels and helps with correct system layout.

## Photovoltaic Cells

A photovoltaic (PV) cell generates an electron flow from the energy of sunlight using semiconductor materials, typically silicon.

The basic principles of a PV cell are shown in Figure 1 and explained below.

<figure>
<center>
    <img src="./images/pv-cell-principles.gif" alt="Basic principle of photovoltaic cells" height="auto" width="auto" />
    <figcaption><b>Figure 1.</b> Basic principle of photovoltaic cells [1].</figcaption>
</center>
</figure>

The cell contains two different types of silicon: A so-called n-type, which has extra electrons and a p-type with extra spaces for electrons, called holes. The two types are connected at the p/n junction and create an electrical field.

If a photon from the sunlight hits an electron in the p-type silicon with enough energy, it can remove it from its bond and push it accross the electrical field in the junction to the n-type side. The electron can now be fed back to the p-type side by an external load, closing the electrical circuit.

There are many different types of semiconductor materials available that can be used for solar cells. The most relevant types are mono- and poly-crystalline silicon cells and thin film cells.

### Poly- and mono-crystalline silicon

The most typical type of solar panels uses crystalline silicon cells. These cells are brittle and thus need to be fixed in a rigid module assembly.

Polycristalline cells are the cheapest available option and offer sufficient efficiency for most applications. Monocrystalline cells are slightly more efficient, but also more expensive due to a more complex manufacturing process.

### Thin film

This type of solar panels use a layer of amorphous silicone that is deposited on a base material. In contrast to crystalline silicon, also a flexible base material can be used.

Flexible modules can be more lightweight and don't need the rigid aluminum frame, so they are ideally suited for mobile applications.

The disadvantage compared to crystalline cells is the lower efficiency and higher cost of thin film modules.

## Panels and Arrays

As the voltage of a single solar cell is only around 0.6 V, multiple cells are normally connected in series to increase the voltage to a level suitable for the application. A typical rooftop solar panel contains 60 cells, leading to an open circuit voltage of around 36 V.

For larger systems, multiple panels (or modules) are again connected in series to increase the system voltage. An array of multiple solar panels might also contain parallel connections of modules, but parallel connection normally only makes sense if the voltage is limited. A series connection increases the voltage at the same current, whereas a parallel connection increase the current while keeping the voltage at the same level. As the losses increase with higher current, series connection is more efficient than parallel connection.

The different steps from a single PV cell to a solar array are shown in Figure 1.

<figure>
<center>
    <img src="./images/solar-cell-to-array.svg" alt="From a solar cell to a solar array" height="auto" width="auto" />
    <figcaption><b>Figure 2.</b> From a solar cell to a solar array.</figcaption>
</center>
</figure>

Small off-grid systems may use only a single module or even use modules with lower voltage. The following table lists typical module designs and their applications:

| # cells in series | Nominal Voltage  |   $V_{oc}$  |  $V_{mpp}$  | Typical applications   |
|-------------------|------------------|-------------|-------------|------------------------|
|   36              |       12 V       |     22 V    |    18 V     | 12 V battery systems   |
|   60              |       20 V       |     38 V    |    31 V     | Rooftop modules        |
|   72              |       24 V       |     44 V    |    36 V     | 24 V battery systems   |

Most modules for larger installations are equipped with a so-called [MC4 connector](https://en.wikipedia.org/wiki/MC4_connector). Even though this connector was originally developed by Multi-Contact, there are compatible solutions from several different suppliers available.

The typical wire cross-section for larger solar modules is 6 mm² (AWG 10) or 4 mm² (AWG 12). If multiple panels are connected in parallel, the cross-section of the wire between the parallel solar panels and e.g. the charge controller should be increased. See the separate chapter regarding wiring for more details.

## Electrical Characteristics

In order to compare solar panels from different manufacturers, the main technical parameters are measured under so-called standard test conditions (STC). The following three parameters are specified:

- **Solar irradiance** describes the sunlight intensity on a flat surface facing directly towards the sun. It is measured in W/m², with 1000 W/m² being the setpoint under STC. The higher the irradiance on a PV panel, the more electrical energy it will generate. The solar irradiance is approximately proportional to the current.

- **Air mass (AM)** refers to the “thickness” or clarity of the air through which the sunlight reaches the solar cell. The AM value is defined as 1 for a perpendicular position of the sun. The more flat the angle of the sun towards the surface of the earth gets, the lower the AM value. STC specifies AM 1.5.

- Actual **cell temperature**, which may be different from ambient air temperature. STC defines the cell temperature as 25°C. The cell temperature mostly affects the voltage of the panel.

The performance test is done in a short period of time, so that the cell temperature stays the same as the ambient temperature. Under realistic conditions, an ambient temperature of 25 °C would increase the module temperature to more than 45 °C for the irradiance of 1000 W/m². That's why there is a second test specified that determines the so-called normal operating cell temperature (NOCT) at an ambient temperature of 20 °C and an irradiance of 800 W/m².

The actual temperature of the module is very important, as it has a significant influence on the efficiency of the module. The higher the temperature, the lower the voltage and thus, efficiency of the module.

Datasheets specify the following parameters, measured under standard test conditions:

- **Open circuit voltage** $V_{oc}$ is the maximum voltage of panel when it is not connected to an electrical circuit or system, i.e. when there is no current flow. It can be measured with a multimeter directly at the panel’s terminals or the ends of the attached cables.

- **Voltage at maximum power point** $V_{mpp}$ is the voltage at which the power output of the module is at its peak. See below graphs for better understanding.

- **Current at maximum power point** $I_{mpp}$ is the current corresponding to $V_{mpp}$.

- **Short circuit current** $I_{sc}$ is the current measured when both terminals are connected to each other. In the characteristic curve, this point is where the voltage $V$ equals zero.

The **nominal voltage** as mentioned in the previous section refers to the recommended voltage of a battery that the module should be connected to. It cannot be measured directly and is normally not mentioned in the datasheet. It is always below the voltage at maximum power point under STC in order to compensate for the voltage reduction by increased temperature.

Most of us might assume that stronger sunshine means that more electrical power will be produced by a solar panel. In fact, this is often not the case. Like with other semiconductor devices, also the solar cell electrical properties are sensitive to temperature variabilities. As the efficiency decreases with increasing temperatues, sunny, but cold days in winter or spring are more likely than sunny summer days to have optimum conditions for solar panels.

In order to estimate the temperature influence on the performance, datasheets also state above electrical parameters under NOCT conditions. In addition to that, temperature coefficients for scaling the current and voltage parameters are provided. The effect of these coefficients can be seen in the graph in the following chapter.

## Performance Simulation

A solar cell has the same inner structure as a diode, as it consists of a p/n junction. So, the basis for modeling the behavior of a solar cell is a diode $D$.

The sunlight is modelled as a photo-generated current source $I_{ph}$. In order to consider losses in conductors and leakage current, the model is extended with a series resistor $R_s$ and a resistor $R_{sh}$ in parallel to the diode.

The described equivalent circuit model is shown in Figure 3. It is also called single-diode or five-parameter model.

<figure>
<center>
    <img src="./images/pv-equivalent-circuit.svg" alt="Equivalent circuit model of a solar cell" height="auto" width="auto" />
    <figcaption><b>Figure 3.</b> Equivalent circuit model of a solar cell.</figcaption>
</center>
</figure>

The following interactive graph plots the characteristic curves of a solar panel using an approximated solution of above model [2]. The equivalent circuit model parameters were calculated from datasheet parameters and can be adjusted for a specific solar panel. You can use it to evaluate how the ambient temperature and the irradiance influences the performance.

<solar-panel-characteristic-curve/>

<figure>
<center>
    <figcaption><b>Figure 4.</b> Solar panel characteristic curve <b>(interactive)</b>.</figcaption>
</center>
</figure>

The default values in the graph are based on a typical 150 W module with 36 cells, suitable for 12V systems.

<!--
## Energy calculation

::: warning TODO
- Global irradiance
- Difference between summer and winter
- Installation (angle, partial shading, etc.)
:::
-->

<h2>References</h2>

[1] Image by Tssenthi from Wikipedia, CC-BY-SA license, [link](https://commons.wikimedia.org/wiki/File:Silicon_solar_cell.gif)

[2] El Tayyan, Ahmed A.: A simple method to extract the parameters of the single-diode model of a PV system. Turkish Journal of Physics, 2013, [link](https://pdfs.semanticscholar.org/c8af/14dd80bd568eb8c717ae24fd9ea6222f9ad0.pdf)

<!--
[3] Calculator for daily solar irradiance: [Website](http://www.solarelectricityhandbook.com/solar-irradiance.html)
-->
