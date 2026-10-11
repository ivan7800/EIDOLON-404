#!/usr/bin/env python3
"""Lanzador local de EIDOLON 404. No instala dependencias ni usa red externa."""
import argparse
import functools
import http.server
import os
from pathlib import Path
import socket
import sys
import threading
import time
import urllib.request
import webbrowser

ROOT = Path(__file__).resolve().parent
REQUIRED = ['index.html', 'css/style.css', 'js/main.js', 'js/world.js', 'js/art.js', 'js/combat.js', 'js/progression.js', 'js/audio.js', 'js/last-sanctuary.js']

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def log_message(self, fmt, *args):
        print('[HTTP] '+fmt % args, flush=True)

def main():
    parser=argparse.ArgumentParser(description='Ejecuta EIDOLON 404 en localhost')
    parser.add_argument('--check', action='store_true', help='Solo comprueba archivos')
    parser.add_argument('--no-browser', action='store_true', help='No abre el navegador')
    parser.add_argument('--port', type=int, default=8404, help='Puerto estable (8404 por defecto); usa siempre el mismo para conservar la partida')
    args=parser.parse_args()
    if not 1 <= args.port <= 65535:
        parser.error('El puerto debe estar entre 1 y 65535')
    print('\n=== EIDOLON 404 | LANZADOR LOCAL ===',flush=True)
    missing=[f for f in REQUIRED if not (ROOT/f).is_file()]
    if missing:
        print('ERROR: faltan archivos:', *missing, sep='\n  - ',flush=True)
        return 2
    print('Integridad basica: OK ('+str(len(REQUIRED))+' archivos esenciales).',flush=True)
    # Comprueba todo el grafo de módulos ES antes de abrir el navegador.
    import re
    seen = set()
    def check_module(path):
        path = path.resolve()
        if path in seen:
            return []
        seen.add(path)
        if not path.is_file() or ROOT not in path.parents:
            return [str(path)]
        missing = []
        for rel in re.findall(r"(?:import|export)\s+(?:[^;]*?\s+from\s+)?[\"'](\.[^\"']+)[\"']", path.read_text(encoding='utf-8')):
            missing.extend(check_module(path.parent / rel))
        return missing
    missing_modules = check_module(ROOT / 'js/main.js')
    if missing_modules:
        print('ERROR: dependencias JavaScript ausentes:', *missing_modules, sep='\n  - ', flush=True)
        return 2
    print(f'Modulos JavaScript comprobados: {len(seen)}.', flush=True)
    if args.check: return 0
    try:
        server=http.server.ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    except OSError as exc:
        print('ERROR al arrancar el servidor:',exc,flush=True)
        print('El puerto fijo puede estar ocupado. Cierra el otro lanzador y reintenta. No se cambia de puerto para evitar ocultar tus partidas.',flush=True)
        return 3
    url=f'http://127.0.0.1:{server.server_port}/'
    print('Direccion del juego: '+url,flush=True)
    print('Deja abierta esta ventana. Para detener el juego, CTRL+C.',flush=True)
    thread=threading.Thread(target=server.serve_forever,daemon=True)
    thread.start()
    try:
        with urllib.request.urlopen(url, timeout=5) as response:
            if response.status != 200:
                print('ERROR HTTP:',response.status,flush=True)
                return 4
        with urllib.request.urlopen(url+'js/main.js', timeout=5) as response:
            if response.status != 200 or 'javascript' not in response.headers.get('Content-Type',''):
                print('ERROR: el modulo JS no se sirve correctamente',flush=True)
                return 5
        print('Comprobacion HTTP y JavaScript: OK.',flush=True)
        if not args.no_browser:
            print('Abriendo navegador...',flush=True)
            opened=webbrowser.open(url)
            if not opened:
                print('No se ha podido abrir automaticamente. Copia esta URL: '+url,flush=True)
        while True:time.sleep(0.25)
    except KeyboardInterrupt:
        print('\nCerrando servidor local...',flush=True)
    except Exception as exc:
        print('ERROR: '+str(exc),flush=True)
        return 6
    finally:
        server.shutdown()
        server.server_close()
    return 0

if __name__=='__main__':sys.exit(main())
