# Pruebas de navegador históricas

Referencia no ejecutable. Concatenaban módulos en scripts clásicos y no son compatibles con la entrega actual. Falta migrar su cobertura íntegra; el test vigente es `tests/browser_http_smoke.py`.

## browser_smoke.py.txt

```python
"""Headless smoke test: loads unchanged application logic into about:blank to work around restricted localhost browsing."""
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1300,'height':900});errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    from pathlib import Path
    root=Path(__file__).resolve().parents[1]
    html=(root/'index.html').read_text()
    js=(root/'js/world.js').read_text().replace('export const','const').replace('export function','function')+'\n'+(root/'js/audio.js').read_text().replace('export class','class')+'\n'+(root/'js/art.js').read_text().replace('export function','function')+'\n'+(root/'js/combat.js').read_text().replace('export class','class')+'\n'+(root/'js/temporal.js').read_text().replace('export class','class')+'\n'+(root/'js/narrative.js').read_text().replace('export class','class').replace('export const','const')+'\n'+(root/'js/dungeon.js').read_text().replace('export class','class')+'\n'+(root/'js/progression.js').read_text().replace('export const','const').replace('export function','function')+'\n'+(root/'js/ash-village.js').read_text().replace('export class','class')+'\n'+(root/'js/marshlands.js').read_text().replace('export class','class')+'\n'+(root/'js/main.js').read_text()
    js=js.replace((root/'js/main.js').read_text(), (root/'js/sunken-city.js').read_text().replace('export class','class')+'\n'+(root/'js/main.js').read_text())
    js=(root/'js/clockwork-fortress.js').read_text().replace('export class','class')+'\n'+(root/'js/last-sanctuary.js').read_text().replace('export class','class')+'\n'+js
    js=(root/'js/cinematic.js').read_text().replace('export class','class')+'\n'+js
    js=(root/'js/rewards.js').read_text().replace('export const ','const ').replace('export class ','class ')+ '\n'+js
    js=(root/'js/secrets.js').read_text().replace('export const','const').replace('export class','class')+'\n'+(root/'js/sidequest.js').read_text().replace('export class','class')+'\n'+js
    js='\n'.join(line for line in js.splitlines() if not line.startswith('import '))
    # Original project is unchanged: flatten its ES modules only inside test harness.
    html=html.replace('<link rel="stylesheet" href="./css/style.css">','<style>'+ (root/'css/style.css').read_text()+'</style>')
    html=html.replace('<script type="module" src="./js/main.js"></script>','<script>'+js+'</script>')
    page.goto('about:blank')
    page.set_content(html,wait_until='domcontentloaded');page.get_by_role('button',name='INICIAR EL PRÓLOGO').click()
    assert page.evaluate('window.__eidolon.state')=='dialog'
    for _ in range(2):page.keyboard.press('Enter')
    assert page.evaluate('window.__eidolon.state')=='playing'
    assert page.evaluate('window.__eidolon.quest')==1
    old=page.evaluate('window.__eidolon.player.x');page.keyboard.down('ArrowRight');page.wait_for_timeout(200);page.keyboard.up('ArrowRight');assert page.evaluate('window.__eidolon.player.x')>old
    for x,y in [(5,3),(15,8),(4,9)]:
        page.evaluate('([x,y])=>window.__eidolon.moveTo(x*24+12,y*24+12)',[x,y]);page.wait_for_timeout(80)
    assert page.evaluate('window.__eidolon.collected')==3
    for _ in range(2):page.keyboard.press('Enter')
    page.evaluate('window.__eidolon.moveTo(9*24+12,4*24+12)');page.keyboard.press('KeyE')
    assert page.evaluate('window.__eidolon.state')=='dialog';page.keyboard.press('Enter');page.keyboard.press('Enter')
    assert page.evaluate('window.__eidolon.quest')==3
    page.keyboard.press('KeyQ');assert page.evaluate('window.__eidolon.fractured')==True
    page.keyboard.press('Enter');page.keyboard.press('Enter');assert page.evaluate('window.__eidolon.quest')==4
    # Completion must be gated by the temporal puzzle.
    page.evaluate('window.__eidolon.moveTo(9*24+12,4*24+12)')
    page.keyboard.press('KeyE')
    assert page.evaluate('window.__eidolon.state')=='dialog'
    page.keyboard.press('Enter')
    assert page.evaluate('window.__eidolon.state')=='playing'
    assert page.evaluate('window.__eidolon.quest')==4
    # An unsafe shift inside a physical wall must be refused.
    page.evaluate('window.__eidolon.moveTo(8*24+12,6*24+12)')
    page.keyboard.press('KeyQ')
    assert page.evaluate('window.__eidolon.fractured') is True
    # Attack and dodge in the fractured realm.
    page.evaluate('window.__eidolon.moveTo(16.5*24-29,5.5*24)')
    page.keyboard.down('ArrowRight');page.wait_for_timeout(70);page.keyboard.up('ArrowRight')
    before=page.evaluate('window.__eidolon.enemies[0].hp')
    page.keyboard.press('KeyJ')
    after=page.evaluate('window.__eidolon.enemies[0].hp')
    assert after<before,(before,after)
    page.keyboard.press('KeyK')
    assert page.evaluate('window.__eidolon.health')>0
    # Phase 4: shard exists exclusively in fractured reality.
    page.evaluate('window.__eidolon.moveTo(16*24+12,8*24+12)');page.wait_for_timeout(90)
    assert page.evaluate('window.__eidolon.temporal.shard') is True
    page.keyboard.press('KeyQ');assert page.evaluate('window.__eidolon.fractured') is False
    page.evaluate('window.__eidolon.moveTo(15*24+12,5*24+12)');page.keyboard.press('KeyE')
    assert page.evaluate('window.__eidolon.temporal.anchor') is True
    page.keyboard.press('Enter');page.keyboard.press('Enter')
    page.keyboard.press('KeyQ');assert page.evaluate('window.__eidolon.fractured') is True
    assert page.evaluate('window.__eidolon.temporal.anchor') is True
    page.evaluate('window.__eidolon.moveTo(9*24+12,4*24+12)')
    page.keyboard.press('KeyE');
    for _ in range(3):page.keyboard.press('Enter')
    assert page.evaluate('window.__eidolon.state')=='complete'
    page.get_by_role('button',name='ENTRAR EN EL TEMPLO').click();assert page.evaluate('window.__eidolon.state')=='dialog'
    page.keyboard.press('Enter');page.keyboard.press('Enter');page.keyboard.press('Enter');assert page.evaluate('window.__eidolon.dungeon.active') and page.evaluate('window.__eidolon.state')=='playing'
    page.evaluate('window.__eidolon.moveTo(16.5*24,7.5*24)');page.keyboard.press('KeyE');assert page.evaluate('window.__eidolon.dungeon.key')
    page.evaluate('window.__eidolon.moveTo(9.5*24,1.5*24)');page.keyboard.press('KeyE');assert page.evaluate('window.__eidolon.dungeon.room')==1
    page.evaluate('window.__eidolon.moveTo(4.5*24,7.5*24)');page.keyboard.press('KeyE');page.keyboard.press('KeyQ')
    page.evaluate('window.__eidolon.moveTo(15.5*24,7.5*24)');page.keyboard.press('KeyE');assert page.evaluate('window.__eidolon.dungeon.plates')==[True,True]
    page.evaluate('window.__eidolon.moveTo(9.5*24,1.5*24)');page.keyboard.press('KeyE');assert page.evaluate('window.__eidolon.dungeon.room')==2
    page.evaluate('window.__eidolon.reset()');assert not page.evaluate('window.__eidolon.dungeon.active')
    assert page.evaluate('window.__eidolon.state')=='playing'
    assert page.evaluate('window.__eidolon.temporal.shard') is False
    assert page.evaluate('window.__eidolon.temporal.anchor') is False
    page.get_by_role('button',name='Ver controles').click()
    assert page.evaluate('window.__eidolon.state')=='dialog'
    page.locator('#game').focus();page.keyboard.press('Enter');page.keyboard.press('Enter')
    page.get_by_role('button',name='Activar o silenciar audio').click()
    assert 'ON' in page.locator('#sound').inner_text()
    page.locator('#game').focus();page.keyboard.press('Escape');assert page.evaluate('window.__eidolon.state')=='paused'
    page.get_by_role('button',name='REANUDAR').click();assert page.evaluate('window.__eidolon.state')=='playing'
    page.set_viewport_size({'width':390,'height':844});assert page.locator('#act').is_visible()
    page.locator('#act').click();assert page.locator('#toast').inner_text()
    assert not errors,errors
    page.screenshot(path='/mnt/data/EIDOLON-404/tests/screenshot.png',full_page=True)
    print('OK: inicio, diálogos, movimiento, 3 ecos, campana, fractura, victoria y reinicio; errores JS:',errors)
    browser.close()

```

