export const ROLE_GROUPS: Levelup.V2.Auth.Entity.TRoleGroup[] = [
  "master",
  "system_administrators",
  "application_account_owners",
  "application_administrators",
  "company_account_owners",
  "company_administrators",
  //
  "administrators",
  "agents",
  "deliverers",
  "sellers",
  //
  "users",
];

export const HIDDEN_ROLE_GROUPS: Levelup.V2.Auth.Entity.TRoleGroup[] = [
  "master",
  "system_administrators",
  "application_account_owners",
  "application_administrators",
  "company_account_owners",
  "company_administrators",
];

export const SYSTEM_ROLE_GROUPS: Levelup.V2.Auth.Entity.TRoleGroup[] = [
  "master",
  "system_administrators",
  "application_account_owners",
  "application_administrators",
  "company_account_owners",
  "company_administrators",
  "deliverers",
  "sellers",
];

// export const ROLE_GROUP_ORDER: { [Group in Levelup.V2.Auth.Entity.TRoleGroup]: number } = {
export const ROLE_GROUP_ORDER = {
  // master level
  master: 0,
  // system level
  system_administrators: 10,
  // application level
  application_account_owners: 20,
  application_administrators: 21,
  // company level
  company_account_owners: 30,
  company_administrators: 31,
  // administrators level
  administrators: 50,
  agents: 51,
  // deliverers level
  deliverers: 60,
  // sellers level
  sellers: 70,
  // general users level
  users: 100,
} as const;

export const DEFAULT_USER_ROLES: {
  [G in Levelup.V2.Auth.Entity.TRoleGroup]: {
    name: Levelup.V2.Auth.Entity.TDefaultUserRoles;
    description: string;
    hasAllPermissions: boolean;
  }[];
} = {
  master: [
    {
      name: "master",
      description: "",
      hasAllPermissions: true,
    },
  ],
  system_administrators: [
    {
      name: "system administrator",
      description: "",
      hasAllPermissions: true,
    },
    {
      name: "system maintainer",
      description: "",
      hasAllPermissions: true,
    },
  ],
  application_account_owners: [
    {
      name: "application account owner",
      description: "",
      hasAllPermissions: true,
    },
  ],
  application_administrators: [
    {
      name: "application administrator",
      description: "",
      hasAllPermissions: true,
    },
  ],
  company_account_owners: [
    {
      name: "company account owner",
      description: "",
      hasAllPermissions: true,
    },
  ],
  company_administrators: [
    {
      name: "company administrator",
      description: "",
      hasAllPermissions: true,
    },
  ],
  administrators: [
    {
      name: "administrator",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "manager",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "logistic manager",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "hub manager",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "agency manager",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "office supervisor",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "chief cashier",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "agency cashier",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "cashier",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "hub cashier",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "chief customer manager",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "customer manager central",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "customer manager",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "chief commercial",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "commercial central",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "commercial",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "warehouse manager",
      description: "",
      hasAllPermissions: false,
    },
  ],
  agents: [
    {
      name: "hub agent",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "agency agent",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "driver",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "warehouse agent",
      description: "",
      hasAllPermissions: false,
    },
  ],
  deliverers: [
    {
      name: "deliverer",
      hasAllPermissions: false,
      description: "",
    },
  ],
  sellers: [
    {
      name: "seller",
      description: "",
      hasAllPermissions: false,
    },
    {
      name: "store moderator",
      description: "",
      hasAllPermissions: false,
    },
  ],
  users: [
    {
      name: "user",
      description: "",
      hasAllPermissions: false,
    },
  ],
};

export enum RoleGroup {
  Master = "master",
  SystemAdministrators = "system_administrators",
  ApplicationAccountOwners = "application_account_owners",
  ApplicationAdministrators = "application_administrators",
  CompanyAccountOwners = "company_account_owners",
  CompanyAdministrators = "company_administrators",
  //
  Administrators = "administrators",
  Agents = "agents",
  Deliverers = "deliverers",
  Sellers = "sellers",
  /**
   * @description Users: default role group
   */
  Users = "users",
}

