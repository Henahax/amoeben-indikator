◇  Project next steps ─────────────────────────────────────────────────────╮
│                                                                          │
│  1: cd amoeben-indikator                                                 │
│  2: git init && git add -A && git commit -m "Initial commit" (optional)  │
│  3: npm run dev -- --open                                                │
│                                                                          │
│  To close the dev server, hit Ctrl-C                                     │
│                                                                          │
│  Stuck? Visit us at https://svelte.dev/chat                              │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────╯
│
◇  Add-on next steps ──────────────────────────────────────────────────╮
│                                                                      │
│  drizzle:                                                            │
│  - You will need to set DATABASE_URL in your production environment  │
│  - Run npm run db:start to start the docker container                │
│  - Run npm run db:push to update your database schema                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────╯



 docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres