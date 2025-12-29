export const SHIPMENT_TO: Levelup.V2.Shipping.Entity.TShipmentTo[] = ["home", "desk"];
export const SHIPMENT_FROM: Levelup.V2.Shipping.Entity.TShipmentFrom[] = ["office", "warehouse"];
export enum PARCEL_SIZES {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big",
  HUGE = "huge",
}

export const SHIPMENT_TYPES: Levelup.V2.Shipping.Entity.TShipmentType[] = ["express", "economic", "freight"];
export const PARCEL_TYPES: Levelup.V2.Shipping.Entity.TParcelType[] = ["classic", "ecommerce", "internal", "b2b"];
export const PARCEL_SUB_TYPES: Levelup.V2.Shipping.Entity.TParcelSubType[] = ["normal", "with_exchange", "exchange", "with_acknowledgement", "acknowledgement"];
export const PAYMENT_STATUSES: Levelup.V2.Payment.Entity.TParcelPaymentStatus[] = ["not_initialized", "not_ready", "ready", "receivable", "paid"];
export const PARCEL_PLACE_STATUSES: Levelup.V2.Shipping.Entity.TParcelPlaceStatus[] = ["in_office", "at_seller", "on_the_way", "out_in_delivery"];

export const PARCEL_STATUSES: Levelup.V2.Shipping.Entity.TParcelStatus[] = [
  "in_warehouse", // warehouse
  "packaged", // warehouse
  "returned_to_warehouse", // warehouse
  "_not_shipped_yet",
  "_to_be_checked",
  "_not_yet_picked_up",
  "in_preparation",
  "ready_to_ship",
  "picked_up",
  "transfer",
  "shipped",
  "in_transit",
  "center",
  "toward_state",
  "_received_in_office",
  "_passing_to_deliverer",
  "received_in_state",
  "waiting_for_the_customer",
  "out_in_delivery",
  "waiting",
  "on_alert",
  "alert_resolved",
  "failed_attempt",
  "delivered",
  "delivery_failure",
  // '_passing_to_returned_to_the_center',
  "attempt_returned_to_the_center",
  "returned_to_the_center",
  "return_to_center",
  "group_return",
  "return_to_withdraw",
  "return_to_seller",
  "_passing_to_seller",
  "returned_to_seller",
  "failed_exchange",
  "_current_office_corrected",
  "_hold",
  "_hold_return",
  "return_received_in_the_center",
  "returned_to_sender",
  // integration with other delivery logistics company
  "group_return_for_company",
  "return_to_recover_for_company",
  "return_to_company",
  "returned_to_company",
];

export const PARCEL_STATUSES_NOT_IDLE: Levelup.V2.Shipping.Entity.TParcelStatus[] = [
  // in ppreparation
  "in_warehouse", // warehouse
  "_not_shipped_yet",
  "_to_be_checked",
  "_not_yet_picked_up",
  "in_preparation",
  "ready_to_ship",
  // returned
  "returned_to_warehouse", // warehouse
  "returned_to_seller",
  "returned_to_sender",
  // delivered
  "delivered",
];
export const PARCEL_STATUSES_GROUPED: {
  [grouped_status in Levelup.V2.Shipping.Entity.TParcelStatusGroup]: Levelup.V2.Shipping.Entity.TParcelStatus[];
} = {
  in_preparation: [
    "in_warehouse", // warehouse
    "packaged", // warehouse
    "_not_shipped_yet",
    "_to_be_checked",
    "_not_yet_picked_up",
    "in_preparation",
    "ready_to_ship",
    // '_passing_to_returned_to_the_center',
  ],
  processing: [
    "picked_up",
    "transfer",
    "shipped",
    "in_transit",
    "center",
    "toward_state",
    "_received_in_office",
    "_passing_to_deliverer",
    "received_in_state",
    "waiting_for_the_customer",
    "out_in_delivery",
    "waiting",
    "attempt_returned_to_the_center",
    "on_alert",
    "alert_resolved",
    "failed_attempt",
    "_current_office_corrected",
    "_hold",
  ],
  delivered: ["delivered"],
  returning: [
    "delivery_failure",
    "returned_to_the_center",
    "return_to_center",
    "group_return",
    "return_to_withdraw",
    "return_to_seller",
    "_passing_to_seller",
    "failed_exchange",
    "_hold_return",
    "return_received_in_the_center",
    "return_transfer",
    "_hold_return",
    // integration with other delivery logistics company
    "group_return_for_company",
    "return_to_recover_for_company",
    "return_to_company",
    "returned_to_company",
  ],
  returned: [
    "returned_to_warehouse", // warehouse
    "returned_to_seller",
    "returned_to_sender",
  ],
  return: [],
};
PARCEL_STATUSES_GROUPED.return = [...PARCEL_STATUSES_GROUPED.returning, ...PARCEL_STATUSES_GROUPED.returned];

