---
title: Raodmap to a 2D vector Library
desc: This is a detailed roadmap to make 2D Vector library for SVG & animation
---

Below is a **clean, SVG-based roadmap**, optimized for **exporting SVG** (not rasterizing). Think of your library as a **scene graph → SVG serializer**.

---

## Big picture architecture

```
Your API
  ↓
Vector Scene Model
  ↓
SVG DOM / AST
  ↓
SVG file / string
```

You **do not** need scanlines, AA, or rasterization at all.

---

## Phase 1: SVG fundamentals (read-only first)

Before coding:

* SVG coordinate system
* `<svg viewBox>`
* `<g>` groups + `transform`
* `<path d="">`
* Fill rules: `nonzero`, `evenodd`
* Stroke attributes

👉 Ignore filters, masks, and text for now.

---

## Phase 2: Core data model (most important)

### 1. Scene graph

Design internal nodes that map *cleanly* to SVG:

```text
Scene
 └── Group (transform, style)
      ├── Path
      ├── Rect
      ├── Circle
      └── Group
```

Each node has:

* Transform (Mat3)
* Style
* Children (if group)

**Rule**

> Your internal model should be SVG-friendly, not SVG-dependent.

---

### 2. Style system

Define a style struct:

* Fill

  * color
  * rule (nonzero / evenodd)
* Stroke

  * color
  * width
  * join
  * cap
  * dash array
* Opacity

Later:

* Gradients
* Patterns

---

## Phase 3: Path abstraction (SVG-compatible)

### 3. Path commands

Your path API should map **1:1** with SVG:

| Your API  | SVG |
| --------- | --- |
| moveTo    | M   |
| lineTo    | L   |
| quadTo    | Q   |
| cubicTo   | C   |
| closePath | Z   |

Internal representation:

```text
Path {
  commands: [Move, Line, Quad, Cubic, Close]
}
```

⚠️ Do **not** flatten curves — keep them exact.

---

### 4. Absolute vs relative commands

Choose one:

* **Absolute only** (simpler, recommended)
* Convert to relative at export (optional optimization)

SVG supports both.

---

## Phase 4: Transform system

### 5. Transform handling

Use a 3×3 matrix internally.

When exporting:

* Prefer SVG `transform="matrix(a b c d e f)"`
* Or decompose into `translate/rotate/scale` (optional)

Example:

```xml
<g transform="matrix(1 0 0 1 100 50)">
```

---

## Phase 5: SVG serialization layer

### 6. SVG AST (strongly recommended)

Don’t write strings directly.

Create nodes:

* SvgRoot
* SvgGroup
* SvgPath
* SvgRect
* SvgCircle

Then serialize AST → string.

This gives you:

* Pretty printing
* Minified output
* Easy future extensions

---

### 7. Path `d` generator

Convert commands to SVG syntax:

```text
Move(10,10) → "M 10 10"
Line(20,20) → "L 20 20"
Cubic(...) → "C x1 y1 x2 y2 x y"
Close → "Z"
```

**Precision tip**

* Use fixed precision (e.g. 3–4 decimals)
* Strip trailing zeros

---

## Phase 6: Styling → SVG attributes

### 8. Attribute mapping

Examples:

```text
fill            → fill="#ff0000"
fill-rule       → fill-rule="evenodd"
stroke-width    → stroke-width="2"
stroke-linecap  → stroke-linecap="round"
```

Unset values:

* Use `"none"`
* Or omit attribute

---

### 9. Shared styles (optional)

Optimize output using:

* `<defs>`
* CSS classes
* Reusable gradients

This is optional for v1.

---

## Phase 7: Viewport & export

### 10. SVG root

Your exporter must handle:

* Width / height
* viewBox
* XML header (optional)
* Namespace

Minimal SVG:

```xml
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 800 600">
```

---

## Phase 8: Text (later)

Two approaches:

1. **Text as text** → `<text>` (harder: layout, fonts)
2. **Text as paths** → `<path>` (simpler, bigger files)

Start with #2 if you add text.

---

## Phase 9: Validation & correctness

### 11. Test against viewers

* Browser (Chrome, Firefox)
* Inkscape
* Illustrator

Add tests:

* Visual snapshots
* SVG path comparison

---

## Minimal viable SVG library (strongly recommended)

**MVP features**

* Groups + transforms
* Paths (M L Q C Z)
* Solid fills + strokes
* SVG export

This alone is extremely usable.

---

## Example usage (target API)

```pseudo
scene = Scene()

group = scene.group()
group.translate(100, 50)

path = group.path()
path.moveTo(0, 0)
path.lineTo(100, 0)
path.lineTo(50, 80)
path.close()

path.fillColor("red")
path.strokeColor("black")

svg = scene.toSVG()
```

