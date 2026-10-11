from pathlib import Path
p=Path(__file__).resolve().parents[1]
a=(p/'js/art.js').read_text();m=(p/'js/main.js').read_text()
assert 'export function paintWorldRemaster' in a
assert 'paintWorldRemaster(ctx,region,elapsed,activeFracture())' in m
for region in ('temple','village','marsh','city','fortress','sanctuary'):
 assert "region==='"+region+"'" in a,region
assert (p/'INICIAR-WINDOWS.bat').exists() and (p/'INICIAR-LINUX.sh').exists()
print('PASS DE-2B visual integration and launchers')
