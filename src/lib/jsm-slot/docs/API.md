# Slot System - API Reference

Complete API documentation for the Slot System.

## Core Components

### `<SlotProvider>`

Global provider that manages all slots. Must wrap your application.

#### Props

None.

#### Example

```tsx
// app/layout.tsx
import { SlotProvider } from "@/components/slot";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SlotProvider>
          {children}
        </SlotProvider>
      </body>
    </html>
  );
}
```

---

### `<Slot>`

Renders a slot that can receive content from `<Plug>` components.

#### Type Definition

```typescript
interface SlotProps extends SlotConfig, SlotEvents {
  children?: ReactNode;
  as?: ElementType;
  containerAs?: ElementType;
}

interface SlotConfig {
  id: string;
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
}

interface SlotEvents {
  onPlug?: (slotId: string, item: SlotItem, mode: SlotPlugMode) => void;
  onUnplug?: (slotId: string, itemId: string) => void;
  onAppend?: (slotId: string, item: SlotItem) => void;
  onPrepend?: (slotId: string, item: SlotItem) => void;
  onReplace?: (slotId: string, item: SlotItem) => void;
  onChange?: (slotId: string, items: SlotItem[]) => void;
  onClear?: (slotId: string) => void;
}
```

#### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | - | ✅ | Unique identifier for the slot |
| `className` | `string` | `undefined` | ❌ | CSS class for the slot wrapper element |
| `containerClassName` | `string` | `undefined` | ❌ | CSS class for the items container |
| `itemClassName` | `string` | `undefined` | ❌ | CSS class applied to each item wrapper |
| `as` | `ElementType` | `"div"` | ❌ | HTML element type for the wrapper |
| `containerAs` | `ElementType` | `"div"` | ❌ | HTML element type for the container |
| `children` | `ReactNode` | `undefined` | ❌ | Fallback content when slot is empty |
| `onPlug` | `function` | `undefined` | ❌ | Called when any content is plugged |
| `onUnplug` | `function` | `undefined` | ❌ | Called when content is unplugged |
| `onAppend` | `function` | `undefined` | ❌ | Called when content is appended |
| `onPrepend` | `function` | `undefined` | ❌ | Called when content is prepended |
| `onReplace` | `function` | `undefined` | ❌ | Called when content is replaced |
| `onChange` | `function` | `undefined` | ❌ | Called whenever slot content changes |
| `onClear` | `function` | `undefined` | ❌ | Called when slot is cleared |

#### Examples

**Basic Slot**
```tsx
<Slot id="my-slot" />
```

**With Styling**
```tsx
<Slot 
  id="toolbar"
  className="border-t bg-gray-50"
  containerClassName="flex justify-end gap-2 p-4"
  itemClassName="flex-shrink-0"
/>
```

**With Fallback**
```tsx
<Slot id="notifications">
  <p className="text-muted-foreground">No notifications</p>
</Slot>
```

**Custom Elements**
```tsx
<Slot 
  id="nav-items"
  as="nav"
  containerAs="ul"
  itemClassName="list-item"
/>
```

**With Events**
```tsx
<Slot 
  id="dynamic-slot"
  onPlug={(id, item, mode) => {
    console.log(`Plugged: ${item.id} (mode: ${mode})`);
  }}
  onChange={(id, items) => {
    console.log(`Total items: ${items.length}`);
  }}
  onClear={(id) => {
    console.log(`Cleared slot: ${id}`);
  }}
/>
```

#### Data Attributes

The `<Slot>` component adds these attributes to its wrapper:

```tsx
data-slot-id="my-slot"           // Always present
data-slot-empty="true"           // When slot has no items
data-slot-items="3"              // Number of items (when > 0)
```

---

### `<Plug>`

Injects content into a slot. Automatically unplugs on unmount.

#### Type Definition

```typescript
interface PlugProps {
  slotId: string;
  id: string;
  children: ReactNode;
  options?: PlugOptions;
}

interface PlugOptions {
  mode?: SlotPlugMode;
  priority?: number;
  itemClassName?: string;
}

enum SlotPlugMode {
  REPLACE = "replace",
  PREPEND = "prepend",
  APPEND = "append",
}
```

#### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `slotId` | `string` | - | ✅ | ID of the slot to plug into |
| `id` | `string` | - | ✅ | Unique ID for this content item |
| `children` | `ReactNode` | - | ✅ | Content to inject into the slot |
| `options` | `PlugOptions` | `{}` | ❌ | Configuration options |

#### PlugOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | `SlotPlugMode` | `APPEND` | How to insert content (REPLACE, PREPEND, APPEND) |
| `priority` | `number` | `0` | Rendering priority (higher = rendered first) |
| `itemClassName` | `string` | `undefined` | CSS class for this item's wrapper |

#### Examples

**Basic Plug**
```tsx
<Plug slotId="header-actions" id="logout-btn">
  <button>Logout</button>
</Plug>
```

**Append Mode (Default)**
```tsx
<Plug slotId="toolbar" id="action-1">
  <button>Action 1</button>
</Plug>
```

**Prepend Mode**
```tsx
<Plug 
  slotId="toolbar" 
  id="urgent-action"
  options={{ mode: SlotPlugMode.PREPEND }}
>
  <button className="text-red-600">Urgent!</button>
</Plug>
```

**Replace Mode**
```tsx
<Plug 
  slotId="page-header" 
  id="custom-header"
  options={{ mode: SlotPlugMode.REPLACE }}
>
  <div className="custom-header">
    <h1>Custom Title</h1>
  </div>
</Plug>
```

**With Priority**
```tsx
<Plug 
  slotId="nav" 
  id="home"
  options={{ priority: 100 }}
>
  <a href="/">Home</a>
</Plug>

<Plug 
  slotId="nav" 
  id="about"
  options={{ priority: 90 }}
>
  <a href="/about">About</a>
</Plug>
```

**With Custom Class**
```tsx
<Plug 
  slotId="toolbar" 
  id="save-btn"
  options={{ 
    priority: 100,
    itemClassName: "ml-auto" 
  }}
>
  <button>Save</button>
</Plug>
```

#### Data Attributes

Each plugged item gets wrapped with:

```tsx
data-slot-item-id="my-item"      // Item's unique ID
```

---

### `useSlot()` Hook

Imperative API for programmatic slot manipulation.

#### Type Definition

```typescript
interface SlotContextAPI {
  plug: (slotId: string, itemId: string, content: ReactNode, options?: PlugOptions) => void;
  unplug: (slotId: string, itemId: string) => void;
  append: (slotId: string, itemId: string, content: ReactNode, options?: Omit<PlugOptions, 'mode'>) => void;
  prepend: (slotId: string, itemId: string, content: ReactNode, options?: Omit<PlugOptions, 'mode'>) => void;
  replace: (slotId: string, itemId: string, content: ReactNode, options?: Omit<PlugOptions, 'mode'>) => void;
  clear: (slotId: string) => void;
  getItems: (slotId: string) => SlotItem[];
  registerEvents: (slotId: string, events: SlotEvents) => void;
  unregisterEvents: (slotId: string) => void;
}
```

#### Methods

**`plug(slotId, itemId, content, options?)`**

Insert content into a slot.

- **Parameters:**
  - `slotId: string` - ID of the target slot
  - `itemId: string` - Unique ID for this content
  - `content: ReactNode` - Content to insert
  - `options?: PlugOptions` - Optional configuration

- **Returns:** `void`

```tsx
const { plug } = useSlot();

plug(
  "toolbar",
  "save-btn",
  <button>Save</button>,
  { mode: SlotPlugMode.APPEND, priority: 100 }
);
```

---

**`unplug(slotId, itemId)`**

Remove specific content from a slot.

- **Parameters:**
  - `slotId: string` - ID of the slot
  - `itemId: string` - ID of the item to remove

- **Returns:** `void`

```tsx
const { unplug } = useSlot();

unplug("toolbar", "save-btn");
```

---

**`append(slotId, itemId, content, options?)`**

Shorthand for `plug` with `mode: APPEND`.

- **Parameters:** Same as `plug` but without `mode` option

```tsx
const { append } = useSlot();

append("toolbar", "new-btn", <button>New</button>);
```

---

**`prepend(slotId, itemId, content, options?)`**

Shorthand for `plug` with `mode: PREPEND`.

- **Parameters:** Same as `plug` but without `mode` option

```tsx
const { prepend } = useSlot();

prepend("toolbar", "first-btn", <button>First</button>);
```

