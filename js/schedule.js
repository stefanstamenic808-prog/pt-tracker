// // --- RASPORED PAGE ----------------------------------------
function getWeekStart(off){
  var d=new Date(),dy=d.getDay();
  var diff=d.getDate()-(dy===0?6:dy-1);
  var mon=new Date(d);mon.setDate(diff+off*7);mon.setHours(0,0,0,0);
  return mon;
}
function ds(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}

function pgRaspored(){
  var ws=getWeekStart(weekOff);
  var wdays=[];
  for(var i=0;i<7;i++){var d=new Date(ws);d.setDate(d.getDate()+i);wdays.push(d);}
  var td=today();
  var days=getDays();
  var wlabel=fmtD(ds(wdays[0]))+' – '+fmtD(ds(wdays[6]));

  var head='<div class="shead"><div class="shc" style="font-size:9px">⏰</div>'+
    wdays.map(function(d,i){var dstr=ds(d);var isTd=dstr===td;return '<div class="shc'+(isTd?' td':'')+'">'+days[i]+'<div style="font-size:13px;font-weight:'+(isTd?'800':'600')+'">'+d.getDate()+'</div></div>';}).join('')+'</div>';

  // Slot pripada redu po satu (npr. 6:30 → red 06:00). Sortiramo po
  // stvarnom vremenu da rani slotovi budu na vrhu ćelije.
  var slotHourOf=function(t){return (t||'00:00').split(':')[0]+':00';};
  var rows=HOURS.map(function(hr){
    var cells=wdays.map(function(d,di){
      var dstr=ds(d),isTd=dstr===td;
      var dslots=slots
        .filter(function(s){return s.date===dstr&&slotHourOf(s.time)===hr;})
        .sort(function(a,b){return (a.time||'').localeCompare(b.time||'');});
      var dots=dslots.map(function(s){var c=cob(s.cid);var col=c?cCol(c.id):'#888';var nm=c?c.name.split(' ')[0]:'?';
        return '<div class="slot" data-eslot="'+s.id+'" style="background:'+col+'22;color:'+col+';border-left:3px solid '+col+'"><div style="font-weight:700">'+s.time+' '+nm+'</div>'+(s.note?'<div style="font-size:9px;opacity:.8">'+s.note+'</div>':'')+'<div style="font-size:9px;opacity:.7">'+s.dur+'m</div></div>';
      }).join('');
      return '<div class="scell'+(isTd?' td':'')+'" data-nslot="1" data-date="'+dstr+'" data-hour="'+hr+'">'+dots+'</div>';
    }).join('');
    return '<div class="srow"><div class="stime">'+hr+'</div>'+cells+'</div>';
  }).join('');

  var usedCids=[];
  slots.forEach(function(s){var sd=new Date(s.date);if(sd>=ws&&sd<=wdays[6]&&usedCids.indexOf(s.cid)===-1)usedCids.push(s.cid);});
  var leg=usedCids.length?'<div class="sleg">'+usedCids.map(function(cid){var c=cob(cid);if(!c)return'';var col=cCol(cid);return '<div class="sleg-item"><div class="sleg-dot" style="background:'+col+'"></div>'+c.name+'</div>';}).join('')+'</div>':'';

  return '<div class="wnav">'+
    '<button class="btn btnsm" onclick="chgWk(-1)">'+t('prevWeek')+'</button>'+
    '<div style="text-align:center"><div class="wlbl">'+t('schedule')+'</div><div style="font-size:11px;color:var(--text3)">'+wlabel+'</div></div>'+
    '<button class="btn btnsm" onclick="chgWk(1)">'+t('nextWeek')+'</button>'+
  '</div>'+
  (weekOff!==0?'<div style="text-align:center;margin-bottom:10px"><button class="btn btnsm" onclick="chgWk(0,1)">'+t('thisWeek')+'</button></div>':'')+
  '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">Klikni na polje da dodaš termin. Klikni na termin da ga izmeniš.</div>'+
  '<div class="swrap"><div class="stable">'+head+rows+'</div></div>'+leg;
}
function chgWk(d,reset){weekOff=reset?0:weekOff+d;renderPage();}

