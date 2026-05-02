// // --- 1RM TEST -----------------------------------------------
var RM_EXERCISES=[
  {key:'bench',icon:'🏋️',nameKey:'rmBench',muscleKey:'rmBenchM'},
  {key:'squat',icon:'⬇️',nameKey:'rmSquat',muscleKey:'rmSquatM'},
  {key:'deadlift',icon:'🔥',nameKey:'rmDeadlift',muscleKey:'rmDeadliftM'},
  {key:'ohp',icon:'🙌',nameKey:'rmOHP',muscleKey:'rmOHPM'},
  {key:'row',icon:'🚣',nameKey:'rmRow',muscleKey:'rmRowM'}
];

function get1RMTests(cid){var c=cob(cid);return(c&&c.rmTests)?c.rmTests:[];}

// 1RM = prosek 3 formule (Brzycki + Epley + Lombardi)
function brzycki(w,r){
  if(r<=0||w<=0)return 0;
  if(r===1)return w;
  if(r>10)r=10;
  var b=w*(36/(37-r));            // Brzycki
  var e=w*(1+r/30);                // Epley
  var l=w*Math.pow(r,0.10);        // Lombardi
  return Math.round(((b+e+l)/3)*10)/10;
}

// BW ratio categories for each exercise
function rmCatForExercise(key,ratio){
  // Approximate strength standards (male, BW ratio)
  var standards={
    bench: [0.5,0.75,1.0,1.25,1.5],
    squat: [0.75,1.0,1.25,1.5,2.0],
    deadlift:[0.75,1.0,1.5,2.0,2.5],
    ohp:   [0.3,0.45,0.6,0.75,1.0],
    row:   [0.4,0.6,0.8,1.0,1.25]
  };
  var s=standards[key]||[0.5,0.75,1.0,1.25,1.5];
  if(ratio>=s[4])return{label:'rmElite',color:'#9c27b0',bg:'#f3e5f5'};
  if(ratio>=s[3])return{label:'rmAdvanced',color:'var(--green)',bg:'var(--gbg)'};
  if(ratio>=s[2])return{label:'rmIntermediate',color:'#1a7a2e',bg:'var(--gbg)'};
  if(ratio>=s[1])return{label:'rmNovice',color:'var(--amber)',bg:'var(--abg)'};
  return{label:'rmBeginner',color:'#ff6b35',bg:'#fff3e0'};
}

function build1RMProgressChart(history,exKey){
  var vals=history.filter(function(h){return h.results[exKey];}).map(function(h){return{date:h.date,val:h.results[exKey].rm};});
  if(vals.length<2)return '';
  var W=320,H=110,pl=35,pr=15,pt2=16,pb=22;
  var cw=W-pl-pr,ch=H-pt2-pb;
  var mn=Math.min.apply(null,vals.map(function(v){return v.val;}));
  var mx=Math.max.apply(null,vals.map(function(v){return v.val;}));
  if(mx===mn){mx=mn+20;mn=Math.max(0,mn-10);}
  else{var pad=(mx-mn)*0.15;mn=Math.max(0,mn-pad);mx=mx+pad;}

  var points=vals.map(function(v,i){
    var x=pl+(vals.length===1?cw/2:(i/(vals.length-1))*cw);
    var y=pt2+ch-((v.val-mn)/(mx-mn))*ch;
    return{x:x,y:y,val:v.val,date:v.date};
  });

  var line=points.map(function(p,i){return(i===0?'M':'L')+' '+p.x+' '+p.y;}).join(' ');
  var area=line+' L '+points[points.length-1].x+' '+(pt2+ch)+' L '+points[0].x+' '+(pt2+ch)+' Z';

  var dots=points.map(function(p){
    return '<circle cx="'+p.x+'" cy="'+p.y+'" r="3.5" fill="var(--red)" stroke="var(--bg)" stroke-width="1.5"/>'+
      '<text x="'+p.x+'" y="'+(p.y-8)+'" text-anchor="middle" fill="var(--red)" font-size="9" font-weight="700" font-family="inherit">'+p.val+'</text>'+
      '<text x="'+p.x+'" y="'+(pt2+ch+13)+'" text-anchor="middle" fill="var(--text3)" font-size="7" font-family="inherit">'+p.date.slice(5)+'</text>';
  }).join('');

  return '<svg width="100%" viewBox="0 0 '+W+' '+H+'" style="overflow:visible;min-width:260px">'+
    '<defs><linearGradient id="rmFill_'+exKey+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--red)" stop-opacity=".12"/><stop offset="100%" stop-color="var(--red)" stop-opacity="0"/></linearGradient></defs>'+
    '<path d="'+area+'" fill="url(#rmFill_'+exKey+')"/>'+
    '<path d="'+line+'" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
    dots+
  '</svg>';
}

