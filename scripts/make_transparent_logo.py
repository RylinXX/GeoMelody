#!/usr/bin/env python3
"""
Convert user-provided logo into a true transparent RGBA PNG.
Applies clean alpha channel matting, edge anti-aliasing, and halo elimination.
"""

from PIL import Image
import numpy as np

def generate_transparent_logo():
    src_path = '/Users/rylinx/Downloads/logo透明图需求.png'
    img = Image.open(src_path).convert('RGB')
    arr = np.array(img, dtype=np.float32)

    # 1. Compute grayscale / luminance
    gray = arr.mean(axis=-1)

    # 2. Precise alpha calculation:
    # Anything with gray >= 232 is background (alpha = 0)
    # Anything with gray <= 200 is 100% solid logo (alpha = 255)
    # Between 200 and 232 is smooth anti-aliasing ramp
    alpha = np.clip((232.0 - gray) / (232.0 - 200.0) * 255.0, 0.0, 255.0)

    # 3. Unmultiply white background to remove any light halo on dark themes
    a_norm = np.clip(alpha / 255.0, 0.001, 1.0)[:, :, np.newaxis]
    # Reconstruct original foreground colors:
    rgb_clean = np.clip((arr - (1.0 - a_norm) * 248.0) / a_norm, 0.0, 255.0)

    rgba = np.dstack([rgb_clean, alpha]).astype(np.uint8)
    out_img = Image.fromarray(rgba, mode='RGBA')

    # 4. Crop to content bounding box
    bbox = out_img.getbbox()
    print('Cropped bbox:', bbox)
    cropped = out_img.crop(bbox)

    # 5. Place on square transparent canvas with balanced margins
    max_dim = max(cropped.width, cropped.height)
    pad = int(max_dim * 0.05)
    square_size = max_dim + pad * 2
    square_img = Image.new('RGBA', (square_size, square_size), (0, 0, 0, 0))
    offset = ((square_size - cropped.width) // 2, (square_size - cropped.height) // 2)
    square_img.paste(cropped, offset)

    # Save master high-resolution transparent PNG
    square_img.save('public/logo.png', format='PNG')
    print('Saved public/logo.png:', square_img.size)

    # Save 128x128 transparent PNG
    logo_128 = square_img.resize((128, 128), Image.Resampling.LANCZOS)
    logo_128.save('public/logo-128.png', format='PNG')
    print('Saved public/logo-128.png')

    # Save 64x64 transparent PNG
    logo_64 = square_img.resize((64, 64), Image.Resampling.LANCZOS)
    logo_64.save('public/logo-64.png', format='PNG')
    print('Saved public/logo-64.png')

    # Save 32x32 favicon transparent PNG
    logo_32 = square_img.resize((32, 32), Image.Resampling.LANCZOS)
    logo_32.save('public/favicon.png', format='PNG')
    print('Saved public/favicon.png')

if __name__ == '__main__':
    generate_transparent_logo()
