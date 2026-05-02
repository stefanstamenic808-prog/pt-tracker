// // --- FMS TEST -----------------------------------------------
var FMS_DATA=[
  {key:'deep_squat',icon:'⬇️',nameKey:'fmsDeepSquat',desc:'Bilateralna mobilnost kukova, kolena, skočnih zglobova'},
  {key:'hurdle_step',icon:'🦵',nameKey:'fmsHurdle',desc:'Bilateralna mobilnost i stabilnost tokom koraka'},
  {key:'inline_lunge',icon:'🏃',nameKey:'fmsLunge',desc:'Mobilnost i stabilnost trupa i donjih ekstremiteta'},
  {key:'shoulder_mob',icon:'💪',nameKey:'fmsShoulder',desc:'Bilateralna mobilnost ramenog pojasa'},
  {key:'aslr',icon:'🦿',nameKey:'fmsASLR',desc:'Fleksibilnost hamstringsa uz stabilnu karlicu'},
  {key:'trunk_pushup',icon:'🫸',nameKey:'fmsPushup',desc:'Stabilnost trupa u sagitalnoj ravni'},
  {key:'rotary_stab',icon:'🔄',nameKey:'fmsRotary',desc:'Stabilnost trupa u više ravni'}
];

var FMS_SCORE_COLORS={
  0:{border:'var(--red)',bg:'var(--redbg)',cls:'s0'},
  1:{border:'#ff6b35',bg:'#fff3e0',cls:'s1'},
  2:{border:'var(--amber)',bg:'var(--abg)',cls:'s2'},
  3:{border:'var(--green)',bg:'var(--gbg)',cls:'s3'}
};
var FMS_SCORE_KEYS=['fmsScore0','fmsScore1','fmsScore2','fmsScore3'];