function build1RMSection(cid){
  var tests=get1RMTests(cid);
  var lastTest=tests.length?tests[tests.length-1]:null;
  var c=cob(cid);

  // EXERCISE FORM ROWS
  var formRows=RM_EXERCISES.map(function(ex){
    var prevRM=lastTest&&lastTest.results[ex.key]?lastTest.results[ex.key].rm:null;
    return '<div class="rm-ex-row">'+
      '<div class="rm-ex-hdr">'+
        '<div class="rm-ex-icon">'+ex.icon+'</div>'+
        '<div><div class="rm-ex-name">'+t(ex.nameKey)+'</div><div class="rm-ex-muscle">'+t(ex.muscleKey)+'</div></div>'+
        (prevRM?'<div style="margin-left:auto;font-size:11px;color:var(--text3)">Prethodni: <strong style="color:var(--text)">'+prevRM+'kg</strong></div>':'')+
      '</div>'+
      '<div class="rm-ex-inputs">'+
        '<div><label>'+t('rmWeight')+'</label><input id="rm_w_'+ex.key+'" type="number" inputmode="decimal" placeholder="0" oninput="rmLiveCalc(\''+ex.key+'\')"/></div>'+
        '<div><label>'+t('rmReps')+'</label><input id="rm_r_'+ex.key+'" type="number" inputmode="numeric" placeholder="0" min="1" max="10" oninput="rmLiveCalc(\''+ex.key+'\')"/></div>'+
        '<div class="rm-ex-result" id="rm_res_'+ex.key+'"><div class="rm-val">—</div><div class="rm-lbl">'+t('rmEstimated')+'</div></div>'+
      '</div>'+
    '</div>';
  }).join('');

  // BODY WEIGHT INPUT
  var bwInput='<div style="display:flex;align-items:center;gap:8px;margin:10px 0;padding:10px 12px;background:var(--bg);border:1px solid var(--border);border-radius:var(--rs)">'+
    '<span style="font-size:16px">⚖️</span>'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text3);margin-bottom:3px">'+t('rmBW')+' (kg)</div>'+
    '<input id="rm_bw" type="number" inputmode="decimal" placeholder="80" style="width:100%;padding:6px;font-size:14px;font-weight:700;border:1.5px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit" oninput="rmUpdateSummary()"/></div>'+
  '</div>';

  // LIVE SUMMARY (hidden initially)
  var summary='<div class="rm-summary" id="rm_summary" style="display:none">'+
    '<div class="rm-summary-title">📊 '+t('rmTotal')+'</div>'+
    '<div id="rm_sum_rows"></div>'+
    '<div id="rm_total_row" style="margin-top:8px;padding-top:8px;border-top:2px solid var(--border);display:flex;justify-content:space-between;align-items:center">'+
      '<span style="font-weight:700;color:var(--text)">'+t('rmTotal')+'</span>'+
      '<span id="rm_total_val" style="font-size:22px;font-weight:800;color:var(--red)">0 kg</span>'+
    '</div>'+
  '</div>';

  // DATE + NOTE
  var dateNote='<div style="display:flex;gap:8px;margin:8px 0">'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📅 '+t('date')+'</div><input id="rm_date" type="date" value="'+today()+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;-webkit-appearance:none"/></div>'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📝 '+t('testNote')+'</div><input id="rm_note" placeholder="'+t('optional')+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit"/></div>'+
  '</div>';

  // SAVE
  var saveBtn='<button class="btn btnp btnsm" style="width:100%;padding:10px;margin-top:4px" onclick="add1RMTest('+cid+')">'+t('rmSave')+'</button>';

  // PROGRESS CHARTS per exercise
  var progressCharts='';
  if(tests.length>=2){
    progressCharts='<div style="margin-top:14px"><div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px">📈 '+t('rmProgress')+'</div>';
    RM_EXERCISES.forEach(function(ex){
      var hasData=tests.filter(function(te){return te.results[ex.key];}).length>=2;
      if(hasData){
        progressCharts+='<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:600;color:var(--text3);margin-bottom:4px">'+ex.icon+' '+t(ex.nameKey)+'</div>'+
          '<div style="overflow-x:auto">'+build1RMProgressChart(tests,ex.key)+'</div></div>';
      }
    });
    progressCharts+='</div>';
  }

  // HISTORY
  var history='';
  if(tests.length){
    history=tests.slice().reverse().map(function(te,idx){
      var realIdx=tests.length-1-idx;
      var prevTest=realIdx>0?tests[realIdx-1]:null;

      var totalRM=0;
      var chips=RM_EXERCISES.map(function(ex){
        var r=te.results[ex.key];
        if(!r)return '';
        totalRM+=r.rm;
        var prevRM=prevTest&&prevTest.results[ex.key]?prevTest.results[ex.key].rm:null;
        var diff='';
        if(prevRM){
          var d=r.rm-prevRM;
          if(d>0)diff='<span style="font-size:9px;color:var(--green)"> +'+d+'</span>';
          else if(d<0)diff='<span style="font-size:9px;color:var(--red)"> '+d+'</span>';
        }
        return '<div class="rm-hist-chip"><div class="rm-hc-name">'+ex.icon+' '+t(ex.nameKey)+'</div><div class="rm-hc-val">'+r.rm+'kg'+diff+'</div></div>';
      }).join('');

      return '<div class="rm-hist">'+
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">'+
          '<div><div style="font-size:14px;font-weight:700;color:var(--text)">'+fmtD(te.date)+'</div>'+
          (te.note?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+te.note+'</div>':'')+
          (te.bw?'<div style="font-size:11px;color:var(--text3)">⚖️ '+te.bw+'kg</div>':'')+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px">'+
            '<div style="text-align:right"><div style="font-size:20px;font-weight:800;color:var(--red)">'+totalRM+'<span style="font-size:12px;color:var(--text3)">kg</span></div><div style="font-size:10px;color:var(--text3)">'+t('rmTotal')+'</div></div>'+
            '<button class="btn btnsm btnr" style="padding:3px 8px;font-size:11px" onclick="window.del1RMNow('+cid+','+realIdx+');event.stopPropagation();">×</button>'+
          '</div>'+
        '</div>'+
        '<div class="rm-hist-exercises">'+chips+'</div>'+
      '</div>';
    }).join('');
  } else {
    history='<div style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">'+t('rmNoTests')+'</div>';
  }

  return '<div class="profsec">'+
    '<div class="profsect">🏆 '+t('rmTest')+'</div>'+
    '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">'+t('rmDesc')+'</div>'+
    formRows+
    bwInput+
    summary+
    dateNote+
    saveBtn+
    progressCharts+
    '<div style="font-size:13px;font-weight:700;color:var(--text2);margin:16px 0 10px">'+t('rmHistory')+'</div>'+
    history+
  '</div>';
}

