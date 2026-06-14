<script lang="ts">
	let { error } = $props();
</script>

<div class="flex flex-col items-center justify-center gap-4 p-8 text-center">
	<h1 class="text-6xl font-bold">{error?.status ?? 404}</h1>
	<p class="text-lg">{error?.message ?? 'Page not found.'}</p>
	<a href="/" class="btn btn-primary mt-4">Go home</a>
</div>