function buildCPick(selCid){
  var ac=clients.filter(function(c){return !c.arch;});
  return ac.map(function(c){var col=cCol(c.id);var p=c.pid?pgb(c.pid):null;
    return '<div class="cprow'+(c.id===selCid?' on':'')+'" data-cpick="'+c.id+'">'+
      '<div class="cpav" style="background:'+col+'22;color:'+col+'">'+ini(c.name)+'</div>'+
      '<div><div style="font-size:13px;font-weight:500;color:var(--text)">'+c.name+'</div>'+
      '<div style="font-size:11px;color:var(--text3)">'+(p?p.s+' '+t('sessions')+' · €'+p.p:'Bez paketa')+'</div></div>'+
    '</div>';
  }).join('');
}

function openSlotNew(date,hour){
  eSlotId=null;sltCid=null;
  document.getElementById('mSlott').textContent=t('addSlot');
  document.getElementById('mSlott').setAttribute('data-date',date);
  document.getElementById('sltdelbtn').style.display='none';
  document.getElementById('sltnote').value='';
  document.getElementById('slttime').value=hour||'09:00';
  document.getElementById('sltdur').value='60';
  document.getElementById('sltcp').innerHTML=buildCPick(null);
  om('mSlot');
}
function openSlotEdit(id){
  var s=slots.find(function(x){return x.id===id;});if(!s)return;
  eSlotId=id;sltCid=s.cid;
  document.getElementById('mSlott').textContent=t('editSlot');
  document.getElementById('mSlott').setAttribute('data-date',s.date);
  document.getElementById('sltdelbtn').style.display='block';
  document.getElementById('sltnote').value=s.note||'';
  document.getElementById('slttime').value=s.time||'09:00';
  document.getElementById('sltdur').value=s.dur;
  document.getElementById('sltcp').innerHTML=buildCPick(s.cid);
  om('mSlot');
}
function saveSlot(){
  if(!sltCid){toast(t('noSlotClient'));return;}
  var date=document.getElementById('mSlott').getAttribute('data-date')||today();
  var time=document.getElementById('slttime').value;
  var dur=Number(document.getElementById('sltdur').value);
  var note=document.getElementById('sltnote').value.trim();
  if(eSlotId){var i=slots.findIndex(function(s){return s.id===eSlotId;});slots[i]=Object.assign({},slots[i],{cid:sltCid,time:time,dur:dur,note:note});}
  else slots.push({id:Date.now(),cid:sltCid,date:date,time:time,dur:dur,note:note});
  sv();cm('mSlot');renderPage();toast(t('slotSaved'));
}
function delSlot(){
  if(!eSlotId)return;
  if(!confirm(t('confirmSlot')))return;
  slots=slots.filter(function(s){return s.id!==eSlotId;});
  sv();cm('mSlot');renderPage();toast(t('slotDeleted'));
}

// // --- KALENDAR LOG -----------------------------------------
function openLogM(){
  var ac=clients.filter(function(c){return !c.arch;});
  document.getElementById('lc').innerHTML=ac.map(function(c){return '<option value="'+c.id+'">'+c.name+'</option>';}).join('');
  document.getElementById('ld').value=today();
  document.getElementById('ldur').value=60;
  document.getElementById('lnote').value='';
  om('mLog');
}
function saveLog(){
  var cid=Number(document.getElementById('lc').value);
  var date=document.getElementById('ld').value;
  if(!date){toast(t('enterDate'));return;}
  sessions.push({id:Date.now(),cid:cid,date:date,time:now2().time,dur:Number(document.getElementById('ldur').value)||60,type:document.getElementById('lty').value,note:document.getElementById('lnote').value.trim()});
  var c=cob(cid);if(c)c.pused=(c.pused||0)+1;
  sv();cm('mLog');renderPage();toast(t('trainingLogged'));
}

