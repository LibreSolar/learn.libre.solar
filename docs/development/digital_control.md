# Digital control

This chapter will explain the differences between analog and digital control and give an introduction into digital control techniques for DC/DC converters.

Even though this chapter covers DC/DC converters in detail, the methods can be applied to other control systems aswell.

## Analog vs. digital control

As a recap, we start with the general control loop (Fig. 1) as found in many textbooks.

<fig-caption src="development/control-loop.svg" caption="General control loop" num="1" />

The system we want to control is the plant. It has an **output signal** $y(t)$ which should be maintained at a defined **set-point** $r(t)$. The deviation between the actual value and the set-point is the **control error** $e(t)$, which gets fed into the controller. Finally, the controller generates an **input signal** $u(t)$ to the plant, which changes its operation and thus, its output signal that we want to control.

In electronics, the plant usually contains some active components like transistors, which can be controlled by a voltage or a current input.

### Analog control

As an example for a simple analog control circuit a voltage-controlled current sink as shown in Fig. 2 is used.

<fig-caption src="development/analog-current-control.svg" caption="Analog, voltage-controlled current sink" num="2" />

The circuit generates a current $i_{out}$ through the measurement resistor $R_{shunt}$ that is proportional to the set-point voltage $v_{ref}$:

$$ i_{out} = \frac{v_{ref}}{R_{shunt}} $$

In order to achieve this, an operational amplifier is used as a controller. It generates an input voltage for the transistor $Q_1$ that makes it conduct exactly the amount of current that is necessary to make $v_{out}$ and $v_{ref}$ become equal (i.e. the control error gets zero).

Even though the relationship of input voltage to output current through the transistor is highly non-linear, the voltage will be set correctly. This is only possible because we feed back the measured output voltage into the negative input of the operational amplifier.

### Digital control

A similar result as with above analog controller can be achieved with a digital circuit based on a microcontroller instead of an operational amplifier, as shown in Fig. 3.

<fig-caption src="development/digital-current-control.svg" caption="Digitally controlled current sink" num="3" />

In this case, the output voltage is measured by an analog-to-digital converter (ADC), so that it can be used for calculations inside the microcontroller. The set-point could either be measured as a voltage by the ADC as well or it can be defined by any other sort of input signal to the microcontroller, e.g. a communication interface.

After the error between set-point and measurement has been calculated, it gets fed into the digital controller. In the figure, the commonly used proportional-integral-derivative (PID) controller is shown, but it could be any other control algorithm.

Finally, the calculated output signal of the controller has to be converted back into an analog signal as the input to the plant. This can be done by a digital-to-analog converter (DAC), as shown in the picture.

### Comparison

Some of the main advantages of a digital controllers are:

- Control algorithms are more flexible.
- Nonlinearities in the plant can be compensated (e.g. using lookup tables).
- The set-point can be defined arbitrarily.

However, there are also some drawbacks:

- Analog controllers can be much faster as they have less steps involved which introduce delays (no conversions between analog and digital and no calculations necessary).
- Depending on the required control frequency, digital control might require expensive hardware to achieve fast conversions and calculations with minimum delays.
- The resolution of digital controllers is always limited, whereas analog controllers allow continuous (not step-wise) changes of signals.

The following sections will go through the different steps to set up a control system for a DC/DC converter.

## State space representation

