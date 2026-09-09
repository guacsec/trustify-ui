# 3. Use PatternFly 6 as the Design System

Date: 2026-05-20

## Status

Accepted

## Context

The UI needs a consistent, accessible component library. The team has experience with Red Hat's ecosystem and the application targets enterprise users who expect familiar UX patterns. Building custom components from scratch would increase maintenance burden and risk accessibility gaps.

## Decision

Use PatternFly 6 as the sole design system. All UI components should use PatternFly primitives. Custom CSS should be avoided unless PatternFly does not provide the needed component or layout.

## Consequences

- Consistent, accessible UI out of the box (WCAG 2.1 AA)
- Faster development by reusing battle-tested components
- Enterprise users get familiar interaction patterns
- Trade-off: constrained to PatternFly's design language and upgrade cycle
- Trade-off: customization requires working within PatternFly's extension points
