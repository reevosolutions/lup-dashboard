# Slot System

A powerful, flexible, and type-safe slot system for React/Next.js applications that allows you to inject content into predefined slots from anywhere in your component tree.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Slot System provides a declarative way to create "slots" (placeholders) in your UI that can be filled with content from child components anywhere in the tree. This is similar to React Portals but with additional features like:

- Multiple content items per slot
- Content ordering with priorities
- Append, prepend, and replace modes
- Event hooks for slot operations
- Automatic cleanup on unmount
- Full TypeScript support

**Use Cases:**

- Sticky headers that change based on page content
- Dynamic breadcrumbs
- Contextual actions/buttons in toolbars
- Modal/dialog management
- Toast notifications
- Dynamic sidebar content

---

## Features

✅ **Multiple Plug Modes**
- Replace, Append, Prepend

✅ **Priority System**
- Control rendering order with numerical priorities

✅ **Styling Control**
- `className` for slot wrapper
- `containerClassName` for items container
- `itemClassName` for each item wrapper

✅ **Event Hooks**
- `onPlug`, `onUnplug`, `onAppend`, `onPrepend`, `onReplace`, `onChange`, `onClear`

✅ **Type-Safe**
- Full TypeScript support
- Intellisense for all APIs

✅ **SSR Compatible**
- Works with Next.js App Router
- Server and Client components

✅ **Auto-Cleanup**
- Automatically unplugs content on unmount

---

## Installation

### 1. Add SlotProvider to your root layout

```tsx
// app/layout.tsx or app/[locale]/layout.tsx
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

### 2. Create a slot in your component

```tsx
// components/header.tsx (Server Component)
import { Slot } from "@/components/slot";

export function Header() {
  return (
    <header>
      <div>Logo</div>
      <nav>Navigation</nav>
      
      {/* Slot for dynamic content */}
      <Slot 
        id="header-actions" 
        className="header-slot"
        containerClassName="flex gap-2"
      />
    </header>
  );
}
```

### 3. Plug content into the slot

```tsx
// app/listing/[id]/page.tsx (anywhere in your app)
"use client";

import { Plug, SlotPlugMode } from "@/components/slot";

export function ListingPage() {
  return (
    <div>
      <Plug slotId="header-actions" id="listing-actions">
        <button>Share</button>
        <button>Save</button>
      </Plug>
      
      <h1>Listing Details</h1>
      {/* ... rest of content ... */}
    </div>
  );
}
```

---

## Quick Start

### Basic Example

```tsx
// 1. Create a slot
<Slot id="my-slot" className="my-slot-wrapper" />

// 2. Plug content from anywhere
<Plug slotId="my-slot" id="content-1">
  <div>Hello from slot!</div>
</Plug>
```

### Append Multiple Items

```tsx
<Slot 
  id="toolbar" 
  containerClassName="flex gap-2"
  itemClassName="toolbar-item"
/>

// Different components can plug content
<Plug slotId="toolbar" id="action-1">
  <button>Action 1</button>
</Plug>

<Plug slotId="toolbar" id="action-2">
  <button>Action 2</button>
</Plug>

<Plug slotId="toolbar" id="action-3">
  <button>Action 3</button>
</Plug>
```

### Prepend Content

```tsx
<Plug 
  slotId="toolbar" 
  id="urgent-action"
  options={{ mode: SlotPlugMode.PREPEND }}
>
  <button className="urgent">Urgent!</button>
</Plug>
```

### Replace All Content

```tsx
<Plug 
  slotId="toolbar" 
  id="single-action"
  options={{ mode: SlotPlugMode.REPLACE }}
>
  <button>Only This!</button>
</Plug>
```

### Priority Ordering

```tsx
// Higher priority renders first
<Plug slotId="toolbar" id="low" options={{ priority: 1 }}>
  <button>Low Priority</button>
</Plug>

<Plug slotId="toolbar" id="high" options={{ priority: 100 }}>
  <button>High Priority (renders first)</button>
</Plug>

