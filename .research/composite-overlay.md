## Image Processing Help Guide: Composite Overlay & Blending Modes
A composite overlay is a core image processing technique that combines two separate image arrays into a single, unified output canvas. This process overlays a Source Image (Top Layer/Foreground) onto a Destination Image (Bottom Layer/Background) using mathematical operators known as Blend Modes, alongside a global Opacity modifier. [1, 2, 3, 4] 
------------------------------
## Summary of Component Mechanics

 [ Source Image (Top Layer) ]  --> (Opacity Scale) 
                                        │
                                        ▼
                                 [ BLEND MODE ] ◄── [ Destination Image (Bottom Layer) ]
                                        │
                                        ▼
                             [ Final Composite Pixel ]


* Variables Matrix: In digital image workflows, pixel values for both layers are normalized from standard 8-bit integers (0 to 255) to decimal fractions between 0.0 (absolute black) and 1.0 (absolute white) before blending math is calculated.
* S: Normalized color channel value of the Source (Top) pixel.
   * D: Normalized color channel value of the Destination (Bottom) pixel.
   * α: The Opacity slider value, mapped from 0.0 (completely transparent) to 1.0 (completely opaque). [5, 6, 7, 8] 

------------------------------
## The Four Blending Modes: Mathematical Reference## 1. Over (Normal Alpha Blending)
The Over mode treats the source layer as a standard decal or sticker placed on top of the background. It is a linear interpolation function that maps visibility directly to the alpha/opacity channel.

* Visual Behavior: Regular transparency. At 100% opacity, the top layer completely hides the bottom layer.
* The Math Formula:
$$Output = (S \cdot \alpha) + (D \cdot (1.0 - \alpha))$$ [9, 10] 

## 2. Multiply
The Multiply mode acts like stacking two photographic slides together in front of a single projector light. It calculates the product of the two color channels. [11, 12, 13, 14] 

* Visual Behavior: The image always gets darker. Any white area (1.0) in either layer acts as transparent data, leaving the other layer unchanged. Black areas (0.0) turn the output completely black.
* The Math Formula:
$$Output = S \cdot D$$ 
(With opacity tracking applied: $Output = (S \cdot D \cdot \alpha) + (D \cdot (1.0 - \alpha))$) [15, 16, 17, 18] 

## 3. Screen
The Screen mode is the exact mathematical inverse of Multiply. It simulates projecting both images onto a single screen simultaneously. [19, 20, 21] 

* Visual Behavior: The image always gets brighter. Black areas (0.0) act as transparent data, leaving the other layer unchanged. White areas (1.0) force the final output to stay pure white. It is highly effective for making double exposures or blending glowing textures.
* The Math Formula:
$$Output = 1.0 - (1.0 - S) \cdot (1.0 - D)$$ [22, 23, 24, 25, 26] 

## 4. Overlay
The Overlay mode is a conditional, non-linear hybrid mode. It checks the brightness of the background layer. If the background is dark, it applies a Multiply blend; if the background is bright, it applies a Screen blend. [27, 28, 29, 30] 

* Visual Behavior: It preserves the deep shadows and bright highlights of the bottom layer while injecting the colors and patterns of the top layer. This results in an intense, punchy contrast boost.
* The Math Formula:
$$Output = \begin{cases} 2 \cdot S \cdot D, & \text{if } D < 0.5 \\ 1.0 - 2 \cdot (1.0 - S) \cdot (1.0 - D), & \text{if } D \ge 0.5 \end{cases}$$ [31, 32, 33, 34, 35] 

------------------------------
## Operational Constraints & Safe Guarding (Clamping)
Because additive blend steps can yield numbers that exceed standard color capacities, graphics engines apply a strict capping (clamping) constraints function before encoding the final data array back into an 8-bit space:
$$\text{Final Pixel Value} = \lfloor \max(0.0, \min(1.0, Output)) \cdot 255 \rfloor$$ 
This safety step prevents unexpected digital color inversion artifacts or clipping errors on screen displays.
------------------------------
If you are currently setting up a pipeline, I can provide a ready-to-run Python script using NumPy or Pillow to execute these exact four formulas on your image files, or show you how to stack these modes to create advanced texture overlays! What would you like to build next?

