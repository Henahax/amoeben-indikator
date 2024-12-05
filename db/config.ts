import { defineDb, defineTable, column } from 'astro:db';

const Entry = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    value: column.number(),
    date: column.date(),
    description: column.text()
  }
})


// https://astro.build/db/config
export default defineDb({
  tables: { Entry }
});