export const PARCEL_STATUS_GROUP_COLORS = {
  // "in_preparation": "#e9b752",
  in_preparation: "#facc15",
  processing: "#38bdf8",
  delivered: "#4ade80",
  returning: "#fb923c",
  returned: "#f87171",
  return: "#f87171",
} as const;

export const PARCEL_STATUS_GROUPS: {
  [status in Levelup.V2.Shipping.Entity.TParcelStatus]?: Levelup.V2.Shipping.Entity.TParcelStatusGroup[];
} = {};

Object.keys(PARCEL_STATUSES_GROUPED).forEach((group) => {
  PARCEL_STATUSES_GROUPED[group as Levelup.V2.Shipping.Entity.TParcelStatusGroup].forEach(
    (status) => (PARCEL_STATUS_GROUPS[status] = [...(PARCEL_STATUS_GROUPS[status] || []), group as Levelup.V2.Shipping.Entity.TParcelStatusGroup])
  );
});

export const UPDATABLE_PARCEL_STATUSES: Levelup.V2.Shipping.Entity.TParcelStatus[] = ["_not_shipped_yet", "in_preparation", "ready_to_ship"];

export const PARCEL_STATUSES_FAILED: Levelup.V2.Shipping.Entity.TParcelStatus[] = [
  "delivery_failure",
  "failed_exchange",
  "return_to_center",
  "return_transfer",
  "return_to_withdraw",
  "return_received_in_the_center",
  // integration with other delivery logistics company
  "group_return_for_company",
  "return_to_recover_for_company",
  "return_to_company",
  "returned_to_company",
];

export const PARCEL_STATUSES_DELIVERABLE_ON_STOPDESK: Levelup.V2.Shipping.Entity.TParcelStatus[] = [
  // 'in_warehouse', // warehouse
  // 'packaged', // warehouse
  // 'returned_to_warehouse', // warehouse
  // '_not_shipped_yet',
  "_to_be_checked",
  // '_not_yet_picked_up',
  // 'in_preparation',
  // 'ready_to_ship',
  // 'picked_up',
  // 'transfer',
  "shipped",
  "in_transit",
  "center",
  // 'toward_state',
  "_received_in_office",
  "_passing_to_deliverer",
  "received_in_state",
  "waiting_for_the_customer",
  "out_in_delivery",
  "waiting",
  "on_alert",
  "alert_resolved",
  "failed_attempt",
  // 'delivered',
  "delivery_failure",
  // '_passing_to_returned_to_the_center',
  "returned_to_the_center",
  "attempt_returned_to_the_center",
  // 'return_to_center',
  // 'group_return',
  // 'return_to_withdraw',
  // 'return_to_seller',
  // '_passing_to_seller',
  // 'returned_to_seller',
  "failed_exchange",
  "_current_office_corrected",
  "_hold",
  "_hold_return",
  // "return_received_in_the_center"
];

export const PARCEL_STATUSES_RETURNED_FINAL: Levelup.V2.Shipping.Entity.TParcelStatus[] = ["returned_to_seller", "returned_to_warehouse"];

export const PARCEL_FINAL_STATUSES: Levelup.V2.Shipping.Entity.TParcelStatus[] = [
  "_passing_to_seller",
  "returned_to_seller", // final, seller
  "_passing_to_warehouse",
  "returned_to_warehouse", // final, warehouse
  "delivered",
];

export const PARCEL_STATUSES_AT_SELLER: Levelup.V2.Shipping.Entity.TParcelStatus[] = [
  "_not_shipped_yet",
  "_not_yet_picked_up",
  "in_preparation",
  "ready_to_ship",
];

