// DE-3C: Progression is derived from milestones; no random drops or soft locks.
export const REWARD_DEFS=Object.freeze([
 {id:'first-echo',name:'Recuerdo del despertar',description:'Recoge los tres ecos del bosque.',kind:'lore'},
 {id:'temple-heart',name:'Corazón del templo',description:'Completa el Templo de las Horas Rotos. +1 vitalidad máxima.',kind:'heart'},
 {id:'village-heart',name:'Luz de las cenizas',description:'Restaura el faro de la aldea. +1 vitalidad máxima.',kind:'heart'},
 {id:'hunter',name:'Marca del caminante',description:'Derrota a tres sombras del bosque. Recupera vitalidad.',kind:'heal'},
 {id:'marsh-memory',name:'Eco de las marismas',description:'Libera la campana sumergida.',kind:'lore'},
 {id:'city-memory',name:'Nombre rescatado',description:'Restaura el reloj de las mareas.',kind:'lore'},
 {id:'fortress-memory',name:'Confesión de Aster',description:'Devuelve la sexta hora a la fortaleza.',kind:'lore'}
]);
const all=new Set(REWARD_DEFS.map(x=>x.id));
export class Rewards{
 constructor(){this.reset()}
 reset(){this.unlocked=new Set()}
 restore(data){this.unlocked=new Set(Array.isArray(data)?data.filter(id=>all.has(id)):[])}
 snapshot(){return [...this.unlocked]}
 grant(id){if(!all.has(id)||this.unlocked.has(id))return null;this.unlocked.add(id);return REWARD_DEFS.find(x=>x.id===id)}
 get vitalityBonus(){return Number(this.unlocked.has('temple-heart'))+Number(this.unlocked.has('village-heart'))}
}
