# Publicación en GitHub

## Estructura al subir

Descomprime el ZIP. El archivo `index.html` debe estar directamente en la raíz del repositorio, junto con `README.md`, `LICENSE`, `.github/`, `assets/`, `css/` y `js/`. Incluye los archivos ocultos: en Linux puedes mostrarlos con Ctrl+H.

No subas el ZIP como sustituto del proyecto ni una carpeta adicional que deje el juego en `/EIDOLON-404/EIDOLON-404/`. Si actualizas un repositorio existente, revisa otros workflows de despliegue para evitar dos publicaciones simultáneas. Este paquete no cambia por sí mismo ningún repositorio.

## Activación

1. Usa `main` como rama principal, o adapta las referencias a `main` del workflow.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Actions → **Validate and deploy Pages** → Run workflow sobre `main`.
4. Espera los jobs `validate` y `deploy`. El enlace se muestra en el entorno `github-pages`.

El workflow también se ejecuta al hacer push a main y valida pull requests sin desplegarlas. No necesita tokens personales: usa los permisos acotados de GitHub Actions.

## Qué se publica

`scripts/build_site.py` prepara `_site/` con `index.html`, CSS, módulos JS, imágenes locales, licencia y `.nojekyll`. No se publican lanzadores, historial, tests ni archivos de desarrollo. Todas las rutas del juego son relativas para admitir la subcarpeta del repositorio.

## Verificaciones y límites

La comprobación `validate` instala Playwright y Chromium, ejecuta `tests/run_checks.py --browser` y bloquea el despliegue ante un error. No hay `continue-on-error` ni omisión silenciosa del navegador.

El paquete se ha comprobado localmente en integridad, sintaxis, lógica, servidor y recursos bajo `/EIDOLON-404/`. El workflow y su prueba Chromium no han sido ejecutados aquí ni remotamente. Una ejecución verde tampoco acredita balance ni campaña completa.

## Diagnóstico

- **404:** comprueba que `index.html` está en la raíz del repositorio, Source es GitHub Actions y `deploy` terminó correctamente.
- **Fallo en validate:** abre el paso rojo y conserva su salida; no elimines la prueba para forzar la publicación.
- **Fallo al configurar Pages:** revisa que Pages está habilitado con Source GitHub Actions y que las políticas del repositorio permiten el despliegue.
- **No aparece tu partida local:** Pages usa un origen HTTPS distinto del servidor local. No hay sincronización entre ellos.
- **Cambió el nombre del repositorio:** las rutas de recursos son relativas; comprueba igualmente el enlace nuevo y la partida.

Fuentes oficiales consultadas el 2026-10-11:
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://github.com/actions/upload-pages-artifact
- https://github.com/actions/deploy-pages
