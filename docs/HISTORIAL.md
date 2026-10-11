# Historial de desarrollo

Documentos de fases previas. Sus resultados y estados no certifican esta entrega.

---

## DE2A-NOTAS.md

# DE-2A — Notas de validación

Cambios visuales en `js/art.js` y `css/style.css`. Los lanzadores Windows/Linux se preservan.

Validar manualmente: inicio, movimiento en 4 direcciones, campana, Fractura, J/K, pausa, inventario, guardado/carga, cierre, móvil y los dos finales.

Este paquete NO certifica que toda la campaña se haya jugado manualmente. La fase remaster global continúa abierta.

---

## DE2B-NOTAS.md

# DE-2B — World Remaster

Modificaciones: `js/art.js` y `js/main.js` (únicamente render), `README.md`, `CHANGELOG.md`. Las capas nuevas son decorativas y no afectan a la geometría del mundo.

## Pruebas
Revisar con el launcher cada región, los dos estados temporales, ataques, marcos visuales, guardado y carga. Se incluyen pruebas automatizadas específicas; la sesión manual completa en Windows/Mint queda pendiente.

---

## DE2C-NOTAS.md

# Fase DE-2C · Interfaz premium

- Pestañas de inventario y mapa, con 7 regiones y estado de progreso.
- Iconografía local, tarjetas visuales, estados y diseño adaptable.
- Diario con búsqueda local y contador.
- Renovación del título y paneles sin modificar datos ni guardados.
- Lanzadores originales Windows y Linux conservados.

## Verificaciones recomendadas

1. Iniciar el juego. Abrir Inventario [I], alternar con Mapa, cerrar y desplazarse.
2. Abrir Diario [B], buscar texto, borrar búsqueda y cerrar.
3. Guardar, cargar y comprobar que la campaña no se modifica.
4. Repetir en ventana estrecha y verificar foco de teclado.

---

## DE2D-NOTAS.md

# DE-2D — Cinematic Polish

- Rótulos cinematográficos no interactivos al cambiar de región o realidad y al entrar en determinados encuentros finales.
- Destello de transición (desactivable) sin bloquear controles.
- Botón **EFECTOS: COMPLETOS/REDUCIDOS**. Detecta preferencia del sistema `prefers-reduced-motion`.
- Efectos reducidos evitan el posprocesado cinematográfico en Canvas y los destellos; la opción ATMÓSFERA sigue siendo independiente.
- No se modifican guardados, mecánicas, enemigos ni progresión.
- El modo de efectos se configura para cada sesión, no se persiste en la partida.

---

## DE2D-QA.md

# EIDOLON 404 — DE-2D QA

## Comprobaciones realizadas
- Sintaxis JavaScript de los 15 módulos: correcta.
- Playwright: pruebas de prólogo, inventario, mapa, diario, mazmorra, narrativa, regiones, fortaleza, Santuario y ambos finales: superadas en entorno de módulos integrados.
- Test específico DE-2D: alternancia entre efectos completos/reducidos, rótulo al cambiar de región, ausencia de bloqueo de clics y errores JS: superado.
- Prueba HTTP de recursos: superada según `tests/release_integrity.py` (sin certificar ejecución real HTTP de módulos en Chromium).
- Audio opcional: prueba Node.js superada.
- Lanzadores Windows y Linux: presentes, no ejecutados en sistemas físicos en esta entrega.

## Limitaciones
- Falta prueba manual completa con ejecución mediante HTTP en Windows y Linux Mint, rendimiento FPS en hardware real y jugabilidad prolongada.
- Los rótulos son cinematografía ligera; no se han añadido nuevas secuencias narrativas ni imágenes externas.

---

## DE2E1-NOTAS.md

# DE-2E.1 — Remaster de arte original

Se ha redibujado el terreno del bosque y el viajero mediante Canvas puro, con inspiración general en la legibilidad del pixel art de aventuras rurales, sin copiar sprites ni recursos de Stardew Valley.

## Alcance
- `js/art.js`: nuevo terreno con variación cromática, flores y piedras; muros con volumen y musgo; árboles multicapa; campana mejorada; personaje con capa, abrigo, capucha y cuatro orientaciones.
- `css/style.css`: armonización de paleta y foco visible.
- No se alteran las colisiones, la progresión, el guardado, los scripts de arranque ni el resto de regiones.

## Prueba manual
1. Ejecutar `INICIAR-WINDOWS.bat` o `INICIAR-LINUX.sh`.
2. Comparar bosque en Presente y Fractura con Q después de desbloquearla.
3. Caminar en las cuatro direcciones, atacar, esquivar, abrir inventario, guardar y cargar.

## Limitaciones
Esta es una primera sustitución de arte procedimental, no un tileset ilustrado de alta resolución ni el remaster del resto de regiones.

---

## DE2E2-NOTAS.md

# DE-2E.2 — Pixel Art Definitivo (primera entrega de spritesheets)

Tres PNG locales nuevos, originales y creados para el proyecto: dos atlas de 24 × 24 px con cuatro variaciones por terreno para Presente y Fractura, y una hoja de personaje 4 direcciones × 4 fotogramas de 24 × 32 px.

Los nuevos atlas se dibujan desde `js/art.js`. Si la carga de una imagen falla, el renderer procedural anterior permanece disponible como alternativa. Sin cambios en `world.js`, colisiones, guardado, narrativa o combate. Los lanzadores Windows y Linux están incluidos.

