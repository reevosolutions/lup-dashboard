import { runtimeConfig } from './runtime.config';
import { appConfig } from "./app.config";
import { i18nConfig } from "./i18n.config";
import { ROUTES } from "./routes.config";
import { structureConfig } from "./structure.config";

export * from "./app.config";
export * from "./routes.config";

export const config = {
  i18n: i18nConfig,
  app: appConfig,
  structure: structureConfig,
  runtime: runtimeConfig,
  menu: {
    routes: ROUTES
  }
}