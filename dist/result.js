// The election outcome is read from the official national TSE file.
// Local vote rankings and vote margins never independently declare a president elected.
function electionResult(d){
  const list=candidateList(d),first=list[0],second=list[1];
  const total=list.reduce((sum,c)=>sum+num(c.vap),0);
  const margin=second?Math.abs(num(first.vap)-num(second.vap)):null;
  const pointMargin=second?Math.abs(num(first.pvapn??first.pvap)-num(second.pvapn??second.pvap)):null;
  const national=d.tpabr==='br'&&d.cdabr==='br'&&d.ele==='6258'&&d.t==='2'&&d.f==='o'&&d.dv==='s';
  const elected=list.filter(c=>c.e==='s'&&(
    String(c.st||'').trim().toLowerCase()==='eleito'||
    (d.md==='e'&&d.tf!=='s'&&!String(c.st||'').trim())
  ));
  let winner=null,heading='Aguardando apuração',message='Ainda não há votos apurados nesta abrangência.';
  if(total>0){
    if(margin===0){heading='Empate na votação apurada';message='Os dois candidatos têm a mesma quantidade de votos nesta abrangência.';}
    else if(first){heading=(d.and==='f'?'Mais votado':'Na liderança')+(national?' no total nacional':' nesta localidade');message=title(first.nmu||first.nm)+' tem a maior votação '+(d.and==='f'?'totalizada.':'apurada até agora.');}
  }
  if(national){
    if(d.esae==='s'){heading='Sem atribuição de eleito pelo TSE';message='O TSE informa que a totalização não atribuiu um eleito. Consulte a situação oficial.';}
    else if(total>0&&elected.length===1){winner=elected[0];heading=d.md==='e'&&d.tf!=='s'?'Matematicamente eleito segundo o TSE':'Eleito segundo o TSE';message=title(winner.nmu||winner.nm)+' · Presidência da República · Brasil e exterior.';}
    else if(d.md==='e'){heading='Disputa matematicamente definida pelo TSE';message='Aguardando a identificação do candidato eleito no arquivo nacional do TSE.';}
    else if(d.and==='f'||d.tf==='s'){heading='Totalização encerrada';message='Aguardando a indicação oficial do eleito pelo TSE.';}
    else if(total>0&&margin!==0){message+=' Resultado parcial; a vantagem atual não confirma a eleição.';}
  }else{message+=' A Presidência é definida pelo total nacional, incluindo o exterior.';}
  return {list,total,margin,pointMargin,national,winner,heading,message};
}
function voteMarginHTML(d){const r=electionResult(d);if(r.margin===null)return localizeHTML('<div class="vote-margin">Diferença de votos indisponível.</div>');const pp=r.pointMargin.toLocaleString(uiLocale(),{minimumFractionDigits:2,maximumFractionDigits:2});return localizeHTML(`<div class="vote-margin"><span>DIFERENÇA ENTRE OS CANDIDATOS</span><strong>${fmt(r.margin)} votos <small>· ${pp} p.p.</small></strong><p>${r.total===0?'Sem votos apurados; não há liderança.':r.margin===0?'Empate na votação apurada.':`${safe(title(r.list[0].nmu||r.list[0].nm))} à frente de ${safe(title(r.list[1].nmu||r.list[1].nm))}.`}</p></div>`); }
function outcomeHTML(d){const r=electionResult(d);return localizeHTML(`<div class="election-outcome${r.winner?' confirmed':''}"><span>${safe(r.heading)}</span><p>${safe(r.message)}</p></div>`);}

// Reject incomplete, simulated, other-election or other-locality files instead
// of rendering absent fields as zero or displaying an unrelated result.
function validateElectionData(d,{region,city=''}){
  const integer=x=>/^[0-9]+$/.test(String(x))&&Number.isSafeInteger(Number(x));
  const percent=x=>/^[0-9]+([.,][0-9]+)?$/.test(String(x))&&num(x)>=0&&num(x)<=100;
  const expectedType=city?'mu':region==='br'?'br':'uf';
  const expectedCode=city||region;
  if(!d||d.ele!=='6258'||d.t!=='2'||d.f!=='o'||d.dv!=='s'||
    d.tpabr!==expectedType||String(d.cdabr).toLowerCase()!==expectedCode||
    !['n','p','f'].includes(d.and)||!d.s||!d.v||!d.e||
    !integer(d.s.ts)||!integer(d.s.st)||num(d.s.st)>num(d.s.ts)||!percent(d.s.pst)||
    !integer(d.v.tv)||!integer(d.v.vv)||!integer(d.v.vb)||!integer(d.v.tvn??d.v.vn)||!integer(d.e.a)){
    throw Error('Arquivo oficial incompleto ou de outra abrangência');
  }
  const list=candidateList(d);
  if(list.length!==2||new Set(list.map(c=>c.n)).size!==2||
    list.some(c=>!integer(c.vap)||!percent(c.pvap)||!(c.nmu||c.nm))){
    throw Error('Votação das candidaturas indisponível');
  }
  return d;
}

function candidateColor(number,d){
  const order=candidateList(d).map(c=>c.n).sort((a,b)=>num(a)-num(b));
  return ['#cf4545','#637da3'][Math.max(0,order.indexOf(number))];
}

// Release time of this election, expressed with Brasília's UTC−3 offset.
// Once released, totals stay visible on the following days as well.
function totalsReleased(now=Date.now()){
  return Number(now)>=Date.parse('2026-10-25T17:00:00-03:00');
}
function countedVotes(d,now=Date.now()){
  if(!totalsReleased(now))return null;
  const value=d?.v?.tv;
  return /^[0-9]+$/.test(String(value))&&Number.isSafeInteger(Number(value))?Number(value):null;
}

