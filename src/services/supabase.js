import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://sztncufdwgcokyyimwkw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dG5jdWZkd2djb2t5eWltd2t3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwOTAyNDUsImV4cCI6MjA0MDY2NjI0NX0.OJkOwsQUPUILm31Nc7cn2_DI9ihlqnMYjiQjrRPJAvE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
