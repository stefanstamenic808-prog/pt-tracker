// // --- RUFFIER TEST -------------------------------------------
function getRufTests(cid){var c=cob(cid);return(c&&c.rufTests)?c.rufTests:[];}

function rufCat(idx){
  if(idx<=0)return{label:'rufExcellent',color:'var(--green)',bg:'var(--gbg)',pct:100};
  if(idx<=5)return{label:'rufGood',color:'#1a7a2e',bg:'var(--gbg)',pct:80};
  if(idx<=10)return{label:'rufAverage',color:'var(--amber)',bg:'var(--abg)',pct:60};
  if(idx<=15)return{label:'rufBelowAvg',color:'#ff6b35',bg:'#fff3e0',pct:40};
  return{label:'rufPoor',color:'var(--red)',bg:'var(--redbg)',pct:20};
}

function rufCalc(p1,p2,p3){return((p1+p2+p3-200)/10);}

function buildRufProgressChart(history){
  if(history.length<2)return '';
  var W=320,H=120,pl=35,pr=15,pt2=18,pb=22;
  var cw=W-pl-pr,ch=H-pt2-pb;
  // Index can range from -5 to ~25, normalize
  var vals=history.map(function(h){return h.index;});
  var mn=Math.min.apply(null,vals.concat([0]));
  var mx=Math.max.apply(null,vals.concat([20]));
  if(mx===mn)mx=mn+10;

  var gridLines='';
  [0,5,10,15,20].forEach(function(v){
    if(v<mn-2||v>mx+2)return;
    var y=pt2+ch-((v-mn)/(mx-mn))*ch;
    gridLines+='<line x1="'+pl+'" y1="'+y+'" x2="'+(W-pr)+'" y2="'+y+'" stroke="var(--border)" stroke-width="0.5" opacity=".5"/>';
    gridLines+='<text x="'+(pl-5)+'" y="'+(y+3)+'" text-anchor="end" fill="var(--text3)" font-size="9" font-family="inherit">'+v+'</text>';
  });

  // Good zone (0-5) highlight
  var y5=pt2+ch-((5-mn)/(mx-mn))*ch;
  var y0=pt2+ch-((0-mn)/(mx-mn))*ch;
  gridLines+='<rect x="'+pl+'" y="'+Math.min(y5,y0)+'" width="'+cw+'" height="'+Math.abs(y5-y0)+'" fill="var(--green)" opacity=".06" rx="3"/>';

  var points=history.map(function(h,i){
    var x=pl+(history.length===1?cw/2:(i/(history.length-1))*cw);
    var y=pt2+ch-((h.index-mn)/(mx-mn))*ch;
    return{x:x,y:y,index:h.index,date:h.date};
  });

  var line=points.map(function(p,i){return(i===0?'M':'L')+' '+p.x+' '+p.y;}).join(' ');
  var area=line+' L '+points[points.length-1].x+' '+(pt2+ch)+' L '+points[0].x+' '+(pt2+ch)+' Z';

  var dotsSvg=points.map(function(p){
    var cat=rufCat(p.index);
    return '<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="'+cat.color+'" stroke="var(--bg)" stroke-width="1.5"/>'+
      '<text x="'+p.x+'" y="'+(p.y-9)+'" text-anchor="middle" fill="'+cat.color+'" font-size="10" font-weight="700" font-family="inherit">'+p.index.toFixed(1)+'</text>'+
      '<text x="'+p.x+'" y="'+(pt2+ch+14)+'" text-anchor="middle" fill="var(--text3)" font-size="8" font-family="inherit">'+p.date.slice(5)+'</text>';
  }).join('');

  return '<div style="overflow-x:auto;margin:8px 0"><svg width="100%" viewBox="0 0 '+W+' '+H+'" style="overflow:visible;min-width:280px">'+
    '<defs><linearGradient id="rufFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--red)" stop-opacity=".12"/><stop offset="100%" stop-color="var(--red)" stop-opacity="0"/></linearGradient></defs>'+
    gridLines+
    '<path d="'+area+'" fill="url(#rufFill)"/>'+
    '<path d="'+line+'" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
    dotsSvg+
  '</svg></div>';
}

