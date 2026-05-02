// // --- CLIENT TYPE / RENEW STATUS ---------------------------
function selTy(ty){
  pkgTy=ty;
  ['p','s','g'].forEach(function(x){
    var el=document.getElementById('ty'+x);
    if(el)el.className='tyopt'+(x===ty?' s'+ty:'');
  });
}
function selRS(s){
  rStat=s;
  var a=document.getElementById('rsa'),d=document.getElementById('rsd');
  if(a)a.className='rsopt'+(s==='active'?' on':'');
  if(d)d.className='rsopt'+(s==='due'?' on':'');
}

// // --- CLIENTS PAGE -----------------------------------------
function pgClients(){
  autoUpdateExpiredStatuses();
  var ac=clients.filter(function(c){return !c.arch;});
  var expired=ac.filter(function(c){var e=pkgExp(c);return e&&c.st!=='paused'&&du(e)<0;});
  var expiring=ac.filter(function(c){var e=pkgExp(c);return e&&c.st!=='paused'&&du(e)>=0&&du(e)<=7;});
  var completed=ac.filter(function(c){var p=c.pid?pgb(c.pid):null;return p&&(c.pused||0)>=p.s&&c.st!=='paused';});
  var td=sessions.filter(function(s){return s.date===today();}).length;
  var arc=clients.filter(function(c){return c.arch;}).length;

  var notifExpired=expired.length ? buildNotif(expired,'expired') : '';
  var notifExp=expiring.length ? buildNotif(expiring,false) : '';
  var notifDone=completed.length ? buildNotif(completed,true) : '';

  var filterChips='';
  if(groups.length){
    filterChips='<div class="frow" id="grpfilter"></div>';
  }

  var displayList=filterGrp ? ac.filter(function(c){
    var g=groups.find(function(gr){return String(gr.id)===String(filterGrp);});
    return g&&g.members&&g.members.indexOf(c.id)>-1;
  }) : ac;

  return notifExpired+notifExp+notifDone+
    '<div class="topbar"><div class="ptitle">'+t('clients')+'</div><button class="btn btnp" onclick="openCM()">+ Novi</button></div>'+
    '<div class="sgrid" style="grid-template-columns:1fr 1fr">'+
      '<div class="sc"><div class="sl">'+t('active')+'</div><div class="sv">'+ac.length+'</div></div>'+
      '<div class="sc"><div class="sl">'+t('today')+'</div><div class="sv">'+td+'</div></div>'+
    '</div>'+
    filterChips+
    '<div class="sw"><input placeholder="'+t('search')+'" oninput="filterClients(this.value)"/></div>'+
    '<div class="clist" id="clist">'+renderCards(displayList)+'</div>'+
    (arc?'<div style="text-align:center;margin-top:14px"><button class="btn btnsm" onclick="setTab(\'arhiva\')">📦 '+t('archive')+' ('+arc+')</button></div>':'');
}

function buildNotif(list,mode){
  // mode: 'expired' (red), true (green/done), false (default amber)
  var col=mode==='expired'?'red':mode===true?'green':'';
  var title=mode==='expired'?t('expiredTitle'):mode===true?t('completedPkgs'):t('expiringSoon');
  var items=list.map(function(c){
    var d=pkgExp(c)?du(pkgExp(c)):0;
    var when;
    if(mode==='expired'){when=expFmt(Math.abs(d));}
    else if(mode===true){when=t('completedJust');}
    else{when=d===0?t('today2'):d===1?t('tomorrow'):t('inDays')+d+t('days');}
    return '<div class="nitem '+col+'">'+c.name+' — '+when+'</div>';
  }).join('');
  return '<div class="notif on '+col+'"><div class="ntitle '+col+'">'+title+'</div>'+items+'</div>';
}

