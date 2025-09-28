<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from './components/navbar.svelte';
	import Footer from './components/footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>ProDeh Publications</title>
</svelte:head>

<div class="main max-h-screen overflow-hidden">
	<div class="navbar items-centered absolute top-0 flex w-screen p-2">
		<Navbar />
	</div>
	<div class="content bg-base-100 overflow-x-hidden overflow-y-scroll">
		<div class="filler bg-base-300 h-16 w-screen"></div>
		<div class="px-2 pb-2">
			{@render children()}
		</div>
	</div>
	<div class="footer bg-base-300 flex h-auto justify-center p-2">
		<Footer />
	</div>
</div>

<style>
	.content {
		height: calc(100vh - 36px);
	}
	.navbar {
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
		background-color: var(--base-300);
		backdrop-filter: blur(30px);
	}
</style>
