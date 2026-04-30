// Supabase konfiguracija
// URL i anon key su dizajnirani da budu javni — RLS policies u bazi
// kontrolišu pristup podacima.
window.SUPABASE_URL = 'https://rwefiaqaujcblussvizv.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZWZpYXFhdWpjYmx1c3N2aXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NTYzMzIsImV4cCI6MjA5MzEzMjMzMn0.krXEmkYPyf-gyCXf3zi9WF1OOgmIRo-GsuvRkL0A1c0';

window.supabaseClient = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
