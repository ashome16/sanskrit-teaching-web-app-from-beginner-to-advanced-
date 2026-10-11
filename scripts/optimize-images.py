#!/usr/bin/env python3
"""
Image Optimization Script
Compresses heavy raster images (JPEG / PNG) using macOS native `sips` tool.
Preserves crisp typography and illustration clarity while significantly reducing file size.
"""
from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path


def format_size(bytes_val: int) -> str:
    """Format bytes into human-readable string."""
    if bytes_val < 1024:
        return f"{bytes_val} B"
    elif bytes_val < 1024 * 1024:
        return f"{bytes_val / 1024:.1f} KB"
    else:
        return f"{bytes_val / (1024 * 1024):.2f} MB"


def optimize_image(filepath: Path, max_dim: int = 1200, quality: int = 55) -> tuple[int, int, bool]:
    """
    Compress image in-place using macOS sips tool.
    Returns (orig_size, new_size, success).
    """
    orig_size = filepath.stat().st_size
    temp_path = filepath.with_name(f".tmp_{filepath.name}")

    try:
        shutil.copy2(filepath, temp_path)

        cmd = [
            'sips',
            '-s', 'formatOptions', str(quality),
            '-Z', str(max_dim),
            str(temp_path)
        ]
        res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
        if res.returncode != 0:
            print(f"Warning: sips error on {filepath.name}: {res.stderr.strip()}", file=sys.stderr)
            if temp_path.exists():
                temp_path.unlink()
            return orig_size, orig_size, False

        new_size = temp_path.stat().st_size

        # Only overwrite if new size is smaller
        if new_size < orig_size:
            temp_path.replace(filepath)
            return orig_size, new_size, True
        else:
            temp_path.unlink()
            return orig_size, orig_size, True

    except Exception as err:
        print(f"Error optimizing {filepath.name}: {err}", file=sys.stderr)
        if temp_path.exists():
            temp_path.unlink()
        return orig_size, orig_size, False


def main():
    parser = argparse.ArgumentParser(description="Compress heavy images in asset directories.")
    parser.add_argument(
        'directories',
        nargs='*',
        default=['src/assets/images'],
        help="Directories to scan for images (default: src/assets/images)"
    )
    parser.add_argument('--max-dim', type=int, default=1200, help="Max width/height dimension (default: 1200)")
    parser.add_argument('--quality', type=int, default=55, help="JPEG quality 1-100 (default: 55)")

    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent.parent

    target_files: list[Path] = []
    for dir_arg in args.directories:
        p = project_root / dir_arg
        if p.is_file():
            target_files.append(p)
        elif p.is_dir():
            for ext in ('*.jpg', '*.jpeg', '*.png'):
                target_files.extend(p.glob(ext))

    if not target_files:
        print(f"No matching images found in: {args.directories}")
        return 0

    print("=" * 80)
    print("🎨 ASSET IMAGE OPTIMIZER & COMPRESSION RUNNER")
    print("=" * 80)
    print(f"Targeting {len(target_files)} image(s) with max dimension {args.max_dim}px, quality {args.quality}%")
    print("-" * 80)
    print(f"{'Filename':<30} {'Original':<12} {'Compressed':<12} {'Saved':<12} {'Reduction'}")
    print("-" * 80)

    total_orig = 0
    total_new = 0

    for filepath in sorted(target_files):
        orig_sz, new_sz, success = optimize_image(filepath, max_dim=args.max_dim, quality=args.quality)
        total_orig += orig_sz
        total_new += new_sz

        saved = orig_sz - new_sz
        reduction_pct = (saved / orig_sz * 100) if orig_sz > 0 else 0.0

        print(
            f"{filepath.name:<30} "
            f"{format_size(orig_sz):<12} "
            f"{format_size(new_sz):<12} "
            f"{format_size(saved):<12} "
            f"{reduction_pct:>6.1f}%"
        )

    total_saved = total_orig - total_new
    total_reduction = (total_saved / total_orig * 100) if total_orig > 0 else 0.0

    print("=" * 80)
    print(f"{'TOTALS:':<30} {format_size(total_orig):<12} {format_size(total_new):<12} {format_size(total_saved):<12} {total_reduction:>6.1f}%")
    print(f"✅ Successfully compressed! Saved {format_size(total_saved)} ({total_reduction:.1f}% space reclaimed)")
    print("=" * 80)

    return 0


if __name__ == '__main__':
    sys.exit(main())
