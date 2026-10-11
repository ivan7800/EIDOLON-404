"""Current browser regression: real HTTP, unchanged ES modules and real localStorage.
Install development dependencies: python -m pip install playwright
Then: python -m playwright install chromium
"""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT.parent)))
Thread(target=server.serve_forever,daemon=True).start()
# Prefer the same staged runtime artifact deployed by Pages.
if (ROOT/'_site/index.html').is_file():
 url=f'http://127.0.0.1:{server.server_port}/{ROOT.name}/_site/'
else:
 url=f'http://127.0.0.1:{server.server_port}/{ROOT.name}/'
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True)
  context=browser.new_context(viewport={'width':1280,'height':900})
  page=context.new_page();errors=[];failures=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.on('requestfailed',lambda r:failures.append(r.url))
  page.on('response',lambda r:failures.append(f'{r.status}: {r.url}') if r.status>=400 else None)
  page.goto(url,wait_until='networkidle')
  page.wait_for_function('!!window.__eidolon')
  page.locator('#start').click()
  page.keyboard.press('Enter');page.keyboard.press('Enter')
  assert page.evaluate('window.__eidolon.state')=='playing'
  page.locator('#journalBtn').click();page.locator('#journalSearch').click()
  page.keyboard.type('bosque de las campanas')
  assert page.locator('#journalSearch').input_value()=='bosque de las campanas'
  assert page.evaluate('window.__eidolon.state')=='journal'
  page.keyboard.press('Tab');assert not page.locator('#journalSearch').evaluate('(e)=>e===document.activeElement')
  page.keyboard.press('Escape');assert page.evaluate('window.__eidolon.state')=='playing'
  page.locator('#mapBtn').click();assert page.locator('#panelBody article').count()==7
  page.locator('#panelClose').click()
  assert page.evaluate('window.__eidolon.saveGame()')
  saved=page.evaluate('window.__eidolon.player')
  page.reload(wait_until='networkidle');page.locator('#loadBtn').click()
  assert page.evaluate('window.__eidolon.player')==saved
  page.evaluate("localStorage.setItem('eidolon404.save.v1', '{invalid')")
  assert page.evaluate('window.__eidolon.loadGame()') is False
  for start in ('startTemple','startVillage','startMarsh','startCity','startFortress','startSanctuary'):
   page.evaluate('(f)=>window.__eidolon[f]()',start)
   page.evaluate("()=>{for(let i=0;i<10&&window.__eidolon.state==='dialog';i++)window.__eidolon.interact()}")
   page.wait_for_timeout(150)
   assert page.evaluate('window.__eidolon.saveGame()'),start
   page.reload(wait_until='networkidle');page.locator('#loadBtn').click()
   assert page.evaluate('window.__eidolon.state')=='playing'
  page.set_viewport_size({'width':390,'height':844})
  assert page.locator('#act').is_visible()
  assert not errors,errors
  assert not failures,failures
  browser.close()
  print('PASS real HTTP/modules/assets under subpath, keyboard, journal, map, storage/reload, seven region entries and mobile controls visibility')
finally:server.shutdown();server.server_close()
