<script lang="ts">
	let data = $props();
	const parts = data.data.parts;

    // console.log(parts)
</script>

{#if parts != undefined}
	<div class="prose-lg mt-3 prose max-w-none rounded-xl bg-base-200 pb-1">
		<ul>
			{#each parts as part}
				<li class="cursor-pointer border-b pb-3">
					<a
						href="/{data.data.bookName.replaceAll(" ", "_")}/{part.replaceAll(" ", "_")}"
						class="text-2xl font-semibold text-yellow-900 hover:text-yellow-700"
					>
						{part}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{:else}
	<p>There was an error loading the chapters...</p>
{/if}

<style>
	.prose {
		min-height: calc(100vh - 125px);
	}
	li:first-child {
		padding-top: 10px;
	}
</style>
