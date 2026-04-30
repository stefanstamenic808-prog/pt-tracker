// db.js — sinhronizacija sa Supabase cloud bazom
// Aplikacija drži state u memoriji (pkgs, clients, ...) i u localStorage cache-u.
// Ovaj modul prebacuje state u cloud na svaku izmenu i povlači ga na startu.
(function(){
  var sb = window.supabaseClient;
  if(!sb){console.error('Supabase client not initialized');return;}

  var pushTimeout = null;
  var lastPushedSerialized = '';

  // Povuci state iz cloud-a
  window.dbPull = async function(){
    if(!window.currentUser)return null;
    try{
      var r = await sb
        .from('user_data')
        .select('data,updated_at')
        .eq('user_id', window.currentUser.id)
        .maybeSingle();
      if(r.error)throw r.error;
      if(!r.data)return null;
      return r.data.data;
    }catch(e){
      console.error('dbPull failed:', e);
      return null;
    }
  };

  // Push state u cloud (debounced 800ms)
  window.dbPush = function(state){
    if(!window.currentUser)return;
    var serialized;
    try{serialized = JSON.stringify(state);}catch(e){return;}
    if(serialized===lastPushedSerialized)return; // ništa novo
    if(pushTimeout)clearTimeout(pushTimeout);
    pushTimeout = setTimeout(async function(){
      pushTimeout = null;
      try{
        var r = await sb.from('user_data').upsert({
          user_id: window.currentUser.id,
          data: state,
          updated_at: new Date().toISOString()
        },{onConflict: 'user_id'});
        if(r.error)throw r.error;
        lastPushedSerialized = serialized;
      }catch(e){
        console.error('dbPush failed:', e);
        // Ostaje u localStorage; pokušaće sledeći put.
      }
    },800);
  };

  // Force odmah (npr. pre logout)
  window.dbPushNow = async function(state){
    if(!window.currentUser)return false;
    if(pushTimeout){clearTimeout(pushTimeout);pushTimeout=null;}
    try{
      var r = await sb.from('user_data').upsert({
        user_id: window.currentUser.id,
        data: state,
        updated_at: new Date().toISOString()
      },{onConflict: 'user_id'});
      if(r.error)throw r.error;
      lastPushedSerialized = JSON.stringify(state);
      return true;
    }catch(e){
      console.error('dbPushNow failed:', e);
      return false;
    }
  };
})();
