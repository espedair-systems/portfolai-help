A Negadoctor transformation is a highly specialized, non-linear colour mapping operation designed to invert digital scans of film negatives and simulate how they would look if physically printed onto photographic paper. [1, 2] 
Unlike a simple "invert color" filter—which blindly flips RGB pixels and leaves behind an ugly, muddy orange or gray mess—a Negadoctor transformation uses physics-based math to model the exact properties of analog film stocks and darkroom printing chemistry. It is most famous as an advanced processing engine within the open-source RAW photo editor [darktable](https://docs.darktable.org/usermanual/development/en/module-reference/processing-modules/negadoctor/). [1, 2, 3, 4] 
------------------------------
## Summary
When you use a digital camera or scanner to digitise a strip of film, you capture a negative image trapped inside a thick, orange-tinted plastic sheet (the film base). A Negadoctor transformation acts as a virtual darkroom pipeline. It samples that orange plastic to subtract its color bias, uses dynamic log-density formulas derived from Hollywood cinema systems (like the Kodak Cineon standard) to decode the image, and then applies a virtual "paper grade" constraint to render a perfectly balanced, vibrant positive photograph. [1, 2, 3, 5, 6] 
------------------------------
## How It Works Under the Hood: The 3-Stage Virtual Darkroom
To translate analog film data into digital reality, the transformation splits its math into three sequential processing tabs: [7] 

  [ Scanned Raw Negative ] 
             │
             ▼
┌─────────────────────────┐
│ 1. FILM PROPERTIES TAB  │ ──► Subtracts orange film base mask &
└─────────────────────────┘     sets minimum/maximum optical densities
             │
             ▼
┌─────────────────────────┐
│   2. CORRECTIONS TAB    │ ──► Neutralises unwanted shadow/highlight
└─────────────────────────┘     color shifts (white balance correction)
             │
             ▼
┌─────────────────────────┐
│ 3. PRINT PROPERTIES TAB │ ──► Simulates analog photo paper exposure,
└─────────────────────────┘     gamma contrast (paper grade), & gloss
             │
             ▼
  [ Final Positive Master ]


* Stage 1: Film Calibration (D-Min / D-Max): The user uses an eyedropper tool to sample an unexposed patch of the film border. The code locks this value as D-Min (Minimum Density), mathematically wiping out the heavy orange cast. It then samples the darkest part of the negative to establish D-Max (Maximum Density) as the new digital highlight white point. [5, 8, 9, 10] 
* Stage 2: White Balance Correction: Because different film brands (like Kodak Gold vs. Fujifilm Superia) respond uniquely to colors, individual channels degrade at uneven exponential rates. This step calculates independent color correction coefficients across highlights and shadows to flatten out unnatural color spilling. [5, 8, 11] 
* Stage 3: Paper Simulation: The software stops looking at the film and begins simulating photographic printing paper. It compresses specular highlights to mimic glossy paper, sets a black clipping barrier (Paper Black), and lets the user adjust the contrast curve slope using standard Paper Grades (e.g., Grade 2 for soft contrast, Grade 4 for hard contrast). [1, 2, 12] 

------------------------------
## Technical Details as a Digital Filter
The Negadoctor engine works directly with raw linear data arrays inside a scene-linear pipeline. [2, 3] 

* Logarithmic to Linear Reconstruction: Film records light logarithmically (by density steps). A Negadoctor transform takes this log-encoded data, inverts it, and linearizes the math so that common digital filters (like curves, sharpening, or exposure adjustments) can interact with the photo later without behaving backward or causing color glitches. [3, 13, 14] 
* Independent Exponents: To correctly reverse color negative film, the math cannot use uniform multipliers. In the underlying color science model, each color channel (Red, Green, Blue) uses a totally different mathematical exponent to account for the unique chemistry of the film's dye layers. [11] 
* Preservation of Analog Dynamic Range: Unlike a destructive curve adjustment that clips data, Negadoctor acts non-destructively. It compresses high-dynamic-range scanning data smoothly so details hiding in deep film shadows or dense highlights are saved from digital clipping. [13, 15, 16] 

------------------------------
## The Maths Used to Apply the Filter
The underlying mathematical model of a Negadoctor transformation relies on Cineon Logarithmic Inversion backed by non-linear exponent scaling and polynomial paper simulation curves. [3, 17] 
## 1. Neutralizing the Film Base (D-Min Subtraction)
Let $I_c(x,y)$ be the input pixel channel intensity from a linear scan. Let $D_{\min, c}$ be the sampled intensity value of the unexposed orange film base for that specific channel ($c \in \{R, G, B\}$). The film density ($D_c$) is calculated using a base-10 logarithm: [7, 9] 
$$D_c(x,y) = -\log_{10}\left( \max\left(10^{-5}, \; \frac{I_c(x,y)}{D_{\min, c}}\right) \right)$$ 
## 2. Dynamic Range Inversion and Channel Scaling
The density value is normalized between the minimum base value (0.0) and the maximum sampled image density ($D_{\max, c}$). The software applies a unique film stock exponent ($\gamma_{\text{film}, c}$) to each independent channel to correct for uneven chemical color sensitivities: [1, 8, 9, 11] 
$$V_{\text{linear}, c}(x,y) = \left( \frac{D_c(x,y)}{D_{\max, c}} \right)^{\gamma_{\text{film}, c}}$$ 
At this step, the image has successfully been inverted from a logarithmic negative into a clean, linearized digital positive. [3] 
## 3. Simulating the Photographic Paper Print (The Final Pass) [12] 
To transition from a flat positive to a finished print, the linearized values are mapped through a non-linear paper gamma function controlled by the user's Paper Grade parameter ($G_p$) and a Paper Black offset ($B_p$): [1, 8] 
$$Output_c(x,y) = \min\left(1.0, \; B_p + (1.0 - B_p) \cdot \left( V_{\text{linear}, c}(x,y) \right)^{G_p}\right)$$ 

* If a pixel has an inverted value of 0.0 (pure dark), the equation yields $Output = B_p$, guaranteeing shadows never drop beneath your chosen paper ink density floor.
* The exponent $G_p$ scales the midtone slope up or down, flawlessly simulating the physical behavior of traditional light-sensitive darkroom paper chemistry on a modern computer display. [1, 2] 

------------------------------
## ✅ Summary of Transformation Result
The mathematics of a Negadoctor transformation prove that by mapping log-encoded density vectors against isolated film base samples, dividing channel scales through non-uniform color dye exponents, and routing the resulting linear positive through a paper-grade emulation curve, software can flawlessly transform raw negative scans into true-to-life analog photographic prints. [2, 3, 11] 
If you have a collection of old family film negatives you want to digitize, let me know if you would like me to write a Python script using NumPy and OpenCV to show you how to code a custom negative-inversion module from scratch, or show you how to chain a Negadoctor pass inside a larger smart crop or adaptive sharpen pipeline! What would you like to build?

[1] [https://www.youtube.com](https://www.youtube.com/watch?v=On3BqhXYJM0)
[2] [https://docs.darktable.org](https://docs.darktable.org/usermanual/development/en/module-reference/processing-modules/negadoctor/)
[3] [https://github.com](https://github.com/darktable-org/darktable/issues/16579)
[4] [https://analoge-fotografie.net](https://analoge-fotografie.net/en/programs-for-converting-color-negatives/)
[5] [https://www.youtube.com](https://www.youtube.com/watch?v=Wse9jPK2XzI)
[6] [https://docs.darktable.org](https://docs.darktable.org/usermanual/4.0/en/module-reference/processing-modules/negadoctor/)
[7] [https://thatbeardedguy.photography](https://thatbeardedguy.photography/2024/08/23/how-i-invert-my-negatives-in-darktable-using-negadoctor/)
[8] [https://www.reddit.com](https://www.reddit.com/r/DarkTable/comments/yrufw6/negadoctor_workflow/)
[9] [https://www.reddit.com](https://www.reddit.com/r/DarkTable/comments/1jmw55z/film_negative_scanning_and_negadoctor_workflow/)
[10] [https://www.kodak.com](https://www.kodak.com/en/motion/page/glossary-of-motion-picture-terms/)
[11] [https://discuss.pixls.us](https://discuss.pixls.us/t/negadoctor-color-negative/43472)
[12] [https://docs.darktable.org](https://docs.darktable.org/usermanual/development/en/module-reference/processing-modules/negadoctor/)
[13] [https://ipalopezhentsev.github.io](https://ipalopezhentsev.github.io/photo/rawtherapee/software/2020/06/14/inverting-in-rawtherapee.html)
[14] [https://www.chrisbturner.com](https://www.chrisbturner.com/blog/value-inversion-in-computer-graphics)
[15] [https://cromanphoto.substack.com](https://cromanphoto.substack.com/p/tutorial-how-to-convert-black-and)
[16] [https://thatbeardedguy.photography](https://thatbeardedguy.photography/2024/08/23/how-i-invert-my-negatives-in-darktable-using-negadoctor/)
[17] [https://discuss.pixls.us](https://discuss.pixls.us/t/fixing-negative-underexposure-in-negadoctor/50370)
