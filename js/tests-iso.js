// // --- CLIENT TESTING ----------------------------------------
var editingIsoIdx=null; // {cid,idx} kad se izmena testa

function getTests(cid){
  var c=cob(cid);
  return (c&&c.isoTests)?c.isoTests:[];
}

window.editIsoTest=function(cid,idx){
  editingIsoIdx={cid:cid,idx:idx};
  openProf(cid);
  setTimeout(function(){
    switchProfTab('tests',cid);switchTestTab('iso',cid);
    var tests=getTests(cid),te=tests[idx];
    if(!te)return;
    ISO_EXERCISES.forEach(function(ex){
      var d=te.data&&te.data[ex.key];
      var e1=document.getElementById('iso_'+ex.key+'_1');
      var e2=document.getElementById('iso_'+ex.key+'_2');
      var e3=document.getElementById('iso_'+ex.key+'_3');
      if(e1)e1.value=d&&d.v1?d.v1:'';
      if(e2)e2.value=d&&d.v2?d.v2:'';
      if(e3)e3.value=d&&d.v3?d.v3:'';
    });
    var dEl=document.getElementById('iso_date');if(dEl)dEl.value=te.date||today();
    var nEl=document.getElementById('iso_note');if(nEl)nEl.value=te.note||'';
    if(dEl)dEl.scrollIntoView({behavior:'smooth',block:'center'});
  },120);
};

window.cancelIsoEdit=function(cid){
  editingIsoIdx=null;
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('iso',cid);},50);
};

var ISO_EXERCISES=[
  {key:'vp',name:'Vertical Pull',icon:'🔼',sides:false},
  {key:'kpR',name:'Kvadriceps Pull (D)',icon:'🦵',sides:false},
  {key:'kpL',name:'Kvadriceps Pull (L)',icon:'🦵',sides:false},
  {key:'zlR',name:'Zadnja Loza (D)',icon:'🦿',sides:false},
  {key:'zlL',name:'Zadnja Loza (L)',icon:'🦿',sides:false},
  {key:'pr',name:'Prednje Rame',icon:'🏋️',sides:false},
  {key:'bi',name:'Biceps',icon:'💪',sides:false},
  {key:'sq',name:'Čučanj sa Pojasom',icon:'🏋️',sides:false},
  {key:'sk',name:'Sklek',icon:'👐',sides:false}
];

function isoExName(ex){
  var k=ex.key;
  if(k==='vp')return t('isoEx_vp');
  if(k==='pr')return t('isoEx_pr');
  if(k==='bi')return t('isoEx_bi');
  if(k==='sq')return t('isoEx_sq');
  if(k==='sk')return t('isoEx_sk');
  if(k==='kpR')return t('isoEx_kp')+' ('+t('sideR')+')';
  if(k==='kpL')return t('isoEx_kp')+' ('+t('sideL')+')';
  if(k==='zlR')return t('isoEx_zl')+' ('+t('sideR')+')';
  if(k==='zlL')return t('isoEx_zl')+' ('+t('sideL')+')';
  return ex.name||k;
}

function isoPairLabel(key){
  if(key==='kp')return t('isoEx_kp');
  if(key==='zl')return t('isoEx_zl');
  return key;
}

