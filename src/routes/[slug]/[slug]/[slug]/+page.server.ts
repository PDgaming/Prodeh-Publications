import { extractMetadata } from '$lib/utils/extractMetadata.js';
import { marked } from 'marked';

export async function load({ url }) {
	const slug = url.pathname.replace('/', '').replaceAll('_', ' ');
	// console.log(slug);

	try {
		const allChapters = import.meta.glob(`/src/Publications/*/*/*.md`, {
			eager: true,
			query: 'raw'
		});
		// console.log(allChapters)

		const chapterData = Object.entries(allChapters)
			.map(([path, mod]: [string, any]) => {
				let bookName = path.replace('/src/Publications/', '').split('/')[0];
				// console.log(bookName);
				let part = path.replace(`/src/Publications/${bookName}`, '').split('/')[1];
				// console.log(part);
				if (bookName == slug.split('/')[0] && part == slug.split('/')[1]) {
					const bookPath = path.replace('/src/Publications/', '');
					// console.log(bookPath);
					const chapterName = bookPath;
					// console.log(chapterName);
					const chapterNumber = Number(bookPath.split('/')[2].split(' ')[1].split('.')[0]);
					// console.log(chapterNumber);
					if (chapterName == slug) {
						// console.log(content)

						const metadata = extractMetadata(mod.default);

						if (metadata.visibility) {
							return {
								bookPath: bookPath,
								chapterNumber: chapterNumber,
								chapterName: chapterName.split('/')[2],
								content: marked.parse(mod.default)
							};
						} else {
							return;
						}
					}
				}
			})
			.filter(Boolean);

		const resolvedChapter = chapterData[0]
			? {
					...chapterData[0],
					content: await chapterData[0].content
				}
			: undefined;

		return {
			chapter: resolvedChapter
		};
	} catch (err) {
		return {
			status: 500,
			chapter: undefined
		};
	}
}
