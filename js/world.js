export const W=480,H=270,T=24;
export const raw=[
'####################',
'#....t....t...t....#',
'#..t.....t.........#',
'#.......###..t.....#',
'#..t....#C#........#',
'#.......#.#..t.....#',
'#..t....#.#.....t..#',
'#.......#.#........#',
'#.......#.#..t.....#',
'#..t....#.#........#',
'#..................#',
'####################'];
// The visual grid is 20 columns x 12 rows, with bottom clipped to canvas.
export const lore=[{x:3,y:7,txt:'La piedra lleva grabado un nombre que no consigues recordar.',speaker:'LÁPIDA OLVIDADA'},{x:15,y:3,txt:'Una cinta roja cuelga de una rama. No se mueve con el viento.',speaker:'ÁRBOL DE LOS VOTOS'}];
export const echoes=[{x:5,y:3},{x:15,y:8},{x:4,y:9}];
export function wall(cx,cy,fractured){const tx=Math.floor(cx/T),ty=Math.floor(cy/T);if(tx<0||ty<0||ty>=raw.length||tx>=20)return true;const tile=raw[ty][tx];if(tile==='#' && !(fractured && tx===9 && ty>=3 && ty<=8))return true;return false}
export function nearby(p,o,d=30){return Math.hypot(p.x-(o.x*T+T/2),p.y-(o.y*T+T/2))<d}
