import { extractMetadata } from '$lib/utils/extractMetadata';
import { marked } from 'marked';

export async function load({ url }) {
	const slug = url.pathname.replace('/', '').replaceAll('_', ' ');
	// console.log(slug);

	try {
		const allChapters = import.meta.glob(`/src/Publications/*/*/*.md`, {
			eager: true,
			query: 'raw'
		});
		// console.log(allChapters);

		const chapters = Object.entries(allChapters).map(([path, mod]: any) => {
			let bookName = path.replace('/src/Publications/', '').split('/')[0];
			// console.log(bookName);
			let part = path.replace(`/src/Publications/${bookName}`, '').split('/')[1];
			// console.log(part);
			if (bookName == slug.split('/')[0] && part == slug.split('/')[1]) {
				const bookPath = path.replace('/src/Publications/', '');
				const chapterName = bookPath.replace(`${slug}/`, '').split('.')[0];
				// console.log(chapterName);
				const chapterNumber = Number(
					bookPath.replace(`${slug}/Chapter`, '').split(' ')[1].split('.')[0]
				);
				// console.log(chapterNumber);
				const content = mod.default;
				// console.log(content);
				const metadata = extractMetadata(content);
				// console.log(metadata);

				if (metadata.visibility) {
					return {
						bookPath: bookPath,
						chapterNumber: chapterNumber,
						chapterName: chapterName,
						content: marked(content)
					};
				}
			}
		});

		const sortedChapters = chapters
			.filter(Boolean)
			.sort((a, b) => a.chapterNumber - b.chapterNumber);
		// console.log(sortedChapters);

		return {
			status: 200,
			chapters: sortedChapters
		};
	} catch (err) {
		return {
			status: 500,
			chapters: undefined
		};
	}
}
