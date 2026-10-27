let uiLanguage='pt';
let uiTheme='light';
const english={
  'Votação após as 17h':'Voting after 5 p.m.',
  'VOTAÇÃO · RECORTE POR HORÁRIO':'VOTING · BREAKDOWN BY TIME',
  'Votos registrados após as 17h':'Votes recorded after 5 p.m.',
  'Votos registrados depois das 17h de Brasília no 2º turno de 25/10/2026, conforme levantamento específico do TSE.':'Votes recorded after 5 p.m. Brasília time in the October 25, 2026 runoff, according to a dedicated TSE report.',
  'Abrangência: território nacional. Não inclui o exterior. A fonte não apresenta distribuição desses votos por candidato.':'Coverage: Brazilian territory, excluding votes abroad. The source does not provide a candidate breakdown for these votes.',
  'Total após as 17h':'Total after 5 p.m.',
  'Votos registrados, segundo o levantamento do TSE':'Votes recorded, according to the TSE report',
  'Consultando levantamento oficial…':'Loading the official report…',
  'Votos por faixa de horário':'Votes by time range',
  'Das 17h às 18h':'5 p.m. to 6 p.m.',
  'Das 18h às 19h':'6 p.m. to 7 p.m.',
  'Após as 19h':'After 7 p.m.',
  'votos registrados':'recorded votes',
  'Levantamento publicado pelo TSE em 27/10/2026. Estes dados não são o total geral da eleição nem o total divulgado após as 17h.':'Report published by the TSE on October 27, 2026. These figures are not the overall election total or the total results released after 5 p.m.',
  'A unidade informada pela fonte é votos registrados. Este painel não apresenta uma contagem independente de pessoas únicas.':'The source measures recorded votes. This dashboard does not provide an independent count of unique individuals.',
  'Consultar levantamento oficial do TSE ↗':'Read the official TSE report ↗',
  '↓ Baixar levantamento em JSON':'↓ Download report JSON',
  'Atualização do levantamento':'Report updated',
  'Levantamento do TSE':'TSE report',
  'Recorte de votos registrados após as 17h. Fonte: levantamento do TSE, publicado em 27/10/2026.':'Votes recorded after 5 p.m. Source: TSE report published on October 27, 2026.',
  'Não foi possível carregar o levantamento de votos após as 17h.':'The report on votes recorded after 5 p.m. could not be loaded.',
  'Após as 17h':'After 5 p.m.',
  'Brasil + exterior · após as 17h':'Brazil + abroad · after 5 p.m.',
  'Totalização oficial após as 17h':'Official count after 5 p.m.',
  'Totalização após as 17h':'Vote count after 5 p.m.',
  'DIVULGAÇÃO OFICIAL · HORÁRIO DE BRASÍLIA':'OFFICIAL RESULTS · BRASÍLIA TIME',
  'Totais acumulados divulgados pelo TSE a partir de 25/10/2026, às 17h de Brasília. Inclui Brasil e exterior.':'Cumulative totals published by the TSE from October 25, 2026, at 5 p.m. Brasília time. Includes Brazil and votes abroad.',
  'Esta categoria acompanha a divulgação da apuração; não filtra o horário em que cada eleitor votou.':'This category follows the publication of vote counts; it does not filter the time at which individual voters cast their ballots.',
  'Aguardando arquivo divulgado após as 17h.':'Awaiting a file published after 5 p.m.',
  'Total de votos apurados':'Total votes counted','Válidos, brancos e nulos':'Valid, blank and invalid votes','Disponível a partir das 17h de Brasília':'Available from 5 p.m. Brasília time',
  'Urna Aberta · Eleições 2026':'Urna Aberta · Elections 2026',
  'Apuração':'Results','Mapa por estado':'State map','Localidades':'Locations','Sobre os dados ↗':'About the data ↗','ELEIÇÕES':'ELECTIONS',
  'SEGUNDO TURNO':'RUNOFF ELECTION','25 DE OUTUBRO DE 2026':'OCTOBER 25, 2026','Cada voto,':'Every vote,','em todo lugar.':'everywhere.',
  'Acompanhe a escolha para a Presidência no Brasil e além das fronteiras.':'Follow the presidential election in Brazil and beyond its borders.',
  'Resultados oficiais do TSE ↗':'Official TSE results ↗','◉ Visão geral':'◉ Overview','Brasil':'Brazil','Exterior':'Abroad','Brasil + exterior':'Brazil + abroad','Abrangência':'Coverage',
  'Consultar dados agora':'Check results now','Atualizar dados':'Refresh results','Auto · 60s':'Auto · 60s','Consultando TSE…':'Checking TSE…',
  'Conectando aos arquivos oficiais do TSE…':'Connecting to official TSE files…','Estado':'State','Município ou localidade':'Municipality or location','Todas as localidades':'All locations',
  'Selecione uma localidade para detalhar os votos.':'Select a location to see detailed results.',
  'PRESIDENTE DA REPÚBLICA':'PRESIDENT OF BRAZIL','Aguardando dados':'Awaiting data','das seções totalizadas':'of polling sections counted','Consultando candidaturas oficiais…':'Loading official candidates…',
  'Percentuais sobre votos válidos':'Percentages of valid votes','Fonte: TSE':'Source: TSE','UMA ELEIÇÃO, SEM FRONTEIRAS':'ONE ELECTION, ACROSS BORDERS',
  'O Brasil também':'Brazil votes','vota lá fora.':'abroad, too.','Consulte a totalização dos votos':'Follow the vote count','de brasileiras e brasileiros no exterior.':'of Brazilian voters abroad.',
  'localidades no cadastro TSE':'locations in the TSE register','Explorar exterior':'Explore abroad','Explorar exterior ↗':'Explore abroad ↗',
  'Estatísticas da localidade':'Location statistics','Votos válidos':'Valid votes','Votos em branco':'Blank votes','Votos nulos':'Invalid votes','Abstenções':'Abstentions',
  'O VOTO NO TERRITÓRIO':'THE VOTE ACROSS BRAZIL','O Brasil, estado por estado.':'Brazil, state by state.','Ver todos os percentuais ↓':'See all percentages ↓',
  'Mostrar no mapa':'Map display','Candidato mais votado · % dos votos válidos':'Leading candidate · % of valid votes','Seções totalizadas · % da UF':'Polling sections counted · % of state',
  'Carregando dados das 27 UFs…':'Loading results for all 27 states…','↻ Atualizar mapa':'↻ Refresh map','Mapa interativo dos estados do Brasil':'Interactive map of Brazilian states','Percentuais por unidade da federação':'Percentages by state',
  'Clique ou use Tab e Enter para selecionar uma UF. Percentuais de votos calculados pelo TSE em cada estado.':'Click a state or use Tab and Enter to select it. Vote percentages are calculated by the TSE for each state.',
  'ESTADO SELECIONADO':'SELECTED STATE','Selecione uma UF':'Select a state','Comparar as 27 UFs em tabela':'Compare all 27 states in a table',
  'Resultados: TSE · Malha geográfica simplificada:':'Results: TSE · Simplified geographic boundaries:',
  '. Tons mais escuros indicam percentuais maiores. Cinza indica ausência de votos apurados ou dados indisponíveis. O mapa não inclui o exterior.':'. Darker shades indicate higher percentages. Gray indicates no votes counted or unavailable data. The map excludes votes abroad.',
  'OLHE MAIS DE PERTO':'TAKE A CLOSER LOOK','Um país de muitas escolhas.':'One country, many choices.','Explore por estado ou localidade eleitoral':'Explore by state or electoral location','27 unidades da federação':'26 states + Federal District','Voto para presidente':'Presidential votes',
  'De Lisboa a Tóquio, acompanhe os resultados por localidade eleitoral no cadastro oficial.':'From Lisbon to Tokyo, follow results by electoral location in the official register.',
  'Buscar localidade no exterior':'Search locations abroad','Digite o nome da cidade…':'Enter a city name…','Transparência em cada número.':'Transparency in every number.',
  'Dados dos arquivos oficiais do Tribunal Superior Eleitoral · Eleição federal 6258, 2º turno de 2026. O total nacional inclui o exterior. Cada localidade tem seu próprio horário de atualização. Este é um painel independente.':'Data from official files of Brazil’s Superior Electoral Court (TSE) · Federal election 6258, 2026 runoff. National totals include votes abroad. Each location has its own update time. This is an independent dashboard.',
  'No segundo turno presidencial, vence quem obtiver a maioria dos votos válidos no total nacional, incluindo o exterior; brancos e nulos não entram nessa conta. O painel só anuncia o eleito quando o arquivo nacional do TSE identifica esse candidato. Liderança parcial ou maioria em uma UF não confirma eleição. A diferença exibida é a subtração dos votos dos dois candidatos; p.p. indica pontos percentuais, calculados com a precisão original do TSE e arredondados para duas casas; por isso, a diferença pode divergir em 0,01 p.p. da subtração dos percentuais já arredondados na tela. Antes do início da totalização, zero votos não indica resultado. A divulgação oficial está prevista a partir das 17h de Brasília.':'The presidential runoff is decided by a majority of valid votes nationwide, including votes abroad; blank and invalid votes are excluded. This dashboard announces a winner only when the national TSE file identifies that candidate. A partial lead or a majority in a single state does not confirm election. The vote margin is the difference between the two candidates’ vote counts. Percentage points (pp) use the TSE’s original precision and are rounded to two decimal places, so the margin may differ by 0.01 pp from subtracting the rounded percentages on screen. Zero votes before counting begins do not indicate a result. Official results are scheduled for release from 5 p.m. Brasília time.',
  'Conheça a fonte e a metodologia ↗':'Source and methodology ↗','↓ Baixar JSON da consulta':'↓ Download result JSON','Informação pública. Escolhas que nos conectam.':'Public information. Choices that connect us.','Horários de Brasília · UTC−3':'Brasília time · UTC−3',
  'Idioma':'Language','Tema':'Theme','Claro':'Light','Escuro':'Dark','Alternar tema':'Switch theme',
  'Consultando dados desta localidade…':'Loading results for this location…','Consultando':'Loading','Consultando arquivos oficiais do TSE…':'Checking official TSE files…','Totalização encerrada':'Counting completed','Apuração em andamento':'Counting in progress','Aguardando apuração':'Awaiting count',
  'Aguardando o início da totalização. Os arquivos do TSE ainda não registram votos nesta abrangência. Divulgação a partir das 17h de Brasília.':'Awaiting the vote count. The TSE files do not yet report votes for this area. Results are released from 5 p.m. Brasília time.',
  'Dados indisponíveis':'Data unavailable','Não foi possível consultar os dados desta localidade agora. Tente atualizar ou acesse os resultados oficiais do TSE.':'Results for this location could not be loaded. Try refreshing or visit the official TSE results.',
  'Nenhum resultado carregado.':'No results loaded.','Use o botão ↻ para tentar novamente.':'Use ↻ to try again.','Consulta não concluída':'Check unsuccessful','Eleito segundo o TSE':'Elected according to the TSE','Todo o exterior':'All locations abroad','Todo o estado':'Entire state','Nenhuma localidade encontrada.':'No locations found.','Cadastro de localidades indisponível.':'Location register unavailable.',
  'Ainda não há votos apurados nesta abrangência.':'No votes have been counted for this area yet.','Empate na votação apurada':'Tie in the counted votes','Os dois candidatos têm a mesma quantidade de votos nesta abrangência.':'Both candidates have the same number of votes in this area.',
  'Na liderança no total nacional':'Leading nationwide','Mais votado no total nacional':'Most votes nationwide','Na liderança nesta localidade':'Leading in this location','Mais votado nesta localidade':'Most votes in this location',
  'Sem atribuição de eleito pelo TSE':'No winner assigned by the TSE','O TSE informa que a totalização não atribuiu um eleito. Consulte a situação oficial.':'The TSE reports that the count has not assigned a winner. Check the official status.',
  'Matematicamente eleito segundo o TSE':'Mathematically elected according to the TSE','Disputa matematicamente definida pelo TSE':'Race mathematically decided by the TSE',
  'Aguardando a identificação do candidato eleito no arquivo nacional do TSE.':'Awaiting identification of the elected candidate in the national TSE file.','Aguardando a indicação oficial do eleito pelo TSE.':'Awaiting the official winner designation from the TSE.',
  'Diferença de votos indisponível.':'Vote margin unavailable.','DIFERENÇA ENTRE OS CANDIDATOS':'MARGIN BETWEEN CANDIDATES','Sem votos apurados; não há liderança.':'No votes counted; no candidate is leading.','Empate na votação apurada.':'Tie in the counted votes.',
  'Aguardando votos apurados':'Awaiting counted votes','Candidatura indisponível':'Candidate unavailable','0% → 100% das seções':'0% → 100% of polling sections','Sem apuração / indisponível':'No votes counted / unavailable','Dados desta UF indisponíveis nesta consulta.':'Results for this state are unavailable in this check.',
  'Seções totalizadas':'Polling sections counted','Diferença de votos':'Vote margin','À frente na UF':'Leading in the state','Arquivo TSE (Brasília)':'TSE file (Brasília time)','UF':'State','Indisponível':'Unavailable','Sem apuração':'No votes counted','Empate':'Tie','Mapa indisponível':'Map unavailable','Não foi possível carregar a malha do mapa.':'The map boundaries could not be loaded.'
};

