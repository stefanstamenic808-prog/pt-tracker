// // --- HELPERS ----------------------------------------------
function now2(){
  var n=new Date();
  return{
    date:n.getFullYear()+'-'+pad(n.getMonth()+1)+'-'+pad(n.getDate()),
    time:pad(n.getHours())+':'+pad(n.getMinutes())
  };
}
function pad(x){return String(x).padStart(2,'0');}
function today(){return now2().date;}
function du(d){var a=new Date();a.setHours(0,0,0,0);var b=new Date(d);b.setHours(0,0,0,0);return Math.round((b-a)/86400000);}
function pkgExp(c){
  if(!c.pstart)return null;
  var pkg=c.pid?pgb(c.pid):null;
  var dur=(pkg&&pkg.d)?pkg.d:30;
  var d=new Date(c.pstart);d.setDate(d.getDate()+dur);
  return d.toISOString().split('T')[0];
}
function pgb(id){return pkgs.find(function(p){return p.id===id;});}
function cob(id){return clients.find(function(c){return c.id===id;});}
function ini(n){return n.split(' ').map(function(w){return w[0];}).join('').toUpperCase().slice(0,2);}
function fmtD(d){if(!d)return '—';var a=d.split('-');return a[2]+'/'+a[1]+'/'+a[0];}
function bc(s){return{active:'ba',due:'bd',overdue:'bo',paused:'bp'}[s]||'bp';}
function bl(s){return{active:t('statusActive'),due:t('statusDue'),overdue:t('statusOverdue'),paused:t('statusPaused')}[s]||s;}

// "Istekla pre X dana" — formatirano po jeziku
function expFmt(n){
  if(lang==='en')return 'Expired '+n+' day'+(n!==1?'s':'')+' ago';
  if(lang==='ru')return 'Истекла '+n+' дн. назад';
  return 'Istekla pre '+n+' dan'+(n===1?'':n%10>=2&&n%10<=4&&(n<10||n>20)?'a':'a');
}

// Auto-update statusa za istekle članarine
// active → due (1-14 dana isteka), due → overdue (>14 dana isteka)
// paused i overdue ostaju kao što jesu
function autoUpdateExpiredStatuses(){
  var changed=false;
  clients.forEach(function(c){
    if(c.arch||c.st==='paused'||!c.pid)return;
    var e=pkgExp(c);if(!e)return;
    var dl=du(e);
    if(dl>=0)return; // još nije istekla
    var daysOver=Math.abs(dl);
    if(c.st==='active'&&daysOver>=1){c.st='due';changed=true;}
    else if(c.st==='due'&&daysOver>=15){c.st='overdue';changed=true;}
  });
  if(changed)sv();
}
function cCol(cid){var C=['#cc2200','#1a56db','#1a7a2e','#9333ea','#059669','#d97706','#0891b2','#be185d'];return C[cid%C.length];}
function toast(m){var el=document.getElementById('toast');el.textContent=m;el.classList.add('on');setTimeout(function(){el.classList.remove('on');},2400);}
function om(id){document.getElementById(id).classList.add('on');}
function cm(id){document.getElementById(id).classList.remove('on');}
function theme(){
  document.getElementById('app').className=isDark?'dark':'';
  var b=document.getElementById('darkBtn');
  if(b)b.textContent=isDark?'🌙':'☀️';
}

