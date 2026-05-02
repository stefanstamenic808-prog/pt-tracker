// // --- GRUPE PAGE -------------------------------------------
function pgGrupe(){
  var cards=groups.length?groups.map(function(g){
    var mems=clients.filter(function(c){return !c.arch&&g.members&&g.members.indexOf(c.id)>-1;});
    var mlist=mems.length?mems.map(function(c){return '<div class="mrow" style="display:flex;align-items:center;justify-content:space-between"><span class="mname">'+ini(c.name)+' '+c.name+'</span><button class="btn btnsm btnr" style="padding:2px 7px;font-size:11px;min-width:0" data-rmem="'+g.id+'_'+c.id+'">×</button></div>';}).join(''):'<div style="font-size:12px;color:var(--text3);margin-top:4px">Nema klijenata.</div>';
    return '<div class="grpcard" style="border-left:4px solid '+g.color+'">'+
      '<div class="grphdr">'+
        '<div class="grpname"><span style="width:12px;height:12px;border-radius:50%;background:'+g.color+';display:inline-block;flex-shrink:0"></span>'+g.name+'</div>'+
        '<div style="display:flex;align-items:center;gap:6px">'+
          '<span class="tchip" style="background:'+g.color+'22;color:'+g.color+'">'+mems.length+' klijenata</span>'+
          '<button class="btn btnsm" data-editg="'+g.id+'">'+t('edit')+'</button>'+
          '<button class="btn btnsm btnr" data-delg="'+g.id+'" style="padding:5px 8px">×</button>'+
        '</div>'+
      '</div>'+
      mlist+
    '</div>';
  }).join(''):'<div class="empty">'+t('noGroups')+'</div>';
  return '<div class="topbar"><div class="ptitle">'+t('groups')+'</div><button class="btn btnp" onclick="openGrpM()">+ Nova grupa</button></div>'+
    '<div style="font-size:13px;color:var(--text3);margin-bottom:14px">Grupiši klijente i filtriraj ih na glavnoj strani.</div>'+
    cards;
}
function openGrpM(id){
  eGid=id||null;gColor='#cc2200';
  var existing=[];
  document.getElementById('mGrpt').textContent=id?t('edit')+' grupu':'Nova grupa';
  if(id){var g=groups.find(function(x){return x.id===id;});if(!g)return;document.getElementById('gnam').value=g.name;gColor=g.color;existing=g.members||[];}
  else{document.getElementById('gnam').value='';}
  document.getElementById('gcolrow').innerHTML=GCOLS.map(function(col){
    return '<div class="coldot'+(col===gColor?' on':'')+'" data-col="'+col+'" style="background:'+col+'"></div>';
  }).join('');
  var ac=clients.filter(function(c){return !c.arch;});
  document.getElementById('gmembers').innerHTML='<div style="display:flex;flex-direction:column;gap:5px;margin-top:5px">'+ac.map(function(c){
    var on=existing.indexOf(c.id)>-1;
    return '<div class="mrow">'+
      '<span class="mname">'+ini(c.name)+' '+c.name+'</span>'+
      '<div class="mchk'+(on?' on':'')+'" data-mchk="'+c.id+'">'+
        (on?'<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>':'')+
      '</div>'+
    '</div>';
  }).join('')+'</div>';
  om('mGrp');
}
function saveGrp(){
  var name=document.getElementById('gnam').value.trim();
  if(!name){toast(t('enterName'));return;}
  var members=[];
  clients.filter(function(c){return !c.arch;}).forEach(function(c){
    var el=document.querySelector('[data-mchk="'+c.id+'"]');
    if(el&&el.classList.contains('on'))members.push(c.id);
  });
  if(eGid){var i=groups.findIndex(function(g){return g.id===eGid;});groups[i]=Object.assign({},groups[i],{name:name,color:gColor,members:members});}
  else groups.push({id:Date.now(),name:name,color:gColor,members:members});
  sv();cm('mGrp');renderPage();toast(t('groupSaved'));
}
function delGrp(id){
  groups=groups.filter(function(g){return g.id!==id;});
  sv();renderPage();toast(t('groupDel'));
}
function removeFromGroup(gid,cid){
  var g=groups.find(function(x){return x.id===gid;});
  if(!g||!g.members)return;
  var idx=g.members.indexOf(cid);
  if(idx>-1){
    g.members.splice(idx,1);
    sv();renderPage();toast(t('clientRemoved'));
  }
}