[1] [https://usage.imagemagick.org](https://usage.imagemagick.org/compose/)
[2] [https://www.videomaker.com](https://www.videomaker.com/article/c03/18076-blending-modes-explained/)
[3] [https://www.ni.com](https://www.ni.com/docs/en-US/bundle/ni-vision-labview-api-ref/page/imaqvision/overlay_pal.html)
[4] [https://www.sidefx.com](https://www.sidefx.com/docs/houdini/nodes/cop/blend.html)
[5] [https://help.corel.com](http://help.corel.com/paintshop-pro/v20/main/en/documentation/Corel_PaintShop_Pro/Combining_images.html)
[6] [https://u.osu.edu](https://u.osu.edu/syahidahbintimohdkhairi.1/2019/04/16/blend-modes/)
[7] [https://www.w3.org](https://www.w3.org/TR/compositing-1/)
[8] [https://adaptivesupport.amd.com](https://adaptivesupport.amd.com/s/article/806149)
[9] [https://code.tutsplus.com](https://code.tutsplus.com/introducing-blend-modes-in-flash--active-8285t)
[10] [https://skylum.com](https://skylum.com/how-to/how-to-blend-two-images-in-photoshop)
[11] [https://www.provideocoalition.com](https://www.provideocoalition.com/composite_modes_in_final_cut_pro/)
[12] [https://www.photoshopessentials.com](https://www.photoshopessentials.com/photo-editing/layer-blend-modes/multiply/)
[13] [https://www.sitepoint.com](https://www.sitepoint.com/multiply-mode-in-photoshop/)
[14] [https://oreillymedia.github.io](https://oreillymedia.github.io/Using_SVG/guide/blend-modes.html)
[15] [https://docs.imgix.com](https://docs.imgix.com/apis/rendering/blending/blend-mode)
[16] [https://lumatouch.clickhelp.co](https://lumatouch.clickhelp.co/articles/lumafusion-reference-guide-publication/blend-modes)
[17] [https://www.manula.com](https://www.manula.com/manuals/fxhome/hitfilm/2022.1/en/topic/compositing-with-blend-modes)
[18] [https://gamedev.stackexchange.com](https://gamedev.stackexchange.com/questions/202096/why-does-setting-blend-mode-in-unity-shader-graph-to-multiply-create-artifacts-o)
[19] [https://www.videomaker.com](https://www.videomaker.com/article/c03/18076-blending-modes-explained/)
[20] [https://www.schoolofmotion.com](https://www.schoolofmotion.com/blog/blending-modes-after-effects)
[21] [https://3dartist.substack.com](https://3dartist.substack.com/p/basic-compositing-layers-explained)
[22] [https://www.schoolofmotion.com](https://www.schoolofmotion.com/blog/blending-modes-after-effects)
[23] [https://docs.darktable.org](https://docs.darktable.org/usermanual/development/en/darkroom/masking-and-blending/blend-modes/)
[24] [https://docs.kdenlive.org](https://docs.kdenlive.org/en/compositing/blending_modes.html)
[25] [https://flyingmeat.com](https://flyingmeat.com/acorn/docs/layers_basics.html)
[26] [https://www.manula.com](https://www.manula.com/manuals/fxhome/hitfilm/2022.1/en/topic/compositing-with-blend-modes)
[27] [https://krita-artists.org](https://krita-artists.org/t/blending-modes-does-overlay-really-integrate-multiply-and-screen/94341)
[28] [https://u.osu.edu](https://u.osu.edu/syahidahbintimohdkhairi.1/2019/04/16/blend-modes/)
[29] [https://www.videomaker.com](https://www.videomaker.com/article/c03/18076-blending-modes-explained/)
[30] [https://www.cleverphotographer.com](https://www.cleverphotographer.com/blog/mastering-blending-modes-luminar-neo)
[31] [https://helpx.adobe.com](https://helpx.adobe.com/au/indesign/using/blending-colors.html)
[32] [https://blog.openreplay.com](https://blog.openreplay.com/use-css-blend-modes-for-creative-image-and-color-manipulation/)
[33] [https://medialoot.com](https://medialoot.com/blog/photoshop-layer-blending-modes-explained/)
[34] [https://www.on1.com](https://www.on1.com/videos/tech-talk-blending-modes/)
[35] [https://www.wallpics.com](https://www.wallpics.com/blogs/news/iphone-photo-overlay-how-to-overlay-photos-on-an-iphone-using-superimpose-x)
