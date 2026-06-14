<script lang="ts">
	let { data } = $props();
	const books = data.bookNames;
</script>

{#if books != undefined}
	<div class="prose-lg mt-3 prose max-w-none rounded-xl bg-base-200 pb-1">
		<ul>
			{#each books as book (book)}
				<li class="cursor-pointer border-b pb-3 first:pt-2.5">
					<a
						href="/{book.replaceAll(' ', '_')}"
						class="text-2xl font-semibold text-yellow-900 hover:text-yellow-700"
					>
						{book}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{:else}
	<p>There was an error loading the books...</p>
{/if}
