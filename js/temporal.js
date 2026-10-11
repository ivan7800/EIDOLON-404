// Phase 4: persistent, deterministic two-realm puzzle state.
export class TemporalPuzzle {
  constructor(){this.reset()}
  reset(){this.shard=false;this.anchor=false;this.gateOpen=false}
  get shardPosition(){return {x:16,y:8}}
  get anchorPosition(){return {x:15,y:5}}
  collect(player,fractured,nearby){if(!fractured||this.shard||!nearby(player,this.shardPosition,21))return false;this.shard=true;return true}
  activate(player,fractured,nearby){if(fractured||!nearby(player,this.anchorPosition,33))return 'far';if(!this.shard)return 'needs-shard';if(this.anchor)return 'already';this.anchor=true;this.gateOpen=true;return 'activated'}
}
