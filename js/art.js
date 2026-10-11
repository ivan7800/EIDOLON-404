/** Procedural art direction, deterministic by tile; no network assets. */
const hash=(x,y,s=0)=>{let n=(x*374761393+y*668265263+s*1442695041)|0;n=(n^(n>>>13))*1274126177;return ((n^(n>>>16))>>>0)/4294967295};
const fill=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)};
/** DE-2E.1: fully original, hand-composed procedural storybook tiles. Tile 24px.
 * The painter does not affect hitboxes or coordinates and never generates random motion.
 */
function paintTileProcedural(c,x,y,t,fractured,time){
 const X=x*24,Y=y*24,h=hash(x,y),d=fractured;
 const q=(xx,yy,w,hh,col)=>fill(c,X+xx,Y+yy,w,hh,col);
 const grass=d?['#35354d','#39374f','#414058','#3c3a52']:['#587b4e','#648758','#6a8c5d','#5d8153'];
 const base=grass[Math.min(3,Math.floor(h*4))];q(0,0,24,24,base);
 // Seam-free clumps, subtle soil shadows and irregular tone; deterministic per tile.
 const g1=d?'#49435e':'#759667',g2=d?'#272a45':'#446a43',g3=d?'#6b5d7c':'#8ca774';
 for(let i=0;i<7;i++){
  const px=2+Math.floor(hash(x,y,13+i)*20),py=2+Math.floor(hash(y,x,43+i)*20);
  q(px,py,3+(i%2),1,i%3===0?g2:g1);
  if(i%2===0){q(px+1,py-2,1,3,g3);q(px-1,py,1,2,g2)}
 }
 if(t==='.'){
  if(h>.17&&h<.50){ // irregular flower clusters
   const fx=5+Math.floor(hash(x,y,87)*12),fy=5+Math.floor(hash(x,y,88)*12);
   const petal=d?'#bea4d2':'#eee1c0',core=d?'#82c7cf':'#dfad67';
   q(fx,fy-2,2,2,petal);q(fx-2,fy,2,2,petal);q(fx+2,fy,2,2,petal);q(fx,fy+2,2,2,petal);q(fx,fy,2,2,core);
   q(fx+1,fy+4,1,3,g2);
  }
  if(h>.81){const k=5+Math.floor(hash(x,y,79)*11);q(k,14,8,3,d?'#65647a':'#8b917f');q(k+1,13,6,1,d?'#9690a2':'#b5ad8c');q(k+6,16,2,2,d?'#34384f':'#56654f')}
  if(h<.11){q(3,12,3,5,g2);q(6,10,3,7,g1);q(9,13,3,4,g2);q(6,8,2,2,g3)}
 }
 if(t==='#'){
  const ghost=d&&x===9&&y>=3&&y<=8;
  q(0,0,24,24,ghost?'#49405c':d?'#555668':'#777b70');
  q(0,0,24,3,ghost?'#9a76b2':d?'#777389':'#a8a391');
  q(0,3,24,2,ghost?'#765586':d?'#67677a':'#939887');
  q(0,19,24,5,ghost?'#36304d':d?'#3d4257':'#565d55');
  q(0,11,24,1,d?'#34364e':'#59635a');q(10,4,1,8,'#45494b');q(18,13,1,8,'#46494b');
  q(3,6,5,2,d?'#7e7895':'#b4ae9b');q(14,15,6,1,d?'#74738a':'#95998a');
  if(hash(x,y,105)>.45){q(4,17,4,2,d?'#5a536d':'#50745d');q(5,15,1,3,d?'#8e79a5':'#739263')}
  if(ghost){c.save();c.globalAlpha=.5+.2*Math.sin(time*2+x);q(11,3,2,17,'#d4b1f1');c.restore()}
 }
 if(t==='t'){
  // Ground shadow, tapering warm trunk, layered leaf clusters and highlighted crown.
  c.save();c.fillStyle='rgba(19,30,26,.28)';c.beginPath();c.ellipse(X+12,Y+20,12,4,0,0,Math.PI*2);c.fill();c.restore();
  const bark=d?'#55465b':'#6a4937',lightBark=d?'#8a6a8a':'#a5794a';
  q(9,10,7,14,bark);q(11,12,2,10,lightBark);q(8,20,3,3,d?'#473c53':'#513b31');q(15,20,3,3,bark);
  const shade=d?'#313247':'#315640',mid=d?'#59516e':'#47784a',hi=d?'#827293':'#78a65c',sun=d?'#a18bb4':'#9bbb74';
  const clusters=[[1,8,10,10],[8,3,11,12],[14,8,9,10],[4,1,13,11]];
  for(const [cx,cy,w,hh] of clusters)q(cx,cy,w,hh,shade);
  for(const [cx,cy,w,hh] of [[2,6,10,9],[8,2,12,10],[13,7,9,9],[5,1,11,10]])q(cx,cy,w,hh,mid);
  q(6,3,11,4,hi);q(3,7,9,3,hi);q(15,8,6,3,hi);q(9,1,6,2,sun);
  q(6,5,4,2,sun);q(14,5,3,2,sun);q(5,14,5,2,shade);q(15,14,6,2,shade);
  if(h>.5){q(17,11,2,2,d?'#c4a5d2':'#d2ae83');q(18,13,1,2,shade)}
  else{q(4,11,2,2,d?'#aea0c0':'#a9c77a')}
 }
 if(t==='C'){
  q(2,19,20,4,'#41393b');q(3,8,18,12,d?'#82738b':'#a69980');
  q(6,4,12,6,d?'#b79abf':'#c6b599');q(10,1,4,4,d?'#d0b5db':'#e1cea6');
  q(7,10,3,8,'#5b5150');q(15,10,3,8,'#5b5150');
  q(8,8,8,2,d?'#d3b0e6':'#e2cc9f');q(11,12,2,5,d?'#493c66':'#705b49');
 }
}
export function paintAtmosphere(c,width,height,fractured,time){
 c.save();
 const tint=c.createLinearGradient(0,0,width,height);tint.addColorStop(0,fractured?'rgba(100,55,138,.13)':'rgba(166,183,130,.08)');tint.addColorStop(1,fractured?'rgba(27,11,54,.31)':'rgba(12,27,29,.23)');c.fillStyle=tint;c.fillRect(0,0,width,height);
 for(let i=0;i<27;i++){
  const x=(hash(i,3)*width+Math.sin(time*.45+i)*11+width)%width;
  const y=(hash(i,7)*height-time*(fractured?4:7)+height*30)%height;
  c.globalAlpha=.20+.42*(.5+.5*Math.sin(time*1.5+i));c.fillStyle=fractured?'#ca8ef1':'#f5d69b';c.fillRect(Math.round(x),Math.round(y),i%3===0?2:1,i%3===0?2:1);
 }
 c.globalAlpha=1;
 c.restore();
}
export function paintHeroDetails(c,p,time,moving){
 const x=Math.round(p.x),y=Math.round(p.y),bob=moving?Math.round(Math.sin(p.walk)*2):0;
 // Asymmetric travelling cloak, clock pendant, hair and directional silhouette.
 fill(c,x-8,y-6+bob,3,10,'#4f4354');fill(c,x-7,y+2+bob,5,5,'#372d45');
 fill(c,x-5,y-13+bob,10,3,'#dbc49f');fill(c,x-2,y-16+bob,6,3,'#62535a');
 fill(c,x-2,y-1+bob,3,3,'#e0c280');fill(c,x-1,y,bob?1:2,1,'#fff2c1');
 if(p.dir===0){fill(c,x-5,y-10+bob,10,6,'#67565b')}else if(p.dir===1){fill(c,x+5,y-10+bob,2,2,'#dbbb96')}else if(p.dir===3){fill(c,x-7,y-10+bob,2,2,'#dbbb96')}
}