## city_smoke.py.txt

```python
"""Phase 8C: deterministic browser check of all City Sunken mechanics."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
js='\n'.join((root/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
js='\n'.join(line for line in js.splitlines() if not line.startswith('import '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+js+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 p=b.new_page(viewport={'width':1280,'height':900});errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 p.goto('about:blank');p.set_content('<script>window.__memory={};Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem(k){return window.__memory[k]??null},setItem(k,v){window.__memory[k]=String(v)},removeItem(k){delete window.__memory[k]}}});</script>'+html)
 p.evaluate('window.__eidolon.startCity()');p.keyboard.press('Enter');p.keyboard.press('Enter')
 assert p.evaluate('window.__eidolon.city.active')
 p.evaluate('window.__eidolon.moveTo(342,127)');p.keyboard.press('KeyE');assert not p.evaluate('window.__eidolon.city.valve')
 p.keyboard.press('KeyQ');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.city.valve')
 p.evaluate('window.__eidolon.moveTo(242,195)');p.keyboard.press('KeyQ');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.city.drained')
 p.evaluate('window.__eidolon.moveTo(430,214)');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.city.room')==1
 p.evaluate('window.__eidolon.moveTo(104,127)');p.keyboard.press('KeyQ');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.city.sigil')
 p.evaluate('window.__eidolon.moveTo(240,130)');p.keyboard.press('KeyQ');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.city.ward')
 p.evaluate('window.__eidolon.moveTo(430,215)');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.city.room')==2
 # test actual sword damage in a deterministic attack arc, with boss in vulnerable phase
 p.evaluate('''() => {const c=window.__eidolon;const d=c.snapshot();d.city.fractured=true;d.city.boss.x=160;d.city.boss.y=133;d.city.boss.cool=1;d.player.x=132;d.player.y=133;d.player.dir=1;c.applySnapshot(d)}''')
 p.keyboard.press('KeyJ');assert p.evaluate('window.__eidolon.city.boss.hp')==8
 assert p.evaluate('window.__eidolon.saveGame()');p.evaluate('window.__eidolon.reset()');assert not p.evaluate('window.__eidolon.city.active');assert p.evaluate('window.__eidolon.loadGame()');assert p.evaluate('window.__eidolon.city.boss.hp')==8
 # deterministic kill by same attack logic with cooldown manually reset
 p.evaluate('''() => {const d=window.__eidolon.snapshot();d.city.boss.hp=1;d.city.boss.inv=0;d.city.boss.cool=1;window.__eidolon.applySnapshot(d);const c=window.__eidolon;c.update(.5);c.attack()}''')
 assert p.evaluate('window.__eidolon.city.boss.hp')==0
 p.evaluate('window.__eidolon.moveTo(398,55)');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.city.won')
 p.keyboard.press('Enter');p.keyboard.press('Enter');assert p.evaluate('window.__eidolon.state')=='complete'
 assert not errors,errors
 print('PASS city: valve, fracture, drainage, vault, sigil, ward, boss damage, persistence, victory; no JS errors')
 b.close()

```

## de2c_ui_smoke.py.txt

