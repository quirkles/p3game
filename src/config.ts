import { z } from "zod";

const configSchema = z.object({
  ENV: z.enum(["local", "dev", "prod"]),
  API_KEY: z.string(),
  AUTH_DOMAIN: z.string(),
  PROJECT_ID: z.string(),
  STORAGE_BUCKET: z.string(),
  MESSAGING_SENDER_ID: z.string(),
  APP_ID: z.string(),
  MEASUREMENT_ID: z.string(),
});

type IConfig = z.infer<typeof configSchema>;

let config: IConfig | null = null;

export function getConfig(): IConfig {
  if (config) {
    return config;
  }

  config = configSchema.parse({
    ENV: process.env.NEXT_PUBLIC_ENV,
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  });

  return config;
}
