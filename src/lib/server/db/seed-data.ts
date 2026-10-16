import type { RoleInsert, ScaleInsert } from './schema';

export const seedScales = [
	{ name: 'Amöbe', value: 0, icon: 'fa-solid fa-bacterium' },
	{ name: 'Baum', value: 0.2, icon: 'fa-solid fa-tree' },
	{ name: 'Wurm', value: 0.4, icon: 'fa-solid fa-worm' },
	{ name: 'Frosch', value: 0.6, icon: 'fa-solid fa-frog' },
	{ name: 'Hund', value: 0.8, icon: 'fa-solid fa-dog' },
	{ name: 'Mensch', value: 1, icon: 'fa-solid fa-person' }
] satisfies ScaleInsert[];

export const seedRoles = [
	{ name: 'Administrator', icon: 'fa-solid fa-user-tie' },
	{ name: 'Mitglied', icon: 'fa-solid fa-check' },
	{ name: 'nicht verifiziert', icon: 'fa-solid fa-xmark' }
] satisfies RoleInsert[];
