# BEFORE Test: Zustand Store Skill

## Test Prompt
"Add a favorites feature to the store where users can save events"

## Configuration State
- No Zustand patterns skill defined
- Must explore useTicketingStore.ts to understand patterns
- SSR storage pattern is non-obvious
- Persistence configuration is specific

## Simulated Test Run

### What Claude Would Need to Do Without Zustand Skill:
1. **Read existing store** - Understand full structure (200+ lines)
2. **Identify patterns** - Persistence, functional updates, expiration
3. **Learn storage pattern** - SSR-safe localStorage
4. **Understand type patterns** - How state types are defined
5. **Figure out partialize** - What gets persisted

### Expected Behaviors Without Zustand Skill:
- May add state outside of persist middleware
- May not use functional update pattern correctly
- May forget to add to partialize
- May not handle SSR localStorage issue
- May structure types differently

### Tool Call Estimate: 4-6 tool calls
- 1-2 Read calls for store file
- 1 Read for lib utilities (if needed for patterns)
- 1-2 Edit calls for implementation
- Possible search for Zustand docs

### Expected Implementation (Without Skill):

```typescript
// May look like this - missing several patterns
// Somewhere in the store...

favorites: string[], // Just event IDs

addFavorite: (eventId: string) => set((state) => ({
  favorites: [...state.favorites, eventId]
})),

removeFavorite: (eventId: string) => set((state) => ({
  favorites: state.favorites.filter(id => id !== eventId)
})),
```

### Quality Concerns:
1. May not add types for FavoritesState
2. May not add to partialize (won't persist)
3. May use spread update instead of functional pattern
4. May not match existing naming conventions
5. May not add isFavorite selector helper
6. No toggle convenience method

## Baseline Metrics
- **Tool calls needed for context**: ~4-5
- **Pattern consistency**: MEDIUM
- **Persistence handling**: LIKELY MISSING
- **Type safety**: PARTIAL

## Key Zustand Patterns in This Project:

### What Makes Our Store Specific:
1. **Typed state slices**: QueueState, PresaleState, SeatState, etc.
2. **Functional updates**: `(prev) => ({ ...prev, newValue })`
3. **Partialize config**: Only certain state is persisted
4. **SSR-safe storage**: Custom storage implementation
5. **Helper methods**: clearCart, resetDemo patterns
6. **Expiration patterns**: refreshExpirations pattern

### Without skill, Claude may miss:
- Adding FavoritesState type
- Including in TicketingStore type union
- Adding to initial state
- Including in partialize
- Creating proper selectors
- Matching the functional update pattern

## Summary
**Baseline State**: MEDIUM-HIGH FRICTION - Zustand persist patterns are project-specific
