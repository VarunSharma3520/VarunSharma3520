---
title: ESP32 Family
description: A clean, text-based FAMILY TREE DIAGRAM of the ESP32 microcontroller families
---


Perfect — here is the **ESP32 FAMILY TREE DIAGRAM** in the **same clean text format** as the STM32 one, with explanations and where each variant fits.

This covers **all major Espressif ESP32 families** used in IoT, AIoT, smart devices, and wireless products.

---

# ✅ ESP32 FAMILY TREE (TEXT DIAGRAM)

```
ESP32 MICROCONTROLLERS (Espressif Systems)
│
├── ESP8266 Series  (Old Generation WiFi)
│   └── ESP8266 → WiFi only, single-core, legacy IoT
│
├── ESP32 Series  (Classic Dual-Core WiFi + Bluetooth)
│   ├── ESP32 (Original)
│   │   ├── ESP32-D0WD
│   │   ├── ESP32-WROOM
│   │   └── ESP32-WROVER (with PSRAM)
│   │
│   ├── ESP32-Solo → Single-core version
│   └── ESP32-PICO → All-in-one SiP module
│
├── ESP32-S Series  (AI + USB)
│   ├── ESP32-S2 → WiFi only + USB
│   └── ESP32-S3 → WiFi + Bluetooth LE + AI acceleration ✅
│
├── ESP32-C Series  (Low Cost / RISC-V)
│   ├── ESP32-C2 → Ultra low cost WiFi + BLE
│   ├── ESP32-C3 → RISC-V + WiFi + BLE ✅
│   ├── ESP32-C5 → WiFi 6 + BLE (new)
│   └── ESP32-C6 → WiFi 6 + BLE + 802.15.4 ✅
│
├── ESP32-H Series  (IEEE 802.15.4 / Zigbee / Thread)
│   ├── ESP32-H2 → Zigbee / Thread + BLE (NO WiFi)
│   └── Future H-series
│
└── ESP Bluetooth-Only Series
    └── ESP32-BLE (rare industrial variants)
```

---

# ✅ BIG BRANCH MEANING (VERY SIMPLE)

| Branch              | Purpose                     |
| ------------------- | --------------------------- |
| **ESP8266**         | Old WiFi-only IoT           |
| **ESP32 (Classic)** | WiFi + Bluetooth, dual core |
| **ESP32-S**         | USB + AI acceleration       |
| **ESP32-C**         | Cheap, low power, RISC-V    |
| **ESP32-H**         | Zigbee / Thread (no WiFi)   |

---

# ✅ PERFORMANCE COMPARISON BY FAMILY

| Family   | CPU           | WiFi     | Bluetooth | Zigbee | USB | AI | Cost       |
| -------- | ------------- | -------- | --------- | ------ | --- | -- | ---------- |
| ESP8266  | 32-bit LX106  | ✅        | ❌         | ❌      | ❌   | ❌  | ✅ Cheapest |
| ESP32    | Dual-core LX6 | ✅        | ✅ Classic | ❌      | ❌   | ❌  | Medium     |
| ESP32-S2 | LX7 Single    | ✅        | ❌         | ❌      | ✅   | ❌  | Medium     |
| ESP32-S3 | LX7 Dual      | ✅        | ✅ BLE 5   | ❌      | ✅   | ✅  | Medium     |
| ESP32-C3 | ✅ RISC-V      | ✅        | ✅ BLE 5   | ❌      | ❌   | ❌  | ✅ Cheap    |
| ESP32-C6 | ✅ RISC-V      | ✅ WiFi 6 | ✅ BLE 5   | ✅      | ❌   | ❌  | Medium     |
| ESP32-H2 | ✅ RISC-V      | ❌        | ✅ BLE 5   | ✅      | ❌   | ❌  | Medium     |

---

# ✅ WHERE ESP32 FITS VS STM32 & ARDUINO

| MCU            | Wireless     | Power  | Security | AI | Learning  |
| -------------- | ------------ | ------ | -------- | -- | --------- |
| Arduino ATmega | ❌            | Low    | ❌        | ❌  | ✅ Easiest |
| STM32F1        | ❌            | Medium | ❌        | ❌  | Medium    |
| ✅ STM32WBA     | ✅ BLE/Zigbee | ✅ Low  | ✅ High   | ❌  | Hard      |
| ✅ ESP32        | ✅ WiFi/BLE   | Medium | ✅ Good   | ❌  | ✅ Easy    |
| ✅ ESP32-S3     | ✅ WiFi/BLE   | Medium | ✅ Good   | ✅  | Medium    |

---

# ✅ ONE-LINE PURPOSE OF EACH ESP FAMILY

* **ESP8266** → Cheap WiFi switch/sensor
* **ESP32 (Classic)** → Smart home, cloud IoT
* **ESP32-S2** → USB devices with WiFi
* **ESP32-S3** → Camera, voice, AI
* **ESP32-C3** → Cheap WiFi + BLE product
* **ESP32-C6** → WiFi 6 + Matter devices
* **ESP32-H2** → Zigbee smart home

---

# ✅ SIMPLE CHOICE GUIDE

| Your Application    | Best ESP           |
| ------------------- | ------------------ |
| Smart Plug / Switch | ESP8266 / ESP32-C3 |
| Smart Home Hub      | ESP32              |
| Voice Assistant     | ESP32-S3           |
| Smart Lock          | ESP32-C6           |
| Zigbee Sensor       | ESP32-H2           |
| USB + WiFi Device   | ESP32-S2           |

---

# ✅ FINAL SUMMARY

* ✅ ESP32 has **7+ major families**
* ✅ ESP32 is **wireless-first MCU**
* ✅ ESP32 is easier than STM32 for IoT
* ✅ STM32 is better for **industrial + motor + power**
* ✅ ESP32 is best for **cloud + smart home + WiFi products**

---

If you want, I can also give you:

✅ **Side-by-side STM32 vs ESP32 family tree**
✅ **ESP32 vs STM32WBA vs Arduino for IoT (decision table)**
✅ **Explain ESP32 chip numbers (C3, S3, H2 what they mean)**

👉 Tell me:
**Are you building WiFi, Zigbee, Bluetooth, or Matter-based product?**
