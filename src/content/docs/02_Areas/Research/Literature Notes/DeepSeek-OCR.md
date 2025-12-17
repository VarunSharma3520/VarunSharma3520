---
title: DeepSeek-OCR
description: Breakdown of Deepseek-OCR paper.
---

- **Goal:** Investigate optical 2‑D mapping to compress long textual contexts into far fewer vision tokens for efficient OCR and LLM processing.  
- **Components:**  
  - **DeepEncoder:** Low‑activation, high‑resolution encoder that aggressively compresses visual tokens (window‑attention → 16× Conv compressor → global‑attention).  
  - **DeepSeek‑3B‑MoE‑A570M:** Decoder that reconstructs text from compressed vision tokens.  

**Key Performance Findings**

- **Compression vs. Accuracy:**  
  - ≤ 10× compression (text tokens ≈ 10 × vision tokens) → OCR precision ≈ 97 %.  
  - 20× compression → OCR accuracy ≈ 60 %.  
- **Benchmarks:**  
  - **OmniDocBench:** Outperforms GOT‑OCR2.0 (256 toks/page) using only 100 vision tokens; beats MinerU2.0 (≈ 6000 toks/page) with < 800 vision tokens.  
  - **Fox benchmark:** 96 %+ precision at 9‑10× compression; ~90 % at 10‑12×; ~60 % at 20×.  

**Model Variants & Results (selected)**  

| Variant | Vision Tokens | OCR Precision | Compression (×) |
|---------|---------------|--------------|-----------------|
| DeepSeek‑OCR (Tiny) | 64 | 60 % | 20× |
| DeepSeek‑OCR (Base) | 100 | 91.5 % | 10× |
| DeepSeek‑OCR (Large) | 100 | 96.8 % | 9× |
| DeepSeek‑OCR (Small) | 64 | 79 % | 15× |

**Practical Impact**

- **Production Scale:** Single A100‑40G can generate > 200 k pages/day of OCR training data; 20‑node cluster (8 A100 each) → 33 M pages/day.  
- **Capabilities:** Handles charts, chemical formulas, simple geometry, natural images.  

**Architecture Insights**

- **DeepEncoder Design:**  
  - Serial combination of window‑attention (processes many tokens) and global‑attention (processes compressed set).  
  - 16× convolutional compressor reduces token count before dense layers, keeping activation memory low.  
- **Comparison to Typical VLM Encoders (Fig. 2):**  
  - **Dual‑tower (e.g., Vary):** High‑resolution support but requires dual preprocessing, complicates parallelism.  
  - **Tile‑based (e.g., InternVL2):** Handles extreme resolutions but creates many small patches → many tokens.  
  - **Adaptive‑resolution (e.g., Qwen‑VL):** Flexible but suffers from huge activation memory and long sequences for large images.  

**Contributions Claimed**

1. **Quantitative analysis** of vision‑text token compression ratios across benchmarks.  
2. **DeepEncoder** architecture that maintains low activation memory while achieving high compression.  
3. **End‑to‑end DeepSeek‑OCR** model that sets SOTA on OmniDocBench with the fewest vision tokens and broader parsing abilities.  

**Open‑Source Resources**

- Code & model weights: <http://github.com/deepseek-ai/DeepSeek-OCR>  

---  

*This note condenses the main ideas, results, and architectural points of the DeepSeek‑OCR paper.*

**Answer: Minimum vision‑token count required for decoding in DeepSeek‑OCR**

- **Base token pipeline**
  - Input image (e.g., 1024 × 1024) → 4096 patch tokens (16 × 16 patches).
  - 16× token‑compressor reduces this to **256 tokens** before the decoder.

- **Supported native‑resolution modes (token counts)**
  - **Tiny** – 512 × 512 → **64** tokens.  
  - **Small** – 640 × 640 → **100** tokens.  
  - **Base** – 1024 × 1024 → **256** tokens.  
  - **Large** – 1280 × 1280 → **400** tokens.

- **Dynamic (Gundam) mode**
  - Combines *n* local 640 × 640 tiles plus a global 1024 × 1024 view.  
  - Token count: **n × 100 + 256** (where n ∈ [2, 9]).

- **Least number of vision tokens needed for decoding**
  - The **Tiny mode** gives the smallest viable token set: **64 tokens**.  
  - This is the minimal token budget that the decoder can still operate on while preserving enough visual information for OCR.

- **Key take‑away**
  - For any decoding task with DeepSeek‑OCR, you need **at least 64 vision tokens** (Tiny resolution). Higher resolutions increase token count (100, 256, 400, or n × 100 + 256) and provide richer visual detail.

## DeepSeek‑OCR Overview (concise bullet‑point summary)

- **Data categories & proportions**
  - OCR data: **70%** of training set  
    - **OCR 1.0** – natural‑scene Chinese & English (10 M images each) from LAION/Wukong, labeled with PaddleOCR; prompts can toggle detection‑box output.  
    - **OCR 2.0** – specialized parsing:  
      - **Charts** → image‑to‑HTML‑table (pyecharts, matplotlib); 10 M rendered chart images.  
      - **Chemical formulas** → SMILES (PubChem) rendered with RDKit; **5 M** pairs.  
      - **Plane geometry** → line‑segment dictionaries (Slow Perception); **1 M** pairs with translation‑invariant augmentation.  
  - General vision data: **20%** (caption, detection, grounding) generated per DeepSeek‑VL2 to keep a standard vision interface.  
  - Text‑only data: **10%** in‑house corpus, all truncated to **8192 tokens** (model’s max sequence length).

