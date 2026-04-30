// Auth flow — login/logout/session management
(function(){
  var sb = window.supabaseClient;
  if(!sb){console.error('Supabase client not initialized');return;}

  window.currentUser = null;

  // Show/hide login screen vs app
  function showLogin(){
    document.getElementById('loginScreen').style.display='flex';
    document.getElementById('app').style.display='none';
  }
  function showApp(){
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('app').style.display='flex';
    // Pokreni aplikaciju
    if(typeof window.initApp==='function')window.initApp();
  }

  // Email + Password sign in
  window.signInWithEmail = async function(){
    var email=document.getElementById('authEmail').value.trim();
    var pwd=document.getElementById('authPassword').value;
    var err=document.getElementById('authError');
    err.textContent='';
    if(!email||!pwd){err.textContent='Unesi email i šifru.';return;}
    var btn=document.getElementById('authSignInBtn');
    btn.disabled=true;btn.textContent='Prijavljivanje...';
    try{
      var r = await sb.auth.signInWithPassword({email:email,password:pwd});
      if(r.error)throw r.error;
      // showApp() will be triggered by onAuthStateChange
    }catch(e){
      err.textContent=e.message||'Greška pri prijavi.';
      btn.disabled=false;btn.textContent='Prijavi se';
    }
  };

  // Email + Password sign up
  window.signUpWithEmail = async function(){
    var email=document.getElementById('authEmail').value.trim();
    var pwd=document.getElementById('authPassword').value;
    var err=document.getElementById('authError');
    err.textContent='';
    if(!email||!pwd){err.textContent='Unesi email i šifru.';return;}
    if(pwd.length<6){err.textContent='Šifra mora imati bar 6 karaktera.';return;}
    var btn=document.getElementById('authSignUpBtn');
    btn.disabled=true;btn.textContent='Pravim nalog...';
    try{
      var r = await sb.auth.signUp({email:email,password:pwd});
      if(r.error)throw r.error;
      if(r.data&&r.data.user&&!r.data.session){
        err.style.color='var(--green)';
        err.textContent='✓ Nalog napravljen! Proveri email za potvrdu.';
      }
    }catch(e){
      err.style.color='var(--red)';
      err.textContent=e.message||'Greška pri registraciji.';
    }finally{
      btn.disabled=false;btn.textContent='Napravi nalog';
    }
  };

  // Google OAuth
  window.signInWithGoogle = async function(){
    var err=document.getElementById('authError');
    err.textContent='';
    try{
      var r = await sb.auth.signInWithOAuth({
        provider:'google',
        options:{redirectTo:window.location.origin+window.location.pathname}
      });
      if(r.error)throw r.error;
    }catch(e){
      err.style.color='var(--red)';
      err.textContent=e.message||'Greška pri Google prijavi.';
    }
  };

  // Logout
  window.signOut = async function(){
    // Push poslednje izmene pre odjave
    try{
      if(typeof window.dbPushNow==='function'&&typeof window.getState==='function'){
        await window.dbPushNow(window.getState());
      }
    }catch(e){console.error('Final push before logout failed:', e);}
    // Sign out
    await sb.auth.signOut();
    // Briši localStorage cache da sledeći user kreće čisto
    var keys=['pt_state','pt_pkgs','pt_clients','pt_sessions','pt_groups','pt_slots','pt_dark','pt_lang','pt_watpl','pt_tname'];
    keys.forEach(function(k){try{localStorage.removeItem(k);}catch(e){}});
    window.location.reload();
  };

  // Check session on load
  async function init(){
    var r = await sb.auth.getSession();
    if(r.data&&r.data.session){
      window.currentUser=r.data.session.user;
      showApp();
    } else {
      showLogin();
    }
  }

  // Listen for auth state changes
  sb.auth.onAuthStateChange(function(event, session){
    if(session&&session.user){
      window.currentUser=session.user;
      var loginEl=document.getElementById('loginScreen');
      if(loginEl&&loginEl.style.display!=='none')showApp();
    } else if(event==='SIGNED_OUT'){
      window.currentUser=null;
      showLogin();
    }
  });

  // Pokreni proveru kad je DOM spreman
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else {
    init();
  }
})();