function renderCards(list){
  if(!list.length)return '<div class="empty">'+t('noClients')+'</div>';
  return list.map(function(c){
    var p=c.pid?pgb(c.pid):null;
    var e=pkgExp(c),dl=e?du(e):null;
    var used=c.pused||0,total=p?p.s:0;
    var pct=total?Math.min(100,Math.round(used/total*100)):0;
    var isDone=total>0&&used>=total;
    var chk=sessions.some(function(s){return s.cid===c.id&&s.date===today();});
    var ts=sessions.find(function(s){return s.cid===c.id&&s.date===today();});
    var isExpired=!isDone&&dl!==null&&dl<0&&c.st!=='paused';
    var warn=(!isDone&&dl!==null&&dl>=0&&dl<=7&&c.st!=='paused')?(dl===0?t('expToday'):dl===1?t('expTomorrow'):t('expDays')+dl+t('days')):'';
    var expiredText=isExpired?'❌ '+expFmt(Math.abs(dl)):'';
    var renewed=c.rat&&du(c.rat)>=-3&&du(c.rat)<=0;
    var cgs=groups.filter(function(g){return g.members&&g.members.indexOf(c.id)>-1;});

    var cls='cc'+(chk?' trained':'')+(isDone?' completed':isExpired?' expired':warn?' expiring':'');

    // Boja progress bara: zelena → narandžasta → crvena prema iskoristećenosti / blizini isteka
    var barColor='var(--green)';
    if(p&&!isDone){
      var dayDanger=0;
      if(dl!==null&&dl!==undefined){
        if(dl<=3)dayDanger=95;
        else if(dl<=7)dayDanger=80;
        else if(dl<=14)dayDanger=55;
        else dayDanger=25;
      }
      var danger=Math.max(pct,dayDanger);
      barColor=danger>=85?'var(--red)':danger>=60?'#ff9500':'var(--green)';
    }

    return '<div class="'+cls+'">'+
      '<div class="ctop">'+
        '<div class="chk'+(chk?' on':'')+'" data-train="'+c.id+'">'+
          '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><polyline points="2,6.5 5,9.5 11,3" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
        '</div>'+
        '<div class="av">'+ini(c.name)+'</div>'+
        '<div class="ci">'+
          '<div class="cn" data-prof="'+c.id+'">'+c.name+'</div>'+
          '<div class="cmeta">'+
            (p?'<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span>':'')+
            (p?'<span>'+p.s+' '+t('sessions')+' · €'+p.p+'</span>':'<span style="color:var(--text3)">'+t('noPackage')+'</span>')+
            (e?'<span>· '+fmtD(e)+'</span>':'')+
            cgs.map(function(g){return '<span class="grpchip" style="background:'+g.color+'22;color:'+g.color+';border-color:'+g.color+'44">'+g.name+'</span>';}).join('')+
          '</div>'+
          (ts?'<div class="cstamp">'+t('trainedAt')+ts.time+'</div>':'')+
          (isDone?'<div class="cdone">'+t('doneMsg')+'</div>':isExpired?'<div class="cexp">'+expiredText+'</div>':warn?'<div class="cwarn">'+warn+'</div>':
            (p&&total>0?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+used+t('sessUsed')+total+t('sessLabel')+'</div>':''))+
          (renewed?'<div class="crenew">'+t('renewed')+fmtD(c.rat)+(c.rn?' · '+c.rn:'')+'</div>':'')+
        '</div>'+
        '<div class="cr">'+
          '<span class="bdg '+bc(c.st)+'">'+bl(c.st)+'</span>'+
          (p?'<span class="ptag'+(isDone?' style="background:var(--gbg);color:var(--green)"':'')+'">'+used+'/'+total+'</span>':'')+
        '</div>'+
      '</div>'+
      (p?'<div class="prow"><div class="pbar"><div class="pfill" style="width:'+pct+'%;background:'+barColor+'"></div></div><span class="plbl" style="color:'+barColor+';font-weight:600">'+pct+'%</span></div>':'')+
    '</div>';
  }).join('');
}

function filterClients(q){
  var el=document.getElementById('clist');
  if(!el)return;
  var ac=clients.filter(function(c){return !c.arch;});
  el.innerHTML=renderCards(ac.filter(function(c){return c.name.toLowerCase().indexOf(q.toLowerCase())>-1;}));
}