function buildRuffierSection(cid){
  var tests=getRufTests(cid);
  var lastTest=tests.length?tests[tests.length-1]:null;

  // INPUT FORM
  var form='<div class="ruf-inputs">'+
    '<div class="ruf-input-wrap">'+
      '<label>'+t('rufP1')+'</label>'+
      '<input id="ruf_p1" type="number" inputmode="numeric" placeholder="70" oninput="rufLiveCalc()"/>'+
      '<div class="ruf-sub">'+t('rufP1sub')+'</div>'+
    '</div>'+
    '<div class="ruf-input-wrap">'+
      '<label>'+t('rufP2')+'</label>'+
      '<input id="ruf_p2" type="number" inputmode="numeric" placeholder="130" oninput="rufLiveCalc()"/>'+
      '<div class="ruf-sub">'+t('rufP2sub')+'</div>'+
    '</div>'+
    '<div class="ruf-input-wrap">'+
      '<label>'+t('rufP3')+'</label>'+
      '<input id="ruf_p3" type="number" inputmode="numeric" placeholder="80" oninput="rufLiveCalc()"/>'+
      '<div class="ruf-sub">'+t('rufP3sub')+'</div>'+
    '</div>'+
  '</div>';

  // LIVE RESULT
  var resultRow='<div class="ruf-result" id="ruf_result" style="display:none">'+
    '<div><div class="ruf-idx" id="ruf_idx_val" style="color:var(--text3)">—</div><div class="ruf-idx-lbl">'+t('rufIndex')+'</div></div>'+
    '<div id="ruf_cat_badge"></div>'+
  '</div>';

  // FORMULA
  var formula='<div style="text-align:center;padding:6px;font-size:11px;color:var(--text3);background:var(--bg2);border-radius:var(--rs);margin-bottom:8px">'+
    '📐 '+t('rufFormula')+
  '</div>';

  // DATE + NOTE
  var dateNote='<div style="display:flex;gap:8px;margin:8px 0">'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📅 '+t('date')+'</div><input id="ruf_date" type="date" value="'+today()+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;-webkit-appearance:none"/></div>'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📝 '+t('testNote')+'</div><input id="ruf_note" placeholder="'+t('optional')+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit"/></div>'+
  '</div>';

  // SAVE
  var saveBtn='<button class="btn btnp btnsm" style="width:100%;padding:10px;margin-top:4px" onclick="addRufTest('+cid+')">'+t('rufSave')+'</button>';

  // PROGRESS CHART
  var progressChart=tests.length>=2?'<div style="margin-top:12px"><div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:4px">📈 '+t('rufProgress')+'</div>'+buildRufProgressChart(tests)+'</div>':'';

  // SCALE LEGEND
  var scaleLegend='<div style="margin-top:10px;padding:10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--rs)">'+
    '<div style="font-size:10px;font-weight:700;color:var(--text3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.3px">'+t('rufIndex')+' — Skala</div>'+
    [{min:'≤ 0',k:'rufExcellent',c:'var(--green)'},{min:'0.1 – 5',k:'rufGood',c:'#1a7a2e'},{min:'5.1 – 10',k:'rufAverage',c:'var(--amber)'},{min:'10.1 – 15',k:'rufBelowAvg',c:'#ff6b35'},{min:'> 15',k:'rufPoor',c:'var(--red)'}].map(function(r){
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border)">'+
        '<div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;border-radius:50%;background:'+r.c+'"></div><span style="font-size:12px;color:var(--text)">'+t(r.k)+'</span></div>'+
        '<span style="font-size:11px;color:var(--text3);font-weight:600">'+r.min+'</span>'+
      '</div>';
    }).join('')+
  '</div>';

  // HISTORY
  var history='';
  if(tests.length){
    history=tests.slice().reverse().map(function(te,idx){
      var realIdx=tests.length-1-idx;
      var cat=rufCat(te.index);
      var prevTest=realIdx>0?tests[realIdx-1]:null;

      var diffStr='';
      if(prevTest){
        var diff=te.index-prevTest.index;
        // Lower is better for Ruffier
        if(diff<0)diffStr='<span style="font-size:11px;color:var(--green);font-weight:600"> ↓'+diff.toFixed(1)+' ✓</span>';
        else if(diff>0)diffStr='<span style="font-size:11px;color:var(--red);font-weight:600"> ↑+'+diff.toFixed(1)+'</span>';
        else diffStr='<span style="font-size:11px;color:var(--text3)"> =</span>';
      }

      // Meter bar (lower = better, so invert)
      var meterPct=Math.max(0,Math.min(100,100-te.index*5));

      return '<div class="ruf-hist">'+
        '<div class="ruf-hist-hdr">'+
          '<div><div style="font-size:14px;font-weight:700;color:var(--text)">'+fmtD(te.date)+diffStr+'</div>'+
          (te.note?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+te.note+'</div>':'')+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px">'+
            '<div style="text-align:right"><div style="font-size:20px;font-weight:800;color:'+cat.color+'">'+te.index.toFixed(1)+'</div><span class="ruf-cat-bdg" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+'</span></div>'+
            '<button class="btn btnsm btnr" style="padding:3px 8px;font-size:11px" onclick="window.delRufNow('+cid+','+realIdx+');event.stopPropagation();">×</button>'+
          '</div>'+
        '</div>'+
        '<div class="ruf-meter"><div class="ruf-meter-fill" style="width:'+meterPct+'%;background:'+cat.color+'"></div></div>'+
        '<div class="ruf-vals">'+
          '<div class="ruf-val-chip"><div class="rv-lbl">P1</div><div class="rv-num">'+te.p1+'</div></div>'+
          '<div class="ruf-val-chip"><div class="rv-lbl">P2</div><div class="rv-num">'+te.p2+'</div></div>'+
          '<div class="ruf-val-chip"><div class="rv-lbl">P3</div><div class="rv-num">'+te.p3+'</div></div>'+
        '</div>'+
      '</div>';
    }).join('');
  } else {
    history='<div style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">'+t('rufNoTests')+'</div>';
  }

  return '<div class="profsec">'+
    '<div class="profsect">❤️ '+t('rufTest')+'</div>'+
    '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">'+t('rufDesc')+'</div>'+
    form+
    formula+
    resultRow+
    dateNote+
    saveBtn+
    scaleLegend+
    progressChart+
    '<div style="font-size:13px;font-weight:700;color:var(--text2);margin:16px 0 10px">'+t('rufHistory')+'</div>'+
    history+
  '</div>';
}

