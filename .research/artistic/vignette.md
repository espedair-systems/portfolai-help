In image processing, a vignette filter is a digital effect that darkens, fades, or blurs the outer edges of a photograph while keeping the centre of the image bright and clear. [1, 2, 3, 4, 5] 
## Summary
Historically, a vignette was an unintended flaw caused by camera limitations, where the camera lens block or barrel physically shadowed the corners of the film. In digital photo editing, this flaw is used as an intentional artistic tool. Because human eyes are naturally drawn to the brightest part of a scene, a vignette filter subtly frames an image and pulls the viewer’s focus directly toward the central subject. [6, 7, 8, 9, 10] 
------------------------------
## How It Works Under the Hood
To apply a digital vignette, an image processing application acts as a virtual spotlight creator, mapping out a gradient from the centre of the photo to its corners. [11, 12] 

* Finding the Center: The software identifies the central anchor point of the image (or a custom focal point selected by the user).
* Calculating Distance: It measures exactly how far away every single pixel is from that central point.
* Applying the Mask: It builds a circular or oval-shaped mask where the centre is completely transparent (multiply by 1) and gradually gets darker towards the edges (multiply by less than 1). [13, 14, 15] 
* Color Blending: The software blends this mask with the original photo, fading the edges into black, a soft brown, or sometimes a blurry haze. [16] 

------------------------------
## Technical Details as a Digital Filter
A digital vignette alters pixel values based entirely on their spatial coordinates (x, y) rather than just their native color channels.

* Coordinate Mapping: The engine translates pixel locations into a normalized grid where the centre is (0,0) and the furthest corners are represented as 1.0. [17] 
* Falloff Curve: The rate at which the edges darken is controlled by a falloff curve. A steep curve creates a sharp, dramatic spotlight, while a gentle curve creates an almost invisible, natural transition. [18] 
* Non-Destructive Scaling: Because photos come in various aspect ratios (like 16:9 widescreen or 1:1 square), the algorithm must dynamically stretch the math into an ellipse so the corners darken evenly regardless of image shape. [19, 20] 

------------------------------
## The Maths Used to Apply the Filter
The mathematical implementation of a vignette filter relies on calculating the Euclidean distance of pixels and applying a scaling function.
## 1. Calculating Normalized Distance
First, let $(x_c, y_c)$ be the coordinates of the image centre, and (x, y) be the current pixel location. The distance d from the centre is calculated using the Pythagorean theorem:
$$d = \sqrt{(x - x_c)^2 + (y - y_c)^2}$$ 
To make this formula work identically across different image sizes, the distance is normalized against the maximum possible distance to a corner ($d_{\max}$):
$$d_{\text{norm}} = \frac{d}{d_{\max}}$$ 
## 2. The Cosine-Fourth Law Approximation
Real optical vignetting follows physics known as the Cosine-Fourth Law (where light falloff is proportional to $\cos^4(\theta)$). In software, digital filters approximate this physical drop-off using a simple power or cosine function to calculate a intensity multiplier (V) between 0.0 and 1.0: [21, 22] 
$$V = \cos(d_{\text{norm}} \cdot R)^P \quad \text{or} \quad V = 1.0 - (d_{\text{norm}})^P$$ 

* R represents the radius or size of the untouched central hotspot.
* P represents the power or "feathering" amount. A higher power (like 2 or 3) keeps the centre wider before fading out. [23] 

## 3. Pixel Color Multiplication [24] 
Finally, the new color values for each channel (Red, Green, Blue) are calculated by multiplying the original values by the vignette factor V:
$$R_{\text{new}} = R_{\text{old}} \cdot V$$ 
$$G_{\text{new}} = G_{\text{old}} \cdot V$$ 
$$B_{\text{new}} = B_{\text{old}} \cdot V$$ 
Because V scales down toward 0.0 at the extreme corners, the pixel values drop toward 0 (pure black). [25] 
------------------------------
## ✅ Summary of Formula Result
The mathematics of a vignette filter show that by calculating how far a pixel sits from the focal centre and multiplying its RGB values by a distance-based fraction, the software smoothly dimishes edge lighting to replicate real-world lens shadowing.
If you are interested, I can provide a Python script using NumPy to generate this vignette mask over an image, or show you how to invert the math to create a white "dreamy" vignette!

[1] [https://borisfx.com](https://borisfx.com/blog/create-a-cinematic-vignette-in-after-effects/)
[2] [https://www.shutterstock.com](https://www.shutterstock.com/design/add-vignette-to-image)
[3] [https://help.nchsoftware.com](http://help.nchsoftware.com/help/en/photopad/win/layer_vignette.html)
[4] [https://shotkit.com](https://shotkit.com/vignette-photoshop-elements/)
[5] [https://dreamina.capcut.com](https://dreamina.capcut.com/resource/vignette-effect)
[6] [https://www.studiobinder.com](https://www.studiobinder.com/blog/what-is-vignetting-in-photography/)
[7] [https://lightroom-photoshop-tutorials.com](https://lightroom-photoshop-tutorials.com/vignetting/)
[8] [https://www.facebook.com](https://www.facebook.com/ON24inc/posts/aspect-ratio-defines-the-proportional-relationship-between-an-images-height-and-/1253917190106604/)
[9] [https://www.studiobinder.com](https://www.studiobinder.com/blog/what-is-vignetting-in-photography/)
[10] [https://cloudinary.com](https://cloudinary.com/guides/image-effects/what-is-vignette-guide-to-vignette-image-editing)
[11] [https://photo.wondershare.com](https://photo.wondershare.com/photo-editing-tips/how-to-add-vignette-effects-to-photos-mac.html)
[12] [https://gimpguru.wordpress.com](https://gimpguru.wordpress.com/tutorials/vignetting/)
[13] [https://help.timestone.com.au](https://help.timestone.com.au/docs/applying-a-mask-to-an-image-hole)
[14] [https://www.originalartphotography.co.uk](https://www.originalartphotography.co.uk/2014/10/use-vignette-editing-photos/)
[15] [https://helpx.adobe.com](https://helpx.adobe.com/lightroom/mobile/edit-videos/add-vignette-and-grain-effects-to-videos.html)
[16] [https://flexbooks.ck12.org](https://flexbooks.ck12.org/user:thetechdog/cbook/digital-imaging-2%3A-digital-image-editing/section/5.4/primary/lesson/deleting-layers-includes-vignette/)
[17] [https://docs.gimp.org](https://docs.gimp.org/2.10/nl/gimp-filter-vignette.html)
[18] [https://docs.gimp.org](https://docs.gimp.org/2.10/nl/gimp-filter-vignette.html)
[19] [https://photography.tutsplus.com](https://photography.tutsplus.com/articles/the-art-of-using-aspect-ratios-in-digital-photography--photo-7947)
[20] [https://insightvideomarketing.co.uk](https://insightvideomarketing.co.uk/knowledge-hub/the-evolution-of-aspect-ratios-the-rise-of-vertical-video/)
[21] [https://www.wallpics.com](https://www.wallpics.com/blogs/news/mastering-lens-vignetting-types-creative-uses-and-how-to-remove-it)
[22] [https://www.sciencedirect.com](https://www.sciencedirect.com/topics/earth-and-planetary-sciences/vignetting)
[23] [https://help.vectary.com](https://help.vectary.com/documentation/design-process/effects/vignette)
[24] [https://www.visualcinnamon.com](https://www.visualcinnamon.com/2016/05/beautiful-color-blending-svg-d3/)
[25] [https://spie.org](https://spie.org/publications/spie-publication-resources/optipedia-free-optics-information/fg01_p31-32_vignetting)