// Event delegation for client list
document.getElementById('content').addEventListener('click',function(e){
  var train=e.target.closest('[data-train]');
  if(train){togTrain(Number(train.getAttribute('data-train')));return;}
  var prof=e.target.closest('[data-prof]');
  if(prof){openProf(Number(prof.getAttribute('data-prof')));return;}
  var renew=e.target.closest('[data-renew]');
  if(renew){openRenew(Number(renew.getAttribute('data-renew')));return;}
  var edit=e.target.closest('[data-edit]');
  if(edit){openCM(Number(edit.getAttribute('data-edit')));return;}
  var arch=e.target.closest('[data-arch]');
  if(arch){archC(Number(arch.getAttribute('data-arch')));return;}
  var actv=e.target.closest('[data-actv]');
  if(actv){actC(Number(actv.getAttribute('data-actv')));return;}
  var delc=e.target.closest('[data-delc]');
  if(delc){delC(Number(delc.getAttribute('data-delc')));return;}
  var delp=e.target.closest('[data-delp]');
  if(delp){delPkg(Number(delp.getAttribute('data-delp')));return;}
  var editp=e.target.closest('[data-editp]');
  if(editp){openPkgM(Number(editp.getAttribute('data-editp')));return;}
  var editg=e.target.closest('[data-editg]');
  if(editg){openGrpM(Number(editg.getAttribute('data-editg')));return;}
  var delg=e.target.closest('[data-delg]');
  if(delg){delGrp(Number(delg.getAttribute('data-delg')));return;}
  var rmem=e.target.closest('[data-rmem]');
  if(rmem){var parts=rmem.getAttribute('data-rmem').split('_');removeFromGroup(Number(parts[0]),Number(parts[1]));return;}
  var gfbtn=e.target.closest('[data-gf]');
  if(gfbtn){setGF(gfbtn.getAttribute('data-gf'));return;}
  var editslot=e.target.closest('[data-eslot]');
  if(editslot){openSlotEdit(Number(editslot.getAttribute('data-eslot')));return;}
  var newslot=e.target.closest('[data-nslot]');
  if(newslot){openSlotNew(newslot.getAttribute('data-date'),newslot.getAttribute('data-hour'));return;}
  var fp=e.target.closest('[data-fper]');
  if(fp){finPer=fp.getAttribute('data-fper');renderPage();return;}
});

// Group filter chips - rendered after page load
function buildGrpFilter(){
  var el=document.getElementById('grpfilter');
  if(!el)return;
  var h='<button class="fbtn'+(filterGrp===''?' on':'')+'" data-gf="">'+t('allClients')+'</button>';
  groups.forEach(function(g){
    h+='<button class="fbtn'+(String(filterGrp)===String(g.id)?' on':'')+'" data-gf="'+g.id+'" style="'+(String(filterGrp)===String(g.id)?'border-color:'+g.color+';color:'+g.color+';background:'+g.color+'22':'')+'">'+g.name+'</button>';
  });
  el.innerHTML=h;
}
function setGF(id){filterGrp=id;renderPage();setTimeout(buildGrpFilter,10);}

// // --- TRAIN TOGGLE -----------------------------------------
function togTrain(cid){
  var d=now2(),c=cob(cid),ex=sessions.find(function(s){return s.cid===cid&&s.date===d.date;});
  if(ex){
    sessions=sessions.filter(function(s){return !(s.cid===cid&&s.date===d.date);});
    if(c&&c.pused>0)c.pused--;
    // Remove matching slot from schedule
    slots=slots.filter(function(s){return !(s.cid===cid&&s.date===d.date&&s.auto);});
    sv();renderPage();toast(t('trainRemoved'));
  } else {
    sessions.push({id:Date.now(),cid:cid,date:d.date,time:d.time,dur:60,type:'Kombinirano',note:'Brzi unos'});
    if(c)c.pused=(c.pused||0)+1;
    // Also add to schedule as auto-slot
    var roundedTime=pad(Math.min(21,Math.max(6,parseInt(d.time.split(':')[0]))))+':'+( parseInt(d.time.split(':')[1])>=30?'30':'00');
    slots.push({id:Date.now()+1,cid:cid,date:d.date,time:roundedTime,dur:60,note:'',auto:true});
    var p=c&&c.pid?pgb(c.pid):null;
    var justDone=p&&(c.pused||0)>=p.s;
    sv();renderPage();
    toast(justDone?'🎉 '+c.name.split(' ')[0]+' — '+t('completedJust'):t('trainedAt')+d.time);
  }
}

