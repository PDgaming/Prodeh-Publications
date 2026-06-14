<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	let { onNavigate = () => {} }: { onNavigate?: () => void } = $props();

	const books = $derived(($page.data as any).books ?? []);

	let openBooks = $state<Record<string, boolean>>({});
	let openParts = $state<Record<string, boolean>>({});

	$effect(() => {
		const pathname = $page.url.pathname;
		const decoded = pathname.replace(/^\//, '').replace(/_/g, ' ');
		const segments = decoded.split('/').filter(Boolean);

		if (segments.length >= 1) {
			openBooks[segments[0]] = true;
		}
		if (segments.length >= 2) {
			const last = segments[segments.length - 1];
			if (!last.endsWith('.md') || segments.length >= 3) {
				openParts[segments[1]] = true;
			}
		}
	});

	function toggleBook(name: string) {
		openBooks[name] = !openBooks[name];
	}
	function togglePart(name: string) {
		openParts[name] = !openParts[name];
	}

	const chapter = $derived(
		($page.data as any).type === 'chapter' ? ($page.data as any).chapter : undefined,
	);
	const hasPrevious = $derived(chapter?.hasPrevious ?? false);
	const hasNext = $derived(chapter?.hasNext ?? false);
	const bookPath = $derived(chapter ? chapter.bookPath.replace(/\/[^/]+$/, '') : '');
	const previousChapter = $derived(chapter ? `Chapter ${chapter.chapterNumber - 1}.md` : '');
	const nextChapter = $derived(chapter ? `Chapter ${chapter.chapterNumber + 1}.md` : '');

	function makeId(type: string, name: string) {
		return `sidebar-${type}-${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
	}

	const isActive = $derived((path: string) => $page.url.pathname === '/' + path.replaceAll(' ', '_'));
</script>

<aside
	class="flex h-full w-72 shrink-0 flex-col border-r border-base-300 bg-base-200"
>
	<div class="border-b border-base-300 p-3 text-lg font-bold">
		<a href="/" class="hover:opacity-70">ProDeh Publications</a>
	</div>

	<nav
		class="flex-1 overflow-y-auto p-2"
		onclick={(e) => { if ((e.target as Element)?.closest('a')) onNavigate(); }}
	>
		{#each books as book (book.name)}
			<div>
				<button
					onclick={() => toggleBook(book.name)}
					aria-expanded={openBooks[book.name] ?? false}
					aria-controls={makeId('book', book.name)}
					class="flex w-full cursor-pointer items-center gap-1 rounded-sm p-1 text-left font-semibold hover:bg-base-300"
				>
					<span class="text-xs">{openBooks[book.name] ? '▾' : '▸'}</span>
					{book.name}
				</button>

				{#if openBooks[book.name]}
					<div id={makeId('book', book.name)} class="ml-3 border-l border-base-300 pl-2" role="group" aria-label={book.name}>
						{#if book.hasParts}
							{#each book.parts as part (part.name)}
								<div>
									<button
										onclick={() => togglePart(part.name)}
										aria-expanded={openParts[part.name] ?? false}
										aria-controls={makeId('part', part.name)}
										class="flex w-full cursor-pointer items-center gap-1 rounded-sm p-1 text-left text-sm hover:bg-base-300"
									>
										<span class="text-xs">{openParts[part.name] ? '▾' : '▸'}</span>
										{part.name}
									</button>

									{#if openParts[part.name]}
										<div id={makeId('part', part.name)} class="ml-3 border-l border-base-300 pl-2" role="group" aria-label={part.name}>
											{#each part.chapters as ch (ch.path)}
												<a
													href="/{ch.path.replaceAll(' ', '_')}"
													class="block rounded-sm p-1 text-sm"
													class:hover:bg-base-300={!isActive(ch.path)}
													class:bg-neutral={isActive(ch.path)}
													class:text-neutral-content={isActive(ch.path)}
													aria-current={isActive(ch.path) ? 'page' : undefined}
												>
													{ch.name}
												</a>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						{:else}
							{#each book.chapters as ch (ch.path)}
								<a
									href="/{ch.path.replaceAll(' ', '_')}"
									class="block rounded-sm p-1 text-sm"
									class:hover:bg-base-300={!isActive(ch.path)}
									class:bg-neutral={isActive(ch.path)}
									class:text-neutral-content={isActive(ch.path)}
									aria-current={isActive(ch.path) ? 'page' : undefined}
								>
									{ch.name}
								</a>
							{/each}
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</nav>

	{#if chapter}
		<div class="border-t border-base-300">
			<div class="flex">
				<a
					href={hasPrevious
						? `/${bookPath.replaceAll(' ', '_')}/${previousChapter.replaceAll(' ', '_')}`
						: '#'}
					class="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-sm py-2 text-sm transition-all hover:bg-base-300 active:scale-[0.97]"
					class:pointer-events-none={!hasPrevious}
					class:opacity-30={!hasPrevious}
					aria-disabled={!hasPrevious}
				>
					<Icon icon="ooui:arrow-next-rtl" class="h-4 w-4" />
					Prev
				</a>
				<div class="w-px bg-base-300"></div>
				<a
					href={hasNext
						? `/${bookPath.replaceAll(' ', '_')}/${nextChapter.replaceAll(' ', '_')}`
						: '#'}
					class="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-sm py-2 text-sm transition-all hover:bg-base-300 active:scale-[0.97]"
					class:pointer-events-none={!hasNext}
					class:opacity-30={!hasNext}
					aria-disabled={!hasNext}
				>
					Next
					<Icon icon="ooui:arrow-next-ltr" class="h-4 w-4" />
				</a>
			</div>
		</div>
	{/if}
</aside>
