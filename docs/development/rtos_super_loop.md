# RTOS vs. Super Loop

A real-time operating system (RTOS) provides functions like multithreading, inter-process communication and memory handling to embedded applications.

As the name suggests, such an operating system includes a scheduler to ensure deterministic timing of critical tasks. However, this is often not the key reason for choosing an RTOS over a bare-metal approach to firmware development. The ability to run different tasks in parallel allows to write applications in a completely different way. If the firmware can be split into multiple tasks, it can be structured in a more modular way, which is especially helpful for complex projects with higher-level communication interfaces.

In contrast to an RTOS approach, firmware can also be developed using a super loop architecture. This is the more traditional and sometimes more easy to understand way of embedded firmware development.

The following sections will explain the differences between both approaches and give an overview of pros and cons to help with the decision for or against an RTOS.

## Super Loop architecture

The super loop architecture uses one central infinite loop, which coordinates the actions in the firmware. Often it handles the following sequence of tasks:

1. Read inputs
2. Process information (e.g. state machine)
3. Output results
4. Delay until next loop execution

If tasks run with different time intervals, the super loop has to take care which function should be called in which run of the loop.

A super loop design can also work in an event-driven way through interrupts. The interrupt service routines (ISRs) provide a simple way of multi-tasking because they interrupt the execution of the main loop. However, ISRs always have to be very short and don't allow to wait e.g. for slow communication interfaces, as this would block the execution of the main loop.


### Code example

For further explanations of the concepts, a simple temperature warning application programmed in Arduino syntax is used. It implements the following tasks:

- Get a temperature measurement once per second
- If the temperature is above 30°C, a warning LED should start blinking with 500 ms on-time
- Once the temperature is below 30°C again, the LED should stop blinking

```C
// variables to store states
static int ledState = 0;
static bool tempAlarm = false;
static int loopCounter = 0;

void setup()
{
    // ... (some initializations)
}

void loop()
{
    // temperature measurements (every second)
    if (loopCounter % 2 == 0) {
        if (getTemperature() > 30.0) {
            tempAlarm = true;
            ledState = 1;       // start blinking with on state
        }
        else {
            tempAlarm = false;
        }
    }

    // LED handling (every call, 500 ms interval)
    if (tempAlarm) {
        digitalWrite(ledPin, ledState);
        ledState = !ledState;   // change state for next call
    }
    else {
        digitalWrite(ledPin, 0);
    }

    loopCounter++;
    delay(500);     // minimum interval of all tasks
}
```

As we can see, the the super loop handles two different tasks. First it reads the temperature measurements and afterwards it blinks the LEDs depending on the results of the temperature processing.

The timing of the different tasks is shown in Fig. 1. For simplicity reasons, the program uses a constant 500 ms delay between each loop, which would introduce a small drift in the intervals because the processing for the calculations is added to the interval. In reality, these simple calculations take a negligible amount of time, so they are ignored here and the figure shows the time durations in an exaggerated way.

<fig-caption src="development/tasks-super-loop.svg" caption="Tasks in a super loop architecture" num="1" />

As the blinking task needs to be run more often, we need some variables to store the current state of the system. In a more complex system, a state machine could be used for this task instead of using just a simple boolean variable.

## Multiple threads

Now we look at the same example as above, but built using an RTOS.

Instead of storing the different states for each new execution of the super loop, we separate each task into a dedicated thread. In this way, one thread can just wait for a signal from another thread and the different states don't need to be stored anymore.

The following code example uses the Zephyr RTOS API for demonstration.

```C
static struct k_poll_signal temp_alarm;

int main()
{
    // ... (some initializations)

    while (true) {
        // handle temperature measurements in main thread
        if (get_temperature() > 30.0) {
            // trigger alarm to start blinking in LED thread
            k_poll_signal_raise(&temp_alarm, 1);
        }
        else {
            k_poll_signal_reset(&temp_alarm);
        }
        k_sleep(K_SEC(1));
    }
}

void led_thread()
{
    // ... (initialization: assign temp_alarm to an events array)

    while (true) {
        // wait here if no event (i.e. temp_alarm) is active
        k_poll(events, 1, K_FOREVER);

        // blink LED
        gpio_pin_set(led_dev, led_pin, 1);
        k_sleep(K_MSEC(500));
        gpio_pin_set(led_dev, led_pin, 0);
        k_sleep(K_MSEC(500));
    }
}

// create LED thread with priority 1 and start it immediately
K_THREAD_DEFINE(led_tid, 1024, led_thread, NULL, NULL, NULL, 1, 0, 0);
```

Now there are two infinite loops, one in each thread. Both threads communicate via the signal `temp_alarm`. If the signal is not active, the LED thread intentionally gets stuck in the `k_poll` call. Only when the signal was raised from the main thread, the `k_poll` call returns immediately and the LEDs start blinking.

The timing diagram in Fig. 2 shows the two independent threads. However, because the MCU cannot actually handle two things in parallel, the scheduler prioritizes the main thread over the blinking thread. Thus, the final outcome of the multithreaded design is exactly the same as in the super loop in this case.

<fig-caption src="development/tasks-multithreading.svg" caption="Tasks in a multithreaded architecture" num="2" />

## Advantages and disadvantages

There is no general rule when an RTOS should be used and when not. Even very complex projects can be accomplished with a super loop architecture and carefully chosen interrupts. And also super loops can be real-time capable.

That being said, an RTOS can make life easier in the following situations:

- If there are multiple slow tasks that need to run in parallel (like different communication interfaces) a state machine to keep track of each task can get very complicated. Dedicated tasks with a scheduler make the implementation more straight-forward.
- Higher-level communication like IP networking and Bluetooth will almost certainly require an RTOS environment.
- You might also be interested in the package that comes with an RTOS, e.g. the drivers.

Under the following circumstances, a super loop can be the better solution:

- If the firmware needs to run on very constrained hardware, the overhead of an RTOS can be too much. Especially the amount of RAM can be critical, as each RTOS thread requires its own stack space, which increases overall memory consumption.
- For short high-priority tasks that need to interrupt a slow main loop, a simple multitasking using ISRs can be sufficient and easier to maintain.
