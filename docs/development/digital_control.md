# Digital control 

## Why we need to Control DC/DC converter?

The DC-DC converter inputs are unregulated DC voltage input (Vin) and the required outputs (Vout) should be a constant or fixed voltage (voltage regulation). A control system for the converter is needed to maintain the output voltage  of converter constant irrespective of variations in the DC source voltage (Vin) and the load variations.

There are many Analog and Digital control methods used for DC-DC converters which are further classified as Voltage-Mode and Current-Mode control techniques.

## Difference between Voltage Mode Control and Current Mode Control:

Voltage mode and Current mode are the two regulating scenario that can be used to control the output of the converter.

### Voltage Mode Control:

Converter's output voltage remains constant when the current is drawn from zero to full rated current of the converter. Voltage mode control is most basic method, in which the output voltage is sensed and returned through a feedback loop. The sensing of the voltage is easy and typically done using a resistive divider that scales the output voltage to a value which is read by an ADC or directly fed to Analog comparator. The actual output voltage is compared with respect to Reference output voltage and the difference (error) voltage is used to change the pulse width of the PWM signal to control the voltage across the inductor. The Controller design is relatively easier as only output voltage is being monitored and hence it requires only one feedback path.

### Current Mode Control:

Current-mode utilises the error between the desired and actual output voltages to control the peak current through the inductor.This mode has fast response compare to that of the voltage mode as the current in the inductor is controlled. Inductor current responds directly with changes in input and output voltages. This mode provides current limiting on a cycle by cycle basis. An advantage of current-mode control is that it eliminates the loop-gain variation with input voltage. First disadvantage of current-mode control, it requires two feedback paths which in turn increase complexity and cost of system. And also instability of the control loop carrying inductor current at duty cycles above 50% is major issue. Second disadvantage, an accurate sensing of current is difficult. For this purpose, very low resistor is placed in series with inductor and voltage drop across this resistor is an indication of the current. The voltage is of milli-volts hence requires amplification.

## Difference between Analog Controller and Digital Controller
### Analog Controller:




### Digital Controller:


## System Understanding
In order to design controller for any system, it is necessary to have knowledge about system behaviour. This is nothing but mathematical description of the relation among inputs to the process state variables, and output.

### Plant Modelling: 

Modelling of the Plant can be done using Average model or Discrete time Model.



