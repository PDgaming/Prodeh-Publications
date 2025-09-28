import { extractMetadata } from '$lib/utils/extractMetadata';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export async function load({ url }) {
    const slug = url.pathname.replace("/", "").replaceAll("_", " ")

    try {
        const allChapters = import.meta.glob(`/src/Publications/*/*.md`, {
            eager: true,
            query: "raw"
        })
        // console.log(allPostFiles)

        const chapters = Object.entries(allChapters)
            .map(([path, mod]: any) => {
                let bookName = path.replace("/src/Publications/", "").split("/")[0];
                // console.log(bookName)
                // console.log(slug)
                if (bookName == slug) {
                    const bookPath = path.replace("/src/Publications/", "")
                    const chapterName = bookPath.replace(`${slug}/`, "")
                    // console.log(chapterName)
                    const chapterNumber = Number(bookPath.replace(`${slug}/Chapter `, "").split(" -")[0])
                    // console.log(chapterNumber)
                    const content = mod.default;
                    // console.log(content)
                    const metadata = extractMetadata(content);
                    console.log(metadata.visibility)

                    // if (metadata.visibility) {
                    return {
                        bookPath: bookPath,
                        chapterNumber: chapterNumber,
                        chapterName: chapterName,
                        content: marked(content),
                    }
                    // }
                }
            })

        const sortedChapters = chapters
            .filter(Boolean)
            .sort((a, b) => a.chapterNumber - b.chapterNumber);

        return {
            status: 200,
            chapters: sortedChapters
        };
    } catch (err) {
        return {
            status: 500,
            chapters: undefined
        }
    }
}