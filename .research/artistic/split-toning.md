In image processing, a split toning filter is a digital effect that applies one distinct color tint to the highlights (bright areas) of an image and a completely different color tint to the shadows (dark areas). [1, 2, 3] 
## Summary
Split toning originated in traditional film darkrooms, where photographers used chemical baths like gold, selenium, or iron to dye different parts of a monochrome print. In modern digital photography, split toning is used to inject creative color styling into both black-and-white and full-color images. Its most famous application is the iconic "Teal and Orange" Hollywood look, where highlights are warmed up with orange skin tones and shadows are cooled down with deep teal blues. [4, 5, 6, 7, 8] 
------------------------------
## How It Works Under the Hood
To execute split toning, an image editing engine isolates the pixels based on how bright they are, then maps color tints on a sliding scale.

* Luminance Partitioning: The software analyzes every pixel to determine its brightness, splitting the image into highlights, midtones, and shadows. [9, 10] 
* Color Injection: The user selects two colors: a highlight tint and a shadow tint. [11, 12, 13] 
* Proportional Mixing: The software injects the highlight color into the bright pixels and the shadow color into the dark pixels. Midtones are calculated as a smooth gradient blend where the two colors meet.
* Balance Adjustment: A central slider allows the editor to shift the boundary line, giving either the highlight color or the shadow color more territory across the image. [14] 

------------------------------
## Technical Details as a Digital Filter
Digital split toning typically processes pixels by temporarily converting them from the standard RGB color model to a luminance-based color model, such as HSL (Hue, Saturation, Lightness) or YUV.

* Luminance Masking: Lightness (L) values are used as an automated alpha mask. A pixel with high L receives the highlight color, while a pixel with low L receives the shadow color.
* Saturation Controls: The filter allows independent saturation intensity for both channels. You can apply a deep, heavy blue to the shadows while adding only a very subtle, pale yellow to the highlights. [15] 
* Midtone Protection: Advanced split-toning algorithms use a bell curve to protect the exact middle grays from getting muddy or overly saturated, ensuring a clean transition.

------------------------------
## The Maths Used to Apply the Filter
The mathematics of a split toning filter rely on linear interpolation (lerp) based on a pixel's luminance value.
## 1. Calculating Perceived Luminance
First, the absolute brightness (Y) of an original pixel (R, G, B) is calculated to serve as the weighting factor:
$$Y = 0.2126 \cdot R + 0.7152 \cdot G + 0.0722 \cdot B$$ 
(Note: Y is scaled to a range between 0.0 for pure black and 1.0 for pure white).
## 2. Determining the Blend Weights
Let $H_W$ be the weight applied to the highlight tint and $S_W$ be the weight applied to the shadow tint. These are determined by the luminance Y and a user-controlled balance parameter $B_{\text{bal}}$ (ranging from -1.0 to 1.0):

* If the balance is neutral ($B_{\text{bal}} = 0$), the weights are simply linear maps of brightness:
$$H_W = Y \quad \text{and} \quad S_W = 1.0 - Y$$ 
* Shifting the balance slider modifies the curve, pushing the crossover point higher or lower across the luminance spectrum.

## 3. Linear Interpolation (Lerp) Formula
Let $(R_H, G_H, B_H)$ be the target highlight tint color, and $(R_S, G_S, B_S)$ be the shadow tint color. The software mixes these targets with the original pixel color using linear interpolation equations:
$$R_{\text{new}} = R \cdot (1 - H_W - S_W) + (R_H \cdot H_W) + (R_S \cdot S_W)$$ 
$$G_{\text{new}} = G \cdot (1 - H_W - S_W) + (G_H \cdot H_W) + (G_S \cdot S_W)$$ 
$$B_{\text{new}} = B \cdot (1 - H_W - S_W) + (B_H \cdot H_W) + (B_S \cdot S_W)$$ 
## 4. Alternative Method: Color Blending in HSL
Alternatively, instead of direct RGB math, the filter can lock the original lightness (L), and mathematically calculate the new Hue (H) and Saturation (S) directly:
$$H_{\text{new}} = \text{lerp}(H_{\text{shadow}}, H_{\text{highlight}}, Y)$$ 
$$S_{\text{new}} = \text{lerp}(S_{\text{shadow}}, S_{\text{highlight}}, Y)$$ 
------------------------------
## ✅ Summary of Formula Result
The mathematics of split toning demonstrate that by using a pixel's individual brightness value as a scale weight, the engine dynamically calculates a mathematical bridge between two entirely different colors, blending them seamlessly across the image landscape.
If you would like to explore further, I can provide a Python code example using the Pillow library to apply split toning to an image, or showcase how to calculate specific color harmonies like complementary split tones! [16] 

[1] [https://focus.picfair.com](https://focus.picfair.com/articles/how-to-use-split-toning-in-your-photography)
[2] [https://photography.tutsplus.com](https://photography.tutsplus.com/tutorials/quick-tip-2-split-toning-techniques-in-adobe-photoshop--photo-4425)
[3] [https://docs.blender.org](https://docs.blender.org/manual/en/latest/compositing/types/creative/split_toning.html)
[4] [https://www.northlandscapes.com](https://www.northlandscapes.com/articles/what-is-split-toning-and-how-to-use-it-in-lightroom)
[5] [https://digital-photography-school.com](https://digital-photography-school.com/how-to-split-tone-black-and-white-photos-in-lightroom/)
[6] [https://bwvision.com](https://bwvision.com/advanced-split-toning-techniques/)
[7] [https://photographyhero.com](https://photographyhero.com/learn-split-toning-lightroom-creative-images/)
[8] [https://seandalt.com](https://seandalt.com/split-toning-tutorial-adobe-lightroom/)
[9] [https://www.chasewild.com](https://www.chasewild.com/chasewild-journal/split-toning-secrets-how-split-toning-works)
[10] [https://shotkit.com](https://shotkit.com/lightroom-split-toning/)
[11] [https://www.lightstalking.com](https://www.lightstalking.com/how-to-create-duotones-and-split-tones-in-lightroom/)
[12] [https://www.cleverphotographer.com](https://www.cleverphotographer.com/blog/luminar-neo-toning-tool)
[13] [https://www.photoshopessentials.com](https://www.photoshopessentials.com/photo-effects/split-toning/)
[14] [https://seandalt.com](https://seandalt.com/split-toning-tutorial-adobe-lightroom/)
[15] [https://discuss.pixls.us](https://discuss.pixls.us/t/how-can-i-do-split-toning-in-rawtherapee/1772)
[16] [https://exportkit.com](https://exportkit.com/split-complementary-colors/)
