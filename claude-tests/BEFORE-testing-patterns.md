# BEFORE Test: Testing Patterns Skill

## Test Prompt
"Write tests for the HoldTimer component"

## Configuration State
- No testing patterns skill defined
- Only one existing test file to reference
- Claude must infer testing conventions from exploration

## Simulated Test Run

### What Claude Would Need to Do Without Testing Skill:
1. **Find existing tests** - Glob for test files
2. **Read test patterns** - Read seatGrid.test.tsx
3. **Read HoldTimer** - Understand component to test
4. **Read dependencies** - Check lib/hold.ts for helper functions
5. **Infer Vitest patterns** - Learn vi.fn(), vi.mock(), etc.
6. **Infer RTL patterns** - Learn query preferences

### Expected Behaviors Without Testing Skill:
- May use inconsistent import patterns
- May not mock timers correctly (useEffect with intervals)
- May use wrong queries (getByText vs getByRole)
- May not know to test expiration callback
- May structure tests differently than existing patterns

### Tool Call Estimate: 6-10 tool calls
- 1 Glob for test files
- 2-3 Read calls (existing test, HoldTimer, lib/hold.ts)
- 1-2 Read calls for vitest config
- 2-3 Write/Edit for test file

### Expected Test Structure (Without Skill):
```typescript
// May vary significantly from project patterns
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HoldTimer from "@/components/HoldTimer";

describe("HoldTimer", () => {
  it("renders the timer", () => {
    render(<HoldTimer expiresAt={Date.now() + 60000} />);
    expect(screen.getByText(/hold timer/i)).toBeInTheDocument();
  });
});
```

### Quality Concerns:
1. May not use `vi.fn()` consistently with project
2. May forget to mock Date.now() for deterministic tests
3. May not test the onExpire callback properly
4. May use `screen` object instead of destructured queries
5. May not handle useEffect cleanup in tests
6. May not test warning state (< 2 minutes)

## Baseline Metrics
- **Tool calls needed for context**: ~4-6
- **Test coverage quality**: UNCERTAIN
- **Pattern consistency**: LOW-MEDIUM
- **Edge case coverage**: LIKELY MISSING

## Key Testing Challenges for HoldTimer:

### What makes HoldTimer tricky to test:
1. Uses `setInterval` that needs cleanup
2. Time-dependent behavior (remaining countdown)
3. Callback fires only once (expiredRef pattern)
4. Conditional styling based on remaining time
5. Uses `useMemo` for calculations

### Without testing skill, Claude may miss:
- Fake timer setup (`vi.useFakeTimers()`)
- Advancing timers (`vi.advanceTimersByTime()`)
- Testing expiration only fires once
- Testing warning state transition
- Proper cleanup between tests

## Summary
**Baseline State**: MEDIUM-HIGH FRICTION - testing React time-based components is complex