**Limitación:** las animaciones usan cuatro poses ligeras, todavía no son un paquete definitivo de animación profesional. Los demás escenarios siguen pendientes de un remaster equivalente.

---

## DE2E2-QA.md

# DE-2E.2 QA

- PASS: `node --check` en los 20 módulos JavaScript.
- PASS: `python3 tests/de5a_integrity.py`: 20 módulos y dependencias obligatorias.
- PASS: `python3 tests/de2b_smoke.py`: integración gráfica y lanzadores.
- PASS: dimensiones PNG de los tres atlas; spritesheets locales originales.
- PASS: integridad de archivo ZIP.
- NO VERIFICADO: carga de PNG por HTTP en navegador en este entorno: la conexión al servidor de prueba fue rechazada.
- NO VERIFICADO: recorrido de principio a fin, rendimiento, aspecto final en Windows/Linux.

No se han modificado sistemas de colisión, guardado ni progresión.

---

## DE2E3-NOTAS.md

# DE-2E.3 — Remaster de regiones

Se han creado 12 atlas PNG originales, 96×96 px, para seis regiones (Presente y Fractura). Cada atlas contiene cuatro familias de tiles (suelo, muro, agua, arquitectura), con cuatro variantes por familia.

Los tiles se dibujan dentro de los bucles originales de cada región, antes de los objetos e interacciones; se conservan colisiones, estados, misiones y guardados. En caso de error al cargar PNG, se utiliza el dibujo original. No se ha introducido ninguna dependencia ni recurso remoto.

## Límites
Los atlas son una mejora de materiales, no un rediseño manual de mapas ni de edificios; todavía se necesitan sprites completos de personajes y jefes. La carga gráfica en equipos reales sigue pendiente de verificación.

---

## DE2E4-NOTAS.md

# DE-2E.4 — Personajes, enemigos y jefes

Esta entrega incorpora 9 hojas de sprites locales originales de 4 fotogramas (256×64 píxeles, RGBA): sombra, fuego fatuo, espectro de la aldea, custodio del limo, centinela, Guardián Sin Hora, Leviatán, Aster y Segundero.

El renderizador compartido `paintCreature` de `js/art.js` lee los PNG locales y devuelve `false` cuando una imagen no está lista. El dibujo anterior se conserva como respaldo visual. La animación usa el tiempo de juego y no cambia hitboxes ni estadísticas.

La calidad del arte es una primera iteración de sprites vectorizados mediante Pillow, no pixel art ilustrado manualmente profesional. No se han creado retratos de NPC ni sprites de muerte.

La validación manual de todos los jefes y el navegador de Windows/Linux queda pendiente.

---

## DE2E4-QA.md

# QA — DE-2E.4

- PASS: 20 módulos JavaScript, resolución de dependencias (`tests/de5a_integrity.py`).
- PASS: combo y esquiva (`tests/de3a_combat.mjs`).
- PASS: ataques anticipados de jefes (`tests/de3b_telegraph.mjs`).
- PASS: integración gráfica previa y lanzadores (`tests/de2b_smoke.py`).
- PASS: 9 PNG RGBA de 256×64 píxeles.
- PENDIENTE: revisión visual completa, navegadores Windows/Linux, partida manual completa y pruebas de balance.

Algunas pruebas antiguas que importan `combat.js` como módulo `data:` no aceptan nuevos imports relativos: el renderer de sombras y fuegos fatuos se integra desde `main.js` para conservar esas pruebas sin modificar.

---

## DE2E5-NOTAS.md

# DE-2E.5 — Character Portraits & Dialogue Polish

- Se incluyen ocho retratos pixel art originales con una variante espectral para cada uno.
- Los retratos acompañan el texto del diálogo y se adaptan al ancho de pantalla.
- Los nombres de interlocutor se asignan sin modificar la lógica de decisiones o guardado.
- Las voces secundarias sin retrato propio usan la imagen neutral del narrador.
- Próximas mejoras: ilustraciones expresivas adicionales y ciclos específicos de animación de ataque y muerte (no implementados en esta subfase).
- El juego sigue necesitando una partida manual integral y comprobación de las imágenes en navegadores físicos.

---

## DE2E6-NOTAS.md

# DE-2E.6 — Consistencia de animación

Versión experimental y reversible basada en DE-2E.5.

## Cambios
- `js/art.js`: sprites de criaturas escalados uniformemente (30 px enemigos, 56 px jefes), sombras, oscilación vertical y destello de invulnerabilidad. Nuevo pintado visual de ataque/esquiva del protagonista.
- `js/combat.js`: dibuja **una sola vez** los enemigos del bosque usando sprite cuando está cargado, o la figura procedural original como fallback. El dibujado recibe un callback opcional, manteniendo el motor de combate independiente para las pruebas.
- `js/main.js`: conecta el render visual sin duplicar enemigos y añade efectos de espada/esquiva. No cambia reglas, controles, colisiones ni formato de guardado.

## QA ejecutada
- `node --check` en los 21 módulos ES: OK.
- `node tests/de3a_combat.mjs`: OK.
- `node tests/de3b_telegraph.mjs`: OK.
- `python tests/de5a_integrity.py`: OK (21 módulos, 26 archivos esperados).
- Presencia de 40 PNG y lanzadores Windows y Linux: OK.