// // --- ARCHIVE ----------------------------------------------
function archC(id){var i=clients.findIndex(function(c){return c.id===id;});if(i>-1){clients[i].arch=true;sv();renderPage();toast(t('clientArch'));}}
function actC(id){var i=clients.findIndex(function(c){return c.id===id;});if(i>-1){clients[i].arch=false;sv();renderPage();toast(t('clientAct'));}}
function delC(id){
  if(!confirm(t('confirmDel')))return;
  clients=clients.filter(function(c){return c.id!==id;});
  sessions=sessions.filter(function(s){return s.cid!==id;});
  sv();renderPage();toast(t('clientDel'));
}

// // --- CLIENT MODAL -----------------------------------------
function buildPkgSel(gid,curId,prefix){
  var el=document.getElementById(gid);
  if(!el)return;
  if(!pkgs.length){el.innerHTML='<div style="font-size:12px;color:var(--text3)">Dodaj pakete u Paketi tabu.</div>';return;}
  el.innerHTML=pkgs.map(function(p){
    return '<div class="psopt'+(p.id===curId?' on':'')+'" data-psel="'+p.id+'" data-pgrid="'+gid+'" data-pprefix="'+prefix+'">'+
      '<div class="pn">'+p.s+'</div><div class="pl">'+t('sessions')+'</div><div class="pp">€'+p.p+'</div>'+
      '<div style="margin-top:3px"><span class="tchip '+TC[p.t]+'" style="font-size:9px">'+TL[p.t]+'</span></div>'+
    '</div>';
  }).join('');
}
document.addEventListener('click',function(e){
  var ps=e.target.closest('[data-psel]');
  if(ps){
    var id=Number(ps.getAttribute('data-psel'));
    var grid=ps.getAttribute('data-pgrid');
    var prefix=ps.getAttribute('data-pprefix');
    if(prefix==='fp'){sPid=(sPid===id?null:id);buildPkgSel(grid,sPid,'fp');}
    else if(prefix==='rp'){rPid=id;buildPkgSel(grid,rPid,'rp');}
  }
  var cprow=e.target.closest('[data-cpick]');
  if(cprow){
    sltCid=Number(cprow.getAttribute('data-cpick'));
    document.querySelectorAll('.cprow').forEach(function(el){el.classList.remove('on');});
    cprow.classList.add('on');
  }
  var mchk=e.target.closest('[data-mchk]');
  if(mchk){
    mchk.classList.toggle('on');
    mchk.innerHTML=mchk.classList.contains('on')?'<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>':'';
  }
  var tyopt=e.target.closest('[data-tyopt]');
  if(tyopt){selTy(tyopt.getAttribute('data-tyopt'));}
  var coldot=e.target.closest('[data-col]');
  if(coldot){
    gColor=coldot.getAttribute('data-col');
    document.querySelectorAll('.coldot').forEach(function(d){d.classList.remove('on');});
    coldot.classList.add('on');
  }
  var rsopt=e.target.closest('[data-rs]');
  if(rsopt){selRS(rsopt.getAttribute('data-rs'));}
});