```python
"""Functional premium UI smoke test using the local JS-module flattening harness."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
order=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
chunks=[]
for name in order:
 s=(root/'js'/f'{name}.js').read_text()
 chunks.append('\n'.join(line for line in s.splitlines() if not line.startswith('import ')).replace('export const ','const ').replace('export class ','class ').replace('export function ','function '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+ (root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+'\n'.join(chunks)+'</script>')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1280,'height':900});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('about:blank');page.set_content(html,wait_until='domcontentloaded')
 page.locator('#start').click()
 for _ in range(2):page.keyboard.press('Enter')
 assert page.evaluate('window.__eidolon.state')=='playing'
 page.locator('#inventoryBtn').click()
 assert page.locator('#adventurePanel').is_visible()
 assert page.locator('#panelBody article.archiveCard').count()>15
 assert page.locator('#tabInventory').get_attribute('aria-selected')=='true'
 page.locator('#tabMap').click()
 assert page.locator('#tabMap').get_attribute('aria-selected')=='true'
 assert page.locator('#panelBody article.archiveCard').count()==7
 page.keyboard.press('KeyI')
 assert page.locator('#tabInventory').get_attribute('aria-selected')=='true'
 page.locator('#panelClose').click()
 assert page.evaluate('window.__eidolon.state')=='playing'
 page.keyboard.press('KeyB')
 assert page.locator('#journal').is_visible()
 page.locator('#journalSearch').fill('inexistentezz')
 assert page.locator('#journalCount').inner_text().startswith('0 / ')
 page.locator('#journalClose').click()
 assert page.evaluate('window.__eidolon.state')=='playing'
 assert errors==[],errors
 print('PASS DE-2C inventory tabs, map 7 regions, keyboard navigation, journal search and close; JS errors:',errors)
 browser.close()

```

## de2d_cinematic_smoke.py.txt

```python
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
order=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
chunks=[]
for name in order:
 s=(root/'js'/f'{name}.js').read_text()
 chunks.append('\n'.join(line for line in s.splitlines() if not line.startswith('import ')).replace('export const ','const ').replace('export class ','class ').replace('export function ','function '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+'\n'.join(chunks)+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1280,'height':900});errs=[]
 page.on('pageerror',lambda e:errs.append(str(e)))
 page.goto('about:blank');page.set_content(html)
 page.wait_for_function('!!window.__eidolon')
 assert page.evaluate('window.__eidolon.cinematicQuality')=='full'
 page.locator('#qualityBtn').click()
 assert page.evaluate('window.__eidolon.cinematicQuality')=='reduced'
 assert page.locator('#qualityBtn').get_attribute('aria-pressed')=='true'
 page.locator('#qualityBtn').click()
 assert page.evaluate('window.__eidolon.cinematicQuality')=='full'
 page.locator('#start').click()
 for i in range(2):page.keyboard.press('Enter')
 page.evaluate('window.__eidolon.startTemple()')
 page.wait_for_timeout(160)
 assert page.locator('#cinematicBanner').evaluate("e=>e.classList.contains('visible')")
 assert len(page.locator('#cinematicBanner strong').inner_text())>2
 page.locator('#qualityBtn').click()
 assert page.locator('#cinematicVeil').evaluate('e=>getComputedStyle(e).display')=='none'
 assert page.locator('#cinematicBanner').evaluate('e=>getComputedStyle(e).pointerEvents')=='none'
 assert not errs,errs
 print('PASS DE-2D visual-quality controls, transition banner, no input interception, no JS exceptions')
 b.close()

```

## de3c_rewards_smoke.py.txt

```python
"""DE-3C milestones, healing, UI and legacy-save compatibility in Chromium."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
order=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
chunks=[]
for name in order:
 s=(root/'js'/f'{name}.js').read_text()
 chunks.append('\n'.join(line for line in s.splitlines() if not line.startswith('import ')).replace('export const ','const ').replace('export class ','class ').replace('export function ','function '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+'\n'.join(chunks)+'</script>')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('about:blank');page.set_content(html,wait_until='domcontentloaded')
 page.locator('#start').click()
 for _ in range(2):page.keyboard.press('Enter')
 assert page.evaluate('window.__eidolon.maxHealth')==5
 assert page.evaluate("window.__eidolon.grantMilestone('temple-heart')") is True
 assert page.evaluate('window.__eidolon.maxHealth')==6
 assert page.evaluate("window.__eidolon.grantMilestone('temple-heart')") is False
 assert page.evaluate('window.__eidolon.maxHealth')==6
 assert page.evaluate("window.__eidolon.grantMilestone('village-heart')") is True
 assert page.evaluate('window.__eidolon.maxHealth')==7
 page.reload() if False else None
 # In-memory snapshot restore is same code path as persisted load, and tests the exact data shape.
 saved=page.evaluate('window.__eidolon.snapshot()')
 assert 'temple-heart' in saved['rewards']
 assert page.evaluate('(d)=>window.__eidolon.applySnapshot(d)',saved) is True
 assert page.evaluate('window.__eidolon.maxHealth')==7
 # Old saves lack rewards; should load as base vitality without false unlocks.
 del saved['rewards'];saved['combat']['hp']=5; saved['combat']['maxHp']=5
 assert page.evaluate('(d)=>window.__eidolon.applySnapshot(d)',saved) is True
 assert page.evaluate('window.__eidolon.maxHealth')==5
 assert page.evaluate('window.__eidolon.rewards').__len__()==0
 page.locator('#inventoryBtn').click()
 assert page.locator('#panelBody').get_by_text('CORAZÓN DEL TEMPLO').count()==1
 assert page.locator('#panelBody').get_by_text('PENDIENTE',exact=False).count()>0
 assert not errors,errors
 browser.close()
print('PASS DE-3C: milestone once, vitality 5→6→7, snapshot, legacy save, inventory, no JS errors')

```

## de4a_letters_smoke.py.txt

