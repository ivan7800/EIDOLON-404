// DE-3B: avisos de ataque compartidos. Estado efímero; no altera el formato de guardado.
export function stepTelegraph(enemy, dt, player, combat, options = {}) {
  const radius=options.radius ?? 36, warning=options.warning ?? .48, cooldown=options.cooldown ?? 1.1;
  if(!enemy || enemy.hp<=0) return false;
  if(!Number.isFinite(enemy.warning)) enemy.warning=0;
  if(enemy.warning>0){
    enemy.warning=Math.max(0,enemy.warning-dt);
    if(enemy.warning===0){
      const distance=Math.hypot(player.x-enemy.x,player.y-enemy.y);
      if(distance<radius && combat.invuln<=0){combat.hp=Math.max(0,combat.hp-1);combat.invuln=1.1;}
      enemy.cool=cooldown;
      return true;
    }
    return true;
  }
  const distance=Math.hypot(player.x-enemy.x,player.y-enemy.y);
  if(distance<radius && enemy.cool<=0){enemy.warning=warning;return true;}
  return false;
}
export function drawTelegraph(ctx,enemy,now=0){
  if(!enemy || enemy.hp<=0 || !(enemy.warning>0))return;
  ctx.save();
  const pulse=.5+.5*Math.sin(now*0.023);
  ctx.strokeStyle=`rgba(255,150,99,${(.65+.3*pulse).toFixed(3)})`;
  ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(enemy.x,enemy.y,37,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#ffe0ab';ctx.font='bold 12px monospace';ctx.textAlign='center';
  ctx.fillText('!',enemy.x,enemy.y-35);ctx.restore();
}
