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

		const chapter = Object.entries(allChapters)
			.map(([path, mod]: any) => {
				let bookName = path.replace('/src/Publications/', '').split('/')[0];
				// console.log(bookName)
				let part = path.replace(`/src/Publications/${bookName}`, '').split('/')[1];
				// console.log(part);
				if (bookName == slug.split('/')[0] && part == slug.split('/')[1]) {
					const bookPath = path.replace('/src/Publications/', '');
					const chapterName = bookPath.replace(`${slug}/`, '');
					// console.log(chapterName);
					const chapterNumber = Number(bookPath.replace(`${slug}/Chapter `, '').split(' -')[0]);
					// console.log(chapterNumber)
					if (chapterName == slug) {
						const content = mod.default;
						// console.log(content)

						return {
							bookPath: bookPath,
							chapterNumber: chapterNumber,
							chapterName: chapterName.split('/')[2],
							content: marked(content)
						};
					}
				}
			})
			.filter(Boolean);

		return {
			status: 200,
			chapter: chapter
		};
	} catch (err) {
		return {
			status: 500,
			chapter: undefined
		};
	}
}
