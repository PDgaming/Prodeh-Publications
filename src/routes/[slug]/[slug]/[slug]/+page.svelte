<script lang="ts">
	let data = $props();
	const chapter = data.data.chapter[0];
	const content = chapter.content.replace('<h1>', '<h1 class="text-2xl">').replace('<h2>', '<h1 class="text-xl">');
</script>

{#if chapter != undefined}
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
	</div>
{:else}
	<p>There was an error loading the chapter...</p>
{/if}