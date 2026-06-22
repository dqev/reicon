#!/usr/bin/env bash
#
# setup-labels.sh — Create/update the GitHub label set for Reicon.
#
# A curated label scheme for an open-source icon library: type labels,
# icon-specific labels, area labels, and triage/workflow labels.
#
# Requirements:
#   - GitHub CLI (gh)  ->  https://cli.github.com
#   - Authenticated     ->  gh auth login
#
# Usage:
#   ./scripts/setup-labels.sh                 # apply to the current repo
#   ./scripts/setup-labels.sh owner/repo      # apply to a specific repo
#   DELETE_DEFAULTS=1 ./scripts/setup-labels.sh   # also remove unused defaults
#
set -euo pipefail

# ── Preflight ──────────────────────────────────────────────────────────
if ! command -v gh >/dev/null 2>&1; then
  echo "❌ GitHub CLI 'gh' is not installed. Install it: https://cli.github.com"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "❌ Not authenticated. Run: gh auth login"
  exit 1
fi

# Optional repo arg (defaults to the repo in the current directory).
REPO_ARG=()
if [[ "${1:-}" != "" ]]; then
  REPO_ARG=(--repo "$1")
  echo "🎯 Target repo: $1"
else
  echo "🎯 Target repo: current directory"
fi

# ── Helper: create or update a label ───────────────────────────────────
# Args: name  color(hex, no #)  description
label() {
  local name="$1" color="$2" desc="$3"
  if gh label create "$name" --color "$color" --description "$desc" "${REPO_ARG[@]}" --force >/dev/null 2>&1; then
    echo "  ✓ $name"
  else
    echo "  ✗ failed: $name"
  fi
}

echo ""
echo "── Type ───────────────────────────────────────────────"
label "bug"               "d73a4a" "A broken or incorrectly rendering feature"
label "enhancement"       "a2eeef" "New feature or improvement"
label "documentation"     "0075ca" "Docs, usage guide, or README changes"
label "question"          "d876e3" "Further information is requested"

echo ""
echo "── Icon library ───────────────────────────────────────"
label "icon request"      "fbca04" "Request for a new icon"
label "new icon"          "0e8a16" "Adding a new icon to the set"
label "icon fix"          "e99695" "Visual/alignment/grid issue with an existing icon"
label "design"            "c5def5" "Consistency, stroke, weight, optical balance"

echo ""
echo "── Area ───────────────────────────────────────────────"
label "website"           "1d76db" "reicon.dev site (UI, pages, playground)"
label "packages"          "5319e7" "reicon-react / reicon-vue / CDN bundle"
label "SEO"               "bfd4f2" "Sitemaps, meta, structured data, indexing"
label "performance"       "d4c5f9" "Rendering, bundle size, runtime speed"
label "accessibility"     "006b75" "a11y, ARIA, contrast, keyboard"

echo ""
echo "── Community ──────────────────────────────────────────"
label "good first issue"  "7057ff" "Good for newcomers"
label "help wanted"       "008672" "Maintainers would love a hand here"
label "duplicate"         "cfd3d7" "Already tracked elsewhere"
label "wontfix"           "ffffff" "Intentionally out of scope"

echo ""
echo "── Triage / workflow ──────────────────────────────────"
label "needs triage"      "ededed" "Awaiting maintainer review"
label "needs info"        "fef2c0" "Blocked pending reporter response"
label "in progress"       "fbca04" "Actively being worked on"
label "blocked"           "b60205" "Blocked by another issue or dependency"
label "priority: high"    "b60205" "Urgent / breaking"
label "priority: low"     "c2e0c6" "Nice to have, no rush"

# ── Optional: remove redundant GitHub defaults ─────────────────────────
if [[ "${DELETE_DEFAULTS:-0}" == "1" ]]; then
  echo ""
  echo "── Removing redundant default labels ──────────────────"
  for d in "invalid"; do
    if gh label delete "$d" "${REPO_ARG[@]}" --yes >/dev/null 2>&1; then
      echo "  ✓ removed $d"
    else
      echo "  · $d not present"
    fi
  done
fi

echo ""
echo "✅ Done. View them: gh label list ${1:+--repo $1}"
