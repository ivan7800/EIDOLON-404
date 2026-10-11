"""Fetch every staged runtime file under a repository subpath; check relative imports."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from urllib.request import urlopen
import importlib.util, tempfile, shutil, re
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('build_site',ROOT/'scripts/build_site.py')
builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
staged=builder.build()
assert (staged/'index.html').is_file()
assert not (staged/'tests').exists() and not (staged/'launcher.py').exists()
for path in (staged/'js').glob('*.js'):
 for rel in re.findall(r'\bfrom\s*[\'"](\.[^\'"]+)[\'"]',path.read_text()):
  assert (path.parent/rel).resolve().is_file(),(path,rel)
for rel in re.findall(r'(?:href|src)=[\'"]([^\'"]+)[\'"]',(staged/'index.html').read_text()):
 assert not rel.startswith(('/', 'http:', 'https:')),rel
 assert (staged/rel).is_file(),rel
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
with tempfile.TemporaryDirectory() as tmp:
 base=Path(tmp);shutil.copytree(staged,base/'EIDOLON-404')
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=tmp))
 Thread(target=server.serve_forever,daemon=True).start()
 try:
  files=[p for p in staged.rglob('*') if p.is_file()]
  for p in files:
   with urlopen(f'http://127.0.0.1:{server.server_port}/EIDOLON-404/{p.relative_to(staged).as_posix()}',timeout=5) as res:
    assert res.status==200
    if p.suffix=='.js':assert 'javascript' in res.headers['Content-Type']
    if p.suffix=='.png':assert res.headers['Content-Type']=='image/png'
    assert res.read()==p.read_bytes()
  print(f'PASS Pages subpath: {len(files)} files including all sprites/portraits; exact bytes, JS/PNG MIME and relative routes')
 finally:server.shutdown();server.server_close()
