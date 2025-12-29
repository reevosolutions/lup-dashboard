import { runtimeConfig } from './runtime.config';
import { appConfig } from "./app.config";
import { i18nConfig } from "./i18n.config";
import { ROUTES } from "./routes.config";
import { structureConfig } from "./structure.config";
import { env } from './env';

export * from "./app.config";
export * from "./routes.config";

export const config = {
  i18n: i18nConfig,
  app: appConfig,
  structure: structureConfig,
  runtime: runtimeConfig,
  menu: {
    routes: ROUTES
  },
  /**
   * SDK Configuration
   */
  sdk: {
    baseURL: env.NEXT_PUBLIC_API_BASE_URL,
    appId: env.NEXT_PUBLIC_API_APP_ID || "",
    appSecret: env.NEXT_PUBLIC_API_APP_SECRET || "",
    debug: env.NEXT_PUBLIC_API_SDK_DEBUG,
  },

}