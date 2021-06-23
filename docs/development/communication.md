# Communication

In a simple PV setup, one device might be sufficient to handle the panels, battery charging and load switching. But with a growing system, more and more device are added, with specific tasks for which they are optimized. A [BMS](../system/bms.md) for each battery, a couple of [charge controllers](../system/charge_controller.md) and maybe even a database and a frontend to store and display settings and data series.

All these devices need to **communicate** with each other, with different requirements concerning speed, reliability or efficiency. For these networks of devices (IoT = Internet of Things), several technologies have been developed. Similar to the [OSI model](https://en.wikipedia.org/wiki/OSI_model), different layers have been identified, but in this document we speak of the **application layer** and the **lower layers** which roughly corresponds to the data model and the data transportation.

This chapter will give an overview of existing and popular protocols.

## Requirements

To be able to compare protocols, some specifications should be postulated. These are arbitrary based on the needs identified for Libre Solar devices and could be changed e.g. for automotive needs.

### Lower layers

1. **Reliability:** Packet loss, ordering of packets for multiframe messages etc. should be handled. The connection should be somewhat resistant to noise since devices like the charge-controller contain switching circuits and handle high currents.

2. **Masterless:** Bidirectional communication and broadcasting should be possible. Protocols like [I²C](https://de.wikipedia.org/wiki/I%C2%B2C) or [SPI](https://de.wikipedia.org/wiki/Serial_Peripheral_Interface), which are often used with Arduinos, are not suitable. They also have quite low maximum cable length.

3. **Speed:** To transmit larger amounts of logging data or even firmware updates, the speed should be considered.

### Application layer

1. **Schema-less:** The data structure should be discoverable and self-explaining. This means the client does not need to know the schema of the devices data, e.g. variable types and units should be delivered with the data, executable functions should can be identified etc.

2. **Flexible:** The protocol should be independent of those protocols used in lower layers. It is ok to assume data integrity completeness and correct order, which should be checked by lower layer protocols.

3. **Stateless:** Each request should be atomic regarding the information needed to process it. No session handling is done.

4. **Compact:** Overhead like headers or data representation should be compact. Especially with IoT, lower layer protocols and connections are not very powerful, so low data rates should be expected and addressed.

## Lower layers

### CAN

The Controller Area Network (CAN) was developed by the automotive industry to connect the different systems within a vehicle. It is a multimaster, electrical noise tolerant two wire bus system. The logical level on the bus is achieved with a differential approach, allowing for cable distances of more than 100m. Each end of the bus has to be terminated using a termination resistor [1]. Differential logic means that the voltage difference between the two wires indicate whether a "high" (logic 1) or "low" (logic 0) is written. In CAN, these states are called "recessive" and "dominant" respectively. The voltage difference depends on the used standard, in 5V systems it is usually around 2V.

The CAN Standard itself defines only the physical and data-link layer (layer 1 and 2 in OSI) with a maximum size of 8 bytes. In order to send larger messages, a protocol like [ISO 15765-2 - ISO-TP](https://en.wikipedia.org/wiki/ISO_15765-2) can be used.

CAN offers a transmission speed up to 5 Mbit/s, which greatly decreases the possible wire length. With a speed of 500 kbit/s, wires up to 100m can be used.

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

With the extended frame format, 18 additional bits are used for the ID field which can be used to split the ID into message priority and target and source address.

#### Arbitration

Since CAN is masterless, every node on the bus can start sending at any time. To detect collisions, the transceiver always compares its output to the input. If another device with a higher priority (lower ID) is sending at the same time, a difference between input and output will be detected and the lower priority device will retreat.

### UART

The Universal Asynchronous Receiver Transmitter is the most common serial communication used in MCUs. It has a receive (RX) and a transmit (TX) line, which are cross-connected between two devices. It allows only two connected devices and does not need any additional wiring, both microcontrollers should share the same ground and the same maximum voltage.

Since there are only two devices and separate wires for sending and receiving, no identification or arbitration is needed. UART does not implement any error checking, so higher layers need to check for data integrity.

### Bluetooth

Bluetooth (BT) is a widely used wireless connection protocol developed for medium-bandwidth, low range applications. For many application layer protocols, the Serial Port Profile (SPP) of the older Bluetooth standard is mostly suited as it simulates a serial interface and is therfore interchangeable with UART or USB. For the modern Bluetooth Low Energy, a custom profile has to be created as the SPP is no longer availabe.

### USB

The Universal Serial Bus uses differential logic levels with two wires, just like CAN. It is implemented as a primary/secondary topology, meaning a host device initiates and organizes communication to connected peripheral devices. Each devices has its own unique address and broadcasting is not possible. Since USB was developed for desktop use with high-bandwidth and low cable range, it is not widely used for MCU communication. It is however often used to connect a MCU with a PC via an USB-to-UART converter for programming and debugging. In this case, the same rules as for [UART](#UART) applies concerning error checking.

## Application layer

### ThingSet

The [ThingSet](https://libre.solar/thingset/) protocol (**set**tings of **thing**s) was developed by Libre Solar to provide a flexible, compact, stateless and schema-less method for communication. It is entirely Open Source and aims to mitigate the problems arising from proprietary alternatives as well as to deliver improved functionality.

With a human-readable text mode and the more compact binary mode it can easily be adapted to the capabilities of the underlaying lower layers. The used response status and request methods are mostly compatible with other standards like [CoAP](#CoAP) or [HTTP](#HTTP) and tries to follow the [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) principles.

For a full explanation, visit the [documentation pages](https://libre.solar/thingset/2a_general.html).

### MQTT

The Message Queuing Telemetry Transport (MQTT) protocol is mainly used for device-to-device communication in a publish/subscribe manner. It was designed for both a small code and bandwidth footprint required in restricted environments like IoT [3].

A Broker is used to manage all communication between the devices. It receives any published data and sends it to all subscribers. The data is organized in topics and a client can both subscribe and publish. Multiple devices can publish and subscribe to the same topic.

More detailed explanations and guides can be found [here](https://www.hivemq.com/mqtt-essentials/)

### CoAP

The Constrained Application Protocol is designed for restricted environments as an alternative or connection layer to [HTTP](#HTTP) [4]. It features a subset of HTTP request methods and return values and follows the same client/server pattern without publish/subscribe features. In contrast to MQTT, COAP relies on UDP connections and the entire frame cannot be larger than the UDP datagram (~64 KBytes). Therefor, sending or receiving larger amounts of data has to be handled by the application itself.

### HTTP

The Hypertext Transfer Protocol and the secured version HTTPS is the main standard in modern web applications. It features many request types, a sophisticated range of return values along with the possibility to define custom headers. HTTP follows the request/response scheme, so there is always a server and a client involved. The payload is sent as the "body", which can be of any type and the size is only limited by the client/server implementation.

Due to its complex functionalities and therefore increased overhead and code size, it is not very well suited for IoT applications.

HTTP does not implement error checking and relies on lower layer protocols to care for data integrity. Due to its complexity, overhead can be quite significant e.g. just the header section can be up to 1 KByte.

### Modbus

Modbus RTU and Modbus TCP are quite old, quasi-standard protocols to read and write registers of a device. Modbus requires knowledge of the accessible register addresses and the data format. A method to discover available settings and measurement values is not possible, so it does not fulfill the requirement to be self-describing.

### CANopen

CANopen is developed by CAN in Automation (CiA). This high level protocol uses CAN as physical layer and adds profile specifications, standardized communication protocol and advanced error handling to the core functionality of CAN. Despite the word "open" in the name, only the basic device profile specifications are open accessible. A paid CiA membership is necessary to access all specifications. Unfortunately, the EnergyBus profiles (CiA 454) for a CAN based energy management system are not provided with free access.

CiA DS301 specifies the basic communication functionalities of the CANopen application layer.

Every device (called CANopen node) must have an object dictionary (OD). This is a large table stored in the node which contains all kinds of data, including device parameters, measurement or control data. In addition to that, it stores also data necessary for communication e.g. which datatypes are used or how a message can be transported (broadcast, handshake, ..).

There are two different types of telegrams:

- Service Data Objects (SDOs): These are only used to access the OD. When a device receives an SDO it changes the values of parameters or other OD table entries. The communication is based on a Client/Server relationship. A client initiates an SDO communication, the server then changes its OD according to the client's instruction and sends a response. The client is typically a master device or an operator who supervises and configures the entire network.

- Process Data Objects (PDOs): The majority of messages in the bus contain process information like measurement data, control data, status data, etc. The data is read from the OD and transmitted as a PDO, which is basically a pure CAN telegram without protocol overhead. The CAN-identifier of a PDO telegram does not only contain the node-ID of a device (like this is the case in "pure CAN") but also what kind of content is delivered by the telegram.

The PDO telegrams are not predefined, but they are configured separately for each network. For each device, four Receive-PDOs (RPDOs) and four Transmit-PDOs (TPDOs) can be defined. For example, the actual current of the battery could be sent as a TPDO by the battery management system and an received as RPDO in a charge controller.

The connection channels between different devices for PDO exchange are defined using a PDO mapping procedure. This has the advantage that the process data exchange between different devices can be very flexible. However, it makes an initial network setup necessary. If a device is added to the network, it has to be shut down, some PDO mappings have to be defined and afterwards the network is put into operation mode again. This contradicts to the requirement of a plug-and-play capable energy system.

An intelligent master device implementing the network management (NMT) features could be used instead of manual configuration. But also a master device is not beneficial for a distributed, fail-safe energy system.

Summary of issues:

- Pre-defined frame layout defined in not completely open specification
- Complicated network setup (normally done using proprietary tools)
- Not intended for master-less operation
- Only 4 RPDOs and TPDOs possible per node ID for control functions

<h2>References</h2>

[1] Wikipedia contributors. (2021, June 20). CAN bus. In Wikipedia, The Free Encyclopedia. Retrieved 11:10, June 23, 2021, [Link](https://en.wikipedia.org/wiki/CAN_bus)

[2] CAN Bus Explained - A simple Intro (2021). Retrieved 11:43, June 23, 2021 [Link](https://www.csselectronics.com/screen/page/simple-intro-to-can-bus/language/en)

[3] MQQT Essentials - Introducing MQTT. Retrieved 15:27, June 23, 2021 [Link](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt/)

[4] RFC 7252. Constrained Application Protocol (CoAP). Retrieved 16:37, June 23, 2021 [Link](https://datatracker.ietf.org/doc/html/rfc7252)