// Korektivne preporuke po jeziku, testu i oceni (0=bol, 1=ne izvodi, 2=kompenzacija)
var FMS_CORRECTIONS={
  sr:{
    deep_squat:{0:'⚠️ Duboki čučanj — BOL: prekini test i uputi klijenta specijalisti.',1:'Duboki čučanj: mobilnost skočnih (dorzifleksija), kukova i torakalne kičme. Vežbe: ankle wall test, hip 90/90, foam roll T-spine.',2:'Duboki čučanj: stretching kukova i lista, goblet squat sa peticom podignutom (3–5°), heel elevated squat.'},
    hurdle_step:{0:'⚠️ Korak preko prepone — BOL: uputi specijalisti.',1:'Korak preko prepone: stabilnost na jednoj nozi, jačanje gluteus medius. Vežbe: single leg balance, side-lying clamshell, monster walks.',2:'Korak preko prepone: single leg deadlift, hip flexor stretch (kneeling), step-up sa kontrolom karlice.'},
    inline_lunge:{0:'⚠️ Iskorak u liniji — BOL: uputi specijalisti.',1:'Iskorak u liniji: mobilnost skočnih, hip flexor stretch, anti-rotacija core-a. Vežbe: half-kneeling Pallof press, kneeling hip flexor stretch.',2:'Iskorak u liniji: statički iskorak (split squat hold), torakalna rotacija (open book), reverse lunge progresija.'},
    shoulder_mob:{0:'⚠️ Mobilnost ramena — BOL: uputi specijalisti (impingement test).',1:'Mobilnost ramena: torakalna mobilnost, sleeper stretch, pec minor stretch. Vežbe: foam roll T-spine, doorway pec stretch, cross-body stretch.',2:'Mobilnost ramena: skapularna mobilnost (wall slides), lat stretching, band dislocates.'},
    aslr:{0:'⚠️ Podizanje noge — BOL: uputi specijalisti.',1:'ASLR: mobilnost hamstringsa, aktivna stabilnost karlice. Vežbe: supine hamstring stretch (band), dead bug, posterior pelvic tilt.',2:'ASLR: hamstring stretching (PNF), dead bug progresija, hip flexor mobilnost (couch stretch).'},
    trunk_pushup:{0:'⚠️ Stabilnost trupa — BOL: uputi specijalisti (LBP screening).',1:'Stabilnost trupa: plank progresije, anti-ekstenzioni rad core-a. Vežbe: plank with knee, modified push-up, dead bug.',2:'Stabilnost trupa: hollow body hold, izdržljivost trupa, full plank → push-up progresija.'},
    rotary_stab:{0:'⚠️ Rotatorna stabilnost — BOL: uputi specijalisti.',1:'Rotatorna stabilnost: bird dog, dead bug, anti-rotacioni rad. Vežbe: bird dog (3×8 po strani), Pallof press, side plank.',2:'Rotatorna stabilnost: Pallof press progresija, dijagonalni patterns (chop/lift), kneeling cable rotation.'}
  },
  en:{
    deep_squat:{0:'⚠️ Deep Squat — PAIN: stop test and refer client to specialist.',1:'Deep Squat: ankle (dorsiflexion), hip and thoracic spine mobility. Exercises: ankle wall test, hip 90/90, foam roll T-spine.',2:'Deep Squat: hip and calf stretching, goblet squat with heel raised (3–5°), heel elevated squat.'},
    hurdle_step:{0:'⚠️ Hurdle Step — PAIN: refer to specialist.',1:'Hurdle Step: single-leg stability, gluteus medius strengthening. Exercises: single leg balance, side-lying clamshell, monster walks.',2:'Hurdle Step: single leg deadlift, kneeling hip flexor stretch, step-up with pelvic control.'},
    inline_lunge:{0:'⚠️ Inline Lunge — PAIN: refer to specialist.',1:'Inline Lunge: ankle mobility, hip flexor stretch, anti-rotation core. Exercises: half-kneeling Pallof press, kneeling hip flexor stretch.',2:'Inline Lunge: static lunge (split squat hold), thoracic rotation (open book), reverse lunge progression.'},
    shoulder_mob:{0:'⚠️ Shoulder Mobility — PAIN: refer to specialist (impingement test).',1:'Shoulder Mobility: thoracic mobility, sleeper stretch, pec minor stretch. Exercises: foam roll T-spine, doorway pec stretch, cross-body stretch.',2:'Shoulder Mobility: scapular mobility (wall slides), lat stretching, band dislocates.'},
    aslr:{0:'⚠️ Active Leg Raise — PAIN: refer to specialist.',1:'ASLR: hamstring mobility, active pelvic stability. Exercises: supine hamstring stretch (band), dead bug, posterior pelvic tilt.',2:'ASLR: hamstring stretching (PNF), dead bug progression, hip flexor mobility (couch stretch).'},
    trunk_pushup:{0:'⚠️ Trunk Stability — PAIN: refer to specialist (LBP screening).',1:'Trunk Stability: plank progressions, anti-extension core work. Exercises: plank with knee, modified push-up, dead bug.',2:'Trunk Stability: hollow body hold, trunk endurance, full plank → push-up progression.'},
    rotary_stab:{0:'⚠️ Rotary Stability — PAIN: refer to specialist.',1:'Rotary Stability: bird dog, dead bug, anti-rotation work. Exercises: bird dog (3×8 per side), Pallof press, side plank.',2:'Rotary Stability: Pallof press progression, diagonal patterns (chop/lift), kneeling cable rotation.'}
  },
  ru:{
    deep_squat:{0:'⚠️ Глубокий присед — БОЛЬ: прекратите тест и направьте клиента к специалисту.',1:'Глубокий присед: подвижность голеностопов (дорсифлексия), бёдер и грудного отдела. Упражнения: ankle wall test, hip 90/90, foam roll T-spine.',2:'Глубокий присед: растяжка бёдер и икр, goblet squat с поднятой пяткой (3–5°), heel elevated squat.'},
    hurdle_step:{0:'⚠️ Шаг через барьер — БОЛЬ: направьте к специалисту.',1:'Шаг через барьер: стабильность на одной ноге, укрепление средней ягодичной. Упражнения: single leg balance, side-lying clamshell, monster walks.',2:'Шаг через барьер: single leg deadlift, kneeling hip flexor stretch, step-up с контролем таза.'},
    inline_lunge:{0:'⚠️ Выпад в линию — БОЛЬ: направьте к специалисту.',1:'Выпад в линию: подвижность голеностопов, растяжка hip flexor, антиротация кора. Упражнения: half-kneeling Pallof press, kneeling hip flexor stretch.',2:'Выпад в линию: статический выпад (split squat hold), грудная ротация (open book), прогрессия reverse lunge.'},
    shoulder_mob:{0:'⚠️ Подвижность плеч — БОЛЬ: направьте к специалисту (impingement test).',1:'Подвижность плеч: подвижность грудного отдела, sleeper stretch, pec minor stretch. Упражнения: foam roll T-spine, doorway pec stretch, cross-body stretch.',2:'Подвижность плеч: подвижность лопаток (wall slides), растяжка lat, band dislocates.'},
    aslr:{0:'⚠️ Подъём ноги — БОЛЬ: направьте к специалисту.',1:'ASLR: подвижность подколенных, активная стабильность таза. Упражнения: supine hamstring stretch (band), dead bug, posterior pelvic tilt.',2:'ASLR: растяжка подколенных (PNF), прогрессия dead bug, подвижность hip flexor (couch stretch).'},
    trunk_pushup:{0:'⚠️ Стабильность торса — БОЛЬ: направьте к специалисту (LBP screening).',1:'Стабильность торса: прогрессии планки, антиэкстензионная работа кора. Упражнения: plank with knee, modified push-up, dead bug.',2:'Стабильность торса: hollow body hold, выносливость торса, полная планка → push-up прогрессия.'},
    rotary_stab:{0:'⚠️ Вращательная стабильность — БОЛЬ: направьте к специалисту.',1:'Вращательная стабильность: bird dog, dead bug, антиротационная работа. Упражнения: bird dog (3×8 на сторону), Pallof press, side plank.',2:'Вращательная стабильность: прогрессия Pallof press, диагональные паттерны (chop/lift), kneeling cable rotation.'}
  }
};

