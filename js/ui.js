// // --- NAV --------------------------------------------------
var TABS=[
  {id:'clients',lk:'clients',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'},
  {id:'paketi',lk:'packages',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>'},
  {id:'grupe',lk:'groups',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/></svg>'},
  {id:'raspored',lk:'schedule',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'},
  {id:'finansije',lk:'finance',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'},
  {id:'whatsapp',lk:'whatsapp',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'},
  {id:'arhiva',lk:'archive',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>'},
  {id:'settings',lk:'settings',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'}
];

function renderNav(){
  var h='';
  for(var i=0;i<TABS.length;i++){
    var tb=TABS[i];
    h+='<button class="ni'+(tab===tb.id?' on':'')+'" data-tab="'+tb.id+'">'+tb.ic+'<span>'+t(tb.lk)+'</span></button>';
  }
  document.getElementById('bnav').innerHTML=h;
}
document.getElementById('bnav').addEventListener('click',function(e){
  var btn=e.target.closest('[data-tab]');
  if(btn){tab=btn.getAttribute('data-tab');renderNav();renderPage();}
});
function setTab(id){tab=id;renderNav();renderPage();}

function renderPage(){
  var c=document.getElementById('content');
  if(tab==='clients')c.innerHTML=pgClients();
  else if(tab==='paketi')c.innerHTML=pgPaketi();
  else if(tab==='grupe')c.innerHTML=pgGrupe();
  else if(tab==='raspored')c.innerHTML=pgRaspored();
  else if(tab==='finansije')c.innerHTML=pgFin();
  else if(tab==='whatsapp')c.innerHTML=pgWA();
  else if(tab==='arhiva')c.innerHTML=pgArhiva();
  else if(tab==='settings')c.innerHTML=pgSettings();
}

// // --- SYNC STATUS INDICATOR --------------------------------
function updateSyncStatus(){
  var el=document.getElementById('syncStatus');
  if(!el)return;
  var online = (typeof navigator==='undefined') || navigator.onLine!==false;
  var dirty = localStorage.getItem('pt_state_dirty')==='1';
  if(!online){
    el.className='sync-status sync-offline';
    el.title='Offline — promene se čuvaju lokalno';
  } else if(dirty){
    el.className='sync-status sync-pending';
    el.title='Sinhronizacija u toku...';
  } else {
    el.className='sync-status sync-online';
    el.title='Sinhronizovano';
  }
}
window.addEventListener('syncStatusChange', updateSyncStatus);
window.addEventListener('online', updateSyncStatus);
window.addEventListener('offline', updateSyncStatus);

