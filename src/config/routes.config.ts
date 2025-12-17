// Define route spaces
export const SPACE_ROUTES = {
  store: "/store",
  dropshipper: "/dropshipper",
  supplier: "/supplier",
  administration: "/admin",
  agent: "/agent",
  deliverer: "/deliverer",
  user_account: "/account",
  support: "/support",
  development: "/dev",
  system_management: "/system",
  company_management: "/company",
  public: "/",
} as const;

export type Space = keyof typeof SPACE_ROUTES;

// Define a simpler route structure for the dashboard
// We will separate the UI (icons) from the routing logic in the future
export const ROUTES = {
  public: {
    home: "/",
    login: "/auth/login",
    register: "/auth/register",
  },
  dashboard: {
    root: "/dashboard",
    overview: "/dashboard/overview",
    settings: "/dashboard/settings",
  },
  // Add more routes as we migrate features
};
