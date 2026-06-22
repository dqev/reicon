# Branching & Git Workflow

A practical guide to how we use Git on Reicon — branches, commits, pushing, and
pull requests. If you're new here, read this once and you'll be set. 💜

> New to contributing? Start with [CONTRIBUTING.md](./CONTRIBUTING.md) first,
> then come back here for the Git details.

---

## TL;DR

```bash
# 1. Sync main
git checkout main
git pull origin main

# 2. Create a branch for your work
git checkout -b fix/bell-icon-stroke

# 3. Make changes, then commit
git add <files>
git commit -m "fix: correct stroke width on bell icon"

# 4. Push your branch
git push -u origin fix/bell-icon-stroke

# 5. Open a Pull Request on GitHub → base: main
```

**Never commit directly to `main`.** All changes land through pull requests.

---

## The golden rules

1. **`main` is always releasable.** It's protected — you can't push to it directly.
2. **One branch = one focused change.** Don't mix a bug fix with a new feature.
3. **Branch off the latest `main`.** Always `git pull` before creating a branch.
4. **Open a PR for everything.** Even tiny changes get reviewed and merged via PR.
5. **Keep branches short-lived.** Open, review, merge, delete. Avoid long-running branches.

---

## Branch naming

Use a `type/short-description` format in lowercase with dashes:

```
<type>/<short-description>
```

| Type | Use for | Example |
|------|---------|---------|
| `feat/` | New feature | `feat/icon-search-filters` |
| `fix/` | Bug fix | `fix/sidebar-scroll-jump` |
| `icon/` | New or fixed icon(s) | `icon/add-split-screen` |
| `docs/` | Documentation only | `docs/clarify-vue-setup` |
| `perf/` | Performance work | `perf/icon-grid-virtualization` |
| `chore/` | Tooling, deps, config, repo housekeeping | `chore/update-dependencies` |
| `refactor/` | Code restructure, no behavior change | `refactor/extract-icon-card` |

Keep it short and descriptive — `fix/login` is too vague, `fix/bell-icon-off-center` is good.

---

## Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). Format:

```
<type>: <short summary in present tense>
```

Examples:

```
feat: add split-screen icon in both weights
fix: correct stroke width on bell icon
docs: clarify Vue 3 installation steps
perf: memoize icon grid cards
chore: bump vite to 6.2.3
```

Guidelines:

- Keep the summary under ~70 characters.
- Use the imperative mood: "add", not "added" or "adds".
- One logical change per commit where possible.
- Add a body (after a blank line) if the change needs explanation:

```
fix: prevent icon flicker on weight toggle

The CDN runtime re-fetched SVGs on every weight change. Cache the
rendered SVG per weight so toggling is instant.
```

---

## The full workflow, step by step

### 1. Sync your local `main`

```bash
git checkout main
git pull origin main
```

### 2. Create your branch

```bash
git checkout -b feat/your-feature
```

### 3. Work and commit

Make your changes, then stage **specific files** (avoid `git add .` so you don't
commit stray files):

```bash
git add src/components/Sidebar.tsx
git commit -m "feat: add collapsible sidebar sections"
```

Before pushing, run the checks:

```bash
npm run lint     # TypeScript type check
npm run build    # make sure it builds
```

If you changed icons, also rebuild the packages:

```bash
npm run build:packages
```

### 4. Push your branch

First push sets the upstream with `-u`:

```bash
git push -u origin feat/your-feature
```

After that, just:

```bash
git push
```

### 5. Open a Pull Request

- Go to the repo on GitHub — it'll prompt you to open a PR for your branch.
- **Base branch:** `main`. **Compare branch:** your branch.
- Fill out the [PR template](./PULL_REQUEST_TEMPLATE.md).
- Link the issue it closes (e.g. `Closes #123`).
- Add before/after screenshots for any visual change.

### 6. Respond to review

- Push more commits to the same branch — the PR updates automatically.
- Once approved, a maintainer merges it (usually **Squash and merge**).

### 7. Clean up

After your PR is merged:

```bash
git checkout main
git pull origin main
git branch -d feat/your-feature        # delete local branch
git push origin --delete feat/your-feature   # delete remote branch (optional)
```

---

## Keeping your branch up to date

If `main` moves ahead while your PR is open, sync it in:

```bash
git checkout main
git pull origin main
git checkout feat/your-feature
git merge main          # or: git rebase main
```

Resolve any conflicts, then push again. Use `merge` if you're unsure — it's the
safer, simpler option.

---

## Working from a fork (external contributors)

If you don't have write access, fork the repo first:

```bash
# 1. Fork on GitHub, then clone your fork
git clone https://github.com/<your-username>/reicon.git
cd reicon

# 2. Add the original repo as "upstream"
git remote add upstream https://github.com/dqev/reicon.git

# 3. Keep your fork's main in sync
git checkout main
git pull upstream main
git push origin main

# 4. Branch, commit, push to YOUR fork, then open a PR against dqev/reicon
git checkout -b feat/your-feature
git push -u origin feat/your-feature
```

---

## Releases (maintainers)

Releases are cut from `main` after the relevant PRs are merged, using
[Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

- **PATCH** (`1.0.1`) — bug fixes, icon fixes.
- **MINOR** (`1.1.0`) — new icons or features, backward compatible.
- **MAJOR** (`2.0.0`) — breaking changes.

```bash
# 1. Make sure main is up to date and CHANGELOG.md is updated
git checkout main
git pull origin main

# 2. Create the release (tag is created on main's latest commit)
gh release create v1.1.0 --target main --title "Reicon v1.1.0" --notes-file notes.md --latest
```

Update [`CHANGELOG.md`](../CHANGELOG.md) in the same PR that introduces the changes.

---

## Quick reference

| Task | Command |
|------|---------|
| Update main | `git pull origin main` |
| New branch | `git checkout -b type/name` |
| Stage a file | `git add <file>` |
| Commit | `git commit -m "type: message"` |
| First push | `git push -u origin type/name` |
| Later pushes | `git push` |
| Switch branch | `git checkout <branch>` |
| See status | `git status` |
| See branches | `git branch` |
| Sync branch with main | `git merge main` |
| Delete local branch | `git branch -d type/name` |

---

## Common mistakes (and fixes)

**"I committed to `main` by accident."**
```bash
git branch fix/my-work        # save your work to a new branch
git checkout main
git reset --hard origin/main  # reset main to remote (⚠️ discards local main commits)
git checkout fix/my-work      # continue on the branch
```

**"I need to undo my last commit but keep the changes."**
```bash
git reset --soft HEAD~1
```

**"My branch name is wrong."**
```bash
git branch -m new-branch-name
```

Still stuck? Open a [Discussion](https://github.com/dqev/reicon/discussions) —
we're happy to help. There are no silly questions here. 🙌
