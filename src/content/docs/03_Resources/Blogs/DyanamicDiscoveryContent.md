---
title: Dynamic context discovery
description: Dynamic context discovery by Cursor research
time: 23:02:56
date: 14-02-2026
---
### • Core Ideas

- Modern coding agents work better when they **pull only the context they need** instead of preloading everything. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- _Dynamic Context Discovery_ shifts from static upfront context to **on-demand context retrieval**, reducing token waste and confusion. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- Cursor implements this through **file-based interfaces** that let agents discover and fetch relevant context when required. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    

---

### • Mental Models

- **Static vs Dynamic Context**  
    Static = always included upfront;  
    Dynamic = fetched only when relevant. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **Files as First-Class Context**  
    Treat outputs (tools, history, terminals) as filesystem files agents can search/grep rather than embedding them in prompts. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **Just-In-Time Loading**  
    Load heavy context (tool descriptions, MCP definitions) only when needed. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **Context Window Budgeting**  
    Optimize token usage by trimming upfront noise and letting models discover what matters. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    

---

### • Key Terminologies

- **Dynamic Context Discovery** – letting the agent fetch only relevant context on demand. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **Static Context** – information preloaded irrespective of need. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **MCP Tools** – external tools behind OAuth whose descriptions can bloat context if preloaded. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **Agent Skills** – domain-specific capabilities defined as files; can be dynamically pulled. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **History Files** – saved conversation/task logs for better summarization recall. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    

---

### • Actionable Rules

1. **Avoid preloading long outputs** into agent prompts — write them to files instead. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
2. **Use history files** to boost summarization fidelity when context limits hit. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
3. **Organize tools into folders** so agents can discover only relevant ones. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
4. **Sync terminal outputs to filesystem** to allow grep/search instead of pasting text. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
5. **Only include minimal static context** (e.g., names/tags), and let the agent pull detailed info. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    

---

### • Common Traps

- **Overloading the context window** with full tool schemas or logs upfront — burns tokens and introduces noise. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **Truncating tool outputs** arbitrarily — can drop crucial data; instead write to files for reading. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **Relying only on summaries** — lost details may matter; always keep history references accessible. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
- **Assuming dynamic discovery replaces all context needs** — some minimal static info still helps navigation. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    

---

### • One-Page Cheat Sheet (for future reference)

**Why dynamic context discovery?**  
→ Save tokens + improve relevance by fetching context _only when needed_. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))

**5 Methods Cursor Uses:**

1. Save long tool outputs as files → read/tail on demand. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
2. Reference chat history during summarization. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
3. Support file-based _Agent Skills_ and let agent discover relevant ones. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
4. Sync MCP tool descriptions to folders → load only tools you need. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    
5. Write integrated terminal outputs to filesystem for grep/search. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))
    

**Quick Rules:**  
✔ Use files for large outputs. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))  
✔ Only include minimal static context. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))  
✔ Keep history referable. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))  
✔ Dynamically pull tools/skills. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))  
✔ Sync terminals for full traceability. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))

**Pitfalls to Avoid:**  
✘ Dumping entire contexts upfront. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))  
✘ Truncating data blindly. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))  
✘ Treating summaries as perfect source of truth. ([Cursor](https://cursor.com/blog/dynamic-context-discovery?utm_source=chatgpt.com "Dynamic context discovery · Cursor"))

