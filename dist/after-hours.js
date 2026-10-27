let afterHoursReport=null;

function validateAfterHoursReport(report){
  const ids=['17-18','18-19','after-19'];
  if(report?.kind!=='votes_cast_after_17'||report.electionYear!==2026||report.round!==2||
    report.electionDate!=='2026-10-25'||report.scope!=='BR'||report.unit!=='recorded_votes'||
    report.timeZone!=='America/Sao_Paulo'||!Number.isSafeInteger(report.total)||report.total<0||
    !Array.isArray(report.bands)||report.bands.length!==3||
    report.bands.some((band,index)=>band.id!==ids[index]||!Number.isSafeInteger(band.votes)||band.votes<0)||
    report.bands.reduce((sum,band)=>sum+band.votes,0)!==report.total||
    !String(report.source?.url||'').startsWith('https://www.tse.jus.br/')||
    !Number.isFinite(Date.parse(report.source?.updatedAt))){
    throw Error('Levantamento de votação após as 17h inválido');
  }
  return report;
}

async function updateAfterHours(){
  const id=++requestId;
  busy=true;afterHoursReport=null;data=null;
  $('refresh').disabled=true;$('download').disabled=true;
  ['post17-total','late17','late18','late19'].forEach(key=>$(key).textContent='—');
  $('post17-date').textContent=translateText('Consultando levantamento oficial…');
  $('notice').className='notice';$('notice').textContent=translateText('Consultando levantamento oficial…');
  try{
    const response=await fetch('after-hours-report.json',{cache:'no-cache',signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw Error('HTTP '+response.status);
    const report=validateAfterHoursReport(await response.json());
    if(id!==requestId||tab!=='totalizacao')return;
    afterHoursReport=report;
    $('post17-total').textContent=fmt(report.total);
    ['late17','late18','late19'].forEach((key,index)=>$(key).textContent=fmt(report.bands[index].votes));
    const updated=new Date(report.source.updatedAt);
    const date=updated.toLocaleDateString(uiLocale(),{timeZone:report.timeZone});
    const time=updated.toLocaleTimeString(uiLocale(),{timeZone:report.timeZone,hour:'2-digit',minute:'2-digit',hour12:false});
    $('post17-date').textContent=translateText('Atualização do levantamento')+`: ${date} · ${time} (UTC−3)`;
    $('checked').textContent=translateText('Levantamento do TSE')+` · ${date}`;
    $('notice').textContent=translateText('Recorte de votos registrados após as 17h. Fonte: levantamento do TSE, publicado em 27/10/2026.');
    $('download').disabled=false;
  }catch(error){
    if(id!==requestId||tab!=='totalizacao')return;
    $('notice').className='notice error';
    $('notice').textContent=translateText('Não foi possível carregar o levantamento de votos após as 17h.');
    $('post17-date').textContent=translateText('Dados indisponíveis');
    $('checked').textContent=translateText('Consulta não concluída');
  }finally{
    if(id===requestId){busy=false;$('refresh').disabled=false;}
  }
}

function downloadAfterHours(){
  if(!afterHoursReport)return;
  const blob=new Blob([JSON.stringify(afterHoursReport,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download='tse-votos-registrados-apos-17h-2026.json';link.click();
  setTimeout(()=>URL.revokeObjectURL(url),5000);
}
