import {AudioFX} from '../js/audio.js';
class FakeNode {constructor(){this.gain={value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}};this.frequency={setValueAtTime(){}}}connect(){}disconnect(){}start(){}stop(){}set onended(v){this.cleanup=v}}
class FakeContext {constructor(){this.state='running';this.currentTime=0;this.destination=new FakeNode();this.calls=0}createGain(){return new FakeNode()}createOscillator(){this.calls++;return new FakeNode()}resume(){this.state='running';return Promise.resolve()}suspend(){this.state='suspended';return Promise.resolve()}}
globalThis.AudioContext=FakeContext;
const a=new AudioFX();a.sword();if(a.ctx)throw Error('autoplay before opt-in');
if(!a.toggle()||!a.ctx)throw Error('audio enable failed');
a.sword();a.impact();a.hurt();a.dodge();a.pickup();a.shift();a.ambience('marsh',true,20);const count=a.ctx.calls;if(count<12)throw Error('expected generated sounds');a.ambience('marsh',true,21);if(a.ctx.calls!==count)throw Error('ambience throttling failed');a.toggle();a.sword();if(a.ctx.calls!==count)throw Error('muted audio generated sound');
console.log('PASS optional audio, combat cues, ambience throttling and mute');
