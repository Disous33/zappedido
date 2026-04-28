import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const missingVariables = [
  !supabaseUrl ? "VITE_SUPABASE_URL" : "",
  !supabaseAnonKey ? "VITE_SUPABASE_ANON_KEY" : "",
].filter(Boolean);

if (missingVariables.length > 0) {
  const message = `Missing Supabase environment variables: ${missingVariables.join(", ")}. Add them to your Vite environment and Vercel project settings.`;

  if (import.meta.env.DEV) {
    throw new Error(message);
  }

  console.error(message);
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
