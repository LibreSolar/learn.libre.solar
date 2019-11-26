# Tools & Environment

The **Libre Solar project** is taken as an example for explanation. All the files are open source and can be found on [GitHub - LibreSolar](https://github.com/LibreSolar). There is a separate repository for each PCB and an additional repository for the software.

Some of the repositories contain git submodules, so please use
```
git clone --recursive <repository>
```
instead of the **download** button on github.

## Hardware design

Except for some old boards, all Libre Solar electronics hardware is built using the open source PCB design software [KiCad 5](http://kicad-pcb.org/).

As KiCad version 5 contains lots of interesting new features (better rendering, rounded pads, STEP export and better symbol file format), the Libre Solar PCBs were recently converted to this version. Unfortunately, the files are not compatible with the older KiCad version 4 anymore. Please download the nightly builds or the stable KiCad version 5 as soon as it is released.

**Custom footprints and symbols are saved in separate repositories**:

* [https://github.com/LibreSolar/KiCad-footprints](https://github.com/LibreSolar/KiCad-footprints)
* [https://github.com/LibreSolar/KiCad-symbols](https://github.com/LibreSolar/KiCad-symbols)

The footprint library is directly included via the github import feature in KiCad. This feature does not exist for the schematics editor, so the schematic symbols are included via a git submodule.

## Software development

The firmware for the Libre Solar hardware is developed using the [ARM mbed OS](https://developer.mbed.org/) embedded software framework. This makes it possible to use easy-to-understand C++ syntax (similar to Arduino) and enhances community based software development.

**Using Visual Studio Code and [PlatformIO](http://platformio.org/) as an IDE for software development is recommended**.

All Libre Solar software repositories are structured as PlatformIO projects:

```
|--lib/
|  |--Foo
|  |  |- Foo.cpp
|  |  |- Foo.h
|  |--Bar
|  |  |- Bar.cpp
|  |  |- Bar.h
|--src/
|  |- config.h
|  |- main.cpp
|- platformio.ini
|- README.md
|- LICENSE
```

The main firmware is located in the `src` folder, external libraries or reuseable code are stored under `lib`.

The platformio.ini file contains some important settings which might have to be adjusted:

```ini
[env:nucleo]
platform = ststm32
framework = mbed
board = nucleo_f072rb
upload_protocol = stlink

# Settings:
# - enable float formatting for printf, adding approx. 7 kB of bin file size
# - C++11 to be able to define default values for struct members
# - Use low speed internal clock (LSI) for RTC (no LSE crystal on PCB)
build_flags =
    -Wl,-u_printf_float
    -std=c++11
    -DMBED_CONF_TARGET_LSE_AVAILABLE=0

# Custom Serial Monitor port
# monitor_port = /dev/ttyUSB1

# Custom Serial Monitor baud rate
monitor_baud = 115200
```
