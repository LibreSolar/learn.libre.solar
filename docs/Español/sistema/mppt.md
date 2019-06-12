# MPPT

From previous OER:
The MPPT module is a solar charge controller. This feeds the electrical power from the solar panels (Note: not only solar panels can be used as a source, but also small wind turbines or bicycle generators) in the connected battery storage. A direct connection of solar panels to a battery would destroy the battery after a short time, since there is no monitoring of the voltages and currents and thus the operating regulations of the battery are not carry out. Therefore, a charge controller is absolutely necessary.
The special feature of a MPPT charge controller is the optimal power consumption of a solar module. This is realized by tracking the voltage / current characteristic. A detailed description of the MPPT function can be found in the following Wikipedia article - Maximum Power Point Tracking. The advantage of this method is the much higher efficiency of 95% to 99%. For comparison a simple charge controller without MPPT function, has an efficiency of about 70%.
The basic tasks of the Libre Solar MPPT Charge Controller are:
Preventing overloading by overvoltage
Preventing overcurrent by limiting the charging current
PV short circuit
PV reverse polarity
Battery reverse polarity (fuse is blown)
Stabilization of the output voltage at a voltage level
The built-in microcontroller allows the connection of different energy sources and energy storage devices by simple software adaptations.