function openCM(id){
  eCid=id||null;sPid=null;
  document.getElementById('mCt').textContent=id?t('edit')+' klijenta':'Novi klijent';
  if(id){
    var c=clients.find(function(x){return x.id===id;});
    if(!c)return;
    document.getElementById('fn').value=c.name;
    document.getElementById('fstart').value=c.pstart||'';
    document.getElementById('fst').value=c.st;
    sPid=c.pid||null;
  } else {
    document.getElementById('fn').value='';
    document.getElementById('fstart').value=today();
    document.getElementById('fst').value='active';
  }
  buildPkgSel('fpg',sPid,'fp');
  om('mC');
}
function saveC(){
  var name=document.getElementById('fn').value.trim();
  if(!name){toast(t('enterName'));return;}
  var data={name:name,pid:sPid,pstart:document.getElementById('fstart').value,st:document.getElementById('fst').value};
  if(eCid){var i=clients.findIndex(function(c){return c.id===eCid;});clients[i]=Object.assign({},clients[i],data);}
  else clients.push(Object.assign({id:Date.now(),pused:0,rat:null,rn:'',arch:false,note:''},data));
  sv();cm('mC');renderPage();toast(eCid?t('clientEdited'):t('clientAdded'));
}

// // --- RENEW ------------------------------------------------
function openRenew(cid){
  eRcid=cid;rStat='active';
  var c=cob(cid),p=c.pid?pgb(c.pid):null;
  document.getElementById('mRent').textContent='Produži — '+c.name.split(' ')[0];
  document.getElementById('mReni').innerHTML=p?
    '<div style="font-size:11px;color:var(--text3);margin-bottom:5px">Trenutni paket</div>'+
    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+
    '<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span>'+
    '<strong style="font-size:15px">'+p.s+' '+t('sessions')+' · €'+p.p+'</strong></div>'+
    '<div style="margin-top:5px;font-size:12px;color:var(--text3)">Ističe: '+fmtD(pkgExp(c))+' · Iskorišćeno: '+(c.pused||0)+'/'+p.s+'</div>':
    '<div style="font-size:13px;color:var(--text3)">Nema aktivnog paketa.</div>';
  rPid=c.pid||null;
  buildPkgSel('rpg',rPid,'rp');
  var e=pkgExp(c),nd=new Date(e||today());nd.setDate(nd.getDate()+1);
  document.getElementById('rstart').value=nd.toISOString().split('T')[0];
  document.getElementById('rnote').value='';
  selRS('active');
  om('mRen');
}
function doRenew(){
  if(!rPid){toast(t('enterPkg'));return;}
  var sd=document.getElementById('rstart').value;
  if(!sd){toast(t('enterDate'));return;}
  var note=document.getElementById('rnote').value.trim();
  var i=clients.findIndex(function(c){return c.id===eRcid;});
  clients[i]=Object.assign({},clients[i],{pid:rPid,pstart:sd,pused:0,st:rStat,rat:today(),rn:note});
  sv();cm('mRen');renderPage();toast(t('renewedOk'));
}

