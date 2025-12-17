---
title: Power Regulation 
description: The difference between linear and switching regulators, Digital Basics, MCU Basics, and Clock Basics  
---

# Power Regulation: Linear vs Switching

## Linear Regulators (LDO - Low Dropout)

**How they work:**
- Acts like a variable resistor that drops excess voltage as heat
- Input voltage → Series pass element (transistor) → Output voltage
- Feedback loop maintains constant output by adjusting resistance

**Key characteristics:**
- **Dropout voltage**: Minimum voltage difference needed (Vin - Vout). LDOs can operate with very low dropout (50-300mV)
- **Efficiency** = (Vout × Iout) / (Vin × Iin) = Vout/Vin (since Iin ≈ Iout)
- Power dissipated as heat = (Vin - Vout) × Iload

**Example:** 
- 12V input, 5V output at 500mA
- Efficiency = 5V/12V = 41.7%
- Power loss = (12V - 5V) × 0.5A = 3.5W of heat!

**Pros:**
- Simple, few external components
- Low noise (clean output)
- No switching frequency interference
- Fast transient response

**Cons:**
- Poor efficiency with large voltage drops
- Heat dissipation becomes a major issue
- Can't step up voltage (only step down)

**When to use:** Low current applications, noise-sensitive circuits (analog, RF), small voltage drops

---

## Switching Regulators (SMPS - Switched Mode Power Supply)

**How they work:**
- Rapidly switches power on/off (20kHz - 2MHz typical)
- Uses inductors/capacitors to store and transfer energy
- Three main types: Buck (step-down), Boost (step-up), Buck-Boost

**Buck converter example (step-down):**
1. Switch ON: Current flows through inductor, storing energy
2. Switch OFF: Inductor releases energy through diode to output
3. Output capacitor smooths the pulsed current

**Key characteristics:**
- **Efficiency**: 80-95% typical (much better than linear)
- Requires inductor, diodes/MOSFETs, capacitors
- Generates switching noise/ripple

**Pros:**
- High efficiency across wide voltage ranges
- Can step up, step down, or invert voltage
- Less heat generation
- Handles higher power levels

**Cons:**
- More complex circuit, more components
- Electromagnetic interference (EMI)
- Output ripple/noise
- More expensive

**When to use:** Battery-powered devices, high power applications, large voltage conversions, when efficiency matters

---

# Digital Basics

## Logic Levels

**Voltage thresholds that define digital states:**

For **5V TTL logic:**
- Logic HIGH (1): 2.0V to 5V (output typically 3.5-5V)
- Logic LOW (0): 0V to 0.8V (output typically 0-0.4V)
- Undefined zone: 0.8V to 2.0V (avoid!)

For **3.3V CMOS logic:**
- Logic HIGH: 2.0V to 3.3V (typically 70% of Vcc)
- Logic LOW: 0V to 0.8V (typically 30% of Vcc)

**Noise margins:**
- The buffer between guaranteed output levels and required input levels
- Protects against noise and voltage drops
- Larger margin = more robust design

**Level shifting:**
When interfacing 5V and 3.3V systems:
- 3.3V output → 5V input: Usually works (3.3V exceeds 2.0V HIGH threshold)
- 5V output → 3.3V input: **Dangerous!** Can damage 3.3V device
- Solutions: Level shifter ICs, voltage dividers, MOSFETs

---

## Pull-up and Pull-down Resistors

**The problem:** Floating inputs
- An unconnected digital input has undefined voltage
- Can oscillate between states, consume power, cause erratic behavior

**Pull-up resistor:**
```
Vcc (e.g., 5V)
    |
   [R] (4.7kΩ - 10kΩ typical)
    |
    +--- To MCU input pin
    |
  [Switch to GND]
```
- Default state: HIGH (pulled to Vcc)
- When switch closes: LOW (grounded)
- Resistor limits current when switch is closed

**Pull-down resistor:**
```
To MCU input pin ---+
                    |
                   [R]
                    |
                   GND
```
- Default state: LOW (pulled to GND)
- When switch connects to Vcc: HIGH

**Resistor value selection:**
- Too low (1kΩ): Wastes power, harder for switch to pull to opposite state
- Too high (100kΩ): Slow response, susceptible to noise
- Sweet spot: 4.7kΩ - 10kΩ for most applications
- I2C typically uses 4.7kΩ or lower for faster edges

**Internal pull-ups:**
- Most MCUs have built-in pull-ups (20kΩ - 50kΩ typical)
- Enable via software configuration
- Saves external components but weaker than external resistors

