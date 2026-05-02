// // --- ARHIVA PAGE ------------------------------------------
function pgArhiva(){
  var arc=clients.filter(function(c){return c.arch;});
  var cards=arc.length?arc.map(function(c){
    var p=c.pid?pgb(c.pid):null;
    var cnt=sessions.filter(function(s){return s.cid===c.id;}).length;
    return '<div class="cc" style="opacity:.75;border-style:dashed">'+
      '<div class="ctop">'+
        '<div class="av" style="opacity:.6">'+ini(c.name)+'</div>'+
        '<div class="ci">'+
          '<div style="font-size:15px;font-weight:600;color:var(--text2)">'+c.name+'</div>'+
          '<div class="cmeta">'+(p?'<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span>':'')+' '+(p?'<span>'+p.s+' '+t('sessions')+'</span>':'')+'</div>'+
          '<div style="font-size:11px;color:var(--text3);margin-top:2px">'+cnt+t('trainedTotal')+'</div>'+
        '</div>'+
        '<div class="cr"><span class="bdg bar2">'+t('statusArch')+'</span></div>'+
      '</div>'+
      '<div class="cact">'+
        '<button class="btn btng btnsm" data-actv="'+c.id+'">'+t('activate')+'</button>'+
        '<button class="btn btnsm btnr" data-delc="'+c.id+'">'+t('delForever')+'</button>'+
      '</div>'+
    '</div>';
  }).join(''):'<div class="empty">'+t('noArchived')+'</div>';
  return '<div class="topbar"><div class="ptitle">'+t('archive')+'</div></div>'+
    '<div style="font-size:13px;color:var(--text3);margin-bottom:14px">'+t('archDesc')+'</div>'+
    '<div class="clist">'+cards+'</div>';
}