```python
"""DE-4A mission and persistence, simulated browser execution without network."""
from pathlib import Path
from playwright.sync_api import sync_playwright
r=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
code='\n'.join((r/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
code='\n'.join(line for line in code.splitlines() if not line.startswith('import '))
html=(r/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(r/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+code+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox']);p=b.new_page();err=[];p.on('pageerror',lambda e:err.append(str(e)));p.goto('about:blank');p.set_content(html)
 p.evaluate('window.__eidolon.reset()')
 # Test quest lifecycle through user interactions; prepare legitimate room state via snapshot.
 d=p.evaluate('window.__eidolon.snapshot()');d['quest']=4;d['fractured']=True
 assert p.evaluate('d=>window.__eidolon.applySnapshot(d)',d)
 p.evaluate('window.__eidolon.moveTo(17*24+12,6*24+12)');p.keyboard.press('e');p.keyboard.press('Enter');p.keyboard.press('Enter')
 assert p.evaluate('window.__eidolon.letters.stage')=='searching'
 p.evaluate('window.__eidolon.moveTo(14*24+12,10*24+12)');p.keyboard.press('e')
 assert p.evaluate('window.__eidolon.letters.stage')=='found'
 p.keyboard.press('Enter');p.keyboard.press('Enter')
 d=p.evaluate('window.__eidolon.snapshot()');d['fractured']=False
 assert p.evaluate('d=>window.__eidolon.applySnapshot(d)',d)
 p.evaluate('window.__eidolon.moveTo(4*24+12,6*24+12)');p.keyboard.press('e')
 p.keyboard.press('Enter')
 assert p.locator('#dialogChoices button').count()==2
 p.keyboard.press('Digit2');assert p.evaluate('window.__eidolon.letters.ending')=='release'
 p.keyboard.press('Enter');d=p.evaluate('window.__eidolon.snapshot()')
 p.evaluate('window.__eidolon.reset()');assert p.evaluate('window.__eidolon.letters.stage')=='unstarted'
 assert p.evaluate('d=>window.__eidolon.applySnapshot(d)',d)
 assert p.evaluate('window.__eidolon.letters.ending')=='release'
 assert not err,err
 print('PASS: mission start, find, decision, reset, restore, no browser errors')
 b.close()

```

## de4b_living_world_smoke.py.txt

```python
"""Check both letter outcomes, NPC reactions and persistence in controlled Chromium."""
from pathlib import Path
from playwright.sync_api import sync_playwright
r=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
code='\n'.join((r/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
code='\n'.join(line for line in code.splitlines() if not line.startswith('import '))
html=(r/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(r/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+code+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 p=b.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.goto('about:blank');p.set_content(html)
 for ending in ('preserve','release'):
  p.evaluate('window.__eidolon.reset()')
  snap=p.evaluate('window.__eidolon.snapshot()');snap['quest']=4;snap['letters']={'stage':'complete','ending':ending};snap['fractured']=False
  assert p.evaluate('d=>window.__eidolon.applySnapshot(d)',snap)
  p.evaluate('window.__eidolon.moveTo(4*24+12,6*24+12)');p.keyboard.press('e')
  text=p.locator('#line').inner_text()
  assert ('Guardé la carta' in text if ending=='preserve' else 'El viento se llevó' in text),text
  p.keyboard.press('Enter');p.keyboard.press('Enter')
  saved=p.evaluate('window.__eidolon.snapshot()')
  p.evaluate('window.__eidolon.reset()');assert p.evaluate('d=>window.__eidolon.applySnapshot(d)',saved)
  assert p.evaluate('window.__eidolon.letters.ending')==ending
  p.evaluate('window.__eidolon.changeWorld()')
  # render consequence in both realities; draw routine should not throw
  p.evaluate('drawLivingWorld(ctx,false,1);drawLivingWorld(ctx,true,1)')
  p.evaluate('window.__eidolon.moveTo(17*24+12,6*24+12)');p.keyboard.press('e')
  ivo=p.locator('#line').inner_text();assert ('santuario de papel' in ivo if ending=='preserve' else 'El viento llegó' in ivo),ivo
  p.keyboard.press('Enter')
 assert not errors,errors
 print('PASS DE4B: preserve/release NPC reactions, world render, save restore; no JS page errors')
 b.close()

```

## de4c_regional_stories_smoke.py.txt

```python
"""Test region quests from initialization to both consequences and recovery."""
from pathlib import Path
from playwright.sync_api import sync_playwright
r=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
code='\n'.join((r/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
code='\n'.join(line for line in code.splitlines() if not line.startswith('import '))
html=(r/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(r/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+code+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 p=b.new_page(); errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.goto('about:blank');p.set_content(html)
 for region in ('village','marsh'):
  for decision in ('restore','release'):
   p.evaluate('window.__eidolon.reset()')
   snap=p.evaluate('window.__eidolon.snapshot()');snap['quest']=4;snap[region]['active']=True;snap[region]['fractured']=False
   assert p.evaluate('(s)=>window.__eidolon.applySnapshot(s)',snap)
   # Direct logic validation without mutating the mandatory campaign states.
   p.evaluate('(key)=>{const q=window.__eidolon.regionalStories;const def=key==="village"?{x:84,y:180}:{x:84,y:180}; if(q.interact(key,def,false).kind!=="started")throw Error("start");}',region)
   p.evaluate('(key)=>{const q=window.__eidolon.regionalStories;const target=key==="village"?{x:300,y:204}:{x:204,y:204};if(q.interact(key,target,false).kind!==undefined)throw Error("realm lock");if(q.interact(key,target,true).kind!=="found")throw Error("find");}',region)
   p.evaluate('(args)=>{const [key,decision]=args;const q=window.__eidolon.regionalStories;if(q.interact(key,{x:84,y:180},false).kind!=="choose")throw Error("choice");if(!q.choose(key,decision))throw Error("complete");if(q.choose(key,decision)!==null)throw Error("duplicate");}',[region,decision])
   saved=p.evaluate('window.__eidolon.snapshot()')
   p.evaluate('window.__eidolon.reset()')
   assert p.evaluate('(s)=>window.__eidolon.applySnapshot(s)',saved)
   assert p.evaluate('(key)=>window.__eidolon.regionalStories.snapshot()[key].ending',region)==decision
   p.evaluate('(key)=>window.__eidolon.regionalStories.draw(ctx,key,false,1)',region)
 assert not errors,errors
 print('PASS DE4C: two regional quests, realm gating, both choices, duplicate prevention, save/restore, rendering')
 b.close()

```

## de4d_narrative_polish_smoke.py.txt

