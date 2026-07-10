# [Operation Name]

[Provide a 1-2 sentence high-level summary explaining what the operation does, its typical use cases, and its physical/visual effect on the input image.]

---

## 1. How to Use

[Explain the basic usage of the operation, including CLI commands, basic examples, and common application scenarios.]

### CLI Syntax
```bash
imaginarium --[cli-flag] "[arguments]" <input-image> <output-image>
```

### Basic Examples & Common Patterns

* **[Pattern 1 Name]**
  * Command: `imaginarium --[cli-flag] "[example-args-1]" input.png output.png`
  * Action: [Brief description of the action and result.]
* **[Pattern 2 Name]**
  * Command: `imaginarium --[cli-flag] "[example-args-2]" input.png output.png`
  * Action: [Brief description of the action and result.]

---

## 2. Advice on Parameters

[Provide structured guidance on parameter selection, including defaults, ranges, combinations, and debugging tips.]

### Parameter Breakdown

| Parameter | Type | Unit | Range / Constraints | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `[param1]` | [e.g., Float] | [e.g., Pixels] | [e.g., `0.0` to `10.0`] | [e.g., `1.0`] | [What this parameter controls and how it behaves.] |
| `[param2]` | [e.g., Enum] | [e.g., Mode] | [e.g., `bilinear`, `bicubic`] | [e.g., `bilinear`] | [What this parameter controls and how it behaves.] |

### Practical Guidance & Best Practices
* **[Tip Title]:** [Provide tips on how to choose values for these parameters (e.g. performance implications, quality adjustments).]
* **[Tip Title]:** [Provide tips on how combinations of parameters interact.]

> [!WARNING]
> [Highlight common parameter combinations that result in errors, poor visual quality, or crashes.]

---

## 3. Technical Details

[Describe the underlying mathematics, algorithmic implementation, complexity, and internal logic of the operation.]

### Mathematical / Algorithmic Logic
[Include mathematical equations, pseudocode, or formal descriptions of how input pixels map to output pixels.]

$$
[Insert LaTeX formula here, e.g., f(x) = x^2]
$$

### Implementation Specifics
* **Coordinate Mapping:** [Describe whether the operation uses forward mapping, reverse mapping, or custom mapping logic.]
* **Interpolation & Aliasing:** [Detail how sub-pixel sampling is handled and what interpolation methods are available or defaulted.]

### Performance & Resource Usage
* **Time Complexity:** [e.g., $\mathcal{O}(W \times H)$ where $W$ and $H$ are dimensions...]
* **Memory Footprint:** [e.g., In-place processing, requires secondary buffer, etc.]
* **Parallelization:** [e.g., CPU multithreaded, GPU shader execution, SIMD accelerated.]
