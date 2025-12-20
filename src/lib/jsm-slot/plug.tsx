"use client";

import { ReactNode, useEffect } from "react";
import { useSlot } from "./slot-provider";
import { PlugOptions } from "./types";

interface PlugProps {
  /** ID of the slot to plug into */
  slotId: string;
  /** Unique ID for this plugged content */
  id: string;
  /** Content to plug into the slot */
  children: ReactNode;
  /** Plug options (mode, priority, className) */
  options?: PlugOptions;
}

/**
 * Plug component - Dynamically inject content into a slot
 * 
 * This component doesn't render anything itself - it just plugs its children
 * into the specified slot. When unmounted, it automatically unplugs.
 * 
 * @example
 * ```tsx
 * // Basic usage - append content
 * <Plug slotId="header-slot" id="my-content">
 *   <div>Hello from plug!</div>
 * </Plug>
 * 
 * // Prepend content
 * <Plug 
 *   slotId="header-slot" 
 *   id="my-content"
 *   options={{ mode: SlotPlugMode.PREPEND }}
 * >
 *   <div>I come first!</div>
 * </Plug>
 * 
 * // Replace all content
 * <Plug 
 *   slotId="header-slot" 
 *   id="my-content"
 *   options={{ mode: SlotPlugMode.REPLACE }}
 * >
 *   <div>Only me!</div>
 * </Plug>
 * 
 * // With priority and custom className
 * <Plug 
 *   slotId="header-slot" 
 *   id="my-content"
 *   options={{ 
 *     priority: 10, 
 *     itemClassName: "my-custom-class" 
 *   }}
 * >
 *   <div>High priority content!</div>
 * </Plug>
 * ```
 */
export function Plug({ slotId, id, children, options }: PlugProps) {
  const { plug, unplug } = useSlot();

  useEffect(() => {
    // Plug content on mount
    plug(slotId, id, children, options);

    // Unplug on unmount
    return () => {
      unplug(slotId, id);
    };
  }, [slotId, id, children, options, plug, unplug]);

  // This component doesn't render anything
  return null;
}
