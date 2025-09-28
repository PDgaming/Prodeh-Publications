<script lang="ts">
	let data = $props();
	const chapter = data.data.chapter[0];
</script>

<div class="prose-lg mt-3 prose flex max-w-none flex-col gap-5 rounded-xl bg-base-200 p-2">
	<div class="metadata">
		<h1 class="text-3xl font-bold underline">{chapter.chapterName.replace('.md', '')}</h1>
	</div>
	<div class="content">
		{@html chapter.content}
	</div>
</div>
