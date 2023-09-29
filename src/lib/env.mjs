import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    TYPEFORM_PERSONAL_TOKEN: z.string().min(1),
    TYPEFORM_WORKSPACE_ID: z.string().min(1),
    PASSWORD: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_TITLE: z.string().min(1),
    NEXT_PUBLIC_LOGO_URL: z.string().url(),
    NEXT_PUBLIC_UI_PRECISION: z.coerce.number().min(1).max(100).default(3),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TITLE: process.env.NEXT_PUBLIC_TITLE,
    NEXT_PUBLIC_LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL,
    NEXT_PUBLIC_UI_PRECISION: process.env.NEXT_PUBLIC_UI_PRECISION,
  },
});
