export const ticketStatuses: Levelup.V2.Support.Entity.TTicketStatus[] = ["new", "open", "rejected", "closed", "resolved"];
export const ticketResponseStatuses: Levelup.V2.Support.Entity.TTicketResponseStatus[] = ["new", "open", "closed"];

export const TICKET_FIELD_TYPES: Levelup.V2.Support.Entity.TTicketFieldType[] = [
  "number",
  "boolean",
  "phones",
  "date",
  "location_address",
  "location_city",
  "delivery_address",
  "delivery_city",
  "order_status",
  "pickup_status",
  "parcel_status",
  "shipment_to",
  "shipment_type",
];

export const TICKET_PREDEFINED_TYPES = {
  Dev: {
    name: "Test Only",
    identifier: "DEV",
    description: "",
    service: null,
    children: [],
    request_fields: [
      {
        field_type: "number",
        is_mandatory: true,
        name: "number",
        label: "Number",
      },
      {
        field_type: "boolean",
        is_mandatory: true,
        name: "boolean",
        label: "Boolean",
      },
      {
        field_type: "phones",
        is_mandatory: true,
        name: "phones",
        label: "Phones",
      },
      {
        field_type: "date",
        is_mandatory: true,
        name: "date",
        label: "Date",
      },
      {
        field_type: "location_address",
        is_mandatory: true,
        name: "location_address",
        label: "Location Address",
      },
      {
        field_type: "location_city",
        is_mandatory: true,
        name: "location_city",
        label: "Location City",
      },
      {
        field_type: "delivery_address",
        is_mandatory: true,
        name: "delivery_address",
        label: "Delivery Address",
      },
      {
        field_type: "delivery_city",
        is_mandatory: true,
        name: "delivery_city",
        label: "Delivery City",
      },
      {
        field_type: "order_status",
        is_mandatory: true,
        name: "order_status",
        label: "Order Status",
      },
      {
        field_type: "pickup_status",
        is_mandatory: true,
        name: "pickup_status",
        label: "Pickup Status",
      },
      {
        field_type: "parcel_status",
        is_mandatory: true,
        name: "parcel_status",
        label: "Parcel Status",
      },
      {
        field_type: "shipment_to",
        is_mandatory: true,
        name: "shipment_to",
        label: "Shipment To",
      },
      {
        field_type: "shipment_type",
        is_mandatory: true,
        name: "shipment_type",
        label: "Shipment type",
      },
    ],
  },
  "General Support": {
    name: "General Support",
    identifier: "GENERAL_SUPPORT",
    description: "General inquiries and non-specific issues.",
    service: null,
    request_fields: [],
    children: [
      {
        name: "General Inquiry",
        identifier: "GENERAL_INQUIRY",
        description: "General inquiries and non-specific issues.",
        request_fields: [],
      },
    ],
  },
  "Technical Support": {
    name: "Technical Support",
    identifier: "TECHNICAL_SUPPORT",
    service: null,
    description: "Technical issues related to the platform, including bugs and system downtimes.",
    request_fields: [],
    children: [
      {
        name: "Technical Issue",
        identifier: "TECHNICAL_ISSUE",
        description: "Problems related to the platform's technical aspects, such as bugs or system downtimes.",
        request_fields: [],
      },
      {
        name: "User Support",
        identifier: "USER_SUPPORT",
        description: "Queries regarding how to use the system, feature requests, or user account issues.",
        request_fields: [],
      },
    ],
  },
  "Billing and Payments": {
    name: "Billing and Payments",
    identifier: "BILLING_AND_PAYMENTS_SUPPORT",
    service: null,
    description: "Issues related to invoicing, payment discrepancies, or refunds.",
    request_fields: [],
    children: [],
  },
  "Account Management": {
    name: "Account Management",
    identifier: "ACCOUNT_MANAGEMENT",
    service: null,
    description: "User support for account-related queries and feature requests.",
    request_fields: [],
    children: [],
  },
  sourcing: {
    name: "Sourcing",
    identifier: "SOURCING_SUPPORT",
    service: "sourcing",
    description: "Vendor-related issues and product sourcing requests.",
    request_fields: [],
    children: [
      {
        name: "Vendor Issues",
        identifier: "VENDOR_ISSUES",
        description: "Challenges related to suppliers, including delays or product quality concerns.",
        request_fields: [],
      },
      {
        name: "Product Requests",
        identifier: "PRODUCT_REQUESTS",
        description: "Inquiries about sourcing specific products or new product additions.",
        request_fields: [],
      },
    ],
  },
  delivery: {
    name: "Delivery Services",
    identifier: "DELIVERY_SUPPORT",
    service: "delivery",
    description: "Parcel and order management, including status changes and updates.",
    request_fields: [],
    children: [
      {
        name: "Change Parcel Status",
        identifier: "CHANGE_PARCEL_STATUS",
        description: "Requests to update the status of a parcel, with mandatory parcel identification.",
        mandatory_attribute: "parcel",
        request_fields: [
          {
            field_type: "parcel_status",
            is_mandatory: true,
            name: "last_status",
            label: "Parcel status",
          },
        ],
      },
      {
        name: "Change Parcel Price",
        identifier: "CHANGE_PARCEL_PRICE",
        description: "Requests to change the price of a parcel, potentially affecting shipping costs.",
        mandatory_attribute: "parcel",
        request_fields: [
          {
            field_type: "number",
            is_mandatory: true,
            name: "price",
            label: "Price",
          },
          {
            field_type: "boolean",
            is_mandatory: true,
            name: "is_free_shipping",
            label: "Free delivery",
          },
        ],
      },
      {
        name: "Change Parcel Customer Phones",
        identifier: "CHANGE_PARCEL_CUSTOMER_PHONES",
        description: "Requests to update customer phone numbers associated with a parcel.",
        mandatory_attribute: "parcel",
        request_fields: [
          {
            field_type: "phones",
            is_mandatory: true,
            name: "customer_phones",
            label: "Customer phone numbers",
          },
        ],
      },
      {
        name: "Change Parcel Destination Address",
        identifier: "CHANGE_PARCEL_DESTINATION_ADDRESS",
        description: "Requests to update the destination address for a parcel.",
        mandatory_attribute: "parcel",
        request_fields: [
          {
            field_type: "delivery_address",
            is_mandatory: true,
            name: "customer_address",
            label: "Customer address",
          },
        ],
      },
      {
        name: "Change Parcel Destination City",
        identifier: "CHANGE_PARCEL_DESTINATION_CITY",
        description: "Requests to update the city of the destination address for a parcel.",
        mandatory_attribute: "parcel",
        request_fields: [
          {
            field_type: "delivery_city",
            is_mandatory: true,
            name: "customer_city",
            label: "Customer city",
          },
        ],
      },
      {
        name: "Change Parcel Shipment Type",
        identifier: "CHANGE_PARCEL_SHIPMENT_TYPE",
        description: "Requests to change the type of shipment for a parcel.",
        mandatory_attribute: "parcel",
        request_fields: [
          {
            field_type: "shipment_type",
            is_mandatory: true,
            name: "shipment_type",
            label: "Shipment type",
          },
        ],
      },
      {
        name: "Request Parcel Opening",
        identifier: "REQUEST_PARCEL_OPENING",
        description: "Requests for authorization to open a parcel before delivery.",
        mandatory_attribute: "parcel",
        request_fields: [
          {
            field_type: "boolean",
            is_mandatory: true,
            name: "is_openable",
            label: "Is parcel openable",
          },
        ],
      },

      {
        name: "Shipping Damage",
        identifier: "SHIPPING_DAMAGE",
        description: "Reports of damage during shipping or handling issues.",
        mandatory_attribute: "parcel",
        request_fields: [],
      },
    ],
  },
  callcenter: {
    name: "Call Center Operations",
    identifier: "CALLCENTER_SUPPORT",
    service: "callcenter",
    description: "Call handling and information requests managed by the call center.",
    request_fields: [],
    children: [
      {
        name: "Change Order Status",
        identifier: "CHANGE_ORDER_STATUS",
        description: "Requests to modify the current status of an order.",
        mandatory_attribute: "order",
        request_fields: [],
      },
      {
        name: "Call Handling",
        identifier: "CALL_HANDLING",
        description: "Issues related to the handling of calls, including feedback on customer service quality.",
        mandatory_attribute: "order",
        request_fields: [],
      },
      {
        name: "Information Requests",
        identifier: "INFORMATION_REQUESTS",
        description: "Requests for information typically handled over calls, possibly needing detailed follow-up.",
        mandatory_attribute: "order",
        request_fields: [],
      },
    ],
  },
  warehouse: {
    name: "Warehouse Management",
    identifier: "WAREHOUSE_SUPPORT",
    description: "Inventory tracking and warehouse safety and compliance issues.",
    service: "warehouse",
    request_fields: [],
    children: [
      {
        name: "Inventory Discrepancies",
        identifier: "INVENTORY_DISCREPANCIES",
        description: "Issues related to stock levels, misplacements, or system errors in inventory tracking.",
        mandatory_attribute: "inentory_item",
        request_fields: [],
      },
      {
        name: "Safety and Compliance",
        identifier: "SAFETY_AND_COMPLIANCE",
        description: "Concerns regarding warehouse safety or regulatory compliance.",
        mandatory_attribute: "inentory_item",
        request_fields: [],
      },
    ],
  },
  dropshipping: {
    name: "Dropshipping Coordination",
    identifier: "DROPSHIPPING_SUPPORT",
    service: "dropshipping",
    description: "Partner coordination and product integration for dropshipping.",
    request_fields: [],
    children: [
      {
        name: "Partner Coordination",
        identifier: "PARTNER_COORDINATION",
        description: "Problems with dropshipping partners, such as compliance with terms or coordination errors.",
        request_fields: [],
      },
      {
        name: "Product Integration",
        identifier: "PRODUCT_INTEGRATION",
        description: "Challenges related to integrating new products from dropshippers into the marketplace.",
        request_fields: [],
      },
    ],
  },
  store_management: {
    name: "Store Management",
    identifier: "STORE_MANAGEMENT_SUPPORT",
    service: "store_management",
    description: "Operational issues and policy management for the online store.",
    request_fields: [],
    children: [
      {
        name: "Operational Issues",
        identifier: "OPERATIONAL_ISSUES",
        description: "Operational challenges in managing the online store, such as configuration issues or performance optimizations.",
        request_fields: [],
      },
      {
        name: "Store Policy",
        identifier: "STORE_POLICY",
        description: "Inquiries or issues related to store policies, returns, or customer disputes.",
        request_fields: [],
      },
    ],
  },
  marketplace: {
    name: "Marketplace Interaction",
    identifier: "MARKETPLACE_SUPPORT",
    service: "marketplace",
    description: "Support for sellers and handling of buyer complaints in the marketplace.",
    request_fields: [],
    children: [
      {
        name: "Seller Support",
        identifier: "SELLER_SUPPORT",
        description: "Assistance for sellers on the marketplace, including listing problems or dispute resolution.",
        request_fields: [],
      },
      {
        name: "Buyer Complaints",
        identifier: "BUYER_COMPLAINTS",
        description: "Handling complaints from buyers about sellers or products on the marketplace.",
        request_fields: [],
      },
    ],
  },
  "Advanced Issues": {
    name: "Advanced Issues",
    identifier: "ADVANCED_SUPPORT",
    description: "Security concerns, fraud, and requests for new features or enhancements.",
    service: null,
    request_fields: [],
    children: [
      {
        name: "Fraud/Security",
        identifier: "FRAUD_SECURITY",
        description: "Concerns about security breaches, fraudulent activities, or abuse of the system.",
        request_fields: [],
      },
      {
        name: "Feature Requests",
        identifier: "FEATURE_REQUESTS",
        description: "Suggestions for new features or improvements to existing features.",
        request_fields: [],
      },
    ],
  },
} as const;

export type TicketPredefinedTypeIdentifiers =
  | (typeof TICKET_PREDEFINED_TYPES)[keyof typeof TICKET_PREDEFINED_TYPES]["identifier"]
  | (typeof TICKET_PREDEFINED_TYPES)[keyof typeof TICKET_PREDEFINED_TYPES]["children"][number]["identifier"];
