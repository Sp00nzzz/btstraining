---
name: Testing Patterns
description: Vitest testing patterns, React Testing Library queries, mocking, timer testing, and Zustand store mocking for this project
---

# Testing Patterns

Use this skill when writing tests, adding test coverage, or fixing failing tests.

## Framework Setup

- **Test Runner**: Vitest 4.0
- **DOM Environment**: jsdom
- **UI Testing**: @testing-library/react
- **Matchers**: @testing-library/jest-dom (toBeInTheDocument, etc.)
- **Config**: `vitest.config.ts` with `@` path alias

## Test File Structure

```typescript
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ComponentName from "@/components/ComponentName";

describe("ComponentName", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("describes expected behavior", () => {
    // Arrange
    const onAction = vi.fn();

    // Act
    const { getByRole, getByLabelText } = render(
      <ComponentName onAction={onAction} />
    );

    // Assert
    expect(getByRole("button")).toBeInTheDocument();
  });
});
```

## Query Priority (Accessibility-First)

Always prefer queries in this order:
1. `getByRole` - buttons, links, headings, etc.
2. `getByLabelText` - form inputs with labels
3. `getByPlaceholderText` - inputs with placeholders
4. `getByText` - visible text content
5. `getByTestId` - LAST RESORT only

**Example from our codebase:**
```typescript
// Good - uses aria-label pattern from SeatGrid
const button = getByLabelText(`Seat ${seat.section}${seat.row}-${seat.number} ${seat.state}`);

// Avoid
const button = getByTestId("seat-button");
```

## Mocking Functions

```typescript
// Create mock
const onToggle = vi.fn();

// Verify called
expect(onToggle).toHaveBeenCalled();
expect(onToggle).toHaveBeenCalledWith(expectedArg);
expect(onToggle).toHaveBeenCalledTimes(1);

// Reset between tests
beforeEach(() => vi.clearAllMocks());
```

## Testing Time-Based Components

For components using `setInterval`, `setTimeout`, or `Date.now()`:

```typescript
describe("TimerComponent", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("updates countdown every second", () => {
    const expiresAt = Date.now() + 60000; // 1 minute from now
    render(<HoldTimer expiresAt={expiresAt} />);

    expect(screen.getByText("1:00")).toBeInTheDocument();

    vi.advanceTimersByTime(30000); // Advance 30 seconds

    expect(screen.getByText("0:30")).toBeInTheDocument();
  });

  it("fires onExpire callback exactly once when time expires", () => {
    const onExpire = vi.fn();
    const expiresAt = Date.now() + 1000;

    render(<HoldTimer expiresAt={expiresAt} onExpire={onExpire} />);

    vi.advanceTimersByTime(2000);

    expect(onExpire).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Zustand Stores

```typescript
import { useTicketingStore } from "@/store/useTicketingStore";

// Reset store before each test
beforeEach(() => {
  useTicketingStore.setState({
    queue: { position: 10, paused: false, etaSeconds: 10 },
    seats: { selectedSeats: [], quantity: 2, tier: "Standard" },
    // ... reset to initial state
  });
});

// Or mock the entire store
vi.mock("@/store/useTicketingStore", () => ({
  useTicketingStore: vi.fn((selector) => {
    const mockState = {
      seats: { selectedSeats: [], quantity: 2, tier: "Standard" },
      setSeatSelection: vi.fn(),
    };
    return selector ? selector(mockState) : mockState;
  }),
}));
```

## Testing User Interactions

```typescript
// Click
fireEvent.click(getByRole("button"));

// Keyboard
fireEvent.keyDown(element, { key: "Enter" });
fireEvent.keyDown(element, { key: "ArrowRight" });

// Input
fireEvent.change(getByLabelText("Email"), {
  target: { value: "test@example.com" }
});
```

## Testing Conditional Rendering

```typescript
it("shows warning state when under 2 minutes remaining", () => {
  const expiresAt = Date.now() + 90000; // 1.5 minutes
  const { container } = render(<HoldTimer expiresAt={expiresAt} />);

  // Check for warning classes
  expect(container.querySelector(".text-warn")).toBeInTheDocument();
});

it("shows placeholder when no expiration set", () => {
  render(<HoldTimer expiresAt={null} />);
  expect(screen.getByText("--:--")).toBeInTheDocument();
});
```

## Test File Naming

- Location: `src/tests/` directory
- Pattern: `{componentName}.test.tsx`
- Example: `src/tests/holdTimer.test.tsx`

## Anti-Patterns to Avoid

```typescript
// ❌ Don't test implementation details
expect(component.state.isLoading).toBe(true);

// ✅ Test behavior
expect(screen.getByRole("progressbar")).toBeInTheDocument();

// ❌ Don't use arbitrary waits
await new Promise(r => setTimeout(r, 1000));

// ✅ Use waitFor or fake timers
await waitFor(() => expect(element).toBeVisible());
vi.advanceTimersByTime(1000);

// ❌ Don't query by class name
container.querySelector(".my-class");

// ✅ Query by role or accessible name
getByRole("button", { name: /submit/i });
```

## Running Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- holdTimer # Run specific test file
```
