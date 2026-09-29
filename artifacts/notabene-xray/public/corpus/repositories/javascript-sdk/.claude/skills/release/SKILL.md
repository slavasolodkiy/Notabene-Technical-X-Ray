---
name: release
description: Use when creating a production release MR from dev to master, or when the user says "release", "create a release MR", or "ship to production"
---

# Release

Create a production release merge request from `dev` → `master`.

Semantic-release runs on CI when the MR is merged into `master`, determining the version bump from conventional commits.

## Steps

1. **Verify you are on `dev`** and fetch latest remote state
   ```bash
   git fetch origin master dev
   ```
   If not on `dev`, switch to it first: `git checkout dev && git pull origin dev`.

2. **Compare branches** to build the changelog
   ```bash
   git log origin/master..origin/dev --oneline --no-merges | grep -v "chore(release)" | grep -v "\[skip ci\]"
   git diff origin/master..origin/dev --stat
   ```
   Collect the meaningful changelog entries (fixes, features, refactors).

3. **Check for and resolve merge conflicts** by attempting a trial merge
   ```bash
   git merge origin/master --no-commit --no-ff
   ```
   - **Already up to date:** skip this step entirely.
   - **Clean merge:** finalize with `git commit -m "chore: merge master into dev"` and `git push origin dev`.
   - **Conflicts:** resolve them (see Conflict Resolution below), then commit and push.

4. **Create the MR on GitLab**
   - Source: `dev` → Target: `master`
   - Project: `notabene/open-source/javascript-sdk`
   - Title: `Release <YYYY-MM-DD>` (use today's date)
   - Description: summary + bulleted list of meaningful changes + file stats

## Conflict Resolution

The only expected conflict is in `package.json` on the `version` field:
- `dev` has e.g. `2.19.0-next.3`
- `master` has e.g. `2.19.0`
- **Always keep dev's version** (the `-next.X` variant) — it is the most recent. Semantic-release will set the correct production version when the MR lands on master.
- **Never rebase** dev onto master — it rewrites shared branch history.
- If there are conflicts in files other than `package.json`, stop and ask the user — those are unexpected.
