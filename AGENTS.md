# AGENT.md — Next.js Project Rules

> **Codex: Before generating ANY code, read these files in order:**
> 1. `Frontend.md` → architecture, folder structure, patterns
> 2. `ui-ux.md` → design tokens, spacing, typography, colors

---

## Priority Order

```
ui-ux.md  >  Frontend.md  >  AGENT.md
```

---

## Pre-Generation Checklist

Before writing any code, confirm you know:

- [ ] Design tokens (colors, spacing, typography) from `ui-ux.md`
- [ ] Folder structure & naming conventions from `Frontend.md`
- [ ] State management pattern
- [ ] API consumption pattern
- [ ] Existing components (extend before creating new)

---

## Code Rules

| Concern | Rule |
|---|---|
| Components | Check existing first. Extend > create new. |
| Naming | Match existing conventions exactly |
| TypeScript | Strict — no `any` |
| Styling | Use design tokens from `ui-ux.md` only |
| State | Follow `Frontend.md` pattern |
| API calls | Follow `Frontend.md` integration pattern |

---

## Page Requirements

Every page must have:
- SEO meta tags
- WCAG accessibility
- Responsive layout
- Optimized performance

---

## Skill Loading (Sequential — No Skipping)

```
Step 1 → Read Frontend.md fully
Step 2 → Read ui-ux.md fully
Step 3 → Extract: design tokens, component patterns, naming conventions
Step 4 → Apply rules
Step 5 → Validate output against both docs
```

---

## Conflict Resolution

If `Frontend.md` and `ui-ux.md` conflict → **`ui-ux.md` wins.**  
If conflict exists, state it explicitly before generating.

---

## Output Quality Standard

> Generated code must read as if written by the project's original developer.  
> Never assume conventions — always derive from the docs above.