---

**`replace(slotId, itemId, content, options?)`**

Shorthand for `plug` with `mode: REPLACE`.

- **Parameters:** Same as `plug` but without `mode` option

```tsx
const { replace } = useSlot();

replace("header", "title", <h1>New Title</h1>);
```

---

**`clear(slotId)`**

Remove all content from a slot.

- **Parameters:**
  - `slotId: string` - ID of the slot to clear

- **Returns:** `void`

```tsx
const { clear } = useSlot();

clear("toolbar");
```

---

**`getItems(slotId)`**

Get all items currently in a slot.

- **Parameters:**
  - `slotId: string` - ID of the slot

- **Returns:** `SlotItem[]`

```tsx
const { getItems } = useSlot();

const items = getItems("toolbar");
console.log(`${items.length} items in toolbar`);
```

---

**`registerEvents(slotId, events)`**

Register event handlers for a slot.

- **Parameters:**
  - `slotId: string` - ID of the slot
  - `events: SlotEvents` - Event handlers

- **Returns:** `void`

```tsx
const { registerEvents } = useSlot();

registerEvents("toolbar", {
  onPlug: (id, item) => console.log("Plugged:", item.id),
  onChange: (id, items) => console.log("Total:", items.length),
});
```

---

**`unregisterEvents(slotId)`**

Remove event handlers from a slot.

- **Parameters:**
  - `slotId: string` - ID of the slot

- **Returns:** `void`

```tsx
const { unregisterEvents } = useSlot();

unregisterEvents("toolbar");
```

---

#### Complete Example

```tsx
"use client";

import { useSlot, SlotPlugMode } from "@/components/slot";
import { useEffect } from "react";

export function DynamicToolbar({ user }) {
  const { plug, unplug, clear, getItems } = useSlot();
  
  useEffect(() => {
    // Clear existing items
    clear("toolbar");
    
    // Add items based on user role
    if (user.isAdmin) {
      plug(
        "toolbar",
        "admin-btn",
        <button>Admin Panel</button>,
        { priority: 100 }
      );
    }
    
    if (user.canEdit) {
      plug(
        "toolbar",
        "edit-btn",
        <button>Edit</button>,
        { priority: 90 }
      );
    }
    
    // Always show help
    plug(
      "toolbar",
      "help-btn",
      <button>Help</button>,
      { priority: 10 }
    );
    
    // Log total items
    const items = getItems("toolbar");
    console.log(`Added ${items.length} toolbar items`);
    
    // Cleanup on unmount
    return () => clear("toolbar");
  }, [user, plug, clear, getItems]);
  
  return null;
}
```

---

## Types

### `SlotItem`

```typescript
interface SlotItem {
  id: string;
  content: ReactNode;
  itemClassName?: string;
  priority?: number;
}
```

### `SlotConfig`

```typescript
interface SlotConfig {
  id: string;
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
}
```

### `SlotEvents`

```typescript
interface SlotEvents {
  onPlug?: (slotId: string, item: SlotItem, mode: SlotPlugMode) => void;
  onUnplug?: (slotId: string, itemId: string) => void;
  onAppend?: (slotId: string, item: SlotItem) => void;
  onPrepend?: (slotId: string, item: SlotItem) => void;
  onReplace?: (slotId: string, item: SlotItem) => void;
  onChange?: (slotId: string, items: SlotItem[]) => void;
  onClear?: (slotId: string) => void;
}
```

### `PlugOptions`

```typescript
interface PlugOptions {
  mode?: SlotPlugMode;
  priority?: number;
  itemClassName?: string;
}
```

### `SlotPlugMode`

```typescript
enum SlotPlugMode {
  REPLACE = "replace",
  PREPEND = "prepend",
  APPEND = "append",
}
```

---

## Event Handlers

### Event Handler Signatures

```typescript
// Called when content is plugged (any mode)
onPlug: (slotId: string, item: SlotItem, mode: SlotPlugMode) => void

// Called when content is unplugged
onUnplug: (slotId: string, itemId: string) => void

// Called when content is appended
onAppend: (slotId: string, item: SlotItem) => void

// Called when content is prepended
onPrepend: (slotId: string, item: SlotItem) => void

// Called when content is replaced
onReplace: (slotId: string, item: SlotItem) => void

// Called whenever slot content changes
onChange: (slotId: string, items: SlotItem[]) => void

// Called when slot is cleared
onClear: (slotId: string) => void
```

