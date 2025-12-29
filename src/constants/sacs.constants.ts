export const SAC_STATUS_HISTORY: { [oldStatus in Levelup.V2.Shipping.Entity.TSacStatus]: Levelup.V2.Shipping.Entity.TSacStatus[] } = {
  in_preparation: ["picked_up", "forced_open", "opened", "returned_to_seller"],
  picked_up: ["picked_up", "received_in_office", "returned_to_seller"],
  received_in_office: ["forced_open", "opened", "picked_up", "returned_to_seller"],
  forced_open: ["opened"],
  opened: [],
  returned_to_seller: [],
};

export const SAC_STATUSES: Levelup.V2.Shipping.Entity.TSacStatus[] = [
  "in_preparation",
  "picked_up",
  "received_in_office",
  "returned_to_seller",
  "forced_open",
  "opened",
];
export const SAC_STATUSES_NOT_IDLE: Levelup.V2.Shipping.Entity.TSacStatus[] = ["received_in_office", "returned_to_seller", "opened"];

export const SAC_TYPES: Levelup.V2.Shipping.Entity.TSacType[] = ["transfer", "toward_state", "return", "return_transfer", "return_seller"];