<Plug slotId="toolbar" id="medium" options={{ priority: 50 }}>
  <button>Medium Priority</button>
</Plug>
```

### Using the Hook API

```tsx
"use client";

import { useSlot, SlotPlugMode } from "@/components/slot";

function MyComponent() {
  const { plug, unplug, clear } = useSlot();
  
  const handleAddContent = () => {
    plug(
      "my-slot",
      "dynamic-content",
      <div>Dynamic content!</div>,
      { mode: SlotPlugMode.APPEND }
    );
  };
  
  const handleRemoveContent = () => {
    unplug("my-slot", "dynamic-content");
  };
  
  const handleClearAll = () => {
    clear("my-slot");
  };
  
  return (
    <div>
      <button onClick={handleAddContent}>Add</button>
      <button onClick={handleRemoveContent}>Remove</button>
      <button onClick={handleClearAll}>Clear All</button>
    </div>
  );
}
```

---

## API Reference

### `<SlotProvider>`

Provides slot context to all child components. Must wrap your app.

```tsx
<SlotProvider>
  <App />
</SlotProvider>
```

---

### `<Slot>`

Renders a slot placeholder that can receive content.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Unique identifier for the slot |
| `className` | `string` | `undefined` | CSS class for slot wrapper |
| `containerClassName` | `string` | `undefined` | CSS class for items container |
| `itemClassName` | `string` | `undefined` | CSS class for each item wrapper |
| `as` | `ElementType` | `"div"` | HTML element type for wrapper |
| `containerAs` | `ElementType` | `"div"` | HTML element type for container |
| `children` | `ReactNode` | `undefined` | Fallback content when slot is empty |
| `onPlug` | `function` | `undefined` | Called when content is plugged |
| `onUnplug` | `function` | `undefined` | Called when content is unplugged |
| `onAppend` | `function` | `undefined` | Called when content is appended |
| `onPrepend` | `function` | `undefined` | Called when content is prepended |
| `onReplace` | `function` | `undefined` | Called when content is replaced |
| `onChange` | `function` | `undefined` | Called when slot content changes |
| `onClear` | `function` | `undefined` | Called when slot is cleared |

#### Examples

```tsx
// Basic slot
<Slot id="header-slot" />

// With styling
<Slot 
  id="toolbar"
  className="border-t"
  containerClassName="flex justify-end gap-2"
  itemClassName="flex-shrink-0"
/>

// With fallback
<Slot id="actions">
  <p>No actions available</p>
</Slot>

// With events
<Slot 
  id="notifications"
  onPlug={(slotId, item) => console.log('Added:', item)}
  onChange={(slotId, items) => console.log('Total items:', items.length)}
/>

// Custom elements
<Slot 
  id="nav"
  as="nav"
  containerAs="ul"
  itemClassName="list-item"
/>
```

---

### `<Plug>`

Injects content into a slot. Automatically unplugs on unmount.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slotId` | `string` | **required** | ID of the slot to plug into |
| `id` | `string` | **required** | Unique ID for this content |
| `children` | `ReactNode` | **required** | Content to inject |
| `options` | `PlugOptions` | `undefined` | Configuration options |

#### PlugOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | `SlotPlugMode` | `APPEND` | How to insert content |
| `priority` | `number` | `0` | Rendering priority (higher first) |
| `itemClassName` | `string` | `undefined` | CSS class for this item's wrapper |

#### SlotPlugMode

```typescript
enum SlotPlugMode {
  REPLACE = "replace",  // Replace all existing content
  PREPEND = "prepend",  // Add at the beginning
  APPEND = "append",    // Add at the end (default)
}
```

#### Examples

```tsx
// Basic plug
<Plug slotId="toolbar" id="save-btn">
  <button>Save</button>
</Plug>

// Prepend
<Plug 
  slotId="toolbar" 
  id="urgent"
  options={{ mode: SlotPlugMode.PREPEND }}
>
  <button className="urgent">!</button>
</Plug>

// Replace all
<Plug 
  slotId="toolbar" 
  id="only-this"
  options={{ mode: SlotPlugMode.REPLACE }}
>
  <div>Only content</div>
</Plug>

// With priority
<Plug 
  slotId="toolbar" 
  id="important"
  options={{ priority: 100, itemClassName: "important" }}
>
  <button>Important!</button>
</Plug>
```

