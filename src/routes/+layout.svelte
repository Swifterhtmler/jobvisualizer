<script>
import "../app.css";
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="{favicon}" />
	<link rel="canonical" href="https://jobvisualizer.vercel.app" />
	<link rel="manifest" href="/manifest.json" />
	<meta name="theme-color" content="rgb(50, 120, 112)" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
</svelte:head>

{@render children()}
