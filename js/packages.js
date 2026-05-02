// // --- PAKETI PAGE ------------------------------------------
function pgPaketi(){
  var cards=pkgs.length?pkgs.map(function(p){
    var dur=p.d||30;
    return '<div class="pkc">'+
      '<div class="pkhdr">'+
        '<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span>'+
        '<div class="pkacts">'+
          '<button class="btn btnsm" data-editp="'+p.id+'">'+t('edit')+'</button>'+
          '<button class="btn btnsm btnr" data-delp="'+p.id+'" style="padding:5px 8px">×</button>'+
        '</div>'+
      '</div>'+
      '<div class="pkbody">'+
        '<div class="pkn">'+p.s+'</div>'+
        '<div class="pks">'+t('sessions')+' / '+dur+' dana</div>'+
        '<div class="pkp">€'+p.p+'</div>'+
      '</div>'+
      (p.n?'<div class="pknm">'+p.n+'</div>':'')+
    '</div>';
  }).join(''):'<div class="empty">'+t('noPackages')+'</div>';
  return '<div class="topbar"><div class="ptitle">'+t('packages')+'</div><button class="btn btnp" onclick="openPkgM()">+ Novi paket</button></div>'+
    '<div class="pkgrid">'+cards+'</div>'+
    '<div style="font-size:12px;color:var(--text3)">Broj treninga i trajanje (dana) podešavaš za svaki paket posebno.</div>';
}
function openPkgM(id){
  ePid=id||null;pkgTy='p';
  document.getElementById('mPkgt').textContent=id?t('edit')+' paket':'Novi paket';
  if(id){
    var p=pgb(id);
    document.getElementById('pses').value=p.s;
    document.getElementById('pprc').value=p.p;
    document.getElementById('pnam').value=p.n||'';
    document.getElementById('pdur').value=p.d||30;
    pkgTy=p.t||'p';
  } else {
    document.getElementById('pses').value='';
    document.getElementById('pprc').value='';
    document.getElementById('pnam').value='';
    document.getElementById('pdur').value=30;
  }
  setTimeout(function(){selTy(pkgTy);},20);
  om('mPkg');
}
function savePkg(){
  var s=Number(document.getElementById('pses').value),pr=Number(document.getElementById('pprc').value);
  if(!s||!pr){toast(t('enterSessions'));return;}
  var d=Number(document.getElementById('pdur').value)||30;
  if(d<1)d=30;
  var n=document.getElementById('pnam').value.trim();
  if(ePid){var i=pkgs.findIndex(function(p){return p.id===ePid;});pkgs[i]=Object.assign({},pkgs[i],{s:s,p:pr,n:n,t:pkgTy,d:d});}
  else pkgs.push({id:Date.now(),s:s,p:pr,n:n,t:pkgTy,d:d});
  sv();cm('mPkg');renderPage();toast(t('pkgSaved'));
}
function delPkg(id){
  if(clients.some(function(c){return c.pid===id;})){toast(t('pkgActive'));return;}
  if(!confirm(t('confirmPkg')))return;
  pkgs=pkgs.filter(function(p){return p.id!==id;});
  sv();renderPage();toast(t('pkgDel'));
}

