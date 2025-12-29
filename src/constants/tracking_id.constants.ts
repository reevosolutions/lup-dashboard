export const LEVELUP_ITEM_SHORTCUTS: {
  [entity in
    | Levelup.V2.SystemStructure.Services.Models.LevelupModels
    | "import"
    | "export"
    | "productVariant"
    | "parcelExpress"
    | "parcelEconomic"
    | "parcelFreight"
    | "parcelExchange"
    | "parcelAcknowledgment"
    | "shipmentSac"
    | "pickupImport"
    | "paymentSac"
    | "incomingPayment"
    | "outgoingPayment"
    | "paymentRequest"
    | "fundTransfer"
    | "collectFromUser"
    | "encasement"
    | "paymentFreelance"
    | "officeExpenses"
    | "inboundMoney"
    | "outboundMoney"]: string;
} = {
  // shared
  import: "IMP",
  export: "EXP",

  // accounts
  company: "CPN",
  store: "STR",
  brand: "BRD",
  supplier: "SPL",

  // activity
  logItem: "LOG",

  // system
  app: "APP",

  // auth
  apiKey: "KEY",
  user: "USR",
  role: "ROL",
  permission: "PRM",
  permissionGroup: "PMG",

  // cm
  articleType: "ATP",
  article: "ART",
  comment: "CMT",
  review: "REV",
  term: "TAG",
  taxonomy: "TXN",
  translationItem: "TRI",
  translationProject: "TRP",
  translationNamespace: "TRN",

  // customer
  customer: "CST",

  // eventbus
  // event: "EVT",
  webhookListener: "WHL",

  // locations
  country: "CNT",
  state: "STT",
  city: "CTY",

  // logistics
  regionalManagement: "RMN",
  office: "OFC",
  vehicle: "VHL",
  vehicleType: "VHT",
  vehicleMission: "VMS",
  warehouse: "WHS",
  warehouseBox: "WBX",
  warehouseShelf: "WSF",
  warehouseShelfCell: "WCL",
  // hub: 'HUB',
  // desk: 'DSK',

  // products
  product: "PRD",
  productVariant: "PRV",
  productCategory: "CAT",

  // integrations
  integrationApp: "IAP",

  // inventory
  inbound: "INB",
  outbound: "OTB",
  inventoryItem: "INV",

  // orders
  order: "ORD",
  orderImport: "IMO",

  // offers
  discountOffer: "DIS",

  // shipping
  parcel: "SHP",
  parcelImport: "ISH",
  parcelExpress: "SHX",
  parcelEconomic: "SHE",
  parcelFreight: "FLT",
  parcelExchange: "ECH",
  parcelAcknowledgment: "ACC",
  pickup: "PKP",
  sac: "SAC",
  shipmentSac: "SAC",
  pickupImport: "IPK",
  // payment
  payment: "PMT",
  paymentSac: "PSC",
  incomingPayment: "CLT",
  outgoingPayment: "PMT",
  paymentRequest: "PRQ",
  fundTransfer: "TDF",
  collectFromUser: "RCT",
  encasement: "ENC",
  paymentFreelance: "PMF",
  officeExpenses: "OEX",
  deposit: "DPS",
  inboundMoney: "IMN",
  outboundMoney: "OMN",
  spcCityBasedZoning: "SCP",
  spcCityZone: "SCZ",
  spcStateBasedZoning: "SSP",
  spcStateZone: "SSZ",
  spcZonePricing: "ZON",

  // support
  ticket: "TKT",
  ticketResponse: "TKR",
  ticketType: "TTP",
  // storage
  uploadedFile: "UFL",

  // notifications
  notificationItem: "NTF",
} as const;

export const PHARMADZ_ITEM_SHORTCUTS: {
  [entity in
    | Levelup.V2.SystemStructure.Services.Models.PharmadzModels
    | "order"
    | "offer"
    | "message"
    | "exchange"
    | "availability"]: string;
} = {
  order: "ORD",
  laboratory: "LAB",
  hospital: "HOS",
  pharmacy: "PHA",
  provider: "PRO",
  medicine: "MED",
  offer: "OFR",
  message: "MSG",
  exchange: "EXC",
  availability: "AVL",
} as const;

export const ITEM_SHORTCUTS = {
  ...LEVELUP_ITEM_SHORTCUTS,
  ...PHARMADZ_ITEM_SHORTCUTS,
} as const;

export const PARCEL_DEFAULT_PREFIXES: string[] = [
  ITEM_SHORTCUTS.parcel,
  ITEM_SHORTCUTS.parcelExpress,
  ITEM_SHORTCUTS.parcelEconomic,
  ITEM_SHORTCUTS.parcelFreight,
  ITEM_SHORTCUTS.parcelExchange,
  ITEM_SHORTCUTS.parcelAcknowledgment,
];

export type TShortcutsType = typeof ITEM_SHORTCUTS;
export type TShortcutEntities = keyof TShortcutsType;
export type TShortcutPrefix = (typeof ITEM_SHORTCUTS)[TShortcutEntities];
