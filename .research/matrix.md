Here is an extensive matrix of image processing filters. They are categorized by their primary computational family, function, mathematical core, and standard use case. [1] 
------------------------------
## The Image Processing Filter Matrix

| Filter Name | Computational Category | Primary Function / Visual Output | Key Mathematical Core | Classic Industry Use Case |
|---|---|---|---|---|
| Sepia [1] | Color Transformation | Warm, antique reddish-brown tint. | 3×3 Linear Color Matrix [1] | Retro/nostalgic image styling. |
| Bloom / Glow [2] | Multi-pass Shader [2] | Makes highlights bleed light outward. | Luminance Thresholding + Gaussian Blur + Additive Blending [3] | Video game engines & dream sequences. |
| Dehaze | Statistical Extraction | Removes atmospheric fog and smoke. | Dark Channel Prior + Transmission Inversion | Landscape photography & satellite imaging. |
| Vignette | Coordinate-Based Mapping | Darkens/fades image corners. | Euclidean Distance Calculation + Cosine-Fourth Approximation | Drawing focus to central subjects. |
| Split Toning | Spatial Color Mapping | Tint highlights and shadows differently. | Linear Interpolation (Lerp) over Luminance Values | "Teal and Orange" cinematic look. |
| Film Grain | Procedural Generation | Injects organic, gritty noise textures. | Box-Muller Transform (Gaussian Noise) + Midtone Masking | Breaking up sterile digital textures. |
| Graduated Density (GND) | Spatial Gradient | Smooth exposure ramp across an axis. | Vector Projection + Smoothstep Interp + Multiplicative Blending | Balancing bright skies in landscape shots. |
| Orton / Soften | Multi-layer Composite | Dreamy, high-contrast, glowing blur. | Layer Multiplication (Sharp Image × Overexposed Blur Layer) | Romantic portraits & ethereal landscapes. |
| ASC-CDL | Standardized Grading | Strict global primary color tweaks. | Slope, Offset, Power (SOP) + Luminance Saturation (SAT) | Cross-platform Hollywood film workflows. |
| Median | Non-linear Spatial | Deletes isolated noise without blurring. | Local Neighborhood Array Sorting + Median Selection | Removing "salt-and-pepper" sensor noise. |
| Sobel | Spatial Convolution | Extracts sharp structural outlines. | Dual 2D Convolution Kernels ($G_x$ / $G_y$) + Gradient Magnitude | Computer vision edge-detection & robotics. |
| Unsharp Mask | Frequency Domain | Sharpens edges by boosting micro-contrast. | Image Subtraction (I - Blur) + Amplified Addition | Print photography prepping & detail recovery. |
| Bilateral | Non-linear Spatial | Blurs flat areas but completely preserves edges. | Spatial Gaussian Kernel × Range Intensity Gaussian Kernel | Digital face-smoothing and skin retouching. |
| High-Pass | Frequency Domain | Deletes flat colors; extracts raw textures. | Inverse Low-Pass Subtract (I - Gaussian Lowpass) | High-end beauty retouching (Frequency Separation). |
| Laplacian | Spatial Convolution | Detects rapid shifts in absolute brightness. | Second-Derivative Multi-directional Matrix Kernel | Blurriness detection & rapid focal analysis. |
| Histogram Equalization | Global Intensity Mapping | Spreads out squished tones to maximize contrast. | Cumulative Distribution Function (CDF) Remapping | Improving visibility in X-rays & underwater sonar. |
| Box Blur | Linear Spatial | Quick, uniform blurring of image space. | Equal-Weight Neighbor Averaging (Mean Kernel) | High-speed processing & real-time UI background blurs. |
| Gaussian Blur | Linear Spatial | Smooth, physics-based, natural blurring. | 2D Bell-Curve Distribution Weighting | Simulating depth-of-field & pre-processing shadows. |
| Erode (Morphological) | Set-Theoretic Spatial | Shrinks bright shapes; expands dark regions. | Local Neighborhood Minimum Vector Selection | Text cleaning & binary mask cleanup in OCR. |
| Dilate (Morphological) | Set-Theoretic Spatial | Expands bright shapes; shrinks dark regions. | Local Neighborhood Maximum Vector Selection | Connecting broken lines in scanned blueprints. |

------------------------------
## Understanding the Four Major Families of Math Behind the Matrix
To see how these filters differentiate themselves under the hood, software developers and graphics engineers group them by their mathematical execution:
## 1. Color-Space Adjustments (Pixel-Independent)

* Examples: Sepia, Split Toning, ASC-CDL.
* The Math: These look at a pixel's RGB data completely in isolation. The software doesn't care what the surrounding pixels are doing. It takes (R,G,B), passes it through an algebraic function or matrix multiplication, and outputs a new color instantly. [2, 3] 

## 2. Spatial Convolution Kernels (Neighborhood-Dependent) [4] 

* Examples: Sobel, Laplacian, Box Blur, Gaussian Blur.
* The Math: These use a sliding window matrix (called a kernel). To calculate the new value for a single target pixel, the software must multiply and sum the values of all its neighboring pixels. This allows the computer to find visual textures, patterns, and borders. [5, 6, 7, 8, 9] 

## 3. Coordinate-Based Multipliers

* Examples: Vignette, Graduated Density.
* The Math: These ignore both the color data and the neighborhood data. Instead, they calculate changes based on where a pixel sits geographically on the screen grid (x, y), mapping curves relative to distance vectors or lines. [10, 11] 

## 4. Advanced Frequency / Statistical Pipelines

* Examples: Dehaze, Bilateral, Unsharp Mask, Median.
* The Math: These are highly sophisticated. They calculate spatial probabilities, sort data tables in real-time, or break down the image into separate high-frequency grids (sharp details) and low-frequency grids (broad color blocks) to rebuild the picture from scratch. [12, 13] 

Would you like to explore the specific programming code (like Python or GLSL Shader language) for any particular row in this matrix, or see how a few of these filters can be stacked together to create a custom visual style?

[1] [https://medium.com](https://medium.com/@rajat01221/image-and-signal-processing-72e2c054d3e4)
[2] [https://www.seas.upenn.edu](https://www.seas.upenn.edu/~cis120/archive/15fa/hw/hw06/index.shtml)
[3] [https://library.imaging.org](https://library.imaging.org/cic/articles/31/1/050403)
[4] [https://medium.com](https://medium.com/@johnsolomonlegara/filtering-through-the-noise-spatial-filters-and-morphological-operations-in-image-processing-4f038a729034)
[5] [https://itk.org](https://itk.org/ITKSoftwareGuide/html/Book2/ITKSoftwareGuide-Book2ch2.html)
[6] [https://enmap-box.readthedocs.io](https://enmap-box.readthedocs.io/en/rfc_spectral_properties/usr_section/usr_manual/processing_algorithms/convolution__morphology_and_filtering/spatial_convolution_box_filter.html)
[7] [https://towardsdatascience.com](https://towardsdatascience.com/image-classification-explained-to-my-grandma-665d81a31e9/)
[8] [https://cloudinary.com](https://cloudinary.com/guides/ai/ai-image-analysis)
[9] [https://en.wikipedia.org](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29)
[10] [https://lodev.org](https://lodev.org/cgtutor/filtering.html)
[11] [https://medium.com](https://medium.com/@sandamalpkp318/a-simple-guide-to-understanding-cnn-core-layers-for-image-processing-c4825c963570)
[12] [https://www.mdpi.com](https://www.mdpi.com/2076-3417/11/21/9975)
[13] [https://www.aimspress.com](https://www.aimspress.com/article/doi/10.3934/bdia.2024006?viewType=HTML)
