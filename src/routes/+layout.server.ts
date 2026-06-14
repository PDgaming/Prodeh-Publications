import { extractMetadata } from '$lib/utils/extractMetadata';
import {
	getBookNames,
	getParts,
	bookHasParts,
	getChapterFiles
} from '$lib/utils/publications';

const allFiles = import.meta.glob('/src/Publications/**/*.md', { query: 'raw' });

export async function load() {
	const paths = Object.keys(allFiles);
	const bookNames = getBookNames(paths);

	async function hasVisibleMetadata(fullPath: string) {
		const mod = (await allFiles[fullPath]()) as { default: string };
		const metadata = extractMetadata(mod.default);
		return !!metadata.visibility;
	}

	const books = [];
	for (const book of bookNames) {
		if (bookHasParts(paths, book)) {
			const partNames = getParts(paths, book);
			const parts = [];
			for (const part of partNames) {
				const raw = getChapterFiles(paths, book, part).map((c) => ({
					name: c.name,
					path: c.path
				}));
				const chapters = [];
				for (const ch of raw) {
					if (await hasVisibleMetadata(`/src/Publications/${ch.path}`)) {
						chapters.push(ch);
					}
				}
				if (chapters.length > 0) {
					parts.push({ name: part, chapters });
				}
			}
			books.push({ name: book, hasParts: true as const, parts });
		} else {
			const raw = getChapterFiles(paths, book).map((c) => ({
				name: c.name,
				path: c.path
			}));
			const chapters = [];
			for (const ch of raw) {
				if (await hasVisibleMetadata(`/src/Publications/${ch.path}`)) {
					chapters.push(ch);
				}
			}
			books.push({ name: book, hasParts: false as const, chapters });
		}
	}

	return { books };
}
