---
title: How to pick an MCU?
description: How to pick an MCU for your project?
---
Nice — here’s a practical, engineer-friendly **step-by-step process** you can use every time you need to pick an MCU. I’ll give you a checklist, decision matrix, a sample scoring table, and concrete recommendations for typical project types so you can apply it immediately.

# 1) Start with the product definition (must do first)

Write a 2–4 line **product statement**: purpose, main features, constraints.
Example: “Battery-powered BLE sensor that logs temperature, sends data every 10 min, runs 1 year on AA, cost target <$5 BOM.”

# 2) Extract hard requirements (must-have)

These are deal-breakers. List them clearly.

* Interfaces: USB? CAN? Ethernet? I²C/SPI/UART counts.
* Wireless: WiFi / BLE / Zigbee / LoRa? On-chip required?
* Real-time: hard RT deadline? Control loops? PWM count?
* Memory: code size estimate, RAM for buffers, filesystem?
* Performance: required MIPS, DSP, FPU?
* Power: battery life, sleep currents, wake frequency.
* Safety & security: hardware crypto, secure boot, certifications (e.g., IEC/ISO).
* Package constraints: pins, LGA/TSSOP, board area.
* Cost & availability: target unit price, expected volumes.
* Temperature/environment: operating range, vibration.
* Development timeline: need rapid prototyping or production-grade support?

# 3) Derive soft requirements (nice-to-have)

* Development ecosystem: Arduino/PlatformIO/STM32Cube?
* Debug/trace: SWD, JTAG, ETM?
* Community & libraries: existing stacks for sensors/mesh/cloud.
* Longevity & sourcing: part lifecycle, alternative parts.
* Certification readiness: pre-cert for RF stacks (Matter, BLE stacks).

# 4) Create a shortlist of candidate families

Pick 3–6 MCUs/families that plausibly match (e.g., STM32L4, nRF52840, ESP32-C6, PIC32). Include one conservative (industrial), one cheap, one “sweet spot”.

# 5) Score candidates with a simple matrix

Make a table with rows = candidates, columns = key attributes from steps 2–3. Score 0–5 (0 worst, 5 best). Weight columns by importance (hard requirements = heavy weight).

Example columns: Interfaces (20%), Wireless (20%), Flash/RAM (15%), Power (15%), Cost (10%), Ecosystem (10%), Availability (10%).

Sum weighted scores → rank.

# 6) Prototype on dev boards (don’t skip)

Pick top 1–2 and prototype key flows:

* Boot & bring up peripherals you need (USB, BLE, ADC sampling).
* Test power modes and measure real currents (measure actual sleep and active consumption).
* Compile your firmware and check memory use and performance headroom.
* Check toolchain pain points (IDE quirks, driver stability).

Practical tip: measure power with a proper meter (uCurrent, Keysight, or shunt + ADC) — datasheet numbers often differ.

# 7) Evaluate non-technical constraints

* Part cost and BOM at target volume (request quotes).
* Lead times and multiple suppliers / package options.
* Regulatory impact (if RF: pre-cert modules vs chip + module).
* Software licensing (RTOS, stacks).
* Security features and whether you need secure element.

# 8) Design-for-manufacturing & production checks

* Pick package that PCB assembly house supports.
* Check reflow profile, ESD, and assembly notes.
* Ensure debugging/access pins are accessible on production board (or SW disable).
* Plan test fixtures for production programming & boundary testing.

# 9) Final validation checklist (before committing)

* All required peripherals proven on prototype.
* Power budget validated with real usage profile.
* Code fits with comfortable margin (flash & RAM).
* OTA, bootloader, secure boot behavior tested (if needed).
* Supply chain: at least two approved substitutes or long-lifecycle parts.
* Tooling & test plan ready.

# 10) Implementation & lifecycle considerations

* Implement bootloader and OTA early if product needs updates.
* Use hardware crypto / secure boot from day one if user data / payments involved.
* Freeze pinout only after prototype validation and DFM review.
* Track part obsolescence and have a migration plan.

---

# Quick checklists you can copy

## Minimal spec capture (one-pager)

1. Product statement
2. Main MCU hard reqs (interfaces, wireless, memory, power, temp)
3. Target unit cost & volume
4. Preferred vendor / ecosystem
5. Prototype board chosen

## Prototype test cases

* Peripheral bring-up (GPIO, UART, I²C, SPI, ADC, PWM)
* Wireless link & throughput (if applicable)
* Sleep → wake latency & sleep current measurement
* Worst-case CPU load & memory watermark
* Bootloader + DFU/OTA flow test

