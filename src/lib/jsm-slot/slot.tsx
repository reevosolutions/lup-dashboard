"use client";

import { ReactNode, useEffect, useMemo, ElementType } from "react";
import { useSlot } from "./slot-provider";
import { SlotConfig, SlotEvents } from "./types";
import { cn } from "@/lib/utils";

interface SlotProps extends SlotConfig, SlotEvents {
  /** Children to render as fallback when slot is empty */
  children?: ReactNode;
  /** Wrapper element type */
  as?: ElementType;
  /** Items container element type */
  containerAs?: ElementType;
}

/**
 * Slot component - A placeholder that can receive content from anywhere in the app
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Slot id="header-slot" className="my-slot" />
 * 
 * // With fallback content
 * <Slot id="header-slot">
 *   <p>No content plugged</p>
 * </Slot>
 * 
 * // With events
 * <Slot 
 *   id="header-slot"
 *   onPlug={(id, item) => console.log('Plugged:', item)}
 *   onUnplug={(id, itemId) => console.log('Unplugged:', itemId)}
 * />
 * ```
 */
export function Slot({
  id,
  className,
  containerClassName,
  itemClassName,
  children,
  as: Wrapper = "div",
  containerAs: Container = "div",
  onPlug,
  onUnplug,
  onAppend,
  onPrepend,
  onReplace,
  onChange,
  onClear,
}: SlotProps) {
  const { getItems, registerEvents, unregisterEvents } = useSlot();

  const items = getItems(id);

  // Register event handlers
  useEffect(() => {
    if (onPlug || onUnplug || onAppend || onPrepend || onReplace || onChange || onClear) {
      registerEvents(id, {
        onPlug,
        onUnplug,
        onAppend,
        onPrepend,
        onReplace,
        onChange,
        onClear,
      });
    }

    return () => {
      unregisterEvents(id);
    };
  }, [id, onPlug, onUnplug, onAppend, onPrepend, onReplace, onChange, onClear, registerEvents, unregisterEvents]);

  // Memoize the rendered items
  const renderedItems = useMemo(() => {
    if (items.length === 0) return null;

    return items.map((item) => (
      <div
        key={item.id}
        className={cn(itemClassName, item.itemClassName)}
        data-slot-item-id={item.id}
      >
        {item.content}
      </div>
    ));
  }, [items, itemClassName]);

  // Show fallback if no items
  if (items.length === 0 && children) {
    return (
      <Wrapper className={cn(className)} data-slot-id={id} data-slot-empty="true">
        {children}
      </Wrapper>
    );
  }

  // Show slot content
  if (items.length > 0) {
    return (
      <Wrapper className={cn(className)} data-slot-id={id} data-slot-items={items.length}>
        <Container className={cn(containerClassName)}>
          {renderedItems}
        </Container>
      </Wrapper>
    );
  }

  // Empty slot (no items, no fallback)
  return null;
}