function generateFMSAutoComment(scores,total){
  var lines=[];
  var corr=FMS_CORRECTIONS[lang]||FMS_CORRECTIONS.sr;

  // Ukupna ocena
  if(total>=18) lines.push(t('fmsAcExcellent')+' ('+total+'/21) — '+t('fmsAcExcellentDesc'));
  else if(total>=15) lines.push(t('fmsAcGood')+' ('+total+'/21) — '+t('fmsAcGoodDesc'));
  else if(total>=11) lines.push(t('fmsAcAverage')+' ('+total+'/21) — '+t('fmsAcAverageDesc'));
  else lines.push(t('fmsAcNeeds')+' ('+total+'/21) — '+t('fmsAcNeedsDesc'));

  // Detekcija bola
  var painTests=[];
  FMS_DATA.forEach(function(ex){if(scores[ex.key]===0)painTests.push(ex.key);});
  if(painTests.length>0){
    lines.push('');
    var tw=painTests.length>1?t('fmsAcPainTests2'):t('fmsAcPainTests1');
    lines.push(t('fmsAcPainAlert')+' '+painTests.length+' '+tw+' '+t('fmsAcPainAdvice'));
  }

  // Specifične preporuke po testu
  var hasCorrections=false;
  var corrections=[];
  FMS_DATA.forEach(function(ex){
    var v=scores[ex.key];
    if(v===undefined||v===3)return;
    var rec=corr[ex.key]&&corr[ex.key][v];
    if(rec){corrections.push('• '+rec);hasCorrections=true;}
  });

  if(hasCorrections){
    lines.push('');
    lines.push(t('fmsAcCorrections'));
    lines=lines.concat(corrections);
  } else {
    lines.push('');
    lines.push(t('fmsAcAllPerfect'));
  }

  return lines.join('\n');
}

function getFMSTests(cid){var c=cob(cid);return(c&&c.fmsTests)?c.fmsTests:[];}

function fmsCat(total){
  if(total>=18)return{label:'fmsExcellent',color:'var(--green)',bg:'var(--gbg)'};
  if(total>=15)return{label:'fmsGood',color:'var(--amber)',bg:'var(--abg)'};
  if(total>=11)return{label:'fmsAverage',color:'#ff6b35',bg:'#fff3e0'};
  return{label:'fmsNeedsWork',color:'var(--red)',bg:'var(--redbg)'};
}

