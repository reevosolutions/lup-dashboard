export const ORDER_STATUS_REASONS: Levelup.V2.Orders.Entity.TOrderStatusReason[] = [
  "unreachable_phone",
  "client_does_not_respond",
  "wrong_number",
  "customer_absent_postponed",
  "client_absent_failed",
  "canceled_by_the_customer",
  "double_order",
  "the_customer_has_not_ordered",
  "wrong_product",
  "missing_product",
  "client_unable_to_pay",
  "wrong_state",
  "erroneous_municipality",
];

export const ORDER_STATUSES: Levelup.V2.Orders.Entity.TOrderStatus[] = ["pending", "processing", "call_later", "no_answer", "confirmed", "canceled"];
export const ORDER_STATUS_COLORS: {
  [Status in Levelup.V2.Orders.Entity.TOrderStatus]: string;
} = {
  pending: "#facc15",
  call_later: "#38bdf8",
  processing: "#38bdf8",
  confirmed: "#4ade80",
  no_answer: "#fb923c",
  canceled: "#f87171",
} as const;

export const DEFAUL_STATUSES_GRAPH_DATA: {
  [Status in Levelup.V2.Orders.Entity.TOrderStatus]: Partial<{
    color: string;
    label: string;
    total: number;
  }>;
} = {
  pending: {
    color: ORDER_STATUS_COLORS.pending,
  },
  processing: {
    color: ORDER_STATUS_COLORS.processing,
  },
  no_answer: {
    color: ORDER_STATUS_COLORS.no_answer,
  },
  call_later: {
    color: ORDER_STATUS_COLORS.call_later,
  },
  confirmed: {
    color: ORDER_STATUS_COLORS.confirmed,
  },
  canceled: {
    color: ORDER_STATUS_COLORS.canceled,
  },
};
