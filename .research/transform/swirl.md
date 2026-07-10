A swirl transformation is a non-linear geometric effect that spins an image around a central anchor point, twisting the pixels tightly in the middle while leaving the outer edges completely untouched. [1] 
Unlike a standard affine rotation where the entire photo spins together like a flat plate, a swirl filter treats the image like a liquid pool of paint. The closer a pixel sits to the center, the faster and further it is rotated. This creates a mesmerizing whirlpool or spiral effect. [2, 3, 4] 
------------------------------
## Summary
Because a swirl filter bends straight lines into curves and forces parallel lines to twist around each other, it violates the rules of affine mathematics. It is classified as a non-affine, non-linear warp transformation. It acts as a localized coordinate re-mapper, twisting pixels inward based on their distance from a focal point. [5, 6] 
------------------------------
## How It Works Under the Hood
To execute a swirl, a graphics engine or shader cannot just multiply the pixels by a flat grid of numbers. It must calculate a unique rotation angle for every single pixel on the canvas:

* Center Targeting: The software establishes a central coordinate point $(X_c, Y_c)$ to act as the eye of the storm.
* Distance Scanning: It measures exactly how far away every individual pixel is from that center point.
* Dynamic Twisting: The computer calculates a twisting angle. If a pixel is right next to the center, it gets a massive rotation boost. As the distance increases, the rotation angle drops off smoothly down to zero.
* Coordinate Remapping: The software shifts the pixel to its new, twisted home on the screen. [7] 

------------------------------
## Technical Details as a Digital Filter
Because twisting an image stretches and compresses space, pixels can get pulled apart or bunched together. [8] 

* The Moire/Aliasing Problem: If you map pixels purely forward, the center of your swirl will end up with empty holes and jagged, jagged artifacts.
* Inverse Mapping: To fix this, software uses inverse mapping. The computer looks at a blank spot on the final output image and works backward to find which pixel from the original photo belongs there. [9, 10] 
* Bilinear Interpolation: Because the math outputs decimal numbers (like moving a pixel to coordinate 45.34), the filter averages the colors of the four closest pixels together to ensure the swirling vortex looks perfectly smooth and organic.

------------------------------
## The Maths Used to Apply the Filter
The mathematics of a swirl transformation require shifting coordinates from standard Cartesian space (X, Y) into Polar space (Radius, Angle) and applying a non-linear drop-off function.
## 1. Calculating Normalized Radius
First, let $(x_c, y_c)$ be the center of the swirl, and (x, y) be the current pixel. The absolute distance (r) is calculated using the Pythagorean theorem:
$$r = \sqrt{(x - x_c)^2 + (y - y_c)^2}$$ 
The radius is then normalized against a user-selected Swirl Radius Boundary ($R_{\max}$), which determines how far out the whirlpool reaches:
$$r_{\text{norm}} = \frac{r}{R_{\max}}$$ 
(If $r_{\text{norm}} \ge 1.0$, the pixel sits outside the whirlpool, and the math bypasses it entirely).
## 2. The Non-Linear Angle Twist
Let $\theta_{\text{orig}}$ be the pixel's current angle relative to the center, calculated using trigonometry:
$$\theta_{\text{orig}} = \text{atan2}(y - y_c, x - x_c)$$ 
The new angle ($\theta_{\text{new}}$) injects a Swirl Factor (α, measured in radians or degrees) that scales down linearly or exponentially as the radius grows. A standard linear drop-off formula is: [11, 12] 
$$\theta_{\text{new}} = \theta_{\text{orig}} + \alpha \cdot (1.0 - r_{\text{norm}})$$ 

* At the absolute center ($r_{\text{norm}} = 0$), the pixel rotates by the full amount of α.
* At the boundary edge ($r_{\text{norm}} = 1.0$), the twist factor becomes 0, matching the original image perfectly.

## 3. Re-Mapping back to Screen Space (X, Y)
Finally, the polar coordinates are translated back into standard screen coordinates so the computer can render the pixel:
$$x_{\text{new}} = x_c + r \cdot \cos(\theta_{\text{new}})$$ 
$$y_{\text{new}} = y_c + r \cdot \sin(\theta_{\text{new}})$$ 
------------------------------
## ✅ Summary of Formula Result
The mathematics prove that by modulating a pixel's angle inversely to its distance from a central focal point, the software warps flat space into a smooth, spiral trajectory without breaking the continuous color flow of the image.
If you are interested, I can write a ready-to-run Python script using OpenCV and NumPy to let you apply a custom swirl vortex to your own photos, or show you how to combine a swirl with a zoom/pinch effect! What would you like to explore?

[1] [https://forum.godotengine.org](https://forum.godotengine.org/t/swirl-shader-demo-what-is-being-done-here/28767)
[2] [https://forum.godotengine.org](https://forum.godotengine.org/t/swirl-shader-demo-what-is-being-done-here/28767)
[3] [https://www.shutterstock.com](https://www.shutterstock.com/video/search/dizzying-black-lines-spiralling)
[4] [https://www.freepixel.com](https://www.freepixel.com/similar/free-illustration-graphics-a-vibrant-swirling-pattern-of-pastel-colors-including-pink-blue-yellow-and-purple-which-creates-a-me-1004432930)
[5] [https://scikit-image.org](https://scikit-image.org/docs/0.24.x/auto_examples/transform/plot_swirl.html)
[6] [https://forum.godotengine.org](https://forum.godotengine.org/t/swirl-shader-demo-what-is-being-done-here/28767)
[7] [https://docs.unity3d.com](https://docs.unity3d.com/353/Documentation/Components/script-TwirlEffect.html)
[8] [https://www.instagram.com](https://www.instagram.com/reel/DHk_E-9xvfw/)
[9] [https://blogs.mathworks.com](https://blogs.mathworks.com/steve/2006/04/28/spatial-transforms-forward-mapping/)
[10] [https://www.datacamp.com](https://www.datacamp.com/tutorial/affine-transformation)
[11] [https://www.mdpi.com](https://www.mdpi.com/2073-4433/14/9/1425)
[12] [https://www.sciencedirect.com](https://www.sciencedirect.com/science/article/pii/S030193222400048X)
