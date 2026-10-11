# ENV4.2 — 2026-10-11

- Paquete GitHub con index en raíz y workflow de validación y Pages.
- Despliegue condicionado al gate Chromium; publicación solo de recursos web.
- Comprobación HTTP de todo el artefacto bajo subruta.
- Versionado visible corregido, guía de GitHub, contribución e incidencias.
- Historial consolidado en docs; licencia MIT original conservada.
- Navegador, workflow remoto y campaña integral siguen pendientes.

# ENV4.1 — 2026-10-11

- Corregido origen aleatorio de las partidas locales usando puerto 8404.
- Corregidos atajos en campos de texto y bloqueo global de Tab.
- Validación de guardados antes de modificar la partida.
- Nuevas regresiones y smoke HTTP real; historial de pruebas separado.
- README actualizado. Gate de navegador y campaña completa pendientes.

## Environment Overhaul 4.0 — 2026-10-11
- Vegetación frontal con atenuación al acercarse el jugador.
- Detalles vegetales periféricos animados por región.
- Sin cambios de lógica o guardado.

## DE-2E.5 · Retratos y diálogos
- 16 imágenes PNG originales (8 retratos y 8 versiones fracturadas).
- Nueva presentación de retrato junto a diálogos; soporte adaptable a móvil.
- Nuevo módulo `js/portraits.js`, sin cambios en guardado o jugabilidad.

## DE-2E.1 — Forest & Traveller Art Remaster
- Nuevos tiles de bosque, árboles, flores, muros y campana.
- Sprite del viajero rehecho y ajustes visuales de interfaz.
- Motor y guardado sin cambios.

## DE-2D — Cinematic Polish
- Presentación de regiones, Fractura y jefes sin bloqueo de control.
- Modo de efectos reducidos y respeto por las preferencias de movimiento del sistema.
- Identidad de versión actualizada.

## 1.0.0-rc.1 — Fase 10 (2026-10-11)

- Corrigida la versión visible, la documentación y el estado de release.
- Corregida la clase visual de Fractura al cargar partidas en el Santuario.
- Validación defensiva adicional de guardados malformados.
- Restauración de paneles y diálogos al reiniciar partida.
- Prevención de F5/F9 del navegador y mejora de distribución de controles en móvil.
- Repetida la suite automatizada; prueba HTTP de Chromium no completada por bloqueo administrativo.

# Changelog

## 0.9.3 — Fase 9D (2026-10-11)
- Sintetizador Web Audio revisado: volumen maestro, envolventes suaves, motivos de ambiente por región y realidad, sin archivos externos.
- Señales de espada, daño, impacto y esquiva.
- Feedback visual breve al sufrir daño y efecto de combate; sin modificar colisiones ni tiempos de invulnerabilidad.
- La música ambiental comienza únicamente si el usuario habilita sonido.
- Pruebas estáticas y de regresión incluidas.

## 0.9.2 — Fase 9C: World & Enemy Art Remaster

- Eliminados seis sprites antiguos que se superponían al protagonista.
- Aplicado el sprite compartido a las seis áreas regionales con visibilidad de daño.
- Los filtros visuales emplean el estado temporal real de cada región.
- Añadidos motivos ambientales específicos y detalles de sombras/enemigos del bosque.
- Sin cambios en colisiones, puzles o estados de guardado.

## 0.9.1 — Fase 9B
- Sprite viajero animado común, cuatro direcciones, movimiento, reposo, capa y esquiva.
- Partículas regionales discretas, deterministas, independientes de CDN.
- Integración del nuevo render en bosque y seis zonas.
- Regresiones existentes conservadas.

# Changelog

## v0.8.4 — Fase 8E: Santuario del Último Segundo (2026-10-11)

- Séptimo y último capítulo de la campaña, conectado al cierre de la Fortaleza.
- Tres cámaras jugables: Péndulo Inicial, Archivo de los Ausentes y Cámara del Último Segundo.
- Puzle temporal con Ceniza Primordial, memoria de Aster y dos mecanismos del Presente.
- Enemigo Eco Hostil y jefe Segundero (16 HP y tres fases).
- Dos epílogos condicionados por la decisión narrativa de Mara, con pantalla de fin de campaña y nueva partida.
- Mapa, inventario, diario, snapshot y autoguardado ampliados al Santuario.
- Pruebas del santuario para ambas decisiones y regresiones para las fases anteriores.
- Pendientes: auditoría de módulos HTTP nativos, dispositivos físicos, rendimiento, equilibrio, arte final y accesibilidad.

# Historial de cambios

## 0.8.0 — Fase 8A: La Aldea de Ceniza (11/10/2026)

