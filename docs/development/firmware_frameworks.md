---
title: Frameworks
---

# Firmware Development Frameworks

If you want to build your embedded application, you need a couple of tools to finish your task efficiently. One important aspect is the firmware framework, which provides you with everything you need to get started.

In order to not re-invent the wheel, a firmware framework usually contains libraries (e.g. drivers to access the hardware) and the necessary tools to build and flash the firmware.

A very popular framework is Arduino, which comes with an entire ecosystem of boards, firmware libraries and a simple editor.

This chapter gives an overview of the different aspects that need to be considered when selecting a firmware development framework.

## Hardware abstraction and drivers

If the same firmware should work on different microcontrollers, it makes sense to use a hardware abstraction layer (HAL) between the application code and the lower-level code directly accessing the registers of the MCU.

An example of such an abstraction is the `Serial.write()` in Arduino firmware, which works the same way no matter if your board is based on an AVR 8-bit microcontroller or a 32-bit ESP8266.

There are different degrees of abstraction. Chip vendors usually provide libraries (vendor HALs) which allow to reuse the code if you switch between chip families. In case of an RTOS that should work for chips of different vendors, the RTOS may provide another unified driver API layer on top of the vendor HALs.

Peripheral drivers with a common API across different vendors and chips can only provide the common denominator of functions. If some specific features of one chip need to be used, the driver may have to be bypassed and the lower-level functions of the chip have to be accessed directly.

## Real-time operating systems

For more complex embedded projects with many different tasks that have to be handled in parallel, higher-level features like multithreading can be helpful.

These features are provided by a real-time operating system (RTOS), which might be independent of the drivers or come as an entire package with build system and drivers (as e.g. in the case of Zephyr RTOS).

A typical firmware architecture with an RTOS kernel and supporting layers are shown in Figure 1.

<fig-caption src="development/rtos-architecture.svg" caption="Firmware architecture with RTOS kernel" num="1" />

The features of an RTOS are further explained in [a dedicated chapter](rtos_super_loop).

## Overview

For the Libre Solar project, we used [Arduino](https://www.arduino.cc/) and [ARM Mbed OS](https://os.mbed.com/) in the past. However, the code for the charge controller and the battery management system was recently ported to [Zephyr RTOS](https://www.zephyrproject.org/).

The main reasons for the selection of Zephyr RTOS:

- Excellent build system and customization (based on Devicetree and Kconfig from Linux kernel) that allows a clear separation between board specification and the firmware itself.
- Fast integration of new microcontroller support (e.g. the STM32G4 series, which is used in the new charge controllers).
- Great community and open governance, so it’s a truly community-driven open source project.
- Strong focus on code quality and safety (aiming towards ISO 26262 and IEC 61508 certification).

The following table gives an overview of different frameworks including the aspects that were considered important for the Libre Solar project:

Criterion             | [Arduino](https://www.arduino.cc/) | [ARM Mbed OS](https://os.mbed.com/)| [Zephyr RTOS](https://www.zephyrproject.org/)| [RIOT](http://riot-os.org/)   | [FreeRTOS](https://freertos.org/)  |
----------------------|---------|-----------|----------|--------|-----------|
License               | LGPL    | Apache 2  | Apache 2 | LGPL   | MIT       |
Integrated HAL        | yes     | yes       | yes      | yes    | no        |
Integrated RTOS       | no      | yes       | yes      | yes    | yes       |
Core language         | C++     | C++       | C        | C      | C         |
Supported platforms   | many    | only ARM  | many     | many   | many      |
Custom board support  | medium  | medium [1]| good     | good   | good      |
Target users          | makers  | both [2]  | both     | both   | industry  |
Ease of use [3]       | good    | good      | good     | medium | medium    |

The table was filled out to the best of our knowledge and might be subjective in some aspects. If you disagree or find errors, suggest improvements using the edit link below.

**Remarks:**

1. Custom boards can be added, but you need to patch the targets.json file of the original repository. The entire framework does not differentiate between MCU definitions and board definitions. Instead, everything is gathered in one "targets" folder. So you can't simply define different pin settings for an already supported MCU.
2. Based on how custom boards are supported, one could argue that the main focus is makers only.
3. Judged good if PlatformIO available.

There are some popular frameworks not taken into consideration for the following reasons:

- ChibiOS supports only STM32 microcontrollers. In addition to that, it is developed in the [cathedral style](https://en.wikipedia.org/wiki/The_Cathedral_and_the_Bazaar), which is not considered ideal for a community-driven open source project.
- LibOpenCM3 is only a HAL library and does not provide RTOS features.