Learn this for extras:

* A **concrete data model** (structs/classes)
* SVG path `d` generator code
* Style inheritance rules
* How to map gradients cleanly to `<defs>`

Ah, now we’re getting into **SVG animation**! Since your workflow is:

**Figma → SVG → animate**, we need to understand what can actually be animated in SVG and how to structure it. I’ll break this down clearly.

---

## 12 SVG Animation Basics

There are **three main ways to animate SVG**:

### **A. SMIL (`<animate>`, `<animateTransform>`)**

* Native SVG animation tags.
* Example:

```xml
<circle cx="50" cy="50" r="40" fill="red">
  <animate attributeName="cx" from="50" to="150" dur="2s" repeatCount="indefinite" />
</circle>
```

* Works for shapes, positions, colors, transforms.
* **Pros**: No JS required.
* **Cons**: Poor browser support; some browsers (like Chrome) are phasing out SMIL.

---

### **B. CSS Animations / Transitions**

* You can animate **certain attributes** via CSS.
* Works for:

  * `transform` (`translate`, `scale`, `rotate`)
  * `stroke-dasharray` / `stroke-dashoffset` (great for line drawing)
  * `opacity` / `fill` / `stroke`
* Example:

```css
circle {
  animation: move 2s infinite alternate;
}

@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}
```

* Pros: Works in modern browsers, easy to combine with HTML/CSS.
* Cons: Can’t animate all SVG attributes (e.g., path `d` directly is tricky in CSS).

---

### **C. JavaScript (most flexible)**

* Use JS to manipulate the DOM or SVG attributes.
* Great for **complex path morphing** or **interactive animation**.
* Example (vanilla JS):

```js
const circle = document.querySelector('circle');
let x = 50;
setInterval(() => {
  x += 1;
  circle.setAttribute('cx', x);
}, 16);
```

* Libraries make this easier:

  * **GSAP** (GreenSock) → Best for SVG animations
  * **Anime.js**
  * **SVG.js**

---

## 13 Animating Figma-exported SVG

### Step 1: Export from Figma

* Figma → **SVG**
* Make sure:

  * Each element you want to animate has its own `<path>` / `<rect>` / `<g>`.
  * Give IDs or classes if you plan to animate via CSS/JS.

Example Figma-exported SVG snippet:

```xml
<svg viewBox="0 0 200 200">
  <g id="triangle">
    <path d="M10 10 L190 10 L100 150 Z" fill="red"/>
  </g>
</svg>
```

### Step 2: Decide animation type

| Animation type      | Best method                                  |
| ------------------- | -------------------------------------------- |
| Move, rotate, scale | CSS `transform` or JS                        |
| Color change        | CSS `fill` or JS                             |
| Path morph          | JS (GSAP or custom)                          |
| Line drawing        | CSS `stroke-dasharray` + `stroke-dashoffset` |

---

### Step 3: Simple CSS animation example

**Line drawing (popular effect)**:

```css
path {
  stroke: black;
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 300; /* length of path */
  stroke-dashoffset: 300;
  animation: draw 2s forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

* Works nicely for Figma-exported paths.
* Use a tool like [SVG Path Length Calculator](https://codepen.io/tigt/pen/vLmRVp) to get `stroke-dasharray`.

---

### Step 14: Using JS for more complex animations

**GSAP example** (path morph):

```js
gsap.to("#triangle path", {
  duration: 2,
  morphSVG: { shape: "M20 20 L180 20 L100 130 Z" },
  repeat: -1,
  yoyo: true
});
```

* GSAP handles path interpolation.
* Great for animations Figma can’t export natively.

---

### Step 15: Optimizations for Figma → SVG animations

1. **Clean up SVG**

   * Figma exports sometimes include unnecessary `<g>` layers, transforms, and IDs.
   * Tools: [SVGO](https://github.com/svg/svgo) to optimize.
2. **Separate elements you want to animate**

   * Group them logically.
   * Assign IDs or classes.
3. **Flatten unnecessary transforms**

   * Easier to animate if paths start at `x=0,y=0` in their local coordinate system.

---

✅ **TL;DR Animation Pipeline**:

1. Figma → SVG → Clean IDs/classes → Optimize
2. Pick animation type:

   * Move/rotate/scale → CSS transform
   * Path morph → JS/GSAP
   * Line draw → CSS stroke-dasharray
   * Color/opacity → CSS
3. Animate via CSS or JS
4. Test in browser

---

## Common mistakes to avoid ⚠️

* Baking transforms into geometry too early
* Flattening curves
* Writing SVG strings directly everywhere
* Ignoring fill rules
* Using floats without precision control

---

