// DE-2D: visual-only cinematics. No modification to world, combat or save data.
export class CinematicDirector {
  constructor({banner,veil,qualityButton}) {
    this.banner=banner;this.veil=veil;this.qualityButton=qualityButton;
    this.region=null;this.realm=null;this.bossKey=null;this.time=0;this.transition=0;
    this.quality=matchMedia('(prefers-reduced-motion: reduce)').matches?'reduced':'full';
    this.qualityButton.addEventListener('click',()=>this.setQuality(this.quality==='full'?'reduced':'full'));
    this.setQuality(this.quality);
  }
  setQuality(q){this.quality=q==='reduced'?'reduced':'full';this.qualityButton.textContent=this.quality==='full'?'◐ EFECTOS: COMPLETOS':'◐ EFECTOS: REDUCIDOS';this.qualityButton.setAttribute('aria-pressed',String(this.quality==='reduced'));document.documentElement.classList.toggle('reduced-cinematics',this.quality==='reduced');if(this.quality==='reduced'){this.veil.style.opacity='0';this.transition=0}}
  announce(title,subtitle=''){this.banner.querySelector('strong').textContent=title;this.banner.querySelector('small').textContent=subtitle;this.time=this.quality==='reduced'?1.7:3.0;this.banner.classList.add('visible')}
  reset(){this.region=null;this.realm=null;this.bossKey=null;this.time=0;this.transition=0;this.banner.classList.remove('visible');this.veil.style.opacity='0'}
  update(dt,{playing,region,realm,boss}){
    if(!playing){this.time=0;this.banner.classList.remove('visible');this.veil.style.opacity='0';return}
    if(this.region===null){this.region=region;this.realm=realm}
    if(region!==this.region){this.region=region;this.realm=realm;this.bossKey=null;this.announce(region,'UN NUEVO CAPÍTULO EN VEYRA');this.transition=this.quality==='full'?.70:0}
    else if(realm!==this.realm){this.realm=realm;this.announce(realm?'LA FRACTURA':'EL PRESENTE',realm?'EL TIEMPO SE DOBLA':'LAS HORAS RESPIRAN');this.transition=this.quality==='full'?.38:0}
    if(boss&&boss!==this.bossKey){this.bossKey=boss;this.announce(boss,'EL TIEMPO CONTIENE EL ALIENTO');this.transition=this.quality==='full'?.55:0}
    this.time=Math.max(0,this.time-dt);if(!this.time)this.banner.classList.remove('visible');
    this.transition=Math.max(0,this.transition-dt);
    this.veil.style.opacity=this.quality==='reduced'?'0':String(Math.min(.54,this.transition*.60));
  }
}
