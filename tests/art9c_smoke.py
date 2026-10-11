from pathlib import Path
r=Path(__file__).resolve().parents[1]
m=(r/'js/main.js').read_text()
a=(r/'js/art.js').read_text()
assert 'paintRegionLandmark' in a and 'paintRegionLandmark(ctx,region' in m
assert 'activeFracture()' in m
for file in ('dungeon.js','ash-village.js','marshlands.js','sunken-city.js','clockwork-fortress.js','last-sanctuary.js'):
 s=(r/'js'/file).read_text()
 assert 'Character drawn once by shared art renderer' in s,file
assert m.count('paintAnimatedTraveller(ctx,player')==2
print('PASS 9C regional character integration and art modules')
