---
title: Git And Github CLI
description: A cheatsheet to use git and github's CLI
time: 02:01:00
date: 20-01-2026
---
Here’s a **small, clean, high-signal cheat sheet** for **Git + GitHub + `gh` CLI** — the kind you actually keep open while working 👇

No fluff, only **day-to-day + prod-useful commands**.


## 🔹 Git (Local)

### Repo basics

```bash
git init
git clone https://github.com/org/repo.git
```

### Status & history

```bash
git status
git log --oneline --graph --decorate
git diff
```

---

### Staging & commit

```bash
git add .
git add file.txt
git commit -m "feat: add login endpoint"
```

Amend last commit:

```bash
git commit --amend
```

---

### Branching

```bash
git branch
git branch feature-x
git checkout feature-x
git switch -c feature-x
```

Delete branch:

```bash
git branch -d feature-x
```

---

### Sync with remote

```bash
git fetch
git pull
git push
```

Push new branch:

```bash
git push -u origin feature-x
```

---

### Rebase (used in prod)

```bash
git rebase main
git rebase -i HEAD~3
```

Abort:

```bash
git rebase --abort
```

---

### Reset (danger zone)

```bash
git reset --soft HEAD~1
git reset --hard HEAD~1
```

---

## 🔹 GitHub (Concepts)

|Concept|Meaning|
|---|---|
|Repo|Project|
|Fork|Copy of repo|
|PR|Pull Request|
|Review|Code approval|
|Issue|Task / bug|
|Actions|CI/CD|

---

## 🔹 GitHub Flow (Standard)

```text
main → feature branch → PR → review → merge
```

✔ No direct push to `main`  
✔ PR required

---

## 🔹 gh CLI (GitHub CLI)

### Auth

```bash
gh auth login
gh auth status
```

---

### Repo

```bash
gh repo clone org/repo
gh repo create
```

---

### Pull Requests (MOST USED)

Create PR:

```bash
gh pr create
```

Create PR (quick):

```bash
gh pr create --fill
```

List PRs:

```bash
gh pr list
```

View PR:

```bash
gh pr view 12
```

Checkout PR locally:

```bash
gh pr checkout 12
```

---

### Review & merge

```bash
gh pr review --approve
gh pr merge --squash
```

---

### Issues

```bash
gh issue list
gh issue create
gh issue view 5
```

---

### Releases (Prod tagging)

```bash
gh release create v1.2.0
gh release list
```

---

## 🔹 Git Tags (Production)

```bash
git tag v1.2.0
git push origin v1.2.0
```

Lightweight:

```bash
git tag v1.2.0
```

Annotated (preferred):

```bash
git tag -a v1.2.0 -m "release v1.2.0"
```

---

## 🔹 Undo Mistakes (VERY COMMON)

Undo last commit (keep code):

```bash
git reset --soft HEAD~1
```

Undo staged file:

```bash
git restore --staged file.txt
```

Undo local changes:

```bash
git restore file.txt
```

---

## 🔹 .gitignore (Must Have)

```gitignore
.env
node_modules/
dist/
*.log
```

---

## 🔹 Best Practices (Senior Level)

✔ Small commits  
✔ Meaningful messages  
✔ Feature branches  
✔ Rebase before PR  
✔ Squash on merge  
✔ Tags for releases

---

## 🔥 Common Anti-Patterns

❌ Pushing to main  
❌ Huge commits  
❌ Secrets in Git  
❌ Force push to shared branches
