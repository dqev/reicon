#!/usr/bin/env bash
# add-to-knit.sh — vendor Reicon Compose icons into Knit by kebab-case name.
# Usage: bash add-to-knit.sh send-2 bell heart
# Pick names visually on reicon.dev (the icon page URL ends with the kebab name).
set -euo pipefail

if [ "$#" -eq 0 ]; then
    echo "usage: $(basename "$0") <kebab-name>..." >&2
    exit 1
fi

PKG=/data/data/com.termux/files/home/reicon/packages/reicon-compose
KNIT_ICONS=/storage/emulated/0/CodeOnTheGoProjects/Knit/reicon-compose/src/main/java/dev/reicon

icons=$(IFS=,; echo "$*")
python3 "$PKG/tool/build_kotlin.py" --icons "$icons" --copy-to "$KNIT_ICONS"
echo "Use: ReiconIcon(<Pascal>.Outline, ...) / Icon(<Pascal>.Filled, ...); kebab-to-Pascal, e.g. send-2 -> Send2"
