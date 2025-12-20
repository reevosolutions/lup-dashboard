# Slot System - Usage Guide

Comprehensive examples and patterns for using the Slot System.

## 📚 Table of Contents

1. [Basic Patterns](#basic-patterns)
2. [Real-World Examples](#real-world-examples)
3. [Advanced Patterns](#advanced-patterns)
4. [Integration Examples](#integration-examples)

---

## Basic Patterns

### 1. Simple Slot and Plug

**Scenario**: Add a logout button to a header from a user profile page.

```tsx
// components/header.tsx (SSR Component)
import { Slot } from "@/components/slot";

export function Header() {
  return (
    <header className="flex justify-between p-4">
      <div className="logo">MyApp</div>
      <nav className="flex gap-4">
        <a href="/">Home</a>
        <a href="/about">About</a>
        
        {/* Slot for dynamic actions */}
        <Slot 
          id="header-user-actions"
          containerClassName="flex gap-2"
        />
      </nav>
    </header>
  );
}
```

```tsx
// app/profile/page.tsx (Client Component)
"use client";

import { Plug } from "@/components/slot";

export function ProfilePage() {
  const handleLogout = () => {
    // logout logic
  };

  return (
    <div>
      {/* Plug logout button into header */}
      <Plug slotId="header-user-actions" id="logout-btn">
        <button onClick={handleLogout} className="btn-primary">
          Logout
        </button>
      </Plug>
      
      <h1>User Profile</h1>
      {/* ... profile content ... */}
    </div>
  );
}
```

---

### 2. Multiple Items with Priority

**Scenario**: Add multiple actions to a toolbar with specific ordering.

```tsx
// components/toolbar.tsx
import { Slot } from "@/components/slot";

export function Toolbar() {
  return (
    <div className="toolbar">
      <Slot 
        id="main-toolbar"
        containerClassName="flex gap-2 justify-end"
        itemClassName="toolbar-item"
      />
    </div>
  );
}
```

```tsx
// app/document/editor/page.tsx
"use client";

import { Plug, SlotPlugMode } from "@/components/slot";

export function DocumentEditor() {
  return (
    <div>
      {/* High priority - Save button (renders first) */}
      <Plug 
        slotId="main-toolbar" 
        id="save-btn"
        options={{ priority: 100 }}
      >
        <button className="btn-primary">Save</button>
      </Plug>
      
      {/* Medium priority - Export */}
      <Plug 
        slotId="main-toolbar" 
        id="export-btn"
        options={{ priority: 50 }}
      >
        <button className="btn-secondary">Export</button>
      </Plug>
      
      {/* Low priority - Help */}
      <Plug 
        slotId="main-toolbar" 
        id="help-btn"
        options={{ priority: 10 }}
      >
        <button className="btn-ghost">Help</button>
      </Plug>
      
      {/* Editor content */}
      <div className="editor">
        {/* ... */}
      </div>
    </div>
  );
}
```

---

### 3. Replace Mode

**Scenario**: Show different content based on page state.

```tsx
// components/page-header-slot.tsx
import { Slot } from "@/components/slot";

export function PageHeaderSlot() {
  return (
    <Slot 
      id="page-header-content"
      className="page-header"
    >
      {/* Fallback content */}
      <h1>Welcome</h1>
    </Slot>
  );
}
```

```tsx
// app/listing/[id]/page.tsx
"use client";

import { Plug, SlotPlugMode } from "@/components/slot";
import { useParams } from "next/navigation";

export function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  
  return (
    <div>
      {/* Replace entire header with listing-specific content */}
      <Plug 
        slotId="page-header-content" 
        id="listing-header"
        options={{ mode: SlotPlugMode.REPLACE }}
      >
        <div className="listing-header">
          <h1>{listing?.title}</h1>
          <p>{listing?.description}</p>
        </div>
      </Plug>
      
      {/* ... rest of listing page ... */}
    </div>
  );
}
```

---

## Real-World Examples

### Example 1: Sticky Listing Header

**Scenario**: Show a sticky header when user scrolls past the main title.

```tsx
// components/header.tsx (SSR)
import { Slot } from "@/components/slot";

export function Header() {
  return (
    <header className="sticky top-0 bg-white shadow">
      <div className="container">
        <div className="logo">Qriba</div>
        
        {/* Slot for dynamic sticky content */}
        <Slot 
          id="sticky-header-slot"
          className="flex-1"
        />
      </div>
    </header>
  );
}
```

```tsx
// features/listing/details/sticky-listing-header.tsx (Client)
"use client";

import { useEffect, useState } from "react";
import { Plug, SlotPlugMode } from "@/components/slot";

interface Props {
  listing: Listing;
  targetElementId: string;
}

export function StickyListingHeader({ listing, targetElementId }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(targetElementId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < 0);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetElementId]);
  
  if (!isVisible) return null;
  
  return (
    <Plug 
      slotId="sticky-header-slot" 
      id="listing-sticky-header"
      options={{ mode: SlotPlugMode.REPLACE }}
    >
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold">{listing.title}</h2>
        <span className="text-primary">${listing.price}</span>
        <button className="btn-primary ml-auto">Contact</button>
      </div>
    </Plug>
  );
}
```

```tsx
// app/listing/[id]/page.tsx
import { StickyListingHeader } from "@/features/listing/details/sticky-listing-header";

export function ListingDetailsPage({ listing }) {
  const titleId = `listing-title-${listing.id}`;
  
  return (
    <div>
      <StickyListingHeader 
        listing={listing} 
        targetElementId={titleId}
      />
      
      <h1 id={titleId}>{listing.title}</h1>
      {/* ... rest of listing details ... */}
    </div>
  );
}
```

---

### Example 2: Dynamic Breadcrumbs

**Scenario**: Each page adds its own breadcrumb items.

```tsx
// components/breadcrumbs.tsx
import { Slot } from "@/components/slot";
import Link from "next/link";

export function Breadcrumbs() {
  return (
    <nav className="breadcrumbs">
      <Link href="/">Home</Link>
      <span>/</span>
      
      <Slot 
        id="breadcrumbs"
        containerAs="div"
        containerClassName="flex items-center gap-2"
      />
    </nav>
  );
}
```

```tsx
// app/products/[category]/[id]/page.tsx
"use client";

import { Plug } from "@/components/slot";

export function ProductPage({ category, product }) {
  return (
    <div>
      {/* Add category breadcrumb */}
      <Plug slotId="breadcrumbs" id="category" options={{ priority: 100 }}>
        <>
          <Link href={`/products/${category.slug}`}>
            {category.name}
          </Link>
          <span>/</span>
        </>
      </Plug>
      
      {/* Add product breadcrumb */}
      <Plug slotId="breadcrumbs" id="product" options={{ priority: 90 }}>
        <span className="text-muted">{product.name}</span>
      </Plug>
      
      {/* ... product content ... */}
    </div>
  );
}
```

---

### Example 3: Contextual Toolbar

**Scenario**: Show different toolbar actions based on user role and page context.

```tsx
// components/toolbar.tsx
import { Slot } from "@/components/slot";

export function Toolbar() {
  return (
    <div className="toolbar border-b">
      <Slot 
        id="page-toolbar"
        containerClassName="flex justify-end gap-2 p-2"
        itemClassName="toolbar-btn"
      />
    </div>
  );
}
```

```tsx
// app/admin/posts/[id]/page.tsx
"use client";

import { Plug } from "@/components/slot";
import { useAuth } from "@/hooks/use-auth";

export function AdminPostPage({ post }) {
  const { user, can } = useAuth();
  
  return (
    <div>
      {/* Admin actions */}
      {can("publish_posts") && (
        <Plug slotId="page-toolbar" id="publish" options={{ priority: 100 }}>
          <button className="btn-primary">Publish</button>
        </Plug>
      )}
      
      {can("edit_posts") && (
        <Plug slotId="page-toolbar" id="edit" options={{ priority: 90 }}>
          <button className="btn-secondary">Edit</button>
        </Plug>
      )}
      
      {can("delete_posts") && (
        <Plug slotId="page-toolbar" id="delete" options={{ priority: 10 }}>
          <button className="btn-danger">Delete</button>
        </Plug>
      )}
      
      {/* Post content */}
      <article>{post.content}</article>
    </div>
  );
}
```

---

### Example 4: Modal/Dialog Management

**Scenario**: Global modal slot that can be controlled from anywhere.

```tsx
// components/modal-container.tsx
import { Slot } from "@/components/slot";

export function ModalContainer() {
  return (
    <Slot 
      id="modal-root"
      className="fixed inset-0 z-50"
      containerClassName="flex items-center justify-center"
    />
  );
}
```

```tsx
// components/modal-manager.tsx
"use client";

import { useSlot, SlotPlugMode } from "@/components/slot";
import { ReactNode } from "react";

export function useModal() {
  const { plug, unplug } = useSlot();
  
  const showModal = (id: string, content: ReactNode) => {
    plug(
      "modal-root",
      id,
      <div className="modal-backdrop" onClick={() => closeModal(id)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {content}
        </div>
      </div>,
      { mode: SlotPlugMode.REPLACE }
    );
  };
  
  const closeModal = (id: string) => {
    unplug("modal-root", id);
  };
  
  return { showModal, closeModal };
}
```

```tsx
// app/products/[id]/page.tsx
"use client";

import { useModal } from "@/components/modal-manager";

export function ProductPage({ product }) {
  const { showModal, closeModal } = useModal();
  
  const handleShowDetails = () => {
    showModal(
      "product-details",
      <div className="p-6">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button onClick={() => closeModal("product-details")}>Close</button>
      </div>
    );
  };
  
  return (
    <div>
      <button onClick={handleShowDetails}>View Details</button>
    </div>
  );
}
```

---

### Example 5: Toast Notifications

**Scenario**: Global toast notification system.

```tsx
// components/toast-container.tsx
import { Slot } from "@/components/slot";

export function ToastContainer() {
  return (
    <Slot 
      id="toast-notifications"
      className="fixed bottom-4 right-4 z-50"
      containerClassName="flex flex-col gap-2"
      itemClassName="animate-slide-in"
    />
  );
}
```

```tsx
// hooks/use-toast.ts
"use client";

import { useSlot } from "@/components/slot";
import { ReactNode } from "react";

let toastId = 0;

export function useToast() {
  const { plug, unplug } = useSlot();
  
  const toast = (message: ReactNode, duration = 3000) => {
    const id = `toast-${toastId++}`;
    
    plug(
      "toast-notifications",
      id,
      <div className="toast">
        {message}
      </div>
    );
    
    setTimeout(() => {
      unplug("toast-notifications", id);
    }, duration);
  };
  
  const success = (message: string) => {
    toast(<div className="toast-success">{message}</div>);
  };
  
  const error = (message: string) => {
    toast(<div className="toast-error">{message}</div>);
  };
  
  return { toast, success, error };
}
```

```tsx
// app/profile/page.tsx
"use client";

import { useToast } from "@/hooks/use-toast";

export function ProfilePage() {
  const { success, error } = useToast();
  
  const handleSave = async () => {
    try {
      await saveProfile();
      success("Profile saved successfully!");
    } catch (err) {
      error("Failed to save profile");
    }
  };
  
  return (
    <div>
      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}
```

---

## Advanced Patterns

### Pattern 1: Conditional Plugging

```tsx
"use client";

import { Plug } from "@/components/slot";
import { useFeatureFlag } from "@/hooks/use-feature-flag";

export function ExperimentalFeature() {
  const isEnabled = useFeatureFlag("new-feature");
  
  if (!isEnabled) return null;
  
  return (
    <Plug slotId="toolbar" id="new-feature">
      <button>New Feature!</button>
    </Plug>
  );
}
```

---

### Pattern 2: Dynamic Content with Events

```tsx
"use client";

import { Slot } from "@/components/slot";
import { useState } from "react";

export function DynamicToolbar() {
  const [itemCount, setItemCount] = useState(0);
  
  return (
    <div>
      <p>Toolbar has {itemCount} items</p>
      
      <Slot 
        id="dynamic-toolbar"
        containerClassName="flex gap-2"
        onChange={(slotId, items) => {
          setItemCount(items.length);
          console.log("Items:", items.map(i => i.id));
        }}
        onPlug={(slotId, item) => {
          console.log("Added:", item.id);
        }}
        onUnplug={(slotId, itemId) => {
          console.log("Removed:", itemId);
        }}
      />
    </div>
  );
}
```

---

### Pattern 3: Imperative API with useSlot

```tsx
"use client";

import { useSlot } from "@/components/slot";
import { useEffect } from "react";

export function AutoToolbar({ user }) {
  const { append, clear } = useSlot();
  
  useEffect(() => {
    // Clear previous items
    clear("toolbar");
    
    // Add items based on user role
    if (user.role === "admin") {
      append("toolbar", "admin-panel", <button>Admin Panel</button>);
    }
    
    if (user.canEdit) {
      append("toolbar", "edit-btn", <button>Edit</button>);
    }
    
    // Always show help
    append("toolbar", "help-btn", <button>Help</button>);
    
    return () => clear("toolbar");
  }, [user, append, clear]);
  
  return null;
}
```

---

### Pattern 4: Slot with Loading State

```tsx
"use client";

import { Slot } from "@/components/slot";
import { useEffect, useState } from "react";

export function AsyncSlot({ id }) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate async operation
    setTimeout(() => setLoading(false), 1000);
  }, []);
  
  return (
    <Slot id={id}>
      {loading ? (
        <div className="skeleton">Loading...</div>
      ) : (
        <p>No content available</p>
      )}
    </Slot>
  );
}
```

---

### Pattern 5: Nested Slots

```tsx
// Layout with nested slots
export function PageLayout() {
  return (
    <div>
      <header>
        <Slot id="header-main" />
        <Slot id="header-actions" />
      </header>
      
      <main>
        <aside>
          <Slot id="sidebar-top" />
          <Slot id="sidebar-content" />
          <Slot id="sidebar-bottom" />
        </aside>
        
        <div className="content">
          <Slot id="page-header" />
          <Slot id="page-content" />
          <Slot id="page-footer" />
        </div>
      </main>
      
      <footer>
        <Slot id="footer" />
      </footer>
    </div>
  );
}

// Page can plug into multiple slots
export function MyPage() {
  return (
    <div>
      <Plug slotId="header-main" id="title">
        <h1>My Page</h1>
      </Plug>
      
      <Plug slotId="header-actions" id="actions">
        <button>Action</button>
      </Plug>
      
      <Plug slotId="sidebar-content" id="nav">
        <nav>{/* ... */}</nav>
      </Plug>
      
      <Plug slotId="page-content" id="content">
        <article>{/* ... */}</article>
      </Plug>
    </div>
  );
}
```

---

## Integration Examples

### With React Query

```tsx
"use client";

import { Plug } from "@/components/slot";
import { useQuery } from "@tanstack/react-query";

export function UserActionsSlot() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
  
  if (!user) return null;
  
  return (
    <>
      <Plug slotId="header-actions" id="profile">
        <Link href="/profile">
          <Avatar src={user.avatar} />
        </Link>
      </Plug>
      
      <Plug slotId="header-actions" id="notifications">
        <NotificationBell count={user.unreadCount} />
      </Plug>
    </>
  );
}
```

---

### With Zustand Store

```tsx
"use client";

import { Plug, SlotPlugMode } from "@/components/slot";
import { useStore } from "@/store";

export function CartSlot() {
  const { items, total } = useStore((state) => state.cart);
  
  if (items.length === 0) return null;
  
  return (
    <Plug 
      slotId="header-actions" 
      id="cart"
      options={{ priority: 100 }}
    >
      <button className="cart-button">
        Cart ({items.length}) - ${total}
      </button>
    </Plug>
  );
}
```

---

### With Form State

```tsx
"use client";

import { Plug } from "@/components/slot";
import { useFormContext } from "react-hook-form";

export function FormActionsSlot() {
  const { formState } = useFormContext();
  const { isDirty, isValid } = formState;
  
  if (!isDirty) return null;
  
  return (
    <>
      <Plug slotId="page-actions" id="save" options={{ priority: 100 }}>
        <button type="submit" disabled={!isValid}>
          Save Changes
        </button>
      </Plug>
      
      <Plug slotId="page-actions" id="cancel">
        <button type="button" onClick={reset}>
          Cancel
        </button>
      </Plug>
    </>
  );
}
```

---

## Next Steps

- See [README.md](./README.md) for full API documentation
- Check [EXAMPLES.md](./EXAMPLES.md) for code snippets
- Review [API.md](./API.md) for detailed API reference

---

**Happy Building! 🚀**
