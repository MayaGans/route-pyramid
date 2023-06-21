import { createClient } from "@supabase/supabase-js";

export async function readData() {
  const supabase = createClient(
    "https://erwnauvxilsimrcmgxoq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyd25hdXZ4aWxzaW1yY21neG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczNjAyODEsImV4cCI6MjAwMjkzNjI4MX0.iwMKoZ_oyhROIPmnOXEanANOPgE77_pX7afTvNnFLEQ"
  );
  async function getData() {
    let data = await supabase.from("all-data").select("*");
    return data;
  }
  return getData();
}