## Pendiente
- Inspección visual del resultado en navegador real, prueba manual de la campaña completa, comparación fotograma a fotograma y rendimiento Windows/Linux reales. Los sprites de NPC y las animaciones de muerte específicas siguen pendientes de un remaster posterior.

---

## DE3A-NOTAS.md

# DE-3A — Combat & Movement Evolution

## Cambios jugables

- Combo de tres ataques consecutivos en el sistema de combate del bosque fracturado. Pulsa J tres veces con intervalos breves; el tercero causa dos puntos de daño.
- La ventana del combo expira tras 0,7 segundos sin ataques; los golpes tienen un breve tiempo de recuperación y no pueden acumularse durante la esquiva.
- Los fuegos fatuos del bosque realizan un movimiento de flanqueo, diferente del acercamiento de las sombras.
- Los enemigos del bosque quedan brevemente aturdidos al recibir un golpe.
- Se ignoran los eventos repetidos del teclado para J y K; cada pulsación inicia como máximo una acción.
- El reset del sistema de combate reinicia el combo.

## Alcance

El combo avanzado se aplica **solo a los encuentros de bosque gestionados por `js/combat.js`**. Los sistemas de ataque de aldea, marismas, ciudad, fortaleza, santuario y templo conservan sus reglas. La esquiva sigue siendo una habilidad compartida, sin modificar los valores de movimiento del personaje. No hay cambios de formato en el guardado.

## Pruebas

- `node tests/de3a_combat.mjs`: daño por golpe, combo 1-2-3, tercer golpe, bloqueo por enfriamiento, caducidad, esquiva y reinicio.
- 15 scripts de regresión `tests/*smoke.py`: superados en el entorno disponible.
- Sintaxis de `js/*.js` comprobada con `node --check`.

No se ha hecho un playtest manual completo en Windows/Linux ni una prueba de equilibrio de la campaña. No se ha publicado en GitHub.

---

## DE3B-NOTAS.md

# DE-3B — Enemy AI & Boss Evolution

- Los jefes Leviatán, Aster y Segundero anuncian el golpe de proximidad con un círculo ámbar y un signo de advertencia.
- Mientras anuncian el ataque se detienen; el jugador puede esquivarlo o alejarse.
- La velocidad de preparación depende de la fase del jefe.
- Los centinelas secundarios mantienen su comportamiento anterior.
- El Guardián del primer templo conserva su patrón de preparación, embestida y recuperación.
- Las advertencias no se guardan entre sesiones y el formato de partidas es compatible.

---

## DE3B-QA.md

# EIDOLON 404 · DE-3B QA

## Implementación
- Avisos de ataque, parada durante preparación y golpes evitables con desplazamiento en tres jefes regionales.
- El Guardián Sin Hora mantiene su mecánica original y se evita modificar el equilibrio de los secundarios.
- Persistencia: el aviso es transitorio y no modifica el formato de guardado.

## Validaciones automatizadas
- 15 pruebas `*smoke.py` (incluidos guion completo, inventario, mapa, regiones, jefes y dos finales): superadas.
- `node tests/de3a_combat.mjs`: superada.
- `node tests/de3b_telegraph.mjs`: superada (avisos, retirada, golpe, invulnerabilidad, señal gráfica).
- `node --check js/*.js`: correcto.

## Pendiente
- Pruebas humanas de equilibrio y legibilidad de avisos en Windows/Linux/Móvil, especialmente contra jefes de fases rápidas.
- Comprobación visual y partida manual completa en navegador servido por HTTP.

---

## DE3C-NOTAS.md

# DE-3C — Recompensas y progresión

- Reliquias narrativas concedidas por hitos: ecos, templo, aldea, marismas, ciudad y fortaleza.
- Dos mejoras permanentes de vida máxima (+1 por templo y +1 por aldea): de 5 a 7 corazones.
- Recompensa única por derrotar 3 enemigos del bosque: recuperación de hasta 2 puntos de salud.
- Inventario: se muestran las reliquias conseguidas y pendientes.
- Guardado: campo opcional `rewards`, compatible con guardados anteriores. Las recompensas se guardan como identificadores explícitos y se restauran antes de la vida.
- Sin objetos consumibles ni nuevos requisitos para resolver los puzles.

**Limitación:** las reliquias narrativas aún no proporcionan habilidades equipables. La extensión no cambia las estadísticas de los jefes ni los controles.

---

## DE3C-QA.md

# DE-3C — Informe de pruebas

- 16 scripts Python de pruebas funcionales: superados en el banco local de Chromium.
- Tres pruebas Node de combo, avisos de jefes y audio: superadas.
- DE-3C: recompensa única, incremento de vida máxima 5→6→7, restauración de snapshot, compatibilidad de estructura antigua y visualización en inventario: superadas.
- `release_integrity.py`: verificación de rutas HTTP/recursos y módulos anteriores superada; comprobar manualmente el módulo nuevo en el navegador final.
- Revisión sintáctica de módulos: correcta.

## Límites

