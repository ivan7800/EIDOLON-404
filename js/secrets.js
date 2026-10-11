// DE-3D: optional secrets; no story gate relies on these collectibles.
export const FOREST_SECRETS=Object.freeze([
 {id:'rune',x:3,y:5,realm:'present',title:'La inscripción enterrada',description:'Bajo el musgo aparece una fecha: el día anterior a la primera campanada.',heal:0},
 {id:'reliquary',x:16,y:4,realm:'fractured',title:'Relicario del eco',description:'Un relicario conserva el retrato de una persona que todavía no ha nacido.',heal:0},
 {id:'spring',x:17,y:9,realm:'present',title:'Fuente del último refugio',description:'Bebes de la fuente inmóvil. Recuperas hasta dos puntos de vitalidad.',heal:2}
]);
export class ForestSecrets{
 constructor(){this.reset()}
 reset(){this.found=new Set()}
 snapshot(){return [...this.found]}
 restore(data){const allowed=new Set(FOREST_SECRETS.map(s=>s.id));this.found=new Set(Array.isArray(data)?data.filter(x=>allowed.has(x)):[])}
 interact(player,fractured,quest,nearby){for(const item of FOREST_SECRETS){if(item.realm!==(fractured?'fractured':'present'))continue;if(item.realm==='fractured'&&quest<3)continue;if(!nearby(player,item,27))continue;if(this.found.has(item.id))return {...item,already:true};this.found.add(item.id);return item}return null}
 draw(ctx,fractured,quest,time){for(const item of FOREST_SECRETS){if(this.found.has(item.id)||item.realm!==(fractured?'fractured':'present')||(item.realm==='fractured'&&quest<3))continue;const x=(item.x+.5)*24,y=(item.y+.5)*24,glow=Math.sin(time*2+item.x)*.5+.5;ctx.save();ctx.globalAlpha=.75+glow*.25;ctx.fillStyle=item.id==='spring'?'#59d5ce':item.id==='rune'?'#e9c889':'#ae92ef';ctx.beginPath();ctx.moveTo(x,y-8);ctx.lineTo(x+7,y);ctx.lineTo(x,y+8);ctx.lineTo(x-7,y);ctx.closePath();ctx.fill();ctx.strokeStyle='#f5e7ce';ctx.lineWidth=1;ctx.stroke();ctx.restore()}}
}