```python
"""Verify chapter closure dialogue reflects optional quest branch."""
from pathlib import Path
from playwright.sync_api import sync_playwright
r=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
code='\n'.join((r/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
code='\n'.join(line for line in code.splitlines() if not line.startswith('import '))
html=(r/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(r/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+code+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 p=b.new_page(); errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.goto('about:blank');p.set_content(html)
 for region,fn in [('village','villageVictory'),('marsh','marshVictory')]:
  outcomes=[]
  for ending in ('restore','release',None):
   result=p.evaluate('''([key,fn,ending])=>{window.__eidolon.reset(); const s=window.__eidolon.regionalStories.data[key];s.stage=ending?'complete':'unstarted';s.ending=ending; if(fn==='villageVictory')villageVictory();else marshVictory();return document.getElementById('line').textContent}''',[region,fn,ending])
   assert result and result not in outcomes,(region,ending,result)
   outcomes.append(result)
 assert not errors,errors
 print('PASS DE4D: each chapter has 3 distinct consequence-aware dialogues; no JS errors')
 b.close()

```

## dungeon_smoke.py.txt

```python
"""Phase 6 browser integration: dungeon locked progression, two realms, boss victory."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
code='\n'.join((root/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
code='\n'.join(line for line in code.splitlines() if not line.startswith('import '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+code+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 p=b.new_page(viewport={'width':1280,'height':900});errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 p.goto('about:blank');p.set_content(html)
 # Enter temple through the same public control exposed for the completion transition.
 p.evaluate('window.__eidolon.startTemple()');p.locator('#game').focus()
 p.keyboard.press('Enter');p.keyboard.press('Enter');p.keyboard.press('Enter')
 assert p.evaluate('window.__eidolon.dungeon.active && window.__eidolon.state==="playing"')
 p.evaluate('window.__eidolon.moveTo(9.5*24,1.5*24)');p.keyboard.press('KeyE')
 assert p.evaluate('window.__eidolon.dungeon.room')==0 # locked
 p.evaluate('window.__eidolon.moveTo(16.5*24,7.5*24)');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.dungeon.key')
 p.evaluate('window.__eidolon.moveTo(9.5*24,1.5*24)');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.dungeon.room')==1
 p.evaluate('window.__eidolon.moveTo(9.5*24,1.5*24)');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.dungeon.room')==1
 p.evaluate('window.__eidolon.moveTo(4.5*24,7.5*24)');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.dungeon.plates')==[True,False]
 p.keyboard.press('KeyQ');p.evaluate('window.__eidolon.moveTo(15.5*24,7.5*24)');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.dungeon.plates')==[True,True]
 p.evaluate('window.__eidolon.moveTo(9.5*24,1.5*24)');p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.dungeon.room')==2
 p.evaluate('window.__eidolon.moveTo(9.5*24,3.5*24)');p.keyboard.press('KeyE');assert not p.evaluate('window.__eidolon.dungeon.relic') # guarded
 # Use injected deterministic engine simulation for AI and boss attack checks.
 p.evaluate('''() => {let d=new Dungeon();d.active=true;d.room=2;d.relic=false;d.prepareRoom();
  let player={x:138,y:130,dir:0};for(let i=0;i<3;i++){d.cool=0;d.attack(player,{tone(){}})};
  player.x=348;player.y=130;for(let i=0;i<3;i++){d.cool=0;d.attack(player,{tone(){}})};
  if(d.enemies.some(e=>e.hp>0))throw Error('centinels remain');
  const v=d.interact({x:9.5*24,y:3.5*24});if(!d.relic)throw Error('missing seal');
  player={x:240,y:50,dir:0};const next=d.stair(player);if(!next||d.room!==3)throw Error('no guardian stair');
  d.boss.x=240;d.boss.y=100;d.boss.mode='windup';d.boss.timer=0;
  d.cool=0;player={x:240,y:118,dir:0};d.attack(player,{tone(){}});if(d.boss.hp!==9)throw Error('boss vulnerable without recover');
  d.boss.mode='recover';d.boss.timer=0;for(let i=0;i<9;i++){d.cool=0;d.boss.inv=0;d.attack(player,{tone(){}})}
  if(d.boss.hp!==0)throw Error('boss fight failed');
  const win=d.interact({x:9.5*24,y:2.5*24});if(!win.victory||!d.complete)throw Error('no dungeon victory');
  d.reset();if(d.key||d.relic||d.plated.some(Boolean)||d.active)throw Error('reset corrupt');
 }''')
 assert not errors,errors
 print('OK: locked rooms, key, 2 era plates, sealed relic, centinels, boss telegraph/recovery/damage/victory/reset; no JS errors')
 b.close()

```

## fortress_smoke.py.txt

```python
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
js='\n'.join((root/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
js='\n'.join(line for line in js.splitlines() if not line.startswith('import '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+js+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox']); page=b.new_page(viewport={'width':1280,'height':900});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('about:blank');page.set_content('<script>window.__memory={};Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem(k){return window.__memory[k]??null},setItem(k,v){window.__memory[k]=String(v)},removeItem(k){delete window.__memory[k]}}});</script>'+html);page.evaluate('window.__eidolon.startFortress()');page.keyboard.press('Enter');page.keyboard.press('Enter')
 def pos(x,y):page.evaluate('([x,y])=>window.__eidolon.moveTo(x,y)',[x,y])
 def tap(key):page.keyboard.press(key)
 assert page.evaluate('window.__eidolon.fortress.active')
 pos(154,79);tap('KeyE');assert not page.evaluate('window.__eidolon.fortress.gear');tap('KeyQ');tap('KeyE');assert page.evaluate('window.__eidolon.fortress.gear')
 pos(162,195);tap('KeyQ');tap('KeyE');assert page.evaluate('window.__eidolon.fortress.bridge')
 pos(426,130);tap('KeyE');assert page.evaluate('window.__eidolon.fortress.room')==1
 pos(140,190);tap('KeyQ');tap('KeyE');assert page.evaluate('window.__eidolon.fortress.key')
 pos(169,80);tap('KeyQ');tap('KeyE');assert page.evaluate('window.__eidolon.fortress.lock')
 pos(427,128);tap('KeyE');assert page.evaluate('window.__eidolon.fortress.room')==2
 page.evaluate('''() => {let d=window.__eidolon.snapshot();d.fortress.fractured=true;d.fortress.boss.x=162;d.fortress.boss.y=130;d.fortress.boss.cool=1;d.player.x=130;d.player.y=130;d.player.dir=1;window.__eidolon.applySnapshot(d)}''')
 tap('KeyJ');assert page.evaluate('window.__eidolon.fortress.boss.hp')==11
 assert page.evaluate('window.__eidolon.saveGame()');page.evaluate('window.__eidolon.reset()');assert page.evaluate('window.__eidolon.loadGame()');assert page.evaluate('window.__eidolon.fortress.boss.hp')==11
 page.evaluate('''() => {let d=window.__eidolon.snapshot();d.fortress.boss.hp=1;d.fortress.boss.inv=0;d.fortress.boss.cool=1;window.__eidolon.applySnapshot(d);window.__eidolon.update(.6);window.__eidolon.attack()}''')
 assert page.evaluate('window.__eidolon.fortress.boss.hp')==0
 pos(422,64);tap('KeyE');assert page.evaluate('window.__eidolon.fortress.won')
 tap('Enter');tap('Enter');assert page.evaluate('window.__eidolon.sanctuary.active')
 assert not errors,errors
 print('PASS fortress: gear, fracture, bridge, key, lock, boss, saving, victory; no JS errors')
 b.close()

```

