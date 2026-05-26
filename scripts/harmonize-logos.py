"""Match logo background pixels to app theme surfaces."""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "assets"

APP_DARK = (5, 5, 5)       # --bg-primary dark
APP_LIGHT = (255, 255, 255)  # --bg-primary light


def replace_neutral_background(arr: np.ndarray, target: tuple[int, int, int], *, light: bool) -> np.ndarray:
    r = arr[:, :, 0].astype(np.int16)
    g = arr[:, :, 1].astype(np.int16)
    b = arr[:, :, 2].astype(np.int16)

    neutral = (np.abs(r - g) < 14) & (np.abs(g - b) < 14)

    if light:
        # Near-white flat background only (not teal/navy logo colors)
        mask = neutral & (r > 210)
    else:
        # Near-black flat background only (not dark navy blues)
        mask = neutral & (r < 55)

    out = arr.copy()
    out[mask] = target
    return out


def harmonize(path: Path, *, light: bool) -> None:
    im = Image.open(path).convert("RGB")
    arr = np.array(im)
    target = APP_LIGHT if light else APP_DARK
    out = replace_neutral_background(arr, target, light=light)
    result = Image.fromarray(out.astype(np.uint8))

    if path.suffix.lower() in {".jpg", ".jpeg"}:
        result.save(path, format="JPEG", quality=92, optimize=True)
    else:
        result.save(path, format="PNG", optimize=True)

    print(f"Harmonized {path.name} -> {'#ffffff' if light else '#050505'}")


def main() -> None:
    harmonize(ASSETS / "logo.jpeg", light=False)
    harmonize(ASSETS / "png.png", light=True)
    print("Done.")


if __name__ == "__main__":
    main()