/** Lightweight cinematic finish shared by every region; no assets or allocations outside Canvas. */
export function paintCinematic(c,width,height,time,fractured,enabled=true){
 if(!enabled)return;
 c.save();
 // Gold/indigo environmental light: screen blend preserves gameplay contrast.
 c.globalCompositeOperation='screen';
 const halo=c.createRadialGradient(width*.26,height*.12,0,width*.26,height*.12,width*.77);
 halo.addColorStop(0,fractured?'rgba(116,72,183,.10)':'rgba(215,156,89,.095)');
 halo.addColorStop(1,'rgba(0,0,0,0)');
 c.fillStyle=halo;c.fillRect(0,0,width,height);
 c.globalCompositeOperation='source-over';
 // Gentle film-style corners; no opaque overlays over the player.
 const edges=c.createRadialGradient(width/2,height/2,width*.18,width/2,height/2,width*.7);
 edges.addColorStop(0,'rgba(2,4,8,0)');edges.addColorStop(1,'rgba(2,4,8,.29)');
 c.fillStyle=edges;c.fillRect(0,0,width,height);
 // Sparse drifting motes instead of a costly full-screen particle system.
 for(let i=0;i<13;i++){
  let x=(hash(i,77)*width+Math.sin(time*.37+i)*9+width)%width;
  let y=(hash(i,85)*height-time*(fractured?3.8:6.2)+height*20)%height;
  c.fillStyle=fractured?'rgba(197,157,245,.42)':'rgba(255,218,147,.32)';
  c.fillRect(Math.round(x),Math.round(y),i%5===0?2:1,1);
 }
 c.restore();
}


