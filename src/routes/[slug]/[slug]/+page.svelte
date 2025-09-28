<script lang="ts">
	let data = $props();
	const chapter = data.data.chapter[0];
</script>

<div class="bg-base-200 prose prose-lg mt-3 max-w-none rounded-xl p-2">
	<div class="metadata">
		<h1 class="underline">{chapter.chapterName.replace('.md', '')}</h1>
	</div>
	<div class="content">
		{@html chapter.content}
	</div>
</div>