---

## Debouncing

**The problem:** Mechanical switches bounce
- When you press a button, contacts physically bounce
- Creates multiple pulses over 5-20ms instead of clean transition
- MCU reads this as multiple button presses

**Bounce example:**
```
Ideal:     _____|‾‾‾‾‾‾‾‾‾
Reality:   _____|‾|_|‾|_|‾‾‾  (multiple transitions)
```

**Hardware debouncing:**

1. **RC filter:**
```
Switch --- [R] ---+--- MCU input
                  |
                 [C]
                  |
                 GND
```
- Capacitor smooths voltage transitions
- Typical: 10kΩ + 100nF (1ms time constant)
- Trade-off: Slower response time

2. **SR Latch:** Uses two cross-coupled gates to create stable state

**Software debouncing:**

1. **Simple delay:**
```javascript
// Pseudocode
if (buttonPressed) {
    delay(20ms);  // Wait for bounce to settle
    if (buttonStillPressed) {
        // Valid press
    }
}
```

2. **State machine approach:**
```javascript
// Sample button every 10ms
if (currentReading != lastReading) {
    lastDebounceTime = now;
}
if ((now - lastDebounceTime) > debounceDelay) {
    buttonState = currentReading;
}
```

3. **Counter method:** Require multiple consistent readings before accepting change

**Best practice:** Combine both - small hardware RC filter + software debouncing for robust design

---

# MCU Power & Clock Basics

## Power Supply

**Voltage requirements:**
- Most modern MCUs: 3.3V (STM32, ESP32) or 1.8V core with 3.3V I/O
- Legacy: 5V (classic Arduino/ATmega)
- Check datasheet: Absolute maximum ratings, recommended operating range

**Decoupling capacitors:**
Critical for stable MCU operation:

```
Vcc ---+--- [100nF ceramic] --- MCU Vcc pin
       |
       +--- [10µF electrolytic] --- Near MCU
       |
      GND
```

**Why needed:**
- MCUs draw current in pulses (especially during clock edges)
- Power supply traces have inductance
- Without decoupling: voltage droops and spikes occur

**Placement rules:**
- 100nF ceramic: As close as possible to each Vcc pin (multiple per MCU)
- 10µF bulk: Near the MCU for larger current bursts
- Short traces to minimize inductance

**Power consumption modes:**
- **Active**: Full speed, all peripherals on (10-100mA)
- **Sleep**: CPU halted, peripherals may run (1-10mA)
- **Deep sleep**: Most systems off, RTC may run (10-100µA)
- **Shutdown**: Nearly everything off (<1µA)

---

## Clock Systems

**Why clocks matter:**
- Synchronize all digital operations
- Determine MCU speed (MHz)
- Affect power consumption
- Enable precise timing

**Clock sources:**

1. **External crystal oscillator:**
```
MCU XTAL1 ---[Crystal]--- XTAL2
         |              |
       [22pF]         [22pF]
         |              |
        GND            GND
```
- Most accurate (±10-50 ppm)
- Common: 8MHz, 16MHz, 32.768kHz (RTC)
- Requires load capacitors

2. **Internal RC oscillator:**
- Built into MCU
- Less accurate (±1-5%)
- No external components needed
- Temperature dependent

3. **External clock input:**
- Direct clock signal from another source
- Useful for synchronizing multiple MCUs

**Clock tree/PLL (Phase-Locked Loop):**
Most MCUs multiply/divide base clock:

```
External 8MHz crystal
    ↓
  [PLL] ×12
    ↓
96MHz internal
    ↓
  [Dividers]
    ├→ CPU: 96MHz
    ├→ Peripheral bus 1: 48MHz
    └→ Peripheral bus 2: 24MHz
```

**Clock configuration trade-offs:**
- Higher frequency = faster execution, more power
- Lower frequency = less power, slower execution
- Some peripherals need specific frequencies (USB requires precise 48MHz)

**Startup time:**
- Crystal oscillators: 1-10ms to stabilize
- RC oscillators: Microseconds
- MCU often starts on RC, switches to crystal after stabilization

**Clock security:**
- CSS (Clock Security System): Detects crystal failure
- Automatically switches to backup RC oscillator
- Critical for safety applications

---

These fundamentals form the foundation of embedded hardware design. The power regulation choice affects efficiency and heat, digital basics ensure reliable signal interpretation, and proper power/clock design determines MCU stability and performance.