/** Shared original 16-bit traveller sprite: 4 facing directions, walking cycle,
 * idle breath, cloth sway and a separate dodge silhouette. Canvas-only. */
function paintAnimatedTravellerProcedural(c,p,time,moving=false,dodging=false){
 const x=Math.round(p.x),y=Math.round(p.y),stride=moving?Math.sin((p.walk||0)*1.8):0;
 const bob=moving?Math.round(Math.abs(stride)):0, leg=Math.round(stride*3);
 const dir=p.dir,front=dir===2,rear=dir===0,right=dir===1;
 const px=(a,b,w,h,color)=>{c.fillStyle=color;c.fillRect(a,b,w,h)};
 c.save();c.translate(x,y);
 c.fillStyle='rgba(19,22,32,.35)';c.beginPath();c.ellipse(0,10,10,3,0,0,Math.PI*2);c.fill();
 if(dodging){c.globalAlpha=.4;px(-15,-13,9,20,'#97b4bb');c.globalAlpha=1}
 // Deliberately original clock-wanderer silhouette: leather boots, moss coat,
 // copper sash and indigo travel cape. Animation driven by existing p.walk.
 px(-7+leg,2,6,7,'#382e37');px(1-leg,2,6,7,'#382e37');
 px(-8+leg,7,7,3,'#8c6545');px(1-leg,7,7,3,'#8c6545');
 const cape=Math.round(Math.sin(time*2.6+(p.walk||0))*(moving?2:1));
 px(-10+cape,-13-bob,7,19,'#293953');px(-9+cape,-11-bob,4,17,'#526278');
 px(4-cape,-13-bob,6,19,'#253449');px(6-cape,-10-bob,3,13,'#62728c');
 px(-7,-12-bob,14,15,'#334d47');px(-6,-11-bob,12,10,'#60806a');
 px(-6,-10-bob,2,9,'#83a080');px(4,-10-bob,2,8,'#425e51');
 px(-7,-3-bob,14,3,'#5b3e37');px(-3,-4-bob,6,5,'#bb875a');px(-1,-3-bob,2,2,'#f7daa0');
 px(-11,-11-bob,4,9,'#ae846a');px(7,-11-bob,4,9,'#ae846a');
 px(-10,-10-bob,3,4,'#435b58');px(8,-10-bob,3,4,'#435b58');
 px(-6,-19-bob,12,11,'#cda78a');px(-7,-22-bob,14,6,'#283c45');
 px(-8,-20-bob,16,3,'#4d625a');px(-5,-23-bob,10,2,'#7f9077');
 if(rear){px(-5,-16-bob,10,7,'#445451');px(-2,-18-bob,4,8,'#6b7560')}
 else if(front){px(-4,-15-bob,2,2,'#29343d');px(2,-15-bob,2,2,'#29343d');px(-1,-11-bob,3,1,'#926d65')}
 else {px(right?3:-5,-15-bob,2,2,'#29343d');px(right?6:-8,-14-bob,2,5,'#a98570')}
 // Clock crest on hood, intentionally unlike any existing game character.
 px(-2,-21-bob,4,1,'#e3c78d');px(-1,-20-bob,2,3,'#e3c78d');px(0,-19-bob,1,1,'#665046');
 if(p.fracturedVisual){c.globalAlpha=.54;px(-2,-24-bob,4,2,'#c4b3f2')}
 c.restore();
}