Las pruebas de navegador cargan los módulos JavaScript en un arnés controlado, no como módulos ES directos por HTTP. Las pruebas de Windows, Linux Mint y recorrido manual completo aún están pendientes. `localStorage` no está disponible en el origen `about:blank`; su persistencia general se cubre con el ensayo de progresión anterior, y la nueva estructura de recompensas se prueba con instantáneas equivalentes. No se ha certificado el equilibrio de los corazones adicionales.

---

## DE3D-NOTAS.md

# DE-3D — Exploration & Secrets

Tres secretos opcionales del bosque. Acércate a cada símbolo en su realidad correspondiente y pulsa E. Dos pistas de historia y una fuente que cura hasta dos puntos de vida una sola vez. El relicario requiere desbloquear la Fractura. Se reflejan en inventario y diario y se persisten en las partidas guardadas. Sin cambios en el progreso obligatorio.

---

## DE4A-NOTAS.md

# DE-4A — Narrative & World Immersion

## Nueva misión opcional: La carta que no envejece

1. Tras desbloquear la Fractura, habla con Ivo en el bosque fracturado (este del mapa).
2. Busca la carta luminosa bajo el roble oriental, cerca de la zona inferior derecha (coordenada de mapa 14,10).
3. Interactúa con ella (E) y vuelve al Presente (Q).
4. Habla con Mara en el oeste del bosque. Escoge con `1` o `2` entre custodiar o liberar las palabras de la carta.
5. La misión y su desenlace se inscriben en el diario (B) y se guardan con la partida (F5).

Es una misión secundaria; no bloquea los puzles, el combate ni los dos finales principales. Se ha mantenido el formato de partidas guardadas y añadido un campo opcional `letters`. Las partidas anteriores restauran la misión como no iniciada.

## Comprobación

- `python tests/de4a_letters_smoke.py`: ciclo de misión, decisión, reinicio y restauración.
- `python tests/narrative_smoke.py`, `python tests/progression_smoke.py`, `python tests/browser_smoke.py`: regresión básica.

Las pruebas automatizadas no sustituyen una partida completa en Windows y Linux Mint.

---

## DE4B-NOTAS.md

# DE-4B — Living World

## Cambios implementados
- La resolución de **La carta que no envejece** modifica el bosque: memorial de papel al conservarla o fragmentos flotando al liberarla.
- Mara e Ivo tienen respuestas de seguimiento diferentes para cada decisión.
- El efecto depende exclusivamente del estado persistido en `LettersQuest` y no crea una segunda fuente de verdad.
- Sin cambios en colisiones, mapas, equilibrio, controles o formato de guardado.

## Comprobación
Ejecutar `python3 tests/de4b_living_world_smoke.py` con Playwright y Chromium disponibles.
Se validaron las dos ramas, diálogo de Mara, reacción de Ivo, dibujo en ambos mundos y serialización/restauración. También se repitieron `de4a_letters_smoke.py`, `narrative_smoke.py`, `browser_smoke.py` y `de2c_ui_smoke.py`.

## Limitaciones
No se ha medido la percepción visual en pantalla física, ni ejecutado una campaña completa. Las pruebas de Playwright usan módulos fusionados en un banco de pruebas (no navegación real por HTTP).

---

## DE4C-NOTAS.md

# DE-4C · Narrative Events & Side Quests

## Historias opcionales

- **Aldea de Ceniza:** habla con Alma, encuentra el medallón al este (solo Fractura), regresa al Presente y elige entre devolverlo o enterrarlo.
- **Marismas del Olvido:** habla con Nera, encuentra el mapa borrado (solo Fractura), regresa al Presente y elige entre restaurarlo o liberarlo.

La misión no cambia los finales ni bloquea los puzles obligatorios. Los estados se guardan en `regionalStories`, con valores por defecto para partidas antiguas. Los desenlaces producen efectos visuales cerca de cada personaje y entradas en el diario.

## Ejecución
Windows: `INICIAR-WINDOWS.bat` · Linux: `INICIAR-LINUX.sh`.

---

## DE4D-NOTAS.md

# DE-4D · Narrative Polish & Campaign Depth

Esta entrega refuerza la narración sin modificar la lógica de combate, colisiones, progresión ni guardados.

## Cambios
- Diálogos revisados de Mara e Ivo, con recuerdos concretos y menos exposición abstracta.
- Motivación de Aster presentada con una confesión más personal.
- Revisión de escenas del faro, las marismas y la Ciudad Sumergida.
- Consecuencias diferidas de *Las cenizas de una promesa* y *El mapa que olvidó el agua*: las líneas de cierre cambian según la resolución `restore`, `release` o misión no completada.
- Variantes narrativas del Santuario reforzadas; las elecciones principales y ambos finales se conservan.

## Alcance y límites
No se incluyen nuevas cinemáticas gráficas ni un capítulo adicional. Las variaciones afectan a texto de diálogo. La calidad literaria y el ritmo deben evaluarse jugando la campaña de principio a fin.

## Pruebas ejecutadas
- `python tests/de4d_narrative_polish_smoke.py` — PASS (6 variantes + errores de navegador).
- `python tests/de4c_regional_stories_smoke.py` — PASS.
- `python tests/de4a_letters_smoke.py` — PASS.
- `python tests/narrative_smoke.py` — PASS.
- `python tests/sanctuary_smoke.py` — PASS (2 finales).
- `node --check js/main.js` y `node --check js/regional-stories.js` — PASS.

Falta una partida manual real para valorar fluidez, pausas y emoción de las escenas. No se ha publicado en GitHub.

