# Vacaciones GG

Prototipo navegable para reemplazar el Google Sheet de tracking de vacaciones que veníamos usando con Germán. Pensado para validar la UX antes de invertir en la versión cloud completa.

**Live:** https://jorgetereso.github.io/vacaciones-gg/

## Qué hace

- Calendario visual del año, con días marcados por persona (Jorge / Germán / los dos).
- **Drag-to-select**: arrastrá para marcar un rango entero en vez de clickear celda por celda.
- **Feriados argentinos 2024–2030** precargados, con sugerencias 💡 de "puente" cuando un feriado cae martes o jueves.
- **Cupo anual** configurable por persona, dashboard con días tomados / planeados / restantes.
- **Notificación al socio** (botón "📧 Avisar") que abre el cliente de mail con un resumen prearmado de los cambios pendientes.
- **Comentarios** opcionales por día (click derecho o tap largo).
- **Export / Import JSON** para sincronizar manualmente entre vos y Germán (no hay backend en el MVP).
- Mobile-responsive.

## Cómo se usa

1. Elegí "Soy Jorge" o "Soy Germán" en el toggle del header.
2. Click en una celda → marca/desmarca ese día para la persona activa.
3. Click + arrastre → marca un rango entero.
4. Click derecho (o tap largo en mobile) → abre el modal de nota.
5. ⚙ Settings → cupo anual, mails, colores, nombres.
6. "📧 Avisar" → abre el mail con un resumen de cambios desde la última vez.
7. ⬇ Exportar / ⬆ Importar → JSON para compartir el estado con tu socio.

## Stack

- Vite + React + TypeScript + Tailwind CSS
- Day.js para fechas
- localStorage para persistencia
- GitHub Pages + Actions para deploy

## Desarrollo local

```bash
npm install
npm run dev
```

El sitio sirve en `http://localhost:5173/vacaciones-gg/`.

```bash
npm run build       # build de producción a dist/
npm run preview     # servir el build local
```

## Limitaciones (a propósito, son MVP)

- **No hay backend** → los datos viven en el navegador de cada uno. Para compartir estado: Exportar JSON, mandárselo al otro por WhatsApp/mail, Importar.
- **No hay auth** → cualquiera con el link ve el sitio (pero los datos siguen siendo locales).
- **El "Avisar" no manda mail solo** → abre el cliente de mail del usuario con un borrador. El usuario aprieta enviar.

Si el prototipo convence, la "movida grande" pasa a Supabase + auth Google + mail automático (Resend o similar).

## Próximos pasos si va al cloud

- Backend con Supabase: tabla `days`, RLS para filtrar por org, real-time subscriptions.
- Google sign-in restringido a `jorge@3dar.com` y el mail de Germán.
- Mail automático (Resend) en cada cambio, con throttling para no spamear.
- Sync con Google Calendar (.ics export o API).
- Migración automática del estado local → cloud al loguear primera vez.