/** Region-themed non-interactive highlights; deterministic and inexpensive. */
export function paintRegionalDetails(c,region,time,fractured){
 const themes={temple:['#d8b88d',13],village:['#e2a783',17],marsh:['#79bdb0',11],city:['#87aeca',19],fortress:['#dcac67',23],sanctuary:['#d8b2e5',29]};
 const theme=themes[region];if(!theme)return;
 const [color,seed]=theme;c.save();
 for(let i=0;i<10;i++){
   const x=Math.floor(25+hash(i,seed)*425),y=Math.floor(25+hash(seed,i)*205);
   const alpha=.16+.12*(.5+.5*Math.sin(time*1.3+i));c.globalAlpha=alpha;c.fillStyle=color;
   c.fillRect(x,y,2+(i%3===0?2:0),2);
 }
 c.restore();
}

/** Region landmarks, visual-only: no collision or puzzle state changes. */
export function paintRegionLandmark(c,region,time,fractured){
 const palettes={temple:['#bfa787','#68556b'],village:['#bc8a78','#665263'],marsh:['#6bbaa4','#4a718a'],city:['#8ac5d9','#5e7899'],fortress:['#c9ad79','#77708a'],sanctuary:['#dac8b1','#8d79c5']};
 const pal=palettes[region];if(!pal)return;
 c.save();c.globalAlpha=.72;
 const glow=fractured?pal[1]:pal[0];
 for(let i=0;i<5;i++){
  const x=38+Math.floor(hash(i,region.length)*400),y=34+Math.floor(hash(region.length,i)*175);
  c.strokeStyle=glow;c.lineWidth=1;
  if(region==='marsh'){c.beginPath();c.moveTo(x,y+6);c.lineTo(x+2,y-5);c.lineTo(x+4,y+6);c.stroke()}
  else if(region==='fortress'){c.beginPath();c.arc(x,y,4,0,Math.PI*2);c.stroke();c.fillStyle=glow;c.fillRect(x-1,y-7,2,4)}
  else if(region==='city'){c.fillStyle=glow;c.fillRect(x-5,y,10,2);c.fillRect(x-3,y-5,6,2)}
  else if(region==='sanctuary'){c.beginPath();c.moveTo(x,y-7);c.lineTo(x+5,y);c.lineTo(x,y+7);c.lineTo(x-5,y);c.closePath();c.stroke()}
  else if(region==='village'){c.fillStyle=glow;c.fillRect(x-5,y-5,10,2);c.fillRect(x-3,y-3,6,7)}
  else {c.strokeRect(x-5,y-6,10,12);c.fillStyle=glow;c.fillRect(x-1,y-3,2,7)}
 }
 c.restore();
}

/** DE-2B: atmospheric foreground ornament; no world state or collision changes.
 * Artwork is contained at the screen margins to preserve puzzle readability. */
