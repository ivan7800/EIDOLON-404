// Procedural, optional audio: no downloads, autoplay or persistent timers.
export class AudioFX {
  constructor(){this.ctx=null;this.enabled=false;this.master=null;this.last={};this.region='forest';this.lastAmbient=-Infinity}
  toggle(){this.enabled=!this.enabled;if(this.enabled)this.init();else if(this.ctx&&this.ctx.state==='running')this.ctx.suspend().catch(()=>{});return this.enabled}
  init(){if(!this.enabled)return;try{const C=globalThis.AudioContext||globalThis.webkitAudioContext;if(!C){this.enabled=false;return}if(!this.ctx){this.ctx=new C();this.master=this.ctx.createGain();this.master.gain.value=.32;this.master.connect(this.ctx.destination)}if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{})}catch{this.enabled=false}}
  tone(f=400,d=.1,type='sine',volume=.045,delay=0){if(!this.enabled)return;this.init();if(!this.ctx||this.ctx.state==='closed'||!Number.isFinite(f)||f<=0)return;try{const t=this.ctx.currentTime+Math.max(0,delay),o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,Math.min(.12,volume)),t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+Math.max(.04,d));o.connect(g);g.connect(this.master);o.start(t);o.stop(t+Math.max(.04,d)+.02);o.onended=()=>{o.disconnect();g.disconnect()}}catch{}}
  motif(notes){notes.forEach(([freq,delay,len=.16,type='triangle'],i)=>this.tone(freq,len,type,.028,delay))}
  shift(){this.motif([[180,0,.24],[230,.08,.22],[310,.16,.26],[465,.25,.34]])}
  pickup(){this.motif([[660,0,.08,'sine'],[880,.09,.14,'sine'],[1100,.19,.24,'triangle']])}
  sword(){this.motif([[210,0,.07,'sawtooth'],[460,.035,.075,'triangle']])}
  impact(){this.motif([[145,0,.12,'sawtooth'],[620,.035,.08,'square']])}
  hurt(){this.motif([[190,0,.17,'sawtooth'],[118,.1,.24,'triangle']])}
  dodge(){this.motif([[370,0,.09,'triangle'],[245,.065,.13,'sine']])}
  // Called by main loop; sparse individual notes avoid an endless background timer.
  ambience(region='forest',fractured=false,elapsed=0){if(!this.enabled||!Number.isFinite(elapsed))return;const key=region+':'+fractured;const period=fractured?6.4:9.2;if(this.region!==key){this.region=key;this.lastAmbient=-Infinity}if(elapsed-this.lastAmbient<period)return;this.lastAmbient=elapsed;const root={forest:220,temple:174,village:196,marsh:147,city:164,fortress:130,sanctuary:261}[region]||220;const scale=fractured?.75:1;this.motif([[root*scale,0,.7,'sine'],[root*scale*1.5,.32,.58,'triangle'],[root*scale*2,.72,.65,'sine']])}
}
