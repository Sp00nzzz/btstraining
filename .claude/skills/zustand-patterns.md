---
name: Zustand Patterns
description: Zustand store patterns, persistence middleware, SSR-safe storage, selectors, and state management conventions for this project
---

# Zustand Patterns

Use this skill when modifying the store, adding new state features, or working with state management.

## Store Location
- **Main store**: `src/store/useTicketingStore.ts`
- **Timer store**: `src/store/useTimerStore.ts`

## Adding New State

### Step 1: Define the Type
```typescript
// Add type for your state slice
export type FavoritesState = {
  favoriteEventIds: string[];
};
```

### Step 2: Add to Store Type
```typescript
export type TicketingStore = {
  // Existing state...
  queue: QueueState;
  presale: PresaleState;
  // Add new state
  favorites: FavoritesState;
  // Add new actions
  addFavorite: (eventId: string) => void;
  removeFavorite: (eventId: string) => void;
  toggleFavorite: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
};
```

### Step 3: Add Initial State
```typescript
// Inside create() function
favorites: {
  favoriteEventIds: [],
},
```

### Step 4: Add Actions
```typescript
addFavorite: (eventId) =>
  set((state) => ({
    favorites: {
      ...state.favorites,
      favoriteEventIds: [...state.favorites.favoriteEventIds, eventId],
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
  const { favorites } = get();
  if (favorites.favoriteEventIds.includes(eventId)) {
    get().removeFavorite(eventId);
  } else {
    get().addFavorite(eventId);
  }
},

// Selector helper (uses get())
isFavorite: (eventId) => {
  return get().favorites.favoriteEventIds.includes(eventId);
},
```

### Step 5: Add to Partialize (for persistence)
```typescript
partialize: (state) => ({
  // Existing persisted state...
  queue: state.queue,
  presale: state.presale,
  event: state.event,
  seats: state.seats,
  cart: state.cart,
  checkout: state.checkout,
  // ADD NEW STATE HERE
  favorites: state.favorites,
}),
```

## Functional Update Pattern

Always use the functional update pattern for consistency:

```typescript
// ✅ Correct - functional update
setQueue: (partial) =>
  set((state) => ({
    queue: {
      ...state.queue,
      ...(typeof partial === "function" ? partial(state.queue) : partial),
    },
  })),

// Using it
setQueue({ position: 50 });
setQueue((prev) => ({ position: prev.position - 10 }));
```

## SSR-Safe Storage

The project uses a custom storage wrapper for SSR compatibility:

```typescript
const storage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return localStorage;
});
```

This is already implemented - just ensure new state is added to `partialize`.

## Using Store in Components

### Selector Pattern (Performance)
```typescript
// ✅ Good - only subscribes to what's needed
const { seats, cart } = useTicketingStore((state) => ({
  seats: state.seats,
  cart: state.cart,
}));

// ✅ Good - single property
const quantity = useTicketingStore((state) => state.seats.quantity);

// ❌ Avoid - subscribes to entire store
const store = useTicketingStore();
```

### Using Actions
```typescript
// Get action directly
const setSeatSelection = useTicketingStore((state) => state.setSeatSelection);

// Use in handler
const handleToggle = (seat: Seat) => {
  setSeatSelection([...selectedSeats, seat]);
};
```

## Expiration Pattern

For time-based state (like holds or presale windows):

```typescript
// Check expiration
refreshExpirations: () => {
  const now = Date.now();
  const { presale, cart } = get();

  if (isPresaleExpired(presale.unlockedUntil, now)) {
    set(() => ({ presale: { codeUsed: null, unlockedUntil: null } }));
  }

  if (isHoldExpired(cart.holdExpiresAt, now)) {
    set((state) => ({
      seats: { ...state.seats, selectedSeats: [] },
      cart: { serviceFee: 0, facilityFee: 0, holdExpiresAt: null },
    }));
  }
},
```

## Reset Pattern

For clearing state (demo reset, logout, etc.):

```typescript
resetDemo: () =>
  set(() => ({
    queue: { position: 10, paused: false, etaSeconds: 10 },
    presale: { unlockedUntil: null, codeUsed: null },
    event: null,
    seats: { selectedSeats: [], quantity: 2, tier: "Standard" },
    cart: { serviceFee: 0, facilityFee: 0, holdExpiresAt: null },
    checkout: initialCheckout,
    // Add any new state to reset
    favorites: { favoriteEventIds: [] },
  })),
```

## Price Calculation Pattern

For derived calculations based on state:

```typescript
// Exported map for reuse
export const priceMap: Record<SeatTier, number> = {
  Standard: 79,
  Premium: 129,
  VIP: 179,
};

// Action that calculates
setCartHold: (selectedSeatsOverride) => {
  const { seats } = get();
  const seatCount = selectedSeatsOverride?.length ?? seats.selectedSeats.length;
  const subtotal = seatCount * priceMap[seats.tier];
  const serviceFee = Math.round(subtotal * 0.12);
  const facilityFee = seatCount * 6;

  set(() => ({
    cart: {
      serviceFee,
      facilityFee,
      holdExpiresAt: calculateHoldExpiry(Date.now()),
    },
  }));
},
```

## Testing Zustand

### Reset Store Between Tests
```typescript
beforeEach(() => {
  useTicketingStore.setState({
    queue: { position: 10, paused: false, etaSeconds: 10 },
    seats: { selectedSeats: [], quantity: 2, tier: "Standard" },
    favorites: { favoriteEventIds: [] },
    // ... reset all state
  });
});
```

### Mock Store
```typescript
vi.mock("@/store/useTicketingStore", () => ({
  useTicketingStore: vi.fn((selector) => {
    const mockState = {
      favorites: { favoriteEventIds: ["1", "2"] },
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
    };
    return selector ? selector(mockState) : mockState;
  }),
}));
```

## Naming Conventions

- **State types**: PascalCase with "State" suffix (FavoritesState)
- **Actions**: camelCase verbs (addFavorite, clearCart)
- **Selectors**: camelCase with "is" prefix for booleans (isFavorite)
- **State properties**: camelCase (favoriteEventIds)

## Anti-Patterns

```typescript
// ❌ Don't mutate state directly
state.favorites.push(eventId);

// ✅ Return new state
favoriteEventIds: [...state.favorites.favoriteEventIds, eventId]

// ❌ Don't forget partialize for persisted state
// (state won't survive refresh)

// ✅ Always add to partialize config

// ❌ Don't subscribe to entire store
const store = useTicketingStore();

// ✅ Select only what you need
const favorites = useTicketingStore((s) => s.favorites);
```
