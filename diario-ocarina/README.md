# Diario Ocarina

**Una mirada que empieza en San Patricio del Chañar y se abre al mundo.**

## Regla editorial

1. Chañar primero: comunidad, cultura, educación, producción local, memoria, naturaleza y vida cotidiana.
2. Después las localidades cercanas y el Alto Valle.
3. Luego Patagonia.
4. Argentina y mundo solo si aportan valor a la comunidad.
5. Prioridad territorial antes que volumen de publicaciones.
6. Una noticia enlazada no es una producción original de Ocarina. La fuente debe quedar visible.
7. Un comunicado institucional se identifica como fuente oficial; no se lo presenta como periodismo independiente.
8. La automatización ayuda a encontrar y ordenar. No reemplaza la verificación humana ni garantiza que todos los filtros acierten.

## Cómo funciona

- Sitio estático, sin base de datos ni servicios de pago.
- GitHub Actions consulta feeds RSS cada hora y actualiza `noticias.json`.
- Los titulares se filtran con una lista conservadora de palabras clave y se deduplican por enlace.
- La portada clasifica por territorio y ordena la cercanía antes que la cronología global.
- Si no hay publicaciones locales en las fuentes automáticas, el sitio lo reconoce; no inventa contenido para llenar la sección.

## Fuentes iniciales conectadas

- Neuquén Informa: feeds oficiales de noticias generales, turismo y educación.
- Portal municipal de San Patricio del Chañar: https://www.sanpatricio.gob.ar/
- Chañar Digital: https://chanardigital.com.ar/

**Importante:** los dos últimos enlaces están publicados como directorio de consulta; no significa que sus contenidos se estén recolectando automáticamente. La primera versión automática aún depende de los RSS de Neuquén Informa. Conectar fuentes locales de manera fiable es la siguiente mejora técnica prioritaria.

## Publicación

Ruta: `/diario-ocarina/`. Workflow: `.github/workflows/diario-ocarina.yml`. En Settings → Pages, la fuente de despliegue debe ser GitHub Actions.

## Límites y seguridad editorial

Los filtros por palabras pueden omitir información valiosa o dejar pasar material inadecuado. Las publicaciones de riesgo, acusaciones, emergencias, datos personales o información sensible requieren revisión humana y no deben publicarse automáticamente como hechos confirmados.