---

# Example: How this process looks for three product types

1. Battery BLE sensor (low power, cheap)

* Hard reqs: BLE built-in, <10 µA deep sleep, 1 KB data buffer, small flash, low cost.
* Shortlist: nRF52810/52832/52840, STM32WB (if need Zigbee), Dialog/Silicon Labs.
* Prototype: nRF52832 dev board — measure sleep, BLE reconnection, sensor polling.

2. Motor controller (real-time PWM, ADCs)

* Hard reqs: multiple timers, fast ADC, FPU/DSP if advanced control, CAN for network.
* Shortlist: STM32G4/H7, TI C2000, Infineon XMC.
* Prototype: dev board with control HW + run closed-loop and measure jitter.

3. WiFi camera/edge device

* Hard reqs: WiFi, lots of RAM, camera interface, RTOS, decent CPU.
* Shortlist: ESP32-S3, Ambarella, NXP i.MX RT + camera module.
* Prototype: ESP32-S3 dev board with camera; test streaming, memory, heat.

---

# Decision heuristics (rules of thumb)

* If you need WiFi or cloud connectivity quickly → **ESP32 or SoC with integrated WiFi**.
* If you need ultra low power BLE → **Nordic nRF5x / nRF52 / nRF53 or STM32WB**.
* If you need real-time motor control → **STM32G4 / TI C2000 / Infineon XMC**.
* If you want easiest hobbyist ramp → **AVR / RP2040 / STM32 with Arduino cores**.
* If you need high volume lowest cost and simple I/O → choose simplest MCU that meets constraints (don’t over-spec).

---

# Common pitfalls & how to avoid them

* Relying on datasheet sleep numbers — always **measure**.
* Choosing an MCU without sufficient free RAM for buffers / stacks.
* Ignoring toolchain maturity (can double dev time).
* Picking chips with long lead times or single source.
* Missing RF certification cost if you choose a bare chip RF vs pre-cert module.

---

# Templates & quick artifacts (you can copy)

**Scoring column names:** Interfaces, Wireless, Memory, Power, CPU, Cost, Ecosystem, Availability
**Weights example:** Interfaces 20%, Wireless 20%, Memory 15%, Power 15%, CPU 10%, Cost 10%, Ecosystem 5%, Availability 5%

**Prototype test plan (short):**

