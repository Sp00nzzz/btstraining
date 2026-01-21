---
name: Component Patterns
description: React component conventions, accessibility patterns, keyboard navigation, Framer Motion animations, and Tailwind styling for this project
---

# Component Patterns

Use this skill when creating new components, refactoring existing ones, or ensuring accessibility compliance.

## Component Structure

### Basic Template
```typescript
"use client";

import { useState, useMemo } from "react";
import type { KeyboardEvent } from "react";
import clsx from "clsx";

export default function ComponentName({
  prop1,
  prop2,
  onAction
}: {
  prop1: string;
  prop2: number;
  onAction?: (value: string) => void;
}) {
  // Component implementation
}
```

### Key Conventions
1. **"use client"** - Always add for components with state or browser APIs
2. **Inline prop types** - Type props directly in function signature, not as separate interface
3. **Default exports** - Use `export default function ComponentName`
4. **Import types** - Use `import type` for type-only imports

## Accessibility Requirements

### Keyboard Navigation
All interactive components MUST support keyboard navigation:

```typescript
const handleKey = (event: KeyboardEvent<HTMLButtonElement>) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelect();
    return;
  }

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    focusNext();
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    focusPrevious();
  }
};
```

### ARIA Labels
```typescript
// Icon buttons need explicit labels
<button
  aria-label={`Decrease quantity to ${value - 1}`}
  onClick={() => onChange(value - 1)}
>
  <MinusIcon className="h-4 w-4" />
</button>

// State descriptions
<button
  aria-label={`Seat ${section}${row}-${number} ${state}`}
  disabled={state !== "available"}
>
```

### Focus Management
```typescript
// Reference elements by ID
const focusElement = (id: string) => {
  const element = document.getElementById(id);
  element?.focus();
};

// Set unique IDs
<button id={`item-${item.id}`} />
```

## Styling Patterns

### Conditional Classes with clsx
```typescript
import clsx from "clsx";

<button
  className={clsx(
    // Base styles
    "h-8 w-8 rounded-md text-sm font-semibold transition",
    // Selected state
    selected && "bg-accent text-white",
    // Available state
    !selected && "bg-white border border-ink/15 hover:border-accent",
    // Disabled state
    disabled && "bg-ink/10 text-ink/30 cursor-not-allowed"
  )}
/>
```

### Theme Variables
```typescript
// Colors (from tailwind.config.ts)
"bg-accent"           // #026cdf - Primary blue
"text-ink"            // #1f262d - Dark text
"text-muted"          // #626569 - Secondary text
"bg-tmGray"           // #e1e1e4 - Light gray
"bg-tmLight"          // #f2f2f4 - Background

// CSS Variables (from globals.css)
"text-[var(--color-warn)]"   // Warning red
"text-[var(--color-good)]"   // Success green

// Shadows
"shadow-soft"         // Subtle elevation
"shadow-lift"         // More prominent elevation
```

### Common Button Sizes
```typescript
// Small (icons, tight spaces)
"h-7 w-7 rounded-md text-[10px]"

// Medium (most buttons)
"h-8 px-4 rounded-md text-sm"

// Large (primary CTAs)
"h-12 px-6 rounded-[2px] text-base font-bold"
```

### Responsive Patterns
```typescript
// Mobile-first, then larger screens
"text-sm md:text-base"
"px-4 md:px-6 lg:px-8"
"grid-cols-1 lg:grid-cols-2"
```

## Animation Patterns

### Framer Motion Basics
```typescript
import { motion, AnimatePresence } from "framer-motion";

// Fade in/out
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>

// Scale on hover
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Click me
</motion.button>
```

### Tailwind Transitions
```typescript
// Simple transitions
"transition"                    // Default all properties
"transition-colors"             // Color changes only
"transition-all duration-200"   // Explicit duration

// Hover states
"hover:bg-accent hover:text-white"
"hover:border-accent"
"hover:shadow-lift"
```

## State Management Integration

### Using Zustand Store
```typescript
import { useTicketingStore } from "@/store/useTicketingStore";

export default function MyComponent() {
  // Select only what you need (performance)
  const { seats, setSeatSelection } = useTicketingStore((state) => ({
    seats: state.seats,
    setSeatSelection: state.setSeatSelection,
  }));

  // Or single property
  const quantity = useTicketingStore((state) => state.seats.quantity);
}
```

### Controlled Component Pattern
```typescript
// Parent manages state, child is pure
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
  // No internal state, fully controlled by parent
}
```

## Component File Organization

```
src/components/
├── Layout/
│   ├── AppShell.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── Forms/
│   ├── ContactForm.tsx
│   ├── PaymentForm.tsx
│   └── DeliveryForm.tsx
├── SeatSelection/
│   ├── SeatGrid.tsx
│   ├── InteractiveSeatMap.tsx
│   └── TicketList.tsx
└── Utilities/
    ├── HoldTimer.tsx
    ├── SpeedrunTimer.tsx
    └── DebugPanel.tsx
```

## Anti-Patterns to Avoid

```typescript
// ❌ Don't use div with onClick for buttons
<div onClick={handleClick}>Click me</div>

// ✅ Use semantic button
<button onClick={handleClick}>Click me</button>

// ❌ Don't forget "use client" for interactive components
export default function Counter() {
  const [count, setCount] = useState(0); // Error!
}

// ✅ Add directive
"use client";
export default function Counter() { ... }

// ❌ Don't use inline styles
<div style={{ backgroundColor: '#026cdf' }}>

// ✅ Use Tailwind classes
<div className="bg-accent">

// ❌ Don't hardcode colors
<div className="bg-[#026cdf]">

// ✅ Use theme variables
<div className="bg-accent">
```

## Example Reference Components
- **SeatGrid.tsx** - Keyboard navigation, conditional styling
- **HoldTimer.tsx** - Timer pattern, warning states
- **CheckoutStepper.tsx** - Step indicator pattern
- **PresaleCodeForm.tsx** - Form validation pattern