A general [linear time-invariant system](https://en.wikipedia.org/wiki/Linear_time-invariant_system) (LTI system) can be expressed using the following equations, called the state-space representation:

$$ \dot{x}(t) = A x(t) + B u(t) $$

$$ y(t) = C x(t) + D u(t) $$

Many real-world problems can be described using an LTI system. It contains the state vector $x(t)$, the input vector $u(t)$ and the output vector $y(t)$. The matrices describe the relations between those vectors.

For further general explanations, the [Wikipedia page](https://en.wikipedia.org/wiki/State-space_representation) on this topic is recommended. Here we will continue with the specific equations for DC/DC converters.

The overall system of a digitally controlled synchronous buck converter including plant model and digital controller is shown in Fig. 4.

<fig-caption src="development/dcdc-schematic-buck.svg" caption="Buck converter" num="4" />

In the DC/DC converter, the state of the system is defined by the energy storage elements in the circut, the inductor and the output capacitor. Hence, the state vector $x$ consists of the inductor current $i_L$ and the capacitor voltage $v_C$:

$$ x = \begin{pmatrix} i_L \\ v_C \end{pmatrix} $$

The input to the system (i.e. the given external variables) are the output current $i_o$, which is defined by the load, and the converter input voltage $v_g$. These two parameters define the input vector:

$$ u = \begin{pmatrix} i_o \\ v_g \end{pmatrix} $$

In theory, also the duty cycle would be an input to the system. However, as it defines a relationship between input voltage and output voltage and in this way also influences the output current, it would make the system nonlinear. In order to analyze the system behavior depending on the duty cycle, it has to be linearized using a small-signal perturbation model (see below).

The output vector of the system can be defined almost arbitrarily, depending on which variables are of interest. In the real system we want to control the inductor current (which is also a state variable) and the output voltage. So we choose the following output vector:

$$ y = \begin{pmatrix} i_L \\ v_{o} \end{pmatrix} $$

Now that the general layout of an LTI system is explained, we can populate the matrices for the actual system.

## Continuous time model

Switching converters have at least two alternating system states. For the above synchronous buck converter, the first state is when the high-side MOSFET is on and the low-side MOSFET is off. In the second state, the on-states of the MOSFETs are inverted.

The transition between those states introduces a discontinuity into the system, which would be difficult to model in a control system. However, if the transition time between the two phases can be neglected for the control system analysis, an averaged system model can be derived.

This method is called State Space Averaging (SSA) and was first developed by Middlebrook et al. [1].

The idea is to calculate the system behavior for the individual states 1 and 2 and average them using the duty cycle, which describes the percentage of the time when state 1 is active (i.e. the on-time of the high-side MOSFET).

### High-side MOSFET on

Using Kirchhoff's circuit laws, we can obtain the following differential equations during the on-state of the high-side MOSFET:

$$
\frac{di_L}{dt} L = v_g - \left( R_{hs} + R_{dson} + R_L + R_C \right) i_L - v_C + R_C \cdot i_o
$$

$$
\frac{dv_C}{dt} C_{ls} = i_L - i_o
$$

$$
v_o = R_C \cdot C_{ls} \frac{dv_C}{dt} + v_C = R_C \cdot i_L + v_C - R_C \cdot i_o
$$

These equations can be transformed to get the missing matrices for the previously defined state space representation:

$$
A_1 = \begin{pmatrix}
    -\left( R_{hs} + R_{dson} + R_L + R_C \right) \frac{1}{L} & -\frac{1}{L} \\
    \frac{1}{C_{ls}} & 0
\end{pmatrix}
$$

$$
B_1 = \begin{pmatrix}
    \frac{R_C}{L} & \frac{1}{L} \\
    -\frac{1}{C_{ls}} & 0
\end{pmatrix}
$$

$$
C_1 = \begin{pmatrix}
    1 & 0 \\
    R_C & 1
\end{pmatrix}
$$

$$
D_1 = \begin{pmatrix}
    0 & 0 \\
    -R_C & 0
\end{pmatrix}
$$

### High-side MOSFET off

Similarly, we get the differential equations for the high-side MOSFET off-state and low-side MOSFET on-state:

$$
\frac{di_L}{dt} L = - \left( R_{ds(on)} + R_{L} + R_C \right) i_L - v_C + R_C \cdot i_o
$$

$$
\frac{dv_C}{dt} C_{ls} = i_L - i_o
$$

$$
v_o = R_C \cdot C_{ls} \frac{dv_C}{dt} + v_C = R_C \cdot i_L + v_C - R_C \cdot i_o
$$

In matrix form, the state space representation can be written as:

$$
A_2 = \begin{pmatrix}
    -\left( R_{dson} + R_L + R_C \right) \frac{1}{L} & -\frac{1}{L} \\
    \frac{1}{C_{ls}} & 0
\end{pmatrix}
$$

$$
B_2 = \begin{pmatrix}
    \frac{R_C}{L} & 0 \\
    -\frac{1}{C_{ls}} & 0
\end{pmatrix}
$$

$$ C_2 = C_1 $$

$$ D_2 = D_1 $$

### State-space average model

For the final averaged model, the overall matrices are weighted using the duty cycle $d$:

$$ A = A_1 \cdot d + A_2 \cdot (1 - d) $$
$$ B = B_1 \cdot d + B_2 \cdot (1 - d) $$
$$ C = C_1 \cdot d + C_2 \cdot (1 - d) $$
$$ D = D_1 \cdot d + D_2 \cdot (1 - d) $$

For an analysis of the system behaviour depending on the duty cycle, a small-signal perturbation method as described in [1] has to be used. Other transfer functions like the input voltage to output voltage behavior can be calculated with above model.

## Discrete time model

A digital controller does not run continuously, but at a fixed frequency. In each interval, a new measurement sample is taken, the new control output value is calculated and the output is fed back into the plant (here: the DC/DC power stage).

In order to simulate this behavior, the above continuous-time model has to be converted (discretized) into a discrete-time model that allows to calculate the output of the system in step $k+1$ based on the current state of the system in step $k$. Below equations describe the discretized system behavior:

$$ x[k+1] = A_d x[k] + B_d u[k] $$

$$ y[k] = C_d x[k] + D_d u[k] $$

The new matrices for the discretized model (suffix $d$) can be calculated by hand, but it's typically done with software tools like Matlab or Octave. Most commonly, the [zero-order hold (ZOH)](https://en.wikipedia.org/wiki/Zero-order_hold) method is used for this.

The discretized model can be analyzed with similar methods as the continuous-time model, like e.g. Bode plots. The effect of the discretization becomes visible mostly at higher frequencies, where the period of the signal gets close to the discretization period (step size).

## Digital controller

The discrete-time model can now be used to model a suitable controller for the system.

Fig. 5 shows the overall layout of a digitally controlled DC/DC converter with two control loops. The inner current loop implements protection features against overcurrent in the inductor. It gets its setpoints from the outer voltage loop, which controls the output voltage to its desired set-point.

<fig-caption src="development/control-block-diagram.svg" caption="DC/DC converter control block diagram" num="5" />

All discrete-time signals are marked with square brackets, continuous-time (analog) signals are marked with rounded brackets.

When transferring a discrete-time model into an actual implementation in a microcontroller, we have to deal with further challenges like:

- Limited resolution of the ADC, the generated PWM and the calculation in between
- Windup protection, as actuators can saturate

Such implementation-specific issues cannot be easily simulated with control system analysis tools like Octave. Instead, a co-simulation with C code and spice circuit models (see [here](https://www.isotel.eu/mixedsim/embedded/motorforce/index.html)) can be used. However, these models run quite slow and are therefore more suited for final validation of the code and the control parameters.

For the actual implementation in C code, also the resolution of variables needs to be considered, as they define minimum possible steps in input and output signals. For fast signal processing even on microcontrollers without a floating-point unit (FPU), calculations are usually done with fixed-point math using the [Q number format](https://en.wikipedia.org/wiki/Q_(number_format)).

Below source code gives an example of an implemenation of a PID controller, based on the [ARM CMSIS DSP library](http://www.keil.com/pack/doc/CMSIS/DSP/html/group__PID.html). For simplicity reasons it is implemented using floating-point numbers.


```C
/* Instance structure for PID controller */
struct PidController
{
    float Kp;       /* Proportional gain */
    float Ki;       /* Integral gain */
    float Kd;       /* Derivative gain */

    float A0;       /* Derived gain: A0 = Kp + Ki + Kd */
    float A1;       /* Derived gain: A1 = -Kp - 2Kd */
    float A2;       /* Derived gain, A2 = Kd */

    /* state[0] = e[k-1] */
    /* state[1] = e[k-2] */
    /* state[2] = u[k-1] */
    int32_t state[3];
};

/**
 * Resets the state variables and initializes the integrator to ensure good
 * startup of the controller
 */
static inline void pid_reset(PidController *pid, float initial_output)
{
    pid->state[0] = 0;
    pid->state[1] = 0;
    pid->state[2] = initial_output;
}

/**
 * Process function of PID controller
 *
 * \param in Input of the PID controller (target - actual value)
 * \returns Processed output sample
 */
static inline float pid_process(struct PidController *pid, float in)
{
    /* u[n] = u[n-1] + A0 * e[n] + A1 * e[n-1] + A2 * e[n-2]  */
    float out = pid->state[2] + pid->A0 * in +
        pid->A1 * pid->state[0] + pid->A2 * pid->state[1];

    /* update state for next run */
    pid->state[1] = pid->state[0];
    pid->state[0] = in;
    pid->state[2] = out;

    return out;
}
```

The variables `A0`, `A1` and `A2` are pre-calculated based on the PID controller constants `Kp`, `Ki`, `Kd` and `Ts` determined by simulation and testing. In each run of the control loop, only the pre-calculated values are used to minimize calculation effort.

<h2>References</h2>

[1] R. D. Middlebrook, Slobodan Cuk: A general unified approach to modeling switching converter power stages. 1976 IEEE Power Electronics Specialists Conference. [Link to PDF](https://authors.library.caltech.edu/98810/1/07072895.pdf)
