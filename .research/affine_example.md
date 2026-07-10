# Affine Warp Operation

Applies a 2D affine transformation matrix to translate, rotate, scale, and shear an image. It performs spatial coordinates mapping to warp the input image layout on a 2D canvas.

---

## 1. How to Use

The affine operation transforms coordinates from the input space to the output space using six control coefficients.

### CLI Syntax
```bash
imaginarium --affine "a,b,c,d,tx,ty" <input-image> <output-image>
```

### Basic Examples & Common Patterns

* **Standard Scaling & Translation:**
  * Command: `imaginarium --affine "1.5,0,0,1.5,50,100" input.png output.png`
  * Action: Scales the image size by $1.5\times$ horizontally and vertically, and offsets the result by $50$ pixels right and $100$ pixels down.

* **Pure Rotation (30 degrees clockwise):**
  * Formula: $\cos(30^\circ) \approx 0.866$, $\sin(30^\circ) = 0.5$
  * Command: `imaginarium --affine "0.866,0.5,-0.5,0.866,0,0" input.png output.png`
  * Action: Rotates the image clockwise around the origin $(0,0)$ (the top-left corner).

* **Pure Shear (Horizontal Slant):**
  * Command: `imaginarium --affine "1.0,0.3,0.0,1.0,0,0" input.png output.png`
  * Action: Skews the image horizontally with a shear factor of $0.3$.

---

## 2. Advice on Parameters

The operation expects exactly six float parameters: `--affine "a,b,c,d,tx,ty"`.

### Parameter Breakdown

| Parameter | Type | Unit | Range / Constraints | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `a` | Float | Multiplier | All real numbers | `1.0` | Horizontal scaling factor. Negative values flip horizontally. |
| `b` | Float | Slope | All real numbers | `0.0` | Horizontal shearing factor (skew coefficient). |
| `c` | Float | Slope | All real numbers | `0.0` | Vertical shearing factor (skew coefficient). |
| `d` | Float | Multiplier | All real numbers | `1.0` | Vertical scaling factor. Negative values flip vertically. |
| `tx` | Float | Pixels | All real numbers | `0.0` | Horizontal translation. Moves image right (positive) or left (negative). |
| `ty` | Float | Pixels | All real numbers | `0.0` | Vertical translation. Moves image down (positive) or up (negative). |

### Practical Guidance & Best Practices
* **Aspect Ratio Preservation:** To scale without distortion, ensure $a = d$ and $b = c = 0$.
* **Center of Transformation:** Affine transforms operate with respect to the origin $(0, 0)$ at the top-left of the image. To rotate or scale around the image center, you must combine translation, rotation, and translation back:
  1. Translate center to origin: $t_x = -W/2$, $t_y = -H/2$
  2. Apply scale/rotation
  3. Translate origin back to center: $t_x = +W/2$, $t_y = +H/2$
* **Determinant Check:** Ensure the mapping is invertible (see Technical Details below).

> [!WARNING]
> Setting $a = 0$ or $d = 0$ collapses the image along that axis, causing loss of image detail and a singular matrix error if reverse mapping is performed.

---

## 3. Technical Details

### Mathematical Formulation
The coordinate mapping maps a source coordinate $(x, y)$ to target coordinate $(x', y')$ via matrix multiplication:

$$
\begin{bmatrix}
x' \\
y' \\
1
\end{bmatrix}
=
\begin{bmatrix}
a & b & t_x \\
c & d & t_y \\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}
$$

Which translates to the system of linear equations:
* $x' = a \cdot x + b \cdot y + t_x$
* $y' = c \cdot x + d \cdot y + t_y$

### Implementation Specifics
* **Inverse Mapping (Source-to-Destination):** To avoid spatial gaps or artifacts in the destination canvas, the engine uses **backward lookup (reverse mapping)**. For each pixel in the destination image $(x', y')$, it applies the inverse matrix $M^{-1}$ to calculate the corresponding coordinate in the source image $(x, y)$:
  
  $$
  \begin{bmatrix}
  x \\
  y
  \end{bmatrix}
  =
  \frac{1}{ad - bc}
  \begin{bmatrix}
  d & -b \\
  -c & a
  \end{bmatrix}
  \begin{bmatrix}
  x' - t_x \\
  y' - t_y
  \end{bmatrix}
  $$
  
* **Interpolation:** Calculated fractional coordinates $(x, y)$ are interpolated using **Bilinear** (default) or **Bicubic** filtering to sample the final destination color, smoothing out aliasing.

> [!IMPORTANT]
> The matrix determinant ($ad - bc$) must be non-zero. If $ad - bc = 0$, the matrix is singular and cannot be inverted, which will cause the transformation to abort with an execution error.

### Performance & Resource Usage
* **Time Complexity:** $\mathcal{O}(W' \times H')$ where $W'$ and $H'$ are the dimensions of the destination canvas.
* **Memory Footprint:** $\mathcal{O}(1)$ auxiliary space. An off-screen buffer is allocated to store output, preventing write-after-read conflicts on the input.
* **Parallelization:** Supported on GPUs via fragment shaders and CPUs via multi-threaded tile processing.
