<script lang="ts">
  import Icon from '@iconify/svelte';

  let { data } = $props();

  const chapter = $derived(data.type === 'chapter' ? data.chapter : undefined);
  const content = $derived(
    (chapter?.content ?? '')
      .replace('<h1>', '<h1 class="text-2xl">')
      .replace('<h2>', '<h1 class="text-xl">') || '',
  );
  const chapterSegments = $derived(chapter ? chapter.bookPath.split('/') : []);
  const isFlat = $derived(chapterSegments.length === 2);
  const bookPath = $derived(
    chapter
      ? isFlat
        ? chapterSegments[0]
        : `${chapterSegments[0]}/${chapterSegments[1]}`
      : '',
  );
  const previousChapter = $derived(
    `Chapter ${Math.max(1, chapter ? chapter.chapterNumber - 1 : 0)}.md`,
  );
  const nextChapter = $derived(
    `Chapter ${chapter ? chapter.chapterNumber + 1 : 0}.md`,
  );
</script>

{#if data.type === 'book'}
  <div class="prose-lg mt-3 prose max-w-none rounded-xl bg-base-200 pb-1">
    {#if data.parts != undefined}
      <ul>
        {#each data.parts as part}
          <li class="cursor-pointer border-b pb-3">
            <a
              href="/{data.bookName.replaceAll(' ', '_')}/{part.replaceAll(' ', '_')}"
              class="text-2xl font-semibold text-yellow-900 hover:text-yellow-700"
            >
              {part}
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p>There was an error loading this book...</p>
    {/if}
  </div>
{:else if data.type === 'book-flat'}
  <div class="prose-lg mt-3 prose max-w-none rounded-xl bg-base-200 pb-1">
    {#if data.chapters != undefined}
      <ul>
        {#each data.chapters as chapter}
          <li class="cursor-pointer border-b pb-3">
            <a
              href="/{chapter.bookPath.replaceAll(' ', '_')}"
              class="text-2xl font-semibold text-yellow-900 hover:text-yellow-700"
            >
              {chapter.chapterName}
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p>There was an error loading this book...</p>
    {/if}
  </div>
{:else if data.type === 'part'}
  <div class="prose-lg mt-3 prose max-w-none rounded-xl bg-base-200 pb-1">
    {#if data.chapters != undefined}
      <ul>
        {#each data.chapters as chapter}
          <li class="cursor-pointer border-b pb-3">
            <a
              href="/{chapter.bookPath.replaceAll(' ', '_')}"
              class="text-2xl font-semibold text-yellow-900 hover:text-yellow-700"
            >
              {chapter.chapterName}
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p>There was an error loading the chapters...</p>
    {/if}
  </div>
{:else if data.type === 'chapter'}
  {#if chapter}
    <div class="prose-lg mt-3 prose flex max-w-none flex-col gap-5 rounded-xl bg-base-200 p-2">
      <div class="metadata">
        <h1 class="text-3xl font-bold underline">{chapter.chapterName.replace('.md', '')}</h1>
      </div>
      <div class="content">
        {@html content
          .replace('\n', '')
          .replace('\n', '')
          .replace(/\n/g, '<br>\n')}
      </div>
      <hr>
      <div class="navigation flex justify-between">
        <div class="previous">
          <a
            href="/{bookPath.replaceAll(' ', '_')}/{previousChapter.replaceAll(' ', '_')}"
            class="btn"
          >
            <Icon icon="ooui:arrow-next-rtl" class="h-5 w-5" />
            Previous Chapter
          </a>
        </div>
        <div class="next">
          <a
            href="/{bookPath.replaceAll(' ', '_')}/{nextChapter.replaceAll(' ', '_')}"
            class="btn"
          >
            Next Chapter
            <Icon icon="ooui:arrow-next-ltr" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  {:else}
    <p>There was an error loading the chapter...</p>
  {/if}
{/if}

<style>
  .prose {
    min-height: calc(100vh - 125px);
  }
  li:first-child {
    padding-top: 10px;
  }
</style>
