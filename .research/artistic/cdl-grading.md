In image processing, a CDL grading filter is a standardized color correction tool that adjusts the primary color channels of an image using three specific mathematical operations: Slope, Offset, and Power, along with a final Saturation pass. [1, 2] 
## Summary
The term CDL stands for Color Decision List, which is a universal format created by the American Society of Cinematographers (ASC). Unlike creative, stylized filters like sepia or vignette, an ASC-CDL is a highly technical, industry-standard tool. It allows directors, cinematographers, and colorists working on movies to tweak the look of a shot on set and ensure those exact same color adjustments transfer perfectly across different editing and visual effects software applications without any changes. [3, 4, 5] 
------------------------------
## How It Works Under the Hood
A CDL filter does not rely on complex masks or image layers. Instead, it alters the raw pixel color channels uniformly across the entire image through a strict processing pipeline:

* Slope (Gain Adjustment): This multiplies the color values, primarily changing the bright highlights while leaving pure blacks at zero. [6, 7, 8] 
* Offset (Lift Adjustment): This adds or subtracts a flat value to all pixels, shifting the entire brightness baseline up or down (even changing pure black). [9] 
* Power (Gamma Adjustment): This applies an exponent to the values, stretching or compressing the midtones without shifting the absolute black or white points.
* Saturation: As a final step, it determines how vivid or monochrome the overall color spectrum is by blending color channels toward a gray luminance center.

------------------------------
## Technical Details as a Digital Filter
The ASC-CDL acts as a mathematical formula applied directly to the normalized RGB color channels inside a computer's GPU shader.

* Channel Independence: The Slope, Offset, and Power functions use individual, independent values for the Red, Green, and Blue channels. This gives the filter a total of 9 distinct color parameters, plus 1 global master parameter for Saturation (10 parameters total). [10] 
* Data Normalization: Before the math is processed, all pixel values are mapped to a decimal scale between 0.0 (pure black) and 1.0 (pure white).
* Interoperability: Because the math is dead-simple and standard across the globe, a CDL file is just a tiny text file or XML snippet. It contains the 10 numbers needed to instantly recreate a precise Hollywood color grade anywhere. [11, 12] 

------------------------------
## The Maths Used to Apply the Filter
The mathematical implementation of a CDL grading filter follows a rigid, step-by-step order of operations defined by the ASC.
## 1. The Core Color Formula (SOP)
For each individual color channel ($c \in \{R, G, B\}$), the algorithm applies the Slope (S), Offset (O), and Power (P) parameters in a strict math sequence:
$$V_{\text{out}} = \max\left(0, (V_{\text{in}} \cdot S) + O\right)^P$$ 

* Step 1: Multiply the input pixel value ($V_{\text{in}}$) by the Slope (S).
* Step 2: Add the Offset value (O) to that result.
* Step 3: Clamp the number so it cannot drop below 0.0.
* Step 4: Raise that clamped number to the mathematical power of P.

## 2. The Saturation Formula (SAT)
Once the SOP formula is applied to all three channels, a final color saturation pass is executed. First, the filter calculates the standard Rec. 709 luminance (Y) of the modified pixel: [13] 
$$Y = 0.2126 \cdot R_{\text{out}} + 0.7152 \cdot G_{\text{out}} + 0.0722 \cdot B_{\text{out}}$$ 
Then, using the global saturation parameter (s), the final color for each channel is calculated by interpolating between the monochrome luminance value and the color value:
$$R_{\text{final}} = Y + s \cdot (R_{\text{out}} - Y)$$ 
$$G_{\text{final}} = Y + s \cdot (G_{\text{out}} - Y)$$ 
$$B_{\text{final}} = Y + s \cdot (B_{\text{out}} - Y)$$ 

* If s = 0.0, the color terms completely cancel out, leaving a pure grayscale image (Y).
* If s = 1.0, the colors remain exactly as they were after the SOP pass.

------------------------------
## ✅ Summary of Formula Result
The mathematics of ASC-CDL grading prove that by applying sequential algebraic multipliers, additions, exponents, and luminance vector weights to independent RGB arrays, software can flawlessly exchange and render predictable color adjustments across any digital display engine.
If you want to see this tool in action, I can provide a Python function using NumPy to grade an image with raw CDL values, or explain the difference between a CDL filter and a 3D LUT (Look-Up Table)!

[1] [https://download.autodesk.com](https://download.autodesk.com/us/toxik/toxik2009help/html/BABBEFIE.html)
[2] [https://lowepost.com](https://lowepost.com/courses/blog/color-decision-list-explained-r30/)
[3] [https://docs.red.com](https://docs.red.com/955-0196_v1.6/Content/4_Menus/Image_LUT/CDL/01_Intro_CDL.htm)
[4] [https://www.abelcine.com](https://www.abelcine.com/articles/blog-and-knowledge/tutorials-and-guides/the-difference-between-luts-looks-and-scene-files)
[5] [https://www.reddit.com](https://www.reddit.com/r/cinematography/comments/17tglvx/questions_for_dits/)
[6] [https://scenery.io](https://scenery.io/plugins/asc-cdl-color-correction-yN2huHuWdEX/manual)
[7] [https://mixinglight.com](https://mixinglight.com/color-grading-tutorials/what-is-a-color-decision-list-cdl/)
[8] [https://krita-artists.org](https://krita-artists.org/t/color-corrector-for-scene-linear-workflow/1063)
[9] [https://www.vidio.ai](https://www.vidio.ai/blog/article/how-do-i-preserve-clientapproved-color-grades-when-roundtripping-between-davinci-resolve-and-premiere-pro)
[10] [https://lowepost.com](https://lowepost.com/courses/blog/color-decision-list-explained-r30/)
[11] [https://download.autodesk.com](https://download.autodesk.com/us/systemdocs/help/2009/lustre/html/CBHGJDFE.html)
[12] [https://www.reddit.com](https://www.reddit.com/r/cinematography/comments/17tglvx/questions_for_dits/)
[13] [https://mixinglight.com](https://mixinglight.com/color-grading-tutorials/what-is-a-color-decision-list-cdl/)
