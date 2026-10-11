// Phase 5: authored narrative, choices and discoveries. No external data or tracking.
export const actors=[
 {id:'mara',name:'MARA · LA GUARDIANA',x:4,y:6,realm:'present',color:'#c8a9a0'},
 {id:'ivo',name:'IVO · EL TESTIGO',x:17,y:6,realm:'fractured',color:'#9ec9e6'}
];
export class Narrative {
 constructor(){this.reset()}
 reset(){this.entries=[];this.seen=new Set();this.choice=null;this.met=new Set()}
 discover(id,title,body){if(this.seen.has(id))return false;this.seen.add(id);this.entries.push({id,title,body});return true}
 meet(id){this.met.add(id)}
 choose(value){if(this.choice)return false;this.choice=value;return true}
 get ending(){return this.choice==='keep'?'Has elegido proteger los recuerdos, aunque el reloj no vuelva a ser el mismo.':this.choice==='release'?'Has elegido liberar el tiempo y aceptar lo que pueda desaparecer.':'El destino del reino permanece sin respuesta.'}
}