export function paintWorldRemaster(c,region,time,fractured){
 const glow=fractured?'#bb9ce8':'#f1ca8a';
 const stroke=(x,y,w,h,color,alpha=1)=>{c.globalAlpha=alpha;c.strokeStyle=color;c.strokeRect(x+.5,y+.5,w,h)};
 const block=(x,y,w,h,color,alpha=1)=>{c.globalAlpha=alpha;c.fillStyle=color;c.fillRect(x,y,w,h)};
 const ring=(x,y,r,color,a=.5)=>{c.globalAlpha=a;c.strokeStyle=color;c.lineWidth=1;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke()};
 c.save();
 if(region==='temple'){
  // Narrow masonry pillars and old inscriptions at the edge of the level.
  for(const x of [24,432]){block(x,36,19,30,fractured?'#4a4267':'#77706a',.6);block(x+3,34,13,3,glow,.48);for(let j=0;j<3;j++)stroke(x+5,42+j*7,8,4,glow,.28)}
  for(let i=0;i<5;i++){let x=90+i*72;ring(x,23,5,glow,.34+.13*Math.sin(time*1.3+i));block(x-1,19,2,7,glow,.35)}
 }else if(region==='village'){
  // Dust motes, slanted roof silhouettes, glowing window frames.
  for(const x of [37,305,401]){block(x,26,38,3,fractured?'#8b6c91':'#9b7565',.66);block(x+6,30,26,2,'#201d26',.8);stroke(x+12,35,9,11,glow,.56)}
  for(let i=0;i<15;i++){const x=15+hash(i,12)*450,y=18+hash(i,39)*211;block(x+Math.sin(time*.5+i)*3,y,2,2,fractured?'#9a7caa':'#c4a48a',.2)}
 }else if(region==='marsh'){
  // Reeds and concentric water ripples animate without changing tile types.
  for(let i=0;i<14;i++){const x=25+hash(i,9)*430,y=32+hash(i,57)*180;const sway=Math.sin(time*.9+i)*2;block(x+sway,y-9,2,10,fractured?'#788ba5':'#71977b',.51);block(x+3-sway,y-5,1,7,'#b3b88b',.48);ring(x,y+1,3+((time+i)%3),fractured?'#8b9fbe':'#77b5b3',.17)}
 }else if(region==='city'){
  // Architectural arcades and submerged light shards.
  for(const x of [45,245,410]){block(x,26,18,35,fractured?'#55627c':'#597985',.6);block(x-5,25,28,4,'#96a9ae',.4);stroke(x+4,34,10,18,glow,.35)}
  for(let i=0;i<11;i++){let x=25+hash(i,51)*420,y=39+hash(i,65)*170;block(x,y+Math.sin(time*1.4+i)*2,10,1,fractured?'#8e9ec7':'#a7e4de',.29)}
 }else if(region==='fortress'){
  // Clockwork ornament, spokes and minute markers.
  for(const [x,y,r] of [[42,38,13],[427,40,17],[38,208,11]]){
   ring(x,y,r,glow,.5);ring(x,y,r-4,glow,.35);
   for(let i=0;i<8;i++){const a=i*Math.PI/4+time*.035;const ax=x+Math.cos(a)*(r-3),ay=y+Math.sin(a)*(r-3);block(ax,ay,2,2,glow,.52)}
   block(x-1,y-1,3,3,glow,.6)
  }
 }else if(region==='sanctuary'){
  // Slow-moving starlight, ornate temporal seals in the corners.
  for(const x of [44,436])for(const y of [35,202]){
   ring(x,y,12,glow,.43);ring(x,y,17,glow,.2);block(x-1,y-9,2,18,glow,.31);block(x-9,y-1,18,2,glow,.3)
  }
  for(let i=0;i<12;i++){const x=26+hash(i,14)*426,y=25+hash(i,23)*185;const a=.16+.18*(1+Math.sin(time*.9+i))/2;block(x,y+Math.sin(time*.6+i)*4,2,2,glow,a)}
 }
 c.restore();
}

// DE-2E.2: local original pixel atlases. Procedural painter remains an immediate fallback.
const pixelArt={present:null,fracture:null,traveller:null,ready:false};
if(typeof Image!=='undefined'){
 for(const [key,path] of Object.entries({present:'./assets/pixel/forest_present.png',fracture:'./assets/pixel/forest_fracture.png',traveller:'./assets/pixel/traveller_4x4.png'})){
  const im=new Image(); im.onload=()=>{pixelArt[key]=im}; im.onerror=()=>{pixelArt[key]=null};im.src=new URL('../'+path,import.meta.url).href;
 }
}
export function paintTile(c,x,y,t,fractured,time){
 const im=pixelArt[fractured?'fracture':'present']; const row={'.':0,'#':1,'t':2,'C':3}[t];
 if(im&&Number.isInteger(row)){
  const variant=(Math.abs((x*17+y*31+x*y*7)|0)%4);
  c.drawImage(im,variant*24,row*24,24,24,x*24,y*24,24,24);
  // Preserve the original Fracture pass-through glyph on the temporal barrier.
  if(fractured&&t==='#'&&x===9&&y>=3&&y<=8){c.fillStyle='rgba(175,115,232,.30)';c.fillRect(x*24+10,y*24+3,3,18)}
  return;
 }
 paintTileProcedural(c,x,y,t,fractured,time);
}
export function paintAnimatedTraveller(c,p,time,moving=false,dodging=false){
 const im=pixelArt.traveller;
 if(!im){paintAnimatedTravellerProcedural(c,p,time,moving,dodging);return}
 const frame=moving?(Math.floor((p.walk||time*7)*1.5)%4+4)%4:0;
 const direction=[0,1,2,3].includes(p.dir)?p.dir:2;
 const x=Math.round(p.x)-12,y=Math.round(p.y)-23;
 c.save();
 if(dodging){c.globalAlpha=.26;c.drawImage(im,frame*24,direction*32,24,32,x-5,y,24,32);c.globalAlpha=1}
 c.drawImage(im,frame*24,direction*32,24,32,x,y,24,32);
 if(p.fracturedVisual){c.fillStyle='rgba(192,162,249,.65)';c.fillRect(x+11,y+5,3,2)}
 c.restore();
}


