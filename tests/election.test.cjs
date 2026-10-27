const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'../dist');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,'i18n.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8').split('function clearView')[0],context);
vm.runInContext(fs.readFileSync(path.join(root,'result.js'),'utf8'),context);
function fixture(a=510,b=490,extra={},candidate={}){
  return {tpabr:'br',cdabr:'br',ele:'6258',t:'2',f:'o',dv:'s',tf:'n',and:'p',s:{ts:'100',st:'20',pst:'20,00'},v:{tv:String(a+b+5),vv:String(a+b),vb:'2',tvn:'3'},e:{a:'4'},...extra,carg:[{cd:'1',agr:[{par:[
    {sg:'A',cand:[{n:'13',nmu:'Candidato A',vap:String(a),pvap:String(a/(a+b||1)*100),e:'n',...candidate}]},
    {sg:'B',cand:[{n:'22',nmu:'Candidato B',vap:String(b),pvap:String(b/(a+b||1)*100),e:'n'}]}
  ]}]}]};
}
const result=d=>context.electionResult(d);
const validate=d=>context.validateElectionData(d,{region:'br'});
test('51% em apuração parcial não confirma eleito',()=>assert.equal(result(fixture()).winner,null));
test('diferença absoluta independe da ordem das candidaturas',()=>{
  assert.equal(result(fixture()).margin,20);
  const r=result(fixture(400,600));assert.equal(r.margin,200);assert.equal(r.list[0].n,'22');
});
test('diferença percentual usa a precisão original do TSE',()=>{
  const d=fixture(193574,142169);
  const c=d.carg[0].agr[0].par;c[0].cand[0].pvap='57,66';c[1].cand[0].pvap='42,34';
  c[0].cand[0].pvapn='57.655413750';c[1].cand[0].pvapn='42.344586250';
  assert.ok(Math.abs(result(d).pointMargin-15.3108275)<1e-8);
  assert.match(context.voteMarginHTML(d),/51\.405 votos/);assert.match(context.voteMarginHTML(d),/15,31 p.p./);
});
test('confirma marcação matemática nacional do TSE',()=>{
  const r=result(fixture(600,400,{md:'e'},{e:'s'}));assert.equal(r.winner.n,'13');assert.match(r.heading,/Matematicamente eleito/);
});
test('confirma eleito final explicitamente atribuído pelo TSE',()=>assert.equal(result(fixture(600,400,{tf:'s',and:'f'},{e:'s',st:'Eleito'})).winner.n,'13'));
test('totalização final sozinha não atribui eleito',()=>assert.equal(result(fixture(600,400,{tf:'s',and:'f'})).winner,null));
test('marcação de eleito isolada aguarda confirmação',()=>assert.equal(result(fixture(600,400,{}, {e:'s'})).winner,null));
test('situação contraditória Não eleito não anuncia vitória',()=>assert.equal(result(fixture(600,400,{md:'e'},{e:'s',st:'Não eleito'})).winner,null));
test('arquivo matematicamente definido sem candidato identificado não escolhe o líder',()=>assert.equal(result(fixture(600,400,{md:'e'})).winner,null));
test('esae=s impede anúncio de eleito',()=>assert.equal(result(fixture(600,400,{esae:'s',tf:'s'},{e:'s',st:'Eleito'})).winner,null));
test('UF, município e exterior não elegem presidente isoladamente',()=>{
  for(const [tpabr,cdabr]of [['uf','ba'],['mu','71072'],['uf','zz']])assert.equal(result(fixture(600,400,{tpabr,cdabr,md:'e'},{e:'s'})).winner,null);
});
test('ambiente simulado, primeiro turno ou outra eleição não elegem',()=>{
  for(const extra of [{f:'s'},{t:'1'},{ele:'6257'},{dv:'n'}])assert.equal(result(fixture(600,400,{md:'e',...extra},{e:'s'})).winner,null);
});
test('empate durante a apuração não declara um vencedor',()=>{const r=result(fixture(500,500));assert.equal(r.margin,0);assert.equal(r.winner,null);assert.match(r.heading,/Empate/);});
test('zero votos não produz liderança',()=>{const r=result(fixture(0,0));assert.equal(r.winner,null);assert.equal(r.heading,'Aguardando apuração');assert.match(context.voteMarginHTML(fixture(0,0)),/não há liderança/);});
test('HTML de nomes não é interpretado no resumo',()=>{
  const d=fixture(600,400,{}, {nmu:'<img src=x onerror=alert(1)>'});const h=context.voteMarginHTML(d);assert.ok(!h.includes('<img'));assert.ok(h.includes('&lt;'));
});
test('validação aceita o nacional e rejeita arquivos trocados',()=>{
  assert.equal(validate(fixture()).ele,'6258');
  for(const extra of [{f:'s'},{t:'1'},{ele:'6257'},{dv:'n'},{tpabr:'uf',cdabr:'sp'}])assert.throws(()=>validate(fixture(510,490,extra)));
});
test('validação exige a localidade municipal solicitada',()=>{
  const d=fixture(0,0,{tpabr:'mu',cdabr:'71072'});
  assert.doesNotThrow(()=>context.validateElectionData(d,{region:'sp',city:'71072'}));
  assert.throws(()=>context.validateElectionData(d,{region:'sp',city:'60011'}));
});
test('dados incompletos, contagens negativas e percentuais inválidos são rejeitados',()=>{
  const bad=[fixture(510,490,{e:undefined}),fixture(510,490,{s:{ts:'10',st:'11',pst:'110'}}),fixture(510,490,{}, {vap:'-1'}),fixture(510,490,{}, {pvap:'NaN'})];
  for(const d of bad)assert.throws(()=>validate(d));
});
test('cor da candidatura permanece estável após inversão da liderança',()=>{
  assert.equal(context.candidateColor('13',fixture(600,400)),context.candidateColor('13',fixture(400,600)));
  assert.notEqual(context.candidateColor('13',fixture()),context.candidateColor('22',fixture()));
});
test('cadastros contêm 27 UFs, exterior e códigos únicos de localidades',()=>{
  const {abr}=JSON.parse(fs.readFileSync(path.join(root,'localidades.json'),'utf8'));
  assert.equal(abr.length,28);assert.equal(new Set(abr.map(a=>a.cd)).size,28);assert.ok(abr.find(a=>a.cd==='zz').mu.length>0);
  for(const a of abr){assert.equal(new Set(a.mu.map(m=>m.cd)).size,a.mu.length);for(const m of a.mu)assert.match(m.cd,/^[0-9]{5}$/);}
});
test('mapa possui 27 contornos, rótulos dentro do viewBox e UFs corretas',()=>{
  const shapes=JSON.parse(fs.readFileSync(path.join(root,'mapa-uf.json'),'utf8'));
  assert.equal(shapes.length,27);assert.equal(new Set(shapes.map(s=>s.uf)).size,27);
  const stateCodes=vm.runInContext('states.map(s=>s[0])',context);
  for(const s of shapes){assert.ok(stateCodes.includes(s.uf));assert.ok(s.d.startsWith('M'));assert.ok(!s.d.includes('NaN'));assert.ok(s.label[0]>=0&&s.label[0]<=710&&s.label[1]>=0&&s.label[1]<=655);}
});
test('documento referencia apenas arquivos locais existentes e não duplica IDs',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
  for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const p=match[1];if(!/^(https?:|data:)/.test(p)&&p!=='./')assert.ok(fs.existsSync(path.join(root,p)),p);}
  assert.ok(html.indexOf('src="result.js"')<html.indexOf('src="app.js"'));
});

