// DE-4C: two completely optional regional stories. No dependency on mandatory puzzle state.
const DEFINITIONS={
 village:{npc:{x:3.5*24,y:7.5*24},item:{x:12.5*24,y:8.5*24},title:'Las cenizas de una promesa',keeper:'ALMA',object:'MEDALLÓN DE HOLLÍN',choices:[{value:'restore',label:'Devolverlo a Alma',reply:'Alma aprieta el medallón en silencio. Después abre las ventanas de la casa.'},{value:'release',label:'Enterrarlo bajo el fresno',reply:'Alma recoge tierra con ambas manos y planta una semilla junto al recuerdo.'}]},
 marsh:{npc:{x:3.5*24,y:7.5*24},item:{x:8.5*24,y:8.5*24},title:'El mapa que olvidó el agua',keeper:'NERA',object:'MAPA BORRADO',choices:[{value:'restore',label:'Entregarlo a Nera',reply:'Nera extiende el mapa húmedo y deja sin tinta los lugares que todavía no ha visitado.'},{value:'release',label:'Dejarlo partir con la corriente',reply:'Nera mira cómo se aleja el papel. Luego marca un camino nuevo sobre la orilla.'}]}
};
const validStages=['unstarted','searching','found','complete'];
export class RegionalStories {
 constructor(){this.reset()}
 reset(){this.data={village:{stage:'unstarted',ending:null},marsh:{stage:'unstarted',ending:null}}}
 snapshot(){return {village:{...this.data.village},marsh:{...this.data.marsh}}}
 restore(source){this.reset();for(const key of Object.keys(DEFINITIONS)){const x=source?.[key];if(!x||!validStages.includes(x.stage))continue;this.data[key].stage=x.stage;this.data[key].ending=x.stage==='complete'&&['restore','release'].includes(x.ending)?x.ending:null;if(x.stage==='complete'&&!this.data[key].ending)this.data[key].stage='found'}}
 interact(key,player,fractured){const def=DEFINITIONS[key],s=this.data[key];if(!def)return null;
  const distance=p=>Math.hypot(player.x-p.x,player.y-p.y);
  if(s.stage==='searching'&&distance(def.item)<29){if(!fractured)return {text:'Este objeto solo tiene forma en la Fractura.'};s.stage='found';return {kind:'found',title:def.title,text:def.object+' ENCONTRADO'}}
  if(distance(def.npc)>32)return null;
  if(s.stage==='unstarted'){s.stage='searching';return {kind:'started',title:def.title,text:def.keeper+': Hay algo que el tiempo me arrebató. Búscalo en la Fractura, al este de aquí.'}}
  if(s.stage==='searching')return {text:def.keeper+': Aún lo veo al este, cuando el mundo se rompe.'};
  if(s.stage==='found'){if(fractured)return {text:'Regresa al Presente para decidir el destino del recuerdo.'};return {kind:'choose',title:def.title,options:def.choices}}
  return {text:s.ending==='restore'?def.choices[0].reply:def.choices[1].reply};
 }
 choose(key,value){const s=this.data[key],d=DEFINITIONS[key];if(!d||s.stage!=='found'||!['restore','release'].includes(value))return null;s.stage='complete';s.ending=value;return d.choices.find(c=>c.value===value).reply}
 draw(ctx,key,fractured,time){const d=DEFINITIONS[key],s=this.data[key];if(!d)return;ctx.save();
  if(s.stage==='searching'&&fractured){const {x,y}=d.item;ctx.shadowColor='#c59df7';ctx.shadowBlur=8+Math.sin(time*3)*4;ctx.fillStyle=key==='village'?'#e8c28c':'#b5d6e8';ctx.fillRect(x-7,y-5,14,10);ctx.fillStyle='#55405b';ctx.fillRect(x-2,y-3,4,6)}
  if(s.stage==='complete'){const {x,y}=d.npc;if(s.ending==='restore'&&!fractured){ctx.fillStyle='#dfc179';ctx.fillRect(x+13,y-12,5,12);ctx.fillStyle='#ffedac';ctx.beginPath();ctx.arc(x+15,y-15,4+Math.sin(time*3),0,Math.PI*2);ctx.fill()}else if(s.ending==='release'){ctx.fillStyle=fractured?'#bc9bdc':'#bbd6a3';for(let i=0;i<4;i++){const xx=x+17+i*7,yy=y-18+Math.sin(time*1.7+i)*4;ctx.fillRect(xx,yy,3,2)}}}
 ctx.restore()}
}
