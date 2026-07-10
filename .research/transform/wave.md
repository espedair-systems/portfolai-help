A wave transformation (or ripple filter) is a geometric image effect that warps a photo by passing a mathematical wave function across its coordinate grid, undulating the pixels into a series of repeating crests and troughs. [1, 2] 
If you imagine a photograph printed on a flat sheet of rubber, a wave transformation mimics the physical act of stretching and shaking that sheet. It instantly makes an image look like it is reflecting off a moving pool of water, vibrating like a soundwave, or viewed through textured glass. [3] 
------------------------------
## Summary
Because a wave transformation bends straight paths into curves and repeatedly stretches and compresses space, it violates the rules of affine mathematics. It is classified as a non-affine, non-linear coordinate warp. Instead of shifting color values, it alters a pixel's physical address on the screen based on periodic trigonometric functions. [4, 5] 
------------------------------
## How It Works Under the Hood
To create a perfectly smooth wave pattern across an entire canvas, a graphics processor calculates a repeating shift vector for every coordinate index:

* Directional Selection: The software determines the direction of the wave travel. Waves can ripple horizontally (left-to-right), vertically (up-and-down), or radially outward from a central point like a pebble dropped in a pond. [6, 7, 8, 9, 10] 
* Periodic Calculation: The computer scans a pixel's position and uses a repeating trigonometric function (like a sine or cosine wave) to determine how far that specific row or column should slide. [11, 12] 
* Coordinate Offsetting: The software displaces the pixel. For example, in a vertical wave, row 10 might slide 5 pixels to the right, row 20 stays perfectly centered, and row 30 slides 5 pixels to the left.
* Boundary Handling: Because waving an image pulls pixels away from the borders of the canvas, the software must decide how to fill the empty edge gaps—either by stretching the edge pixels, wrapping the image around, or filling the void with a solid color.

------------------------------
## Technical Details as a Digital Filter
Like the swirl filter, waving an image requires a high level of mathematical precision to prevent the final graphic from looking jagged or pixelated.

* Amplitude (Height): This controls the intensity or power of the warp. A massive amplitude creates huge, violent distortions, while a low amplitude creates a gentle shimmer. [13, 14] 
* Wavelength / Frequency (Spacing): This dictates how tight the waves are packed together. A high frequency creates hundreds of tiny, tight ripples, while a low frequency creates broad, sweeping swells. [15] 
* Inverse Mapping Resolution: To avoid digital holes and glitchy tearing where space expands, the transformation engine looks at a blank destination pixel coordinate and works backward to find the exact color from the source image. It finishes with Bilinear Interpolation to smooth out fractional pixel coordinates.

------------------------------
## The Maths Used to Apply the Filter
The mathematical engine behind a standard horizontal/vertical wave filter relies heavily on the behavior of the Sine function ($\sin$).
## 1. The Sine Displacement Formula
For a vertical wave effect (where rows slide left and right based on how far down the screen they sit), the new horizontal coordinate ($x_{\text{new}}$) for any given pixel at (x, y) is calculated as:
$$x_{\text{new}} = x + A \cdot \sin\left(\frac{2\pi \cdot y}{\lambda} + \phi\right)$$ 
## 2. The Variable Matrix Breakdown:

* A (Amplitude): The maximum peak displacement in pixels. It acts as a scaling multiplier outside the wave function. [16] 
* λ (Wavelength): The distance in pixels from the peak of one wave crest to the peak of the next. It sits in the denominator to scale the spatial frequency. [17] 
* φ (Phase Shift): An optional offset tracking value. If you animate φ over time (e.g., in a video game shader), the waves will appear to physically roll and travel down the screen. [18] 

## 3. Handling the Companion Axis
Because this is a pure horizontal shift, the vertical axis remains completely untouched:
$$y_{\text{new}} = y$$ 
(Note: To create a complex cross-hatch wave effect, you can run a second pass that warps the Y-axis using the X-coordinates: $y_{\text{new}} = y + A_2 \cdot \sin(\frac{2\pi \cdot x}{\lambda_2})$).
------------------------------
## ✅ Summary of Formula Result
The mathematics of a wave transformation prove that by modulating a pixel's physical coordinate offset using a periodic trigonometric function, the software seamlessly maps smooth, repeating harmonic wave physics onto a static digital canvas.
If you are interested in experimenting with this effect, I can provide a ready-to-run Python script using OpenCV and NumPy that will let you apply waves to your own photos, or show you how to write the code for traveling water ripples! Which path would you like to take?

[1] [https://www.frontiersin.org](https://www.frontiersin.org/journals/physics/articles/10.3389/fphy.2025.1537461/full)
[2] [https://knowunity.co.uk](https://knowunity.co.uk/knows/physics-waves-reflection-and-refraction-0f2cc582-c001-45b7-8d78-d858480dad48)
[3] [https://www.vaia.com](https://www.vaia.com/en-us/textbooks/physics/physics-concepts-and-connections-5-edition/chapter-9/problem-3-when-you-send-a-brief-wave-down-a-rope-or-slinky-i/)
[4] [https://www.instagram.com](https://www.instagram.com/reel/DHk_E-9xvfw/)
[5] [https://www.windsurf.co.uk](https://www.windsurf.co.uk/peter-hart-wave-conditions-directory-part-ii/)
[6] [https://upload.wikimedia.org](https://upload.wikimedia.org/wikiversity/en/f/f2/Physics_for_beginners-07-waves.pdf)
[7] [https://www.vaia.com](https://www.vaia.com/en-us/textbooks/physics/conceptual-physics-12-edition/chapter-19/problem-11-in-what-direction-are-the-vibrations-relative-to-/)
[8] [https://www.dominikmatus.cz](https://www.dominikmatus.cz/files/D%C5%99evo/Holandsk%C3%A1%20li%C5%A1ta/The%20History%20and%20Technology%20of%20Waveform%20Moldings%20Reproducing%20and%20Using%20Moxon%E2%80%99s%20Waving%20Engine.pdf)
[9] [https://home.csulb.edu](https://home.csulb.edu/~rodrigue/geog558/lectures/tsunami.html)
[10] [https://www.memphisweather.blog](https://www.memphisweather.blog/2013/02/gravity-waves-move-across-memphis-metro.html)
[11] [https://www.vaia.com](https://www.vaia.com/en-us/textbooks/math/precalculus-with-limits-3-edition/chapter-4/problem-2-the-of-a-sine-or-cosine-curve-represents-half-the-/)
[12] [https://www.vaia.com](https://www.vaia.com/en-us/textbooks/math/precalculus-12-edition/chapter-5/problem-25-the-frequency-of-a-wave-is-the-number-of-cycles-t/)
[13] [https://aescripts.com](https://aescripts.com/wave-the-path/)
[14] [https://onlinelibrary.wiley.com](https://onlinelibrary.wiley.com/doi/full/10.1002/er.6291)
[15] [https://www.gregegan.net](https://www.gregegan.net/FOUNDATIONS/04/found04.html)
[16] [https://www.vedantu.com](https://www.vedantu.com/question-answer/define-amplitude-of-wave-class-11-physics-cbse-5f45d3472b8d064425c4c420)
[17] [https://pubs.geoscienceworld.org](https://pubs.geoscienceworld.org/seg/books/edited-volume/2657/chapter/144347822/Traveling-Waves)
[18] [https://www.vaia.com](https://www.vaia.com/en-us/textbooks/physics/university-physics-volume-1-1-edition/chapter-16/problem-51-a-wave-is-modeled-with-the-function-yx-t025-mathr/)
