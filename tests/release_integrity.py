"""Release checks: actual HTTP asset delivery and local module dependency resolution."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from urllib.request import urlopen
import re
root=Path(__file__).resolve().parents[1]
modules=list((root/'js').glob('*.js'))
missing=[]
for src in modules:
    content=src.read_text(encoding='utf-8')
    for target in re.findall(r'\bfrom\s*[\'\"](\.[^\'\"]+)[\'\"]',content):
        dest=(src.parent/target).resolve()
        if not dest.is_file(): missing.append(f'{src.name}: {target}')
assert not missing,missing
assert '<script type="module" src="./js/main.js"></script>' in (root/'index.html').read_text()
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(root)))
thread=Thread(target=server.serve_forever,daemon=True);thread.start()
try:
    paths=['/','/index.html','/css/style.css']+[f'/js/{m.name}' for m in modules]
    for path in paths:
        with urlopen(f'http://127.0.0.1:{server.server_port}{path}', timeout=4) as res:
            assert res.status==200,(path,res.status)
            assert res.read(),path
    print(f'PASS HTTP real: {len(paths)} endpoints (assets served), {len(modules)} modules resolve locally')
finally:server.shutdown();server.server_close()