function uiLocale(){return uiLanguage==='en'?'en-US':'pt-BR';}
function translateText(value){
  const source=String(value),text=source.trim();
  if(uiLanguage!=='en')return source;
  let translated=english[text];
  if(translated===undefined){
    const rules=[
      [/^Consulta às (.+)$/,'Checked at $1'],
      [/^Consultar (.+) no painel ↗$/,'View $1 in the dashboard ↗'],[/^Consultar (.+)$/,'View $1'],
      [/^Arquivo TSE: (.+) · (.+) \(Brasília\)$/,'TSE file: $1 · $2 (Brasília time)'],
      [/^Dados oficiais do TSE · (.+)\. Os números refletem a última geração do arquivo, indicada abaixo\.$/,'Official TSE data · $1. Figures reflect the latest file generation shown below.'],
      [/^(.+) tem a maior votação (totalizada\.|apurada até agora\.)/,'$1 has the most votes $2'],
      [/^(.+) à frente de (.+)\.$/,'$1 leads $2.'],
      [/^Consultar (.+) no painel ↗$/,'View $1 in the dashboard ↗'],
      [/^Consultando UFs · (.+)$/,'Checking states · $1'],
      [/^(.+) UFs consultadas às (.+)$/,'$1 states checked at $2'],
      [/^(.+) de (.+) seções$/,'$1 of $2 polling sections'],
      [/^(.+) das seções totalizadas$/,'$1 of polling sections counted']
    ];
    const match=rules.find(([pattern])=>pattern.test(text));
    translated=match?text.replace(match[0],match[1]):text;
    translated=translated
      .replace('apurada até agora.','counted so far.').replace('totalizada.','counted.')
      .replace('Resultado parcial; a vantagem atual não confirma a eleição.','Partial results; the current lead does not confirm election.')
      .replace('A Presidência é definida pelo total nacional, incluindo o exterior.','The presidency is decided by nationwide totals, including votes abroad.')
      .replace(' · Presidência da República · Brasil e exterior.',' · President of Brazil · Brazil and abroad.')
      .replace(' · Há dados indisponíveis',' · Some data is unavailable')
      .replace(' · % dos votos válidos',' · % of valid votes')
      .replace(' dos votos válidos',' of valid votes')
      .replace(' · Eleito segundo o TSE',' · Elected according to the TSE')
      .replace(' às ',' at ').replace(' · Brasília',' · Brasília time')
      .replace(/^Arquivo TSE$/,'TSE file').replace(/\bvotos\b/g,'votes').replace(/\bp\.p\./g,'pp');
    // Full messages can combine a fixed status with an explanatory sentence.
    for(const [pt,en] of Object.entries(english).sort((a,b)=>b[0].length-a[0].length))if(pt.length>12)translated=translated.replaceAll(pt,en);
  }
  return source.replace(text,translated);
}
function localizeHTML(html){return String(html).replace(/(^|>)([^<>]+)(?=<|$)/g,(_,prefix,text)=>prefix+translateText(text));}