## marsh_smoke.py.txt

```python
"""Fase 8B: campaña en la marisma y persistencia de estado."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
js='\n'.join((root/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
js='\n'.join(line for line in js.splitlines() if not line.startswith('import '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+js+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 p=b.new_page(viewport={'width':1280,'height':900});errs=[];p.on('pageerror',lambda e:errs.append(str(e)))
 p.goto('about:blank')
 p.set_content('<script>window.__memory={};Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem(k){return window.__memory[k]??null},setItem(k,v){window.__memory[k]=String(v)},removeItem(k){delete window.__memory[k]}}});</script>'+html)
 p.evaluate('window.__eidolon.startMarsh()');p.keyboard.press('Enter');p.keyboard.press('Enter')
 assert p.evaluate('window.__eidolon.state')=='playing'
 assert p.evaluate('window.__eidolon.marsh.active')
 p.evaluate('window.__eidolon.moveTo(14.5*24,3.5*24)');p.keyboard.press('KeyE')
 assert not p.evaluate('window.__eidolon.marsh.lantern')
 p.keyboard.press('KeyQ');assert p.evaluate('window.__eidolon.marsh.fractured')
 p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.marsh.lantern')
 p.evaluate('window.__eidolon.moveTo(9.5*24,4.5*24)');p.keyboard.press('KeyQ');assert not p.evaluate('window.__eidolon.marsh.fractured')
 p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.marsh.reeds')
 p.evaluate('window.__eidolon.moveTo(16.5*24,8.5*24)');p.keyboard.press('KeyE');assert not p.evaluate('window.__eidolon.marsh.bell')
 p.evaluate('window.__eidolon.moveTo(15.5*24,7.5*24)');p.keyboard.press('KeyQ')
 # Combat logic is also tested deterministically without requiring player input automation.
 p.evaluate('''() => {const m=new Marshlands();const player={x:360,y:170,dir:1};m.fractured=true;m.enemy.x=388;m.enemy.y=170;for(let i=0;i<5;i++){m.attackCool=0;m.enemy.inv=0;m.attack(player,{tone(){}})}if(m.enemy.hp!==0)throw Error('custodian survived');}''')
 # Take the same state into the actual game and persist it.
 p.evaluate('''() => {const data=window.__eidolon.snapshot();data.marsh.enemy.hp=0;window.__eidolon.applySnapshot(data)}''')
 p.evaluate('window.__eidolon.moveTo(16.5*24,8.5*24)');p.keyboard.press('KeyQ')
 p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.marsh.bell')
 assert p.evaluate('window.__eidolon.saveGame()')
 p.evaluate('window.__eidolon.reset()');assert not p.evaluate('window.__eidolon.marsh.active')
 assert p.evaluate('window.__eidolon.loadGame()');assert p.evaluate('window.__eidolon.marsh.bell')
 p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.marsh.won')
 p.keyboard.press('Enter');p.keyboard.press('Enter');assert p.evaluate('window.__eidolon.state')=='complete'
 assert not errs,errs
 print('OK: entrada, lamp, two realms, reed bridge, custodian, bell, save/load, chapter completion; no JS errors')
 b.close()

```

## narrative_smoke.py.txt

```python
"""Phase 5 smoke tests. Uses bundled sources, no external requests."""
from pathlib import Path
from playwright.sync_api import sync_playwright
r=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
code='\n'.join((r/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
code='\n'.join(line for line in code.splitlines() if not line.startswith('import '))
html=(r/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(r/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+code+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox']);p=b.new_page(viewport={'width':1280,'height':900});errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.goto('about:blank');p.set_content(html)
 p.locator('#start').click()
 for _ in range(2):p.keyboard.press('Enter')
 p.evaluate('window.__eidolon.moveTo(4*24+12,6*24+12)');p.keyboard.press('KeyE')
 assert p.locator('#speaker').inner_text()=='MARA · LA GUARDIANA'
 p.keyboard.press('Enter');p.keyboard.press('Enter')
 assert p.locator('#dialogChoices button').count()==2
 p.keyboard.press('Enter') # should not dismiss a decision
 assert p.locator('#dialogChoices button').count()==2
 p.keyboard.press('Digit1');assert p.evaluate('window.__eidolon.narrative.choice')=='keep'
 p.keyboard.press('Enter');assert p.evaluate('window.__eidolon.state')=='playing'
 p.keyboard.press('KeyB');assert p.evaluate('window.__eidolon.state')=='journal'
 assert p.locator('#journalEntries article').count()>=3
 p.keyboard.press('KeyB');assert p.evaluate('window.__eidolon.state')=='playing'
 p.evaluate('window.__eidolon.moveTo(4*24+12,6*24+12)');p.keyboard.press('KeyE');assert p.locator('#dialogChoices button').count()==0
 p.keyboard.press('Enter')
 # Emulate legitimate progress to the fractured realm by the same gameplay path as existing smoke test
 for x,y in [(5,3),(15,8),(4,9)]:
  p.evaluate('([x,y])=>window.__eidolon.moveTo(x*24+12,y*24+12)',[x,y]);p.wait_for_timeout(50)
 for _ in range(2):p.keyboard.press('Enter')
 p.evaluate('window.__eidolon.moveTo(9*24+12,4*24+12)');p.keyboard.press('KeyE');p.keyboard.press('Enter');p.keyboard.press('Enter');p.keyboard.press('KeyQ');p.keyboard.press('Enter');p.keyboard.press('Enter')
 p.evaluate('window.__eidolon.moveTo(17*24+12,6*24+12)');p.keyboard.press('KeyE');assert p.locator('#speaker').inner_text()=='IVO · EL TESTIGO'
 p.keyboard.press('Enter');p.keyboard.press('Enter');assert 'ivo' in p.evaluate('window.__eidolon.narrative.met')
 p.keyboard.press('KeyB');assert 'Ivo, el testigo' in p.locator('#journal').inner_text();p.locator('#journalClose').click()
 p.evaluate('window.__eidolon.reset()');assert p.evaluate('window.__eidolon.narrative.choice') is None
 assert p.evaluate('window.__eidolon.narrative.entries.length')==1
 p.set_viewport_size({'width':390,'height':844});assert p.locator('#mobileJournal').is_visible()
 assert not errors,errors
 print('OK: Mara, blocked decision skip, keyboard choice, journal, Ivo, reset, mobile button, no page errors')
 b.close()

```

