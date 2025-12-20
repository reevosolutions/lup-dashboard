import { ReactNode } from "react";

/**
 * Modes for plugging content into a slot
 */
export enum SlotPlugMode {
  /** Replace all existing content */
  REPLACE = "replace",
  /** Add content at the beginning */
  PREPEND = "prepend",
  /** Add content at the end */
  APPEND = "append",
}

/**
 * Item stored in a slot
 */
export interface SlotItem {
  /** Unique identifier for this item */
  id: string;
  /** The content to render */
  content: ReactNode;
  /** Optional className for this specific item's wrapper */
  itemClassName?: string;
  /** Priority/order for rendering (higher = rendered first) */
  priority?: number;
}

/**
 * Configuration for a slot
 */
export interface SlotConfig {
  /** Unique identifier for the slot */
  id: string;
  /** Optional className for the slot wrapper */
  className?: string;
  /** Optional className for the items container */
  containerClassName?: string;
  /** Optional className for each item wrapper */
  itemClassName?: string;
}

/**
 * Events that can be triggered on slot operations
 */
export interface SlotEvents {
  /** Called when content is plugged into the slot */
  onPlug?: (slotId: string, item: SlotItem, mode: SlotPlugMode) => void;
  /** Called when content is unplugged from the slot */
  onUnplug?: (slotId: string, itemId: string) => void;
  /** Called when content is appended */
  onAppend?: (slotId: string, item: SlotItem) => void;
  /** Called when content is prepended */
  onPrepend?: (slotId: string, item: SlotItem) => void;
  /** Called when content is replaced */
  onReplace?: (slotId: string, item: SlotItem) => void;
  /** Called when slot content changes */
  onChange?: (slotId: string, items: SlotItem[]) => void;
  /** Called when slot is cleared */
  onClear?: (slotId: string) => void;
}

/**
 * Options for plugging content into a slot
 */
export interface PlugOptions {
  /** Mode for inserting content */
  mode?: SlotPlugMode;
  /** Optional className for this item's wrapper */
  itemClassName?: string;
  /** Priority/order for rendering */
  priority?: number;
}

/**
 * Slot context state
 */
export interface SlotState {
  /** All registered slots with their items */
  slots: Map<string, SlotItem[]>;
  /** Registered event handlers */
  events: Map<string, SlotEvents>;
}

/**
 * Slot context API
 */
export interface SlotContextAPI {
  /** Plug content into a slot */
  plug: (slotId: string, itemId: string, content: ReactNode, options?: PlugOptions) => void;
  /** Unplug content from a slot */
  unplug: (slotId: string, itemId: string) => void;
  /** Append content to a slot */
  append: (slotId: string, itemId: string, content: ReactNode, options?: Omit<PlugOptions, 'mode'>) => void;
  /** Prepend content to a slot */
  prepend: (slotId: string, itemId: string, content: ReactNode, options?: Omit<PlugOptions, 'mode'>) => void;
  /** Replace all content in a slot */
  replace: (slotId: string, itemId: string, content: ReactNode, options?: Omit<PlugOptions, 'mode'>) => void;
  /** Clear all content from a slot */
  clear: (slotId: string) => void;
  /** Get all items in a slot */
  getItems: (slotId: string) => SlotItem[];
  /** Register event handlers for a slot */
  registerEvents: (slotId: string, events: SlotEvents) => void;
  /** Unregister event handlers for a slot */
  unregisterEvents: (slotId: string) => void;
}
