// // --- INIT -------------------------------------------------
// Bootstrap se pokreće iz auth.js nakon uspešne prijave
window.initApp = async function(){
  // 1) Render odmah iz localStorage cache-a (instant UI)
  theme();
  renderNav();
  renderPage();
  setTimeout(buildGrpFilter,50);
  updateSyncStatus();

  // 2) Povuci sveže podatke iz cloud-a u pozadini
  try{
    if(typeof window.dbPull==='function'){
      var cloudData = await window.dbPull();
      if(cloudData){
        applyState(cloudData);
        try{localStorage.setItem('pt_state',JSON.stringify(getState()));}catch(e){}
        theme();renderNav();renderPage();
        setTimeout(buildGrpFilter,50);
      } else {
        // Prvi login — nema podataka u cloud-u, čistimo lokalni cache
        pkgs=[];clients=[];sessions=[];groups=[];slots=[];
        sv();
        renderNav();renderPage();
      }
    }
  }catch(e){
    console.error('Cloud sync failed:', e);
  }

  // 3) Real-time pretplata — promene sa drugih uređaja stižu odmah
  if(typeof window.dbSubscribe==='function'){
    window.dbSubscribe(function(remoteState){
      // Sačuvaj koji modal je otvoren da ga ne uništimo
      var openModal = document.querySelector('.mbg.on');
      var modalId = openModal ? openModal.id : null;
      applyState(remoteState);
      try{localStorage.setItem('pt_state',JSON.stringify(getState()));}catch(e){}
      theme();renderNav();renderPage();
      setTimeout(buildGrpFilter,50);
      // Vrati otvoreni modal
      if(modalId){
        var m = document.getElementById(modalId);
        if(m)m.classList.add('on');
      }
      try{toast(t('syncedFromDevice'));}catch(e){}
    });
  }
};

// Close modals on background click
['mC','mRen','mPkg','mLog','mGrp','mSlot','mWA','mProf'].forEach(function(id){
  var el=document.getElementById(id);
  if(el)el.addEventListener('click',function(e){if(e.target===e.currentTarget)cm(id);});
});