// Live calculation as user types
function rufLiveCalc(){
  var p1=Number(document.getElementById('ruf_p1').value)||0;
  var p2=Number(document.getElementById('ruf_p2').value)||0;
  var p3=Number(document.getElementById('ruf_p3').value)||0;
  var resEl=document.getElementById('ruf_result');
  var idxEl=document.getElementById('ruf_idx_val');
  var catEl=document.getElementById('ruf_cat_badge');

  if(p1>0&&p2>0&&p3>0){
    var idx=rufCalc(p1,p2,p3);
    var cat=rufCat(idx);
    resEl.style.display='flex';
    resEl.style.borderColor=cat.color;
    idxEl.textContent=idx.toFixed(1);
    idxEl.style.color=cat.color;
    catEl.innerHTML='<span class="ruf-cat-bdg" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+'</span>';
  } else {
    resEl.style.display='none';
  }
}

function addRufTest(cid){
  var p1=Number(document.getElementById('ruf_p1').value)||0;
  var p2=Number(document.getElementById('ruf_p2').value)||0;
  var p3=Number(document.getElementById('ruf_p3').value)||0;
  if(!p1||!p2||!p3){toast(t('rufEnter'));return;}

  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  if(!clients[i].rufTests)clients[i].rufTests=[];

  var idx=rufCalc(p1,p2,p3);
  var date=document.getElementById('ruf_date').value||today();
  var note=(document.getElementById('ruf_note').value||'').trim();

  clients[i].rufTests.push({date:date,p1:p1,p2:p2,p3:p3,index:idx,note:note});
  sv();
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('ruf',cid);},50);
  toast(t('rufSaved'));
}

window.delRufNow=function(cid,idx){
  if(!confirm(t('confirmTest')))return;
  var ci=clients.findIndex(function(c){return c.id===cid;});
  if(ci>-1&&clients[ci].rufTests){
    clients[ci].rufTests.splice(idx,1);
    sv();
    openProf(cid);
    setTimeout(function(){switchProfTab('tests',cid);switchTestTab('ruf',cid);},50);
    toast(t('rufDeleted'));
  }
};