function buildFMSRadar(scores,prevScores,size){
  size=size||240;
  var cx=size/2,cy=size/2,R=size/2-32,n=7;
  function pt(i,val){var a=Math.PI*2*i/n-Math.PI/2;var r=val/3*R;return{x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};}
  function lpt(i){var a=Math.PI*2*i/n-Math.PI/2;var r=R+18;return{x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};}

  var grid='';
  for(var lv=1;lv<=3;lv++){
    var pts=[];for(var j=0;j<n;j++){var p=pt(j,lv);pts.push(p.x+','+p.y);}
    grid+='<polygon points="'+pts.join(' ')+'" fill="none" stroke="var(--border)" stroke-width="0.7" opacity=".5"/>';
  }
  var axes='';
  for(var j=0;j<n;j++){var p=pt(j,3);axes+='<line x1="'+cx+'" y1="'+cy+'" x2="'+p.x+'" y2="'+p.y+'" stroke="var(--border)" stroke-width="0.5" opacity=".4"/>';}

  // Previous polygon
  var prevPoly='';
  if(prevScores){
    var ppts=[];for(var j=0;j<n;j++){var k=FMS_DATA[j].key;var v=prevScores[k]||0;var p=pt(j,v);ppts.push(p.x+','+p.y);}
    prevPoly='<polygon points="'+ppts.join(' ')+'" fill="rgba(255,107,53,0.08)" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="5 3" opacity=".6"/>';
  }

  // Current polygon
  var cpts=[],dots='';
  for(var j=0;j<n;j++){
    var k=FMS_DATA[j].key;var v=scores[k];
    if(v===undefined)v=0;
    var p=pt(j,v);cpts.push(p.x+','+p.y);
    var sc=FMS_SCORE_COLORS[v]||FMS_SCORE_COLORS[0];
    dots+='<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="'+sc.border+'" stroke="var(--bg)" stroke-width="1.5"/>';
  }
  var curPoly='<polygon points="'+cpts.join(' ')+'" fill="rgba(204,34,0,0.1)" stroke="var(--red)" stroke-width="2"/>';

  // Labels
  var labels='';
  var shortNames=lang==='en'?['Squat','Hurdle','Lunge','Shoulder','ASLR','Push','Rotary']:
    lang==='ru'?['Присед','Барьер','Выпад','Плечо','ASLR','Стаб.','Ротация']:
    ['Čučanj','Prepona','Iskorak','Rame','ASLR','Sklek','Rotacija'];
  for(var j=0;j<n;j++){
    var lp=lpt(j);
    labels+='<text x="'+lp.x+'" y="'+lp.y+'" text-anchor="middle" dominant-baseline="middle" fill="var(--text3)" font-size="8" font-family="inherit">'+shortNames[j]+'</text>';
  }

  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" style="overflow:visible">'+grid+axes+prevPoly+curPoly+dots+labels+'</svg>';
}

function buildFMSProgressChart(history){
  if(history.length<2)return '';
  var W=320,H=120,pl=30,pr=15,pt2=18,pb=22;
  var cw=W-pl-pr,ch=H-pt2-pb;
  var mx=21;

  var gridLines='';
  [0,7,14,21].forEach(function(v){
    var y=pt2+ch-(v/mx)*ch;
    gridLines+='<line x1="'+pl+'" y1="'+y+'" x2="'+(W-pr)+'" y2="'+y+'" stroke="var(--border)" stroke-width="0.5" opacity=".5"/>';
    gridLines+='<text x="'+(pl-5)+'" y="'+(y+3)+'" text-anchor="end" fill="var(--text3)" font-size="9" font-family="inherit">'+v+'</text>';
  });

  var points=history.map(function(h,i){
    var x=pl+(history.length===1?cw/2:(i/(history.length-1))*cw);
    var y=pt2+ch-(h.total/mx)*ch;
    return{x:x,y:y,total:h.total,date:h.date};
  });

  var line=points.map(function(p,i){return(i===0?'M':'L')+' '+p.x+' '+p.y;}).join(' ');
  var area=line+' L '+points[points.length-1].x+' '+(pt2+ch)+' L '+points[0].x+' '+(pt2+ch)+' Z';

  var dotsSvg=points.map(function(p){
    var cat=fmsCat(p.total);
    return '<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="var(--red)" stroke="var(--bg)" stroke-width="1.5"/>'+
      '<text x="'+p.x+'" y="'+(p.y-9)+'" text-anchor="middle" fill="var(--red)" font-size="10" font-weight="700" font-family="inherit">'+p.total+'</text>'+
      '<text x="'+p.x+'" y="'+(pt2+ch+14)+'" text-anchor="middle" fill="var(--text3)" font-size="8" font-family="inherit">'+p.date.slice(5)+'</text>';
  }).join('');

  return '<div style="overflow-x:auto;margin:8px 0"><svg width="100%" viewBox="0 0 '+W+' '+H+'" style="overflow:visible;min-width:280px">'+
    '<defs><linearGradient id="fmsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--red)" stop-opacity=".15"/><stop offset="100%" stop-color="var(--red)" stop-opacity="0"/></linearGradient></defs>'+
    gridLines+
    '<path d="'+area+'" fill="url(#fmsFill)"/>'+
    '<path d="'+line+'" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
    dotsSvg+
  '</svg></div>';
}

