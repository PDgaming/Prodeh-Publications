import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { error } from "@sveltejs/kit"

export async function load({ url }) {
    const slug = url.pathname.replace("/", "").replaceAll("_", " ")
    // console.log(slug)

    try {
        const allChapters = import.meta.glob(`/src/Publications/*/*.md`, {
            eager: true,
            query: "raw"
        })
        // console.log(allChapters)

        const chapter = Object.entries(allChapters)
            .map(([path, mod]: any) => {
                let bookName = path.replace("/src/Publications/", "").split("/")[0];
                // console.log(bookName)
                // console.log(slug.split("/")[0])
                if (bookName == slug.split("/")[0]) {
                    const bookPath = path.replace("/src/Publications/", "")
                    const chapterName = bookPath.replace(`${slug}/`, "")
                    // console.log(chapterName)
                    const chapterNumber = Number(bookPath.replace(`${slug}/Chapter `, "").split(" -")[0])
                    // console.log(chapterNumber)
                    if (chapterName == slug) {
                        const content = mod.default;
                        // console.log(content)

                        return {
                            bookPath: bookPath,
                            chapterNumber: chapterNumber,
                            chapterName: chapterName,
                            content: marked(content),
                        }
                    }
                }
            })
            .filter(Boolean);

        return {
            chapter: chapter
        };
    } catch (err) {
        throw error(500, 'Failed to load blog post');
    }
}