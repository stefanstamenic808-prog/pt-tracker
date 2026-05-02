// // --- FINANSIJE PAGE ---------------------------------------
function getFinData(per){
  var n=new Date(),nM={'mesec':1,'3meseca':3,'6meseci':6,'godina':12}[per]||1;
  var months=[],labels=[];
  for(var i=nM-1;i>=0;i--){
    var d=new Date(n.getFullYear(),n.getMonth()-i,1);
    months.push({y:d.getFullYear(),m:d.getMonth()+1});
    labels.push(d.toLocaleString('sr-Latn',{month:'short'})+(nM>6?' '+String(d.getFullYear()).slice(2):''));
  }
  var rev=months.map(function(mo){
    return sessions.filter(function(s){var a=s.date.split('-').map(Number);return a[0]===mo.y&&a[1]===mo.m;})
      .reduce(function(sum,s){var c=cob(s.cid);var p=c&&c.pid?pgb(c.pid):null;return sum+(p?Math.round(p.p/p.s):0);},0);
  });
  return{labels:labels,rev:rev};
}
function pgFin(){
  var ac=clients.filter(function(c){return !c.arch;});
  var monthRev=ac.filter(function(c){return c.st==='active'&&c.pid;}).reduce(function(s,c){var p=pgb(c.pid);return s+(p?p.p:0);},0);
  var fd=getFinData(finPer);
  var tot=fd.rev.reduce(function(a,b){return a+b;},0);
  var avg=fd.rev.length?Math.round(tot/fd.rev.length):0;
  var mx=Math.max.apply(null,fd.rev.concat([1]));

  var bars=fd.rev.map(function(v,i){
    return '<div class="bcol"><div class="bv">€'+v+'</div><div class="br" style="height:'+( Math.round(v/mx*95)+4)+'px"></div><div class="bl">'+fd.labels[i]+'</div></div>';
  }).join('');

  var perBtns=['mesec','3meseca','6meseci','godina'].map(function(p){
    var lbl={mesec:t('per1'),'3meseca':t('per3'),'6meseci':t('per6'),godina:t('perY')}[p];
    return '<button class="'+(finPer===p?'on':'')+'" data-fper="'+p+'">'+lbl+'</button>';
  }).join('');

  var topC=ac.map(function(c){var p=c.pid?pgb(c.pid):null;return{name:c.name,rev:p?p.p:0};}).sort(function(a,b){return b.rev-a.rev;}).slice(0,5);
  var mxC=Math.max.apply(null,topC.map(function(x){return x.rev;}).concat([1]));
  var cbars=topC.map(function(x){var pct=Math.round(x.rev/mxC*100);return '<div class="cbrow"><div class="cbn">'+x.name.split(' ')[0]+' '+((x.name.split(' ')[1]||'')[0]||'')+'.</div><div class="cbt"><div class="cbf" style="width:'+pct+'%"></div></div><div class="cbc" style="color:var(--red);font-weight:600">€'+x.rev+'</div></div>';}).join('');

  var pkgRows=pkgs.map(function(p){var cnt=ac.filter(function(c){return c.pid===p.id&&c.st==='active';}).length;return cnt?'<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)"><div><div style="font-size:13px;font-weight:600;color:var(--text)">'+(p.n||p.s+' '+t('sessions'))+'</div><div style="font-size:11px;color:var(--text3)">'+cnt+t('activeClients')+'</div></div><div style="font-size:15px;font-weight:700;color:var(--red)">€'+(cnt*p.p)+'/mes.</div></div>':'';}).join('');

  return '<div class="topbar"><div class="ptitle">'+t('finTitle')+'</div></div>'+
    '<div class="fin2">'+
      '<div class="fincard accent"><div class="finlbl">'+t('monthRev')+'</div><div class="finval">€'+monthRev+'</div><div class="finsub">'+ac.filter(function(c){return c.st==='active';}).length+t('activeClients')+'</div></div>'+
      '<div class="fincard"><div class="finlbl">'+t('avgMonth')+'</div><div class="finval">€'+avg+'</div><div class="finsub">'+t('forPeriod')+'</div></div>'+
      '<div class="fincard"><div class="finlbl">'+t('totalPeriod')+'</div><div class="finval">€'+tot+'</div><div class="finsub">'+fd.labels.length+t('months')+'</div></div>'+
      '<div class="fincard"><div class="finlbl">'+t('yearProj')+'</div><div class="finval">€'+monthRev*12+'</div><div class="finsub">'+t('basedOn')+'</div></div>'+
    '</div>'+
    '<div class="periods">'+perBtns+'</div>'+
    '<div class="secc"><div class="sectl">'+t('revPerMonth')+'</div><div class="bwrap">'+bars+'</div></div>'+
    '<div class="secc"><div class="sectl">'+t('revPerClient')+'</div>'+cbars+'</div>'+
    (pkgRows?'<div class="secc"><div class="sectl">'+t('revPerPkg')+'</div>'+pkgRows+'</div>':'');
}

