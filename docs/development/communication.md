# Communication

In a simple PV setup, one device might be sufficient to handle the panels, battery charging and load switching. But with a growing system,
more and more device are added, with specific tasks for which they are optimized. A few [BMS](../system/bms.md) for the batteries, a couple of
[charge controllers](../system/charge_controller.md) and maybe even a database and a frontend to store and display settings and store data series.
All these devices need to **communicate** with each other, with different requirements concerning speed, reliability or efficiency. For these network of
devices (IoT = Internet of Things), several technologies have been developed. Similar to the [OSI model](https://en.wikipedia.org/wiki/OSI_model), different layers
have been identified, but in this document we speak of the **application layer** and the **lower layers** which roughly corresponds to the data model and the data transportation.
This chapter will give an overview of existing and popular protocols.

## Requirements

To be able to compare protocols, some specifications should be postulated. These are arbitrary based on the needs identified for Libre Solar devices and could be changed e.g. for automotive needs.

### Lower layers

1. **Reliability:** Paket loss, ordering of pakets for multiframe messages etc. should be handled. The connection should be somewhat resistant to noise since devices like the charge-controller use large conductances and high currents.

2. **Masterless:** Bidirectional communication and broadcasting should be possible. Protocols like [I²C](https://de.wikipedia.org/wiki/I%C2%B2C) or [SPI](https://de.wikipedia.org/wiki/Serial_Peripheral_Interface), which are often used with Arduinos, are not suitable. They also have quite low maximum cable length.

3. **Speed:** To transmit larger amounts of logging data or even firmware updates, the speed should be considered.

### Application layer

1. **Schema-less:** The data structure should be discoverable and self-explaining. This means the client does not need to know the schema of the devices data, e.g. variable types and units should be delivered with the data, executable functions should can be identified etc.

2. **Flexible:** The protocol should be independent of those protocols used in lower layers. It is ok to assume data integrity completeness and correct order, which should be checked by lower layer protocols.

3. **Stateless:** Each request should be atomic regarding the information needed to process it. No session handling is done.

4. **Compact:** Overhead like headers or data representation should be compact. Especially with IoT, lower layer protocols and connections are not very powerful, so low data rates should be expected and addressed.

## Lower layers

### CAN

The Controller Area Network (CAN) was developed by the automotive industry to connect the different systems within a vehicle. It is a multimaster, electrical noise tolerant two wire bus system. The logical level on the bus is achieved with a differential approach, allowing for cable distances of more than 100m. Each end of the bus has to be terminated using a termination resistor [1]. Differential logic means that the voltage difference between the two wires indicate wether a "high" (logic 1) or "low" (logic 0) is written. In CAN, these states are called "recessive" and "dominant" respectively. The voltage difference depends on the used standard, in 5V systems it is usualy around 2V.

The CAN Standard itself defines only the physical and data-link layer (layer 1 and 2 in OSI) with a maximum size of 8 bytes. In order to send larger messages, a protocol like [ISO 15765-2 - ISO-TP](https://en.wikipedia.org/wiki/ISO_15765-2) can be used.

CAN offers a transmission speed up to 5 MBits/s, which greatly decreases the possible wire length. With a speed of 500 KBits/s, wires up to 100m can be used.

#### Message Layout

There are two frame formats defined, the base frame format with 11 identifier bits and the extended frame format, using 29 bits for message identification [2].

The (simplified) base frame format:

| #Bits |  1  | 11 |  7  | 0 .. 64 |  16 |  2  |  7  |
|-------|:---:|:--:|:---:|:-------:|:---:|:---:|:---:|
|       | SOF | ID | CTL |   DATA  | CRC | ACK | EOF |

**SOF:** Start of frame <br />
**ID:** Unique Identifier which also determines the priority <br />
**CTL:** Control bits, including the length of data (0..8 bytes) <br />
**CRC:** Cyclic Redundancy Check, used to detect transmission errors <br />
**ACK:** Acknowledgment bits <br />
**EOF:** Bit sequence to signal the end of frame

With the extended frame format, there are additionaly 18 bits used for the ID field.

#### Arbitration

Since CAN is masterless, every node on the bus can start sending at any time. To detect collisions, the transceiver always compares its output to the input. If another device with a higher priority (lower ID) is sending at the same time, a difference between input and output will be detected and the lower priority device will retreat.

### UART

The Universal Asynchronous Receiver Transmitter is the most common serial communication used in MCUs. It has a receive (RX) and a transmit (TX) line, which are cross-connected between two devices. It allows only two connected devices and does not need any additional wiring, both micorcontrollers should share the same ground and the same maximum voltage.

Since there are only two devices and separate wires for sending and receiving, no identification or arbitration is needed. UART does not implement any error checking, so higher layers need to check for data integrity.

### Bluetooth

Bluetooth (BT) is a widely used wireless connection protocol developed for medium-bandwidth, low range applications. Different versions are available for low-energy, high-speed or basic needs. For many application layer protocols, the Serial Port Profile is mostly suited as it simulates a serial interface and is therfore interchangeable with UART or USB

### USB

The Universal Serial Bus  uses differential logic levels with 2 wires, just like CAN. It is implemented as a primary/secondary topology, meaning a host device initiates and organises communication to connected peripheric devices. Each devices has its own unique address and broadcasting is not possible. Since USB was developed for desktop use with high-bandwidth and low cable range, it is not widely used for MCU communication. It is however often used to connect a MCU with a PC via an USB-to-UART converter for programming and debugging. In this case, the same rules as for [UART](#UART) applies concerning error checking.

## Application layer

### ThingSet

### MQTT

### CoAP

### HTTP

### MODBus

### CANOpen

<h2>References</h2>

[1] Wikipedia contributors. (2021, June 20). CAN bus. In Wikipedia, The Free Encyclopedia. Retrieved 11:10, June 23, 2021, [Link](https://en.wikipedia.org/wiki/CAN_bus)

[2] CAN Bus Explained - A simple Intro (2021). Retrieved 11:43, June 23, 2021 [Link](https://www.csselectronics.com/screen/page/simple-intro-to-can-bus/language/en)
