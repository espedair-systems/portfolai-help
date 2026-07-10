A colour mapping transformation (also known as a colour lookup or palette remap) is an image processing operation that systematically swaps, replaces, or shifts the original colours of a photograph based on a predefined set of conversion rules. [1, 2, 3, 4, 5] 
Unlike spatial transformations (like resizing or swirling) which move pixels around on the screen, a colour mapping filter keeps every pixel in its exact same physical spot. It only alters the raw digital color code inside the pixel. It is the core engine behind modern photo grading, Instagram filters, green-screen color correction, and thermal-vision scanners [ASC-CDL, 1D/3D LUT]. [6, 7] 
------------------------------
## Summary
In digital imaging cataloging, colour mapping is a pixel-independent point operation. It acts as a digital translation dictionary. When a computer passes an image through a colour mapping filter, it reads each pixel's original color coordinates, looks up those coordinates in a translation table (known as a LUT or Look-Up Table), and instantly outputs a brand-new color mapping for that pixel [1D/3D LUT, Multi-Phase]. [8, 9, 10] 
------------------------------
## The Three Major Types of Colour Mapping
Depending on how complex you want your color adjustments to be, software developers categorize colour mapping into three strict mathematical levels:

* 1. Linear Channel Remapping (Matrix Transformation): The software multiplies the red, green, and blue values by a flat grid of coefficients. This is how filters like Sepia or Monochrome work, blending color channels uniformly across the whole canvas.
* 2. 1-Dimensional Look-Up Tables (1D LUT): The software uses three separate translation lists—one for Red, one for Green, and one for Blue. It lets you adjust contrast, gamma, and brightness independently for each channel (like tweaking curves in Photoshop). However, a 1D LUT cannot make a specific change like "turn only bright blues into teal." [11, 12, 13, 14, 15] 
* 3. 3-Dimensional Look-Up Tables (3D LUT): This is the ultimate cinema-grade tool. It structures all possible colors into a 3D data cube. Because Red, Green, and Blue are cross-indexed together, it allows for highly precise, targeted color hacking—such as turning green grass into dry autumn gold while leaving human skin tones perfectly safe and natural. [16, 17, 18, 19, 20] 

------------------------------
## Technical Details as a Digital Filter
Colour mapping transforms the aesthetic atmosphere and data distribution of a digital image file. [21] 

* Color Matching Between Cameras: In professional filmmaking, directors often shoot a single scene using different camera brands (like an Arri Alexa and a RED camera). Because each brand reads color uniquely, colorists use a Color Match Mapping algorithm to sample a standard color-checker grid on set, automatically building a matrix that forces both cameras to look identical. [22] 
* Data Compression (Quantization): A full 3D color cube containing every single one of the 16.7 million standard 8-bit colors would be too massive to store in memory. To keep things lightning-fast, software uses compressed cubes (like a 33x33x33 lattice). If a pixel falls between the grid points, the graphics card uses Trilinear Interpolation to instantly calculate the smooth, blended color value on the fly. [23] 
* Color Space Conversions: Colour mapping is mandatory when converting an image from one digital environment to another—such as shifting a movie from cinema projector color spaces (DCI-P3) to home television screens (Rec. 709) or print inks (CMYK). [24, 25, 26, 27] 

------------------------------
## The Maths Used to Apply the Filter
The mathematical implementation of colour mapping ranges from simple 3×3 linear matrices to 3D trilinear spatial array lookups. [28] 
## 1. The 3×3 Linear Matrix Remap [29] 
For a global color-space translation, an input pixel vector $[R, G, B]^T$ is multiplied by a transformation matrix containing 9 custom weighting parameters (m₀₀ through m₂₂) [3×3 Linear Color Matrix]: [30] 
$$\begin{bmatrix} R_{\text{new}} \\ G_{\text{new}} \\ B_{\text{new}} \end{bmatrix} = \begin{bmatrix} m_{00} & m_{01} & m_{02} \\ m_{10} & m_{11} & m_{12} \\ m_{20} & m_{21} & m_{22} \end{bmatrix} \begin{bmatrix} R_{\text{old}} \\ G_{\text{old}} \\ B_{\text{old}} \end{bmatrix}$$ 
## 2. The 3D Trilinear Array Interpolation Formula
For an advanced 3D LUT mapping, a pixel's normalized RGB coordinates act as a 3D point index (x, y, z) trapped inside a data lattice cube. The software identifies the 8 nearest surrounding grid values (C₀₀₀ through C₁₁₁) in the cube.
Let $d_x, d_y, d_z$ be the fractional distances from the pixel to the lower-left bounding corner point of the lattice cell. The final mapped color vector $V_{\text{final}}$ is computed using a multi-step trilinear interpolation loop:
$$V_{00} = C_{000} \cdot (1 - d_x) + C_{100} \cdot d_x$$ 
$$V_{10} = C_{010} \cdot (1 - d_x) + C_{110} \cdot d_x$$ 
$$V_{01} = C_{001} \cdot (1 - d_x) + C_{101} \cdot d_x$$ 
$$V_{11} = C_{011} \cdot (1 - d_x) + C_{111} \cdot d_x$$ 
The software collapses these intermediate steps down using the remaining vertical and depth weightings to lock onto the exact final output hue:
$$V_{0} = V_{00} \cdot (1 - d_y) + V_{10} \cdot d_y$$ 
$$V_{1} = V_{01} \cdot (1 - d_y) + V_{11} \cdot d_y$$ 
$$V_{\text{final}} = V_{0} \cdot (1 - d_z) + V_{1} \cdot d_z$$ 
Just like all other color filters, data caps are applied to prevent digital color inversion errors or mathematical values overflowing past standard capacities [Clamping]:
$$\text{Final Pixel} = \max(0, \min(255, \lfloor V_{\text{final}} \cdot 255 \rfloor))$$ 
------------------------------
## ✅ Summary of Transformation Result
The mathematics of a colour mapping transformation demonstrate that by routing spatial RGB coordinate streams through multi-dimensional index translation matrices or trilinear lookup arrays, software can dynamically overhaul the entire palette profile of an image without altering a single geometric coordinate.
If you are interested, I can provide a ready-to-run Python script using OpenCV or Pillow to show you how to read a standard .cube cinematic 3D LUT and apply a Hollywood film grade to your own photos, or show you how to chain a color map with an exact resize or composite overlay filter! What would you like to build next? [31, 32] 

