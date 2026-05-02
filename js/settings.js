// // --- SETTINGS PAGE ----------------------------------------
function pgSettings(){
  var langs=[{c:'sr',f:'🇷🇸',n:'Srpski'},{c:'en',f:'🇬🇧',n:'English'},{c:'ru',f:'🇷🇺',n:'Русский'}];
  var langBtns=langs.map(function(l){return '<button class="langbtn'+(lang===l.c?' on':'')+'" onclick="setLang(\''+l.c+'\')"><span style="font-size:18px">'+l.f+'</span>'+l.n+'</button>';}).join('');
  return '<div class="topbar"><div class="ptitle">'+t('settings')+'</div></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('langLabel')+'</div></div><div class="langbtns">'+langBtns+'</div></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('darkMode')+'</div><div class="setsub">'+t('darkSub')+'</div></div><div class="tog'+(isDark?' on':'')+'" onclick="togDark()"><div class="togk"></div></div></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('trainerName')+'</div><div class="setsub">'+t('trainerSub')+'</div></div><input value="'+(localStorage.getItem('pt_tname')||'StamenicFitt')+'" onchange="localStorage.setItem(\'pt_tname\',this.value);sv();toast(t(\'saved\'))" style="padding:6px 10px;font-size:14px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;width:140px"/></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('waTplLabel')+'</div><div class="setsub">'+t('waTplSub')+'</div></div><button class="btn btnsm" onclick="openWAM()">'+t('edit')+'</button></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('notifLabel')+'</div><div class="setsub">'+t('notifSub')+'</div></div><button class="btn btnsm" onclick="reqNotif()">'+t('enable')+'</button></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('clearData')+'</div><div class="setsub">'+t('clearSub')+'</div></div><button class="btn btnsm btnr" onclick="clearAll()">'+t('del')+'</button></div>'+
    (window.currentUser?'<div class="setrow"><div><div class="setlbl">'+t('signedInAs')+'</div><div class="setsub">'+(window.currentUser.email||'')+'</div></div><button class="btn btnsm btnr" onclick="signOut()">'+t('signOutBtn')+'</button></div>':'')+
    '<div class="setrow"><div><div class="setlbl">'+t('version')+'</div><div class="setsub">'+t('verSub')+'</div></div></div>';
}
function setLang(l){lang=l;sv();renderNav();renderPage();}
function togDark(){isDark=!isDark;sv();theme();renderPage();}
function reqNotif(){if(!('Notification' in window)){toast(t('notifNo'));return;}Notification.requestPermission().then(function(p){toast(p==='granted'?t('notifOn'):t('notifOff'));});}
function clearAll(){if(!confirm(t('confirmAll')))return;clients=[];sessions=[];pkgs=[];groups=[];slots=[];sv();renderPage();toast(t('allCleared'));}