test('total fica oculto antes das 17h de Brasília e é liberado exatamente às 17h',()=>{const d=fixture();assert.equal(context.countedVotes(d,Date.parse('2026-10-25T16:59:59-03:00')),null);assert.equal(context.countedVotes(d,Date.parse('2026-10-25T17:00:00-03:00')),1005);});
test('total usa o campo tv do TSE e permanece disponível nos dias seguintes',()=>{const d=fixture();d.v.tv='2000';assert.equal(context.countedVotes(d,Date.parse('2026-10-27T08:00:00-03:00')),2000);});
test('total zero é distinto de total ausente',()=>{const d=fixture(0,0);d.v.tv='0';assert.equal(context.countedVotes(d,Date.parse('2026-10-25T21:00:00Z')),0);delete d.v.tv;assert.equal(context.countedVotes(d,Date.parse('2026-10-25T21:00:00Z')),null);assert.throws(()=>validate(d));});

test('aba Após as 17h consulta o nacional sem afetar filtros regionais',()=>{assert.equal(context.isNationalTab('totalizacao'),true);assert.equal(context.isNationalTab('geral'),true);assert.equal(context.isNationalTab('exterior'),false);assert.equal(context.isNationalTab('brasil'),false);});
test('categoria Após as 17h aceita somente arquivos oficiais nacionais publicados após o início da divulgação',()=>{const d=fixture(510,490,{dg:'25/10/2026',hg:'17:00:00'});const now=Date.parse('2026-10-27T08:00:00-03:00');assert.equal(context.isPost17Publication(d,now),true);assert.equal(context.isPost17Publication({...d,hg:'16:59:59'},now),false);assert.equal(context.isPost17Publication({...d,dg:'24/10/2026'},now),false);assert.equal(context.isPost17Publication({...d,tpabr:'uf',cdabr:'sp'},now),false);assert.equal(context.isPost17Publication({...d,f:'s'},now),false);assert.equal(context.isPost17Publication({...d,dg:''},now),false);assert.equal(context.isPost17Publication(d,Date.parse('2026-10-25T16:59:59-03:00')),false);});
