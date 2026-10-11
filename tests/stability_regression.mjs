// Logic tests with a minimal DOM: does not certify rendering or a browser session.
import assert from 'node:assert/strict';
import {validSnapshot,SAVE_KEY} from '../js/progression.js';
const elements=new Map(),listeners={};
function element(){const classes=new Set();return {textContent:'',dataset:{},style:{setProperty(){}},classList:{add(...v){v.forEach(x=>classes.add(x))},remove(...v){v.forEach(x=>classes.delete(x))},contains(x){return classes.has(x)},toggle(x,b){if(b)classes.add(x);else classes.delete(x)}},setAttribute(){},addEventListener(){},append(){},replaceChildren(){},focus(){},querySelector(){return element()},querySelectorAll(){return []},getContext(){return {}}};}
globalThis.document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id)},querySelectorAll(){return []},addEventListener(){},createElement:element,documentElement:element()};
globalThis.window={addEventListener(t,f){listeners[t]=f}};
globalThis.requestAnimationFrame=()=>{};globalThis.matchMedia=()=>({matches:false});
const storage=new Map();globalThis.localStorage={setItem(k,v){storage.set(k,v)},getItem(k){return storage.get(k)??null},removeItem(k){storage.delete(k)}};
await import('../js/main.js');const game=window.__eidolon;
function key(code,target={}){let prevented=false;listeners.keydown({code,target,repeat:false,preventDefault(){prevented=true}});listeners.keyup?.({code});return prevented;}
game.begin();game.interact();game.interact();assert.equal(game.state,'playing');
assert.equal(key('Tab'),false,'Tab must keep native focus navigation');
key('KeyB');assert.equal(game.state,'journal');
const input={closest:s=>s==='input,textarea,select'?{}:null};
for(const code of ['KeyB','Space','ArrowLeft','KeyM']){assert.equal(key(code,input),false);assert.equal(game.state,'journal');}
assert.equal(key('Escape',input),true);assert.equal(game.state,'playing');
const button={closest:s=>s==='button'?{}:null};
assert.equal(key('Space',button),false);assert.equal(key('Enter',button),false);
assert(game.saveGame());const good=game.snapshot();assert(validSnapshot(good));
const mutations=[d=>d.narrative.met={},d=>d.dungeon.enemies=[null],d=>d.player.dir=8,d=>d.quest=7,d=>d.player.x=Infinity,d=>d.combat.hp=2.5,d=>d.combat.enemies=[{x:10,y:10,hp:NaN}],d=>d.dungeon.room=9];
for(const mutate of mutations){const d=structuredClone(good);mutate(d);const before=game.snapshot();assert.equal(game.applySnapshot(d),false);assert.deepEqual(game.snapshot(),before,'invalid saves must not reset the current game');}
const bad=structuredClone(good);bad.narrative.met={};storage.set(SAVE_KEY,JSON.stringify({version:1,data:bad}));assert.equal(game.loadGame(),false);assert.deepEqual(game.snapshot(),good);
assert(game.saveGame());game.moveTo(145,185);assert(game.loadGame());assert.deepEqual(game.player,good.player);
// Check generated snapshots and round-trips in every region, including optional v1 fields.
for(const start of ['startTemple','startVillage','startMarsh','startCity','startFortress','startSanctuary']){
 game[start]();for(let i=0;i<10&&game.state==='dialog';i++)game.interact();
 const snap=game.snapshot();assert(validSnapshot(snap),start);assert(game.saveGame(),start);assert(game.loadGame(),start);
}
const older=structuredClone(good);delete older.narrative.met;for(const name of ['rewards','secrets','letters','regionalStories'])delete older[name];assert(game.applySnapshot(older),'optional fields in older v1 saves');
console.log('PASS: keyboard/input isolation, native Tab/button keys, invalid saves non-destructive, v1 compatibility, save/load in 7 regions (simulated DOM).');
