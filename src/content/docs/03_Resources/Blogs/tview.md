---
title: tview - terminal UI components
description: build rich interactive widgets in the terminal
time: 21:02:39
date: 14-02-2026
---
## Core ideas

- tview is a Go package providing **rich interactive terminal UI widgets** (forms, lists, tables, trees, text views, layouts, modals) you can compose into an application. ([GitHub](https://github.com/rivo/tview?utm_source=chatgpt.com "GitHub - rivo/tview: Terminal UI library with rich, interactive widgets — written in Golang"))
    
- Everything lives in a **single Application** loop that polls events and renders widgets. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Widgets are **Primitives** that render on screen and handle input; layouts compose primitives spatially. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Designed for real TUIs in production tools (e.g., Kubernetes CLIs, dashboards). ([GitHub](https://github.com/rivo/tview?utm_source=chatgpt.com "GitHub - rivo/tview: Terminal UI library with rich, interactive widgets — written in Golang"))
    

## Mental models

- Build a TUI like a widget tree: **root application → layout → widgets**. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- UI is **event-driven**: key presses and interactions invoke callbacks; the Application loop reads events and redraws. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Layouts control geometry: **Flex = flexible boxes**, **Grid = cell grid**, **Pages = stacked screens**. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- A widget that has focus receives input; without focus nothing happens. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    

## Key Terminologies

- **Application**: orchestrates event loop and rendering. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- **Primitive**: any renderable widget. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- **Box**: simplest primitive (border/title). ([sources.debian.org](https://sources.debian.org/src/golang-github-rivo-tview/0.0~git20210122.745e4ce-1/README.md/?utm_source=chatgpt.com "File: README.md | Debian Sources"))
    
- **TextView**: scrollable multi-color text window. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- **TextArea**: editable multi-line text. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- **Table**: tabular view with selectable cells. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- **TreeView**: hierarchical list. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- **List**: selectable list of items with shortcuts. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- **Form/InputField/Checkbox/DropDown/Button**: UI controls. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- **Flex/Grid/Pages**: layout managers. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- **Modal**: dialog overlay. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    

Actionable rules

- Always **create a single Application** and call `Run()` on it. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Set your UI root with `SetRoot(root, fullscreen)`. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Nest primitives into **layouts (Flex/Grid/Pages)** to structure UI. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Assign **focus** to interactive widgets to accept input. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Use callback setters (e.g., `SetSelectedFunc`, `SetDoneFunc`) for interaction logic. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- After async changes, schedule redraws via Application’s queue (use `QueueUpdate`/`QueueUpdateDraw`).
    

Common traps

- Forgetting to **call `Run()`** – nothing renders or accepts input. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Ignoring focus: widgets won’t see key events if not focused. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Overlapping layouts with no sizing strategy → unpredictable UI. ([Go Packages](https://pkg.go.dev/github.com/rivo/tview?utm_source=chatgpt.com "tview package - github.com/rivo/tview"))
    
- Blocking event loop in handlers → UI freezes. Use async + queue updates.
    
- Expecting web/CSS style layout semantics; these are terminal coordinate based.
    

One-page cheat sheet

```
import "github.com/rivo/tview"

app := tview.NewApplication()

// Widgets
box      := tview.NewBox().SetBorder(true).SetTitle("Title")
textView := tview.NewTextView().SetText("hello")
list     := tview.NewList().
               AddItem("opt1","","1",nil).
               AddItem("quit","","q",func(){app.Stop()})

// Layouts
flex := tview.NewFlex().
          AddItem(box, 3,1,false).
          AddItem(list,0,2,true)
grid := tview.NewGrid().AddItem(textView, 0,0,1,1,0,0,true)

// Set up root & run
app.SetRoot(flex, true).SetFocus(list)
if err := app.Run(); err != nil { panic(err) }

// Interaction
list.SetSelectedFunc(func(){
    // do something on select
    app.Draw()
})
```

Widgets summary

- TextView → scroll text windows
    
- InputField → one-line input
    
- TextArea → multiline text editor
    
- Table → grid data view
    
- TreeView → hierarchy
    
- List → options with hotkeys
    
- Form → group controls + buttons
    
- Modal → dialogs
    

Layouts

- Flex → direction stacking
    
- Grid → defined row/col cells
    
- Pages → switch views/screens
    

Patterns

- One Application, one root
    
- Focus drives input delivery
    
- Use layouts to compose screens
    
- Callback handlers mutate state + redraw