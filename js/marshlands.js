import {paintRegionTile, paintCreature} from './art.js';
// Fase 8B — Las Marismas del Olvido. Sin dependencias remotas.
const MARSH_TILE=24;
const rows=[
'####################',
'#..................#',
'#..~~....~~~.......#',
'#..~~....~~~..~~...#',
'#.............~~...#',
'#....####..........#',
'#....#..#..........#',
'#....####....~~....#',
'#............~~....#',
'#..~~~.............#',
'#..~~~.............#',
'####################'];
const range=(p,x,y)=>Math.hypot(p.x-x*MARSH_TILE,p.y-y*MARSH_TILE);
export class Marshlands {
 constructor(){this.reset()}
 reset(){this.active=false;this.fractured=false;this.lantern=false;this.reeds=false;this.bell=false;this.won=false;this.enemy={x:395,y:170,hp:5,inv:0,cool:0};this.attackCool=0;this.slash=0;}
 enter(player){this.active=true;this.fractured=false;player.x=73;player.y=180;player.dir=1;}
 solid(x,y,realm=this.fractured){const tx=Math.floor(x/MARSH_TILE),ty=Math.floor(y/MARSH_TILE);if(tx<0||ty<0||tx>=20||ty>=12)return true;const t=rows[ty][tx];return t==='#'||(t==='~'&&!realm&&!this.reeds)}
 canStand(x,y,realm=this.fractured){return ![[x-7,y-7],[x+7,y-7],[x-7,y+7],[x+7,y+7]].some(v=>this.solid(...v,realm))}
 shift(p){if(!this.canStand(p.x,p.y,!this.fractured))return 'No puedes cruzar: el barro te encerraría.';this.fractured=!this.fractured;return this.fractured?'La ciénaga revela los pasos de los olvidados.':'El agua vuelve a cubrir los senderos.'}
 interact(p){if(range(p,14.5,3.5)<35){if(!this.fractured)return {text:'Una lámpara sin luz, atrapada tras el agua.'};if(this.lantern)return {text:'La lámpara ya te acompaña.'};this.lantern=true;return {text:'LÁMPARA DE LOS AUSENTES RECUPERADA',journal:['La lámpara de los ausentes','Su llama solo existe en la hora fracturada.']}}
 if(range(p,9.5,4.5)<39){if(this.fractured)return {text:'Los juncos no conservan forma en la Fractura.'};if(!this.lantern)return {text:'El paso sumergido necesita una luz que el Presente no conoce.'};if(!this.reeds){this.reeds=true;return {text:'PASARELA DE JUNCOS RECONSTRUIDA',journal:['El paso de los juncos','La lámpara permitió tejer un sendero sobre el agua.']}}return {text:'La pasarela permanece sobre las aguas.'}}
 if(range(p,16.5,8.5)<37){if(!this.reeds)return {text:'Una campana hundida espera un camino entre los juncos.'};if(this.fractured)return {text:'El bronce no existe en esta hora.'};if(this.enemy.hp>0)return {text:'El custodio del limo todavía protege la campana.'};if(!this.bell){this.bell=true;return {text:'CAMPANA SUMERGIDA LIBERADA',journal:['La campana sumergida','Su sonido reveló el camino hacia la ciudad que olvidó el mar.']}}if(!this.won){this.won=true;return {text:'Las marismas recuerdan sus nombres.',victory:true}}}
 if(range(p,3.5,7.5)<34)return {dialog:[['NERA · CARTÓGRAFA','Los senderos desaparecen al amanecer. Antes los dibujaba; ahora solo dibujo ausencias.'],['NERA','Busca la lámpara al noreste en la Fractura. Con su fuego podrás reconstruir el paso de los juncos.']]};
 return {text:'El agua susurra palabras que nadie reconoce.'}}
 attack(p,audio){if(this.attackCool>0)return false;this.attackCool=.29;this.slash=.17;const e=this.enemy,dx=e.x-p.x,dy=e.y-p.y,vec=[[0,-1],[1,0],[0,1],[-1,0]][p.dir];if(this.fractured&&e.hp>0&&e.inv<=0&&Math.hypot(dx,dy)<49&&dx*vec[0]+dy*vec[1]>0){e.hp--;e.inv=.25;audio.tone(420,.08,'triangle')}else audio.tone(230,.08,'triangle');return true}
 update(dt,p,combat){this.attackCool=Math.max(0,this.attackCool-dt);this.slash=Math.max(0,this.slash-dt);const e=this.enemy;e.cool=Math.max(0,e.cool-dt);e.inv=Math.max(0,e.inv-dt);if(!this.fractured||e.hp<=0)return;const dx=p.x-e.x,dy=p.y-e.y,len=Math.hypot(dx,dy);if(len>21&&len<145){const x=e.x+dx/len*35*dt,y=e.y+dy/len*35*dt;if(this.canStand(x,y)){e.x=x;e.y=y}}if(len<24&&e.cool<=0&&combat.invuln<=0){combat.hp=Math.max(0,combat.hp-1);combat.invuln=1;e.cool=1.25}}
 draw(c,p,time){const f=this.fractured;c.fillStyle=f?'#111e30':'#203a38';c.fillRect(0,0,480,270);for(let y=0;y<12;y++)for(let x=0;x<20;x++){const t=rows[y][x],px=x*MARSH_TILE,py=y*MARSH_TILE;c.fillStyle=t==='#'?(f?'#454364':'#425148'):t==='~'?(f?'#454a72':this.reeds?'#717d58':'#23566a'):(f?'#2e3a4d':'#426050');if(!paintRegionTile(c,'marsh',t==='~'?'water':t==='#'?'wall':'floor',x,y,f))c.fillRect(px,py,24,24);if(t==='~'){c.fillStyle=f?'#9a9cc7':this.reeds?'#c4a979':'#5b95a2';c.fillRect(px+4,py+9+(Math.floor(time*2+x)%2),13,2)}else if(t==='.'){c.fillStyle=f?'#64718b':'#849f6e';c.fillRect(px+7,py+11,2,5);c.fillRect(px+13,py+6,1,4)}else{c.fillStyle='#192931';c.fillRect(px+2,py+4,20,4)}}
 const symbol=(x,y,col)=>{c.fillStyle='#121725';c.fillRect(x-10,y-10,20,20);c.strokeStyle=col;c.lineWidth=2;c.strokeRect(x-8,y-8,16,16);c.fillStyle=col;c.fillRect(x-3,y-3,6,6)};
 symbol(3.5*MARSH_TILE,7.5*MARSH_TILE,'#c3b8a0');symbol(9.5*MARSH_TILE,4.5*MARSH_TILE,this.reeds?'#e2bc7c':'#807e88');if(f&&!this.lantern)symbol(14.5*MARSH_TILE,3.5*MARSH_TILE,'#a2d8ed');symbol(16.5*MARSH_TILE,8.5*MARSH_TILE,this.bell?'#f5d88c':'#8497ad');
 c.fillStyle='#efe6ce';c.font='10px monospace';c.fillText('NERA',70,155);if(f&&this.enemy.hp>0){c.fillStyle=this.enemy.inv?'#eef1ff':'#7993a0';c.fillRect(this.enemy.x-10,this.enemy.y-13,20,25);c.fillStyle='#b2d8e7';c.fillRect(this.enemy.x-4,this.enemy.y-4,8,3)}
 if(f&&this.enemy.hp>0)paintCreature(c,'marsh',this.enemy.x,this.enemy.y,time,{invulnerable:this.enemy.inv>0});/* Character drawn once by shared art renderer */if(this.slash>0){c.strokeStyle='#fff1cc';c.lineWidth=3;c.beginPath();c.arc(p.x,p.y,21,-1,1);c.stroke()}
 c.fillStyle='#10131be9';c.fillRect(4,247,472,19);c.fillStyle='#e8d2af';c.font='10px monospace';c.fillText(`MARISMAS · ${f?'FRACTURA':'PRESENTE'} · LÁMPARA ${this.lantern?'✓':'—'} · PASO ${this.reeds?'✓':'—'} · CAMPANA ${this.bell?'✓':'—'}`,8,260)}
 snapshot(){return {active:this.active,fractured:this.fractured,lantern:this.lantern,reeds:this.reeds,bell:this.bell,won:this.won,enemy:{...this.enemy}}}
 restore(d){this.reset();if(!d||typeof d!=='object')return;for(const k of ['active','fractured','lantern','reeds','bell','won'])this[k]=d[k]===true;if(d.enemy&&Number.isFinite(d.enemy.x)&&Number.isFinite(d.enemy.y)){this.enemy={...this.enemy,x:Math.max(25,Math.min(455,d.enemy.x)),y:Math.max(25,Math.min(250,d.enemy.y)),hp:Math.max(0,Math.min(5,Number(d.enemy.hp)||0))}}}
}
