import { getBookNames } from '$lib/utils/publications';

const allPostFiles = import.meta.glob('/src/Publications/**/*.md');

export async function load() {
	const bookNames = getBookNames(Object.keys(allPostFiles));
	return { bookNames };
}
