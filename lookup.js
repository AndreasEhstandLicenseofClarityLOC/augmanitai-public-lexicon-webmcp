/* Local adapter; original public records retain their source licences. */
(function(root){
'use strict';
const norm=s=>s.normalize('NFKC').trim().toLocaleLowerCase('en');
function createLookup(records){
 const frozen=JSON.parse(JSON.stringify(records));
 return function(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['query','language'].includes(k)))throw new Error('Invalid input object');
  const {query,language='en'}=input;
  if(typeof query!=='string'||!query.trim()||query.length>200||!['de','en'].includes(language))throw new Error('query:1–200 characters; language:de/en');
  const q=norm(query), hits=frozen.filter(r=>[r.id,r.term_en,r.term_de,r.term_de_as_published,...(r.alternate_names||[])].filter(x=>typeof x==='string').some(x=>norm(x)===q));
  return {status:hits.length?'found':'not_found',scope:'Published author terminology; not diagnosis or scientific consensus.',matches:hits.map(r=>({id:r.id,term:r['term_'+language]||null,definition:r['definition_'+language]||null,language_status:r['definition_'+language]?'available':'not_published',source_doi:r.source_doi,source_url:r.source_url,license_url:r.license_url,attribution:r.attribution,original_record:JSON.parse(JSON.stringify(r))}))};
 };
}
async function register(context,lookup){
 if(!context||typeof context.registerTool!=='function')return {registered:false,reason:'WebMCP unavailable; human lookup remains usable'};
 const tool={name:'lookup_published_augmanitai_term',description:'Read an exact term from 56 published CC-BY author records with original definition, attribution and source. No diagnosis, translation generation or consensus validation.',inputSchema:{type:'object',properties:{query:{type:'string',minLength:1,maxLength:200},language:{type:'string',enum:['de','en']}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true,consequentialHint:false},execute:async input=>JSON.stringify(lookup(input))};
 await context.registerTool(tool);return {registered:true,name:tool.name};
}
root.PublicLookup={createLookup,register};
})(globalThis);
