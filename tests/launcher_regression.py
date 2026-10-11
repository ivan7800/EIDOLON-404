"""Real launcher restart, fixed origin and occupied-port checks; no browser needed."""
from pathlib import Path
import subprocess, sys, queue, threading, re
from urllib.request import urlopen
ROOT=Path(__file__).resolve().parents[1]
def start():
 p=subprocess.Popen([sys.executable,'-u',str(ROOT/'launcher.py'),'--no-browser'],stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True)
 q=queue.Queue()
 def collect():
  for line in p.stdout:q.put(line)
  q.put(None)
 threading.Thread(target=collect,daemon=True).start()
 lines=[]
 try:
  while True:
   line=q.get(timeout=10)
   if line is None:raise AssertionError('Launcher failed: '+''.join(lines))
   lines.append(line)
   if 'Comprobacion HTTP y JavaScript: OK.' in line:
    return p,re.search(r'http://127\.0\.0\.1:\d+/', ''.join(lines)).group()
 except BaseException:
  p.terminate();p.wait(timeout=5);raise
first=None;second=None
try:
 first,url1=start();assert url1=='http://127.0.0.1:8404/',url1
 with urlopen(url1,timeout=5) as response:assert response.status==200
 conflict=subprocess.run([sys.executable,str(ROOT/'launcher.py'),'--no-browser'],capture_output=True,text=True,timeout=10)
 assert conflict.returncode==3,conflict.stdout
 assert 'No se cambia de puerto' in conflict.stdout
 first.terminate();first.wait(timeout=5);first=None
 second,url2=start();assert url1==url2
 print('PASS launcher: fixed origin, HTTP, restart and safe refusal on occupied port')
finally:
 for p in (first,second):
  if p is not None:p.terminate();p.wait(timeout=5)
