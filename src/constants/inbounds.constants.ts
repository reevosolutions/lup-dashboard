export const INBOUND_TYPES: Levelup.V2.Inventory.Entity.TInboundType[] = ["pick_up", "walk_in"];
export const INBOUND_STATUSES: Levelup.V2.Inventory.Entity.TInboundStatus[] = ["not_received", "received", "canceled"];
export const INBOUND_STATUS_GROUP_COLORS = {
  // "in_preparation": "#e9b752",
  not_received: "#facc15",
  received: "#4ade80",
  canceled: "#f87171",
} as const;