export const PARCEL_STATUSES_NOT_AT_DELIVERER: Levelup.V2.Shipping.Entity.TParcelStatus[] = [
  "in_warehouse", // warehouse
  "packaged", // warehouse
  "returned_to_warehouse", // warehouse
  "_not_shipped_yet",
  "_to_be_checked",
  "_not_yet_picked_up",
  "in_preparation",
  "ready_to_ship",
  "picked_up",
  "transfer",
  "shipped",
  "in_transit",
  "center",
  "toward_state",
  "_received_in_office",
  "received_in_state",
  "delivered",
  "delivery_failure",
  "return_to_center",
  "returned_to_the_center",
  "attempt_returned_to_the_center",
  "return_transfer",
  "group_return",
  "return_to_withdraw",
  "return_to_seller",
  "returned_to_seller",
  "failed_exchange",
  "_current_office_corrected",
  "_hold",
  "returned_to_sender",
];
export const PARCEL_STATUSES_AT_COMPANY: Levelup.V2.Shipping.Entity.TParcelStatus[] = [
  // integration with other delivery logistics company
  "return_to_company",
  "returned_to_company",
];
export const PARCEL_STATUSES_AT_DELIVERER: Levelup.V2.Shipping.Entity.TParcelStatus[] = [
  "_passing_to_deliverer",
  "out_in_delivery",
  "waiting_for_the_customer",
  "waiting",
  "on_alert",
  "alert_resolved",
  "failed_attempt",
  "delivery_failure",
  "failed_exchange",
  // '_passing_to_returned_to_the_center',
  // 'returned_to_the_center',
];

export const PARCEL_STATUS_FAILURE_REASONS: Levelup.V2.Shipping.Entity.TParcelStatusReason[] = [
  "wrong_product",
  "missing_product",
  "broken_or_defective_product",
  "client_unable_to_pay",
  "wrong_state",
  "client_does_not_show",
  "client_absent_failed",
  "canceled_by_the_customer",
  "double_order",
  "wrong_number",
  "the_customer_has_not_ordered",
  null,
];
export const PARCEL_STATUS_ATTEMPT_REASONS: Levelup.V2.Shipping.Entity.TParcelStatusReason[] = [
  "erroneous_municipality",
  "unreachable_phone",
  "client_does_not_respond",
  "customer_absent_postponed",
  null,
];

export const INITIAL_ACKNOWLEDGMENT_STATUS: Levelup.V2.Shipping.Entity.TParcelStatus = "_not_yet_picked_up";
export const ACKNOWLEDGMENT_STATUS_AFTER_PICKUP_BY_DELIVERER: Levelup.V2.Shipping.Entity.TParcelStatus = "picked_up";
export const INITIAL_EXCHANGE_STATUS: Levelup.V2.Shipping.Entity.TParcelStatus = "_not_yet_picked_up";
export const EXCHANGE_STATUS_AFTER_PICKUP_BY_DELIVERER: Levelup.V2.Shipping.Entity.TParcelStatus = "picked_up";

