# Parts Order Process

### ![ns_com](./images/steps_order.png) <br /> 
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:5;border-color:#416960;border-width:2px; border-style:solid;}
.tg td{font-family:Arial, sans-serif;font-size:16px;padding:2px 10px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#bbb;color:#594F4F;}
.tg .tg-rmb8{font-weight:bold;vertical-align:top; text-align:right; width:200px;}
.tg .tg-rmb9{vertical-align:top}
.tg .tg-yw4l{font-weight:bold;vertical-align:top; text-align:right;}
.tg .tg-yw42{vertical-align:top}
</style>

<table class="tg">
  <tr>
    <td class="tg-yw4l">Material</td>
    <td class="tg-yw42">Data from Github</td>
  </tr>
  <tr>
    <td class="tg-rmb8">Tools</td>
    <td class="tg-rmb9">Computer with internet access</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Needed Skills<br></td>
    <td class="tg-yw42">Basic PC knowledge</td>
  </tr>
  <tr>
    <td class="tg-rmb8">Time</td>
    <td class="tg-rmb9">circa 90 minutes</td>
  </tr>
</table>

<!-- | Materials        | Tools                         | Needed Skills      | Time       |
|------------------|------------- ------------------|--------------------|------------|
| Data from GitHub | Computer with internet access | Basic PC knowledge | ca. 90 min | -->

------------------------------------------------

The first step to build up the hardware is **ordering a PCB**. Most of the Libre Solar components are too complex to be produced at home, so ordering the PCBs is essential. This guide shows how all necessary data are obtained for the Fab house.

## Download of Hardware Files

### 1. Clone or Download

It is not recommended to use the **Clone or download** button on GitHub, as it does not automatically download the library submodule. If you still want to use it or you don't have the command-line git available, you should also click the **library** folder on GitHub and download it manually to your already cloned project. Otherwise your schematics will not work and you will get lots of warnings.

### 2. Command Line

Use your favourite command line tool and type

```
git clone --recursive https://github.com/LibreSolar/MPPT-Charger_20A
```
in your desired directory.

After that, open the KiCad project file in KiCad.


## Bill of Materials

The **Bill of Materials (BOM)** lists all the parts of the PCB and is one of the most important documents for the manufacturing process.

In KiCad, the part properties like manufacturer, part number, etc. are defined inside the schematic editor.

**The Libre Solar schematics contain the following fields**:

* Reference
* Value
* Footprint
* Datasheet **(optional)**
* Manufacturer
* PartNumber
* Supplier **(optional)**
* OrderNumber **(optional)**
* Remarks **(optional)**

The **KiBoM** plugin by **SchrodingersGat** is recommended to use for CSV export. A guide of how to install and use it can be found in the [KiBoM github repository](https://github.com/SchrodingersGat/KiBoM).

A list of all parts can be exported using the BOM export features of KiCad Eeschema under **Tools > Generate Bill of Materials**. By default, there is no export plugin installed in KiCad.

## Distributors

Most distributors provide a BOM import feature so that the exported CSV file can be used directly to order the parts. Most important fields are **Manufacturer**, **PartNumber** and **Quantity**.