- Nueva región original accesible tras restaurar el Templo de las Horas Rotos.
- Nuevo módulo `js/ash-village.js` independiente para mapa, colisiones, interacción, enemigo y arte procedural.
- Alma, la última vecina, ofrece pistas sobre la historia y el puzle principal.
- Sigilo recuperable únicamente en la Fractura; restauración persistente del faro en el Presente.
- Nuevo centinela hostil al explorar la Fractura, con vida, daño y ataque direccional.
- Nuevo epílogo del capítulo III y entradas del diario.
- Integración con inventario, mapa, guardado/carga y sistema de punto de control.
- Se conservan las mecánicas del bosque y del templo.
- Nueva batería automatizada `tests/village_smoke.py` y actualización del cargador de las pruebas anteriores.
- **Alcance:** ampliación vertical de campaña; no se declara completa la totalidad de las seis regiones planificadas.

## Versiones anteriores

- v0.7.0: guardado, carga, mapa, inventario y puntos de control.
- v0.6.0: primera mazmorra, cuatro cámaras y Guardián Sin Hora.
- v0.5.0: narrativa, Mara, Ivo, elecciones y diario.
- v0.4.0: puzles de Fractura Temporal.
- v0.3.0: combate y esquiva.
- v0.2.0: dirección artística procedural.
- v0.1.0: prototipo jugable del bosque.

## v0.8.1 · Fase 8B — Las Marismas del Olvido
- Añadida región autónoma `js/marshlands.js` con dos realidades, agua transitable únicamente en Fractura antes de reconstruir la pasarela, cartógrafa Nera, lámpara temporal y campana sumergida.
- Nuevo custodio espectral de cinco puntos de vida, vulnerable en Fractura; combate y daño con invulnerabilidad breve.
- Transición desde el capítulo III al capítulo IV, con su propio epílogo y entradas de diario.
- Nuevo estado persistente para la región usando el formato de guardado v1 existente; los guardados de versiones anteriores pueden cargar sin datos de marisma.
- Inventario y mapa ampliados, objetivos de misión actualizados.
- Nueva prueba `tests/marsh_smoke.py` y cinco baterías de regresión anteriores actualizadas y superadas.
- Esta es una ampliación de campaña, **no** la campaña completa. Quedan tres regiones y la conclusión global.

## v0.8.2 — Fase 8C · La Ciudad Sumergida (2026-10-11)
- Nueva región de tres espacios conectados: plaza inundada, cripta de los nombres y abismo.
- Puzle de válvula temporal y drenaje persistente; sigilo y pedestal que desbloquean el jefe.
- Leviatán de Piedra, con nueve puntos de vida y segunda fase por debajo de la mitad de vida.
- Continuación del capítulo IV hacia el V, sin reiniciar la campaña.
- Inventario, mapa, objetivos y guardado integrados con compatibilidad para partidas anteriores.
- Nueva prueba `tests/city_smoke.py` y actualización del harness de regresión.
- Limitaciones: contenido del capítulo V todavía compacto; publicación y pruebas HTTP reales pendientes.

## v0.8.3 — Fase 8D: Fortaleza de los Relojeros
- Fortaleza de tres cámaras: Puente de Engranajes, Galería de las Agujas y Cámara del Maestro.
- Nuevo personaje Seren y revelación narrativa sobre Aster.
- Engranaje de retorno, eje del puente, llave de la sexta hora y cerradura entre realidades.
- Trampas periódicas, centinela y jefe Aster de dos fases.
- Continuidad desde la Ciudad Sumergida, guardado/carga de la fortaleza, inventario, mapa y diario.
- Pruebas automatizadas de ruta de la fortaleza y regresiones anteriores.
- Limitación: verificación HTTP en Chromium restringida por el entorno de ejecución.

## v0.9.0 — Fase 9 (remaster visual inicial)
- Añadida pasada de iluminación ambiente, viñeteado suave y motas animadas a **todas las regiones**, sin recursos de red.
- Botón `ATMÓSFERA` para activar/desactivar el posprocesado, con `aria-pressed`.
- Ajustados paneles, sombras, contornos, cabecera y comportamiento responsive de la botonera.
- Nueva prueba `tests/remaster_smoke.py`: botón de efectos, dibujado de seis regiones y ausencia de errores JavaScript.
- Las nueve pruebas de regresión anteriores siguen pasando. El acceso HTTP directo en el navegador automatizado sigue bloqueado en este entorno.
- **Alcance real:** mejora visual moderada; los sprites, animaciones complejas, música original y equilibrio global quedan pendientes. No se certifica una nota 9,5/10.

## 1.0.0-rc.2 — Verificación de release
- Se incorpora prueba reproducible de entrega HTTP y resolución de los módulos (`tests/release_integrity.py`).
- Se repiten las 13 baterías existentes sin regresiones detectadas.
- Informe QA ampliado: límites de certificación y pruebas pendientes explícitos.

## DE-2A — Identidad visual y bosque (2026-10-11)
- Vegetación estratificada, flores y piedras con generación determinista sobre baldosas transitables.
- Redibujo del viajero: capucha, reloj roto, capa, cuatro orientaciones y animación existente.
- Pulido de marco, cabecera, menús y contraste.
- Sin cambios de lógica, colisiones, guardados ni lanzadores.