function buildTestSection(cid){
  var tests=getTests(cid);

  // FORM: each exercise has 3 attempts
  var formRows=ISO_EXERCISES.map(function(ex){
    var exNm=isoExName(ex);
    return '<div style="display:flex;align-items:center;gap:5px;margin-bottom:5px">'+
      '<div style="font-size:11px;font-weight:600;color:var(--text);width:100px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="'+exNm+'">'+ex.icon+' '+exNm+'</div>'+
      '<input id="iso_'+ex.key+'_1" type="number" step="any" inputmode="decimal" placeholder="1." style="flex:1;min-width:0;padding:6px 2px;font-size:13px;border:1px solid var(--border2);border-radius:4px;background:var(--bg2);color:var(--text);font-family:inherit;text-align:center"/>'+
      '<input id="iso_'+ex.key+'_2" type="number" step="any" inputmode="decimal" placeholder="2." style="flex:1;min-width:0;padding:6px 2px;font-size:13px;border:1px solid var(--border2);border-radius:4px;background:var(--bg2);color:var(--text);font-family:inherit;text-align:center"/>'+
      '<input id="iso_'+ex.key+'_3" type="number" step="any" inputmode="decimal" placeholder="3." style="flex:1;min-width:0;padding:6px 2px;font-size:13px;border:1px solid var(--border2);border-radius:4px;background:var(--bg2);color:var(--text);font-family:inherit;text-align:center"/>'+
    '</div>';
  }).join('');

  // HISTORY
  var history='';
  if(tests.length){
    history=tests.slice().reverse().map(function(te,idx){
      var realIdx=tests.length-1-idx;

      // --- RESULTS TABLE (Avg + Max per exercise) ---
      var tableRows=ISO_EXERCISES.map(function(ex){
        var d=te.data&&te.data[ex.key];
        if(!d)return '';
        var avg=d.avg||0;
        var maxV=Math.max(d.v1||0,d.v2||0,d.v3||0);
        return '<tr>'+
          '<td style="padding:5px 6px;font-size:12px;color:var(--text);white-space:nowrap">'+ex.icon+' '+isoExName(ex)+'</td>'+
          '<td style="padding:5px 4px;font-size:11px;color:var(--text3);text-align:center">'+(d.v1||'—')+'</td>'+
          '<td style="padding:5px 4px;font-size:11px;color:var(--text3);text-align:center">'+(d.v2||'—')+'</td>'+
          '<td style="padding:5px 4px;font-size:11px;color:var(--text3);text-align:center">'+(d.v3||'—')+'</td>'+
          '<td style="padding:5px 6px;font-size:12px;font-weight:700;color:var(--red);text-align:center">'+avg.toFixed(1)+'</td>'+
          '<td style="padding:5px 6px;font-size:12px;font-weight:700;color:var(--green);text-align:center">'+maxV+'</td>'+
        '</tr>';
      }).filter(function(r){return r;}).join('');

      var resultsTable='<div style="overflow-x:auto;margin-bottom:12px">'+
        '<table style="width:100%;border-collapse:collapse;border:1px solid var(--border);border-radius:var(--rs);overflow:hidden;font-family:inherit">'+
          '<thead><tr style="background:var(--bg2)">'+
            '<th style="padding:6px;font-size:11px;color:var(--text2);text-align:left;font-weight:700">'+t('colExercise')+'</th>'+
            '<th style="padding:6px;font-size:10px;color:var(--text3);text-align:center;font-weight:600">1.</th>'+
            '<th style="padding:6px;font-size:10px;color:var(--text3);text-align:center;font-weight:600">2.</th>'+
            '<th style="padding:6px;font-size:10px;color:var(--text3);text-align:center;font-weight:600">3.</th>'+
            '<th style="padding:6px;font-size:11px;color:var(--red);text-align:center;font-weight:700">'+t('colAvg')+'</th>'+
            '<th style="padding:6px;font-size:11px;color:var(--green);text-align:center;font-weight:700">'+t('colMax')+'</th>'+
          '</tr></thead>'+
          '<tbody>'+tableRows+'</tbody>'+
        '</table>'+
      '</div>';

      // --- DISBALANCE ANALYSIS (D vs L) ---
      var pairs=[
        {nameR:'kpR',nameL:'kpL',pairKey:'kp'},
        {nameR:'zlR',nameL:'zlL',pairKey:'zl'}
      ];
      var disbalanceRows=pairs.map(function(pair){
        var dR=te.data&&te.data[pair.nameR];
        var dL=te.data&&te.data[pair.nameL];
        if(!dR&&!dL)return '';
        var avgR=dR?dR.avg:0;
        var avgL=dL?dL.avg:0;
        var maxR=dR?Math.max(dR.v1||0,dR.v2||0,dR.v3||0):0;
        var maxL=dL?Math.max(dL.v1||0,dL.v2||0,dL.v3||0):0;
        var bigger=avgR>=avgL?t('sideR'):t('sideL');
        var diff=Math.abs(avgR-avgL);
        var maxAvg=Math.max(avgR,avgL);
        var pct=maxAvg>0?Math.round(diff/maxAvg*100):0;
        var barR=maxAvg>0?Math.round(avgR/maxAvg*100):0;
        var barL=maxAvg>0?Math.round(avgL/maxAvg*100):0;
        var status=pct<=5?t('disbExcellent'):pct<=10?t('disbOK'):pct<=15?t('disbModerate'):t('disbSignificant');
        var statusCol=pct<=5?'var(--green)':pct<=10?'var(--amber)':pct<=15?'#e65100':'var(--red)';
        var statusBg=pct<=5?'var(--gbg)':pct<=10?'var(--abg)':pct<=15?'#fff3e0':'var(--redbg)';

        return '<div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--rs);padding:10px 12px;margin-bottom:8px">'+
          '<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:8px">'+isoPairLabel(pair.pairKey)+'</div>'+
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'+
            '<div style="width:24px;font-size:11px;font-weight:700;color:var(--text2)">'+t('sideR')+'</div>'+
            '<div style="flex:1;height:20px;background:var(--bg3);border-radius:4px;overflow:hidden;position:relative">'+
              '<div style="height:100%;width:'+barR+'%;background:var(--red);border-radius:4px;transition:width .3s"></div>'+
            '</div>'+
            '<div style="width:55px;font-size:13px;font-weight:700;color:var(--text);text-align:right">'+avgR.toFixed(1)+' kg</div>'+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'+
            '<div style="width:24px;font-size:11px;font-weight:700;color:var(--text2)">'+t('sideL')+'</div>'+
            '<div style="flex:1;height:20px;background:var(--bg3);border-radius:4px;overflow:hidden;position:relative">'+
              '<div style="height:100%;width:'+barL+'%;background:#1a56db;border-radius:4px;transition:width .3s"></div>'+
            '</div>'+
            '<div style="width:55px;font-size:13px;font-weight:700;color:var(--text);text-align:right">'+avgL.toFixed(1)+' kg</div>'+
          '</div>'+
          '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:'+statusBg+';border-radius:var(--rs)">'+
            '<div style="font-size:12px;color:'+statusCol+';font-weight:600">'+status+'</div>'+
            '<div style="font-size:12px;color:'+statusCol+'">'+t('disbDiff')+': '+diff.toFixed(1)+' kg ('+pct+'%) — '+bigger+' '+t('disbStronger')+'</div>'+
          '</div>'+
        '</div>';
      }).filter(function(r){return r;}).join('');

      var disbalanceSection=disbalanceRows?
        '<div style="margin-top:4px;margin-bottom:4px">'+
          '<div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px">'+t('disbHeader')+'</div>'+
          disbalanceRows+
        '</div>':'';

      return '<div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--rs);padding:12px;margin-bottom:12px">'+
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'+
          '<div><div style="font-size:14px;font-weight:700;color:var(--text)">'+fmtD(te.date)+'</div>'+
          (te.note?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+te.note+'</div>':'')+
          '</div>'+
          '<div style="display:flex;gap:6px">'+
            '<button class="btn btnsm" style="padding:3px 8px;font-size:11px" onclick="window.editIsoTest('+cid+','+realIdx+');event.stopPropagation();">'+t('editBtn')+'</button>'+
            '<button class="btn btnsm btnr" style="padding:3px 8px;font-size:11px" onclick="window.delTestNow('+cid+','+realIdx+');event.stopPropagation();">×</button>'+
          '</div>'+
        '</div>'+
        resultsTable+
        disbalanceSection+
      '</div>';
    }).join('');
  } else {
    history='<div style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">'+t('noTests')+'</div>';
  }

  return '<div class="profsec">'+
    '<div class="profsect">🧪 '+t('testing')+'</div>'+
    '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">'+t('isoDesc')+'</div>'+
    formRows+
    '<div style="display:flex;gap:8px;margin-bottom:6px">'+
      '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📅 '+t('date')+'</div><input id="iso_date" type="date" value="'+today()+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;-webkit-appearance:none"/></div>'+
      '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📝 '+t('testNote')+'</div><input id="iso_note" placeholder="'+t('optional')+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit"/></div>'+
    '</div>'+
    (editingIsoIdx&&editingIsoIdx.cid===cid?
      '<div style="background:var(--abg);border:1px solid var(--amber);border-radius:var(--rs);padding:8px 12px;margin-top:6px;font-size:12px;color:var(--amber);font-weight:600;text-align:center">'+t('isoEditing')+' '+(getTests(cid)[editingIsoIdx.idx]?fmtD(getTests(cid)[editingIsoIdx.idx].date):'')+'</div>'+
      '<div style="display:flex;gap:6px;margin-top:6px">'+
        '<button class="btn btnsm" style="flex:1;padding:10px" onclick="window.cancelIsoEdit('+cid+')">'+t('cancelBtn')+'</button>'+
        '<button class="btn btnp btnsm" style="flex:2;padding:10px" onclick="addTest('+cid+')">'+t('saveEdit')+'</button>'+
      '</div>'
    :
      '<button class="btn btnp btnsm" style="width:100%;padding:10px;margin-top:6px" onclick="addTest('+cid+')">'+t('addTest')+'</button>'
    )+
    '<div style="font-size:13px;font-weight:700;color:var(--text2);margin:16px 0 10px">'+t('testHistory')+'</div>'+
    history+
  '</div>';
}

