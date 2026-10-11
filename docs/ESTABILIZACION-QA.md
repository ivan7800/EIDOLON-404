# ENV4.1 — Estabilización y evidencias

Fecha: 2026-10-11. Base: EIDOLON-404_ENVIRONMENT_OVERHAUL_4(1).zip.

## Correcciones

1. `launcher.py`: puerto 8404 estable; opción explícita `--port`; si está ocupado termina con error y no salta a otro origen.
2. `js/main.js`: los campos editables no disparan los atajos; Tab y la activación nativa de botones con Intro/Espacio permanecen disponibles.
3. `js/progression.js` y `js/main.js`: validación compartida antes de cargar o aplicar un estado; controles de coordenadas, orientación, misión, listas narrativas, enemigos y salud. Asignación explícita de campos del jugador y puzle temporal.
4. Documentación actual unificada; README anterior conservado como histórico.
5. Batería actual con runner explícito. Archivados 17 harnesses incompatibles que usaban scripts clásicos. Nueva prueba HTTP real sin concatenar módulos.

## Ejecutado y superado

- `python3 tests/run_checks.py`: ocho procesos completados con código 0.
- Integridad: 21 módulos ES y sintaxis Node correctos.
- HTTP: 24 endpoints de HTML, CSS y módulos.
- Lanzador: arranque real en 8404, rechazo de segundo proceso en puerto ocupado, cierre y reinicio en el mismo origen.
- Lógica de combo, telegráficos de jefes y audio mediante tests Node existentes.
- Regresiones con DOM mínimo simulado: Tab, botones, búsqueda con B/espacio/flechas, cierre con Escape; ocho variantes de guardado inválido rechazadas sin modificar la partida; cargar datos narrativos corruptos sin excepción; campos opcionales de v1 y guardar/cargar en las siete regiones.

## Pendiente: no confundir con resultados superados

- `tests/browser_http_smoke.py` no ejecutado: falta Playwright Python/Chromium y falló la descarga de Chromium en este entorno.
- La simulación de DOM no prueba foco real, dibujo Canvas, rendimiento, audio físico ni tactilidad.
- La prueba HTTP de archivos no ejecuta JavaScript en navegador.
- Falta migrar y ejecutar la cobertura histórica completa de campaña y finales. El nuevo smoke tiene alcance limitado a arranque, UI, recarga y entrada en regiones.
- Falta partida completa sin teletransporte, equilibrio/duración, QA visual ENV4, dispositivos físicos y GitHub Pages.

## Prueba rápida para el usuario

1. Ejecuta el lanzador, inicia el prólogo y guarda con F5.
2. Cierra el servidor y vuelve a abrirlo: comprueba que sigue usando 8404 y pulsa Cargar.
3. Abre el diario, escribe «bosque de las campanas» y confirma que no se cierra.
4. Usa Tab para recorrer controles y Escape para cerrar el diario.
5. Continúa jugando y comprueba una transición regional.

Si tu partida procedía de un puerto aleatorio anterior, consulta la recuperación por `--port` en README. No se migra automáticamente entre orígenes del navegador.

Estado: candidata estabilizada en pruebas de lógica; no release final certificada. No publicada en GitHub.