1. Power up & debug UART
2. Flash minimal app with toggle & ADC read
3. Measure sleep current at deepest sleep
4. Perform stress test (max peripherals) 1 hour
5. Run OTA (if neededere are **excellent MCU choices for “high volume + lowest cost + simple I/O”**, grouped by **8-bit and low-end 32-bit**.

---

## ✅ 1. **Cheapest & Most Common 8-bit MCUs (Ultra-Low Cost)**

These dominate **TVs, fans, washing machines, power supplies, toys**.

### ✅ **AVR (Microchip)**

| MCU            | Flash | RAM   | Cost          | Used For               |
| -------------- | ----- | ----- | ------------- | ---------------------- |
| **ATtiny13A**  | 1 KB  | 64 B  | ✅✅ Very cheap | Toys, LED drivers      |
| **ATtiny85**   | 8 KB  | 512 B | ✅ Cheap       | Small controllers      |
| **ATmega8A**   | 8 KB  | 1 KB  | ✅ Cheap       | Appliances             |
| **ATmega328P** | 32 KB | 2 KB  | Low           | Arduino-class products |

**Why choose AVR:**
✅ Huge ecosystem
✅ Stable supply
✅ Very easy to program
❌ Lower performance

---

### ✅ **PIC (Microchip) — EVEN CHEAPER in High Volume**

| MCU             | Flash | RAM   | Cost           | Used For          |
| --------------- | ----- | ----- | -------------- | ----------------- |
| **PIC10F322**   | 384 B | 64 B  | ✅✅ Ultra cheap | Power supplies    |
| **PIC12F675**   | 1 KB  | 64 B  | ✅ Very cheap   | Chargers          |
| **PIC16F877A**  | 14 KB | 368 B | Low            | Industrial legacy |
| **PIC18F25K22** | 32 KB | 2 KB  | Low            | Consumer products |

✅ Used heavily in **Chinese mass production**
✅ Excellent **ADC + watchdog + brownout**
❌ Harder toolchain than AVR

---

### ✅ **STM8 (STMicroelectronics) — Appliance King**

| MCU            | Flash | RAM  | Cost          | Used For   |
| -------------- | ----- | ---- | ------------- | ---------- |
| **STM8S003F3** | 8 KB  | 1 KB | ✅✅ Very cheap | Fans, ACs  |
| **STM8S105**   | 32 KB | 2 KB | Low           | Appliances |

✅ Rock-solid in **white goods**
✅ Very strong EMI immunity
❌ Smaller global ecosystem

---

### ✅ **Renesas RL78 (Ultra-Low Power Appliances)**

| MCU          | Flash | RAM  | Used For        |
| ------------ | ----- | ---- | --------------- |
| **RL78/G13** | 32 KB | 2 KB | Smart meters    |
| **RL78/I1C** | 64 KB | 5 KB | Energy products |

✅ Extremely low power
✅ High reliability
❌ Toolchain more industrial

---

## ✅ 2. **Cheapest 32-bit MCUs (Modern Replacement for 8-bit)**

These are now **competing directly with AVR & PIC on price**.

### ✅ **STM32C0 Series (New Cheapest STM32)**

| MCU             | Flash | RAM   | Cost          | Used For     |
| --------------- | ----- | ----- | ------------- | ------------ |
| **STM32C011F6** | 32 KB | 6 KB  | ✅✅ Very cheap | Power boards |
| **STM32C031C6** | 32 KB | 12 KB | Low           | Consumer     |

✅ Drop-in modern choice
✅ Much faster than AVR
✅ Very low cost in volume

---

### ✅ **STM32F030 / F042 (USB & Control)**

| MCU             | Flash | RAM  | Used For      |
| --------------- | ----- | ---- | ------------- |
| **STM32F030F4** | 16 KB | 4 KB | Controllers   |
| **STM32F042F6** | 32 KB | 6 KB | ✅ USB devices |

✅ Great if you need **USB at low cost**

---

### ✅ **ESP32-C3 (Wireless + Cheap)**

| MCU          | Features           | Used For    |
| ------------ | ------------------ | ----------- |
| **ESP32-C3** | WiFi + BLE, RISC-V | Smart plugs |

✅ Cheapest **wireless MCU**
✅ Still very low BOM
❌ Overkill for non-wireless designs

---

## ✅ 3. **Chinese Ultra-Low-Cost MCUs (Extreme Volume Products)**

Used in **toys, remotes, LED drivers, USB devices**.

| Brand       | Example      | Use                     |
| ----------- | ------------ | ----------------------- |
| **WCH**     | **CH32V003** | ✅ 32-bit MCU for <$0.20 |
| **Padauk**  | PMS150C      | Cheapest 8-bit MCU      |
| **Nuvoton** | N76E003      | Consumer controls       |
| **Holtek**  | HT66F series | Toys, fans              |

✅ Insanely cheap
✅ Used in **billions of products**
❌ Toolchain & docs weaker

---

## ✅ 4. **Best MCU Picks by Simple Product Type**

| Product           | Best Cheap MCU                |
| ----------------- | ----------------------------- |
| LED Controller    | ATtiny13A / PIC10F / CH32V003 |
| Fan / Appliance   | STM8S003 / PIC16F             |
| Power Supply      | PIC12F675 / STM32C011         |
| Toy               | ATtiny85 / Padauk             |
| USB Dongle        | ✅ STM32F042                   |
| Smart Plug (WiFi) | ✅ ESP32-C3                    |
| Motor Speed Dial  | STM8S003 / PIC16F             |

---

## ✅ 5. **Simple Selection Rule (High Volume Products)**

| If You Need…           | Choose                |
| ---------------------- | --------------------- |
| Absolute lowest cost   | ✅ PIC / Padauk / CH32 |
| Easy development       | ✅ AVR / STM32C0       |
| Industrial reliability | ✅ STM8 / Renesas      |
| USB at ultra-low cost  | ✅ STM32F042           |
| Wireless at low cost   | ✅ ESP32-C3            |

---

## ✅ FINAL STRAIGHT ANSWER

For **high-volume, lowest-cost, simple I/O products**, your **best MCU choices** are:

✅ **ATtiny13 / ATtiny85**
✅ **PIC12F / PIC16F**
✅ **STM8S003**
✅ **STM32C011 / STM32C031**
✅ **CH32V003 (cheapest 32-bit MCU today)**

---

If you want, I can now:

✅ Pick the **cheapest MCU for YOUR exact product** (tell me: buttons, motors, ADC, USB, wireless?)
✅ Estimate **BOM cost breakdown**
✅ Show **which vendors dominate mass production in 2025**

👉 Tell me:
**What exactly is your product function? (LED driver, motor, power supply, sensor, toy, etc.)**
