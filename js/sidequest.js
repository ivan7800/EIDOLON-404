// DE-4A: optional narrative mission. Isolated from the mandatory campaign.
export class LettersQuest {
  constructor(){this.reset()}
  reset(){this.stage='unstarted';this.ending=null}
  snapshot(){return {stage:this.stage,ending:this.ending}}
  restore(data){const allowed=['unstarted','searching','found','complete'];this.stage=allowed.includes(data?.stage)?data.stage:'unstarted';this.ending=['preserve','release'].includes(data?.ending)?data.ending:null;if(this.stage!=='complete')this.ending=null}
  start(){if(this.stage!=='unstarted')return false;this.stage='searching';return true}
  find(){if(this.stage!=='searching')return false;this.stage='found';return true}
  complete(ending){if(this.stage!=='found'||!['preserve','release'].includes(ending))return false;this.stage='complete';this.ending=ending;return true}
  get marker(){return {x:14,y:10}}
  draw(ctx,fractured,time,T){if(this.stage!=='searching'||!fractured)return;const x=(this.marker.x+.5)*T,y=(this.marker.y+.5)*T;ctx.save();ctx.translate(x,y);ctx.fillStyle='#d2c1f2';ctx.shadowColor='#ab81ef';ctx.shadowBlur=10+Math.sin(time*3)*4;ctx.fillRect(-7,-5,14,10);ctx.fillStyle='#53436f';ctx.fillRect(-1,-3,2,6);ctx.restore()}
}
