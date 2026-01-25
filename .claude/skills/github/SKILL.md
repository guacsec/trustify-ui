---
name: github
description: Create and manage GitHub issues, pull requests, and interact with repositories. Use when creating issues, PRs, viewing GitHub resources, managing labels, or checking CI status.
argument-hint: [action] [arguments]
disable-model-invocation: false
allowed-tools: Bash(gh *)
---

# GitHub Assistant

Interact with GitHub repositories using the GitHub CLI (`gh`).

- In all interactions and commit messages, be extremelly concise and sacrifice grammar for the sake of concision.

## PR Comments

<pr-comment-rule>
When I say to ad a comment to a PR with a TODO on it, use 'checkbox' markdown format to add the TODO. For instance:

<example>
- [ ] A description of the todo goes here
</example>
</pr-comment-rule>

## Git

- Use `conventional commits`. E.g. "feat: something", "fix: something", "chore: something", etc.
- When creating branches, prefix them with the type task done. E.g. "feat", "hotfix", "tests", "chore", "docs", etc.