## DE-2B — World Remaster (2026-10-11)
- Nuevas capas decorativas específicas de templo, aldea, marismas, ciudad, fortaleza y santuario.
- Inscripciones, techumbres, juncos, reflejos, engranajes y sellos con animación sutil.
- Capa visual sin modificaciones de mapas, colisiones, narrativa ni guardados.
- Se mantienen lanzadores Windows y Linux.

## DE-2C — Premium UI
Tarjetas de inventario/mapa, pestañas, diario filtrable, pantalla inicial y mejoras responsive.

## DE-3A — Combat & Movement Evolution
- Combo de tres golpes con remate más potente en combate del bosque fracturado.
- Aturdimiento breve de enemigos impactados y desplazamiento de flanqueo para fuegos fatuos.
- Protección ante repeticiones automáticas de J/K.
- Pruebas unitarias del combate y regresiones de campaña: `tests/de3a_combat.mjs`.

## Definitive Edition DE-3B — Enemy AI & Boss Evolution
- Aviso visible y anticipación real de golpes de contacto de Leviatán, Aster y Segundero.
- Preparación más rápida según la fase; durante el aviso dejan de seguir al jugador.
- Esquivar o retirarse durante el aviso evita el golpe; invulnerabilidad y tiempos existentes conservados.
- Módulo `js/boss-telegraph.js`; pruebas `tests/de3b_telegraph.mjs`.
- Corregido un error en el renderizado del Leviatán detectado en la regresión.

## DE-3C — Progression & Rewards
Recompensas por hitos, dos mejoras de vida máxima, recuperación por combate, inventario visual y persistencia compatible.

## DE-3D — Exploration & Secrets
- Tres descubrimientos opcionales; guardado retrocompatible, diario e inventario.

## Definitive Edition — DE-4A
- Misión secundaria narrativa «La carta que no envejece», con encuentros en dos realidades.
- Dos resoluciones narrativas y registro persistente en el diario.
- Nuevo módulo `js/sidequest.js` y prueba `tests/de4a_letters_smoke.py`.
- Compatibilidad con partidas antiguas (campo de guardado opcional).

## DE-4B — Living World
- Reacciones contextuales de Mara e Ivo tras la misión de la carta.
- Consecuencia visual persistente en el Bosque de las Campanas según preservar o liberar la carta.
- Prueba automatizada `tests/de4b_living_world_smoke.py`.

## DE-4C — Regional Side Quests
- Dos historias opcionales para Alma y Nera con objetos que solo aparecen en la Fractura.
- Decisiones persistentes con consecuencias visuales y entradas en el diario.
- Compatibilidad con partidas anteriores mediante estado opcional `regionalStories`.

## Definitive Edition · DE-4D — Narrative Polish & Campaign Depth
- Diálogos reescritos de Mara, Ivo, Aster y escenas de transición.
- Nuevas variantes narrativas de cierre para Aldea de Ceniza y Marismas según misiones opcionales, sin alterar la campaña.
- Test `tests/de4d_narrative_polish_smoke.py` con tres resultados posibles en cada región.

## DE-5A — 2026-10-11
- Auditoría del grafo de dependencias JavaScript (20 módulos) en el lanzador.
- Añadida prueba de integridad estática `tests/de5a_integrity.py`.
- Verificados cuatro scripts funcionales seleccionados; documentadas las limitaciones en `DE5A-AUDITORIA.md`.


## DE-2E.2 — Spritesheets originales de bosque y viajero
- Atlas gráficos locales de Presente y Fractura con cuatro variaciones de césped, piedra, árbol y campana.
- Viajero con cuatro orientaciones y cuatro fotogramas por orientación.
- Render por imágenes locales con retrocompatibilidad procedural si fallara la carga.
- Sin cambios en guardado o reglas de juego.


## DE-2E.3 — Atlas regionales
- Añadidos 12 atlas originales de seis regiones para presente/fractura.
- Sustituidos los rellenos planos regionales por texturas con fallback procedural.
- Sin cambios a colisiones, guardado ni progresión.

## DE-2E.4 (2026-10-11)
- Nueve spritesheets originales de criaturas y jefes.
- Renderizador compartido con fallback procedural y animación de 4 fotogramas.
- Sin cambios en colisiones, guardado ni equilibrio.

## DE-2E.6 — Animation & Visual Consistency
- Escalado coherente de enemigos y jefes, sombras y señal de invulnerabilidad.
- Corrección de la doble representación de enemigos del bosque con fallback procedural.
- Nuevos arcos gráficos del ataque y estela de esquiva, sin variar la lógica de combate.
- Ver `DE2E6-NOTAS.md` para pruebas y límites.


## World Art Remaster 2.0
- Rediseñados doce atlas regionales para seis zonas y sus dos realidades; sin cambios de lógica.

## Environment Overhaul 3.0 (2026-10-11)
- Arquitectura multibaldosa propia para seis regiones.
- Copas extendidas en agrupaciones de árboles del bosque.
- Sin cambios de colisiones, inventario, progresión ni guardado.
- Documentación técnica en `ENV3-NOTAS.md`.
