import { env } from "./env";

export const runtimeConfig = {

  dev: {
    isDev: env.NODE_ENV === "development",
    isProd: env.NODE_ENV === "production",
  },
};
