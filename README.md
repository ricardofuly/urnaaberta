# Urna Aberta

Painel independente para acompanhar o **segundo turno presidencial de 2026** no Brasil e no exterior. HTML, CSS e JavaScript, sem dependências de execução ou etapa de compilação.

## Executar

Requer Node.js 20 ou superior. Não é necessário instalar pacotes.

```sh
npm start
```

Abra `http://127.0.0.1:4173`. Os arquivos de `dist/` podem ser publicados diretamente em qualquer hospedagem estática. Use HTTP/HTTPS, pois abrir `index.html` via `file://` impede as consultas locais de JSON.

```sh
npm run check
```

Executa a verificação de sintaxe e os testes de cálculos, resultado eleitoral, identidade dos arquivos, dados locais e estados de erro. Os testes usam dados sintéticos e não consultam a internet. O funcionamento do painel depende de conexão ao TSE e de sua política de CORS; o site não utiliza chaves, cookies ou serviços privados para obter resultados.

## Funcionalidades

- Total nacional, incluindo o exterior; filtros por estado, município e localidade eleitoral no exterior.
- Votos dos candidatos, percentuais do TSE, seções totalizadas, votos válidos, brancos, nulos e abstenções.
- Diferença absoluta de votos e diferença em pontos percentuais, com identificação de liderança e empate.
- Mapa das 27 UFs, modos por candidato ou andamento da apuração e tabela comparativa.
- Consulta automática a cada 60 segundos enquanto a página está visível. O mapa se atualiza quando está visível. Até três consultas de UFs são feitas em paralelo.
- Exportação do JSON consultado, com endereço da fonte e horário da consulta.

## Resultado e cálculos

A liderança parcial não determina um presidente eleito. Apenas o arquivo **nacional**, oficial, da eleição `6258`, segundo turno, pode produzir a indicação de eleito. O painel exige a marcação de eleito no candidato (`e=s`) junto com situação final `st=Eleito`, ou a marcação nacional `md=e` durante a totalização. `esae=s` impede qualquer anúncio de eleito. Uma UF, município ou o exterior apenas identifica sua própria liderança ou maior votação. Dados de outro turno, eleição, ambiente, abrangência ou com campos obrigatórios ausentes são rejeitados.

O painel não faz projeções e não calcula um vencedor a partir de 50% dos votos parciais, da quantidade de estados ou da porcentagem de seções apuradas. Pendências eleitorais e desempate são resolvidos pelo TSE; o painel reproduz a atribuição oficial.

A diferença de votos usa a subtração dos votos dos candidatos ordenados por votação. A diferença de pontos percentuais utiliza `pvapn` (precisão original do TSE), com `pvap` como alternativa, e é arredondada para duas casas ao exibir. Pode diferir em 0,01 p.p. da subtração dos percentuais já arredondados. Os campos de votos e percentuais são reproduzidos conforme o leiaute EA20 do TSE.

Cada arquivo pode ter um horário de geração diferente. O horário de **consulta** não significa que o TSE gerou novos resultados; a data e hora do **arquivo** são exibidas separadamente. Erros de rede e arquivos indisponíveis exibem ausência de dados, nunca resultados fictícios. O cadastro de localidades e a malha são estáticos; os resultados são obtidos diretamente do TSE em cada consulta.

## Fontes

- [Documentação técnica do TSE e códigos das eleições de 2026](https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados)
- [Leiaute EA20 — resultado unificado](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/divulgacao-de-resultados/tse-ea20-arquivo-de-resultado-unificado)
- Resultados: `https://resultados.tse.jus.br/oficial/ele2026/6258/dados/{uf}/{uf}{municipio}-c0001-e006258-u.json` (use `br` no nacional e `zz` para exterior; município opcional, cinco dígitos).
- Cadastro: `https://resultados.tse.jus.br/oficial/ele2026/6258/config/mun-e006258-cm.json`, obtido em 25/10/2026.
- [Malhas simplificadas do IBGE](https://servicodados.ibge.gov.br/api/docs/malhas?versao=3), convertidas para os contornos SVG de `dist/mapa-uf.json`. Os rótulos dos estados menores usam linhas de chamada.
- Fontes tipográficas DM Sans e Manrope pelo Google Fonts, com fontes de sistema como alternativa.

## Estrutura

```text
dist/               Site estático completo
  app.js            Consultas e filtros
  result.js         Validação, resultado e diferenças
  map.js            Mapa e tabela das UFs
  localidades.json  Cadastro oficial de localidades
  mapa-uf.json      Contornos e posições dos rótulos
scripts/serve.mjs   Servidor local sem dependências
tests/              Testes automatizados
```

Este projeto está configurado para uma eleição específica; para outro ano ou cargo, atualize e valide os identificadores, a documentação, o cadastro e as regras. Não representa o TSE. Consulte os [resultados oficiais](https://resultados.tse.jus.br/oficial/app/index.html).

## Tema e idioma

Os controles no cabeçalho alternam entre português/inglês e tema claro/escuro. O idioma inicial é português; o tema inicial acompanha a preferência do sistema. As escolhas são salvas localmente no navegador (chaves `urna-language` e `urna-theme`). Quando o armazenamento é bloqueado, os controles continuam funcionando durante a visita. Dados e nomes oficiais do TSE são preservados; números e textos da interface acompanham o idioma.

## Total de votos apurados

O cartão de total, os detalhes do mapa e a tabela das UFs usam o campo oficial `v.tv` do TSE, incluindo válidos, brancos e nulos, e acompanham a localidade selecionada. A exibição é liberada a partir de 25/10/2026 às 17h de Brasília (UTC−3), permanecendo disponível nos dias seguintes. Zero votos é exibido como zero; um campo ausente é tratado como dado indisponível.
