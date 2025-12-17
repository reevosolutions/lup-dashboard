import { z } from "zod";

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Lup Dashboard"),

  // API / SDK
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default("http://localhost:5100"),
  NEXT_PUBLIC_API_APP_ID: z.string().optional(),
  NEXT_PUBLIC_API_APP_SECRET: z.string().optional(),
  NEXT_PUBLIC_API_SDK_DEBUG: z.string().transform((val) => val === "true" || val === "1").default(false),

  // Auth
  NEXT_PUBLIC_MASTER_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_MASTER_PASSWORD: z.string().optional(),

  // Cache
  NEXT_PUBLIC_CACHE_DB_NAME: z.string().default("levelup"),
  NEXT_PUBLIC_CACHE_DB_VERSION: z.string().transform((val) => parseInt(val, 10)).default(1),

  // Security
  NEXT_PUBLIC_LOCAL_STORAGE_SECRET: z.string().default("xAmR6cjH9UYHRdOymtSQPCiTOwjPV1tn"),
  NEXT_PUBLIC_LOCAL_STORAGE_PASSPHRASE: z.string().default("dO7BBxWTh1fZM7BNccWsTdV2DYn2UAI8"),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_API_BASE_URL: process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_API_BASE_URL_DEV,
  NEXT_PUBLIC_API_APP_ID: process.env.NEXT_PUBLIC_API_APP_ID,
  NEXT_PUBLIC_API_APP_SECRET: process.env.NEXT_PUBLIC_API_APP_SECRET,
  NEXT_PUBLIC_API_SDK_DEBUG: ['1', 'true', 1, true].includes(process.env.NEXT_PUBLIC_API_SDK_DEBUG || false),
  NEXT_PUBLIC_MASTER_EMAIL: process.env.NEXT_PUBLIC_MASTER_EMAIL,
  NEXT_PUBLIC_MASTER_PASSWORD: process.env.NEXT_PUBLIC_MASTER_PASSWORD,
  NEXT_PUBLIC_CACHE_DB_NAME: process.env.NEXT_PUBLIC_CACHE_DB_NAME,
  NEXT_PUBLIC_CACHE_DB_VERSION: parseInt(process.env.NEXT_PUBLIC_CACHE_DB_VERSION || "1", 10),
  NEXT_PUBLIC_LOCAL_STORAGE_SECRET: process.env.NEXT_PUBLIC_LOCAL_STORAGE_SECRET,
  NEXT_PUBLIC_LOCAL_STORAGE_PASSPHRASE: process.env.NEXT_PUBLIC_LOCAL_STORAGE_PASSPHRASE,
};

// Parse and validate
const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  // In production, we might want to throw an error. In dev, maybe just warn.
  // throw new Error("Invalid environment variables");
}

export const env = parsed.success ? parsed.data : (processEnv as z.infer<typeof envSchema>);