- **Training pipeline**
  1. **DeepEncoder pre‑training**  
     - Compact LM (next‑token prediction) → 2 epochs on OCR 1.0 + OCR 2.0 + 100 M LAION samples.  
     - Batch = 1280, AdamW lr = 5e‑5, cosine scheduler, seq‑len = 4096.  
  2. **DeepSeek‑OCR fine‑tuning**  
     - Pipeline parallelism (4 stages): DeepEncoder (PP0 + PP1), Decoder (PP2 + PP3).  
     - SAM + compressor frozen (PP0); CLIP part trainable (PP1).  
     - Decoder: 12‑layer MoE split 6 + 6 across PP2/PP3.  
     - 20 nodes × 8 × A100‑40G GPUs, DP = 40 → global batch = 640.  
     - AdamW lr = 3e‑5, step scheduler.  
     - Throughput: **90 B tokens/day** (text‑only) / **70 B tokens/day** (multimodal).

- **Vision‑text compression results (Fox benchmark)**
  - **10× compression** → ≈ 97 % decoding precision (promising near‑lossless compression).  
  - **>10× compression**: precision drops (layout complexity, blurred text at 512/640 px).  
  - **≈ 20× compression**: still ≈ 60 % precision.  
  - Token counts per mode (vision tokens after resizing):  
    - Tiny = 64, Small = 100, Base ≈ 182/256, Large ≈ 285/400, Gundam ≈ 795.

- **Key takeaways**
  - Strong OCR performance across languages and document types while drastically reducing token footprint.  
  - Mixed‑data strategy (OCR + vision + text) balances specialized OCR ability with general vision compatibility.  
  - Pipeline‑parallel training enables scaling to multi‑billion‑parameter MoE models on commodity GPU clusters.  
  - Future work: improve layout handling for ultra‑high compression and mitigate resolution‑induced text blur.

## Concise Notes on Optical Context Compression & DeepSeek‑OCR

- **Optical Context Compression**
  - Promising research direction; exploits existing VLM (Vision‑Language Model) infrastructure.
  - No extra overhead because multimodal systems already include a vision encoder.

- **Performance Highlights (DeepSeek‑OCR)**
  - **100 vision tokens (640×640)** → outperforms GOT‑OCR 2.0 (uses 256 tokens).
  - **400 tokens (≈285 valid, 1280×1280)** → matches state‑of‑the‑art results on OmniDocBench.
  - **<800 tokens (Gundam mode)** → surpasses MinerU 2.0, which needs ~7 k tokens.
  - Demonstrates high practical utility and a large research ceiling thanks to token compression.

- **Token Requirements by Document Type (Table 4)**
  - **Slides** – only 64 vision tokens needed.
  - **Books / Reports** – good performance with ~100 tokens.
  - **Newspapers** – require Gundam or Gundam‑Master mode (far more tokens) due to 4–5 k text tokens.

- **Deep Parsing Capability**
  - Unified prompt can trigger secondary model calls for:
    - Structured extraction of **charts** (financial/scientific figures).
    - Detailed captioning of **natural images** in books/articles.
    - Conversion of **chemical formulas** to SMILES notation.
    - (Limited) parsing of **planar geometric figures**.

- **Multilingual OCR**
  - Trained on ≈100 languages; supports both layout‑aware and plain text outputs.
  - Demonstrated on Arabic, Sinhala, Chinese, English, etc.

- **General Vision Understanding**
  - Provides image description, object detection, grounding, and other visual tasks.
  - Language abilities retained (no SFT fine‑tuning; needs completion prompts for some functions).

- **Discussion & Future Directions**
  - Near‑lossless OCR compression at **≈10×** token reduction; **20×** still keeps ~60 % accuracy.
  - Potential to apply optical compression to multi‑turn dialogue histories (10× efficiency).
  - Opens avenues for vision‑token optimization, context‑compression, and forgetting mechanisms in LLM/VLM systems.

- **Idea:** Simulate textual “forgetting” by converting past text into images and progressively compressing (down‑sizing) those images.  
- **Mechanism:**  
  - Render earlier rounds of text onto images for an initial compression step.  
  - Reduce image resolution over time, so token counts drop and text becomes increasingly blurred.  
- **Analogy:** Mirrors human memory decay—recent info stays high‑fidelity, older memories fade as visual detail degrades.  
- **Benefits:**  
  - Enables ultra‑long context handling with limited compute: recent context kept detailed, distant context stored cheaply.  
  - Opens a pathway to theoretically unlimited context windows by balancing information retention vs. resource use.  
- **Current Findings (DeepSeek‑OCR):**  
  - Demonstrated that a small number of vision tokens can decode text tokens at >10× the original quantity.  
  - Shows feasibility of “contexts optical compression” for VLM/LLM pipelines.  
- **Limitations & Future Work:**  
  - Still early‑stage; OCR alone doesn’t fully prove true optical compression.  
  - Planned experiments: digital‑optical text interleaved pre‑training, needle‑in‑a‑haystack tests, deeper evaluation of compression ratios and fidelity loss.  
  - Significant room for research to improve compression quality and integrate with large‑scale LLM training.