// Live calculation per exercise
function rmLiveCalc(key){
  var w=Number(document.getElementById('rm_w_'+key).value)||0;
  var r=Number(document.getElementById('rm_r_'+key).value)||0;
  var resEl=document.getElementById('rm_res_'+key);

  if(w>0&&r>0){
    var rm=brzycki(w,r);
    resEl.innerHTML='<div class="rm-val" style="color:var(--red)">'+rm+'</div><div class="rm-lbl">'+t('rmEstimated')+'</div>';
  } else {
    resEl.innerHTML='<div class="rm-val">—</div><div class="rm-lbl">'+t('rmEstimated')+'</div>';
  }
  rmUpdateSummary();
}

function rmUpdateSummary(){
  var bw=Number(document.getElementById('rm_bw').value)||0;
  var total=0,cnt=0,rows='';

  RM_EXERCISES.forEach(function(ex){
    var w=Number(document.getElementById('rm_w_'+ex.key).value)||0;
    var r=Number(document.getElementById('rm_r_'+ex.key).value)||0;
    if(w>0&&r>0){
      var rm=brzycki(w,r);
      total+=rm;cnt++;
      var ratio=bw>0?(rm/bw):0;
      var cat=bw>0?rmCatForExercise(ex.key,ratio):null;
      rows+='<div class="rm-sum-row">'+
        '<div style="display:flex;align-items:center;gap:6px"><span>'+ex.icon+'</span><span style="font-size:12px;font-weight:600;color:var(--text)">'+t(ex.nameKey)+'</span></div>'+
        '<div style="display:flex;align-items:center;gap:8px">'+
          '<span style="font-size:14px;font-weight:800;color:var(--red)">'+rm+'kg</span>'+
          (cat?'<span class="rm-cat-chip" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+(bw>0?' · '+ratio.toFixed(2)+'x':'')+'</span>':'')+
        '</div>'+
      '</div>';
    }
  });

  var sumEl=document.getElementById('rm_summary');
  var rowsEl=document.getElementById('rm_sum_rows');
  var totalEl=document.getElementById('rm_total_val');
  if(cnt>0){
    sumEl.style.display='block';
    rowsEl.innerHTML=rows;
    totalEl.textContent=total+' kg';
  } else {
    sumEl.style.display='none';
  }
}

function add1RMTest(cid){
  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  if(!clients[i].rmTests)clients[i].rmTests=[];

  var results={},hasVal=false;
  RM_EXERCISES.forEach(function(ex){
    var w=Number(document.getElementById('rm_w_'+ex.key).value)||0;
    var r=Number(document.getElementById('rm_r_'+ex.key).value)||0;
    if(w>0&&r>0){
      results[ex.key]={weight:w,reps:r,rm:brzycki(w,r)};
      hasVal=true;
    }
  });
  if(!hasVal){toast(t('rmEnter'));return;}

  var date=document.getElementById('rm_date').value||today();
  var note=(document.getElementById('rm_note').value||'').trim();
  var bw=Number(document.getElementById('rm_bw').value)||0;

  clients[i].rmTests.push({date:date,results:results,bw:bw||null,note:note});
  sv();
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('1rm',cid);},50);
  toast(t('rmSaved'));
}

window.del1RMNow=function(cid,idx){
  if(!confirm(t('confirmTest')))return;
  var ci=clients.findIndex(function(c){return c.id===cid;});
  if(ci>-1&&clients[ci].rmTests){
    clients[ci].rmTests.splice(idx,1);
    sv();
    openProf(cid);
    setTimeout(function(){switchProfTab('tests',cid);switchTestTab('1rm',cid);},50);
    toast(t('rmDeleted'));
  }
};

