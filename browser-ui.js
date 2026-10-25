'use strict';
const lookup=PublicLookup.createLookup(PUBLIC_RECORDS);
const out=document.getElementById('answer');
function render(data){
 out.replaceChildren(); document.getElementById('result').textContent=JSON.stringify(data,null,2);
 if(!data.matches.length){out.textContent='Kein exakter Treffer. Bitte einen veröffentlichten Begriff oder seine Kennung verwenden.';return;}
 for(const m of data.matches){
  const title=document.createElement('h2');title.textContent=m.term||m.id;out.append(title);
  const definition=document.createElement('p');definition.textContent=m.definition||'In dieser Sprache ist keine Definition veröffentlicht. Es wurde nichts automatisch übersetzt.';out.append(definition);
  const credit=document.createElement('p');credit.textContent=m.attribution||'Attribution siehe Originaldatensatz';out.append(credit);
  for(const [label,url] of [['Originalquelle',m.source_url],['Lizenz',m.license_url]]){if(typeof url==='string'&&/^https:\/\//.test(url)){const a=document.createElement('a');a.textContent=label;a.href=url;a.rel='noopener noreferrer';out.append(a,document.createTextNode(' · '));}}
  const doi=document.createElement('small');doi.textContent='DOI: '+(m.source_doi||'nicht angegeben');out.append(doi);
 }
}
document.getElementById('lookup').addEventListener('submit',e=>{e.preventDefault();try{render(lookup({query:document.getElementById('query').value,language:document.getElementById('language').value}));}catch(e){out.textContent=e.message;}});
const registration=PublicLookup.register(document.modelContext,lookup).then(r=>{document.getElementById('capability').textContent=r.registered?'WebMCP-Werkzeug registriert. Nativer Aufruf noch separat zu prüfen.':'Normale Suche bereit. WebMCP ist in diesem Browser nicht verfügbar.';return r;}).catch(e=>{document.getElementById('capability').textContent='Registrierung fehlgeschlagen; normale Suche bleibt verfügbar.';return {registered:false,error:e.message};});
document.getElementById('native-test').addEventListener('click',async()=>{
 const report={at:new Date().toISOString(),status:'NOT_RUN',secureContext:window.isSecureContext,registration:await registration};
 try{
  const context=document.modelContext;
  if(!report.registration.registered||!context||typeof context.getTools!=='function'||typeof context.executeTool!=='function'){report.status='UNAVAILABLE';report.reason='Native Registrierung, getTools oder executeTool fehlt. Keine Browserflags automatisch geändert.';}
  else{
   const tools=await context.getTools();const tool=tools.find(t=>t.name==='lookup_published_augmanitai_term');
   if(!tool)throw new Error('Registriertes Werkzeug nicht entdeckt');
   const raw=await context.executeTool(tool,{query:'Nachstille',language:'en'});
   const data=typeof raw==='string'?JSON.parse(raw):raw;
   const expected=lookup({query:'Nachstille',language:'en'});
   if(JSON.stringify(data)!==JSON.stringify(expected))throw new Error('Native Antwort stimmt nicht mit Originaldaten überein');
   report.status='PASS_NATIVE_DISCOVERY_AND_EXECUTION';report.tool=tool.name;report.match=data.matches[0].id;report.doi=data.matches[0].source_doi;report.scope='Dieser lokale Aufruf; keine externe Agentenintegration oder andere Browser geprüft.';render(data);
  }
 }catch(e){report.status='FAILED';report.error=e.message;}
 document.getElementById('native-result').textContent=JSON.stringify(report,null,2);
});
render(lookup({query:'Nachstille',language:'en'}));
