import { defineEnvVars } from '@sveltejs/kit/env';

// An unset DATABASE_URL intentionally uses the local database path in the DB module.
export const variables = defineEnvVars({ DATABASE_URL: { schema: (input) => input ?? '' } });
