In image processing, a dehaze filter is a computational algorithm designed to remove atmospheric fog, smoke, or smog from a photograph to reveal the clear, original colors and details underneath. [1, 2] 
## Summary
Unlike simple contrast adjustments, a dehaze filter reverses a specific physical phenomenon called "atmospheric scattering." When light travels through fog or smog, particles in the air scatter the light, washing out colors and turning blacks into gray. This filter mathematically estimates how much "air" is between the camera and the subject for every single pixel, then subtracts that "air" to restore the scene's true visibility. [3, 4, 5, 6] 
------------------------------
## How It Works Under the Hood
Most dehaze tools rely on a clever observation called the Dark Channel Prior (DCP).
Researchers discovered that in any clear, haze-free photo, small patches of the image (like shadows, trees, or dark objects) will always have some pixels with very low intensity in at least one color channel (Red, Green, or Blue). [7, 8, 9, 10] 

* Scanning for Whiteness: The software scans the image looking for these dark spots.
* Detecting Haze: If it looks at a patch that should be dark but finds it is gray or white, it assumes that extra brightness is haze.
* Building a Depth Map: Since objects further away have more haze between them and the camera, the software uses the amount of whiteness to build a 3D "transmission map," estimating how far away every pixel is.
* Subtraction: It then subtracts the "fog" layer based on that distance, effectively wiping the window clean. [11, 12, 13] 

------------------------------
## Technical Details as a Digital Filter
The filter operates by inverting the Atmospheric Scattering Model. This model treats the image you see as a mix of two things: the real object's light and the scattered airlight. [11, 14, 15, 16] 

* Airlight Estimation (A): The algorithm finds the brightest pixels in the most opaque parts of the image (often the sky) to determine the color and intensity of the fog itself. [12, 17] 
* Transmission Matrix (t): It calculates a value between 0.0 (completely blocked by fog) and 1.0 (clear air) for every pixel.
* Radiance Recovery: It stretches the pixel values back to their original state. This often introduces noise, so a "guided filter" is usually applied afterward to smooth out the graininess while keeping sharp edges. [10, 18, 19] 

------------------------------
## The Maths Used to Apply the Filter [20] 
The mathematics of dehazing are defined by the Physics-based Haze Equation.
## 1. The Haze Equation
The image captured by the camera, I(x), is modeled as:
$$I(x) = J(x)t(x) + A(1 - t(x))$$ 

* J(x): The true, clear scene radiance (what we want to recover).
* t(x): The transmission map (how much light made it through).
* A: The global atmospheric light (the color of the fog). [21, 22] 

## 2. The Dark Channel Calculation
To solve this equation (which has two unknowns, J and t), the algorithm first calculates the "dark channel" $J^{dark}$ for a local patch Ω(x):
$$J^{dark}(x) = \min_{y \in \Omega(x)} (\min_{c \in \{R,G,B\}} J^c(y)) \approx 0$$ 
This formula says: "Look at the neighbors (y) of pixel x, find the lowest color value (c) among them. If there is no fog, this should be zero." [7] 
## 3. Estimating Transmission (t)
Using the Dark Channel Prior, we can estimate the transmission t̃(x). We introduce a constant ω (usually 0.95) to keep a tiny bit of haze so the image looks natural and not flat:
$$\tilde{t}(x) = 1 - \omega \min_{y \in \Omega(x)} (\min_{c} \frac{I^c(y)}{A^c})$$ 
## 4. Recovering the Image (J)
Finally, we rearrange the first equation to solve for the clear image J(x). We use a lower limit t₀ (like 0.1) to prevent dividing by zero if the fog is too thick:
$$J(x) = \frac{I(x) - A}{\max(t(x), t_0)} + A$$ 
------------------------------
## ✅ Summary of Formula Result
The mathematics show that dehazing is essentially a subtraction problem based on depth. By identifying the "floor" of brightness in local patches (the Dark Channel), the algorithm isolates the "fog layer" (A(1-t)) and mathematically peels it off the image pixel by pixel. [23] 
If you are interested, I can show you a Python script using OpenCV to dehaze an image yourself, or explain why this filter sometimes makes sky look noisy!

[1] [https://www.smartphotoeditors.com](https://www.smartphotoeditors.com/articles/dehaze.php)
[2] [https://improvephotography.com](https://improvephotography.com/35067/dehaze/)
[3] [https://github.com](https://github.com/He-Zhang/image_dehaze)
[4] [https://foclar.com](https://foclar.com/news/dehaze)
[5] [https://community.adobe.com](https://community.adobe.com/questions-563/dehaze-drastically-swifts-colors-white-balance-how-to-prevent-this-181535)
[6] [https://www.sciencedirect.com](https://www.sciencedirect.com/science/article/pii/S0097849323002893)
[7] [https://www.ipol.im](https://www.ipol.im/pub/art/2024/530/article_lr.pdf)
[8] [https://www.sciencedirect.com](https://www.sciencedirect.com/topics/computer-science/dark-channel-prior)
[9] [https://arxiv.org](https://arxiv.org/html/2501.03659v1)
[10] [https://github.com](https://github.com/He-Zhang/image_dehaze)
[11] [https://link.springer.com](https://link.springer.com/article/10.1186/s13640-016-0104-y)
[12] [https://github.com](https://github.com/tmatsuzawa2/dehaze)
[13] [https://www.evenx.com](https://www.evenx.com/release-de-haze-plugin-1-0-9-for-adobe-photoshop-windows)
[14] [https://ieeexplore.ieee.org](https://ieeexplore.ieee.org/iel8/11465167/11465173/11466266.pdf)
[15] [https://medium.com](https://medium.com/analytics-vidhya/gman-net-for-image-dehazing-65a2b3f679a5)
[16] [https://www.digitalocean.com](https://www.digitalocean.com/community/tutorials/image-dehazing-the-what-why-and-how)
[17] [https://www.sciencedirect.com](https://www.sciencedirect.com/science/article/pii/S0020025519301732)
[18] [https://www.tandfonline.com](https://www.tandfonline.com/doi/full/10.1080/13682199.2026.2639258)
[19] [https://pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC11953395/)
[20] [https://www.tourboxtech.com](https://www.tourboxtech.com/en/news/how-to-dehaze-in-davinci-resolve.html)
[21] [https://www.sciencedirect.com](https://www.sciencedirect.com/science/article/pii/S1047320320302248)
[22] [https://www.sciencedirect.com](https://www.sciencedirect.com/science/article/pii/S0925231217302412)
[23] [https://www.reddit.com](https://www.reddit.com/r/AskAstrophotography/comments/119vqh2/are_photoshops_camera_raw_filter_dehaze_and/)
