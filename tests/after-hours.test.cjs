const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'../dist');
const report=JSON.parse(fs.readFileSync(path.join(root,'after-hours-report.json'),'utf8'));
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,'after-hours.js'),'utf8'),context);
const validate=value=>context.validateAfterHoursReport(value);
test('recorte oficial soma apenas os votos registrados depois das 17h',()=>{
  assert.equal(validate(report).total,34393);
  assert.deepEqual(report.bands.map(b=>b.votes),[32399,1981,13]);
  assert.equal(report.bands.reduce((sum,b)=>sum+b.votes,0),report.total);
  assert.equal(report.scope,'BR');assert.equal(report.unit,'recorded_votes');
});
test('recorte rejeita total geral e dados de outra abrangência',()=>{
  assert.throws(()=>validate({v:{tv:'128000000'}}));
  for(const changes of [{scope:'ZZ'},{unit:'unique_voters'},{electionYear:2022},{total:128000000}])assert.throws(()=>validate({...report,...changes}));
});
test('faixas inconsistentes e fonte não oficial são rejeitadas',()=>{
  for(const votes of [-1,1.5,null])assert.throws(()=>validate({...report,bands:[{...report.bands[0],votes},...report.bands.slice(1)]}));
  assert.throws(()=>validate({...report,bands:report.bands.slice(1)}));
  assert.throws(()=>validate({...report,source:{...report.source,url:'https://example.com/'}}));
});