function addTest(cid){
  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  if(!clients[i].isoTests)clients[i].isoTests=[];
  var data={};
  var hasVal=false;
  ISO_EXERCISES.forEach(function(ex){
    var v1=Number(document.getElementById('iso_'+ex.key+'_1').value)||0;
    var v2=Number(document.getElementById('iso_'+ex.key+'_2').value)||0;
    var v3=Number(document.getElementById('iso_'+ex.key+'_3').value)||0;
    if(v1||v2||v3){
      var cnt=(v1?1:0)+(v2?1:0)+(v3?1:0);
      var avg=cnt?(v1+v2+v3)/cnt:0;
      data[ex.key]={v1:v1,v2:v2,v3:v3,avg:avg};
      hasVal=true;
    }
  });
  if(!hasVal){toast(t('enterTest'));return;}
  var date=document.getElementById('iso_date').value||today();
  var note=(document.getElementById('iso_note').value||'').trim();
  var isEditing=editingIsoIdx&&editingIsoIdx.cid===cid&&clients[i].isoTests[editingIsoIdx.idx];
  if(isEditing){
    clients[i].isoTests[editingIsoIdx.idx]={date:date,data:data,note:note};
    editingIsoIdx=null;
  } else {
    clients[i].isoTests.push({date:date,data:data,note:note});
  }
  sv();
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('iso',cid);},50);
  toast(isEditing?t('isoEditSaved'):t('testSaved'));
}


window.delTestNow=function(cid,idx){
  if(!confirm(t('confirmTest')))return;
  var ci=clients.findIndex(function(c){return c.id===cid;});
  if(ci>-1&&clients[ci].isoTests){
    clients[ci].isoTests.splice(idx,1);
    sv();
    openProf(cid);
    setTimeout(function(){switchProfTab('tests',cid);switchTestTab('iso',cid);},50);
    toast(t('testDeleted'));
  }
};