[1] [https://dev.luciad.com](https://dev.luciad.com/portal/productDocumentation/LuciadFusion/docs/articles/howto/model/raster_modeling_image.html?subcategory=lls_rasterdata_model)
[2] [https://cloudinary.com](https://cloudinary.com/glossary/color-quantization)
[3] [https://www.sciencedirect.com](https://www.sciencedirect.com/science/article/pii/S0923596524000754)
[4] [https://onlinelibrary.wiley.com](https://onlinelibrary.wiley.com/doi/full/10.1002/cpe.70194)
[5] [https://www.photoshopnotes.com](http://www.photoshopnotes.com/index.php/techniques/colour/colour-palettes)
[6] [https://medium.com](https://medium.com/@fatima.tahir511/image-processing-2ccd50f3d2fe)
[7] [https://fmiranda.me](https://fmiranda.me/courses/cs425-slides/07-viewing.pdf)
[8] [https://fitplot.it](https://fitplot.it/Resources/en.lproj/pgs/colorManagement.htm)
[9] [https://www.kunstplaza.de](https://www.kunstplaza.de/en/photography/color-correction-color-grading/)
[10] [https://imagen-ai.com](https://imagen-ai.com/valuable-tips/luts-in-photography/)
[11] [https://dev.luciad.com](https://dev.luciad.com/portal/productDocumentation/LuciadFusion/docs/articles/howto/model/raster_modeling_image.html?subcategory=lls_rasterdata_model)
[12] [https://www.color.org](https://www.color.org/faqs.xalter)
[13] [https://www.tandfonline.com](https://www.tandfonline.com/doi/full/10.1179/1743277412Y.0000000030)
[14] [https://www.abelcine.com](https://www.abelcine.com/articles/blog-and-knowledge/tutorials-and-guides/the-difference-between-luts-looks-and-scene-files)
[15] [https://www.tourboxtech.com](https://www.tourboxtech.com/en/news/what-is-lut.html)
[16] [https://proedu.com](https://proedu.com/blogs/news/why-photographers-need-to-use-3d-lut-color-grading-profiles-enhancing-visual-impact)
[17] [https://pixflow.net](https://pixflow.net/blog/a-complete-guide-to-understanding-look-up-tables-in-video-editing-and-photography/)
[18] [https://www.tourboxtech.com](https://www.tourboxtech.com/en/news/what-is-lut.html)
[19] [https://learn.zoner.com](https://learn.zoner.com/3d-luts-what-they-can-do-and-where-to-find-them/)
[20] [https://phlearn.com](https://phlearn.com/tutorial/creative-coloring-gradient-maps-photoshop/)
[21] [https://www.sandradimagery.com](https://www.sandradimagery.com/photoshop-learning-hub/digital-textures-for-colour-grading)
[22] [https://digital-photography-school.com](https://digital-photography-school.com/how-to-use-camera-calibration-tool-in-lightroom-video/)
[23] [https://www.colortrac.com](https://www.colortrac.com/glossary/color/)
[24] [https://reference.wolfram.com](https://reference.wolfram.com/language/ref/ColorConvert.html)
[25] [https://en.weltberg.com](https://en.weltberg.com/post/colorgrading-filmproduktion-kassel)
[26] [https://dcpomatic.com](https://dcpomatic.com/forum/viewtopic.php?t=2193)
[27] [https://cloudinary.com](https://cloudinary.com/glossary/color-grading)
[28] [https://www.linkedin.com](https://www.linkedin.com/pulse/color-space-transforms-davinci-resolve-how-many-too-perez-segnini-of8ce)
[29] [https://openaccess.thecvf.com](https://openaccess.thecvf.com/content_cvpr_2014/papers/Hwang_Color_Transfer_Using_2014_CVPR_paper.pdf)
[30] [https://www.imaging.org](https://www.imaging.org/common/uploaded%20files/pdfs/Papers/2003/PICS-0-287/8498.pdf)
[31] [https://pyimagesearch.com](https://pyimagesearch.com/2021/02/15/automatic-color-correction-with-opencv-and-python/)
[32] [https://virtuall.pro](https://virtuall.pro/blog/cmyk-conversion-to-rgb)
