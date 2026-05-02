// // --- STATE -----------------------------------------------
var isDark=false, tab='clients', lang='sr';
var eCid=null, eRcid=null, ePid=null, eGid=null, eSlotId=null;
var sPid=null, rPid=null, pkgTy='p', rStat='active';
var gColor='#cc2200', sltCid=null, filterGrp='', finPer='mesec';
var calY=new Date().getFullYear(), calM=new Date().getMonth(), weekOff=0;

var pkgs=[], clients=[], sessions=[], groups=[], slots=[];
var GCOLS=['#cc2200','#1a7a2e','#1a56db','#9333ea','#059669','#d97706','#0891b2','#be185d','#374151'];
var HOURS=['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'];
var DEFAULT_WA='Zdravo {ime}! 👋\n\nPodsetnik: paket *{paket}* ističe za *{dani} dana* ({datum}).\n\nCena produžetka: *€{cena}*\n\nJavi se! 💪\n– StamenicFitt';

var TL={p:'Personalni',s:'Polu-pers.',g:'Grupni'};
var TC={p:'tcp',s:'tcs',g:'tcg'};
var DAYS_SR=['Pon','Uto','Sre','Čet','Pet','Sub','Ned'];
var DAYS_EN=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
var DAYS_RU=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

// // --- PERSIST ----------------------------------------------
window.getState = function(){
  return {
    pkgs:pkgs,clients:clients,sessions:sessions,groups:groups,slots:slots,
    settings:{
      isDark:isDark,lang:lang,
      trainerName:localStorage.getItem('pt_tname')||'StamenicFitt',
      waTpl:localStorage.getItem('pt_watpl')||''
    }
  };
};
function getState(){return window.getState();}
function applyState(s){
  if(!s)return;
  pkgs=s.pkgs||[];clients=s.clients||[];sessions=s.sessions||[];
  groups=s.groups||[];slots=s.slots||[];
  if(s.settings){
    isDark=!!s.settings.isDark;
    if(s.settings.lang)lang=s.settings.lang;
    if(s.settings.trainerName)localStorage.setItem('pt_tname',s.settings.trainerName);
    if(s.settings.waTpl!==undefined&&s.settings.waTpl!=='')localStorage.setItem('pt_watpl',s.settings.waTpl);
  }
}
function sv(){
  try{
    var wa=document.getElementById('watpl');
    if(wa)localStorage.setItem('pt_watpl',wa.value);
    var st=getState();
    localStorage.setItem('pt_state',JSON.stringify(st));
    if(typeof window.dbPush==='function')window.dbPush(st);
    // legacy keys (backward compat)
    localStorage.setItem('pt_pkgs',JSON.stringify(pkgs));
    localStorage.setItem('pt_clients',JSON.stringify(clients));
    localStorage.setItem('pt_sessions',JSON.stringify(sessions));
    localStorage.setItem('pt_groups',JSON.stringify(groups));
    localStorage.setItem('pt_slots',JSON.stringify(slots));
    localStorage.setItem('pt_dark',isDark?'1':'0');
    localStorage.setItem('pt_lang',lang);
  }catch(e){}
}
function ld(){
  // 1) Pokušaj unified pt_state ključ
  try{
    var blob=localStorage.getItem('pt_state');
    if(blob){applyState(JSON.parse(blob));return;}
  }catch(e){}
  // 2) Fallback na stare ključeve
  try{
    var a=localStorage.getItem('pt_pkgs'),b=localStorage.getItem('pt_clients'),
        c=localStorage.getItem('pt_sessions'),g=localStorage.getItem('pt_groups'),
        sl=localStorage.getItem('pt_slots'),dk=localStorage.getItem('pt_dark'),
        ln=localStorage.getItem('pt_lang');
    if(a)pkgs=JSON.parse(a);
    if(b)clients=JSON.parse(b);
    if(c)sessions=JSON.parse(c);
    if(g)groups=JSON.parse(g);
    if(sl)slots=JSON.parse(sl);
    if(dk)isDark=dk==='1';
    if(ln)lang=ln;
  }catch(e){}
}
function getWaTpl(){return localStorage.getItem('pt_watpl')||DEFAULT_WA;}
ld();