### Event Order

When an operation occurs, events fire in this order:

**On Plug:**
1. Mode-specific event (`onAppend`, `onPrepend`, or `onReplace`)
2. `onPlug`
3. `onChange`

**On Unplug:**
1. `onUnplug`
2. `onChange`

**On Clear:**
1. `onClear`
2. `onChange`

### Example

```tsx
<Slot 
  id="toolbar"
  onPlug={(id, item, mode) => {
    console.log(`[${mode}] Added: ${item.id}`);
  }}
  onUnplug={(id, itemId) => {
    console.log(`Removed: ${itemId}`);
  }}
  onChange={(id, items) => {
    console.log(`Total items: ${items.length}`);
    console.log(`Items: ${items.map(i => i.id).join(", ")}`);
  }}
/>
```

---

## Error Handling

### Common Errors

**Error: "useSlot must be used within SlotProvider"**

```tsx
// ❌ Bad - no provider
function App() {
  return <MyComponent />;
}

// ✅ Good - wrapped in provider
function App() {
  return (
    <SlotProvider>
      <MyComponent />
    </SlotProvider>
  );
}
```

---

## Performance Considerations

### Memoization

Slot items are automatically memoized to prevent unnecessary re-renders:

```tsx
// Items only re-render when content actually changes
<Slot id="my-slot" />
```

### Priority Sorting

Priority sorting happens once when items change:

```tsx
// Sorted on plug/unplug, not on every render
<Plug slotId="nav" id="item1" options={{ priority: 100 }} />
<Plug slotId="nav" id="item2" options={{ priority: 50 }} />
```

### Cleanup

Always clean up to prevent memory leaks:

```tsx
// ✅ Automatic cleanup with <Plug>
<Plug slotId="my-slot" id="my-item">
  {content}
</Plug>

// ✅ Manual cleanup with hook
useEffect(() => {
  plug("my-slot", "my-item", content);
  return () => unplug("my-slot", "my-item");
}, []);
```

---

## TypeScript Integration

### Full Type Safety

```typescript
import { 
  SlotPlugMode, 
  PlugOptions, 
  SlotEvents, 
  SlotItem 
} from "@/components/slot";

// Type-safe options
const options: PlugOptions = {
  mode: SlotPlugMode.APPEND,
  priority: 50,
  itemClassName: "my-class",
};

// Type-safe events
const events: SlotEvents = {
  onPlug: (id, item, mode) => {
    console.log(id, item.id, mode);
  },
  onChange: (id, items) => {
    items.forEach(item => console.log(item.id));
  },
};
```

### Custom Types

```typescript
// Extend for your use case
interface MySlotProps {
  id: string;
  variant: "primary" | "secondary";
}

function MySlot({ id, variant }: MySlotProps) {
  return (
    <Slot 
      id={id}
      className={variant === "primary" ? "bg-blue-500" : "bg-gray-500"}
    />
  );
}
```

---

## Testing

### Unit Tests

```tsx
import { render, screen } from "@testing-library/react";
import { SlotProvider, Slot, Plug } from "@/components/slot";

test("slot renders plugged content", () => {
  render(
    <SlotProvider>
      <Slot id="test-slot" />
      <Plug slotId="test-slot" id="test-item">
        <div>Test Content</div>
      </Plug>
    </SlotProvider>
  );
  
  expect(screen.getByText("Test Content")).toBeInTheDocument();
});
```

### Integration Tests

```tsx
test("multiple items with priority", () => {
  render(
    <SlotProvider>
      <Slot id="test" />
      <Plug slotId="test" id="low" options={{ priority: 1 }}>
        <span>Low</span>
      </Plug>
      <Plug slotId="test" id="high" options={{ priority: 100 }}>
        <span>High</span>
      </Plug>
    </SlotProvider>
  );
  
  const items = screen.getAllByRole("generic");
  expect(items[0]).toHaveTextContent("High");
  expect(items[1]).toHaveTextContent("Low");
});
```

---

For more examples and use cases, see:
- [README.md](./README.md) - Overview and quick start
- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - Real-world examples
