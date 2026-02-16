---
title: Click to title description
description: Click to edit description
time: "16:02:41"
date: "15-02-2026"
---
## • Core ideas

- Illustrates **happened-before causality** in distributed systems via a sauna metaphor (no clock, asynchronous context). ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- You can **bound execution time** without clocks by anchoring actions to causally-related events. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- Relying on “next arrivals” establishes causal references, replacing explicit time measurement. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- Naive reference to events that occurred _before_ entry leads to unsafe behavior (premature decisions). ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- Memory-costly global snapshots provide guaranteed bounds but are often wasteful compared to causal hooks. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    

## • Mental models

**Sauna as asynchronous node:**

- You can’t perceive time → no timers, no clocks. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- Other saunas users with normal time perception serve as **reference processes** — akin to remote nodes. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- Exit when a reference process (next arrival) leaves → ensures your stay overlaps sufficiently. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    

**Causal anchor:**

```
You (entry event) → Next person arrives → Next person leaves → You exit
```

→ all actions linked by happened-before relations. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))

**Unsafe anchors:**

- Referencing someone already inside = outdated (pre-entry) → analogous to reading _stale node state_. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    

**Global view vs causal local:**

- _Snapshot tracking everyone_ = accurate but costly memory & state. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    

## • Key Terminologies

- **Asynchronous system:** no global clock; event ordering only via causality. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- **Happened-before relation (→):** core causal ordering between events in distributed systems. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- **Causal anchor:** an event after your entry used to place bounds without clocks. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- **Snapshot algorithm:** capturing global system state; safe but memory-heavy. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- **Outdated reference:** event occurring before your action → unsafe for bounding. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    

## • Actionable rules

1. **Bind actions to causally subsequent events** — never pre-entry events for safety decisions. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
2. **Use local causality cues** (like “the next person”) to indirectly bound durations. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
3. If strict guarantees are needed and resources permit, **take a global snapshot** of relevant entities. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
4. In absence of clocks, **explicit time measurement is replaced by ordered event sequences**. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
5. For system design, prefer **logical clocks / vector clocks** when causality ordering is required. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    

## • Common traps

- **Thinking “next” means shorter bound:** the next person could leave soon after your entry — doesn’t guarantee a lower bound unless uniformly distributed arrivals exist. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- **Measuring time implicitly:** “exit immediately after” might imply instantaneous timing — violates pure causal reasoning unless defined strictly event-to-event. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- **Using outdated states:** referencing events before your entry leads to inconsistent and unsafe decisions. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- **Assuming causal events always exist:** if no “next” arrives (e.g., network partition), algorithm stalls — deadlock risk. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    
- **Snapshot overshoot:** global state capture is safe, but cost/complexity may outweigh benefits for lightweight bounds. ([Murat Buffalo](https://muratbuffalo.blogspot.com/2026/01/the-sauna-algorithm-surviving.html "The Sauna Algorithm: Surviving Asynchrony Without a Clock"))
    

## • One-page cheat sheet

```
SAUNA ALGORITHM (ASYNC WITHOUT CLOCK)

Goal:
  Bound execution/exit without clocks by using causality (happened-before).

Metaphor:
  You enter sauna (async node).
  You can’t tell time. No clock (asynchronous system).
  Others enter regularly (uniform arrivals).

Algorithm:
  1) Enter sauna.
  2) Identify the next newcomer after entry → Call A
  3) Wait until A leaves.
  4) Exit right after A leaves (event-to-event).

Why it works:
  Exit is causally after your entry + A’s known safe duration.
  No physical time measurement needed — just causal sequencing.

Unsafe options:
  - Choosing someone inside when you enter (pre-entry): leads to premature exit.
  - Using clocks → not allowed in async model.
  
Safe but heavy:
  - Global snapshot of all inside upon entry → wait until all leave.

Distributed system takeaway:
  - Use *causal relationships* (→) instead of clocks when ordering matters.
  - Logical clocks, vector clocks, hybrid logical clocks standardize this.
  - Avoid decisions based on outdated state — unsafe.

Key traps:
  - Implicit timing via “immediate” post-event actions.
  - Deadlock if no next event arrives.
  - Memory blowup with global snapshot.

Mental model:
  Causality chains replace clocks.
  Your exit event is ordered relative to others.

Rule of thumb:
  *If time can’t be measured, measure causality.*

```

---

If you want, I can also extract **links to the referenced distributed systems concepts** (like logical vs vector vs hybrid clocks) with short summaries.