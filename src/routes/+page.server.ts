import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export async function load() {
    try {
        const allPostFiles = import.meta.glob("/src/Publications/*/*.md");
        let bookNames: string[] = []
        const bookNameSet = new Set<string>();
        for (const path in allPostFiles) {
            let bookName = path.replace("/src/Publications/", "").split("/")[0];
            if (!bookNameSet.has(bookName)) {
                bookNameSet.add(bookName);
                // console.log(bookName);
            }
        }
        bookNames = Array.from(bookNameSet);
        return {
            bookNames
        }
    } catch (err) {
        throw error(500, 'Failed to load blog posts');
    }
}