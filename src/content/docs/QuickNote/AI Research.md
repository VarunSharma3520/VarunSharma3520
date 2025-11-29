---
title: AI Research
description: A detailed document about making of detailed IETM application using AR/VR technology
---
# **Weekly Report – Er. Varun Sharma**

**Internship Start Date:** 10th October 2025  
**Project Focus:** Enhancing an existing IETM (Interactive Electronic Technical Manual) application using AI and AR/VR technologies.

---

## **Week 1 Summary**

### **1. Memento: Fine-tuning LLM Agents without Fine-tuning LLMs**

**Paper:** [Memento Research Paper](https://arxiv.org/pdf/2508.16153)  
**GitHub Repository:** [Agent-on-the-Fly/Memento](https://github.com/Agent-on-the-Fly/Memento)

**Overview:**  
Memento introduces a novel method of improving LLM agents _without fine-tuning the base LLM_. Instead, it enables adaptive learning through memory-based retrieval, reinforcement learning, and case-based reasoning. The LLM remains frozen while the agent evolves through experience.

#### ✅ **Pros:**

- **No fine-tuning required:** Reduces computational cost and simplifies deployment across different LLM providers.
    
- **Continual learning capability:** Supports adaptive improvement via memory rewriting and retention without modifying model weights.
    
- **Strong benchmark performance:** Shows high accuracy on demanding benchmarks like **GAIA** and **DeepResearcher**.
    
- **Transparent learning process:** Uses a case-based memory system that can be audited, edited, or reset by developers.
    
- **Practical tooling ecosystem:** Includes web search, crawling, multimedia processing, and document parsing tools in its open-source repository.
    

#### ⚠️ **Cons:**

- **Complex memory management:** Requires effective handling of memory growth, retrieval accuracy, and pruning to avoid irrelevant or misleading recalls.
    
- **Limited capability growth:** Without weight updates, the agent may struggle on tasks requiring new reasoning skills rather than memory reuse.
    
- **Benchmark-specific optimization:** Most improvements are shown on deep research tasks—generalizability to other domains (e.g., robotics, AR/VR) is unclear.
    
- **Infrastructure overhead:** Requires systems for browsing, sandboxed execution, storage, and knowledge retrieval.
    
- **Opaque metrics:** Reported performance results lack detailed reproducible numbers in some cases, requiring further validation through leaderboards.
    

---

### **2. DeerFlow by ByteDance**

**GitHub Repository:** [Bytedance/deer-flow](https://github.com/bytedance/deer-flow)

**Overview:**  
DeerFlow is a community-driven deep research framework developed by ByteDance. It combines LLMs with tools like web search, crawling, Python execution, and multi-agent architectures to automate research workflows end-to-end. The system decomposes user queries, gathers and analyzes data, executes code, and generates reports or presentations.

#### ✅ **Pros:**

1. **End-to-end research automation:** Supports complete workflows—from question understanding to report generation.
    
2. **Modular multi-agent architecture:** Components like Planner, Researcher, Coder, and Reporter make it extensible and maintainable.
    
3. **Integrated tool ecosystem:** Built-in access to web search, crawling, Python execution, document generation, and data analysis.
    
4. **Open-source and community-focused:** MIT-licensed with transparent code and active contributions.
    
5. **Multi-format outputs:** Generates reports, PowerPoint presentations, and even podcast-style audio summaries.
    
6. **Human-in-the-loop design:** Users can refine research stages, validate intermediate outputs, and ensure reliability.
    

#### ⚠️ **Cons:**

1. **High setup complexity:** Requires Python 3.12+, Node.js 22+, search/AI API keys, and system configurations, making onboarding difficult for beginners.
    
2. **Dependency on third-party services:** Relies on external APIs (Tavily, Brave Search, ArXiv, TTS) which may introduce latency, costs, or access restrictions.
    
3. **Risk of misinformation:** Automated summarization and code execution can produce incorrect or biased results without human supervision.
    
4. **Complex coordination between agents:** Multi-agent orchestration can create failure points or unpredictable behavior if not properly configured.
    
5. **Lack of standardized benchmarks:** Few peer-reviewed evaluations are available to measure performance against other research agents.
    
6. **Resource-intensive:** Requires strong local or cloud-based compute resources for crawling, API calls, and execution tasks.
    
7. **Narrow domain focus:** Optimized for research tasks, not real-time systems, robotics, or high-risk operational environments.
    

---

### **3. AutoGen & DeepResearcher**

#### **🔹 AutoGen (by Microsoft Research)**

**Overview:**  
AutoGen is an open-source framework for building **conversational multi-agent systems** using LLMs. It enables multiple AI agents—and even humans—to collaborate to solve complex tasks such as coding, research, debugging, and decision-making. Each agent can be given roles, goals, tools, and memory.

**✅ Pros:**

- **Multi-agent collaboration:** Agents (e.g., Coder, Critic, Planner) can communicate autonomously to solve tasks.
    
- **Human-in-the-loop flexibility:** Users can intervene at any step or allow full automation.
    
- **Tool and API integration:** Agents can use Python execution, web search, file systems, and custom tools.
    
- **Highly customizable:** Developers can define workflows, agent personas, memory, and stopping rules.
    
- **Great for coding & reasoning tasks:** Strong performance in code generation, debugging, and mathematical reasoning.
    

**⚠️ Cons:**

- **Lacks built-in deep web research stack** (no native crawling, document extraction like DeerFlow).
    
- **Not optimized for real-world research outputs** like PDF reports, PPTs, or academic summaries.
    
- **Scalability issues** with many agents—can become hard to manage or debug.
    
- **Higher token usage/costs** due to multi-agent dialogues.
    
- **Requires careful prompt & memory design** to avoid loops or irrelevant conversations.
    

---

#### **🔹 DeepResearcher (by Tencent)**

**Overview:**  
DeepResearcher is a reinforcement-learning based framework designed for **autonomous deep web research**. Unlike prompt-only agents, it **trains LLM agents using real web environments**—search engines, browsing, tool use—and optimizes them using reward signals.

**✅ Pros:**

- **RL-based improvement:** Agents learn to plan, search, verify, and summarize information over time — not just follow prompts.
    
- **Real web interaction:** Uses actual browsing/search APIs for up-to-date results.
    
- **Strong benchmark performance:** High scores on **GAIA, WebCPM, HotpotQA, and FEVER**.
    
- **Modular architecture:** Includes planner, browser, knowledge verifier, and summarizer agents.
    
- **Focus on truthful reasoning and citation-based answers.**
    

**⚠️ Cons:**

- **Heavy computational requirements:** Training needs GPUs, RL infrastructure, and simulated web environments.
    
- **Not fully plug-and-play:** More of a research framework than a ready-to-use product like DeerFlow.
    
- **Hard to reproduce experiments** due to dependency on specific environments and reward settings.
    
- **Still dependent on base LLM limitations** (hallucination, outdated knowledge if no web use).
    
- **Closed-source training details in some areas** (though inference pipeline is open).
    

---

### ✅ **Comparison Table**

|Feature|**Memento**|**DeerFlow**|**AutoGen**|**DeepResearcher**|
|---|---|---|---|---|
|Agent Adaptation|Memory + RL (no LLM tuning)|Modular tool-based research|Multi-agent conversations|RL-trained web research|
|Fine-tuning Required?|❌ No|❌ No|❌ No|✅ Yes (RL Finetuning)|
|Web Search & Crawling|✅ Yes|✅ Yes|⚠️ Limited (via plugins)|✅ Native support|
|Code Execution|✅ Yes|✅ Yes|✅ Yes|✅ Yes|
|Output Formats|Text only|Text, PPT, Audio|Text only|Text + citations|
|Best For|Adaptive agents, memory|Research automation|Coding & multi-agent tasks|Truthful deep web research|
|Setup Complexity|Medium|High|Medium|Very High|

---

# **Week 2 Summary**

### **1. Implementing Vosk Speech Recognition System**

**GitHub Repository:** [alphacep/vosk-api](https://github.com/alphacep/vosk-api)

**Overview:**  
Vosk is an open-source speech recognition toolkit that supports offline real-time transcription with lightweight models. It works across platforms like Python, Java, C++, and Android.

**✅ Key Highlights:**

- Successfully tested ASR (Automatic Speech Recognition) with pre-trained English and Hindi models.
    
- Integrated microphone streaming for live transcription.
    
- Explored JSON-based structured output (text + word timestamps).
    

**⚠️ Challenges:**

- Accuracy drops in noisy environments.
    
- Limited support for domain-specific terminology unless custom models are trained.
    

---

### **2. Exploring SpeechBrain (for Speech Models)**

**GitHub Repository:** [speechbrain/speechbrain](https://github.com/speechbrain/speechbrain)

**Overview:**  
SpeechBrain is an open-source toolkit based on PyTorch for speech-related tasks like ASR, speaker recognition, speech enhancement, and emotion detection.

**✅ Work Done / Features:**

- Reviewed ASR pipelines using Transformer and CRDNN-based models.
    
- Understood training vs. inference workflows.
    
- Identified ability to fine-tune custom datasets for specific domains.
    

**⚠️ Challenges:**

- Requires GPU for training larger models.
    
- More complex configuration compared to Vosk.
    

---

### **3. Implementing Wav2Vec 2.0 (Meta AI)**

**GitHub (Models via HuggingFace):** `facebook/wav2vec2-base-960h`

**Overview:**  
Wav2Vec 2.0 is a self-supervised speech model that learns from raw audio without transcriptions and achieves high accuracy after fine-tuning.

**✅ Achievements:**

- Loaded pre-trained Wav2Vec2 using HuggingFace and transcribed sample .wav files.
    
- Explored fine-tuning pipeline for Indian languages using Common Voice dataset.
    

**⚠️ Challenges:**

- Requires GPU for fine-tuning.
    
- Larger models (Wav2Vec2-Large) consume high VRAM.
    

---

### **4. Testing OpenAI Whisper (Automatic Speech Recognition)**

**Tool Used:** `openai-whisper` & Ollama Whisper models

**Overview:**  
Whisper is a multilingual ASR model by OpenAI with high accuracy in transcription and translation.

**✅ Achievements:**

- Tested small, medium, and tiny models.
    
- Transcribed English + Hindi audio.
    
- Used `whisper.cpp` and `Ollama dimazv/whisper-tiny` for on-device inference.
    

**⚠️ Challenges:**

- Larger models need GPU/Apple Silicon for real-time transcription.
    
- Tiny models are fast but less accurate.
    

---

### **5. Testing Ollama’s Whisper Model (`dimazv/whisper-tiny`)**

**Overview:**  
Used lightweight Whisper variant through Ollama for local transcription.

**✅ Observations:**

- Extremely fast inference on CPU.
    
- Works offline and supports multi-language inputs.
    
- Integrated easily with Python API + local LLMs (Gemma, GPT-OSS).
    

**⚠️ Limitations:**

- Lower accuracy on noisy speech or mixed languages.
    
- No speaker diarization.
    

---

|Feature / Model|**OpenAI Whisper**|**Wav2Vec 2.0 (Meta AI)**|**Vosk**|**SpeechBrain**|
|---|---|---|---|---|
|**Type**|End-to-end encoder–decoder ASR|Self-supervised speech model|Offline speech recognition toolkit|Modular speech processing framework|
|**Offline Capability**|✅ Yes (via whisper.cpp / Ollama)|✅ Yes (HuggingFace, fine-tuned models)|✅ Yes|✅ Yes|
|**Languages Supported**|~99+ languages (multilingual)|Mostly English (few multilingual models)|Depends on model (20+ languages)|Multi-language (via custom/pretrained models)|
|**Accuracy**|⭐⭐⭐⭐⭐ (Very High)|⭐⭐⭐⭐ (High after fine-tuning)|⭐⭐⭐ (Moderate, depends on model)|⭐⭐⭐⭐ (High with right configuration)|
|**Real-time Performance**|Medium (small models only)|Moderate / GPU-dependent|✅ Excellent (low latency)|Medium (depends on model size)|
|**Hardware Requirements**|High (GPU recommended for large models)|High for training, moderate for inference|Low (CPU-friendly)|Medium to High (GPU preferred)|
|**Model Size**|39MB (tiny) → 1.5GB (large)|95MB (base) → 1GB+ (large)|Small (50–200MB)|Varies (50MB to 1GB)|
|**Fine-tuning Support**|❌ Not open for fine-tuning (only inference)|✅ Yes (self-supervised + supervised)|⚠️ Limited—requires Kaldi training|✅ Yes (supported with custom datasets)|
|**Best Use Cases**|Multilingual transcription, translation, noisy audio|Domain-specific ASR, research, custom dataset training|Lightweight offline voice recognition (IoT, embedded)|Research, speaker ID, ASR, emotion, diarization|
|**Ease of Use**|✅ Easy (pip install whisper)|Medium (requires HuggingFace + PyTorch)|✅ Very Easy (lightweight API)|Medium (needs config & scripting)|
|**Open-source License**|MIT (but weights from OpenAI)|Apache 2.0 (via Facebook / HuggingFace)|Apache 2.0|Apache 2.0|
|**Unique Features**|Translation + transcription + timestamping|Self-supervised learning on raw audio|Lightweight, runs on Raspberry Pi, Android|Complete speech ecosystem (ASR + speaker + emotion)|

---

#### ✅ **Comparision Table**
|If you need...|Use This Model|
|---|---|
|Multilingual, high accuracy speech-to-text|**Whisper**|
|Custom ASR training on your dataset|**Wav2Vec 2.0**|
|Lightweight offline speech recognition|**Vosk**|
|Full speech AI pipeline (ASR + speaker ID + emotion)|**SpeechBrain**|

### **6. Implementing Self-RAG (Text-based Retrieval-Augmented Generation)**

**Overview:**  
Self-RAG is a technique where the LLM retrieves external knowledge dynamically and generates responses using context-aware reasoning.

**✅ Progress:**

- Built a pipeline using local vector databases (FAISS/Chroma).
    
- Tokenized and embedded documents using sentence-transformers.
    
- Integrated retrieval + response generation into a single LLM pipeline.
    

---

### **7. Explored **SIM-RAG vs Self-RAG**

|Feature|Self-RAG|SIM-RAG (Simple RAG)|
|---|---|---|
|Retrieval Type|Dynamic + Self-evaluation|Static retrieval from vector DB|
|Feedback Loop|Model verifies and improves answer|No self-correction|
|Accuracy|Higher due to iterative refinement|Basic, sometimes shallow responses|
|Complexity|Medium to High|Low (simpler to implement)|

---

### **8. Integrated Text + Image-based Self-RAG using Ollama & GPT-OSS**

**Models Used:**

- `ollama gemma3:1b`
    
- `gpt-oss:20b-cloud`
    

**✅ Achievements:**

- Processed **images using Vision API + embeddings**.
    
- Converted image features into vector representations for retrieval.
    
- Combined **text & image context** before query generation.
    
- Successfully tested Image Question Answering (IQA) + Document-based RAG.
    

**⚠️ Challenges:**

- Image embedding models increase memory usage.
    
- Slow inference on CPU-only systems.
    
- Needs optimized prompt design for multimodal reasoning.

---

# **Week 3 Summary**

This week focused on exploring and comparing multiple Python libraries for extracting data from PDF files—both text-based and scanned (image-based) documents.

---

### **1. PyMuPDF (Fitz)**

**Overview:**  
PyMuPDF (Fitz) is a fast and lightweight library that enables access to PDF, XPS, EPUB, and image documents. It supports text extraction, image extraction, metadata parsing, and annotations.

**✅ Key Features:**

- Extracts **structured text with coordinates** (`page.get_text("dict")` / `"blocks"`).
    
- Can extract **images, fonts, metadata, hyperlinks, and annotations**.
    
- Supports **highlighting, editing, and rendering pages as images**.
    

**⚠️ Limitations:**

- Not ideal for handwritten/scanned PDFs (requires OCR integration).
    
- Outputs raw coordinates—requires manual formatting for clean datasets.
    

---

### **2. PyPDF / PyPDF2**

**Overview:**  
PyPDF (formerly PyPDF2) is a pure-Python library mainly used for PDF manipulation—merging, splitting, rotating, watermarking, and basic text extraction.

**✅ Pros:**

- Lightweight and easy to use for **splitting, merging, and metadata extraction**.
    
- Good for **searchable (digitally generated) PDFs**.
    
- No external dependencies.
    

**⚠️ Cons:**

- **Poor at extracting layout-aware structured text**.
    
- Does **not support OCR or scanned PDFs**.
    
- No support for extracting images or table formats.
    

---

### **3. Pytesseract (OCR using Tesseract + PDF as Images)**

**Overview:**  
Pytesseract is a Python wrapper for the Tesseract OCR engine. It extracts text from **scanned or image-based PDFs** by converting pages into images.

**✅ Pros:**

- Works well for **non-searchable PDFs and scanned documents**.
    
- Supports multiple languages via Tesseract language packs.
    
- Can extract text from **images, tables, handwritten text (partially)**.
    

**⚠️ Cons:**

- Requires conversion of PDF to images (`pdf2image` or PyMuPDF rendering).
    
- **Accuracy depends on scan quality / noise**.
    
- Slower than text-based parsers and lacks layout retention.
    

---

### **4. PDFPlumber**

**Overview:**  
PDFPlumber is a powerful tool for parsing **structured elements like tables, lines, words, and characters** from text-based PDFs.

**✅ Pros:**

- Accurate **table extraction** with layout retention.
    
- Provides coordinates for **characters, words, lines, and shapes**.
    
- Ideal for **invoice processing, forms, academic papers, structured layouts**.
    

**⚠️ Cons:**

- Works only with **text-based PDFs** (not scanned).
    
- Slower for large PDFs compared to PyMuPDF.
    

---

### **5. PDFMiner**

**Overview:**  
PDFMiner is a low-level PDF parsing library focused entirely on text extraction and layout analysis.

**✅ Pros:**

- Extracts text with **font size, style, position, and layout**.
    
- Good for extracting **page structure and hierarchies**.
    
- Useful for PDF-to-HTML conversion.
    

**⚠️ Cons:**

- **Slower and more complex API** compared to PDFPlumber or PyMuPDF.
    
- Does not support images extraction.
    
- Struggles with scanned/non-searchable PDFs.
    

---

### ✅ **Comparison Table**

|Library|Extracts Text|Extracts Tables|OCR Support|Layout Aware|Scanned PDF Support|
|---|---|---|---|---|---|
|PyMuPDF|✅ Yes|❌ Limited|❌ No|✅ Yes|❌ No (unless combined with OCR)|
|PyPDF|✅ Yes|❌ No|❌ No|❌ Minimal|❌ No|
|Pytesseract|✅ Yes (via OCR)|❌ Limited|✅ Yes|❌ No (plain text)|✅ Yes|
|PDFPlumber|✅ Yes|✅ Yes (best)|❌ No|✅ Yes|❌ No|
|PDFMiner|✅ Yes|❌ Limited|❌ No|✅ Yes|❌ No|

---

### **6 FAISS (Facebook AI Similarity Search)**

**Overview:**  
FAISS is a **fast, lightweight, local vector search library** used to store high-dimensional embeddings and retrieve similar text passages using cosine similarity or inner product.

**✅ What was implemented:**

- Extracted PDF text → Created text chunks (300–500 words).
    
- Converted chunks into embeddings using Sentence Transformers (`all-MiniLM-L6-v2`).
    
- Stored embeddings in **FAISS IndexFlatL2 / IndexHNSW**.
    
- Implemented top-k semantic search for question answering.
    

**⚡ Pros:**

- Very fast similarity search.
    
- Works offline, no server required.
    
- Good for prototyping RAG locally.
    

**⚠️ Limitations:**

- No built-in metadata filtering (like author, page number).
    
- No persistent storage unless manually saved as `.index` files.
    
- Not ideal for multi-user or production environments.
    

---

### **7 Qdrant (Cloud & Local Vector Database)**

**Overview:**  
Qdrant is a **production-ready vector database** with support for filtering, metadata storage, REST API, and scalable deployment.

**✅ What was implemented:**

- Deployed Qdrant locally via Docker.
    
- Created a collection called `"pdf_documents"`.
    
- Stored text embeddings + metadata (`{"source": "manual.pdf", "page": 12}`).
    
- Ran vector search with **semantic similarity + metadata filters**.
    

**⚡ Pros:**

- Supports **filters + metadata querying** (`page`, `file_name`, `section`).
    
- Persistent storage (unlike FAISS).
    
- Cloud or on-prem deployment possible.
    
- Works with Python, REST API, or FastAPI.
    

**⚠️ Limitations:**

- Slightly slower than FAISS for pure vector search.
    
- Requires running a server (Docker or cloud).
    
- More setup compared to FAISS.

### ✅ **Comparison Table**
|Feature|**FAISS**|**Qdrant**|
|---|---|---|
|Deployment|Local / In-memory|Local or Cloud server-based|
|Persistence|Manual (.index file)|Automatic database storage|
|Metadata|❌ Not supported|✅ Yes (JSON payloads)|
|Filtering|❌ No|✅ Yes (filter by fields)|
|Speed|🚀 Very Fast|⚡ Fast, but slightly slower|
|Best For|Prototyping, offline RAG|Production-ready RAG systems|

### **8. Implementing Rerankers (Re-Ranking in RAG Pipelines)**

In a standard RAG (Retrieval-Augmented Generation) system:  
**User Query → Vector Search (FAISS/Qdrant) → Top-k Documents → LLM → Answer**

However, vector search alone may return **semantically similar but contextually irrelevant results**.  
To improve accuracy, a **Reranker/ReRanker Model** is added after retrieval to re-score and reorder the search results based on relevance to the user’s query.

This step is called **Re-ranking** or **Reranker Stage**, and models like **Cross-Encoders (BERT, MiniLM, bge-reranker, colbert)** are commonly used.

|Problem with Basic Vector Search|How Reranker Solves It|
|---|---|
|Returns top-k results based only on cosine similarity.|Ranks based on deeper query-passage understanding.|
|Important context may appear in lower results (rank 10–20).|Reranker rescans results and brings the best to the top.|
|Vector embeddings are shallow (bag of semantics).|Rerankers use cross-attention (query + document together).|
|You risk hallucination if wrong context is used.|Reduces hallucination by giving LLM the **most accurate context**.|

#### **Types of Reranker Models**
|Type|Description|Example Models|
|---|---|---|
|**Cross-Encoders**|Encode _(query + document)_ together → score relevance.|`bge-reranker-large`, `ms-marco MiniLM`, `ColBERT`, `MonoT5`|
|**Bi-Encoders (simple embedding)**|Encode separately → only embedding similarity.|`sentence-transformers`, `BERT base`|
|**Hybrid Reranker**|Combine vector score + lexical score + cross-encoding.|BM25 + FAISS + Reranker|

#### **Limitations** ⚠️ 
|Limitation|Description|
|---|---|
|❌ Slower than embedding-only search|Because each query+doc pair is re-processed through transformer|
|❌ Requires GPU for large models (`bge-large`, `monoT5`)|Otherwise inference is slow|
|❌ Cannot handle large batch sizes unless optimized|Memory management needed|
|❌ Works only after first retrieval step|It doesn’t search, only refines|

### **9. Explored Rex-Omni: Detect Anything via Next Point Prediction**

**Website:** [rex-omni.github.io](http://rex-omni.github.io/)
**Paper:** [Rex-Omni Research Paper][https://arxiv.org/pdf/2510.12798]
**GitHub Repository:** [IDEA-Research/Rex-Omni](https://github.com/IDEA-Research/Rex-Omni)

**Rex-Omni** is a new **foundation model for universal object detection**, capable of detecting _anything_ (objects, parts, shapes, landmarks) using a **Next Point Prediction (NPP)** approach.  
Unlike traditional detectors (YOLO, Mask R-CNN) that rely on bounding boxes or segmentation masks, Rex-Omni predicts object structures as **sequences of points**, enabling high flexibility for:

- Object detection
    
- Keypoint detection
    
- Instance & semantic segmentation
    
- Open-vocabulary detection
    
- Referring (text-guided) object localization

### 🚀 **Key Features**

|Capability|Description|
|---|---|
|**Next Point Prediction (NPP)**|Objects are represented as sequential points instead of bounding boxes.|
|**Detect Anything**|Works for objects, parts, contours, landmarks, and object boundaries.|
|**Unified Model**|A single model supports segmentation, detection, visual grounding, and keypoints.|
|**Open-Vocabulary & Multimodal**|Supports text prompts like “find the wrench near the valve”.|
|**Strong Performance**|Competes with state-of-the-art on COCO, LVIS, and keypoint datasets.|

---

### 🛠️ **Architecture Summary**

Rex-Omni consists of three main components:

|Component|Function|
|---|---|
|**Vision Encoder (ViT / Swin Transformer)**|Extracts visual features from images.|
|**Point Sequence Generator (NPP Model)**|Predicts object boundaries or keypoints sequentially.|
|**Multimodal Text Encoder (for grounding)**|Accepts natural language prompts for object-specific search.|

---

### ✅ **Pros**

- **Unified detection framework** → replaces multiple task-specific models.
    
- **More flexible than bounding box detectors** → works on contours, thin objects, or irregular shapes.
    
- **Enables vision-language tasks** → can detect objects using natural language.
    
- **Open-source & actively maintained** with pretrained models and demo notebook.
    
- **Great for robotics, AR/VR, industrial inspection, and smart documentation systems**.
    

---

### ⚠️ **Cons / Limitations**

- **High computational cost** (requires GPU for real-time usage).
    
- **Complex architecture** → harder to deploy on edge devices compared to YOLO.
    
- **Still research-stage** with fewer real-world industry integrations.
    
- **Relies heavily on high-quality image input** → weak in low-light or blurry environments.
    

---

### 💡 **Possible Use in IETM + AR/VR Project**

|Use Case|Application Idea|
|---|---|
|**Maintenance Manuals (IETM)**|Detect machinery parts in real-time and overlay repair steps.|
|**AR/VR Assistance**|In XR headsets, highlight exact screws, wires, or machine parts to work on.|
|**Interactive Technical Diagrams**|Automatically convert mechanical diagrams into clickable 3D components.|
|**Object Tracking in Training Simulations**|Guide trainees by detecting tools and ensuring correct workflow sequence.|

### 📊 **Comparison: Rex-Omni vs YOLO vs SAM vs DETR**

|Feature / Model|**Rex-Omni**|**YOLO (v8/v9)**|**DETR (Transformers)**|**SAM (Segment Anything Model)**|
|---|---|---|---|---|
|**Primary Task**|Detect anything using **Next Point Prediction (NPP)**|Fast real-time **bounding box detection**|Transformer-based **object detection & segmentation**|**Zero-shot segmentation** (given click/box/prompt)|
|**Output Type**|Sequence of **points (contours, keypoints, masks)**|**Bounding boxes + class labels**|**Bounding boxes + masks** via attention|**Pixel-accurate mask**|
|**Supports Segmentation?**|✅ Yes (via point sequences)|⚠️ Only in YOLO-Seg versions|✅ Yes (DETR + Mask-DETR)|✅ Yes|
|**Open-Vocabulary (Text Prompt Detection)**|✅ Yes (detect via language prompts)|❌ No|⚠️ Limited (requires OV-DETR)|✅ Yes (with prompts)|
|**Handles Irregular Shapes (contours)**|✅ Excellent|❌ Bounding box only|⚠️ Moderate|✅ Yes|
|**Detects Object Parts / Keypoints**|✅ Yes (landmarks, edges, contours)|⚠️ Limited (only with YOLO-Pose variants)|✅ Yes (DETR-Pose)|❌ Not intended for keypoints|
|**Real-time Speed**|❌ Slower (heavy vision transformer + NPP)|✅ Very Fast (30–120 FPS on GPU)|⚠️ Moderate (~10–20 FPS)|⚠️ Slow to Moderate|
|**Training Complexity**|⚠️ High (sequential point training)|✅ Low (easy to train/dataset ready)|⚠️ Medium-High|❌ No training (foundational model)|
|**Works on Scanned Manuals / CAD / Technical Docs?**|✅ Yes (point-based = precise shapes)|⚠️ Only coarse detection|✅ Possible with fine-tuning|✅ Excellent with high-res input|
|**Best Use Cases**|AR manuals, robotics, part detection, scientific/medical tasks|CCTV, autonomous vehicles, face/person detection|Research-grade detection, segmentation, high accuracy|Object segmentation, annotation tools, editing|
|**Model Size**|⚠️ Large (ViTs, multi-task)|✅ Small to medium (10–200MB)|⚠️ Medium to large|⚠️ Very large (2–4GB)|
|**Open Source**|✅ Yes|✅ Yes|✅ Yes|✅ Yes (Meta AI)|

---

### ✅ **Summary – When to Use What?**

|If you want to…|Use This|
|---|---|
|Detect **irregular-shaped objects, parts, or contours**|✅ **Rex-Omni**|
|Do **fast real-time object detection (CCTV, drones, defense systems)**|✅ **YOLO**|
|Do **high-precision, end-to-end detection + segmentation using transformers**|✅ **DETR**|
|**Extract object masks with a single click or prompt**|✅ **SAM (Segment Anything)**|
|Build **IETM/AR VR part-aware manuals or machine part intelligence**|✅ **Rex-Omni** or SAM + Rex-Omni combo|

## **Week 4 Summary**

### **RAG with vision encoder with relevant inputs**

#### ✅ **1) Multimodal RAG with Vision Encoders**

##### **🔹 Overview**

This week, work progressed from traditional text-only RAG to **Multimodal Retrieval-Augmented Generation (MM-RAG)**—where models can retrieve and reason over both **visual (images, diagrams, scanned PDFs)** and **textual knowledge**.  
This is critical for applications like **IETM manuals**, **AR-based equipment maintenance**, and **technical diagrams understanding**, where information is often visual.

#### ✅ **2) Implemented Multimodal RAG**

##### **✔ Implementation Steps Completed:**

|Stage|Description|
|---|---|
|**PDF/Image Parsing**|Used PyMuPDF + OCR for diagrams, technical images.|
|**Embedding Generation**|Used **CLIP** for image & text embeddings, stored in **FAISS/Qdrant**.|
|**Cross-modal Retrieval**|Text→Image and Image→Text retrieval enabled.|
|**Reranking Added**|Used **Cross-Encoder / CLIP-Reranker** to reorder Top-K results for accuracy.|
|**Final QA Generation**|Used a vision-language model (e.g., LLaVA / BLIP-2) to answer using Top-3 most relevant results.|

---

#### ✅ **3) What is a Reranker & Why It Matters?**

##### **🛑 Problem in Basic RAG (without reranker):**

- FAISS/Qdrant ranks results using vector cosine similarity only.
    
- Retrieved results may be **semantically close but contextually irrelevant**.
    
- Leads to **hallucination or incorrect answers** by the LLM.
    

##### **✅ Solution: Reranking Layer**

- Re-scores the retrieved documents **using a more accurate model** that reads both **query + document together**.
    
- Example models:
    
    - **bge-reranker-large**
        
    - **CrossEncoder(ms-marco-MiniLM)**
        
    - **CLIP-based cross-attention reranker for image matching**

#### ✅ **4) Multimodal RAG Approaches (with Reranking Perspective)**

|Approach|How Retrieval Works|Supports Reranking?|Best For|
|---|---|---|---|
|**CLIP Dual Encoder**|Image ↔ Text embeddings|✅ Yes (CLIP-Score or Cross-Encoder)|Fast visual search|
|**BLIP-2 / InstructBLIP**|Q-Former encodes image tokens to LLM|✅ In-built attention|Instruction-aware image reasoning|
|**Florence-2**|OCR + grounding + image caption embedding|✅ + Region reranking|Diagrams, documents, manuals|
|**Hierarchical RAG (Wiki-LLaVA)**|Stage 1: Caption retrieval; Stage 2: image-level rerank|✅ Yes|Large datasets + cost-efficient|
|**Self-RAG with Reflection**|Model critiques retrieval and requests more if needed|✅ Self-reranking|Autonomous agents|

#### ✅ **5) Comparison — Reranker Impact on Multimodal RAG**
|Feature|No Reranker|With Reranker|
|---|---|---|
|Accuracy|❌ Medium|✅ High|
|Hallucinations|❌ Frequent|✅ Reduced|
|Visual-Text Matching|Basic cosine score|✅ Cross-attention relevance|
|Industrial Use Readiness|❌ Prototype only|✅ Deployment-ready|
|Example Use Case|“Find any pump image”|“Find correct pump valve diagram on page 4 of manual”|

#### Sources of my reading

**Research Paper:** [mR<sup>2</sup>AG](https://arxiv.org/pdf/2411.15041)
Point to Note: please read `Supplementary Material` 

**Blog:** [RAG + llama3](https://zilliz.com/blog/multimodal-RAG-with-CLIP-Llama3-and-milvus)

**Technical Blog of: **[Nvidia](https://developer.nvidia.com/blog/an-easy-introduction-to-multimodal-retrieval-augmented-generation/)

**Research Paper:** [WavRAG](https://arxiv.org/pdf/2502.14727)

**Fine Tune Embeddung Model** [YouTube](https://www.youtube.com/watch?v=v28Pu7hsJ0s)