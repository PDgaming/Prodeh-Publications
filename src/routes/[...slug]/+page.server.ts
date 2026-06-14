import { extractMetadata } from '$lib/utils/extractMetadata';
import { marked } from 'marked';
import {
	PUBLICATIONS,
	parseChapterPath,
	getParts,
	bookHasParts,
	getChapterFiles
} from '$lib/utils/publications';

const allChapters = import.meta.glob('/src/Publications/**/*.md', {
	query: 'raw'
});

export async function load({ url }) {
	const slug = url.pathname.replace(/^\//, '').replace(/_/g, ' ');
	const segments = slug.split('/').filter(Boolean);
	const paths = Object.keys(allChapters);

  const [book] = segments;

	// Book page — show parts if structured, chapters if flat
	if (segments.length === 1) {
		if (bookHasParts(paths, book)) {
			const parts = getParts(paths, book);
			return { type: 'book', bookName: book, parts };
		}

		const chapterFiles = getChapterFiles(paths, book);
		const chapters = [];
		for (const info of chapterFiles) {
			const fullPath = `${PUBLICATIONS}/${info.path}`;
			const mod = (await allChapters[fullPath]()) as { default: string };
			const metadata = extractMetadata(mod.default);
			if (metadata.visibility) {
				chapters.push({
					bookPath: info.path,
					chapterNumber: info.number,
					chapterName: info.name + '.md'
				});
			}
		}

		return { type: 'book-flat', bookName: book, chapters };
	}

	// Check if the full path matches a chapter file
	const chapterPath = segments.join('/');
	const matchingPath = paths.find((p) => p.replace(`${PUBLICATIONS}/`, '') === chapterPath);

	if (matchingPath) {
		const mod = (await allChapters[matchingPath]()) as { default: string };
		const metadata = extractMetadata(mod.default);
		if (!metadata.visibility) return { type: 'chapter', chapter: undefined };
		const info = parseChapterPath(matchingPath);
		const content = await marked.parse(mod.default);
		return {
			type: 'chapter',
			chapter: {
				bookPath: info.path,
				chapterNumber: info.number,
				chapterName: info.name + '.md',
				content
			}
		};
	}

	// Part page — list chapters for this book + part
	const [bookName, part] = segments;
	const partFiles = getChapterFiles(paths, bookName, part);

	const chapters = [];
	for (const info of partFiles) {
		const fullPath = `${PUBLICATIONS}/${info.path}`;
		const mod = (await allChapters[fullPath]()) as { default: string };
		const metadata = extractMetadata(mod.default);
		if (metadata.visibility) {
			chapters.push({
				bookPath: info.path,
				chapterNumber: info.number,
				chapterName: info.name + '.md'
			});
		}
	}
	chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);

	return { type: 'part', chapters };
}
