# BEFORE Test: Component Patterns Skill

## Test Prompt
"Create a new QuantitySelector component for selecting ticket quantities (1-10)"

## Configuration State
- No component patterns skill defined
- Must infer patterns from exploring existing components
- No explicit accessibility or animation guidelines

## Simulated Test Run

### What Claude Would Need to Do Without Component Skill:
1. **Find similar components** - Explore for selector/picker patterns
2. **Read multiple components** - Understand structure variations
3. **Identify accessibility patterns** - Find keyboard navigation examples
4. **Learn animation patterns** - If animations are desired
5. **Understand prop patterns** - How to type and structure props

### Expected Behaviors Without Component Skill:
- May create a simple select/dropdown instead of custom component
- May miss keyboard accessibility requirements
- May not use clsx for conditional styling
- May structure props differently than other components
- May not follow "use client" directive consistently

### Tool Call Estimate: 5-8 tool calls
- 2-3 Glob/Read for existing components
- 1-2 Read for similar selector patterns
- 1-2 Write/Edit for implementation
- Possible exploration agent

### Expected Implementation (Without Skill):

```typescript
// May look like this - generic React pattern, not project-specific
import { useState } from "react";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({
  min = 1,
  max = 10,
  value,
  onChange
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="px-3 py-1 border rounded"
      >
        -
      </button>
      <span>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="px-3 py-1 border rounded"
      >
        +
      </button>
    </div>
  );
}
```

### Quality Concerns:
1. Missing "use client" directive
2. Generic styling instead of project theme
3. No keyboard accessibility (arrow keys, enter)
4. No aria-labels for buttons
5. No Framer Motion animations
6. Props interface instead of inline types
7. Generic class names instead of theme variables

## Baseline Metrics
- **Tool calls needed for context**: ~4-6
- **Accessibility compliance**: LOW
- **Pattern consistency**: MEDIUM
- **Animation support**: NONE

## Key Component Patterns This Project Uses:

### What Makes Our Components Distinct:
1. `"use client"` directive at top
2. Inline prop types (not interfaces)
3. clsx for conditional classes
4. Tailwind with theme variables
5. Keyboard navigation (arrow keys + Enter/Space)
6. aria-labels for interactive elements
7. Disabled state styling with cursor-not-allowed
8. Theme colors: accent, tmDark, tmGray

### Without skill, Claude may miss:
- Focus management patterns
- Proper button sizing (h-7, h-8 patterns)
- Border styling (border-ink/15)
- Shadow utilities (shadow-soft)
- Responsive considerations

## Summary
**Baseline State**: MEDIUM FRICTION - functional but not matching project patterns