function buildFMSSection(cid){
  var tests=getFMSTests(cid);
  var lastTest=tests.length?tests[tests.length-1]:null;

  // FORM ROWS
  var formRows=FMS_DATA.map(function(ex){
    var btns='<div class="fms-scores">';
    for(var v=0;v<=3;v++){
      btns+='<button class="fms-sb" id="fms_'+ex.key+'_'+v+'" onclick="selFMS(\''+ex.key+'\','+v+','+cid+')">'+v+'</button>';
    }
    btns+='</div>';
    return '<div class="fms-test-row">'+
      '<div class="fms-icon">'+ex.icon+'</div>'+
      '<div class="fms-info"><div class="fms-name">'+t(ex.nameKey)+'</div><div class="fms-desc">'+ex.desc+'</div></div>'+
      btns+
    '</div>';
  }).join('');

  // TOTAL DISPLAY
  var totalRow='<div class="fms-total"><div><div class="fms-total-num" id="fms_total_num">0</div><div class="fms-total-lbl">'+t('fmsTotal')+' '+t('fmsMax')+'</div></div><div id="fms_cat_badge"></div></div>';

  // RADAR (hidden initially)
  var radarSection='<div class="fms-radar-wrap" id="fms_radar" style="display:none"></div>';
  var legendSection='<div class="fms-legend" id="fms_legend" style="display:none"><span><i style="background:var(--red)"></i>'+t('fmsCurrent')+'</span>'+(lastTest?'<span><i style="background:#ff6b35;opacity:.6"></i>'+t('fmsPrevious')+'</span>':'')+'</div>';

  // DATE + NOTE
  var dateNote='<div style="display:flex;gap:8px;margin:8px 0">'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📅 '+t('date')+'</div><input id="fms_date" type="date" value="'+today()+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;-webkit-appearance:none"/></div>'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📝 '+t('testNote')+'</div><input id="fms_note" placeholder="'+t('optional')+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit"/></div>'+
  '</div>';

  // SAVE BUTTON
  var saveBtn='<button class="btn btnp btnsm" style="width:100%;padding:10px;margin-top:4px" onclick="addFMSTest('+cid+')">'+t('fmsSave')+'</button>';

  // PROGRESS CHART
  var progressChart=tests.length>=2?'<div style="margin-top:12px"><div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:4px">📈 '+t('fmsProgress')+'</div>'+buildFMSProgressChart(tests)+'</div>':'';

  // HISTORY
  var history='';
  if(tests.length){
    history=tests.slice().reverse().map(function(te,idx){
      var realIdx=tests.length-1-idx;
      var cat=fmsCat(te.total);

      // Mini radar for history entry
      var prevTest=realIdx>0?tests[realIdx-1]:null;
      var miniRadar=buildFMSRadar(te.scores,prevTest?prevTest.scores:null,180);

      // Score chips
      var chips=FMS_DATA.map(function(ex){
        var v=te.scores[ex.key];
        if(v===undefined)v=0;
        var sc=FMS_SCORE_COLORS[v];
        return '<div class="fms-hist-chip" style="background:'+sc.bg+';color:'+sc.border+'" title="'+t(ex.nameKey)+': '+v+'">'+v+'</div>';
      }).join('');

      // Comparison with previous
      var diffStr='';
      if(prevTest){
        var diff=te.total-prevTest.total;
        if(diff>0)diffStr='<span style="font-size:11px;color:var(--green);font-weight:600"> ↑+'+diff+'</span>';
        else if(diff<0)diffStr='<span style="font-size:11px;color:var(--red);font-weight:600"> ↓'+diff+'</span>';
        else diffStr='<span style="font-size:11px;color:var(--text3)"> =</span>';
      }

      return '<div class="fms-hist-entry">'+
        '<div class="fms-hist-hdr">'+
          '<div><div class="fms-hist-date">'+fmtD(te.date)+diffStr+'</div>'+
          (te.note?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+te.note+'</div>':'')+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px">'+
            '<div class="fms-hist-total" style="color:'+cat.color+'">'+te.total+'<span style="font-size:12px;color:var(--text3)">/21</span></div>'+
            '<button class="btn btnsm btnr" style="padding:3px 8px;font-size:11px" onclick="window.delFMSNow('+cid+','+realIdx+');event.stopPropagation();">×</button>'+
          '</div>'+
        '</div>'+
        '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px"><span class="fms-cat" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+'</span></div>'+
        '<div class="fms-hist-grid" style="margin-bottom:8px">'+chips+'</div>'+
        '<div style="display:flex;justify-content:center">'+miniRadar+'</div>'+
        '<div style="margin-top:10px;padding:10px 12px;background:var(--bg2);border:1px solid var(--border);border-left:3px solid '+cat.color+';border-radius:var(--rs);font-size:11.5px;line-height:1.55;color:var(--text);white-space:pre-wrap">'+generateFMSAutoComment(te.scores,te.total)+'</div>'+
      '</div>';
    }).join('');
  } else {
    history='<div style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">'+t('fmsNoTests')+'</div>';
  }

  // SCORE LEGEND
  var legend='<div style="display:flex;justify-content:space-around;padding:8px;margin-top:6px;background:var(--bg);border:1px solid var(--border);border-radius:var(--rs)">'+
    [0,1,2,3].map(function(v){var sc=FMS_SCORE_COLORS[v];return '<div style="display:flex;align-items:center;gap:4px"><div style="width:8px;height:8px;border-radius:50%;background:'+sc.border+'"></div><span style="font-size:10px;color:var(--text3)">'+v+' '+t(FMS_SCORE_KEYS[v])+'</span></div>';}).join('')+
  '</div>';

  return '<div class="profsec">'+
    '<div class="profsect">🏋️ '+t('fmsTest')+'</div>'+
    '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">'+t('fmsDesc')+'</div>'+
    formRows+
    totalRow+
    radarSection+
    legendSection+
    legend+
    dateNote+
    saveBtn+
    progressChart+
    '<div style="font-size:13px;font-weight:700;color:var(--text2);margin:16px 0 10px">'+t('fmsHistory')+'</div>'+
    history+
  '</div>';
}

