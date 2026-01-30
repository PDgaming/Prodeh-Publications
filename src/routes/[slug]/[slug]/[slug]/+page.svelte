<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";

	let {data} = $props();
	const chapter = $derived(data.chapter);
	const content = $derived(
        (chapter?.content ?? "")
            .replace('<h1>', '<h1 class="text-2xl">')
            .replace('<h2>', '<h1 class="text-xl">') || ""
    );

	const bookPath = $derived(
        chapter ? `${chapter.bookPath.split("/")[0]}/${chapter.bookPath.split("/")[1]}` : ""
    );

    const previousChapter = $derived(`Chapter ${Math.max(1, chapter ? chapter.chapterNumber - 1 : 0)}.md`);
    const nextChapter = $derived(`Chapter ${chapter ? chapter.chapterNumber + 1 : 0}.md`);
</script>

{#if chapter}
	<div class="prose-lg mt-3 prose flex max-w-none flex-col gap-5 rounded-xl bg-base-200 p-2">
		<div class="metadata">
			<h1 class="text-3xl font-bold underline">{chapter.chapterName.replace('.md', '')}</h1>
		</div>
		<div class="content">
			{@html content
				.replace("\n", "")
				.replace("\n", "")
				.replace(/\n/g, '<br>\n')
				}
		</div>
		<hr>
		<div class="navigation flex justify-between">
			<div class="previous">
				<a
				href={`/${bookPath.replaceAll(" ", "_")}/${previousChapter.replaceAll(" ", "_")}`}
				class="btn">
				<Icon icon="ooui:arrow-next-rtl" class="h-5 w-5" />
				Previous Chapter 
			</a>
			</div>
			<div class="next">
				<a
				href={`/${bookPath.replaceAll(" ", "_")}/${nextChapter.replaceAll(" ", "_")}`}
				class="btn">
				Next Chapter
				<Icon icon="ooui:arrow-next-ltr" class="h-5 w-5" />
			</a>
			</div>
		</div>
	</div>
{:else}
	<p>There was an error loading the chapter...</p>
{/if}