// DE-2E.3 — Original region spritesheets. Atlas rows: floor, wall, water, architecture.
const regionAtlas = new Map();
const regionNames = ['temple','village','marsh','city','fortress','sanctuary'];
if (typeof Image !== 'undefined') {
  for (const region of regionNames) for (const realm of ['present','fracture']) {
    const atlas = new Image();
    const key = `${region}:${realm}`;
    atlas.onload = () => regionAtlas.set(key,atlas);
    atlas.onerror = () => regionAtlas.delete(key);
    atlas.src = new URL(`../assets/pixel/${region}_${realm}.png`,import.meta.url).href;
  }
}
export function paintRegionTile(c,region,type,x,y,fractured) {
  const atlas = regionAtlas.get(`${region}:${fractured?'fracture':'present'}`);
  if (!atlas || !atlas.complete || !atlas.naturalWidth) return false;
  const row = ({floor:0,wall:1,water:2,building:3})[type];
  if (row === undefined) return false;
  const variant = ((x*19+y*7+x*y*3)%4+4)%4;
  c.drawImage(atlas,variant*24,row*24,24,24,x*24,y*24,24,24);
  return true;
}

// DE-2E.4 — shared character art: visual-only overlays; sprites load locally.
const creatureAtlas = Object.create(null);
/** Consistent sprite scale and transient combat feedback, purely visual. */
export function paintCreature(c,type,x,y,time=0,opts={}) {
  let sprite=creatureAtlas[type];
  if(sprite===undefined && typeof Image !== 'undefined'){
    sprite=new Image();sprite.onerror=()=>{creatureAtlas[type]=null};
    sprite.src=new URL('../assets/pixel/'+type+'_4f.png',import.meta.url).href;
    creatureAtlas[type]=sprite;
  }
  if(!sprite||!sprite.complete||!sprite.naturalWidth)return false;
  const phase=Math.max(0,time);
  const frame=Math.floor(phase*5)%4;
  const size=opts.boss?56:30;
  const bob=opts.boss?Math.sin(time*2)*1.5:Math.sin(time*3)*1;
  const stagger=opts.stagger>0;
  const alpha=opts.invulnerable && Math.floor(time*14)%2===0?.44:1;
  c.save();c.imageSmoothingEnabled=false;
  c.fillStyle='rgba(6,9,20,.35)';c.beginPath();c.ellipse(Math.round(x),Math.round(y+size*.32),size*.27,size*.07,0,0,Math.PI*2);c.fill();
  if(stagger){c.translate(Math.sin(time*55)*1.6,0)}
  c.globalAlpha=alpha;
  c.drawImage(sprite,frame*64,0,64,64,Math.round(x-size/2),Math.round(y-size/2+bob),size,size);
  if(stagger){c.globalCompositeOperation='source-atop';c.fillStyle='rgba(255,238,200,.35)';c.fillRect(Math.round(x-size/2),Math.round(y-size/2+bob),size,size)}
  c.restore();return true;
}

/** Four-facing attack arc, dash trail and hurt flicker; does not mutate combat state. */
export function paintPlayerAction(c,p,time,combat){
 if(!combat)return;
 c.save();c.imageSmoothingEnabled=false;
 const x=Math.round(p.x),y=Math.round(p.y);
 if(combat.dodge>0){
  const direction=[[0,1],[-1,0],[0,-1],[1,0]][p.dir]||[0,1];
  for(let i=1;i<=3;i++){
   c.globalAlpha=.13*(4-i)/3;c.fillStyle='#9ad7dd';
   c.fillRect(x-6+direction[0]*i*8,y-14+direction[1]*i*8,12,20);
  }
 }
 if(combat.swing>0){
  const progress=1-Math.min(1,combat.swing/.26);
  const angle=[-Math.PI/2,0,Math.PI/2,Math.PI][p.dir]||0;
  const start=angle-1.05+progress*.65;
  c.globalAlpha=.78;c.strokeStyle=combat.combo===3?'#fff2b2':'#d2e5eb';c.lineWidth=combat.combo===3?4:3;
  c.beginPath();c.arc(x,y-5,23,start,start+1.4);c.stroke();
  c.globalAlpha=.35;c.strokeStyle='#9bdcf3';c.lineWidth=1;c.beginPath();c.arc(x,y-5,27,start,start+1.4);c.stroke();
 }
 c.restore();
}


