"""Stage only runtime web assets for Pages. No Node/Python code executes on Pages."""
from pathlib import Path
import shutil
ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'_site'
def build():
 for name in ('index.html','css','js','assets','LICENSE','.nojekyll'):
  if not (ROOT/name).exists():raise SystemExit('Missing: '+name)
 if DEST.exists():shutil.rmtree(DEST)
 DEST.mkdir()
 for name in ('index.html','LICENSE','.nojekyll'):shutil.copy2(ROOT/name,DEST/name)
 for name in ('css','js','assets'):shutil.copytree(ROOT/name,DEST/name)
 print(f'PASS site staged: {sum(p.is_file() for p in DEST.rglob("*"))} files, index.html at root')
 return DEST
if __name__=='__main__':build()
