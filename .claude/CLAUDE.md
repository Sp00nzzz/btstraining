# Ticketmaster Presale Simulator - Project Memory

## Tech Stack
- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.5 (strict mode)
- **State**: Zustand 4.5 with persist middleware
- **Styling**: Tailwind CSS 3.4 (utility-first)
- **Animation**: Framer Motion 11.3
- **Testing**: Vitest 4.0 + React Testing Library
- **Icons**: Lucide React

## Key Commands
```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build
npm test         # Run Vitest tests
npm run lint     # ESLint check
```

## Project Structure
```
src/
├── app/           # Next.js App Router pages
├── components/    # React components (25+ files)
├── store/         # Zustand stores
├── lib/           # Utility functions
├── data/          # Static data (events, seats)
└── tests/         # Vitest test files
```

## Code Style

### Components
- Always use `"use client"` directive for client components
- Type props inline or use store types from `@/store/useTicketingStore`
- Use `clsx` for conditional class names
- Prefer Tailwind utilities over custom CSS
- Use CSS variables from globals.css: `--color-base`, `--color-ink`, `--color-accent`, etc.

### TypeScript
- Strict mode enabled - no `any` types
- Use `type` for data shapes, inline props for components
- Import types with `import type { X }` when possible

### Styling (Tailwind)
- Theme colors: `accent` (#026cdf), `tmDark` (#1f262d), `tmGray` (#e1e1e4), `tmLight` (#f2f2f4)
- Use CSS variables: `text-[var(--color-muted)]` or predefined classes
- Custom shadows: `shadow-soft`, `shadow-lift`
- Responsive: mobile-first with `md:` and `lg:` breakpoints

### State Management (Zustand)
- Main store: `useTicketingStore` with persistence
- Use selectors: `useTicketingStore((state) => state.property)`
- Actions defined in store, not components
- SSR-safe storage pattern already implemented

## Critical Rules

### UI State Handling
ALWAYS handle all four states in data-driven components:
1. **Loading** - Show skeleton or spinner
2. **Error** - Show error message with retry option
3. **Empty** - Show empty state message
4. **Success** - Show actual content

### Accessibility
- All interactive elements need keyboard support
- Use semantic HTML (`button`, not `div` with onClick)
- Include `aria-label` for icon-only buttons
- Support arrow key navigation where applicable (see SeatGrid)

### Forms
- Controlled components with `value` + `onChange`
- Validate before submit, show inline errors
- Disable submit button during async operations

## Domain Context
This is a **training simulator** for Ticketmaster ticket purchasing:
- Queue simulation (position countdown)
- Presale code validation (20-min window)
- Seat selection (3 sections, 10 rows, 20 seats each)
- Ticket holds (8-minute timer)
- Checkout flow (4 steps: Contact → Delivery → Payment → Review)

## File Examples
- Component pattern: `src/components/SeatGrid.tsx`
- Store pattern: `src/store/useTicketingStore.ts`
- Test pattern: `src/tests/seatGrid.test.tsx`
- Utility pattern: `src/lib/format.ts`
