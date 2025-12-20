"use client";

import { createContext, useContext, useCallback, useState, ReactNode } from "react";
import { SlotContextAPI, SlotEvents, SlotItem, SlotPlugMode, SlotState, PlugOptions } from "./types";

const SlotContext = createContext<SlotContextAPI | null>(null);

/**
 * Provider component that manages all slots in the application
 * 
 * @example
 * ```tsx
 * <SlotProvider>
 *   <App />
 * </SlotProvider>
 * ```
 */
export function SlotProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SlotState>({
    slots: new Map(),
    events: new Map(),
  });

  /**
   * Trigger event handlers for a slot
   */
  const triggerEvent = useCallback(
    (slotId: string, eventName: keyof SlotEvents, ...args: any[]) => {
      const events = state.events.get(slotId);
      if (events && events[eventName]) {
        (events[eventName] as any)(...args);
      }
    },
    [state.events]
  );

  /**
   * Plug content into a slot
   */
  const plug = useCallback(
    (slotId: string, itemId: string, content: ReactNode, options?: PlugOptions) => {
      const mode = options?.mode || SlotPlugMode.APPEND;
      const item: SlotItem = {
        id: itemId,
        content,
        itemClassName: options?.itemClassName,
        priority: options?.priority || 0,
      };

      setState((prev) => {
        const newSlots = new Map(prev.slots);
        const currentItems = newSlots.get(slotId) || [];

        let newItems: SlotItem[];
        
        switch (mode) {
          case SlotPlugMode.REPLACE:
            newItems = [item];
            triggerEvent(slotId, "onReplace", slotId, item);
            break;
          case SlotPlugMode.PREPEND:
            newItems = [item, ...currentItems];
            triggerEvent(slotId, "onPrepend", slotId, item);
            break;
          case SlotPlugMode.APPEND:
          default:
            newItems = [...currentItems, item];
            triggerEvent(slotId, "onAppend", slotId, item);
            break;
        }

        // Sort by priority (higher priority first)
        newItems.sort((a, b) => (b.priority || 0) - (a.priority || 0));

        newSlots.set(slotId, newItems);
        
        triggerEvent(slotId, "onPlug", slotId, item, mode);
        triggerEvent(slotId, "onChange", slotId, newItems);

        return { ...prev, slots: newSlots };
      });
    },
    [triggerEvent]
  );

  /**
   * Unplug content from a slot
   */
  const unplug = useCallback(
    (slotId: string, itemId: string) => {
      setState((prev) => {
        const newSlots = new Map(prev.slots);
        const currentItems = newSlots.get(slotId) || [];
        const newItems = currentItems.filter((item) => item.id !== itemId);
        
        if (newItems.length !== currentItems.length) {
          newSlots.set(slotId, newItems);
          triggerEvent(slotId, "onUnplug", slotId, itemId);
          triggerEvent(slotId, "onChange", slotId, newItems);
        }

        return { ...prev, slots: newSlots };
      });
    },
    [triggerEvent]
  );

  /**
   * Append content to a slot
   */
  const append = useCallback(
    (slotId: string, itemId: string, content: ReactNode, options?: Omit<PlugOptions, 'mode'>) => {
      plug(slotId, itemId, content, { ...options, mode: SlotPlugMode.APPEND });
    },
    [plug]
  );

  /**
   * Prepend content to a slot
   */
  const prepend = useCallback(
    (slotId: string, itemId: string, content: ReactNode, options?: Omit<PlugOptions, 'mode'>) => {
      plug(slotId, itemId, content, { ...options, mode: SlotPlugMode.PREPEND });
    },
    [plug]
  );

  /**
   * Replace all content in a slot
   */
  const replace = useCallback(
    (slotId: string, itemId: string, content: ReactNode, options?: Omit<PlugOptions, 'mode'>) => {
      plug(slotId, itemId, content, { ...options, mode: SlotPlugMode.REPLACE });
    },
    [plug]
  );

  /**
   * Clear all content from a slot
   */
  const clear = useCallback(
    (slotId: string) => {
      setState((prev) => {
        const newSlots = new Map(prev.slots);
        newSlots.delete(slotId);
        triggerEvent(slotId, "onClear", slotId);
        triggerEvent(slotId, "onChange", slotId, []);
        return { ...prev, slots: newSlots };
      });
    },
    [triggerEvent]
  );

  /**
   * Get all items in a slot
   */
  const getItems = useCallback(
    (slotId: string): SlotItem[] => {
      return state.slots.get(slotId) || [];
    },
    [state.slots]
  );

  /**
   * Register event handlers for a slot
   */
  const registerEvents = useCallback(
    (slotId: string, events: SlotEvents) => {
      setState((prev) => {
        const newEvents = new Map(prev.events);
        newEvents.set(slotId, events);
        return { ...prev, events: newEvents };
      });
    },
    []
  );

  /**
   * Unregister event handlers for a slot
   */
  const unregisterEvents = useCallback(
    (slotId: string) => {
      setState((prev) => {
        const newEvents = new Map(prev.events);
        newEvents.delete(slotId);
        return { ...prev, events: newEvents };
      });
    },
    []
  );

  const api: SlotContextAPI = {
    plug,
    unplug,
    append,
    prepend,
    replace,
    clear,
    getItems,
    registerEvents,
    unregisterEvents,
  };

  return (
    <SlotContext.Provider value={api}>
      {children}
    </SlotContext.Provider>
  );
}

/**
 * Hook to access the slot system API
 * 
 * @throws {Error} If used outside SlotProvider
 * 
 * @example
 * ```tsx
 * const { plug, unplug } = useSlot();
 * 
 * plug('header-slot', 'my-content', <div>Hello</div>);
 * ```
 */
export function useSlot() {
  const context = useContext(SlotContext);
  if (!context) {
    throw new Error("useSlot must be used within SlotProvider");
  }
  return context;
}
