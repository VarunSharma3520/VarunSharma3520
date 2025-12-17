---
title: md to PDF Conversion
description: A comprehensive guide on converting Markdown documents to PDF format using various tools and methods.
---

## Overview

This note explains how to convert Markdown (`.md`) files into PDF documents using the **`markdown-pdf`** Python package. It covers installation, basic usage, and all supported configuration options at both the document and section levels.

---

## Installation

```bash
pip install markdown-pdf
```

---

## Basic Usage

### Convert a Markdown File to PDF

```python
from markdown_pdf import MarkdownPdf, Section
from pathlib import Path

# Paths
md_path = Path("./input.md")
pdf_path = Path("./output.pdf")

# Read markdown file
markdown_text = md_path.read_text(encoding="utf-8")

# Create PDF
pdf = MarkdownPdf(toc_level=2, optimize=True)

# Add markdown content
pdf.add_section(Section(markdown_text))

# Save PDF
pdf.save(pdf_path)

print(f"PDF generated at: {pdf_path}")
```

---

## Document-Level Configuration (`MarkdownPdf`)

### Constructor

```python
pdf = MarkdownPdf(toc_level=…, optimize=…)
```

### Parameters

| Parameter   | Type   | Description                                                                                                                    |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `toc_level` | `int`  | Maximum heading level included in the PDF **bookmarks (TOC)**. Example: `2` includes `h1` and `h2`. Set to `0` to disable TOC. |
| `optimize`  | `bool` | Enables PDF optimization to reduce file size and improve structure.                                                            |

📌 **Note**: The TOC appears as **PDF bookmarks**, not as visible pages inside the document.

---

### PDF Metadata (`pdf.meta`)

Standard PDF metadata can be set using the `meta` dictionary.

| Key            | Description                 | Default         |
| -------------- | --------------------------- | --------------- |
| `creationDate` | Creation timestamp          | Current date    |
| `modDate`      | Last modification timestamp | Current date    |
| `creator`      | PDF creator string          | PyMuPDF default |
| `producer`     | PDF producer                | `""`            |
| `title`        | Document title              | `""`            |
| `author`       | Document author             | `""`            |
| `subject`      | Document subject            | `""`            |
| `keywords`     | Search keywords             | `""`            |

#### Example

```python
pdf.meta["title"] = "Markdown to PDF Guide"
pdf.meta["author"] = "Cybro"
pdf.meta["subject"] = "Documentation"
```

---

## Section-Level Configuration (`Section`)

Each PDF is composed of one or more **sections**, allowing fine-grained control over layout and styling.

### Constructor

```python
Section(markdown_text, toc=…, root=…, paper_size=…, borders=…)
```

### Parameters

| Parameter    | Type                      | Description                                                         | Default              |
| ------------ | ------------------------- | ------------------------------------------------------------------- | -------------------- |
| `toc`        | `bool`                    | Include section headings in the PDF bookmarks                       | `True`               |
| `root`       | `str`                     | Base directory for resolving image paths                            | `"."`                |
| `paper_size` | `str` or `(float, float)` | Page size (e.g. `"A4"`, `"A4-L"`, `"Letter"`, or custom size in mm) | `"A4"`               |
| `borders`    | `tuple`                   | Page margins `(left, top, right, bottom)` in points                 | `(36, 36, -36, -36)` |

#### Examples

* `"A4-L"` → A4 landscape
* `(210, 297)` → Custom A4 portrait (mm)

---

## CSS Styling (`user_css`)

Custom CSS can be applied per section to control layout, typography, and pagination.

```python
pdf.add_section(
    Section(markdown_text),
    user_css="h1 { color: red; text-align: center; }"
)
```

Common use cases:

* Page breaks
* Font customization
* Preventing tables/code blocks from splitting across pages

---

## Summary of Supported Options

### Document-Level

* `toc_level`
* `optimize`
* `pdf.meta[...]` (standard PDF metadata)

### Section-Level

* `toc`
* `root`
* `paper_size`
* `borders`
* `user_css`

---

## Complete Example

```python
from markdown_pdf import MarkdownPdf, Section
from pathlib import Path

md_text = Path("guide.md").read_text(encoding="utf-8")

pdf = MarkdownPdf(toc_level=3, optimize=True)

# Metadata
pdf.meta["title"] = "Comprehensive Guide"
pdf.meta["author"] = "Cybro"
pdf.meta["subject"] = "Markdown PDF Conversion"

# Title page (excluded from TOC)
pdf.add_section(
    Section("# Welcome\n", toc=False),
    user_css="h1 { text-align: center; }"
)

# Main content
pdf.add_section(
    Section(md_text, root="./", paper_size="A4", borders=(36, 36, 36, 36)),
    user_css="body { font-family: sans-serif; }"
)

pdf.save("output.pdf")
```