---

## DE5A-AUDITORIA.md

# DE-5A · Auditoría técnica parcial · 2026-10-11

## Origen y alcance
Base: `EIDOLON-404_DE-4D_NARRATIVE_POLISH.zip`. No se cambió la historia, los puzles, la progresión ni el formato de guardado. Esta entrega NO supone certificación de jugabilidad completa.

## Cambio aplicado
`launcher.py` comprueba ahora las dependencias recursivas `import/export` de `js/main.js`, y muestra un error si falta algún módulo, antes de abrir el navegador. Detecta 20 módulos. Se añadió `tests/de5a_integrity.py` para validar módulos, sintaxis y rutas HTML. Este test de desarrollo necesita Node.js, pero el juego y los lanzadores continúan necesitando únicamente Python 3 y un navegador.

## Pruebas ejecutadas y superadas
- `python3 launcher.py --check` — 9 archivos esenciales y 20 módulos ES presentes.
- `python3 tests/de5a_integrity.py` — 20 módulos comprobados, sintaxis Node correcta, referencias HTML presentes.
- `python3 tests/de4d_narrative_polish_smoke.py` — 3 variantes de cierre para Aldea y Marismas.
- `python3 tests/de4c_regional_stories_smoke.py` — dos misiones, elecciones, realidad, guardado/restauración.
- `python3 tests/de2c_ui_smoke.py` — inventario, pestañas, mapa, diario y cierre.
- `python3 tests/sanctuary_smoke.py` — pruebas simuladas de ambos finales, puzles, jefe y guardado.
- ZIP comprobado con `ZipFile.testzip()`.

## Límites y riesgos pendientes
- La ejecución secuencial de los ~20 scripts antiguos excedió el tiempo disponible: **NO** se declara toda la batería superada.
- Las pruebas Playwright ejecutadas insertan código JavaScript en una página de prueba; no equivalen a una carga real del juego por HTTP/ES modules.
- No hay prueba manual completa de principio a fin, ni validación física en Windows, Linux Mint, móviles o GitHub Pages.
- La integridad estática detecta módulos faltantes pero no garantiza que cualquier interacción funcione en todas las circunstancias.

## Verificación por el usuario
1. Descomprimir y ejecutar `INICIAR-WINDOWS.bat` o `INICIAR-LINUX.sh`.
2. Confirmar que muestra `Modulos JavaScript comprobados: 20` antes de abrir el juego.
3. Comprobar inicio, movimiento, combate, Fractura, inventario, diario, guardar/cargar y una transición entre regiones.
4. Si algo falla, ejecutar `COMPROBAR-WINDOWS.bat` o `COMPROBAR-LINUX.sh`, y adjuntar el resultado y la consola del navegador.

## Estado
**DE-5A, revisión técnica parcial / candidata a pruebas manuales. No release final certificada.**

---

## ENV3-NOTAS.md

# EIDOLON 404 · Environment Overhaul 3.0

Se incorpora una capa artística de estructuras multibaldosa, sin modificar las matrices de colisión, posiciones de misiones ni estado de partida.

## Cambios
- `js/art.js`: `paintEnvironmentMonuments` dibuja arcos de piedra en templo y ciudad, casas en la aldea, juncales en marismas, engranajes en la fortaleza y arquitectura ceremonial en el santuario. `paintForestCanopies` crea copas más amplias solo sobre grupos de árboles existentes.
- `js/main.js`: integra las dos funciones en los recorridos gráficos. Se mantienen lanzadores y todos los recursos previos.

## Verificación
- `node --check js/*.js`: superada.
- `node tests/de3a_combat.mjs`: superada.
- `node tests/de3b_telegraph.mjs`: superada.
- `python3 tests/de5a_integrity.py`: superada.
- `python3 tests/de2b_smoke.py`: superada.

## Limitaciones
Las nuevas estructuras son geometría pixel art procedural (no sprites ilustrados a mano). Se dibujan en una capa de ornamentación posterior al mapa, por lo que es necesaria una revisión visual de legibilidad, oclusión y proporciones en escenas reales. La posición de ninguna colisión se ha cambiado. No se ha realizado una partida manual completa ni una prueba física en Windows/Linux.

---

## ENV4-NOTAS.md

# Environment Overhaul 4.0 — capas y profundidad

Cambios visuales **sin modificar la lógica**:

- Capa de primer plano `paintEnvironmentForeground` en `js/art.js`, dibujada después de personajes e interacciones.
- Copas parciales del bosque que se superponen al jugador solo cuando su posición vertical corresponde; se atenúan a un 20 % cuando el jugador está cerca para no ocultarlo.
- Vegetación periférica animada, específica por región, fuera del centro de los puzles.
- No se modifican mapas, colisiones, guardado, controles, audio ni lanzadores.

## QA pendiente

La profundidad es una aproximación 2D basada en coordenadas; necesita revisión manual en las siete regiones y pruebas visuales de oclusión de cofres y NPC. No es una ordenación universal por eje Y de todas las entidades.

---

## QA-REPORT.md

# EIDOLON 404 — Informe QA de la RC 1
Fecha: 2026-10-11 · Versión: 1.0.0-rc.1

