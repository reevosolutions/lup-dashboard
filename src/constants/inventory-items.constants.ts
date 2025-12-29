export const INVENTORY_ITEM_STATUSES: Levelup.V2.Inventory.Entity.TInventoryItemStatus[] = [
  // on create inbound
  "coming",
  // on inbound received
  "in_stock",
  // on item in shelf or in box
  "in_shelf",
  // agent tasks
  "in_process",
  // related to delivery
  "returning",
  "returned",
  "delivered",
  // frozen on reserve
  "reserved",
  // danger statuses
  "expired",
  "damaged",
  "lost",
  "stolen",
  "in_review",
  "in_repair",
];