---

### `useSlot()` Hook

Access the slot API imperatively.

#### Returns

```typescript
{
  plug: (slotId, itemId, content, options?) => void
  unplug: (slotId, itemId) => void
  append: (slotId, itemId, content, options?) => void
  prepend: (slotId, itemId, content, options?) => void
  replace: (slotId, itemId, content, options?) => void
  clear: (slotId) => void
  getItems: (slotId) => SlotItem[]
  registerEvents: (slotId, events) => void
  unregisterEvents: (slotId) => void
}
```

#### Methods

**`plug(slotId, itemId, content, options?)`**
- Plug content into a slot
- Default mode: APPEND

**`unplug(slotId, itemId)`**
- Remove specific content from a slot

**`append(slotId, itemId, content, options?)`**
- Shorthand for `plug` with APPEND mode

**`prepend(slotId, itemId, content, options?)`**
- Shorthand for `plug` with PREPEND mode

**`replace(slotId, itemId, content, options?)`**
- Shorthand for `plug` with REPLACE mode

**`clear(slotId)`**
- Remove all content from a slot

**`getItems(slotId)`**
- Get all items currently in a slot

**`registerEvents(slotId, events)`**
- Register event handlers for a slot

**`unregisterEvents(slotId)`**
- Unregister event handlers

#### Example

```tsx
"use client";

import { useSlot, SlotPlugMode } from "@/components/slot";

function DynamicContent() {
  const slot = useSlot();
  
  // Add content
  const add = () => {
    slot.append("my-slot", "item-1", <div>Item 1</div>);
  };
  
  // Remove content
  const remove = () => {
    slot.unplug("my-slot", "item-1");
  };
  
  // Replace all
  const replaceAll = () => {
    slot.replace("my-slot", "only", <div>Only this</div>);
  };
  
  // Clear all
  const clearAll = () => {
    slot.clear("my-slot");
  };
  
  // Check items
  const checkItems = () => {
    const items = slot.getItems("my-slot");
    console.log(`${items.length} items in slot`);
  };
  
  return (
    <div>
      <button onClick={add}>Add</button>
      <button onClick={remove}>Remove</button>
      <button onClick={replaceAll}>Replace</button>
      <button onClick={clearAll}>Clear</button>
      <button onClick={checkItems}>Check</button>
    </div>
  );
}
```

---

## Examples

See [USAGE_GUIDE.md](./USAGE_GUIDE.md) for detailed examples including:

- Sticky headers
- Dynamic breadcrumbs
- Contextual toolbars
- Modal management
- Toast notifications
- And more!

---

## Best Practices

### 1. Use Unique Slot IDs

```tsx
// ✅ Good - descriptive and unique
<Slot id="product-page-header-actions" />
<Slot id="user-dashboard-toolbar" />

// ❌ Bad - generic and collision-prone
<Slot id="slot1" />
<Slot id="actions" />
```

### 2. Use Unique Item IDs

```tsx
// ✅ Good - include component/context
<Plug slotId="toolbar" id="listing-123-share-button" />

// ❌ Bad - can conflict with other items
<Plug slotId="toolbar" id="button" />
```

### 3. Clean Up on Unmount

The `<Plug>` component automatically cleans up, but if using the hook:

```tsx
// ✅ Good
useEffect(() => {
  slot.plug("my-slot", "my-item", content);
  return () => slot.unplug("my-slot", "my-item"); // cleanup
}, []);

// ❌ Bad - memory leak
useEffect(() => {
  slot.plug("my-slot", "my-item", content);
  // No cleanup!
}, []);
```

### 4. Use Priority for Ordering