// Track current FMS selections per test
var fmsScores={};
function selFMS(key,val,cid){
  // Toggle off if same value
  if(fmsScores[key]===val){delete fmsScores[key];}
  else{fmsScores[key]=val;}

  // Update button states
  for(var v=0;v<=3;v++){
    var el=document.getElementById('fms_'+key+'_'+v);
    if(el){
      el.className='fms-sb'+(fmsScores[key]===v?' '+FMS_SCORE_COLORS[v].cls:'');
    }
  }

  // Update total
  var total=0,cnt=0;
  FMS_DATA.forEach(function(ex){if(fmsScores[ex.key]!==undefined){total+=fmsScores[ex.key];cnt++;}});
  var el=document.getElementById('fms_total_num');
  if(el)el.textContent=total;

  var badge=document.getElementById('fms_cat_badge');
  if(badge&&cnt>0){
    var cat=fmsCat(total);
    badge.innerHTML='<span class="fms-cat" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+'</span>';
  }

  // Update radar
  if(cnt>0){
    var radarEl=document.getElementById('fms_radar');
    var legEl=document.getElementById('fms_legend');
    if(radarEl){
      var tests=getFMSTests(cid);
      var lastTest=tests.length?tests[tests.length-1]:null;
      radarEl.innerHTML=buildFMSRadar(fmsScores,lastTest?lastTest.scores:null,240);
      radarEl.style.display='flex';
    }
    if(legEl)legEl.style.display='flex';
  }
}

function addFMSTest(cid){
  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  if(!clients[i].fmsTests)clients[i].fmsTests=[];

  var hasVal=false;
  FMS_DATA.forEach(function(ex){if(fmsScores[ex.key]!==undefined)hasVal=true;});
  if(!hasVal){toast(t('fmsEnterOne'));return;}

  var total=0;
  var scoresCopy={};
  FMS_DATA.forEach(function(ex){
    var v=fmsScores[ex.key];
    if(v!==undefined){scoresCopy[ex.key]=v;total+=v;}
    else{scoresCopy[ex.key]=0;}
  });

  var date=document.getElementById('fms_date').value||today();
  var note=(document.getElementById('fms_note').value||'').trim();

  var autoComment=generateFMSAutoComment(scoresCopy,total);
  clients[i].fmsTests.push({date:date,scores:scoresCopy,total:total,note:note,autoComment:autoComment});
  fmsScores={};
  sv();
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('fms',cid);},50);
  toast(t('fmsSaved'));
}

window.delFMSNow=function(cid,idx){
  if(!confirm(t('confirmTest')))return;
  var ci=clients.findIndex(function(c){return c.id===cid;});
  if(ci>-1&&clients[ci].fmsTests){
    clients[ci].fmsTests.splice(idx,1);
    sv();
    openProf(cid);
    setTimeout(function(){switchProfTab('tests',cid);switchTestTab('fms',cid);},50);
    toast(t('fmsDeleted'));
  }
};

