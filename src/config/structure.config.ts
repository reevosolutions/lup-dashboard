import { env } from "./env";

export const structureConfig = {
  sdk: {
    baseURL: env.NEXT_PUBLIC_API_BASE_URL,
    appId: env.NEXT_PUBLIC_API_APP_ID,
    appSecret: env.NEXT_PUBLIC_API_APP_SECRET,
    debug: env.NEXT_PUBLIC_API_SDK_DEBUG,
  },
  cache: {
    dbName: env.NEXT_PUBLIC_CACHE_DB_NAME,
    dbVersion: env.NEXT_PUBLIC_CACHE_DB_VERSION,
  },
  security: {
    localStorage: {
      secret: env.NEXT_PUBLIC_LOCAL_STORAGE_SECRET,
      passphrase: env.NEXT_PUBLIC_LOCAL_STORAGE_PASSPHRASE,
    },
  },
  dev: {
    master: {
      email: env.NEXT_PUBLIC_MASTER_EMAIL,
      password: env.NEXT_PUBLIC_MASTER_PASSWORD,
    },
  },
};