## Alcance y resultado
- 12 scripts Python de regresión en Playwright: **PASS**.
- 1 script Node de prueba de Web Audio: **PASS**.
- Sintaxis de los 14 módulos JS: **PASS** (`node --check`).
- Integridad del archivo ZIP: validada en empaquetado.
- Servidor local responde con HTTP 200 fuera del navegador.
- Chromium de pruebas bloquea `http://127.0.0.1:8765/` con `ERR_BLOCKED_BY_ADMINISTRATOR`: **SIN VERIFICAR** carga HTTP real.

## Fallos corregidos
- Versión desactualizada visible y README obsoleto.
- Indicador de Fractura del Santuario al cargar guardado.
- Validaciones de estructura de partida más defensivas.
- Cierre explícito de paneles al reiniciar.
- Evitar que F5 y F9 recarguen el navegador durante guardado/carga.
- Distribución móvil y foco visible sobre el canvas.

## Advertencias
- Las pruebas Playwright no navegan por red, sino que insertan código del proyecto en un documento de prueba `about:blank`.
- No se ha realizado partida manual de principio a fin con tiempos de combate reales.
- Sin certificación de accesibilidad WCAG ni pruebas de móvil físico.
- No se ha desplegado ni comprobado GitHub Pages; el repositorio permanece sin modificar.

## Checklist para declarar la versión final
- [ ] Arranque por HTTP y módulos cargados en Chrome/Firefox reales.
- [ ] Los dos finales obtenibles jugando, sin modificar estado desde consola.
- [ ] Guardado, carga, derrota, recuperación y actualización desde partida anterior.
- [ ] Pruebas en móvil Android/iOS y teclado Windows/Linux.
- [ ] Balance, controles y contenido evaluados manualmente.
- [ ] Revisión de accesibilidad, rendimiento y carga en URL de GitHub Pages.

## Revisión RC2 — 11 octubre de 2026
- Se han repetido los 12 scripts Playwright y la prueba de audio Node: **13 PASS**.
- Se ha añadido `tests/release_integrity.py`: HTTP real con servidor Python local, **17 endpoints HTTP 200**, correspondientes al HTML, CSS y 14 módulos JavaScript, y comprobación de resolución de importaciones: **PASS**.
- Esto demuestra la entrega HTTP de los archivos, **no** su ejecución en Chromium a través de HTTP. Chromium administrado continúa bloqueando `localhost` con `ERR_BLOCKED_BY_ADMINISTRATOR`.
- No se ha realizado una partida manual completa ni pruebas de móvil físico. No se certifica aún la versión FINAL.
- La lógica funcional permanece igual a RC1; RC2 añade evidencia reproducible y mejora la documentación de release.

## DE-2B — validación adicional (2026-10-11)
- Las 13 pruebas `tests/*smoke.py` (incluyendo la nueva `de2b_smoke.py`) finalizaron correctamente.
- `tests/release_integrity.py` confirmó HTTP 200 para 17 recursos y 14 módulos JavaScript existentes.
- `node --check` superado para los 14 módulos JavaScript.
- Archivo ZIP comprobado con `python -m zipfile -t`.
- No se ha verificado manualmente el aspecto de todas las regiones ni se ha realizado una partida completa en Windows/Linux reales.

## DE-4C — Auditoría de misiones regionales
- PASS `tests/de4c_regional_stories_smoke.py`: inicio, restricción de Fractura, recuperación, ambas decisiones, bloqueo de duplicados, guardado/carga y renderizado.
- PASS regresiones ejecutadas: aldea, marismas, persistencia, misión de Ivo/Mara, consecuencias de DE-4B y ambos finales del santuario.
- PASS `node --check` para todos los módulos JavaScript.
- Pendiente: recorrido manual completo, accesibilidad a los objetos desde todas las rutas y pruebas físicas Windows/Linux.

---

## README-HISTORICO.md

# Documento histórico: no usar como guía de pruebas actual

# EIDOLON 404 — El reino de las horas muertas

Juego original de exploración, combates y puzles entre dos realidades con HTML5 Canvas y JavaScript nativo.

**Versión:** 1.0.0-rc.1 — Fase 10, candidata de publicación. La campaña tiene siete regiones y dos finales. **No es una release certificada:** falta prueba manual de jugabilidad integral, dispositivos físicos y despliegue GitHub Pages.

## Ejecutar

Desde el directorio del proyecto:

```bash
python3 -m http.server 8000
# En Windows también: py -m http.server 8000
```

Visita http://localhost:8000 . **No abrir `index.html` con `file://`**: usa módulos ES y necesita servidor HTTP.

## Campaña (orden)

1. **Bosque de las Campanas:** recoger tres ecos, hablar con Mara e Ivo, despertar la campana y recuperar el fragmento temporal para el altar.
2. **Templo de las Horas Rotos:** llave, placas en dos realidades, sello y primer guardián.
3. **Aldea de Ceniza:** hablar con Alma, conseguir el sigilo y restaurar el faro.
4. **Marismas del Olvido:** recuperar la lámpara y reconstruir la pasarela de juncos; liberar la campana.
5. **Ciudad Sumergida:** drenar la plaza, abrir la cripta y derrotar al Leviatán de Piedra.
6. **Fortaleza de los Relojeros:** engranaje, puente, llave, galería de trampas y el Maestro Aster.
7. **Santuario del Último Segundo (nuevo):** ceniza primordial en la Fractura, péndulo en el Presente, memoria de Aster, sello y el Segundero de tres fases. El final depende del juramento realizado con Mara en el bosque: **custodiar los recuerdos** o **liberar las horas**. Si no se eligió juramento, la versión aplica el segundo desenlace por defecto.

