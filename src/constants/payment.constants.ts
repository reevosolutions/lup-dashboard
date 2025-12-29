export const PARCEL_PAYMENT_STATUSES: Levelup.V2.Payment.Entity.TParcelPaymentStatus[] = [
  "not_initialized", // before delivery
  "not_ready", //
  "ready", // at caissier                pré à payer (after liberation)
  "receivable", // in central
  "paid", // at seller                   vendeur payé
];

export const PAYMENT_STATUSES: Levelup.V2.Payment.Entity.TPaymentStatus[] = [
  "not_initialized", // before delivery, initial state
  "not_collected", // on delivery, money collected by deliverer but not at office
  "collected", // money collected by office agent
  "at_local_office", // after gathering, money at office
  "processing", // not ready for next step
  "ready_for_disbursement", // at cashier, ready to be paid out
  "received_at_central_office", // money received at central office
  "store_payment_pending", // type: store_payment, money transfer pending
  "not_receivable", // cannot be received for some reason
  "paid_to_seller", // at seller, seller has been paid
  "preparing_fund_transfer", // type: fund_transfer, before sending
  "on_the_way", // money on the way to target
  "received_at_target", // fund_transfer: received in the target office
];

export const PAYMENT_TYPES: Levelup.V2.Payment.Entity.TPaymentType[] = [
  "collect_from_user",
  "encase_from_agent",
  "fund_transfer",
  "office_expenses",
  "ops_action",
  "deliverer_payment",
  "store_balance_topup",
  "store_payment",
];