export const ROLE_GROUP_LABELS: {
  [G in Levelup.V2.Auth.Entity.TRoleGroup]: string;
} = {
  master: "Master",
  system_administrators: "System Administrators",
  application_account_owners: "Application Account Owners",
  application_administrators: "Application Administrators",
  company_account_owners: "Company Account Owners",
  company_administrators: "Company Administrators",
  //
  administrators: "Administrators",
  agents: "Agents",
  deliverers: "Deliverers",
  sellers: "Sellers",
  /**
   * @description Users: default role group
   */
  users: "Users",
} as const;

const DEFAULT_ROLES: Levelup.V2.Auth.Entity.TDefaultUserRoles[] = [
  // master
  "master",
  // system_administrators
  "application administrator",
  // company_account_owners
  "company account owner",
  // company_administrators
  "company administrator",
  // administrators
  "office supervisor",
  "administrator",
  "manager",
  "logistic manager",
  "hub manager",
  "agency manager",
  // -
  "chief cashier",
  "agency cashier",
  "cashier",
  "hub cashier",
  // -
  "chief customer manager",
  "customer manager central",
  "customer manager",
  // -
  "chief commercial",
  "commercial central",
  "commercial",
  // agents
  "hub agent",
  "agency agent",
  "driver",
  // deliverers
  "deliverer",
  // sellers
  "seller",
  "store moderator",
  // users
  "user",
];

export const DEFAULT_ROLES_LABELS: {
  [G in Levelup.V2.Auth.Entity.TDefaultUserRoles]: string;
} = {
  // master
  master: "Master",
  "system administrator": "System Administrator",
  "system maintainer": "System Maintainer",
  // application_account_owners
  "application account owner": "Application Account Owner",
  // application_administrators
  "application administrator": "Application Administrator",
  // company_account_owners
  "company account owner": "Company Account Owner",
  // company_administrators
  "company administrator": "Company Administrator",
  // administrators
  "office supervisor": "Office Supervisor",
  administrator: "Administrator",
  manager: "Manager",
  "logistic manager": "Logistic Manager",
  "hub manager": "Hub Manager",
  "agency manager": "Agency Manager",
  // -
  "chief cashier": "Chief Cashier",
  "agency cashier": "Agency Cashier",
  cashier: "Cashier",
  "hub cashier": "Hub Cashier",
  // -
  "chief customer manager": "Chief Customer Manager",
  "customer manager central": "Customer Manager Central",
  "customer manager": "Customer Manager",
  // -
  "chief commercial": "Chief Commercial",
  "commercial central": "Commercial Central",
  commercial: "Commercial",
  // agents
  "hub agent": "Hub Agent",
  "agency agent": "Agency Agent",
  "warehouse manager": "Warehouse Manager",
  "warehouse agent": "Warehouse Agent",
  driver: "Driver",
  // deliverers
  deliverer: "Deliverer",
  // sellers
  seller: "Seller",
  "store moderator": "Store Moderator",
  // users
  user: "User",
};

export enum DefaultRole {
  Master = "master",
  SystemAdministrator = "system administrator",
  SystemMaintainer = "system maintainer",
  ApplicationAccountOwner = "application account owner",
  ApplicationAdministrator = "application administrator",
  CompanyAccountOwner = "company account owner",
  CompanyAdministrator = "company administrator",
  OfficeSupervisor = "office supervisor",
  Administrator = "administrator",
  Manager = "manager",
  LogisticManager = "logistic manager",
  HubManager = "hub manager",
  AgencyManager = "agency manager",
  ChiefCashier = "chief cashier",
  AgencyCashier = "agency cashier",
  Cashier = "cashier",
  HubCashier = "hub cashier",
  ChiefCustomerManager = "chief customer manager",
  CustomerManagerCentral = "customer manager central",
  CustomerManager = "customer manager",
  ChiefCommercial = "chief commercial",
  CommercialCentral = "commercial central",
  Commercial = "commercial",
  HubAgent = "hub agent",
  AgencyAgent = "agency agent",
  Driver = "driver",
  Deliverer = "deliverer",
  Seller = "seller",
  StoreModerator = "store moderator",
  User = "user",
  WarehouseManager = "warehouse manager",
  WarehouseAgent = "warehouse agent",
}