Al superar la Fortaleza, la historia transita directamente al Santuario, sin enviar al jugador a la pantalla de reinicio.

## Remaster visual (fase 9)

El acabado ambiental (iluminación suave, viñeteado y motas) se puede alternar desde el botón **ATMÓSFERA** en la cabecera. No modifica el estado de la partida. No se han añadido CDN ni dependencias. La calidad visual todavía no es definitiva; animaciones especializadas, nueva música y balance de campaña siguen pendientes.

## Controles

| Acción | Control |
|---|---|
| Movimiento | WASD / Flechas |
| Interactuar / continuar | E / Espacio / Intro |
| Fractura Temporal | Q |
| Atacar / esquivar | J / K |
| Inventario / mapa / diario | I / M / B |
| Guardar / cargar | F5 / F9 (también botones superiores) |
| Pausar | Escape |

Controles táctiles disponibles en pantallas pequeñas.

## Guardado y compatibilidad

El almacenamiento es **localStorage** del origen HTTP de la web. La estructura de guardado sigue siendo la versión 1 y mantiene compatibilidad de lectura con los guardados de las fases anteriores. Al entrar en un capítulo se establece un punto de control y se escribe una copia local. El autoguardado se ejecuta durante el juego. Limpiar los datos del navegador borra el progreso. No hay sincronización entre dispositivos ni exportación de partidas.

## Pruebas

Requiere Python, Playwright y Chromium. Ejecutar desde el directorio raíz:

```bash
for f in tests/*smoke.py; do python "$f"; done
```

Los tests incluyen prólogo, diálogos, templo, mapa y persistencia simulada, aldea, marismas, ciudad, fortaleza y las dos rutas narrativas finales del Santuario.

**Límites importantes:** el banco de pruebas concatena módulos ES en un documento `about:blank` debido a restricciones del navegador de pruebas con localhost. Estas comprobaciones cubren lógica e interfaz DOM, **no** certifican despliegue HTTP real en GitHub Pages, comportamiento en móviles físicos, accesibilidad ni duración y dificultad equilibradas. Esas verificaciones forman parte de las fases 9 y 10.

## Proyecto

HTML, CSS, Canvas 2D, Web Audio y módulos JavaScript, sin frameworks ni CDN. Proyecto no afiliado a ninguna franquicia. El código usa la licencia incluida en `LICENSE`.


## Fase 9B — Personajes animados y detalles regionales (v0.9.1)

- Protagonista dibujado con un sprite Canvas original, cuatro orientaciones, ciclo de piernas al caminar, balanceo de capa, respiración en reposo y variación de silueta durante la esquiva.
- El protagonista se dibuja de manera coherente en las seis áreas del motor y en el bosque inicial.
- Destellos ambientales específicos por región y visuales deterministas, sin imágenes ni bibliotecas externas.
- La superposición del personaje sobre el dibujo legado de las regiones es deliberadamente transitoria: la sustitución integral de los dibujantes por entidad corresponde a la revisión artística posterior.

## Fase 9C

Sprites duplicados de las regiones eliminados, efectos temporales unificados y detalles ambientales específicos. Aún no es release final; pendientes audio, balance y QA en dispositivos físicos.

## Fase 9D — Sonido y feedback
El botón de sonido activa audio sintetizado localmente. Incluye ambiente sutil contextual para bosque, templo, aldea, marismas, ciudad, fortaleza y santuario, además de sonidos de espada, esquiva y daño. No requiere conexión a Internet. El navegador puede bloquear audio hasta una interacción del usuario.

## Fase 10 — Criterios de publicación

- Ejecutar `python3 -m http.server 8000` y abrir `http://localhost:8000/` en Chrome/Firefox reales.
- Probar toda la campaña sin herramientas de depuración, ambas decisiones de Mara y ambos finales.
- Verificar F5/F9, autoguardado, recarga, derrota y recuperación de partida.
- Probar teclado, móvil táctil y pausa al cambiar de ventana.
- Usar DevTools: consola sin excepciones y pestaña Red sin fallos de carga.
- Publicar en GitHub Pages solo después de comprobar el enlace `/EIDOLON-404/` y las rutas relativas.

La suite Playwright usada aquí carga los módulos en una página de prueba porque Chromium administrado bloquea las conexiones HTTP locales. En consecuencia, sus resultados **no demuestran** compatibilidad HTTP/GitHub Pages.

### Límites conocidos

- No hay exportación/sincronización de guardados entre navegadores o dispositivos.
- El equilibrio de dificultad y la duración real no están medidos.
- Los diálogos y controles móviles requieren auditoría de accesibilidad manual.
- El motor usa arte procedimental; la calidad artística aún requiere revisión humana.

## Release candidate 2

Prueba adicional: `python3 tests/release_integrity.py`. Comprueba disponibilidad HTTP de HTML, CSS y los 14 módulos, además de rutas de importación. La ejecución por HTTP dentro del navegador, móviles reales y partida completa siguen pendientes; revisar `QA-REPORT.md`.


