# EIDOLON 404 — El reino de las horas muertas

Aventura original de exploración, combate y puzles entre dos realidades. HTML5 Canvas, JavaScript nativo y recursos locales, sin frameworks ni CDN.

**Entrega: ENV4.2 · Paquete para GitHub.** Conserva los escenarios de Environment Overhaul 4. Candidata a pruebas; no certificada como versión final.

## Arrancar

Descomprime todo el ZIP. Requiere Python 3 y un navegador moderno.

- **Windows:** abre `INICIAR-WINDOWS.bat`.
- **Linux Mint:** abre una terminal en la carpeta y ejecuta `bash INICIAR-LINUX.sh`.
- **Alternativa:** `python3 launcher.py` (Windows: `py -3 launcher.py`).

La dirección es siempre **http://127.0.0.1:8404/**. Mantén abierta la terminal. Detén el servidor con Ctrl+C. No abras `index.html` directamente.

Si el puerto está ocupado, cierra el otro lanzador y vuelve a intentarlo. El juego no cambia automáticamente de puerto. Para elegir otro: `python3 launcher.py --port 8405`; usa después siempre ese mismo puerto.

## Partidas guardadas

F5 guarda, F9 carga. Hay autoguardado durante el juego. La partida queda en el `localStorage` del navegador y de la dirección exacta (protocolo, nombre de host y puerto).

El lanzador anterior elegía un puerto distinto en cada ejecución. Los guardados antiguos no se trasladan automáticamente al puerto 8404. Si conservas la dirección anterior, puedes abrir el servidor con `--port NUMERO_ANTERIOR` y visitar la misma dirección en el mismo navegador y perfil. No borres los datos de navegación si quieres conservar ese progreso.

Los guardados versión 1 válidos siguen siendo compatibles. Los guardados malformados detectados se rechazan antes de reiniciar la partida en curso. No hay sincronización ni exportación de partidas.

## Controles

| Acción | Tecla |
|---|---|
| Mover | WASD / flechas |
| Interactuar / continuar | E / Espacio / Intro |
| Cambiar realidad | Q |
| Atacar / esquivar | J / K |
| Inventario / mapa / diario | I / M / B |
| Elegir respuesta | 1 / 2 |
| Guardar / cargar | F5 / F9 |
| Pausar / cerrar panel | Escape |

Tab conserva la navegación nativa. Los campos de texto no ejecutan atajos del juego; Escape permite cerrar el diario. Controles táctiles disponibles en pantallas pequeñas. El botón táctil A es «usar»; la tecla A del teclado mueve a la izquierda.

## Campaña

Bosque de las Campanas → Templo de las Horas Rotas → Aldea de Ceniza → Marismas del Olvido → Ciudad Sumergida → Fortaleza de los Relojeros → Santuario del Último Segundo.

Incluye misiones opcionales y dos finales según el juramento con Mara. Sin juramento se aplica el final de liberar las horas.

## Comprobaciones

Para comprobar los archivos necesarios para jugar, usa `COMPROBAR-WINDOWS.bat` o `bash COMPROBAR-LINUX.sh`.

Pruebas de desarrollo (Python 3 y Node.js):

```bash
python3 tests/run_checks.py
```

Prueba de navegador (dependencias solo de desarrollo):

```bash
python3 -m pip install playwright
python3 -m playwright install chromium
python3 tests/run_checks.py --browser
```

En Windows sustituye `python3` por `py -3`. La prueba de lanzador necesita el puerto 8404 libre.

El test nuevo de navegador sirve los módulos sin transformarlos por HTTP, bajo una subcarpeta, y usa almacenamiento real. En esta entrega está **preparado pero no ejecutado**: no se pudo instalar Chromium en el entorno de revisión. Las pruebas ejecutadas y sus límites están en `docs/ESTABILIZACION-QA.md`.

Los 17 scripts que concatenaban módulos se conservan como referencia en `docs/PRUEBAS-HISTORICAS.md`. No forman parte del gate vigente. Todavía falta migrar su cobertura completa de campaña y ambos finales; no deben usarse sus resultados históricos para certificar esta entrega.

## Antes de publicar

- Ejecutar el gate con `--browser`.
- Recorrer la campaña completa y ambos finales sin depuración.
- Probar derrota, recuperación, guardado y cierre/reapertura en Windows y Linux Mint.
- Revisar controles táctiles y oclusión visual en las siete regiones.
- Comprobar las rutas y carga real en GitHub Pages.

El balance, la duración y la calidad artística necesitan evaluación de juego real. Los documentos de fases previas son históricos; esta guía y `docs/ESTABILIZACION-QA.md` describen el estado actual.

## Licencia

Consulta `LICENSE`. Proyecto original, no afiliado a ninguna franquicia.

## Subir a GitHub y activar Pages

1. Sube **el contenido** de esta carpeta a la raíz del repositorio: `index.html`, `js/`, `css/`, `assets/`, `.github/` y el resto de archivos. No subas solo el ZIP ni dejes `index.html` dentro de otra carpeta.
2. En **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**.
3. En **Actions**, ejecuta **Validate and deploy Pages** sobre `main`, o realiza un push a `main` después de configurar Pages.
4. La publicación se ejecuta únicamente si pasan integridad, pruebas de lógica, arranque, empaquetado y prueba HTTP en Chromium.
5. Abre la URL indicada en el despliegue. No se ha publicado ni comprobado un enlace remoto durante la preparación de este ZIP.

El workflow se ejecuta también en pull requests, sin desplegarlos. Consulta `docs/GITHUB.md` para pasos y diagnóstico. Si usas otra rama principal, cambia `main` en el workflow.

## Estructura del repositorio

- `index.html`, `css/`, `js/`, `assets/`: juego y recursos locales.
- `launcher.py`, lanzadores `.bat` y `.sh`: ejecución local.
- `tests/`: comprobaciones vigentes.
- `scripts/build_site.py`: genera `_site/` con los archivos web necesarios.
- `.github/workflows/pages.yml`: verificación y despliegue condicionado al éxito.
- `docs/`: guía GitHub, estado de QA y antecedentes.

Licencia MIT de I. Roig conservada. La preparación del repositorio no equivale a haber completado la campaña ni a haber superado todavía el workflow remoto.
