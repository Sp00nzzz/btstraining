# AFTER Test: Zustand Store Skill

## Test Prompt
"Add a favorites feature to the store where users can save events"

## Configuration State
- `.claude/skills/zustand-patterns.md` exists
- Complete step-by-step guide for adding state
- Persistence and partialize patterns documented
- Selector and testing patterns included

## Expected Behavior WITH Zustand Skill:

### What Claude Knows Immediately:
1. **5-step process**: Type → Store type → Initial → Actions → Partialize
2. **Persistence**: Must add to partialize config
3. **Update pattern**: Functional updates with spread
4. **Naming**: FavoritesState, addFavorite, isFavorite
5. **Testing**: How to reset/mock store

### Expected Response Pattern:
```
1. "I'll add the favorites feature following the Zustand patterns..."
2. [Single Edit to useTicketingStore.ts with all changes]
```

### Tool Call Estimate: 1-2 tool calls
- 1 Read (if not in context) for current store structure
- 1 Edit for implementation

## Expected Implementation

**With Zustand Skill, Claude would add:**

```typescript
// Step 1: Add type (near other state types)
export type FavoritesState = {
  favoriteEventIds: string[];
};

// Step 2: Add to TicketingStore type
export type TicketingStore = {
  // ... existing ...
  favorites: FavoritesState;
  addFavorite: (eventId: string) => void;
  removeFavorite: (eventId: string) => void;
  toggleFavorite: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
};

// Step 3: Add initial state (in create function)
favorites: {
  favoriteEventIds: [],
},

// Step 4: Add actions
addFavorite: (eventId) =>
  set((state) => ({
    favorites: {
      ...state.favorites,
      favoriteEventIds: state.favorites.favoriteEventIds.includes(eventId)
        ? state.favorites.favoriteEventIds
        : [...state.favorites.favoriteEventIds, eventId],
    },
  })),

removeFavorite: (eventId) =>
  set((state) => ({
    favorites: {
      ...state.favorites,
      favoriteEventIds: state.favorites.favoriteEventIds.filter(
        (id) => id !== eventId
      ),
    },
  })),

toggleFavorite: (eventId) => {
  const { favorites, addFavorite, removeFavorite } = get();
  if (favorites.favoriteEventIds.includes(eventId)) {
    removeFavorite(eventId);
  } else {
    addFavorite(eventId);
  }
},

isFavorite: (eventId) => {
  return get().favorites.favoriteEventIds.includes(eventId);
},

// Step 5: Update resetDemo
resetDemo: () =>
  set(() => ({
    // ... existing ...
    favorites: { favoriteEventIds: [] },
  })),

// Step 5b: Add to partialize
partialize: (state) => ({
  // ... existing ...
  favorites: state.favorites,
}),
```

### Key Improvements from Skill:

1. **Complete type definition** - FavoritesState properly typed
2. **Store type updated** - All actions included
3. **Duplicate prevention** - addFavorite checks if exists
4. **Helper methods** - toggleFavorite and isFavorite
5. **Persistence** - Added to partialize
6. **Reset included** - Added to resetDemo
7. **Functional updates** - Proper spread pattern
8. **Naming conventions** - Matches project style

## Usage Example (Component)

```typescript
"use client";

import { useTicketingStore } from "@/store/useTicketingStore";
import { Heart } from "lucide-react";
import clsx from "clsx";

export default function FavoriteButton({ eventId }: { eventId: string }) {
  const { toggleFavorite, isFavorite } = useTicketingStore((state) => ({
    toggleFavorite: state.toggleFavorite,
    isFavorite: state.isFavorite,
  }));

  const favorited = isFavorite(eventId);

  return (
    <button
      onClick={() => toggleFavorite(eventId)}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={clsx(
        "p-2 rounded-full transition",
        favorited ? "text-red-500" : "text-ink/30 hover:text-red-500"
      )}
    >
      <Heart className={clsx("h-5 w-5", favorited && "fill-current")} />
    </button>
  );
}
```

## Metrics Comparison

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Tool calls needed | 4-6 | 1-2 | **70% reduction** |
| Persistence handling | LIKELY MISSING | INCLUDED | **Guaranteed** |
| Pattern consistency | MEDIUM | HIGH | **Exact match** |
| Type safety | PARTIAL | COMPLETE | **Full typing** |
| Helper methods | MISSING | INCLUDED | **Better DX** |
| Reset integration | MISSING | INCLUDED | **Complete** |

## Additional Test Prompt Validation

To further validate, test: "Add a recently viewed events feature to the store"

**With skill**: Would immediately:
- Create RecentlyViewedState type
- Add to TicketingStore type
- Initialize as empty array
- Create addRecentlyViewed action (with deduplication and limit)
- Add to partialize for persistence
- Add to resetDemo

## Summary
**With Zustand Skill**: HIGH CONFIDENCE - complete, persistent, type-safe implementation

## Impact Assessment: **MEDIUM IMPACT**

The Zustand patterns skill:
- Eliminates persistence mistakes (forgetting partialize)
- Ensures type safety throughout
- Provides clear step-by-step process
- Includes testing guidance
- Matches existing store conventions exactly

This skill is valuable because Zustand persistence patterns are non-obvious and easy to get wrong, leading to frustrating "why isn't my state saving?" debugging sessions.
