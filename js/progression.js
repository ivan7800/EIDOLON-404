// Save version 1 remains readable. Validate before changing the running game.
export const SAVE_KEY='eidolon404.save.v1';
const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const finite=(v,min,max)=>Number.isFinite(v)&&v>=min&&v<=max;
const optional=(obj,key,test)=>obj[key]===undefined||test(obj[key]);
const entity=e=>record(e)&&finite(e.x,0,480)&&finite(e.y,0,270)&&finite(e.hp,0,100)&&Object.entries(e).every(([k,v])=>!['__proto__','constructor','prototype'].includes(k)&&(typeof v==='number'?Number.isFinite(v):typeof v==='string'||typeof v==='boolean'));
export function validSnapshot(d){
 if(!record(d)||!record(d.player)||!record(d.temporal)||!record(d.narrative)||!record(d.dungeon))return false;
 if(!finite(d.player.x,0,480)||!finite(d.player.y,0,270)||!optional(d.player,'dir',v=>Number.isInteger(v)&&v>=0&&v<=3)||!optional(d.player,'walk',v=>finite(v,0,1e9)))return false;
 if(!Number.isInteger(d.quest)||d.quest<0||d.quest>5||!Array.isArray(d.collected)||!d.collected.every(v=>Number.isInteger(v)&&v>=0&&v<3))return false;
 if(!Array.isArray(d.narrative.entries)||!d.narrative.entries.every(e=>record(e)&&['id','title','body'].every(k=>typeof e[k]==='string'))||!optional(d.narrative,'met',v=>Array.isArray(v)&&v.every(x=>typeof x==='string')))return false;
 if(!Array.isArray(d.dungeon.plated)||d.dungeon.plated.length!==2||!d.dungeon.plated.every(v=>typeof v==='boolean')||!Number.isInteger(d.dungeon.room)||d.dungeon.room<0||d.dungeon.room>3)return false;
 if(!optional(d.dungeon,'enemies',v=>Array.isArray(v)&&v.every(entity))||!optional(d.dungeon,'boss',entity))return false;
 if(!optional(d,'combat',v=>record(v)&&optional(v,'hp',x=>Number.isInteger(x)&&x>=0&&x<=100)&&optional(v,'kills',x=>Number.isInteger(x)&&x>=0&&x<=1e7)&&optional(v,'enemies',x=>Array.isArray(x)&&x.every(entity))))return false;
 for(const key of ['village','marsh','city','fortress','sanctuary']){
  const r=d[key];if(r===undefined)continue;if(!record(r))return false;
  for(const name of ['enemy','boss','sentry','sentinel','echo'])if(!optional(r,name,entity))return false;
 }
 return true;
}
export function storeSnapshot(data){try{if(!validSnapshot(data))return false;localStorage.setItem(SAVE_KEY,JSON.stringify({version:1,savedAt:new Date().toISOString(),data}));return true}catch{return false}}
export function readSnapshot(){try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return null;const saved=JSON.parse(raw);return saved?.version===1&&validSnapshot(saved.data)?saved.data:null}catch{return null}}
export function removeSnapshot(){try{localStorage.removeItem(SAVE_KEY);return true}catch{return false}}
