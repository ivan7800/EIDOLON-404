import {paintRegionTile, paintCreature} from './art.js';
// Fase 8 — Aldea de Ceniza: vertical slice de campaña, sin recursos externos.
const TILE=24;
const grid=[
'####################',
'#...............#..#',
'#..hh.....hh.......#',
'#..hh.....hh.......#',
'#..................#',
'#......###.........#',
'#......#.#.........#',
'#......###.........#',
'#..................#',
'#..hh........hh....#',
'#..hh........hh....#',
'####################'];
const dist=(p,o)=>Math.hypot(p.x-(o.x+.5)*TILE,p.y-(o.y+.5)*TILE);
export class AshVillage {
 constructor(){this.reset()}
 reset(){this.active=false;this.fractured=false;this.emblem=false;this.beacon=false;this.won=false;this.enemy={x:350,y:153,hp:4,cool:0,inv:0};this.attackCool=0;this.slash=0;}
 enter(player){this.active=true;this.fractured=false;player.x=72;player.y=190;player.dir=1;}
 solid(x,y,realm=this.fractured){let tx=Math.floor(x/TILE),ty=Math.floor(y/TILE);if(tx<0||ty<0||tx>=20||ty>=12)return true;const c=grid[ty][tx];return c==='#'||(c==='h'&&!realm)}
 canStand(x,y,realm=this.fractured){return ![[x-7,y-7],[x+7,y-7],[x-7,y+7],[x+7,y+7]].some(([a,b])=>this.solid(a,b,realm))}
 shift(player){if(!this.canStand(player.x,player.y,!this.fractured))return 'La realidad te atraparía entre las casas.';this.fractured=!this.fractured;return this.fractured?'La aldea muestra sus cenizas futuras.':'La aldea recupera su antigua luz.'}
 interact(player){const stone={x:13,y:3},beacon={x:9,y:4},villager={x:3,y:7};
 if(dist(player,stone)<36){if(!this.fractured)return {text:'La marca solo puede leerse en la Fractura.'};if(this.emblem)return {text:'La marca ya forma parte de tus recuerdos.'};this.emblem=true;return {text:'SIGILO DE CENIZA RECOGIDO',journal:['Sigilo de Ceniza','En el futuro muerto apareció una marca que nunca fue grabada en el pasado.']}}
 if(dist(player,beacon)<40){if(this.fractured)return {text:'El faro está apagado en esta realidad.'};if(!this.emblem)return {text:'Una inscripción exige el sigilo que aún no existe.'};if(!this.beacon){this.beacon=true;return {text:'FARO RESTAURADO · LA ALDEA RECUERDA',journal:['El faro despierta','Las brasas regresaron al faro sin quemar ninguna casa.']}}if(!this.won){this.won=true;return {text:'La Aldea de Ceniza recuerda tu nombre.',victory:true}}}
 if(dist(player,villager)<35){return {dialog:[['ALMA · LA ÚLTIMA VECINA','Cada casa conserva una cena que nadie llegó a terminar.'],['ALMA','Al este hay una marca que todavía no ha sucedido. Tráela al faro del Presente.']]}}
 return {text:'Solo el viento recuerda las calles.'}}
 attack(player,audio){if(this.attackCool>0)return false;this.attackCool=.3;this.slash=.17;const e=this.enemy,dx=e.x-player.x,dy=e.y-player.y,vec=[[0,-1],[1,0],[0,1],[-1,0]][player.dir];if(this.fractured&&e.hp>0&&e.inv<=0&&Math.hypot(dx,dy)<48&&dx*vec[0]+dy*vec[1]>0){e.hp--;e.inv=.25;audio.tone(520,.08,'triangle')}else audio.tone(240,.08,'triangle');return true}
 update(dt,player,combat){this.attackCool=Math.max(0,this.attackCool-dt);this.slash=Math.max(0,this.slash-dt);const e=this.enemy;e.cool=Math.max(0,e.cool-dt);e.inv=Math.max(0,e.inv-dt);if(!this.fractured||e.hp<=0)return;const dx=player.x-e.x,dy=player.y-e.y,len=Math.hypot(dx,dy);if(len>20&&len<140){const x=e.x+dx/len*28*dt,y=e.y+dy/len*28*dt;if(this.canStand(x,y)){e.x=x;e.y=y}}if(len<23&&e.cool===0&&combat.invuln<=0){combat.hp=Math.max(0,combat.hp-1);combat.invuln=1;e.cool=1.2}}
 draw(c,player,t){const f=this.fractured;c.fillStyle=f?'#201f35':'#303e39';c.fillRect(0,0,480,270);for(let y=0;y<12;y++)for(let x=0;x<20;x++){let tile=grid[y][x],px=x*TILE,py=y*TILE;c.fillStyle=tile==='#'?(f?'#58435d':'#495850'):tile==='h'?(f?'#504053':'#786552'):((x+y)%3===0?(f?'#302740':'#3c5147'):(f?'#2b253b':'#34473e'));if(!paintRegionTile(c,'village',tile==='h'?'building':tile==='#'?'wall':'floor',x,y,f))c.fillRect(px,py,24,24);if(tile==='h'){c.fillStyle=f?'#88729a':'#a88b72';c.fillRect(px+3,py+4,18,3);c.fillStyle=f?'#18162a':'#392f34';c.fillRect(px+8,py+12,8,10)}else if(tile==='.'){c.fillStyle=f?'#554565':'#667a5d';c.fillRect(px+5,py+8,2,3)}else{c.fillStyle='#222432';c.fillRect(px+3,py+3,18,3)}}
 const symbol=(x,y,color)=>{c.fillStyle='#0d1020';c.fillRect(x-11,y-11,22,22);c.strokeStyle=color;c.lineWidth=2;c.strokeRect(x-9,y-9,18,18);c.fillStyle=color;c.fillRect(x-4,y-4,8,8)};
 if(!this.emblem&&f)symbol(13.5*24,3.5*24,'#a4c7e9');symbol(9.5*24,4.5*24,this.beacon?'#e8ce88':'#8f7380');
 symbol(3.5*24,7.5*24,'#bd8f78');c.fillStyle='#f3dfc0';c.font='10px monospace';c.fillText('ALMA',66,157);
 if(f&&this.enemy.hp>0){c.fillStyle=this.enemy.inv>0?'#e9d7ff':'#aa7395';c.fillRect(this.enemy.x-9,this.enemy.y-12,18,24);c.fillStyle='#ffe9dd';c.fillRect(this.enemy.x-4,this.enemy.y-5,8,3)}
 if(f&&this.enemy.hp>0)paintCreature(c,'ash',this.enemy.x,this.enemy.y,t,{invulnerable:this.enemy.inv>0});/* Character drawn once by shared art renderer */
 if(this.slash>0){c.strokeStyle='#ffe8bb';c.lineWidth=3;c.beginPath();c.arc(player.x,player.y,22,-1,1);c.stroke()}
 c.fillStyle='#10131be9';c.fillRect(4,247,472,19);c.fillStyle='#e8d2af';c.font='10px monospace';c.fillText(`ALDEA DE CENIZA · ${f?'FRACTURA':'PRESENTE'} · SIGILO ${this.emblem?'✓':'—'} · FARO ${this.beacon?'✓':'—'}`,10,260)}
 snapshot(){return {active:this.active,fractured:this.fractured,emblem:this.emblem,beacon:this.beacon,won:this.won,enemy:{...this.enemy}}}
 restore(d){this.reset();if(!d||typeof d!=='object')return;for(const k of ['active','fractured','emblem','beacon','won'])this[k]=d[k]===true;if(d.enemy&&Number.isFinite(d.enemy.x)&&Number.isFinite(d.enemy.y)){this.enemy={...this.enemy,x:Math.max(30,Math.min(450,d.enemy.x)),y:Math.max(30,Math.min(230,d.enemy.y)),hp:Math.max(0,Math.min(4,Number(d.enemy.hp)||0))}}}
}