/**
// on create sac : parcel statuses changed to center
// on create sac[transfer.inter-offices] : parcel statuses changed to transfer
// on create sac[transfer.inter-states] : parcel statuses changed to transfer
toward_state // sacStatus: picked_up
transfer // sacStatus: picked_up
_received_in_office // sacStatus: received_in_office
received_in_state // sacStatus: opened
center // sacStatus: opened
 * TODO stop-desk: received_in_state >> on_alert .. directly,
 * TODO stop-desk (agency) must have pseudo delivery-man account
*/
export const PARCEL_STATUS_HISTORY: {
  [oldStatus in Levelup.V2.Shipping.Entity.TParcelStatus]: (Levelup.V2.Shipping.Entity.TParcelStatus | "*")[];
} = {
  in_warehouse: ["packaged"],
  packaged: ["shipped"],

  in_preparation: ["packaged", "ready_to_ship", "picked_up", "shipped"],
  ready_to_ship: ["in_preparation", "picked_up", "shipped"],
  picked_up: ["shipped"],
  shipped: [
    "_current_office_corrected",
    "_hold",
    "in_transit",
    // START TEMPORARLY ADDED
    "center",
    "transfer",
    "toward_state",
    "_passing_to_deliverer",
    "canceled",
    // END TEMPORARLY ADDED
  ],
  canceled: ["_passing_to_seller", "_passing_to_warehouse", "returned_to_sender"],
  in_transit: ["_current_office_corrected", "_hold", "center", "transfer", "toward_state"],
  center: [
    "_current_office_corrected",
    "_hold",
    "transfer",
    "toward_state",
    "_passing_to_deliverer",
    "waiting_for_the_customer", // stop-desk
  ],
  transfer: [
    // added to disable pickup/receive sac
    // the logic will be temporarly create->open
    // 'toward_state', // sacStatus: picked_up
    // 'transfer', // sacStatus: picked_up
    "_received_in_office",
    "received_in_state",
    "center",
    "_hold",
  ],
  toward_state: ["_current_office_corrected", "received_in_state", "_hold"],
  _received_in_office: ["_current_office_corrected", "_hold"],
  received_in_state: ["_current_office_corrected", "_hold", "_passing_to_deliverer", "transfer"],
  _passing_to_deliverer: ["out_in_delivery", "received_in_state", "center"],
  out_in_delivery: ["on_alert", "waiting", "waiting_for_the_customer", "failed_attempt", "delivery_failure", "delivered", "_hold"],
  on_alert: ["on_alert", "alert_resolved", "delivered", "failed_attempt", "delivery_failure", "returned_to_sender"],
  alert_resolved: ["*"],
  waiting: [
    "delivered",
    "delivery_failure",
    "failed_attempt", // TODO review this status transform
  ],
  waiting_for_the_customer: ["delivered", "delivery_failure", "failed_attempt", "returned_to_sender"],
  failed_attempt: [
    "failed_attempt",
    "delivery_failure",

    // '_passing_to_returned_to_the_center',
    // 'returned_to_the_center',
    "center",
    "delivered",
    "returned_to_the_center",
    "attempt_returned_to_the_center",
    "returned_to_sender",
  ],
  delivered: [],
  delivery_failure: [
    "returned_to_the_center", // FIXME:
    // '_passing_to_returned_to_the_center',
  ],
  failed_exchange: ["returned_to_the_center"],
  // '_passing_to_returned_to_the_center': [
  //   'returned_to_the_center'
  // ],
  returned_to_the_center: [
    "_current_office_corrected",
    "_hold",
    "_hold_return",
    "return_received_in_the_center",
    "_passing_to_deliverer",
    "_passing_to_seller",
    "center",
    "transfer",

    // 'out_in_delivery',
    // 'group_return',
    "return_to_seller",

    // 'return_in_transit',
    "return_to_center",
    "return_transfer",
    "returned_to_sender",
  ],
  attempt_returned_to_the_center: [
    "returned_to_the_center",
    "_hold",
    "_hold_return",
    "return_received_in_the_center",
    "_passing_to_deliverer",
    "_passing_to_seller",
    "center",
    "transfer",

    // 'out_in_delivery',
    // 'group_return',
    "return_to_seller",

    // 'return_in_transit',
    "return_to_center",
    "return_transfer",
    "returned_to_sender",
  ],
  return_to_center: ["return_received_in_the_center", "_hold_return"],
  return_transfer: ["return_received_in_the_center", "_hold_return"],
  return_received_in_the_center: ["return_transfer", "group_return", "_hold_return", "returned_to_sender"],
  return_to_withdraw: ["group_return", "_hold_return"],
  group_return_for_company: ["group_return", "return_to_recover_for_company"],
  return_to_recover_for_company: ["group_return", "return_to_company"],
  return_to_company: ["group_return", "returned_to_company"],
  returned_to_company: ["group_return"],
  group_return: ["group_return", "return_to_seller", "_passing_to_seller", "returned_to_seller", "return_to_withdraw", "_hold_return"],
  return_to_seller: [
    "_passing_to_seller",
    "returned_to_seller",
    "_passing_to_warehouse",
    "returned_to_warehouse", // final, warehouse
  ],
  _passing_to_warehouse: ["returned_to_warehouse"],
  _passing_to_seller: ["returned_to_seller"],
  returned_to_seller: [],
  returned_to_warehouse: [],

  // globals
  _not_yet_picked_up: [],
  _to_be_checked: [],
  _not_shipped_yet: [],
  _current_office_corrected: ["*"],
  _hold: ["*"],
  _hold_return: ["*"],
  returned_to_sender: [
    // 'returned_to_sender', // FIXME: remove this on production
  ],
};

export const getOldParcelStatus: (new_status: Levelup.V2.Shipping.Entity.TParcelStatus) => Levelup.V2.Shipping.Entity.TParcelStatus[] = (new_status) => {
  const _old_status: Levelup.V2.Shipping.Entity.TParcelStatus[] = [];
  Object.keys(PARCEL_STATUS_HISTORY).forEach((status) => {
    if (
      PARCEL_STATUS_HISTORY[status as Levelup.V2.Shipping.Entity.TParcelStatus].includes(new_status) ||
      PARCEL_STATUS_HISTORY[status as Levelup.V2.Shipping.Entity.TParcelStatus].includes("*")
    )
      _old_status.push(status as Levelup.V2.Shipping.Entity.TParcelStatus);
  });

  return _old_status;
};

export const parcelCanPassToStatus: (old_status: Levelup.V2.Shipping.Entity.TParcelStatus, new_status: Levelup.V2.Shipping.Entity.TParcelStatus) => boolean = (
  old_status,
  new_status
) => {
  const old_probable_statuses: Levelup.V2.Shipping.Entity.TParcelStatus[] = getOldParcelStatus(new_status);
  return old_probable_statuses.includes(old_status);
};