/** Environment Overhaul 3.0: multi-tile scenery. Decorative only: never mutates maps or collisions. */
export function paintEnvironmentMonuments(c, region, fractured, time) {
  const f=fractured;
  const line=f?'#a99cce':'#d5bf94', shadow=f?'#29263c':'#322e32';
  const stone=f?'#625774':'#817568', light=f?'#9181a8':'#afa18b';
  const block=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h)};
  const arch=(x,y,w,h)=>{
    block(x+3,y+7,w-6,h-7,shadow);block(x,y+5,7,h-5,stone);block(x+w-7,y+5,7,h-5,stone);
    block(x+4,y,w-8,6,light);block(x+9,y+8,w-18,4,stone);
    block(x+9,y+12,w-18,h-12,shadow);
    block(x+3,y+h-5,7,5,light);block(x+w-10,y+h-5,7,5,light);
    for(let q=12;q<w-10;q+=12)block(x+q,y+2,2,3,line);
  };
  c.save(); c.globalAlpha=.89;
  if(region==='temple'){
    arch(12,17,66,77);arch(405,17,66,77);
    for(let x of [92,366]){block(x,20,22,8,light);block(x+5,28,12,34,stone);block(x,62,22,7,shadow);block(x+3,32,3,28,line)}
  }else if(region==='village'){
    for(const [x,y,w] of [[13,17,85],[379,15,87]]){
      block(x+5,y+30,w-10,53,f?'#514258':'#95775c');block(x,y+23,w,12,shadow);
      c.fillStyle=f?'#584963':'#9c5b4f';c.beginPath();c.moveTo(x-3,y+27);c.lineTo(x+w/2,y-2);c.lineTo(x+w+3,y+27);c.closePath();c.fill();
      block(x+13,y+40,14,18,f?'#9683b4':'#e0b878');block(x+16,y+43,8,12,shadow);
      block(x+w-30,y+47,20,36,shadow);block(x+w-28,y+49,16,32,f?'#5e526b':'#705b48');
      for(let i=0;i<4;i++)block(x+9+i*17,y+22,10,2,line);
    }
  }else if(region==='marsh'){
    for(const [x,y] of [[15,20],[431,29]]){
      block(x+11,y+9,12,81,f?'#564f65':'#5d5140');block(x+4,y+4,26,8,f?'#726988':'#816c4e');
      for(let k=0;k<5;k++){block(x-2+k*6,y+55-k%2*7,2,35,f?'#8b83a3':'#79936d');block(x+4+k*6,y+61-k%3*6,2,27,f?'#4b7188':'#b0aa6d')}
    }
    c.globalAlpha=.25;c.strokeStyle=f?'#b6a2d9':'#8ac5bf';
    for(let k=0;k<3;k++){c.beginPath();c.ellipse(240,246,40+k*26+(time%2)*2,5+k*3,0,0,Math.PI*2);c.stroke()}
  }else if(region==='city'){
    arch(9,14,81,94);arch(389,13,82,94);
    for(let k=0;k<5;k++){block(20+k*11,26,2,54,f?'#7381a6':'#76a8b0');block(405+k*11,25,2,56,f?'#7381a6':'#76a8b0')}
  }else if(region==='fortress'){
    for(const x of [33,445]){
      c.strokeStyle=f?'#b1a4cb':'#c6ae7e';c.lineWidth=5;
      c.beginPath();c.arc(x,55,27,0,Math.PI*2);c.stroke();
      for(let k=0;k<10;k++){const a=k*Math.PI/5+time*.1;block(Math.round(x+Math.cos(a)*30)-3,Math.round(55+Math.sin(a)*30)-3,6,6,stone)}
      c.beginPath();c.arc(x,55,9,0,Math.PI*2);c.stroke();
      block(x-4,87,8,50,shadow);
    }
  }else if(region==='sanctuary'){
    arch(4,14,82,104);arch(396,14,80,104);
    c.strokeStyle=line;c.lineWidth=3;c.beginPath();c.arc(241,29,19,0,Math.PI*2);c.stroke();
    for(let i=0;i<12;i++){const a=i*Math.PI/6;block(240+Math.round(Math.cos(a)*17),28+Math.round(Math.sin(a)*17),2,2,line)}
  }
  c.restore();
}

