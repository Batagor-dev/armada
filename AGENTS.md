<!-- BEGIN:nextjs-agent-rules -->

# Next.js Project Agent Rules

This project uses a customized Next.js architecture.

Before generating, editing, or refactoring code:

1. Read and understand:
   - AGENT.md
   - Frontend.md
   - ui-ux.md

2. Priority Order:
   - UI/UX decisions → ui-ux.md
   - Frontend architecture → Frontend.md
   - Project-specific behavior → AGENT.md

3. Never generate code before understanding:
   - Design system
   - Component structure
   - Color palette
   - Typography rules
   - Responsive strategy
   - Folder architecture
   - State management pattern
   - API consumption pattern

4. All generated code must follow:
   - Existing project architecture
   - Existing naming conventions
   - Existing design system
   - Existing reusable component patterns

5. Before creating new components:
   - Check if a similar component already exists.
   - Prefer extending existing components over creating new ones.

6. UI Generation Requirements:
   - Follow spacing rules from ui-ux.md
   - Follow typography scale from ui-ux.md
   - Follow color tokens from ui-ux.md
   - Maintain visual consistency across all pages

7. Frontend Development Requirements:
   - Follow folder structure from Frontend.md
   - Follow import conventions
   - Follow state management standards
   - Follow API integration patterns
   - Follow TypeScript best practices

8. When creating pages:
   - Ensure SEO best practices
   - Ensure accessibility (WCAG)
   - Ensure responsive behavior
   - Ensure performance optimization

9. Before implementing:
   - Analyze Frontend.md
   - Analyze ui-ux.md
   - Explain any conflicts between documents
   - Then generate code

10. If documentation conflicts:
    Priority:
    ui-ux.md > Frontend.md > AGENT.md

11. Never assume project conventions.
    Always derive conventions from:
    - Frontend.md
    - ui-ux.md
    - Existing codebase

12. Generated code should feel like it was written by the project's original developer.

# Skill Loading Procedure

For every task:

Step 1:
Read Frontend.md completely.

Step 2:
Read ui-ux.md completely.

Step 3:
Extract:
- Design principles
- Component patterns
- Architecture patterns
- Naming conventions
- Accessibility requirements
- Responsive rules

Step 4:
Apply extracted rules before generating any code.

Step 5:
Validate output against both documents.

<!-- END:nextjs-agent-rules -->