// // --- CLIENT PROFILE ---------------------------------------
function openProf(cid){
  fmsScores={};
  var c=cob(cid);
  if(!c)return;
  var p=c.pid?pgb(c.pid):null;
  var e=pkgExp(c),dl=e?du(e):null;
  var used=c.pused||0,total=p?p.s:0;
  var pct=total?Math.min(100,Math.round(used/total*100)):0;
  var isDone=total>0&&used>=total;
  var allSess=sessions.filter(function(s){return s.cid===cid;}).sort(function(a,b){return b.date.localeCompare(a.date);});
  var mth=new Date();
  var thisMo=allSess.filter(function(s){var a=s.date.split('-').map(Number);return a[0]===mth.getFullYear()&&a[1]===mth.getMonth()+1;});
  var last=allSess[0];
  var nxt=slots.filter(function(s){return s.cid===cid&&s.date>=today();}).sort(function(a,b){return a.date.localeCompare(b.date)||a.time.localeCompare(b.time);});
  var cgs=groups.filter(function(g){return g.members&&g.members.indexOf(cid)>-1;});

  var dots='';
  if(total>0){for(var i=0;i<total;i++)dots+='<div class="sdot'+(i>=used?' empty':'')+'" title="Termin '+(i+1)+'"></div>';}

  var recent=allSess.slice(0,5).map(function(s){
    return '<div class="profrow"><div class="proflbl">'+fmtD(s.date)+(s.time?' u '+s.time:'')+' · '+s.type+'</div><div class="profval">'+s.dur+'min</div></div>';
  }).join('');

  var html='<div class="profhdr">'+
    '<div class="profav">'+ini(c.name)+'</div>'+
    '<div>'+
      '<div class="profname">'+c.name+'</div>'+
      '<div class="profsub">'+
        (p?'<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span> ':'')+
        '<span class="bdg '+bc(c.st)+'">'+bl(c.st)+'</span>'+
      '</div>'+
      (cgs.length?'<div style="margin-top:5px">'+cgs.map(function(g){return '<span class="grpchip" style="background:'+g.color+'22;color:'+g.color+';border-color:'+g.color+'44">'+g.name+'</span>';}).join(' ')+'</div>':'')+
    '</div>'+
  '</div>'+

  // TAB BAR
  '<div class="ptabs">'+
    '<button class="ptab on" onclick="switchProfTab(\'info\','+cid+')"><span style="margin-right:4px">📋</span>'+t('profTabInfo')+'</button>'+
    '<button class="ptab" onclick="switchProfTab(\'tests\','+cid+')"><span style="margin-right:4px">🧪</span>'+t('profTabTests')+'</button>'+
  '</div>'+

  // INFO TAB
  '<div class="ptab-body on" id="ptab_info">'+

  '<div class="profsec">'+
    '<div class="profsect">📦 '+t('profPkg')+'</div>'+
    (p?
      '<div class="profrow"><div class="proflbl">Paket</div><div class="profval">'+(p.n||p.s+' '+t('sessions'))+'</div></div>'+
      '<div class="profrow"><div class="proflbl">Cena</div><div class="profval red">€'+p.p+'</div></div>'+
      '<div class="profrow"><div class="proflbl">Termini</div><div class="profval '+(isDone?'green':'')+'">'+used+' / '+total+(isDone?' 🎉':'')+'</div></div>'+
      '<div class="profrow"><div class="proflbl">Ističe</div><div class="profval '+(dl!==null&&dl<=7&&!isDone?'amber':'')+'">'+fmtD(e)+(dl!==null?' ('+( dl===0?t('today2'):dl===1?t('tomorrow'):t('inDays')+dl+t('days') )+')':'' )+'</div></div>'+
      (total>0?'<div style="margin-top:8px"><div style="font-size:11px;color:var(--text3);margin-bottom:5px">'+t('usedSessions')+'</div><div class="sdots">'+dots+'</div></div>':'')+
      '<div style="margin-top:8px"><div class="pbar"><div class="pfill'+(isDone?' full':'')+'" style="width:'+pct+'%"></div></div><div style="font-size:11px;color:var(--text3);margin-top:4px">'+pct+'% '+t('usedSessions').toLowerCase()+'</div></div>'
    :'<div style="font-size:13px;color:var(--text3)">Nema aktivnog paketa.</div>')+
  '</div>'+

  '<div class="profsec">'+
    '<div class="profsect">📊 '+t('profStats')+'</div>'+
    '<div class="profrow"><div class="proflbl">'+t('totalSessions')+'</div><div class="profval">'+allSess.length+'</div></div>'+
    '<div class="profrow"><div class="proflbl">'+t('thisMonth')+'</div><div class="profval">'+thisMo.length+'</div></div>'+
    '<div class="profrow"><div class="proflbl">'+t('lastSession')+'</div><div class="profval">'+(last?fmtD(last.date):'—')+'</div></div>'+
    '<div class="profrow"><div class="proflbl">'+t('nextSlot')+'</div><div class="profval">'+(nxt[0]?fmtD(nxt[0].date)+' '+nxt[0].time:t('notScheduled'))+'</div></div>'+
    (c.pstart?'<div class="profrow"><div class="proflbl">'+t('clientSince')+'</div><div class="profval">'+fmtD(c.pstart)+'</div></div>':'')+
  '</div>'+

  (recent?'<div class="profsec"><div class="profsect">🏋️ '+t('last5')+'</div>'+recent+'</div>':'')+

  '<div class="profsec">'+
    '<div class="profsect">📝 '+t('notes')+'</div>'+
    '<textarea class="notarea" id="profnote" placeholder="'+t('notesPh')+'">'+( c.note||'')+'</textarea>'+
    '<div style="margin-top:8px"><button class="btn btng btnsm" onclick="saveNote('+cid+')">Sačuvaj beleške</button></div>'+
  '</div>'+

  '<div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap">'+
    '<button class="btn btnp btnsm" onclick="cm(\'mProf\');openRenew('+cid+')">'+t('renewPkg')+'</button>'+
    '<button class="btn btnsm" onclick="cm(\'mProf\');openCM('+cid+')">'+t('editData')+'</button>'+
    '<button class="btn btnsm btna" onclick="cm(\'mProf\');archC('+cid+')">'+t('archiveBtn')+'</button>'+
    '<button class="btn btnsm btnr" onclick="cm(\'mProf\');delC('+cid+')">'+t('delForever')+'</button>'+
  '</div>'+

  '</div>'+ // end info tab

  // TESTING TAB
  '<div class="ptab-body" id="ptab_tests">'+

    // Sub-tab selector
    '<div class="ttabs">'+
      '<button class="ttab on" onclick="switchTestTab(\'iso\','+cid+')"><span class="ttab-icon">💪</span>'+t('ttIso')+'</button>'+
      '<button class="ttab" onclick="switchTestTab(\'fms\','+cid+')"><span class="ttab-icon">🏋️</span>'+t('ttFMS')+'</button>'+
      '<button class="ttab" onclick="switchTestTab(\'ruf\','+cid+')"><span class="ttab-icon">❤️</span>'+t('ttRuf')+'</button>'+
      '<button class="ttab" onclick="switchTestTab(\'1rm\','+cid+')"><span class="ttab-icon">🏆</span>'+t('tt1RM')+'</button>'+
    '</div>'+

    // Sub-tab bodies
    '<div class="ttab-body on" id="tt_iso">'+buildTestSection(cid)+'</div>'+
    '<div class="ttab-body" id="tt_fms">'+buildFMSSection(cid)+'</div>'+
    '<div class="ttab-body" id="tt_ruf">'+buildRuffierSection(cid)+'</div>'+
    '<div class="ttab-body" id="tt_1rm">'+build1RMSection(cid)+'</div>'+

  '</div>'; // end testing tab

  document.getElementById('profbody').innerHTML=html;
  om('mProf');
}
function saveNote(cid){
  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  clients[i].note=document.getElementById('profnote').value;
  sv();toast(t('notesSaved'));
}

