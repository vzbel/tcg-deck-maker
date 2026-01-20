import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(PROJECT_URL, PUBLISHABLE_KEY);
