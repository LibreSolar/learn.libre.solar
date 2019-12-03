# Parts

Last step to get all components for your PCB assembly is to order all resistors, capacitors, microcontrollers and so on.

## Bill of Materials

The Bill of Materials (BOM) lists all the parts of the PCB and is one of the most important documents for the manufacturing process.

In KiCad, the part properties like manufacturer, part number, etc. are defined inside the schematic editor. The Libre Solar schematics contain the following fields:

- Reference
- Value
- Footprint
- Datasheet (optional)
- Manufacturer
- PartNumber
- Supplier (optional)
- OrderNumber (optional)
- Remarks (optional)

A list of all parts can be exported using the BOM export features of KiCad Eeschema unter *Tools > Generate Bill of Materials*. By default, there is no export plugin installed in KiCad.

We recommend to use the KiBoM plugin by SchrodingersGat for CSV export. A guide how to install and use it can be found in the [KiBoM github repository](https://github.com/SchrodingersGat/KiBoM).

## Distributors

Most distributors provide a BOM import feature so that you can directly use the exported CSV file to order the parts. Most important fields are Manufacturer, PartNumber and Quantity.