/** A 2x2-cell overlapping crown gives foreground trees the silhouette of larger vegetation. */
export function paintForestCanopies(c, raw, fractured, time) {
 c.save();
 for(let y=1;y<Math.min(raw.length-1,11);y++)for(let x=1;x<19;x++){
  if(raw[y][x]!=='t'||raw[y][x+1]!=='t'||raw[y-1][x]!=='t'||raw[y-1][x+1]!=='t')continue;
  if((x+y)%3!==0)continue;
  const X=x*24+11,Y=y*24+2;
  c.fillStyle='rgba(14,22,20,.24)';c.beginPath();c.ellipse(X+10,Y+11,28,9,0,0,Math.PI*2);c.fill();
  c.fillStyle=fractured?'#38384f':'#345d43';c.fillRect(X-14,Y-24,52,28);
  c.fillStyle=fractured?'#5f5578':'#528051';c.fillRect(X-10,Y-28,40,24);c.fillRect(X-17,Y-16,49,13);
  c.fillStyle=fractured?'#85749d':'#8baa68';c.fillRect(X-5,Y-26,27,6);c.fillRect(X-13,Y-13,17,4);
  c.fillStyle=fractured?'#aba0bb':'#b3c981';c.fillRect(X+1,Y-25,12,2);
 }
 c.restore();
}


/** Environment Overhaul 4.0: restrained foreground depth. Visual-only; no hitbox or map edits.
 * Foliage appears in front of the traveller ONLY when the object is spatially in front.
 * Nearby cover fades so interaction cues and the player remain readable.
 */
export function paintEnvironmentForeground(c,region,fractured,time,p,forestMap=null){
 const soft=(x,y)=>Math.hypot((p?.x??-999)-x,(p?.y??-999)-y)<52?.20:.66;
 c.save();
 if(region==='forest' && forestMap){
  const h=forestMap.length,cols=Math.min(20,forestMap[0]?.length||0);
  for(let y=1;y<Math.min(h-1,11);y++)for(let x=1;x<cols-1;x++){
   if(forestMap[y][x]!=='t'||forestMap[y][x+1]!=='t'||forestMap[y-1][x]!=='t')continue;
   if((x+y)%3!==0)continue;
   const cx=x*24+22,cy=y*24+5;
   if(p && p.y<cy-11)continue; // canopy is only in front of something walking behind it
   c.globalAlpha=soft(cx,cy);
   c.fillStyle=fractured?'#554c73':'#436d4b';c.fillRect(cx-22,cy-16,43,8);
   c.fillStyle=fractured?'#81719b':'#78a46b';c.fillRect(cx-12,cy-19,22,3);
   c.fillStyle=fractured?'#a195b7':'#afd088';c.fillRect(cx-8,cy-19,8,2);
  }
 }else{
  // Peripheral foreground accents only: never paint over the central puzzle zone.
  const color=fractured?'#776999':({marsh:'#729572',village:'#927350',city:'#6893a6',temple:'#8d8575',fortress:'#947b61',sanctuary:'#b4a17c'}[region]||'#6e7d68');
  if(['marsh','village','city','temple','fortress','sanctuary'].includes(region)){
   for(const [baseX,dir] of [[8,1],[470,-1]]){
    c.globalAlpha=soft(baseX,205)*.73;c.fillStyle=color;
    for(let i=0;i<7;i++){
     const yy=190+i*8,xx=baseX+dir*(4+(i%3)*4);
     const sway=Math.round(Math.sin(time*1.3+i*2.1)*2);
     c.fillRect(xx+sway,yy,dir===1?2:3,13-i%3*2);
    }
   }
  }
 }
 c.restore();
}