### Definitive Edition DE-2B
Nuevas ornamentaciones regionales en `js/art.js`. Usa `INICIAR-WINDOWS.bat` o `INICIAR-LINUX.sh` para ejecutar el juego mediante servidor local. El pulido gráfico global sigue en desarrollo.

## Definitive Edition DE-2D
Menús premium: inventario I, mapa M, diario B con búsqueda. Conserva lanzadores Windows/Linux.


### DE-2D — Efectos cinematográficos
El botón `◐ EFECTOS` permite pasar de efectos completos a reducidos sin alterar la jugabilidad. Los rótulos aparecen al viajar o cruzar realidades, sin bloquear la interacción.

### Definitive Edition — DE-3A (combate)
En el bosque fracturado, pulsa **J** hasta tres veces con ritmo para encadenar golpes. El tercer ataque realiza un remate más fuerte. **K** sigue activando la esquiva. Los jefes y combates regionales conservan por ahora sus sistemas anteriores. Consulta `DE3A-NOTAS.md` para conocer el alcance y las pruebas.

### Definitive Edition — DE-3B
Los jefes Leviatán, Aster y Segundero muestran un **círculo de aviso ámbar** antes de sus golpes de proximidad. Esquiva (`K`) o aléjate durante la preparación. La ventana se reduce en fases avanzadas. Los secundarios y el Guardián del primer templo mantienen su lógica anterior. Los lanzadores siguen siendo `INICIAR-WINDOWS.bat` e `INICIAR-LINUX.sh`.

Prueba de DE-3B (si tienes Node.js): `node tests/de3b_telegraph.mjs`.

## DE-3C: progresión
El inventario refleja siete reliquias y recompensas obtenidas mediante exploración y combate. Las mejoras permanentes se guardan automáticamente con la partida.

### Secretos del bosque (DE-3D)
Explora símbolos romboidales, interactúa con E. Algunos solo existen en una realidad. Los secretos son opcionales y se guardan con tu partida.

### DE-4A — La carta que no envejece

Misión secundaria: habla con Ivo en la Fractura, encuentra la carta bajo el roble oriental (zona sureste del bosque) y decide su destino con Mara en el Presente. Consulta los recuerdos con `B`. Las decisiones se guardan. Véase `DE4A-NOTAS.md`.

### DE-4B — Living World
La misión opcional *La carta que no envejece* ahora deja una huella visible en el bosque, y Mara e Ivo reaccionan de forma distinta en conversaciones posteriores. Consulta `DE4B-NOTAS.md` para alcance y pruebas.

### DE-4C
Incluye dos misiones secundarias opcionales con elecciones persistentes en la Aldea de Ceniza y las Marismas del Olvido. Consulta `DE4C-NOTAS.md`.

### Definitive Edition DE-4D
Esta entrega mejora el texto y la continuidad narrativa. Lee `DE4D-NOTAS.md` para cambios, pruebas y límites. Se conservan `INICIAR-WINDOWS.bat` e `INICIAR-LINUX.sh`.


## DE-2E.1 — Remaster visual del bosque
Primera intervención de pixel art original en `js/art.js` y armonización de la interfaz. Véase `DE2E1-NOTAS.md`.


### DE-2E.3
Los atlas regionales están en `assets/pixel/`. Conserva esa carpeta junto con los archivos JavaScript al ejecutar los lanzadores.

## DE-2E.4 · Sprites de criaturas
Nueve spritesheets PNG locales en `assets/pixel/` para enemigos y jefes. Ver `DE2E4-NOTAS.md`.


### DE-2E.5 — Retratos
Los diálogos muestran retratos de personajes cuando están disponibles. En la Fractura cambian de paleta automáticamente.

---

## WORLD-ART-2-NOTAS.md

# World Art Remaster 2.0 — Entrega visual

Versión basada en EIDOLON-404 DE-2E.6, sin cambios en el motor de movimiento, colisiones ni persistencia.

## Modificación
Se han redibujado los **12 atlas regionales PNG** (`assets/pixel/{temple,village,marsh,city,fortress,sanctuary}_{present,fracture}.png`) usando paletas diferenciadas y motivos de suelo, paredes, agua y arquitectura. Cada atlas es 96×96 píxeles, organizado como 4 filas de material × 4 variantes de 24×24.

- Templo: bloques de piedra, columnas y glifos.
- Aldea: madera, casas con tejados y ventanas.
- Marismas: juncos, agua y barro.
- Ciudad: arcos, paredes y reflejos acuáticos.
- Fortaleza: engranajes, remaches y losas metálicas.
- Santuario: formas rituales y pavimentos ornamentados.

El dibujo sigue siendo pixel art estilizado de baja resolución; es una mejora del atlas, **no** edificios de tamaño múltiple ni una sustitución completa del diseño de mapas.

## Evidencia y límites
- `tests/de5a_integrity.py`: correcto, 21 módulos locales comprobados.
- `tests/de3a_combat.mjs`: PASS.
- `tests/de3b_telegraph.mjs`: PASS.
- Se verificó la generación de los doce PNG con Pillow.
- No se realizó una partida completa ni una revisión visual dentro del navegador, por lo que no se certifica rendimiento, oclusión ni ausencia de bugs en todas las escenas.

## Ejecución
Windows: `INICIAR-WINDOWS.bat` · Linux: `INICIAR-LINUX.sh`.
