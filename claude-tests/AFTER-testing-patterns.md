# AFTER Test: Testing Patterns Skill

## Test Prompt
"Write tests for the HoldTimer component"

## Configuration State
- `.claude/skills/testing-patterns.md` exists
- Complete Vitest + RTL patterns documented
- Timer testing patterns specifically covered
- Zustand mocking patterns included

## Expected Behavior WITH Testing Skill:

### What Claude Knows Immediately:
1. **Framework**: Vitest with vi.fn(), vi.useFakeTimers()
2. **Queries**: Accessibility-first (getByRole, getByText)
3. **Timer Testing**: vi.setSystemTime(), vi.advanceTimersByTime()
4. **Structure**: describe/it blocks, beforeEach for cleanup
5. **File Location**: `src/tests/holdTimer.test.tsx`

### Expected Response Pattern:
```
1. "I'll write tests for HoldTimer following the testing patterns..."
2. [Single Read of HoldTimer.tsx to understand component]
3. [Write comprehensive test file]
```

### Tool Call Estimate: 2-3 tool calls
- 1 Read call for HoldTimer.tsx (may already be in context)
- 1 Write call for test file
- (Optional) 1 run test command

## Expected Test Implementation

**With Testing Skill, Claude would create:**

```typescript
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import HoldTimer from "@/components/HoldTimer";

describe("HoldTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00Z"));
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("rendering", () => {
    it("displays formatted countdown when expiresAt is set", () => {
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
      render(<HoldTimer expiresAt={expiresAt} />);

      expect(screen.getByText("5:00")).toBeInTheDocument();
      expect(screen.getByText(/hold timer/i)).toBeInTheDocument();
    });

    it("displays placeholder when expiresAt is null", () => {
      render(<HoldTimer expiresAt={null} />);

      expect(screen.getByText("--:--")).toBeInTheDocument();
    });
  });

  describe("countdown behavior", () => {
    it("updates countdown every second", () => {
      const expiresAt = Date.now() + 60 * 1000; // 1 minute
      render(<HoldTimer expiresAt={expiresAt} />);

      expect(screen.getByText("1:00")).toBeInTheDocument();

      vi.advanceTimersByTime(30000);

      expect(screen.getByText("0:30")).toBeInTheDocument();
    });

    it("shows 0:00 when countdown reaches zero", () => {
      const expiresAt = Date.now() + 2000;
      render(<HoldTimer expiresAt={expiresAt} />);

      vi.advanceTimersByTime(3000);

      expect(screen.getByText("0:00")).toBeInTheDocument();
    });
  });

  describe("expiration callback", () => {
    it("fires onExpire callback when timer expires", () => {
      const onExpire = vi.fn();
      const expiresAt = Date.now() + 1000;

      render(<HoldTimer expiresAt={expiresAt} onExpire={onExpire} />);

      vi.advanceTimersByTime(2000);

      expect(onExpire).toHaveBeenCalled();
    });

    it("fires onExpire callback exactly once", () => {
      const onExpire = vi.fn();
      const expiresAt = Date.now() + 1000;

      render(<HoldTimer expiresAt={expiresAt} onExpire={onExpire} />);

      vi.advanceTimersByTime(5000); // Well past expiration

      expect(onExpire).toHaveBeenCalledTimes(1);
    });

    it("does not fire onExpire when callback not provided", () => {
      const expiresAt = Date.now() + 1000;

      // Should not throw
      expect(() => {
        render(<HoldTimer expiresAt={expiresAt} />);
        vi.advanceTimersByTime(2000);
      }).not.toThrow();
    });
  });

  describe("warning state", () => {
    it("applies warning styles when under 2 minutes remaining", () => {
      const expiresAt = Date.now() + 90 * 1000; // 1.5 minutes
      const { container } = render(<HoldTimer expiresAt={expiresAt} />);

      expect(container.querySelector(".text-warn")).toBeInTheDocument();
      expect(container.querySelector(".border-warn\\/30")).toBeInTheDocument();
    });

    it("does not show warning styles when over 2 minutes remaining", () => {
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
      const { container } = render(<HoldTimer expiresAt={expiresAt} />);

      expect(container.querySelector(".text-warn")).not.toBeInTheDocument();
    });

    it("transitions to warning state as time decreases", () => {
      const expiresAt = Date.now() + 3 * 60 * 1000; // 3 minutes
      const { container, rerender } = render(<HoldTimer expiresAt={expiresAt} />);

      // Initially no warning
      expect(container.querySelector(".text-warn")).not.toBeInTheDocument();

      // Advance to under 2 minutes
      vi.advanceTimersByTime(70 * 1000);
      rerender(<HoldTimer expiresAt={expiresAt} />);

      // Now shows warning
      expect(container.querySelector(".text-warn")).toBeInTheDocument();
    });
  });

  describe("cleanup", () => {
    it("clears interval on unmount", () => {
      const clearIntervalSpy = vi.spyOn(global, "clearInterval");
      const expiresAt = Date.now() + 60000;

      const { unmount } = render(<HoldTimer expiresAt={expiresAt} />);
      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });
});
```

### Key Improvements from Skill:

1. **Proper timer setup**: Uses vi.useFakeTimers() and vi.setSystemTime()
2. **Cleanup**: afterEach with vi.useRealTimers()
3. **Comprehensive coverage**: Tests rendering, countdown, expiration, warning states
4. **Edge cases**: Tests null expiresAt, callback-less rendering
5. **Deterministic**: Fixed system time for reproducible tests
6. **Structure**: Nested describe blocks for organization
7. **Query patterns**: Uses screen.getByText following RTL patterns

## Metrics Comparison

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Tool calls needed | 6-10 | 2-3 | **70% reduction** |
| Test coverage | PARTIAL | COMPREHENSIVE | **Full coverage** |
| Timer handling | LIKELY WRONG | CORRECT | **Deterministic** |
| Edge cases | MISSING | INCLUDED | **Complete** |
| Pattern consistency | UNCERTAIN | MATCHES PROJECT | **Guaranteed** |

## Additional Test Prompt Validation

To further validate the skill impact, a second test prompt:
"Add tests for keyboard navigation in SeatGrid"

**With skill**: Would immediately know to use fireEvent.keyDown with key codes, test ArrowRight/Left/Up/Down, and verify focus management.

## Summary
**With Testing Skill**: HIGH CONFIDENCE - comprehensive, deterministic tests following project patterns

## Impact Assessment: **HIGH IMPACT**

The testing patterns skill:
- Eliminates timer testing guesswork
- Ensures proper cleanup and determinism
- Provides query priority guidance
- Includes Zustand mocking patterns
- Reduces test implementation from exploration to execution

This skill is especially valuable because testing patterns are complex and easy to get wrong.
