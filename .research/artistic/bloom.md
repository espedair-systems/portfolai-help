In image processing, a bloom filter (or glow filter) is a computer graphics effect used to make bright areas of an image intensely glow and bleed light into the surrounding pixels. [1, 2, 3] 
## Summary
Unlike a data structure, a visual bloom filter [simulates a real-world camera lens artifact](https://en.wikipedia.org/wiki/Bloom_%28shader_effect%29). Real lenses struggle to cleanly contain extremely bright light, causing it to scatter across the image. Because digital screens have a maximum brightness ceiling, a bloom filter chemically compromises dark areas nearby to artificially make bright lights look much more intense, cinematic, and magical. [4, 5] 
------------------------------
## How It Works Under the Hood
To create a visual bloom effect, a graphic shader or photo editor duplicates the image and applies a multi-step pipeline across four major stages:

* Thresholding: The engine separates the brightest parts of the image from everything else, turning the dark areas completely black so only the "lights" remain.
* Blurring: The software blurs the bright areas heavily, spreading the light outwards into smooth, soft wings of color.
* Intensifying: The blurred light maps are multiplied by an intensity weight to make them brighter or change their color tint.
* Composite Layering: The software merges this blurred, glowing map back on top of the original, untouched image. [6, 7, 8, 9, 10] 

------------------------------
## Technical Details as a Digital Filter
A visual bloom filter processes pixel arrays in rendering frameworks like [WebGL, OpenGL, or DirectX](https://learnopengl.com/Advanced-Lighting/Bloom).

* Luminance Extraction: The shader tests each pixel's [RGB values](https://en.wikipedia.org/wiki/RGB_color_model) against a strict brightness barrier. If a pixel fails the test, it is zeroed out to (0, 0, 0). [11] 
* Kernel Convolution: The blurring engine passes a multi-pixel matrix (a kernel) across the extracted lights. A wider pixel kernel creates a larger, softer glow radius. [12, 13] 
* Additive Blending: Instead of averaging colors together, the shader mathematically adds the light channels of the glow layer to the original background, meaning colors never get darker, only lighter.

------------------------------
## The Maths Used to Apply the Filter
The mathematical pipeline of an image processing bloom filter is split into three main algebraic operations.
## 1. Brightness Thresholding
To isolate the glow areas, the software calculates the human-perceived brightness (Luminance, or $Y$) of each pixel. It uses standard digital television weightings:
$$Y = 0.2126 \cdot R + 0.7152 \cdot G + 0.0722 \cdot B$$ 
If $Y$ is less than a set threshold value ($T$), the pixel becomes black. This is expressed step-wise as: [14] 
$$\text{Color}_{\text{bright}} = \begin{cases} \text{Color}_{\text{original}}, & \text{if } Y > T \\ 0, & \text{if } Y \le T \end{cases}$$ 
## 2. Gaussian Blur Convolution
The isolated light layer must be blurred. This is achieved using a two-dimensional Gaussian function to distribute the light values based on distance ($x, y$) from the pixel center: [15] 
$$G(x, y) = \frac{1}{2\pi\sigma^2} e^{-\frac{x^2 + y^2}{2\sigma^2}}$$ 

* $\sigma$ (sigma) controls the spreading width of the glow.
* The software creates a matrix kernel from this formula and slides it across the pixels. The blurred pixel value $B(x,y)$ is calculated by multiplying nearby original values $I$ by their weightings: [16, 17] 

$$B(x, y) = \sum_{i=-r}^{r} \sum_{j=-r}^{r} G(i, j) \cdot I(x+i, y+j)$$ 
## 3. Additive Blending Composite
The final step mathematically merges the blurred glow layer ($B$) and the original image ($I$), multiplied by an intensity factor ($\alpha$): [18] 
$$\text{Pixel}_{\text{final}} = \min(255, I + \alpha \cdot B)$$ 
Just like the sepia filter, the values are clamped at $255$ to match standard 8-bit digital color capacities. [19, 20] 
------------------------------
## ✅ Summary of Formula Result
The mathematics of a visual bloom filter prove that by extracting high-luminance pixels via thresholding, mathematically scattering them with a Gaussian probability curve, and additively combining the layers, you cleanly map physics-based lens glare onto flat digital surfaces.
If you are building a game engine or photo app, I can show you how to optimize this math using a two-pass linear blur to save processing power, or provide a GLSL shader code snippet!

[1] [https://gamedevdustin.medium.com](https://gamedevdustin.medium.com/post-processing-in-urp-for-unity-2020-20f560816231)
[2] [https://www.smartermarx.com](https://www.smartermarx.com/t/2025-online-alla-prima-challenges-ii-resource/1973)
[3] [https://docs.cycling74.com](https://docs.cycling74.com/learn/articles/06-pass-effects/)
[4] [https://www.kodeco.com](https://www.kodeco.com/books/metal-by-tutorials/v3.0/chapters/30-metal-performance-shaders)
[5] [https://learnopengl.com](https://learnopengl.com/Guest-Articles/2022/Phys.-Based-Bloom)
[6] [https://easychair.org](https://easychair.org/publications/preprint/lX2C)
[7] [https://medium.com](https://medium.com/@fatima.tahir511/image-processing-2ccd50f3d2fe)
[8] [https://www.ultralytics.com](https://www.ultralytics.com/blog/thresholding-in-image-processing)
[9] [https://www.analyticsvidhya.com](https://www.analyticsvidhya.com/blog/2023/04/unveiling-power-of-filters-in-medical-x-ray-image-processing/)
[10] [https://medium.com](https://medium.com/@chinmayiadsul/the-art-of-blur-in-image-processing-part-1-gaussian-blur-made-easy-630eec3c7962)
[11] [https://homepages.math.uic.edu](http://homepages.math.uic.edu/~jan/mcs572f16/mcs572notes/lec28.html)
[12] [https://www.math.utah.edu](http://www.math.utah.edu/~gustafso/s2019/2270/projects-2017/asherSorensen/AsherSorensenLinear.pdf)
[13] [https://www.cs.ubc.ca](https://www.cs.ubc.ca/labs/scl/spot/guide_convolution2.html)
[14] [https://robotacademy.net.au](https://robotacademy.net.au/lesson/image-thresholding/)
[15] [https://sites.google.com](https://sites.google.com/site/digitalsignaltechniques/digital-signal-filtering)
[16] [https://www.cs.ubc.ca](https://www.cs.ubc.ca/labs/scl/spot/guide_convolution2.html)
[17] [https://ai.gopubby.com](https://ai.gopubby.com/a-gentle-introduction-to-convolutions-visually-explained-b538075ede3f)
[18] [https://www.sciencedirect.com](https://www.sciencedirect.com/science/article/pii/S1051200422001543)
[19] [https://cs50.harvard.edu](https://cs50.harvard.edu/x/2025/psets/4/filter/less/)
[20] [https://knowledgebase.infra.copphil.philsa.gov.ph](https://knowledgebase.infra.copphil.philsa.gov.ph/en/latest/gettingstarted/True-colours-and-false-colours-images-based-on-Sentinel-2-data-on-CopPhil.html)
