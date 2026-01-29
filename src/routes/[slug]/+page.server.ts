export async function load({ url }) {
	const slug = url.pathname.replace('/', '').replaceAll('_', ' ');

	try {
		const allPostFiles = import.meta.glob('/src/Publications/*/*/*.md');
		// console.log(allPostFiles);
		let parts: string[] = [];
		const partsSet = new Set<string>();
		let bookName: string;
		for (const path in allPostFiles) {
			bookName = path.replace('/src/Publications/', '').split('/')[0];
			let part = path.replace(`/src/Publications/${bookName}`, '').split('/')[1];
			// console.log(part);
			if (!partsSet.has(part)) {
				// console.log(part);
				if (!part.includes('Notes')) {
					partsSet.add(part);
				}
			}
		}
		parts = Array.from(partsSet);
		return {
			status: 200,
			bookName,
			parts
		};
	} catch (err) {
		return {
			status: 500,
			parts: undefined
		};
	}
}
