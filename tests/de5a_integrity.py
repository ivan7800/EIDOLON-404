"""Auditoría independiente de dependencias ES, assets y sintaxis (sin CDNs)."""
from pathlib import Path
import re, subprocess, sys
ROOT=Path(__file__).resolve().parents[1]
ENTRY=ROOT/'js/main.js'
seen=set(); issues=[]
def visit(f):
 f=f.resolve()
 if f in seen:return
 seen.add(f)
 if not f.is_file():issues.append('Falta módulo: '+str(f));return
 text=f.read_text(encoding='utf8')
 for src in re.findall(r'''(?:import|export)\s+(?:[^;]*?\s+from\s+)?["'](\.[^"']+)["']''',text):visit(f.parent/src)
 try:
  r=subprocess.run(['node','--check',str(f)],capture_output=True,text=True,timeout=5)
  if r.returncode: issues.append('Sintaxis '+str(f)+': '+r.stderr[:200])
 except (OSError,subprocess.TimeoutExpired) as e:issues.append('Node no disponible o no responde: '+str(e))
visit(ENTRY)
for f in ('index.html','css/style.css','launcher.py','INICIAR-LINUX.sh','INICIAR-WINDOWS.bat'):
 if not (ROOT/f).is_file():issues.append('Falta recurso: '+f)
html=(ROOT/'index.html').read_text()
for src in re.findall(r'''(?:href|src)=["'](\./[^"']+)["']''',html):
 if not (ROOT/src).is_file():issues.append('Falta referencia HTML: '+src)
print('Módulos ES analizados:',len(seen));print('Archivos esperados:',len(seen)+5)
if issues:
 for x in issues:print('ERROR:',x)
 sys.exit(1)
print('OK: dependencias locales, sintaxis ES y ficheros esenciales')
