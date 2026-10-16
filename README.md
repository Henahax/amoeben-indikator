# Amöben-Indikator

Web-App zum Bewerten von Verhalten, geeignet für Haustiere und Kollegen.

## Techstack

SvelteKit, TypeScript, Tailwind CSS, Drizzle ORM und SQLite.

## Entwicklung

```sh
npm install
npm run dev
```

Beim Start legt das Projekt Schema sowie die benötigten Rollen und Bewertungsstufen automatisch
an. Rollen und Bewertungsstufen werden in `src/lib/server/db/seed-data.ts` gepflegt. Diese Werte
werden bei jedem Seed-Lauf in die Datenbank übernommen. Der Geburtseintrag wird unter dem
Anzeigenamen „Rainer“ angelegt. Das erste Konto wird über das Registrierungsformular erstellt und
erhält Adminrechte; weitere Konten müssen freigeschaltet werden.
Benutzernamen sind unabhängig von Groß-/Kleinschreibung eindeutig.
Für eine manuelle
Initialisierung kannst du `npm run db:setup` ausführen.

Die Anwendung verwendet SQLite. Standardmäßig liegt die Datenbank unter
`./data/amoeben-indikator.db`; `DATABASE_URL` kann auf einen anderen lokalen
Dateipfad gesetzt werden. Docker Compose speichert sie in einem persistenten
Volume.
