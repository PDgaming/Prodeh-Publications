export const PUBLICATIONS = '/src/Publications';

export interface ChapterInfo {
	book: string;
	part: string | undefined;
	name: string;
	number: number;
	path: string;
}

export function parseChapterPath(path: string): ChapterInfo {
	const relative = path.replace(`${PUBLICATIONS}/`, '');
	const segments = relative.split('/');
	const book = segments[0];
	const filename = segments[segments.length - 1];
	const name = filename.replace(/\.md$/, '');
	const numMatch = name.match(/\d+/);
	const part = segments.length > 2 ? segments.slice(1, -1).join('/') : undefined;
	return {
		book,
		part,
		name,
		number: numMatch ? parseInt(numMatch[0], 10) : 0,
		path: relative
	};
}

export function isVisible(info: ChapterInfo): boolean {
	const lower = info.name.toLowerCase();
	if (lower.startsWith('draft') || lower.startsWith('note') || lower.startsWith('untitled'))
		return false;
	if (info.part && info.part.toLowerCase() === 'notes') return false;
	return true;
}

export function getBookNames(paths: string[]): string[] {
	const set = new Set<string>();
	for (const path of paths) {
		const info = parseChapterPath(path);
		if (isVisible(info)) {
			set.add(info.book);
		}
	}
	return Array.from(set);
}

export function getParts(paths: string[], book: string): string[] {
	const set = new Set<string>();
	for (const path of paths) {
		const info = parseChapterPath(path);
		if (info.book === book && info.part && isVisible(info)) {
			set.add(info.part);
		}
	}
	return Array.from(set);
}

export function bookHasParts(paths: string[], book: string): boolean {
	return paths.some((path) => {
		const info = parseChapterPath(path);
		return info.book === book && info.part !== undefined && isVisible(info);
	});
}

export function getChapterFiles(paths: string[], book: string, part?: string): ChapterInfo[] {
	const chapters: ChapterInfo[] = [];
	for (const path of paths) {
		const info = parseChapterPath(path);
		if (info.book === book && info.part === part && isVisible(info)) {
			chapters.push(info);
		}
	}
	return chapters.sort((a, b) => a.number - b.number);
}