```tsx
// ✅ Good - explicit priorities
<Plug slotId="nav" id="home" options={{ priority: 100 }}>Home</Plug>
<Plug slotId="nav" id="about" options={{ priority: 90 }}>About</Plug>
<Plug slotId="nav" id="contact" options={{ priority: 80 }}>Contact</Plug>

// ❌ Bad - relying on render order
<Plug slotId="nav" id="home">Home</Plug>
<Plug slotId="nav" id="about">About</Plug>
<Plug slotId="nav" id="contact">Contact</Plug>
```

### 5. Provide Fallback Content

```tsx
// ✅ Good
<Slot id="actions">
  <p className="text-muted">No actions available</p>
</Slot>

// ❌ Acceptable but less informative
<Slot id="actions" />
```

---

## Performance

### Optimizations

1. **Memoization**: Slot items are memoized to prevent unnecessary re-renders
2. **Priority Sorting**: Done once when items change, not on every render
3. **Event Batching**: Multiple plugs in quick succession are batched
4. **Cleanup**: Automatic cleanup prevents memory leaks

### Performance Tips

```tsx
// ✅ Good - memoize expensive content
const ExpensiveContent = useMemo(() => (
  <HeavyComponent data={data} />
), [data]);

<Plug slotId="my-slot" id="expensive">
  {ExpensiveContent}
</Plug>

// ✅ Good - use priority to render important items first
<Plug slotId="toolbar" id="critical" options={{ priority: 100 }}>
  <CriticalAction />
</Plug>
```

---

## Troubleshooting

### Content Not Appearing

**Problem**: Plugged content doesn't show in the slot

**Solutions**:
1. Check that `<SlotProvider>` wraps your app
2. Verify slot IDs match exactly (case-sensitive)
3. Ensure `<Plug>` components are rendered (check conditionals)
4. Check browser console for errors

```tsx
// Debug: Log when content is plugged
<Slot 
  id="my-slot"
  onPlug={(id, item) => console.log('Plugged:', item)}
/>
```

### Items in Wrong Order

**Problem**: Items render in unexpected order

**Solution**: Use explicit priorities

```tsx
<Plug slotId="nav" id="first" options={{ priority: 100 }}>First</Plug>
<Plug slotId="nav" id="second" options={{ priority: 50 }}>Second</Plug>
<Plug slotId="nav" id="third" options={{ priority: 1 }}>Third</Plug>
```

### Memory Leaks

**Problem**: Memory usage grows over time

**Solution**: Ensure cleanup on unmount

```tsx
// ✅ Automatic cleanup with <Plug>
<Plug slotId="my-slot" id="my-item">{content}</Plug>

// ✅ Manual cleanup with hook
useEffect(() => {
  slot.plug("my-slot", "my-item", content);
  return () => slot.unplug("my-slot", "my-item");
}, []);
```

### Hydration Errors

**Problem**: Hydration mismatch in Next.js

**Solution**: Keep slots client-side only or ensure SSR compatibility

```tsx
// ✅ Option 1: Client-only slot
"use client";
export function MySlot() {
  return <Slot id="my-slot" />;
}

// ✅ Option 2: Conditional rendering
export function MySlot() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="slot-placeholder" />;
  return <Slot id="my-slot" />;
}
```

---

## TypeScript Support

Full TypeScript support with type safety:

```typescript
import { SlotPlugMode, PlugOptions, SlotEvents } from "@/components/slot";

// Type-safe options
const options: PlugOptions = {
  mode: SlotPlugMode.APPEND,
  priority: 50,
  itemClassName: "my-item",
};

// Type-safe events
const events: SlotEvents = {
  onPlug: (slotId, item, mode) => {
    console.log(`Plugged ${item.id} into ${slotId} with mode ${mode}`);
  },
  onChange: (slotId, items) => {
    console.log(`Slot ${slotId} now has ${items.length} items`);
  },
};
```

---

## License

MIT

---

## Support

For issues, questions, or contributions, please contact the development team.

---

**Happy Slotting! 🎰**
