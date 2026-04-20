#!/usr/bin/env bash
# Re-fetch untransformed originals from Wix CDN to replace the low-res thumbnails
# currently in public/images/. Backs up existing files to public/images/.backup/
# before overwriting. Only replaces if the fetched file has larger pixel area
# than the current file.

set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)/public/images"
BACKUP="$DIR/.backup"
mkdir -p "$BACKUP"

cd "$DIR"

total=0; upgraded=0; same=0; failed=0
for f in *.{jpg,jpeg,png,webp}; do
  [ -f "$f" ] || continue
  total=$((total+1))
  url="https://static.wixstatic.com/media/$f"
  tmp="$(mktemp --suffix=".${f##*.}")"

  http_code=$(curl -s -o "$tmp" -w "%{http_code}" "$url" || echo "000")
  if [ "$http_code" != "200" ] || [ ! -s "$tmp" ]; then
    echo "  [fail $http_code] $f"
    rm -f "$tmp"
    failed=$((failed+1))
    continue
  fi

  old_wh=$(identify -format "%w %h" "$f" 2>/dev/null || echo "0 0")
  new_wh=$(identify -format "%w %h" "$tmp" 2>/dev/null || echo "0 0")
  old_area=$(( $(echo "$old_wh" | awk '{print $1*$2}') ))
  new_area=$(( $(echo "$new_wh" | awk '{print $1*$2}') ))

  if [ "$new_area" -gt "$old_area" ]; then
    old_dim=$(identify -format "%wx%h" "$f")
    new_dim=$(identify -format "%wx%h" "$tmp")
    cp -p "$f" "$BACKUP/$f"
    mv "$tmp" "$f"
    echo "  [up]   $f  $old_dim -> $new_dim"
    upgraded=$((upgraded+1))
  else
    rm -f "$tmp"
    same=$((same+1))
  fi
done

echo "---"
echo "total=$total upgraded=$upgraded unchanged=$same failed=$failed"
echo "backups in $BACKUP"
