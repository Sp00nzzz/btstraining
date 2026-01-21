# AFTER Test: Component Patterns Skill

## Test Prompt
"Create a new QuantitySelector component for selecting ticket quantities (1-10)"

## Configuration State
- `.claude/skills/component-patterns.md` exists
- Accessibility patterns documented
- Keyboard navigation patterns included
- Tailwind styling conventions defined

## Expected Behavior WITH Component Skill:

### What Claude Knows Immediately:
1. **Structure**: "use client" directive, inline prop types, default export
2. **Accessibility**: Keyboard nav (arrows + Enter/Space), aria-labels
3. **Styling**: clsx, theme variables (accent, ink/15, etc.)
4. **Animations**: Framer Motion or Tailwind transitions
5. **Sizing**: h-7, h-8 button patterns

### Expected Response Pattern:
```
1. "I'll create a QuantitySelector following the component patterns..."
2. [Write component directly - minimal exploration needed]
```

### Tool Call Estimate: 1-2 tool calls
- 1 Write call for component
- (Optional) 1 Read for reference

## Expected Implementation

**With Component Skill, Claude would create:**

```typescript
"use client";

import type { KeyboardEvent } from "react";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  const decrease = () => {
    if (canDecrease) onChange(value - 1);
  };

  const increase = () => {
    if (canIncrease) onChange(value + 1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      decrease();
    }
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      increase();
    }
  };

  return (
    <div
      className="inline-flex items-center gap-2 rounded-lg border border-ink/15 bg-white p-1"
      role="group"
      aria-label="Quantity selector"
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={decrease}
        disabled={!canDecrease}
        aria-label={`Decrease quantity to ${value - 1}`}
        className={clsx(
          "h-8 w-8 rounded-md flex items-center justify-center transition",
          canDecrease
            ? "hover:bg-accent hover:text-white text-ink"
            : "text-ink/30 cursor-not-allowed"
        )}
      >
        <Minus className="h-4 w-4" />
      </button>

      <span
        className="w-8 text-center text-lg font-semibold text-ink"
        aria-live="polite"
      >
        {value}
      </span>

      <button
        onClick={increase}
        disabled={!canIncrease}
        aria-label={`Increase quantity to ${value + 1}`}
        className={clsx(
          "h-8 w-8 rounded-md flex items-center justify-center transition",
          canIncrease
            ? "hover:bg-accent hover:text-white text-ink"
            : "text-ink/30 cursor-not-allowed"
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
```

### Key Improvements from Skill:

1. **"use client" directive** - Included automatically
2. **Inline prop types** - Matches project convention
3. **Keyboard navigation** - Arrow keys support
4. **Accessibility** - aria-labels, aria-live, role="group"
5. **clsx** - Conditional styling
6. **Theme colors** - Uses accent, ink/15, ink/30
7. **Button sizing** - h-8 w-8 pattern
8. **Lucide icons** - Uses project's icon library
9. **Disabled states** - cursor-not-allowed pattern
10. **Transitions** - Smooth hover effects

## Alternative: With Framer Motion

```typescript
import { motion } from "framer-motion";

<motion.button
  onClick={increase}
  disabled={!canIncrease}
  whileHover={canIncrease ? { scale: 1.05 } : {}}
  whileTap={canIncrease ? { scale: 0.95 } : {}}
  className={clsx(...)}
>
```

## Metrics Comparison

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Tool calls needed | 5-8 | 1-2 | **75% reduction** |
| Accessibility | LOW | HIGH | **Full compliance** |
| Pattern consistency | MEDIUM | HIGH | **Matches exactly** |
| Keyboard support | NONE | FULL | **Arrow keys + focus** |
| Animation support | NONE | INCLUDED | **Optional patterns** |
| Code quality | GENERIC | PROJECT-SPECIFIC | **Theme integration** |

## Additional Test Prompt Validation

To further validate, test: "Add a star rating component"

**With skill**: Would immediately include:
- Keyboard navigation (left/right arrows)
- ARIA labels for each star
- Focus management
- Hover states with theme colors
- clsx for selected states

## Summary
**With Component Skill**: HIGH CONFIDENCE - accessible, consistent, production-ready

## Impact Assessment: **MEDIUM-HIGH IMPACT**

The component patterns skill:
- Ensures accessibility compliance
- Eliminates pattern guessing
- Provides reusable code structure
- Integrates with project's icon and animation libraries
- Reduces review cycles for accessibility issues

This skill prevents common accessibility oversights that would require rework.