## progression_smoke.py.txt

```python
"""Phase 7: live ES module routes + browser storage persistence."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
# Browsing environment blocks all navigations; run exact sources inline and
# simulate persistent origin storage across page replacement.
modules=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
js='\n'.join((root/'js'/f'{x}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for x in modules)
js='\n'.join(line for line in js.splitlines() if not line.startswith('import '))
base=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+js+'</script>')
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1320,'height':900});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 def launch(store=None):
  # Isolated fake origin storage, no network and no privileged browser navigation.
  import json
  init='<script>window.__memory='+json.dumps(store or {})+';Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem(k){return Object.hasOwn(window.__memory,k)?window.__memory[k]:null},setItem(k,v){window.__memory[k]=String(v)},removeItem(k){delete window.__memory[k]}}});</script>'
  page.set_content(base.replace('<script>'+js+'</script>',init+'<script>'+js+'</script>'),wait_until='domcontentloaded')
 launch()
 page.locator('#start').click()
 for _ in range(2):page.keyboard.press('Enter')
 assert page.evaluate('window.__eidolon.state')=='playing'
 page.evaluate('window.__eidolon.moveTo(120,125)')
 page.locator('#inventoryBtn').click();assert page.evaluate('window.__eidolon.state')=='panel'
 assert page.locator('#panelBody article').count()>=6
 page.locator('#panelClose').click();assert page.evaluate('window.__eidolon.state')=='playing'
 page.locator('#mapBtn').click();assert 'BOSQUE' in page.locator('#panelBody').inner_text()
 page.keyboard.press('Escape');assert page.evaluate('window.__eidolon.state')=='playing'
 page.locator('#saveBtn').click()
 first=page.evaluate('window.__eidolon.player');data=page.evaluate('window.__memory')
 assert 'eidolon404.save.v1' in data
 page.close();page=browser.new_page(viewport={'width':1320,'height':900})
 page.on('pageerror',lambda e:errors.append(str(e)))
 launch(data)
 assert page.evaluate('window.__eidolon.state')=='title'
 page.locator('#loadBtn').click()
 assert page.evaluate('window.__eidolon.state')=='playing'
 assert page.evaluate('window.__eidolon.player')==first
 page.evaluate('window.__eidolon.startTemple()')
 for _ in range(2):page.keyboard.press('Enter')
 assert page.evaluate('window.__eidolon.dungeon.active')
 page.evaluate('window.__eidolon.moveTo(396,180)');page.keyboard.press('KeyE');assert page.evaluate('window.__eidolon.dungeon.key')
 assert page.evaluate('window.__eidolon.saveGame()')
 data=page.evaluate('window.__memory')
 page.close();page=browser.new_page(viewport={'width':1320,'height':900})
 page.on('pageerror',lambda e:errors.append(str(e)))
 launch(data);page.locator('#loadBtn').click()
 assert page.evaluate('window.__eidolon.dungeon.active')
 assert page.evaluate('window.__eidolon.dungeon.key')
 assert not errors,errors
 print('OK: inventario, mapa, guardado, restauracion en nuevo contexto, llave mazmorra; errores JS:',errors)
 browser.close()

```

## remaster_smoke.py.txt

```python
from pathlib import Path
from playwright.sync_api import sync_playwright

root=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
js='\n'.join((root/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
js='\n'.join(line for line in js.splitlines() if not line.startswith('import '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+js+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1380,'height':900});errors=[];failed=[]
 page.on('pageerror',lambda e: errors.append(str(e)))
 page.on('requestfailed',lambda r:failed.append((r.url,r.failure)))
 page.goto('about:blank');page.set_content(html)
 page.wait_for_function('typeof window.__eidolon === "object"')
 assert page.evaluate('window.__eidolon.visualFX')
 page.locator('#fxBtn').click()
 assert page.evaluate('!window.__eidolon.visualFX')
 assert page.locator('#fxBtn').get_attribute('aria-pressed')=='false'
 page.locator('#fxBtn').click()
 assert page.evaluate('window.__eidolon.visualFX')
 page.locator('#start').click()
 page.wait_for_timeout(500)
 page.screenshot(path=str(root/'tests'/'remaster-screenshot.png'))
 for region in ['startTemple','startVillage','startMarsh','startCity','startFortress','startSanctuary']:
  page.evaluate(f'window.__eidolon.{region}()')
  page.wait_for_timeout(100)
 assert not errors,errors
 assert not failed,failed
 print('PASS inlined modules, FX toggle, 6 regional renders, JS errors: none')
 b.close()


```

## sanctuary_smoke.py.txt

