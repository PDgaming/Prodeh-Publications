<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from './components/footer.svelte';
	import Sidebar from './components/sidebar.svelte';
	import Icon from '@iconify/svelte';
	import { afterNavigate } from '$app/navigation';

	let { children } = $props();

	let mobileSidebarOpen = $state(false);

	function closeSidebar() {
		mobileSidebarOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && mobileSidebarOpen) closeSidebar();
	}

	afterNavigate(() => {
		const el = document.querySelector('.content');
		if (el) el.scrollTop = 0;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>ProDeh Publications</title>
</svelte:head>

<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-base-100 focus:p-2 focus:text-base-content">
	Skip to content
</a>

<svelte:window onkeydown={handleKeydown} />

<div class="flex h-screen overflow-hidden">
	<!-- Desktop sidebar -->
	<div class="hidden shrink-0 lg:flex">
		<Sidebar onNavigate={closeSidebar} />
	</div>

	<!-- Mobile sidebar overlay -->
	{#if mobileSidebarOpen}
		<div class="fixed inset-0 z-30 bg-black/50 lg:hidden" onclick={closeSidebar} role="presentation"></div>
		<div class="fixed inset-y-0 left-0 z-40 lg:hidden">
			<Sidebar onNavigate={closeSidebar} />
		</div>
	{/if}

	<!-- Main content -->
	<div class="flex min-w-0 flex-1 flex-col overflow-hidden" id="main-content" tabindex="-1">
		<!-- Top bar with hamburger -->
		<div class="flex items-center border-b border-base-300 bg-base-200 p-2">
			<button
				class="mr-2 flex items-center justify-center rounded-md p-1 lg:hidden"
				onclick={() => mobileSidebarOpen = !mobileSidebarOpen}
				aria-label={mobileSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
			>
				<Icon icon={mobileSidebarOpen ? 'material-symbols:close-rounded' : 'material-symbols:menu-rounded'} class="h-6 w-6" />
			</button>
			<a href="/" class="mr-2 font-bold lg:hidden">ProDeh Publications</a>
			<div class="flex-1"></div>
		</div>

		<!-- Scrollable content -->
		<div class="content bg-base-100 flex-1 overflow-x-hidden overflow-y-scroll">
			<div class="px-2 pb-2">
				{@render children()}
			</div>
		</div>

		<!-- Footer -->
		<div class="footer bg-base-300 flex h-auto justify-center p-2">
			<Footer />
		</div>
	</div>
</div>
