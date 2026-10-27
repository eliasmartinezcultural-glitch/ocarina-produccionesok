# Diario Ocarina

Micrositio de noticias y novedades regionales dentro del sitio de Ocarina Producciones.

## Cómo funciona

- La portada estática lee `noticias.json`.
- El flujo de GitHub Actions consulta feeds RSS públicos cada hora.
- El proceso conserva enlaces y fechas originales, elimina duplicados y aplica filtros de contenido.
- La portada muestra titulares, extractos disponibles, fuente y enlace al original.
- No usa base de datos, servidor propio ni API de pago.

## Fuentes iniciales

- Neuquén Informa: noticias generales, turismo y educación.
- RSS oficial: https://www.neuqueninforma.gob.ar/rss/

## Límites editoriales

La automatización no equivale a verificación periodística. No se deben publicar acusaciones, emergencias o datos personales a partir de una sola fuente. Los comunicados oficiales deben atribuirse claramente. Los filtros automáticos reducen riesgos, pero pueden equivocarse.

## Publicación

El sitio se encuentra en `/diario-ocarina/` dentro del repositorio. Para que el flujo de GitHub Actions despliegue el sitio, en Settings → Pages → Build and deployment hay que seleccionar **GitHub Actions** como fuente. El workflow publica el repositorio completo, conservando la portada institucional y el subdirectorio del diario.