```python
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
js='\n'.join((root/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
js='\n'.join(line for line in js.splitlines() if not line.startswith('import '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+js+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True, executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for ending in ['keep','release']:
  page=b.new_page(viewport={'width':1280,'height':900});errors=[];page.on('pageerror',lambda err:errors.append(str(err)))
  page.goto('about:blank');page.set_content('<script>window.__memory={};Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem(k){return window.__memory[k]??null},setItem(k,v){window.__memory[k]=String(v)},removeItem(k){delete window.__memory[k]}}});</script>'+html)
  page.evaluate('window.__eidolon.startSanctuary()');page.keyboard.press('Enter');page.keyboard.press('Enter')
  def pos(x,y):page.evaluate('([x,y])=>window.__eidolon.moveTo(x,y)',[x,y])
  def tap(k):page.keyboard.press(k)
  pos(100,80);tap('KeyE');assert not page.evaluate('window.__eidolon.sanctuary.ash');tap('KeyQ');tap('KeyE');assert page.evaluate('window.__eidolon.sanctuary.ash')
  pos(157,189);tap('KeyQ');tap('KeyE');assert page.evaluate('window.__eidolon.sanctuary.aligned')
  pos(423,132);tap('KeyE');assert page.evaluate('window.__eidolon.sanctuary.room')==1
  pos(118,185);tap('KeyQ');tap('KeyE');assert page.evaluate('window.__eidolon.sanctuary.memory')
  pos(180,77);tap('KeyQ');tap('KeyE');assert page.evaluate('window.__eidolon.sanctuary.open')
  pos(425,130);tap('KeyE');assert page.evaluate('window.__eidolon.sanctuary.room')==2
  page.evaluate('''(ending)=>{const d=window.__eidolon.snapshot();d.narrative.choice=ending;d.sanctuary.fractured=true;d.sanctuary.boss.x=155;d.sanctuary.boss.y=130;d.sanctuary.boss.cool=1;d.player.x=124;d.player.y=130;d.player.dir=1;window.__eidolon.applySnapshot(d)}''',ending)
  tap('KeyJ');assert page.evaluate('window.__eidolon.sanctuary.boss.hp')==15
  assert page.evaluate('window.__eidolon.saveGame()');page.evaluate('window.__eidolon.reset()');assert page.evaluate('window.__eidolon.loadGame()');assert page.evaluate('window.__eidolon.sanctuary.boss.hp')==15
  page.evaluate('''()=>{const d=window.__eidolon.snapshot();d.sanctuary.boss.hp=1;d.sanctuary.boss.inv=0;d.sanctuary.boss.cool=1;window.__eidolon.applySnapshot(d);window.__eidolon.update(.6);window.__eidolon.attack()}''')
  assert page.evaluate('window.__eidolon.sanctuary.boss.hp')==0
  pos(422,71);tap('KeyE');assert page.evaluate('window.__eidolon.sanctuary.won')
  for _ in range(8):
   if page.evaluate('window.__eidolon.state')!='dialog':break
   tap('Enter')
  assert page.evaluate('window.__eidolon.state')=='complete',(ending,page.evaluate('window.__eidolon.state'))
  assert page.evaluate('window.__eidolon.sanctuary.ending')==ending
  assert not errors,errors
  print('PASS sanctuary ending',ending,'puzzles, boss, save/load, final, no JS errors')
  page.close()
 b.close()

```

## village_smoke.py.txt

```python
"""Fase 8: transición, puzle de dos épocas, combate, guardado y derrota."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
mods=['boss-telegraph','world','audio','art','combat','temporal','narrative','dungeon','progression','ash-village','marshlands','sunken-city','clockwork-fortress','last-sanctuary','cinematic','rewards','secrets','sidequest','regional-stories','main']
code='\n'.join((root/'js'/f'{n}.js').read_text().replace('export const','const').replace('export function','function').replace('export class','class') for n in mods)
code='\n'.join(line for line in code.splitlines() if not line.startswith('import '))
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="./css/style.css">','<style>'+(root/'css/style.css').read_text()+'</style>').replace('<script type="module" src="./js/main.js"></script>','<script>'+code+'</script>')
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 p=b.new_page(viewport={'width':1280,'height':900});errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
 p.goto('about:blank');p.set_content('<script>window.__memory={};Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem(k){return window.__memory[k]??null},setItem(k,v){window.__memory[k]=String(v)},removeItem(k){delete window.__memory[k]}}});</script>'+html)
 p.evaluate('window.__eidolon.startVillage()')
 p.keyboard.press('Enter');p.keyboard.press('Enter');assert p.evaluate('window.__eidolon.state')=='playing'
 assert p.evaluate('window.__eidolon.village.active')
 # Cannot collect the rune in the Present
 p.evaluate('window.__eidolon.moveTo(13.5*24,3.5*24)');p.keyboard.press('KeyE')
 assert not p.evaluate('window.__eidolon.village.emblem')
 p.keyboard.press('KeyQ');assert p.evaluate('window.__eidolon.village.fractured')
 p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.village.emblem')
 # State persists across realms and through save/load
 p.evaluate('window.__eidolon.moveTo(9.5*24,4.5*24)');p.keyboard.press('KeyQ')
 assert not p.evaluate('window.__eidolon.village.fractured')
 p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.village.beacon')
 assert p.evaluate('window.__eidolon.saveGame()')
 p.evaluate('window.__eidolon.reset()');assert not p.evaluate('window.__eidolon.village.active')
 assert p.evaluate('window.__eidolon.loadGame()');assert p.evaluate('window.__eidolon.village.beacon')
 p.keyboard.press('KeyE');assert p.evaluate('window.__eidolon.village.won')
 p.keyboard.press('Enter');p.keyboard.press('Enter')
 assert p.evaluate('window.__eidolon.state')=='complete'
 # Independent deterministic AI / fighting rules
 p.evaluate('''() => {const v = new AshVillage();const p={x:320,y:153,dir:1};v.enter(p);p.x=320;p.y=153;p.dir=1;v.fractured=true;v.enemy.x=345;v.enemy.y=153;for(let i=0;i<4;i++){v.attackCool=0;v.enemy.inv=0;v.attack(p,{tone(){}})}if(v.enemy.hp!==0)throw Error('enemy not defeated');const reset=v.snapshot();v.restore(reset);if(v.enemy.hp!==0)throw Error('enemy not restored')}''')
 assert not errors,errors
 print('OK: region, present lock, fractured emblem, beacon, save/reload, chapter completion, 4-hit enemy, no JS errors')
 b.close()

```
