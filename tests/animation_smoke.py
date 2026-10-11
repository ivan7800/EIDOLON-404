"""Check the new shared sprite is exported and rendered in each regional path."""
from pathlib import Path
r=Path(__file__).resolve().parents[1]
a=(r/'js/art.js').read_text();m=(r/'js/main.js').read_text()
assert 'export function paintAnimatedTraveller' in a
assert 'export function paintRegionalDetails' in a
assert "paintAnimatedTraveller(ctx,player,elapsed,keys.size>0,combat.dodge>0)" in m
for name in ('temple','village','marsh','city','fortress','sanctuary'):
 assert f"finishFrame('{name}')" in m, name
print('PASS animation symbols and seven rendering integrations')