---

Below is an **expanded, polished continuation** of your note, seamlessly adding the four requested topics.
This version is **documentation-ready** and fits naturally after your existing sections.

---

## Advanced Usage

This section covers advanced layout and debugging techniques when converting Markdown to PDF using `markdown-pdf`.

---

## Automatically Split Markdown into Multiple Sections by Headings

Splitting a Markdown document into multiple PDF sections allows:

* Different page sizes or orientation per chapter
* Independent CSS styling
* Fine-grained TOC control

### Split on Top-Level Headings (`#`)

```python
from markdown_pdf import MarkdownPdf, Section
from pathlib import Path
import re

md_text = Path("guide.md").read_text(encoding="utf-8")

# Split Markdown on H1 headings
sections = re.split(r'(?=^# )', md_text, flags=re.MULTILINE)

pdf = MarkdownPdf(toc_level=3, optimize=True)

for section in sections:
    if not section.strip():
        continue

    pdf.add_section(
        Section(section, toc=True, root="."),
        user_css="h1 { page-break-before: always; }"
    )

pdf.save("output.pdf")
```

### Notes

* Each `# Heading` becomes a new PDF section
* Bookmarks are automatically generated
* Ideal for chapter-based documents

---

## CSS-Based Page-Break Control

The `markdown-pdf` engine respects standard **CSS print rules**, enabling precise pagination control.

### Common Page-Break Rules

| CSS Rule                     | Effect                          |
| ---------------------------- | ------------------------------- |
| `page-break-before: always;` | Force a new page before element |
| `page-break-after: always;`  | Force a new page after element  |
| `page-break-inside: avoid;`  | Prevent element from splitting  |
| `break-before: page;`        | Modern equivalent               |
| `break-after: page;`         | Modern equivalent               |

---

### Example: Prevent Splitting Code, Tables, and Images

```python
pdf.add_section(
    Section(md_text),
    user_css="""
        h1 {
            page-break-before: always;
        }

        pre, code, table, blockquote, img {
            page-break-inside: avoid;
        }
    """
)
```

---

### Markdown-Controlled Page Breaks

You can insert page breaks directly in Markdown using raw HTML:

```markdown
<div style="page-break-before: always;"></div>
```

Or define a reusable CSS class:

```css
.page-break {
    page-break-before: always;
}
```

```markdown
<div class="page-break"></div>
```

---

## Landscape Appendices and Mixed Page Layouts

Using multiple sections, you can mix portrait and landscape pages in a single PDF.

### Example: Landscape Appendix

```python
pdf.add_section(
    Section(
        appendix_md,
        paper_size="A4-L",
        toc=True
    ),
    user_css="""
        h1 { text-align: center; }
        table { width: 100%; }
    """
)
```

### Typical Use Cases

* Wide tables
* Architecture diagrams
* Logs or reports
* Data-heavy appendices

---

## Debugging Image Paths and Internal Links

### Image Path Issues

Markdown image paths are resolved **relative to the `root` directory** of the section.

#### Correct Usage

```python
pdf.add_section(
    Section(md_text, root="./docs"),
)
```

```markdown
![Diagram](images/arch.png)
```

This resolves to:

```
./docs/images/arch.png
```

---

### Common Image Problems

| Problem               | Cause                   | Fix                                   |
| --------------------- | ----------------------- | ------------------------------------- |
| Image not shown       | Wrong working directory | Set `root` correctly                  |
| Image missing in PDF  | Relative path mismatch  | Use absolute or correct relative path |
| Large image overflows | No CSS constraint       | Use `max-width: 100%`                 |

```css
img {
    max-width: 100%;
    height: auto;
}
```

---

### Debugging Internal Links and Anchors

Internal links require **explicit HTML anchors**.

#### Correct Anchor Usage

```markdown
<a id="intro"></a>
## Introduction
```

```markdown
[Go to Introduction](#intro)
```

### Heading-Based Links

Links to headings are case-sensitive and depend on how IDs are generated.
Using explicit anchors is **recommended for reliability**.

---

## Recommended Best Practices

✔ Split documents into sections by major headings
✔ Use CSS for pagination and layout control
✔ Use landscape sections only where necessary
✔ Always set `root` for predictable image resolution
✔ Prefer explicit anchors for internal links

---

## Reference

* **markdown-pdf on PyPI**
  [https://pypi.org/project/markdown-pdf/](https://pypi.org/project/markdown-pdf/)

---