function switchProfTab(tabId,cid){
  // Toggle tab buttons
  var tabs=document.querySelectorAll('.ptab');
  tabs.forEach(function(tb){tb.classList.remove('on');});
  var bodies=document.querySelectorAll('.ptab-body');
  bodies.forEach(function(b){b.classList.remove('on');});

  if(tabId==='info'){
    if(tabs[0])tabs[0].classList.add('on');
    var el=document.getElementById('ptab_info');
    if(el)el.classList.add('on');
  } else {
    if(tabs[1])tabs[1].classList.add('on');
    var el=document.getElementById('ptab_tests');
    if(el)el.classList.add('on');
  }

  // Scroll to top of modal
  var modal=document.querySelector('#mProf .modal');
  if(modal)modal.scrollTop=0;
}

var activeTestTab='iso';
function switchTestTab(tabId,cid){
  activeTestTab=tabId;
  // Toggle sub-tab buttons
  var btns=document.querySelectorAll('.ttab');
  btns.forEach(function(b){b.classList.remove('on');});
  var bodies=document.querySelectorAll('.ttab-body');
  bodies.forEach(function(b){b.classList.remove('on');});

  var tabMap={iso:0,fms:1,ruf:2,'1rm':3};
  var idx=tabMap[tabId]||0;
  if(btns[idx])btns[idx].classList.add('on');

  var el=document.getElementById('tt_'+tabId);
  if(el)el.classList.add('on');
}