function readPreference(key){try{return localStorage.getItem(key);}catch{return null;}}
function savePreference(key,value){try{localStorage.setItem(key,value);}catch{/* Preferences still work when storage is blocked. */}}
function themeIcon(theme){
  const shape=theme==='dark'
    ?'<path d="M20.9 13.2A8.8 8.8 0 0 1 10.8 3.1 8.9 8.9 0 1 0 20.9 13.2Z"/>'
    :'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';
  return '<svg class="preference-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+shape+'</svg>';
}
function setTheme(theme,persist=true){
  uiTheme=theme==='dark'?'dark':'light';
  if(typeof document!=='undefined'){
    document.documentElement.dataset.theme=uiTheme;
    document.documentElement.style.colorScheme=uiTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',uiTheme==='dark'?'#101c19':'#f5f6f0');
    const button=document.getElementById('theme-toggle');
    if(button){
      button.setAttribute('aria-pressed',String(uiTheme==='dark'));
      button.setAttribute('aria-label',translateText('Alternar tema'));
      button.innerHTML=themeIcon(uiTheme);
      const label=document.createElement('span');
      label.textContent=translateText(uiTheme==='dark'?'Escuro':'Claro');
      button.appendChild(label);
    }
  }
  if(persist)savePreference('urna-theme',uiTheme);
}
function setLanguage(language,persist=true,notify=true){
  uiLanguage=language==='en'?'en':'pt';
  if(persist)savePreference('urna-language',uiLanguage);
  if(typeof document!=='undefined'){
    document.documentElement.lang=uiLocale();
    document.title=translateText('Urna Aberta · Eleições 2026');
    applyStaticTranslations();
    const select=document.getElementById('language-select');if(select)select.value=uiLanguage;
    setTheme(uiTheme,false);
    if(notify)window.dispatchEvent(new Event('languagechange'));
  }
}
const staticText=[],staticAttributes=[];
function captureStaticTranslations(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
    if(!node.parentElement.closest('script,style,svg,.brand,#candidates,#election-summary,#map-svg,#map-legend,#map-detail,#map-thead,#map-tbody,#post17-total,#post17-date,#late17,#late18,#late19,#total,#total-note,#scope,#notice,#checked,#status,#generated,#city,#uf,#states,#search-results,#map-updated')&&node.textContent.trim())staticText.push({node,source:node.textContent});
  }
  document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el=>{
    for(const attribute of ['placeholder','aria-label','title'])if(el.hasAttribute(attribute))staticAttributes.push({el,attribute,source:el.getAttribute(attribute)});
  });
}
function applyStaticTranslations(){
  for(const {node,source}of staticText)if(node.isConnected)node.textContent=translateText(source);
  for(const {el,attribute,source}of staticAttributes)if(el.isConnected)el.setAttribute(attribute,translateText(source));
}
if(typeof document!=='undefined'){
  const language=readPreference('urna-language');uiLanguage=language==='en'?'en':'pt';
  const theme=readPreference('urna-theme');setTheme(theme==='dark'||theme==='light'?theme:(window.matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light'),false);
  document.documentElement.lang=uiLocale();
  document.addEventListener('DOMContentLoaded',()=>{
    captureStaticTranslations();setLanguage(uiLanguage,false,false);
    document.getElementById('theme-toggle').onclick=()=>setTheme(uiTheme==='dark'?'light':'dark');
    document.getElementById('language-select').onchange=e=>setLanguage(e.target.value);
  });
}
