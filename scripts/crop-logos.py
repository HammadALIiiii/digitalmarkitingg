"""Trim excess background padding from brand logo assets."""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "assets"
PUBLIC = ROOT / "public"
PADDING_RATIO = 0.02
MIN_PADDING_PX = 8


def content_bbox(arr: np.ndarray, *, light_background: bool) -> tuple[int, int, int, int]:
    rgb = arr[:, :, :3].astype(np.int16)
    alpha = arr[:, :, 3] if arr.shape[2] == 4 else np.full(arr.shape[:2], 255, dtype=np.uint8)

    if light_background:
        near_white = (rgb[:, :, 0] > 242) & (rgb[:, :, 1] > 242) & (rgb[:, :, 2] > 242)
        transparent = alpha < 20
        background = near_white | transparent
    else:
        near_black = (rgb[:, :, 0] < 35) & (rgb[:, :, 1] < 35) & (rgb[:, :, 2] < 35)
        transparent = alpha < 20
        background = near_black | transparent

    content = ~background
    rows = np.where(np.any(content, axis=1))[0]
    cols = np.where(np.any(content, axis=0))[0]

    if rows.size == 0 or cols.size == 0:
        raise ValueError("No visible logo content detected")

    top, bottom = int(rows[0]), int(rows[-1])
    left, right = int(cols[0]), int(cols[-1])
    return left, top, right + 1, bottom + 1


def crop_image(source: Path, dest: Path, *, light_background: bool, save_format: str) -> None:
    original = Image.open(source)
    rgba = original.convert("RGBA")
    arr = np.array(rgba)
    left, top, right, bottom = content_bbox(arr, light_background=light_background)

    w, h = right - left, bottom - top
    pad_x = max(MIN_PADDING_PX, int(w * PADDING_RATIO))
    pad_y = max(MIN_PADDING_PX, int(h * PADDING_RATIO))

    left = max(0, left - pad_x)
    top = max(0, top - pad_y)
    right = min(rgba.width, right + pad_x)
    bottom = min(rgba.height, bottom + pad_y)

    cropped = rgba.crop((left, top, right, bottom))
    print(f"{source.name} -> {dest.name}: {original.size} -> {cropped.size}")

    dest.parent.mkdir(parents=True, exist_ok=True)
    if save_format == "PNG":
        cropped.save(dest, format="PNG", optimize=True)
    else:
        cropped.convert("RGB").save(dest, format="JPEG", quality=92, optimize=True)


def main() -> None:
    light_src = PUBLIC / "logo-light.jpeg" if (PUBLIC / "logo-light.jpeg").exists() else ASSETS / "png.png"
    dark_src = PUBLIC / "logo-dark.jpeg" if (PUBLIC / "logo-dark.jpeg").exists() else ASSETS / "logo.jpeg"

    crop_image(light_src, ASSETS / "png.png", light_background=True, save_format="PNG")
    crop_image(dark_src, ASSETS / "logo.jpeg", light_background=False, save_format="JPEG")
    print("Done — src/assets/png.png (light) and logo.jpeg (dark) trimmed.")


if __name__ == "__main__":
    main()
