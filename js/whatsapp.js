// // --- WHATSAPP PAGE ----------------------------------------
function buildWAMsg(c){
  var p=c.pid?pgb(c.pid):null,e=pkgExp(c),d=e?du(e):0;
  return getWaTpl()
    .replace(/{ime}/g,c.name.split(' ')[0])
    .replace(/{dani}/g,String(d))
    .replace(/{datum}/g,fmtD(e)||'—')
    .replace(/{paket}/g,p?(p.n||p.s+' '+t('sessions')):'paket')
    .replace(/{cena}/g,p?String(p.p):'—');
}
function pgWA(){
  var ac=clients.filter(function(c){return !c.arch;});
  var expiring=ac.filter(function(c){var e=pkgExp(c);return e&&c.st!=='paused'&&du(e)>=0&&du(e)<=14;}).sort(function(a,b){return du(pkgExp(a))-du(pkgExp(b));});
  var shown=expiring.length?expiring:ac.filter(function(c){return c.pid;});
  var cards=shown.map(function(c){
    var e=pkgExp(c),d=e?du(e):null;
    var msg=buildWAMsg(c);
    var walink='https://wa.me/?text='+encodeURIComponent(msg);
    return '<div class="wacard" style="'+(d!==null&&d<=7?'border-color:var(--amber)':'')+'">'+
      '<div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:3px">'+c.name+
        (d!==null?'<span style="font-size:11px;font-weight:400;color:'+(d<=3?'var(--red)':'var(--amber)')+'"> — '+(d===0?t('today2'):d===1?t('tomorrow'):t('inDays')+d+t('days'))+'</span>':'')+
      '</div>'+
      (c.pid&&pgb(c.pid)?'<div style="font-size:12px;color:var(--text3);margin-bottom:6px">'+pgb(c.pid).s+' '+t('sessions')+' · €'+pgb(c.pid).p+(e?' · do '+fmtD(e):'')+'</div>':'')+
      '<div class="wamsg">'+msg+'</div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap">'+
        '<a href="'+walink+'" target="_blank" style="text-decoration:none"><button class="btn btnsm" style="background:#25D366;color:#fff;border-color:#25D366;font-weight:600">'+t('openWA')+'</button></a>'+
        '<button class="btn btnsm" onclick="copyWA(this,\''+encodeURIComponent(msg)+'\')">'+t('copy')+'</button>'+
      '</div>'+
    '</div>';
  }).join('');
  return '<div class="topbar"><div class="ptitle">'+t('waTitle')+'</div><button class="btn btnsm" onclick="openWAM()">'+t('waTplEdit')+'</button></div>'+
    '<div style="font-size:13px;color:var(--text3);margin-bottom:14px">'+(expiring.length?t('waExpiring'):t('waAll'))+'</div>'+
    (shown.length?cards:'<div class="empty">'+t('noWaClients')+'</div>');
}
function copyWA(btn,enc){
  var msg=decodeURIComponent(enc);
  if(navigator.clipboard){navigator.clipboard.writeText(msg).then(function(){btn.textContent=t('copied');setTimeout(function(){btn.textContent=t('copy');},1800);});}
  else toast(t('copied'));
}
function openWAM(){document.getElementById('watpl').value=getWaTpl();om('mWA');}
function saveWaTpl(){
  var v=document.getElementById('watpl').value.trim();
  if(!v){toast(t('emptyText'));return;}
  localStorage.setItem('pt_watpl',v);
  sv();
  cm('mWA');renderPage();toast(t('tplSaved'));
}

