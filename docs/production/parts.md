# Parts

Last step to get all components for your PCB assembly is to order all resistors, capacitors, microcontrollers and so on.

## Bill of Materials

The Bill of Materials (BOM) lists all the parts of the PCB and is one of the most important documents for the manufacturing process.

In KiCad, the part properties like manufacturer, part number, etc. are defined inside the schematic editor.

A typical BOM for Libre Solar hardware like the [MPPT 2420 HC](https://github.com/LibreSolar/mppt-2420-hc) contains the following fields:

- Component
- References
- Value
- Footprint
- Description
- Quantity Per PCB
- Manufacturer
- PartNumber
- Datasheet (optional)
- Remarks
- Supplier (optional)
- OrderNumber (optional)

A list of all parts can be exported using the BOM export features of KiCad Eeschema under *Tools > Generate Bill of Materials*. By default, there is no export plugin installed in KiCad.

We recommend to use the KiBoM plugin by SchrodingersGat for CSV export. A guide how to install and use it can be found in the [KiBoM github repository](https://github.com/SchrodingersGat/KiBoM).

## Distributors

Most distributors provide a BOM import feature so that you can directly use the exported CSV file to order the parts. Most important fields are Manufacturer, PartNumber and Quantity.
